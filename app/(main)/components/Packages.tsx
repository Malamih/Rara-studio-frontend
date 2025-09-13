"use client";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { HomePageContent } from "@/types/pages";

export const Packages = ({
  data,
}: {
  data: HomePageContent["sections"]["packages"];
}) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | undefined>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideCount, setSlideCount] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;

    const update = () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
      setSlideCount(carouselApi.scrollSnapList().length);
    };

    update();
    carouselApi.on("select", update);
    return () => {
      carouselApi.off("select", update);
    };
  }, [carouselApi]);

  return (
    <section className="pb-32 bg-white text-black">
      <Container className="flex gap-16 max-lg:flex-col">
        <div className="content max-sm:text-center">
          <h6
            className="font-normal text-4xl mb-10"
            dangerouslySetInnerHTML={{ __html: data?.headline?.value }}
          ></h6>
          <div
            className="font-normal text-xl mb-16"
            dangerouslySetInnerHTML={{ __html: data?.subheadline?.value }}
          ></div>
          <div className="flex items-center gap-2 max-sm:flex-col">
            <Button
              variant={"outline"}
              className="bg-white text-black px-10 max-sm:w-full"
            >
              Contact us
            </Button>
            <Button className="px-10 font-medium max-sm:w-full">
              Our Portfolio
            </Button>
          </div>
        </div>

        <div className="packages min-w-2xl xl:max-w-lg max-xl:min-w-sm max-lg:min-w-[unset] h-full">
          <Carousel
            setApi={setCarouselApi}
            opts={{ loop: true }}
            plugins={[
              Autoplay({
                delay: 3000, // 3 ثواني بين السلايدات
                stopOnInteraction: true, // يوقف لو المستخدم تدخل
              }),
            ]}
            className="w-full"
          >
            <CarouselContent>
              {(data?.images?.value?.length < 1 || !data) &&
                Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index}>
                    <Image
                      width={1000}
                      height={1000}
                      className="w-full h-[400px] object-cover"
                      src={`/slideshow/1.png`}
                      alt="slide-show-image"
                      style={{
                        clipPath:
                          "polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)",
                      }}
                    />
                  </CarouselItem>
                ))}
              {data?.images?.value?.length > 0 &&
                data &&
                data?.images?.value.map((image, index) => (
                  <CarouselItem key={index}>
                    <Image
                      width={1000}
                      height={1000}
                      className="w-full h-[400px] object-cover"
                      src={image}
                      alt="slide-show-image"
                      style={{
                        clipPath:
                          "polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)",
                      }}
                    />
                  </CarouselItem>
                ))}
            </CarouselContent>
          </Carousel>

          <div className="flex justify-center space-x-2 mt-4">
            {(data?.images?.value?.length < 1 || !data) &&
              Array.from({ length: slideCount }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => carouselApi?.scrollTo(idx)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentSlide === idx ? "bg-primary" : "bg-muted-foreground"
                  }`}
                />
              ))}
            {data?.images?.value?.length > 0 &&
              data &&
              data?.images?.value?.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => carouselApi?.scrollTo(idx)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentSlide === idx ? "bg-primary" : "bg-muted-foreground"
                  }`}
                />
              ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
