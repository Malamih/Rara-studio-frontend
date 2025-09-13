import Container from "@/components/Container";
import { HomePageContent, PageContent } from "@/types/pages";

export const About = ({
  data,
}: {
  data: HomePageContent["sections"]["about"];
}) => {
  return (
    <section className="mt-16">
      <Container className="text-center">
        <h4 className="font-bold text-3xl mb-11">{data?.headline?.value}</h4>
        <div
          className="font-normal text-2xl"
          dangerouslySetInnerHTML={{ __html: data?.subheadline?.value }}
        ></div>
      </Container>
    </section>
  );
};
