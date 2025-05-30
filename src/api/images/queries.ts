// src/api/images/queries.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import { collection, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import type { AlbumItem } from "./types";

const PAGE_SIZE = 10; // ou ce que tu veux
const STALE_MINUTES = 5;

export const useAlbumItems = () => {
    return useInfiniteQuery<AlbumItem[], Error>({
        queryKey: ["albumItems"],
        queryFn: async ({ pageParam }) => {
            const albumItems: AlbumItem[] = [];

            const baseQuery = query(
                collection(db, "album_items"),
                orderBy("createdAt", "desc"),
                ...(pageParam ? [startAfter(pageParam)] : []),
                limit(PAGE_SIZE)
            );

            const snapshot = await getDocs(baseQuery);
            snapshot.forEach((doc) => {
                const data = doc.data();
                albumItems.push({ id: doc.id, ...data } as AlbumItem);
            });

            return albumItems;
        },
        initialPageParam: null,
        getNextPageParam: (lastPage) =>
            lastPage.length > 0 ? lastPage[lastPage.length - 1].createdAt : null,
        staleTime: STALE_MINUTES * 60 * 1000,
    });
};
