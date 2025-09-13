"use client";
import Instagram from "@/assets/icons/instagram.svg";
import Facebook from "@/assets/icons/facebook.svg";
import Linkedin from "@/assets/icons/linkedin.svg";
import LogoIcon from "@/assets/logo-icon.svg";
import Container from "./Container";
import Link from "next/link";
import { useGetPageContents } from "@/services/pages";
import { ContactPageContent } from "@/types/pages";

export const Footer = () => {
  const { data } = useGetPageContents("contact");
  const page = data as ContactPageContent;
  return (
    <footer>
      <Container className="flex py-12 gap-12 max-lg:flex-col">
        <div className="logo min-w-sm max-lg:min-w-2xs">
          <div className="logo mb-8">
            <LogoIcon />
          </div>
          <div
            className="font-normal text-base"
            dangerouslySetInnerHTML={{
              __html:
                (page?.sections?.footer?.companyCaption?.value as string) || "",
            }}
          ></div>
        </div>
        <ul className="grid grid-cols-3 w-full max-md:grid-cols-2 max-md:gap-12 max-sm:grid-cols-1">
          <li>
            <span className="font-bold text-3xl mb-6 inline-block max-sm:w-full max-sm:text-center">
              Company
            </span>
            <ul className="flex flex-col gap-2 max-sm:items-center max-sm:justify-center">
              <li className="font-normal text-xl">
                <Link href={"/about"}>About Us</Link>
              </li>
              <li className="font-normal text-xl">
                <Link href={"/services"}>Services</Link>
              </li>
              <li className="font-normal text-xl">
                <Link href={"/contact"}>Contact</Link>
              </li>
            </ul>
          </li>
          <li>
            <span className="font-bold text-3xl mb-6 inline-block max-sm:w-full max-sm:text-center">
              Rara
            </span>
            <ul className="flex flex-col gap-2 max-sm:items-center max-sm:justify-center">
              <li>
                <Link href={"/work"}>Work</Link>
              </li>
              <li>
                <Link href={"/portoflio"}>Portoflio</Link>
              </li>
            </ul>
          </li>
          <li>
            <span className="font-bold text-3xl mb-6 inline-block max-sm:w-full max-sm:text-center">
              Contact
            </span>
            <ul className="flex flex-col gap-1 text-base max-sm:items-center">
              <li>
                <span>{page?.sections?.footer?.location?.value}</span>
              </li>
              <li>
                <span>{page?.sections?.footer?.firstPhoneNumber?.value}</span>
              </li>
              <li>
                <span>{page?.sections?.footer?.secondPhoneNumber?.value}</span>
              </li>
              <li>
                <span>{page?.sections?.footer?.email?.value}</span>
              </li>
              <li>
                <ul className="flex items-center gap-2 mt-2">
                  <li>
                    <Link
                      href={page?.sections?.footer?.instagramLink?.value || ""}
                    >
                      <Instagram />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={page?.sections?.footer?.facebookLink?.value || ""}
                    >
                      <Facebook />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={page?.sections?.footer?.linkedinLink?.value || ""}
                    >
                      <Linkedin />
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </Container>
      <div className="copyrwite w-full bg-[#A61B3B] py-8">
        <Container className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:justify-start">
          <span className="font-normal text-base">
            2025 Rara Studio © All Rights Reserved
          </span>
          <span>
            Powered By{" "}
            <Link
              href={"https://malamih.net"}
              target="_blank"
              className="font-bold hover:underline"
            >
              malamih.net
            </Link>
          </span>
        </Container>
      </div>
    </footer>
  );
};
