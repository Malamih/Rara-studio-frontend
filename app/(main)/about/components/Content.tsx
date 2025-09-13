"use client";

import { useGetPageContents } from "@/services/pages";
import { useGetPartners } from "@/services/partners";
import { Clients } from "../../components/Clients";
import { Hero } from "./Hero";
import { Team } from "./Team";
import { Overview } from "./Overview";
import { WhatWeDo } from "./WhatWeDo";
import { Partner } from "@/types/partners";
import { AboutPageContent } from "@/types/pages";

export const Content = () => {
  const { data } = useGetPageContents("about");
  const { data: clients } = useGetPartners({ query: {} });
  const page = data as AboutPageContent;
  return (
    <main>
      <Hero data={page?.sections?.hero} />
      <Clients clients={clients?.payload as Partner[]} />
      <Team />
      <Overview data={page?.sections?.overview} />
      <WhatWeDo data={page?.sections?.about} />
    </main>
  );
};
