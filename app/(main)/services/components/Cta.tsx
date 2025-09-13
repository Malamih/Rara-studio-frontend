import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { ServicesPageContent } from "@/types/pages";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const Cta = ({
  data,
}: {
  data: ServicesPageContent["sections"]["callToAction"];
}) => {
  return (
    <section className="bg-[#A61B3B] text-center text-white py-20">
      <Container className="flex items-center justify-center flex-col">
        <h2
          className="font-bold text-6xl max-sm:text-5xl max-sm:leading-14 leading-16 text-white mb-5"
          dangerouslySetInnerHTML={{
            __html: (data?.title?.value as string) || "",
          }}
        ></h2>
        <p
          className="font-normal text-xl mb-20"
          dangerouslySetInnerHTML={{
            __html: (data?.caption?.value as string) || "",
          }}
        ></p>
        <Link href={"/contact"}>
          <Button
            variant={"darK"}
            shape={"sharp"}
            className="font-bold !px-6 !py-6 text-xl"
          >
            Get in touch <ArrowRight />
          </Button>
        </Link>
      </Container>
    </section>
  );
};
