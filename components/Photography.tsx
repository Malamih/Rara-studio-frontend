"use client";
import Image from "next/image";
import Ellipse from "@/assets/icons/ellipse.svg";
import { ComponentProps, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Layer } from "./ui/Layer";
import { cn } from "@/lib/utils";
import { Photography as PhotographyType } from "@/types/photography.type";
import clsx from "clsx";

export const Photography = ({
  className,
  data,
}: ComponentProps<"div"> & { data: PhotographyType[] }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleClose = () => {
    setSelectedImageIndex(null);
  };

  const handleNext = () => {
    if (selectedImageIndex !== null && data) {
      setSelectedImageIndex((selectedImageIndex + 1) % data.length);
    }
  };

  const handlePrevious = () => {
    if (selectedImageIndex !== null && data) {
      setSelectedImageIndex(
        selectedImageIndex === 0 ? data.length - 1 : selectedImageIndex - 1
      );
    }
  };

  const handleDotClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  return (
    <>
      <section className={cn("p-4", className)}>
        <ul className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-10">
          {data &&
            data?.length > 0 &&
            data?.map((image, i) => (
              <ImageWithSkeleton
                key={`photo-${i}`}
                index={i}
                data={image}
                onClick={() => handleImageClick(i)}
              />
            ))}
        </ul>
      </section>

      {/* Photography Popup Carousel */}
      <Dialog open={selectedImageIndex !== null} onOpenChange={handleClose}>
        <DialogContent
          className="max-w-[90vw] max-h-[90vh] w-[90vw] h-[90vh] p-0 bg-black/95 border-none overflow-hidden"
          onPointerDownOutside={handleClose}
        >
          <VisuallyHidden>
            <DialogTitle>
              {selectedImageIndex !== null && data
                ? data[selectedImageIndex].title
                : "Photography Gallery"}
            </DialogTitle>
          </VisuallyHidden>
          {selectedImageIndex !== null && data && (
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Previous Button */}
              {data.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-black/50 text-white rounded-full"
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
              )}

              {/* Main Image */}
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={data[selectedImageIndex].image?.url}
                  alt={data[selectedImageIndex].title}
                  width={1920}
                  height={1080}
                  className="max-w-full max-h-full object-contain"
                  priority
                />

                {/* Image Title Overlay */}
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center">
                  <div className="flex items-center gap-1 mb-2 justify-center">
                    <Ellipse className="text-white" />
                    <Ellipse className="text-white" />
                    <Ellipse className="text-white" />
                  </div>
                  <h3 className="text-white text-xl font-bold bg-black/50 px-4 py-2 rounded-lg">
                    {data[selectedImageIndex].title}
                  </h3>
                </div>
              </div>

              {/* Next Button */}
              {data.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-black/50 text-white rounded-full"
                  onClick={handleNext}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              )}

              {/* Dot Navigation */}
              {data.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-50">
                  {data.map((_, index) => (
                    <button
                      key={index}
                      className={clsx(
                        "w-3 h-3 rounded-full transition-all duration-200",
                        {
                          "bg-white": index === selectedImageIndex,
                          "bg-white/50 hover:bg-white/70":
                            index !== selectedImageIndex,
                        }
                      )}
                      onClick={() => handleDotClick(index)}
                    />
                  ))}
                </div>
              )}

              {/* Image Counter */}
              {data.length > 1 && (
                <div className="absolute top-4 left-4 z-50 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {selectedImageIndex + 1} / {data.length}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

const ImageWithSkeleton = ({
  index,
  data,
  onClick,
}: {
  index: number;
  data: PhotographyType;
  onClick: () => void;
}) => {
  const [loaded, setLoaded] = useState(false);
  const heights = [280, 320, 360, 400, 440];
  const skeletonHeight = heights[index % heights.length];

  return (
    <li
      className="break-inside-avoid overflow-hidden relative cursor-pointer group"
      onClick={onClick}
    >
      <Layer />

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

      <div className="content absolute bottom-[44px] w-full text-center flex flex-col items-center justify-center left-2/4 -translate-x-1/2 z-20">
        <div className="flex items-center gap-1 mb-1">
          <Ellipse />
          <Ellipse />
          <Ellipse />
        </div>
        <span className="font-bold text-lg leading-[100%]">{data?.title}</span>
      </div>

      {!loaded && (
        <Skeleton
          className="w-full bg-primary/20 rounded-none"
          style={{
            height: skeletonHeight,
          }}
        />
      )}

      <Image
        width={1000}
        height={1000}
        src={data?.image?.url}
        alt={data?.title}
        className={clsx(
          "w-full h-[489px] object-cover transition-all duration-500",
          {
            "opacity-100": loaded,
            "opacity-0": !loaded,
          }
        )}
        onLoad={() => setLoaded(true)}
      />
    </li>
  );
};
