"use client";
import FullLogo from "@/assets/logo-full.svg";
import Container from "./Container";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export const Header = () => {
  const links = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Work",
      path: "/work",
    },
    {
      name: "Services",
      path: "/services",
    },
    {
      name: "Portfolio",
      path: "/portfolio",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ];
  const pathname = usePathname();
  return (
    <header className="flex items-center h-[var(--header-height)] relative z-10 bg-white">
      <Container className="flex gap-12 items-center justify-between">
        <div className="logo">
          <Link href={"/"}>
            <FullLogo />
          </Link>
        </div>
        <ul className="flex items-center gap-12 max-lg:gap-6 max-md:hidden">
          {links?.map((link, i) => (
            <li key={i}>
              <Link
                href={link.path}
                className={clsx("text-xl leading-[100%]", {
                  "font-bold text-primary": pathname == link.path,
                  "font-normal text-black": pathname != link.path,
                })}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </header>
  );
};
