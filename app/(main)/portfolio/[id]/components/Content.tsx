"use client";

import Container from "@/components/Container";
import { useGetPartner } from "@/services/partners";
import LogoIcon from "@/assets/logo-icon.svg";
import Link from "next/link";
import Labels from "@/assets/icons/labels.svg";
import Image from "next/image";

export const Content = ({ id }: { id: string }) => {
  const { data, isFetching } = useGetPartner({ query: {}, id });
  return (
    <main>
      <Container className="pt-16">
        <header className="flex justify-between mb-32">
          <div className="text-4xl max-md:text-3xl max-md:text-center max-md:w-full">
            <h1 className="font-bold">Choose one of the projects</h1>
            <h2 className="font-normal">{data?.payload?.name}</h2>
          </div>
          <LogoIcon className="max-md:hidden" />
        </header>
        <ul
          className="flex flex-col gap-12 w-full max-w-xl m-auto"
          style={{ rowGap: "80px" }}
        >
          {data?.payload?.projects &&
            data?.payload?.projects.map((project, i: number) => (
              <li key={i}>
                <Link
                  className="relative flex items-center justify-start px-8 text-2xl font-bold py-6 rounded-xl bg-[#333333]"
                  href={`/work/${project?._id}`}
                >
                  <div className="labels absolute bottom-[70%] pointer-events-none left-[90%] -translate-x-2/4">
                    <Labels />
                  </div>
                  <h3>{project?.name}</h3>
                </Link>
              </li>
            ))}
        </ul>
      </Container>
    </main>
  );
};
