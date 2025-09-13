import MediaFile from "@/assets/icons/media-file.svg";
import Database from "@/assets/icons/database.svg";
import CameraVideo from "@/assets/icons/camera-video.svg";
import Label from "@/assets/icons/label.svg";
import Person from "@/assets/icons/media-file.svg";
import ChartGrowth from "@/assets/icons/chart-growth.svg";
import Car from "@/assets/icons/car.svg";
import Rail from "@/assets/icons/rail.svg";
import Tv2 from "@/assets/icons/tv2.svg";
import Container from "@/components/Container";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ServicesPageContent } from "@/types/pages";
import * as LucideIcons from "lucide-react";
import React from "react";

export const Services = ({
  data,
}: {
  data: ServicesPageContent["sections"]["services"];
}) => {
  const services = [
    {
      icon: <MediaFile />,
      title: "Media Campagins",
      caption: "Strategic, full-scale campaigns built to captivate",
    },
    {
      icon: <Database />,
      title: "Product & Commercial Photography",
      caption: "Precision-crafted visuals that speak without words",
    },
    {
      icon: <CameraVideo />,
      title: "Video Production",
      caption: "Cinematic storytelling that leaves a mark",
    },
    {
      icon: <Label />,
      title: "Brand Storytelling",
      caption: "Crafting narratives that connect deeply",
    },
    {
      icon: <Person />,
      title: "Creative Direction & Concept Development",
      caption: "Shaping bold ideas into reality",
    },
    {
      icon: <ChartGrowth />,
      title: "Digital Media Strategy",
      caption: "Creativity meets performance",
    },
    {
      icon: <Car />,
      title: "Equipment Rental",
      caption: "Professional gear, ready when you are",
    },
    {
      icon: <Rail />,
      title: "Post-Production Services",
      caption: "We polish every project with world-class post-production",
    },
    {
      icon: <Tv2 />,
      title: "Custom Projects",
      caption: "Need something outside the box? We love challenges",
    },
  ];
  return (
    <section className="pb-24 pt-40">
      <Container>
        <ul className="grid gap-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {(!data || data?.items?.value?.length < 1) &&
            services?.map((service, i) => (
              <li key={i} className="p-8 bg-[#DCE4ED] flex flex-col">
                <div className="icon flex items-center justify-center w-[120px] h-[120px] rounded-full bg-white mb-10">
                  {service.icon}
                </div>
                <h2 className="font-bold text-2xl mb-1.5 text-[#091430]">
                  {service.title}
                </h2>
                <p className="font-normal text-lg mb-6 flex-[1]">
                  {service?.caption}
                </p>
                <Link
                  href={"/contact"}
                  className="flex items-center gap-2 text-primary text-lg hover:underline"
                >
                  Contact Us <ArrowRight />
                </Link>
              </li>
            ))}
          {data &&
            data?.items?.value?.length > 0 &&
            data?.items?.value?.map((service, i) => (
              <li key={i} className="p-8 bg-[#DCE4ED] flex flex-col">
                <div className="icon flex items-center justify-center w-[120px] h-[120px] rounded-full bg-white mb-10">
                  {service?.icon &&
                  LucideIcons[service.icon as keyof typeof LucideIcons]
                    ? React.createElement(
                        LucideIcons[
                          service.icon as keyof typeof LucideIcons
                        ] as any,
                        { size: 48, color: "var(--primary)" }
                      )
                    : null}
                </div>
                <h2 className="font-bold text-2xl mb-1.5 text-[#091430]">
                  {service.title}
                </h2>
                <p className="font-normal text-lg mb-6 flex-[1]">
                  {service?.caption}
                </p>
                <Link
                  href={"/contact"}
                  className="flex items-center gap-2 text-primary text-lg hover:underline"
                >
                  Contact Us <ArrowRight />
                </Link>
              </li>
            ))}
        </ul>
      </Container>
    </section>
  );
};
