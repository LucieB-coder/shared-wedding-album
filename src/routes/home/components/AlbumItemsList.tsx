import {useAlbumItems} from "../../../api/images/queries";
import type {AlbumItem} from "../../../api/images/types.ts";

export const AlbumItemsList = () => {
    const {
        data,
        isLoading,
        isError,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useAlbumItems();

    if (isLoading) return <p className="flex-1">Chargement...</p>;
    if (isError) return <p  className="flex-1">Erreur de chargement ❌</p>;

    const items = data?.pages.flat() || [];

    return (
        <div className="py-4 space-y-4">
            <div className="grid grid-cols-3 gap-1">
                {items.map((item: AlbumItem) => (
                    <div key={item.id}>
                        <img
                            src={item.imageUrls?.thumbnail}
                            alt={item.guestName}
                            className="w-full aspect-square object-cover"
                        />
                    </div>
                ))}
            </div>

            {hasNextPage && (
                <button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    className="block mx-auto mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    {isFetchingNextPage ? "Chargement..." : "Charger plus"}
                </button>
            )}
        </div>
    );
};
