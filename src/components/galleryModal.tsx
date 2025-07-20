import { ChevronLeft, ChevronRight, TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDeleteAlbumItemMutation } from "../api/images/mutations.ts";
import { type AlbumItem, MOMENTS } from "../api/images/types.ts";
import { Button } from "./Button.tsx";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "./Carousel";
import { Dialog, DialogContent } from "./Dialog";

export const PhotoGalleryModal = ({
  open,
  onOpen,
  photos,
  selectedPhotoIndex,
  hasNextPage,
  fetchNextPage,
}: {
  open: boolean;
  onOpen: (open: boolean) => void;
  photos: AlbumItem[];
  selectedPhotoIndex: number | null;
  hasNextPage: boolean;
  fetchNextPage: () => void;
}) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const deleteItem = useDeleteAlbumItemMutation();

  useEffect(() => {
    if (carouselApi && selectedPhotoIndex !== null) {
      carouselApi.scrollTo(selectedPhotoIndex, true);
    }
  }, [carouselApi, selectedPhotoIndex]);

  useEffect(() => {
    if (!carouselApi || selectedPhotoIndex === null) return;

    const isLastPhoto = selectedPhotoIndex === photos.length - 1;
    if (isLastPhoto && hasNextPage) {
      fetchNextPage();
    }
  }, [
    selectedPhotoIndex,
    photos.length,
    hasNextPage,
    fetchNextPage,
    carouselApi,
  ]);

  const [currentIndex, setCurrentIndex] = useState<number>(
    selectedPhotoIndex ?? 0
  );
  useEffect(() => {
    const isLastPhoto = currentIndex === photos.length - 1;
    if (isLastPhoto && hasNextPage) {
      fetchNextPage();
    }
  }, [currentIndex, photos.length, hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (carouselApi) {
      carouselApi.on("select", () => {
        setCurrentIndex(carouselApi.selectedScrollSnap());
      });
    }
  }, [carouselApi]);

  const handlePrevious = () => {
    carouselApi?.scrollPrev();
  };

  const handleNext = () => {
    carouselApi?.scrollNext();
  };

  const onDeleteItem = async ({ item }: { item: AlbumItem }) => {
    try {
      await deleteItem.mutateAsync(item);
      handlePrevious();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpen}>
      <DialogContent className="w-[100%] text-white overflow-hidden flex items-center justify-center focus:outline-none focus:ring-0">
        {photos.length > 0 && selectedPhotoIndex !== null && (
          <div className="flex w-screen max-h-[80vh] h-full items-center justify-center space-x-3">
            <Button
              onClick={handlePrevious}
              className="bg-transparent rounded-full hover:bg-surface/40 hidden md:flex"
            >
              <ChevronLeft className="h-8 w-auto" />
            </Button>
            <Carousel
              opts={{ loop: false }}
              setApi={setCarouselApi}
              className="flex-1 max-w-[100%] pl-3 items-center justify-center"
            >
              <CarouselContent>
                {photos.map((item: AlbumItem) => (
                  <CarouselItem
                    key={item.id}
                    className="relative flex flex-col gap-2 h-[90%]"
                  >
                    <div className="flex flex-col h-full w-full">
                      <div className="flex-1 flex items-center justify-center overflow-hidden">
                        {item.imageUrls.compressed?.endsWith(".mp4") ||
                        item.imageUrls.compressed?.includes("video") ? (
                          <video
                            controls
                            height={"90%"}
                            className="max-h-[80vh] max-w-full object-contain"
                          >
                            <source
                              src={item.imageUrls.compressed}
                              type="video/mp4"
                            />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <img
                            alt={`Photo ${item.id}`}
                            src={item.imageUrls.compressed}
                            height={"90%"}
                            className="max-h-[80vh] max-w-full object-contain"
                          />
                        )}
                      </div>
                      <div className="flex justify-center w-full p-2 z-50 gap-3 items-center">
                        <div className="text-center text-primary-200">
                          <span className="italic underline">
                            Photo prise par :
                          </span>
                          <span className={"capitalize"}>
                            {" "}
                            {item.guestName}
                          </span>
                          {item.moments?.map((m) => (
                            <p key={m}>{MOMENTS[m]}</p>
                          ))}
                        </div>
                        <DeleteItemButton
                          onDelete={() => onDeleteItem({ item })}
                          disabled={deleteItem.isPending}
                        />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <Button
              onClick={handleNext}
              className="bg-transparent rounded-full hover:bg-surface/40 hidden md:flex"
            >
              <ChevronRight className="h-8 w-auto" />
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

function DeleteItemButton({
  onDelete,
  disabled,
}: {
  onDelete: () => void;
  disabled: boolean;
}) {
  const guestName = localStorage.getItem("guestName") ?? "Inconnu";
  if (guestName === "frank" || guestName === "corinne")
    return (
      <Button
        className="bg-red-700 text-white/90 hover:bg-red-500"
        onClick={onDelete}
        disabled={disabled}
      >
        <TrashIcon className="size-5 shrink-0" />
      </Button>
    );
}
