import { HomePageContent } from "@/types/pages";
import Container from "./Container";

export const CoreValues = ({
  data,
}: {
  data: HomePageContent["sections"]["coreValues"];
}) => {
  const values = [
    {
      title: "Creativity",
      caption:
        "At Rara Studio, creativity isn’t just a skill – it’s a guiding principle. We encourage our team to push the limits of their imagination, experimenting with bold ideas and fresh approaches to bring visually compelling content to life. Our process is rooted in the belief that there are no boundaries to what we can achieve.",
    },
    {
      title: "Collaboration",
      caption:
        "We believe the best results come from working together. Collaboration lies at the heart of our creative process, as we work closely with clients to ensure their voice, vision, and goals are reflected in every project. This partnership-driven approach allows us to create work that resonates with audiences and strengthens brand identities.",
    },
    {
      title: "Excellence",
      caption:
        "Our commitment to excellence is present in every stage of our work. From concept to final execution, we uphold the highest standards of quality, creativity, and professionalism, ensuring each project exceeds expectations. We are dedicated to delivering exceptional results, no matter the scope or scale.",
    },
    {
      title: "Integrity",
      caption:
        "Transparency, honesty, and accountability are at the core of our business values. We adhere to high ethical standards, ensuring every interaction, decision, and project is conducted with integrity. At Rara Studio, we believe in building lasting relationships with clients based on trust and reliability.",
    },
  ];
  return (
    <section className="pb-20 bg-white text-black">
      <Container>
        <div className="text-center w-full flex items-center justify-center">
          <h6 className="pb-1  border-b border-b-black w-fit font-bold text-4xl px-10">
            Core Values
          </h6>
        </div>
        <ul className="grid grid-cols-2 max-lg:grid-cols-1 gap-12 mt-20">
          {(!data || data?.items?.value?.length < 1) &&
            values.map((value, i) => {
              return (
                <li key={i}>
                  <h6 className="font-bold text-4xl mb-6 text-primary">
                    {i + 1}. {value.title}
                  </h6>
                  <p className="font-normal text-xl leading-[102%] text-justify">
                    {value.caption}
                  </p>
                </li>
              );
            })}
          {data &&
            data?.items?.value?.length > 0 &&
            data?.items?.value
              ?.filter((i) => i.title && i.caption)
              .map((value, i) => {
                return (
                  <li key={i}>
                    <h6 className="font-bold text-4xl mb-6 text-primary">
                      {i + 1}. {value.title}
                    </h6>
                    <p className="font-normal text-xl leading-[102%] text-justify">
                      {value.caption}
                    </p>
                  </li>
                );
              })}
        </ul>
      </Container>
    </section>
  );
};
