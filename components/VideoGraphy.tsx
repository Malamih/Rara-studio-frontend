"use client";

import Image from "next/image";
import PlayIcon from "@/assets/icons/play.svg"; // svgr import
import { Layer } from "./ui/Layer";
import clsx from "clsx";
import { Videography } from "@/types/videography.type";
import { SimpleVimeoPlayer } from "./VimeoPlayer";
import { useState } from "react";
import { StopCircle } from "lucide-react";

export const VideoGraphy = ({ data }: { data: Videography[] }) => {
  const items = Array.from({ length: 6 });
  return (
    <section className="p-4 space-y-8">
      {(data?.length < 0 || !data) && (
        <>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.slice(0, 2).map((_, i) => (
              <VideoCard
                key={i}
                index={i}
                data={{
                  thumbnail: `/videography/${i + 1}.jpg`,
                  _id: `video-${i}`,
                  createdAt: "",
                  portfolio: {
                    name: "Mirmaz Academy",
                  } as any,
                  title: "Lorem Ipsum lorem",
                  updatedAt: "",
                  video: "",
                }}
              />
            ))}
          </ul>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.slice(2).map((_, i) => (
              <VideoCard
                key={i + 2}
                index={i + 2}
                data={{
                  thumbnail: `/videography/${i + 1}.jpg`,
                  _id: `video-${i}`,
                  createdAt: "",
                  portfolio: {
                    name: "Mirmaz Academy",
                  } as any,
                  title: "Lorem Ipsum lorem",
                  updatedAt: "",
                  video: "",
                }}
              />
            ))}
          </ul>
        </>
      )}
      {data?.length > 0 && (
        <>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.slice(0, 2).map((video, i) => (
              <VideoCard key={i} index={i} data={video} />
            ))}
          </ul>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.slice(2).map((video, i) => (
              <VideoCard key={i + 2} index={i + 2} data={video} />
            ))}
          </ul>
        </>
      )}
    </section>
  );
};

const VideoCard = ({ index, data }: { index: number; data: Videography }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li
      className={clsx("relative group overflow-hidden cursor-pointer", {
        "h-[365px]": index >= 0 && index < 2,
        "h-auto": index >= 2,
      })}
      onClick={() => setIsOpen(true)}
    >
      {/* Vimeo Player modal */}
      {isOpen && (
        <SimpleVimeoPlayer
          videoUrl={data?.video}
          open={isOpen}
          onClose={() => setIsOpen(false)}
          autoplay
          loop
          muted
          width={800}
          height={450}
        />
      )}

      <Layer className="to-black/40" />

      <Image
        src={data?.thumbnail}
        alt={data?.title}
        width={1000}
        height={1000}
        className={clsx("w-full h-full object-cover", {
          "h-[365px]": index >= 0 && index < 2,
          "h-full": index >= 2,
        })}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        {isOpen ? (
          <StopCircle className="w-14 h-14 text-white/60 opacity-90 group-hover:scale-110 transition-transform" />
        ) : (
          <PlayIcon className="w-16 h-16 text-white opacity-90 group-hover:scale-110 transition-transform" />
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8 text-white">
        <p className="text-sm opacity-80">
          {typeof data?.portfolio !== "string" && data?.portfolio?.name}
        </p>
        <h3 className="text-lg font-semibold">{data?.title}</h3>
      </div>
    </li>
  );
};
