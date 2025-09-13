"use client";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Layer } from "@/components/ui/Layer";
import { Placeholder } from "@/components/ui/Placeholder";
import { useGetPortfolios } from "@/services/portfolio";
import Image from "next/image";
import Link from "next/link";

export function formatDate(date: string | Date): string | null {
  try {
    const parsedDate = date instanceof Date ? date : new Date(date);

    if (isNaN(parsedDate.getTime())) return null;

    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0"); // month is 0-based
    const day = String(parsedDate.getDate()).padStart(2, "0");

    return `${year}/${month}/${day}`;
  } catch {
    return null;
  }
}

export const Content = () => {
  const dataListLiStyles = {
    heading: "font-normal text-2xl mb-3",
    value: "font-normal text-2xl",
  };
  const { data } = useGetPortfolios({ query: { limit: 1 } });
  const project = data?.payload && data?.payload[0];
  return (
    <section className="px-2">
      <Container className="relative bg-primary/40 h-[calc((100vh-var(--header-height)-3.75rem))] max-h-[767px] mt-7 overflow-hidden rounded-3xl">
        <Placeholder src={project?.image?.url || "/work/hero.jpg"} />
        <Layer className="to-[#3B0000]" />
        <div className="h-full items-start flex flex-col gap-6 pb-10">
          <div className="flex-[1] w-full relative z-10 flex items-end max-lg:flex-col max-lg:justify-end max-lg:text-center justify-between gap-12">
            <div className="details">
              <h1 className="font-medium text-2xl mb-2">Latest Project</h1>
              <p className="font-normal text-[0.93rem] leading-[110%]">
                {project?.insight?.slice(0, 80)}
              </p>
            </div>
            <ul className="flex items-center justify-around max-sm:flex-col max-sm:justify-center max-sm:gap-6 gap-12 w-full">
              <li>
                <h2 className={dataListLiStyles.heading}>Date</h2>
                <dl className={dataListLiStyles.value}>
                  {formatDate(project?.projectDate || project?.createdAt || "")}
                </dl>
              </li>
              <li>
                <h2 className={dataListLiStyles.heading}>Client</h2>
                {project?.client && (
                  <Image
                    src={project?.client?.logo?.secure_url}
                    width={1000}
                    height={1000}
                    className="w-[60px] h-auto object-cover"
                    alt="logo"
                  />
                )}
              </li>
              <li>
                <h2 className={dataListLiStyles.heading}>Type</h2>
                {project?.videography && project?.photography && (
                  <dl className={dataListLiStyles.value}>
                    {project?.photography?.length > 0 &&
                      project?.videography?.length < 1 &&
                      "Photography"}
                    {project?.videography?.length > 0 &&
                      project?.photography?.length < 1 &&
                      "Videography"}
                    {project?.photography?.length > 0 &&
                      project?.videography?.length > 0 &&
                      "Videography & Photography"}
                  </dl>
                )}
              </li>
            </ul>
          </div>
          <Link href={`/work/${project?._id}`}>
            <Button className="relative z-[2] px-12">See more</Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};
