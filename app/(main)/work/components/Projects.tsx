"use client";
import ArrowTopRight from "@/assets/icons/arrow-top-right.svg";
import Container from "@/components/Container";
import { useGetPortfolios } from "@/services/portfolio";
import Link from "next/link";

export function getYear(
  date: string | Date,
  type: "calendar" | "mongo"
): number | null {
  try {
    let parsedDate: Date;

    if (type === "calendar") {
      // Calendar input returns yyyy-mm-dd
      parsedDate = new Date(date as string);
    } else if (type === "mongo") {
      // Mongo createdAt can be Date or ISO string
      parsedDate = date instanceof Date ? date : new Date(date);
    } else {
      return null;
    }

    if (isNaN(parsedDate.getTime())) return null;

    return parsedDate.getFullYear();
  } catch {
    return null;
  }
}

export const Projects = () => {
  const { data } = useGetPortfolios({ query: {} });
  return (
    <section className="mt-24 pb-16">
      <Container className="flex gap-32">
        <div className="title min-w-fit pt-2">
          <h2>OUR PROJECTS</h2>
        </div>
        <ul className="flex flex-col gap-12 w-full">
          {data?.payload?.map((project, i) => (
            <Link key={i} href={`/work/${project?._id}`} className="group">
              <li className="flex items-center justify-between gap-12 w-full">
                <h3 className="font-medium text-5xl leading-[100%] group-hover:text-gray-400 transition duration-200">
                  {project?.name}
                </h3>
                <span className="date font-normal text-2xl flex items-center gap-8 leading-[100%]">
                  {getYear(
                    project?.projectDate
                      ? project?.projectDate
                      : project.createdAt,
                    project?.projectDate ? "calendar" : "mongo"
                  )}{" "}
                  <ArrowTopRight className="group-hover:-translate-y-2 group-hover:translate-x-2 transition duration-150 ease-out" />
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </Container>
    </section>
  );
};
