"use client";
import Container from "@/components/Container";
import { Photography } from "@/components/Photography";
import { VideoGraphy } from "@/components/VideoGraphy";
import { cn } from "@/lib/utils";
import { useGetPhotographies } from "@/services/photography";
import { useGetVideographies } from "@/services/videography";
import { Photography as PhotographyType } from "@/types/photography.type";
import { Videography } from "@/types/videography.type";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ChevronLeft from "@/assets/icons/chevronLeft.svg";
import { ComponentProps, useState } from "react";

interface Props {
  page?: "home" | "work";
}

export const Work = ({
  className,
  page = "home",
}: ComponentProps<"div"> & Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: photos } = useGetPhotographies({
    query: { limit: 6, page: currentPage },
  });
  const { data: videos } = useGetVideographies({
    query: { limit: 6, page: currentPage },
  });

  const photoLast = photos?.lastPage ?? 0;
  const videoLast = videos?.lastPage ?? 0;

  // إذا الاثنين موجودين → ناخذ الأعلى
  // إذا واحد فقط موجود → ناخذ صفحاته
  // إذا الاثنين فاضيين → lastPage = 1 (يعني ممنوع يقلب)
  const lastPage =
    photoLast > 0 && videoLast > 0
      ? Math.max(photoLast, videoLast)
      : photoLast > 0
      ? photoLast
      : videoLast > 0
      ? videoLast
      : 1;

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  const handleNext = () => {
    if (currentPage < lastPage) setCurrentPage((p) => p + 1);
  };

  return (
    <section className={cn(className)}>
      <Container className="pb-16">
        <h5 className="mb-28 font-normal text-5xl text-center">Our Work</h5>

        <Photography
          className="text-white"
          data={photos?.payload as PhotographyType[]}
        />

        <VideoGraphy
          data={
            currentPage <= videoLast
              ? (videos?.payload as Videography[])
              : ([] as Videography[])
          }
        />

        {page == "home" && (
          <div className="w-full flex items-center justify-center mt-16">
            <Link href={"/work"} className="flex items-center gap-2">
              <span className="font-normal text-xl border-b-[0.5px] border-white">
                All Work
              </span>
              <ArrowRight />
            </Link>
          </div>
        )}

        {page == "work" && (photoLast > 0 || videoLast > 0) && (
          <div className="w-full flex items-center justify-center mt-16">
            <div className="flex items-center gap-2">
              {/* Prev */}
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={cn(
                  "w-[50px] h-[50px] rounded-full border-3 border-black flex items-center justify-center transition duration-200",
                  currentPage === 1
                    ? "opacity-40 cursor-not-allowed"
                    : "opacity-70 hover:opacity-100 hover:bg-black/5"
                )}
              >
                <ChevronLeft />
              </button>

              {/* Next */}
              <button
                onClick={handleNext}
                disabled={currentPage === lastPage}
                className={cn(
                  "w-[50px] h-[50px] rounded-full border-3 border-black flex items-center justify-center transition duration-200 rotate-180",
                  currentPage === lastPage
                    ? "opacity-40 cursor-not-allowed"
                    : "opacity-70 hover:opacity-100 hover:bg-black/5"
                )}
              >
                <ChevronLeft />
              </button>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};
