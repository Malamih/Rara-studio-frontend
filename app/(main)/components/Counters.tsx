"use client";
import Container from "@/components/Container";
import { HomePageContent } from "@/types/pages";
import { useEffect, useState } from "react";

export const Counters = ({
  data,
}: {
  data: HomePageContent["sections"]["overview"];
}) => {
  const [counters, setCounters] = useState([
    { title: "Happy Clients", count: "75" },
    { title: "Professional Shots", count: "8,000" },
    { title: "Captivating Videos", count: "450" },
  ]);

  useEffect(() => {
    setCounters([
      { title: "Happy Clients", count: data?.happyClients?.value },
      { title: "Professional Shots", count: data?.professionalShots?.value },
      { title: "Captivating Videos", count: data?.captivatingVideos?.value },
    ]);
  }, [data]);
  return (
    <section className="my-24">
      <Container>
        <ul className="flex items-center justify-around gap-4 flex-wrap">
          {counters?.map((counter, i: number) => (
            <li key={i} className="flex flex-col gap-1 text-center">
              <span className="font-normal text-6xl text-primary">
                {counter.count}+
              </span>
              <span className="text-4xl font-normal">{counter.title}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};
