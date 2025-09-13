"use client";
import { WhyUs } from "@/components/WhyUs";
import { Hero } from "./Hero";
import { Services } from "./Services";
import { Overview } from "@/components/Overview";
import { CoreValues } from "@/components/CoreValues";
import { useGetPageContents } from "@/services/pages";
import { Cta } from "./Cta";
import { HomePageContent, ServicesPageContent } from "@/types/pages";

export const Content = () => {
  const { data } = useGetPageContents("services");
  const { data: home } = useGetPageContents("home");
  const homePage = home as HomePageContent;
  const page = data as ServicesPageContent;
  return (
    <main className="bg-white text-black">
      <Hero data={page?.sections?.hero} />
      <Services data={page?.sections?.services} />
      <WhyUs data={homePage?.sections?.whyUs} />
      <Overview data={homePage?.sections?.companyOverview?.items?.value} />
      <CoreValues data={homePage?.sections?.coreValues} />
      <Cta data={page?.sections?.callToAction} />
    </main>
  );
};
