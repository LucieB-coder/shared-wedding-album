import {useAlbumItems} from "../../../api/images/queries";
import type {AlbumItem} from "../../../api/images/types.ts";
import {useEffect, useRef, useState} from "react";
import {PhotoGalleryModal} from "../../../components/galleryModal";


export const AlbumItemsList = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);


    const {
        data,
        isLoading,
        isError,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useAlbumItems();

    const handlePhotoClick = (index: number) => {
        setSelectedIndex(index);
        setModalOpen(true);
    };


    const items = data?.pages.flat() || [];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            {
                root: null,
                rootMargin: "100px",
                threshold: 1.0,
            }
        );

        const target = loadMoreRef.current;
        if (target) observer.observe(target);

        return () => {
            if (target) observer.unobserve(target);
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);


    if (isLoading) return <p className="flex-1">Chargement...</p>;
    if (isError) return <p className="flex-1">Erreur de chargement ❌</p>;

    return (
        <div className="py-4 space-y-4 flex flex-col items-center justify-center">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-1 max-w-5xl">
                {items.map((item: AlbumItem, index: number) => (
                    <button key={item.id} onClick={() => handlePhotoClick(index)} className="cursor-pointer">
                        {item.imageUrls.compressed?.endsWith(".mp4") ||
                        item.imageUrls.compressed?.includes("video") ? (
                            <video
                                height={"90%"}
                                preload='metadata'
                                className="w-full aspect-square object-cover"
                            >
                                <source src={item.imageUrls.compressed} type="video/mp4"/>
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <img
                                alt={`Photo ${item.id}`}
                                src={item.imageUrls.compressed}
                                height={"90%"}
                                className="w-full aspect-square object-cover"
                            />
                        )}
                    </button>
                ))}
            </div>
            <PhotoGalleryModal
                open={isModalOpen}
                onOpen={() => {
                    setModalOpen(prev => !prev)
                }}
                photos={items}
                selectedPhotoIndex={selectedIndex}
                hasNextPage={hasNextPage}
                fetchNextPage={fetchNextPage}
            />
            {hasNextPage && (
                <div ref={loadMoreRef} className="h-10"/>
            )}
            {isFetchingNextPage && (
                <p className="mt-4 text-center text-sm text-gray-400">Chargement...</p>
            )}

        </div>
    );
};
