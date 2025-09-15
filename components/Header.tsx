"use client";

import { useState } from "react";
import FullLogo from "@/assets/logo-full.svg";
import Container from "./Container";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { MenuIcon, X } from "lucide-react";

export const Header = () => {
  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Work", path: "/work" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Contact", path: "/contact" },
  ];

  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 left-0 w-full flex items-center h-[var(--header-height)] z-20 glass-tw">
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
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 w-[40px] h-[40px] min-[767px]:hidden cursor-pointer duration-200 rounded-sm flex hover:bg-primary/10 border border-transparent hover:border-primary/30 items-center justify-center"
          >
            <MenuIcon className="text-black" strokeWidth={2} />
          </button>
        </Container>
      </header>

      {/* Sidebar */}
      <div
        className={clsx(
          "fixed inset-0 z-50 bg-white flex flex-col transform transition-transform duration-500 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <Link href={"/"}>
            <FullLogo />
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 w-[40px] h-[40px] cursor-pointer duration-200 rounded-sm flex hover:bg-primary/10 border border-transparent hover:border-primary/30 items-center justify-center"
          >
            <X className="text-black" strokeWidth={2} />
          </button>
        </div>

        <nav className="flex-1 flex flex-col p-6 gap-6">
          {links?.map((link, i) => (
            <Link
              key={i}
              href={link.path}
              onClick={() => setIsOpen(false)}
              className={clsx("text-2xl", {
                "font-bold text-primary": pathname == link.path,
                "font-normal text-black": pathname != link.path,
              })}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="p-6">
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="block w-full text-center bg-primary text-white rounded-sm py-2 text-base font-semibold hover:opacity-90 transition"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </>
  );
};
