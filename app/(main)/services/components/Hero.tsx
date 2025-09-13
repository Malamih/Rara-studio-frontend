import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { ServicesPageContent } from "@/types/pages";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Hero = ({
  data,
}: {
  data: ServicesPageContent["sections"]["hero"];
}) => {
  return (
    <section className="h-[calc(70vh-var(--header-height))] min-h-[307px] max-h-[600px] bg-[#A61B3B]">
      <Container className="flex items-center h-full gap-12 text-white">
        <div className="text max-md:flex max-md:items-center max-md:justify-center max-md:flex-col max-md:text-center">
          <h1 className="font-bold text-7xl max-sm:text-5xl mb-6">
            {data?.headline?.value}
          </h1>
          <div
            className="font-normal text-base leading-[100%] mb-7"
            dangerouslySetInnerHTML={{
              __html: (data?.subheadline?.value as string) || "",
            }}
          ></div>
          <Link href={"/contact"}>
            <Button variant={"darK"} shape={"sharp"} className="!px-6">
              Let's connect <ArrowRight />
            </Button>
          </Link>
        </div>
        <div className="image w-full self-end translate-y-12 max-xl:translate-y-2 min-w-[600px] max-xl:min-w-[400px] max-lg:hidden">
          <Image
            src={data?.image?.value || "/services/hero.jpg"}
            width={1000}
            height={1000}
            alt="hero image"
            className="w-full object-cover h-[400px] max-xl:h-[300px]"
          />
        </div>
      </Container>
    </section>
  );
};
