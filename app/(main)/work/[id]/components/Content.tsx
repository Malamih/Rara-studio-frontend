"use client";
import Image from "next/image";
import { Hero } from "./Hero";
import { Insight } from "./Insight";
import { Photography } from "./Photography";
import { VideoGraphy } from "./VideoGraphy";
import { useGetPortfolioById } from "@/services/portfolio";
import { Photography as PhotographyType } from "@/types/photography.type";

export interface PortfolioPhotography {
  _id: string;
  title: string;
  image: {
    public_id: string;
    url: string;
    _id: string;
  };
  portfolio: string;
  createdAt: string;
  updatedAt: string;
}

export const Content = ({ id }: { id: string }) => {
  const { data } = useGetPortfolioById(id);
  return (
    <main className="bg-white text-black">
      <Hero
        data={{
          image: data?.payload?.banner?.url as string,
          logo: data?.payload?.client?.logo?.secure_url as string,
          name: data?.payload?.name as string,
        }}
      />
      <Insight
        data={{
          insight: data?.payload?.insight as string,
          description: data?.payload?.description as string,
        }}
      />
      {data?.payload?.photography && (
        <Photography data={data?.payload?.photography as any} />
      )}
      {data?.payload?.videography && (
        <VideoGraphy data={data?.payload?.videography as any} />
      )}
      <div className="banner pb-12">
        {data?.payload?.image && (
          <Image
            src={data?.payload?.image?.url}
            width={10000}
            height={10000}
            alt="banner"
            className="w-full h-[640px] object-cover"
          />
        )}
      </div>
    </main>
  );
};
