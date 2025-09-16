"use client";
import { useEffect, useState } from "react";
import { WhyUs } from "@/components/WhyUs";
import { Hero } from "./Hero";
import { Services } from "./Services";
import { Overview } from "@/components/Overview";
import { CoreValues } from "@/components/CoreValues";
import { useGetPageContents } from "@/services/pages";
import { Cta } from "./Cta";
import { HomePageContent, ServicesPageContent } from "@/types/pages";
import { Loader } from "@/components/Loader";
import clsx from "clsx";

export const Content = () => {
  const [hideLoader, setHideLoader] = useState(false);
  const { data, isFetched } = useGetPageContents("services");
  const { data: home, isFetched: isHomeFetched } = useGetPageContents("home");

  const homePage = home as HomePageContent;
  const page = data as ServicesPageContent;

  useEffect(() => {
    if (isFetched && isHomeFetched) {
      // simulate loader fade
      setTimeout(() => {
        setHideLoader(true);
      }, 100);
    }
  }, [isFetched, isHomeFetched]);

  return (
    <main className="bg-white text-black">
      {/* Loader */}
      <Loader
        className={clsx({
          "opacity-0": hideLoader,
          "transition-opacity duration-500": true, // smooth fade
        })}
      />

      {/* Page content */}
      <Hero data={page?.sections?.hero} />
      <Services data={page?.sections?.services} />
      <WhyUs data={homePage?.sections?.whyUs} />
      <Overview data={homePage?.sections?.companyOverview?.items?.value} />
      <CoreValues data={homePage?.sections?.coreValues} />
      <Cta data={page?.sections?.callToAction} />
    </main>
  );
};
