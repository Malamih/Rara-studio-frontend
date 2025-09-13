import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PortfolioPhotography } from "./Content";
import { Portfolio } from "@/types/portfolio.type";

export const Photography = ({ data }: { data: PortfolioPhotography[] }) => {
  return (
    <section className="mb-20">
      <Container>
        <ul className="grid gap-9 grid-cols-[repeat(auto-fill,minmax(402px,1fr))] max-sm:flex max-sm:flex-col mb-9">
          {data &&
            data?.map((image, i: number) => (
              <li key={i} className="w-full h-[500px] overflow-hidden">
                <Image
                  src={image?.image?.url}
                  width={1000}
                  height={1000}
                  alt="photography"
                  className="w-full h-full object-cover object-top hover:scale-110 transition duration-500 ease-out"
                />
              </li>
            ))}
        </ul>
        {/* <div className="w-full flex items-start max-md:items-center">
          <Button
            shape={"sharp"}
            variant={"darK"}
            className="px-8 !py-4 text-lg"
          >
            Load more
          </Button>
        </div> */}
      </Container>
    </section>
  );
};
