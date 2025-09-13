import { HomePageContent } from "@/types/pages";
import Container from "./Container";

export const WhyUs = ({
  data,
}: {
  data: HomePageContent["sections"]["whyUs"];
}) => {
  const headlineValue = data?.headline?.value || "";
  const words = headlineValue.split(" ");
  const lastTwoWords = words.slice(-2).join(" ");
  const firstWords = words.slice(0, -2).join(" ");

  return (
    <section className="py-24 bg-white text-black">
      <Container className="max-md:text-center">
        <h5 className="font-bold mb-8 text-5xl leading-[100%]">
          {firstWords} <span className="text-primary">{lastTwoWords}</span>
        </h5>
        <div
          className="text-2xl"
          dangerouslySetInnerHTML={{
            __html: (data?.subheadline?.value as string) || "",
          }}
        ></div>
      </Container>
    </section>
  );
};
