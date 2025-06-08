import {heicTo} from "heic-to";
import React, {useState} from "react";
import {ImageIcon, XIcon} from "lucide-react";

interface ImageInputProps {
    description?: string;
    onImageChanged: (images: File[]) => void;
    images: File[];
}

const convertHeicToJpg = async (file: File): Promise<File> => {
    try {
        const convertedBlob = await heicTo({
            blob: file,
            type: "image/jpeg",
        });
        return new File(
            [convertedBlob as Blob],
            file.name.replace(/\.heic$/, ".jpg"),
            {
                type: "image/jpeg",
            }
        );
    } catch (e) {
        console.log(e);
        return new File([file as Blob], file.name, {
            type: "image/heic",
        });
    }
};

const ImageInput = (props: ImageInputProps) => {
    const {onImageChanged, description, images} = props;
    const [selectedImages, setSelectedImages] =
        useState<File[]>(images);
    const [imagesLoading, setImagesLoading] = useState<boolean>(false);

    const handleImageChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setImagesLoading(true);
        const files = event.target.files ? Array.from(event.target.files) : null;
        if (files) {
            const remainingSlots = 10 - selectedImages.length;
            if (remainingSlots <= 0) {
                setImagesLoading(false);
                return;
            }

            const limitedFiles = files.slice(0, remainingSlots);

            const filePromises = limitedFiles.map(async (file) => {
                if (!file.type || file.type === "image/heic") {
                    return await convertHeicToJpg(file);
                }
                return file;
            });
            const convertedFiles = await Promise.all(filePromises);
            const newImages = [...selectedImages, ...convertedFiles];
            setSelectedImages(newImages);
            onImageChanged(newImages);

        }
        setImagesLoading(false);
    };


    const handleImageDelete = (imageId: number) => {
        const files = selectedImages;
        files.splice(imageId, 1);
        setSelectedImages(Array.from(files));
        onImageChanged(Array.from(files));
    };

    return (
        <div className="flex flex-col w-full rounded-full space-y-1 py-6">
            {description && <p className="text-xs opacity-70 pb-1">{description}</p>}
            <label
                htmlFor="images"
                className="cursor-pointer border-2 rounded-xl border-white/30 border-dashed"
            >
                <div className="flex flex-col items-center justify-center py-12">
                    <ImageIcon className="h-8 text-white/30"/>
                    {selectedImages.length != 0 ? (
                        <>
                            <p className="font-semibold text-sm text-white/70">
                                {selectedImages.length} médias{selectedImages.length > 1 && "s"}{" "}
                                chargés{selectedImages.length > 1 && "s"}
                            </p>
                            <p className="font-semibold text-sm text-white/70">
                                Cliquez pour ajouter des médias
                            </p>
                        </>
                    ) : (
                        <p className="font-semibold text-sm text-white/70">
                            Cliquez pour charger des médias
                        </p>
                    )}

                    <p className="text-xs text-white/70">SVG, PNG, JPG, HEIC ou GIF</p>
                </div>
            </label>
            <input
                type="file"
                id="images"
                onChange={handleImageChange}
                accept="image/*,video/*"
                multiple={true}
                style={{display: "none"}}
                className="bg-pink-200 w-20 h-20"
                alt={"image"}/>
            {imagesLoading ? (
                <div className="flex flex-1 justify-center py-2">
                    Loading...
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-2 pt-2 md:grid-cols-4">
                    {selectedImages.map((file, index) => {
                        const isVideo = file.type.startsWith("video/");
                        const src = URL.createObjectURL(file);

                        return (
                            <div className="relative flex items-center" key={index}>
                                {isVideo ? (
                                    <video controls className="object-cover h-full aspect-square">
                                        <source src={src} type={file.type}/>
                                    </video>
                                ) : (
                                    <img
                                        className="object-cover h-full aspect-square"
                                        src={src}
                                        alt={`media_${index}`}
                                    />
                                )}
                                <button
                                    type="button"
                                    className="absolute top-1 right-1 rounded-lg bg-red-300 p-2"
                                    onClick={() => handleImageDelete(index)}
                                >
                                    <XIcon className="text-red-800 h-4"/>
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ImageInput;
