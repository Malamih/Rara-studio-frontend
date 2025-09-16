"use client";
import { useEffect, useState } from "react";
import { useGetPageContents } from "@/services/pages";
import { useGetPartners } from "@/services/partners";
import { Clients } from "../../components/Clients";
import { Hero } from "./Hero";
import { Team } from "./Team";
import { Overview } from "./Overview";
import { WhatWeDo } from "./WhatWeDo";
import { Loader } from "@/components/Loader";
import clsx from "clsx";
import { Partner } from "@/types/partners";
import { AboutPageContent } from "@/types/pages";

export const Content = () => {
  const [hideLoader, setHideLoader] = useState(false);
  const { data, isFetched } = useGetPageContents("about");
  const { data: clients } = useGetPartners({ query: {} });
  const page = data as AboutPageContent;

  useEffect(() => {
    if (isFetched) {
      // simulate loader fade
      setTimeout(() => {
        setHideLoader(true);
      }, 100);
    }
  }, [isFetched]);

  return (
    <main>
      {/* Loader */}
      <Loader
        className={clsx({
          "opacity-0": hideLoader,
          "transition-opacity duration-500": true, // smooth fade
        })}
      />

      {/* Page content */}
      <Hero data={page?.sections?.hero} />
      <Clients clients={clients?.payload as Partner[]} />
      <Team />
      <Overview data={page?.sections?.overview} />
      <WhatWeDo data={page?.sections?.about} />
    </main>
  );
};
