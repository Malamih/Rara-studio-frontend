"use client";
import Container from "@/components/Container";
import Labels from "@/assets/icons/labels.svg";
import Image from "next/image";
import Link from "next/link";
import { useGetPageContents } from "@/services/pages";
import { PortfolioPageContent } from "@/types/pages";
import { useGetPartners } from "@/services/partners";
import { Loader } from "@/components/Loader";
import clsx from "clsx";
import { useEffect, useState } from "react";

export const Content = () => {
  const { data, isFetched } = useGetPageContents("portfolio");
  const { data: clients } = useGetPartners({ query: {} });
  const page = data as PortfolioPageContent;

  const [hideLoader, setHideLoader] = useState(false);

  useEffect(() => {
    if (isFetched) {
      setTimeout(() => {
        setHideLoader(true);
      }, 100);
    }
  }, [isFetched]);

  return (
    <section className="pb-24">
      {/* Loader */}
      <Loader
        className={clsx({
          "opacity-0": hideLoader,
          "transition-opacity duration-500": true,
        })}
      />

      <Container>
        <h1
          className="text-5xl font-bold mb-36 text-center mt-14"
          dangerouslySetInnerHTML={{
            __html: (page?.sections?.hero?.headline?.value as string) || "",
          }}
        ></h1>
        <ul
          className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          style={{ rowGap: "80px" }}
        >
          {clients?.payload.map((client, i: number) => (
            <li key={i}>
              <Link
                className="relative flex items-center justify-center h-[279px] rounded-3xl bg-[#333333]"
                href={`/portfolio/${client?._id}`}
              >
                <div className="labels absolute bottom-[90%] pointer-events-none left-2/4 -translate-x-2/4">
                  <Labels />
                </div>
                <Image
                  src={client?.logo?.secure_url}
                  width={1000}
                  height={1000}
                  alt="Logo"
                  className="w-auto h-auto"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};
