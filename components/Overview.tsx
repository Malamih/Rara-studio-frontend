import PersonVoice from "@/assets/icons/person-voice.svg";
import Package from "@/assets/icons/package.svg";
import Target from "@/assets/icons/target.svg";
import Windows from "@/assets/icons/windows.svg";
import Gear2 from "@/assets/icons/gear2.svg";
import CompletedTask from "@/assets/icons/compeletedTask.svg";
import Container from "./Container";
import { HomePageContent } from "@/types/pages";
import * as LucideIcons from "lucide-react";
import React from "react";

export const Overview = ({
  data,
}: {
  data: HomePageContent["sections"]["companyOverview"]["items"]["value"];
}) => {
  const dummyItems = [
    {
      title: "Years of Industry Experience",
      caption: "Proven track record with leading local & international brands",
      icon: <PersonVoice />,
    },
    {
      title: "Customizable Creative Packages",
      caption: "Tailored solutions to fit your goals and budget",
      icon: <Package />,
    },
    {
      title: "Convenient Location",
      caption: "Based in Baghdad, easily accessible for clients and partners",
      icon: <Target />,
    },
    {
      title: "Any Type of Project",
      caption: "From product photography to large-scale media productions",
      icon: <Windows />,
    },
    {
      title: "Affordable, High-Value Services",
      caption: "Premium quality with competitive pricing",
      icon: <Gear2 />,
    },
    {
      title: "Flexible Scheduling",
      caption: "We adapt to your deadlines and project needs",
      icon: <CompletedTask />,
    },
  ];

  return (
    <section className="py-24 bg-white text-black">
      <Container>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 w-full">
          {(data?.length < 1 || !data) &&
            dummyItems?.map((item, i) => (
              <li
                key={i}
                className="text-center flex flex-col items-center justify-start"
              >
                <div className="icon mb-8">{item.icon}</div>
                <span className="font-bold text-2xl mb-3">{item.title}</span>
                <p className="font-normal text-xl">{item.caption}</p>
              </li>
            ))}
          {data?.length > 0 &&
            data &&
            data?.map((item, i) => (
              <li
                key={i}
                className="text-center flex flex-col items-center justify-start"
              >
                <div className="icon mb-8">
                  {item?.icon &&
                  LucideIcons[item.icon as keyof typeof LucideIcons]
                    ? React.createElement(
                        LucideIcons[
                          item.icon as keyof typeof LucideIcons
                        ] as any,
                        { size: 48, color: "var(--primary)", strokeWidth: 1.2 } // <-- make it thin here
                      )
                    : null}
                </div>
                <span className="font-bold text-2xl mb-3">
                  {item?.title as any}
                </span>
                <p className="font-normal text-xl">{item.caption as any}</p>
              </li>
            ))}
        </ul>
      </Container>
    </section>
  );
};
