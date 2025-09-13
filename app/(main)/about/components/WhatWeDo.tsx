import Container from "@/components/Container";
import Camera from "@/assets/icons/camera.svg";
import CameraVideo from "@/assets/icons/camera-video.svg";
import Tv from "@/assets/icons/tv.svg";
import Bars from "@/assets/icons/bars.svg";
import { AboutPageContent } from "@/types/pages";
import * as LucideIcons from "lucide-react";
import React from "react";

export const WhatWeDo = ({
  data,
}: {
  data: AboutPageContent["sections"]["about"];
}) => {
  const items = [
    {
      icon: <Tv />,
      title: "Media Campaigns",
      caption:
        "From concept to execution, we create campaigns that captivate and deliver measurable results",
    },
    {
      icon: <Bars />,
      title: "Brand Storytelling",
      caption:
        "Powerful narratives that connect emotionally and strengthen brand identity",
    },
    {
      icon: <Camera />,
      title: "Product Photography",
      caption:
        "Highlighting every detail to present products at their very best",
    },
    {
      icon: <CameraVideo />,
      title: "Video Production",
      caption: "Cinematic visuals that communicate messages with impact",
    },
  ];

  return (
    <section className="relative z-10">
      <Container>
        <header className="mb-12 text-center">
          <h2 className="font-bold text-5xl mb-3">{data?.headline?.value}</h2>
          <div
            className="font-light text-xl"
            dangerouslySetInnerHTML={{ __html: data?.subheadline?.value }}
          ></div>
        </header>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-14 mb-28">
          {(!data || data?.items?.value?.length < 1) &&
            items?.map((item, i: number) => (
              <li key={i} className="px-7 bg-[#1D1D1D]">
                <div className="flex items-center justify-center flex-col py-9 border-t-[9px] border-b-[9px] text-center border-t-[#C4C4C4] border-b-[#C4C4C4]">
                  <div className="icon mb-6">{item.icon}</div>
                  <h3 className="font-bold text-xl mb-4">{item.title}</h3>
                  <p className="font-bold text-sm">{item.caption}</p>
                </div>
              </li>
            ))}
          {data &&
            data?.items?.value?.length > 0 &&
            data?.items?.value?.map((item, i: number) => (
              <li key={i} className="px-7 bg-[#1D1D1D]">
                <div className="flex items-center justify-center flex-col py-9 border-t-[9px] border-b-[9px] text-center border-t-[#C4C4C4] border-b-[#C4C4C4]">
                  <div className="icon mb-6">
                    {item?.icon &&
                    LucideIcons[item.icon as keyof typeof LucideIcons]
                      ? React.createElement(
                          LucideIcons[
                            item.icon as keyof typeof LucideIcons
                          ] as any,
                          { size: 48, color: "var(--primary)" }
                        )
                      : null}
                  </div>
                  <h3 className="font-bold text-xl mb-4">{item.title}</h3>
                  <p className="font-bold text-sm">{item.caption}</p>
                </div>
              </li>
            ))}
        </ul>
      </Container>
    </section>
  );
};
