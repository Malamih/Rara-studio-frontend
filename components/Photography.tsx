"use client";

import Image from "next/image";
import Ellipse from "@/assets/icons/ellipse.svg";
import { ComponentProps, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Layer } from "./ui/Layer";
import { cn } from "@/lib/utils";
import { Photography as PhotographyType } from "@/types/photography.type";
import clsx from "clsx";

export const Photography = ({
  className,
  data,
}: ComponentProps<"div"> & { data: PhotographyType[] }) => {
  return (
    <section className={cn("p-4", className)}>
      <ul className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-10">
        {/* {(!data || data?.length < 0) &&
          Array.from({ length: 8 }).map((_, i) => (
            <ImageWithSkeleton
              key={`photo-${i}`}
              index={i}
              data={
                {
                  image: { url: `/photography/${i + 1}.jpg` },
                  title: "Mirmaz Academy Session",
                } as any
              }
            />
          ))} */}
        {/* {(!data || data?.length < 0) &&
          Array.from({ length: 8 }).map((_, i) => (
            <ImageWithSkeleton
              key={`photo-${i}`}
              index={i}
              data={
                {
                  image: { url: `/photography/${i + 1}.jpg` },
                  title: "Mirmaz Academy Session",
                } as any
              }
            />
          ))} */}
        {data &&
          data?.length > 0 &&
          data?.map((image, i) => (
            <ImageWithSkeleton key={`photo-${i}`} index={i} data={image} />
          ))}
      </ul>
    </section>
  );
};

const ImageWithSkeleton = ({
  index,
  data,
}: {
  index: number;
  data: PhotographyType;
}) => {
  const [loaded, setLoaded] = useState(false);

  const heights = [280, 320, 360, 400, 440];
  const skeletonHeight = heights[index % heights.length];

  return (
    <li className="break-inside-avoid overflow-hidden relative">
      <Layer />
      <div className="content absolute bottom-[44px] w-full text-center flex flex-col items-center justify-center left-2/4 -translate-2/4">
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
        ></Skeleton>
      )}
      <Image
        width={1000}
        height={1000}
        src={data?.image?.url}
        alt={data?.title}
        className={clsx(
          "w-full h-[489px] object-cover transition-opacity duration-500",
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
