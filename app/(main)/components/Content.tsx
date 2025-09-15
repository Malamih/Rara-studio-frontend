"use client";
import Container from "@/components/Container";
import { CoreValues } from "@/components/CoreValues";
import { Hero } from "./Hero";
import { About } from "./About";
import { Counters } from "./Counters";
import { Clients } from "./Clients";
import { Work } from "./Work";
import { WhyUs } from "@/components/WhyUs";
import { Overview } from "@/components/Overview";
import { Packages } from "./Packages";
import { useGetPageContents } from "@/services/pages";
import { HomePageContent } from "@/types/pages";
import { useGetPartners } from "@/services/partners";
import { Partner } from "@/types/partners";
import { Loader } from "@/components/Loader";
import clsx from "clsx";
import { useEffect, useState } from "react";
import ScrollTrigger from "gsap-trial/ScrollTrigger";

export const Content = () => {
  const [hideLoader, setHideLoader] = useState(false);
  const { data, isFetched } = useGetPageContents("home");
  const { data: clients } = useGetPartners({ query: {} });
  const page = data as HomePageContent;

  useEffect(() => {
    if (isFetched) {
      setTimeout(() => {
        setHideLoader(true);
        ScrollTrigger?.refresh();
      }, 100);
    }
  }, [isFetched]);
  return (
    <main>
      <Loader
        className={clsx({
          "opacity-0": hideLoader,
        })}
      />
      <Hero data={page?.sections?.hero} />
      <About data={page?.sections?.about} />
      <Counters data={page?.sections?.overview} />
      <Clients clients={clients?.payload as Partner[]} />
      <Container>
        <hr className="mb-12 mt-20 border-white/33" />
      </Container>
      <Work />
      <WhyUs data={page?.sections?.whyUs} />
      <Overview data={page?.sections?.companyOverview?.items?.value} />
      <Packages data={page?.sections?.packages} />
      <CoreValues data={page?.sections?.coreValues} />
    </main>
  );
};
