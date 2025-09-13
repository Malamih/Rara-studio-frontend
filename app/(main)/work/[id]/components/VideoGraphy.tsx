import Container from "@/components/Container";
import { Layer } from "@/components/ui/Layer";
import PlayIcon from "@/assets/icons/play.svg";
import clsx from "clsx";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Videography } from "@/types/videography.type";

export const VideoGraphy = ({ data }: { data: Videography[] }) => {
  return (
    <section className="mb-36">
      <Container>
        <ul className="grid grid-cols-2 max-lg:grid-cols-1 gap-8 mb-9">
          {data.map((video, index: number) => (
            <li
              className={clsx(
                "relative group overflow-hidden cursor-pointer h-[365px]"
              )}
              key={index}
            >
              <Layer className="to-black/40 z-[1]" />
              <Image
                src={video?.thumbnail}
                alt={`Videography ${index + 1}`}
                width={1000}
                height={1000}
                className={clsx(
                  "w-full object-cover group-hover:scale-110 transition duration-500 ease-out z-0 relative",
                  {
                    "h-[365px]": index >= 0 && index < 2,
                    "h-full": index > 2,
                  }
                )}
              />

              <div className="absolute z-[2] inset-0 flex items-center justify-center">
                <PlayIcon className="w-16 h-16 text-white opacity-90 group-hover:scale-110 transition-transform" />
              </div>

              <div className="absolute z-[2] bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8 text-white">
                <p className="text-sm opacity-80">Mirmaz Academy</p>
                <h3 className="text-lg font-semibold">Lorem Ipsum lorem</h3>
              </div>
            </li>
          ))}
        </ul>
        <div className="w-full flex items-start max-md:items-center">
          {/* <Button
            shape={"sharp"}
            variant={"darK"}
            className="px-8 !py-4 text-lg"
          >
            Load more
          </Button> */}
        </div>
      </Container>
    </section>
  );
};
