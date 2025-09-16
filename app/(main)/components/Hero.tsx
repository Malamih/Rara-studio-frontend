import Container from "@/components/Container";
import LogoIconOnly from "@/assets/logo-icon-only.svg";
import Arrow2Down from "@/assets/icons/arrow2Down.svg";
import { Placeholder } from "@/components/ui/Placeholder";
import Link from "next/link";
import { HomePageContent } from "@/types/pages";
import { useEffect, useRef } from "react";
import { SplitText } from "gsap/all";
import gsap from "gsap-trial/all";

export const Hero = ({
  data,
}: {
  data?: HomePageContent["sections"]["hero"];
}) => {
  const tagline = useRef(null);
  const subTitle = useRef(null);
  const callToActionButton = useRef(null);
  const headline = useRef(null);
  const subheadline = useRef(null);

  useEffect(() => {
    if (
      !tagline.current ||
      !subTitle.current ||
      !callToActionButton?.current ||
      !headline?.current ||
      !subheadline?.current ||
      !data
    )
      return;
    const tl = gsap.timeline({});
    const subTitleSplitText = new SplitText(subTitle?.current, {
      type: "chars",
    });
    console.log(data);
    const subTitleChars = subTitleSplitText.chars;
    if (subTitleChars) {
      tl.from(subTitleChars, {
        yPercent: 30,
        stagger: 0.02,
        ease: "back.out",
        duration: 1,
        opacity: 0,
        delay: 0.4,
      });
    }
  }, [data]);
  return (
    <section className="h-[calc(100vh-var(--header-height))] pb-12 relative">
      <Placeholder src="/home/hero.jpg" />
      <Container className="z-10 relative flex flex-col h-full justify-between">
        <header>
          <h1 className="text-2xl font-normal">
            <span
              className="font-caramel text-8xl font-normal leading-[96%]"
              ref={tagline}
            >
              {data?.tagline?.value}
            </span>
            <br />{" "}
            <span ref={subTitle} className="inline-block">
              {data?.subTitle?.value}
            </span>
          </h1>
        </header>
        <footer className="flex items-center justify-between relative max-md:flex-col-reverse max-md:items-start gap-4">
          <div className="arrow absolute -top-12 left-2/4 -translate-x-2/4  animate-bounce">
            <Arrow2Down />
          </div>
          <Link href={"/contact"} className="hover:underline">
            <h2 className="flex items-center gap-2 text-xl leading-[100%]">
              <LogoIconOnly />
              <div
                ref={callToActionButton}
                dangerouslySetInnerHTML={{
                  __html: data?.callToActionButton.value as string,
                }}
              ></div>
            </h2>
          </Link>
          <div>
            <h3 className="font-bold text-3xl" ref={headline}>
              {data?.headline?.value}
            </h3>
            <p className="font-normal text-xl" ref={subheadline}>
              {data?.subheadline?.value}
            </p>
          </div>
        </footer>
      </Container>
    </section>
  );
};
