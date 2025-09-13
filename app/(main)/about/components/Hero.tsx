import Container from "@/components/Container";
import { AboutPageContent } from "@/types/pages";
import Image from "next/image";
import { useState } from "react";

export const Hero = ({
  data,
}: {
  data: AboutPageContent["sections"]["hero"];
}) => {
  const [imgSrc, setImgSrc] = useState(data?.image?.value || "/about/hero.jpg");

  return (
    <section className="min-h-[calc(100vh-var(--header-height))]">
      <Container className="flex gap-12 pt-16 justify-between">
        <div className="text w-full max-w-2xl">
          <h1 className="font-caramel text-9xl font-normal mb-10 max-md:text-7xl">
            {data?.headline?.value}
          </h1>
          <div
            className="font-normal text-xl max-md:text-lg"
            dangerouslySetInnerHTML={{ __html: data?.subheadline?.value }}
          />
        </div>
        <div className="min-w-xl h-full max-xl:min-w-sm max-lg:hidden">
          <Image
            src={imgSrc}
            width={1000}
            height={1000}
            alt="hero image"
            className="w-full h-full max-h-[600px] object-cover"
            onError={() => setImgSrc("/about/hero.jpg")}
          />
        </div>
      </Container>
    </section>
  );
};
