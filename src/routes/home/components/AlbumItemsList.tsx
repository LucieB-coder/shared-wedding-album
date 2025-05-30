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

    if (isLoading) return <p>Chargement...</p>;
    if (isError) return <p>Erreur de chargement ❌</p>;

    const items = data?.pages.flat() || [];

    return (
        <div className="p-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {items.map((item: AlbumItem) => (
                    <div key={item.id} className="rounded-lg border p-3 shadow bg-white">
                        <img
                            src={item.imageUrls?.thumbnail}
                            alt={item.guestName}
                            className="w-full rounded"
                        />
                        <div className="mt-2">
                            <p className="font-semibold capitalize">{item.guestName}</p>
                            <p className="text-xs text-gray-500">{item.moments?.join(", ")}</p>

                        </div>
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
