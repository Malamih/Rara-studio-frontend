import Container from "@/components/Container";
import { Placeholder } from "@/components/ui/Placeholder";
import Image from "next/image";

export const Hero = ({
  data,
}: {
  data: { image: string; logo: string; name: string };
}) => {
  return (
    <section className="w-full relative mb-72 h-[calc(60vh-var(--header-height))] min-h-[430px] max-h-[600px] bg-gray-400">
      {data?.image && (
        <Placeholder
          src={data?.image}
          style={{ objectPosition: "50% 20%" }}
          className="pointer-events-none z-0"
        />
      )}
      <Container className="relative h-full translate-y-44 z-10 flex flex-col items-center justify-end">
        <div className="logo bg-[#D9D9D9] w-[180px] h-[180px] rounded-full flex items-center justify-center">
          {data?.logo && (
            <Image
              src={data?.logo}
              width={1000}
              height={1000}
              alt="O3"
              className="w-[90px] h-auto object-cover brightness-0"
            />
          )}
        </div>
        <div className="name mt-5">
          <h1 className="font-bold text-5xl">{data?.name}</h1>
        </div>
      </Container>
    </section>
  );
};
