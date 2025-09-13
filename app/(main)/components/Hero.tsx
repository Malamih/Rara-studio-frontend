import Container from "@/components/Container";
import LogoIconOnly from "@/assets/logo-icon-only.svg";
import Arrow2Down from "@/assets/icons/arrow2Down.svg";
import { Placeholder } from "@/components/ui/Placeholder";
import Link from "next/link";
import { HomePageContent } from "@/types/pages";

export const Hero = ({
  data,
}: {
  data?: HomePageContent["sections"]["hero"];
}) => {
  return (
    <section className="h-[calc(100vh-var(--header-height))] pb-12">
      <Placeholder src="/home/hero.jpg" />
      <Container className="z-10 relative flex flex-col h-full justify-between">
        <header>
          <h1 className="text-2xl font-normal">
            <span className="font-caramel text-8xl font-normal leading-[96%]">
              {data?.tagline?.value}
            </span>
            <br /> {data?.subTitle?.value}
          </h1>
        </header>
        <footer className="flex items-center justify-between relative max-md:flex-col-reverse max-md:items-start gap-4">
          <div className="arrow absolute -top-12 left-2/4 -translate-x-2/4">
            <Arrow2Down />
          </div>
          <Link href={"/contact"} className="hover:underline">
            <h2 className="flex items-center gap-2 text-xl leading-[100%]">
              <LogoIconOnly />
              <div
                dangerouslySetInnerHTML={{
                  __html: data?.callToActionButton.value as string,
                }}
              ></div>
            </h2>
          </Link>
          <div>
            <h3 className="font-bold text-3xl">{data?.headline?.value}</h3>
            <p className="font-normal text-xl">{data?.subheadline?.value}</p>
          </div>
        </footer>
      </Container>
    </section>
  );
};
