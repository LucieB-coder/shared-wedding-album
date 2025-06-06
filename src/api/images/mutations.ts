import imageCompression from "browser-image-compression";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {db, storage} from "../../firebaseConfig";
import type {AlbumItem, ImageUrls} from "./types.ts";
import {useMutation} from "@tanstack/react-query";
import {addDoc, collection} from "firebase/firestore";
import {v4 as uuid} from "uuid";
import {queryClient} from "../../main.tsx";

export const uploadImageAndCompress = async (albumItem: CreateAlbumItem
): Promise<ImageUrls> => {
    try {
        const uniqueName = `${albumItem.guestName}_${albumItem.createdAt}_${uuid()}`;

        // === Compress thumbnail ===
        const thumbnail = await imageCompression(albumItem.file, {
            maxWidthOrHeight: 300,
            maxSizeMB: 0.5,
            useWebWorker: true,
        });

        const thumbRef = ref(storage, `images/thumbnails/${uniqueName}_thumb.jpg`);
        const thumbSnap = await uploadBytes(thumbRef, thumbnail);
        const thumbnailUrl = await getDownloadURL(thumbSnap.ref);

        // === Compress full image ===
        const compressed = await imageCompression(albumItem.file, {
            maxWidthOrHeight: 1480,
            maxSizeMB: 2,
            useWebWorker: true,
        });

        const compressedRef = ref(storage, `images/compressed/${uniqueName}_compressed.jpg`);
        const compressedSnap = await uploadBytes(compressedRef, compressed);
        const compressedUrl = await getDownloadURL(compressedSnap.ref);

        // === Original image ===
        const fullRef = ref(storage, `images/full/${uniqueName}_original.jpg`);
        const fullSnap = await uploadBytes(fullRef, albumItem.file);
        const fullUrl = await getDownloadURL(fullSnap.ref);

        return {
            thumbnail: thumbnailUrl,
            compressed: compressedUrl,
            fullImage: fullUrl,
        };
    } catch (error) {
        //@ts-expect-error error is an error and nor have a message nor is the message
        throw new Error(`Image upload failed: ${error.message || error.toString()}`);
    }
};

type CreateAlbumItem = Omit<AlbumItem, "id" | "imageUrls"> & {
    file: File
};

export const useUploadImageMutation = () => {
    return useMutation<AlbumItem, Error, CreateAlbumItem>({
        mutationFn: async (albumItemData): Promise<AlbumItem> => {
            try {
                const imagesUrls = await uploadImageAndCompress(albumItemData);
                const albumItem: Omit<AlbumItem, "id"> = {
                    imageUrls: imagesUrls,
                    moments: albumItemData.moments,
                    createdAt: albumItemData.createdAt,
                    guestName: albumItemData.guestName,
                };

                const docRef = await addDoc(collection(db, "album_items"), albumItem);


                return {
                    id: docRef.id,
                    ...albumItem
                } as AlbumItem;
            } catch (e) {
                console.error(e);
                throw (e);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [`album-items`]})
        }
    });
};
