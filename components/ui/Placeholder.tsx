import { cn } from "@/lib/utils";
import Image from "next/image";
import { ComponentProps } from "react";

interface Props {
  src: string;
}

export const Placeholder = ({
  src,
  className,
  style,
}: ComponentProps<"div"> & Props) => {
  return (
    <div className="absolute pointer-events-none top-0 left-0 w-full h-full z-0 overflow-hidden">
      <Image
        src={src}
        width={10000}
        height={10000}
        alt="placeholder"
        className={cn("w-full h-full object-cover", className)}
        style={style}
      />
    </div>
  );
};
