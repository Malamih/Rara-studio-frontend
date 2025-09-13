"use client";

import FacebookGray from "@/assets/icons/facebook-gray.svg";
import GithubGray from "@/assets/icons/github-gray.svg";
import LinkedinGray from "@/assets/icons/linkedin-gray.svg";
import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { AboutPageContent } from "@/types/pages";
import { useGetEmployees } from "@/services/employees";

export const Team = () => {
  const { data, isFetching, isError } = useGetEmployees({});
  const team = [
    {
      name: "Maya Mathy",
      position: "Founder",
      caption: "Pop music lover, seeks joy and exciting pop concerts",
      facebook: "",
      github: "",
      linkedin: "",
    },
    {
      name: "Alexis Jesen",
      position: "CTO",
      caption: "Bookworm, creative software developer with precision",
      facebook: "",
      github: "",
      linkedin: "",
    },
    {
      name: "Keira Battye",
      position: "Product Designer",
      caption: "Creative painter capturing beauty with imaginative artwork",
      facebook: "",
      github: "",
      linkedin: "",
    },
    {
      name: "Dominic Game",
      position: "3D Artist",
      caption: "Football enthusiast, enjoys movie nights with friends",
      facebook: "",
      github: "",
      linkedin: "",
    },
    {
      name: "James Vial",
      position: "Head of Front-End",
      caption: "Culinary artist, explores diverse flavors, skilled in cooking",
      facebook: "",
      github: "",
      linkedin: "",
    },
  ];
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <TeamSkeleton />;
  }
  return (
    <section className="mt-28 relative">
      <Container className="pb-14 border-b border-b-white/30">
        <ul
          className="
            grid gap-8
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
          "
        >
          {(isError ||
            isFetching ||
            (data?.payload && data?.payload?.length < 1)) &&
            team?.map((member, i) => (
              <li className="text-center" key={i}>
                <header className="mb-6 flex items-center justify-center">
                  <Image
                    src={`/about/team/${i + 1}.jpg`}
                    width={1000}
                    height={1000}
                    alt={`${member.name}'s image`}
                    className="min-w-[224px] max-w-[224px] min-h-[224px] max-h-[224px] object-cover rounded-full"
                  />
                </header>
                <div className="flex flex-col gap-2">
                  <span className="font-bold text-xl leading-5">
                    {member.name}
                  </span>
                  <span className="text-sm font-medium text-primary">
                    {member.position}
                  </span>
                </div>
                <p className="font-normal text-sm text-[#787A82] mb-4">
                  {member.caption}
                </p>
                <ul className="flex items-center justify-center gap-4">
                  <li>
                    <Link href={"/"}>
                      <FacebookGray />
                    </Link>
                  </li>
                  <li>
                    <Link href={"/"}>
                      <GithubGray />
                    </Link>
                  </li>
                  <li>
                    <Link href={"/"}>
                      <LinkedinGray />
                    </Link>
                  </li>
                </ul>
              </li>
            ))}
          {!isError &&
            !isFetching &&
            data?.payload &&
            data?.payload?.length > 0 &&
            data?.payload?.map((member, i) => (
              <li className="text-center" key={i}>
                <header className="mb-6 flex items-center justify-center">
                  <Image
                    src={member?.image?.url as string}
                    width={1000}
                    height={1000}
                    alt={`${member.name}'s image`}
                    className="min-w-[224px] max-w-[224px] min-h-[224px] max-h-[224px] object-cover rounded-full"
                  />
                </header>
                <div className="flex flex-col gap-2">
                  <span className="font-bold text-xl leading-5">
                    {member.name}
                  </span>
                  <span className="text-sm font-medium text-primary">
                    {member.position}
                  </span>
                </div>
                <p className="font-normal text-sm text-[#787A82] mb-4">
                  {member.caption}
                </p>
                <ul className="flex items-center justify-center gap-4">
                  {member?.facebook && (
                    <li>
                      <Link href={member?.facebook}>
                        <FacebookGray />
                      </Link>
                    </li>
                  )}
                  {member?.github && (
                    <li>
                      <Link href={member?.github}>
                        <GithubGray />
                      </Link>
                    </li>
                  )}
                  {member?.linkedin && (
                    <li>
                      <Link href={member?.linkedin}>
                        <LinkedinGray />
                      </Link>
                    </li>
                  )}
                </ul>
              </li>
            ))}
        </ul>
      </Container>
    </section>
  );
};

const TeamSkeleton = () => {
  return (
    <section className="mt-28">
      <Container className="pb-14 border-b border-b-white/30">
        <ul
          className="
            grid gap-8
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
          "
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <li className="text-center" key={i}>
              <header className="mb-6 flex items-center justify-center">
                <Skeleton className="w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] lg:w-[224px] lg:h-[224px] rounded-full bg-white/10" />
              </header>
              <div className="flex flex-col gap-2 items-center">
                <Skeleton className="h-5 w-28 sm:w-32 rounded bg-white/10" />
                <Skeleton className="h-4 w-20 sm:w-24 rounded bg-white/10" />
              </div>
              <Skeleton className="h-10 w-40 sm:w-48 mt-3 mb-4 rounded bg-white/10 mx-auto" />
              <ul className="flex items-center justify-center gap-4">
                {Array.from({ length: 3 }).map((_, j) => (
                  <Skeleton
                    key={j}
                    className="w-6 h-6 rounded-full bg-white/10"
                  />
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};
