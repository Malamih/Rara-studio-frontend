"use client";
import Publes from "@/assets/icons/publes.svg";
import Phone from "@/assets/icons/phone.svg";
import Email from "@/assets/icons/email.svg";
import Location from "@/assets/icons/location.svg";
import { useGetPageContents } from "@/services/pages";
import { ContactPageContent } from "@/types/pages";
import { useEffect, useState } from "react";

export const Info = () => {
  const { data } = useGetPageContents("contact");
  const page = data as ContactPageContent;

  const [contactinfo, setContactInfo] = useState([
    {
      icon: <Phone />,
      value: "+1012 3456 789",
    },
    {
      icon: <Email />,
      value: "info@rara.com",
    },
    {
      icon: <Location />,
      value: "132 Dartmouth Street Boston, Massachusetts 02156 United States",
    },
  ]);
  useEffect(() => {
    if (data) {
      const page = data as ContactPageContent;
      const newData = [
        {
          icon: <Phone />,
          value: page?.sections?.contactInformation?.phoneNumber?.value,
        },
        {
          icon: <Email />,
          value: page?.sections?.contactInformation?.email?.value,
        },
        {
          icon: <Location />,
          value: page?.sections?.contactInformation?.location?.value,
        },
      ];
      setContactInfo(newData);
    }
  }, [data]);
  return (
    <div className="info overflow-hidden relative p-10 bg-[#A61B3B] rounded-xl w-xl max-lg:w-full">
      <div className="title mb-28">
        <h1 className="font-semibold text-3xl leading-[100%] mb-1.5">
          {page?.sections?.contactInformation?.headline?.value}
        </h1>
        <h2 className="font-normal text-lg leading-[100%]">
          {page?.sections?.contactInformation?.subheadline?.value}
        </h2>
      </div>
      <ul className="flex flex-col gap-8">
        {contactinfo.map((info, i: number) => (
          <li key={i} className="flex items-center gap-2">
            <div className="icon min-w-[20px]">{info.icon}</div>
            <span>{info.value}</span>
          </li>
        ))}
      </ul>
      <div className="absolute bottom-0 right-0">
        <Publes />
      </div>
    </div>
  );
};
