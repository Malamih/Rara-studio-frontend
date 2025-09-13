import React, { ComponentProps } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../accordion";

interface Props {
  sectionId: string;
  name: string;
  children: React.ReactNode;
  disabled?: boolean;
}

export const SectionEditor = ({
  sectionId,
  name,
  children,
  disabled,
  ...props
}: ComponentProps<"div"> & Props) => {
  return (
    <AccordionItem disabled={disabled} value={sectionId}>
      <AccordionTrigger className="text-2xl cursor-pointer py-2 font-bold text-white capitalize">
        {name}
      </AccordionTrigger>
      <AccordionContent {...props}>{children}</AccordionContent>
    </AccordionItem>
  );
};
