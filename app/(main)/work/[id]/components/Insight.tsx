import Container from "@/components/Container";

export const Insight = ({
  data,
}: {
  data: { insight: string; description: string };
}) => {
  return (
    <section className="mb-20">
      <Container>
        <div className="max-md:text-center max-lg:w-full">
          <h2 className="font-normal text-2xl leading-[100%] mb-3.5 max-md:text-xl">
            Insight
          </h2>
          <h2 className="font-bold text-3xl leading-[100%] mb-4 max-md:text-2xl">
            {data?.insight}
          </h2>
          <p className="font-normal text-2xl leading-[100%] max-md:text-xl">
            {data?.description}
          </p>
        </div>
      </Container>
    </section>
  );
};
