import Container from "@/components/Container";
import clsx from "clsx";
import Image from "next/image";
import Blob from "@/public/about/overview/blob.svg";
import { AboutPageContent } from "@/types/pages";
export const Overview = ({
  data,
}: {
  data: AboutPageContent["sections"]["overview"];
}) => {
  const images = ["1.jpg", "2.jpg", "3.jpg", "4.jpg"];
  return (
    <section className="my-20 relative">
      <Container className="flex relative gap-12 max-lg:flex-col">
        <div className="absolute top-[80%] max-w-full overflow-hidden -translate-y-2/4 pointer-events-none left-0">
          <Blob />
        </div>
        <ul className="flex flex-col gap-6">
          <li>
            <h2 className="font-bold text-4xl leading-[100%] mb-4">
              {data?.ourMissionTitle?.value}
            </h2>
            <div
              className="font-normal text-xl"
              dangerouslySetInnerHTML={{
                __html: data?.ourMissionCaption?.value,
              }}
            ></div>
          </li>
          <li>
            <h2 className="font-bold text-4xl leading-[100%] mb-4">
              {data?.ourVisionTitle?.value}
            </h2>
            <div
              className="font-normal text-xl"
              dangerouslySetInnerHTML={{
                __html: data?.ourVisionCaption?.value,
              }}
            ></div>
          </li>
          <li>
            <h2 className="font-bold text-4xl leading-[100%] mb-4">
              {data?.coreValuesTitle?.value}
            </h2>
            <div
              className="font-normal text-xl"
              dangerouslySetInnerHTML={{
                __html: data?.coreValuesCaption?.value,
              }}
            ></div>
          </li>
        </ul>
        <ul className="images grid grid-cols-2 w-fit min-w-fit h-fit max-lg:hidden">
          {(!data || data?.images?.value?.length < 1) &&
            images?.map((image, i: number) => (
              <li
                key={i}
                className={clsx("w-[209px] transition-all duration-200", {
                  "flex items-center justify-center": i == 0,
                })}
              >
                <Image
                  src={`/about/overview/${image}`}
                  alt="image"
                  width={1000}
                  height={1000}
                  className={clsx("w-full h-[209px] bg-gray-700 object-cover", {
                    "rounded-bl-full": i == 2,
                    "rounded-full": i == 3,
                    "rotate-45 !w-[145px] transition-all duration-300 !h-[145px]":
                      i == 0,
                  })}
                />
              </li>
            ))}
          {data &&
            data?.images?.value?.length > 0 &&
            data.images.value.map((img, i: number) => (
              <li
                key={i}
                className={clsx("w-[209px] transition-all duration-200", {
                  "flex items-center justify-center": i == 0,
                })}
              >
                <Image
                  src={img || ""}
                  alt="image"
                  width={1000}
                  height={1000}
                  className={clsx("w-full h-[209px] bg-gray-700 object-cover", {
                    "rounded-bl-full": i == 2,
                    "rounded-full": i == 3,
                    "rotate-45 !w-[145px] transition-all duration-300 !h-[145px]":
                      i == 0,
                  })}
                />
              </li>
            ))}
        </ul>
      </Container>
    </section>
  );
};
