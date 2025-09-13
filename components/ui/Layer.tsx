import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export const Layer = ({ className }: ComponentProps<"div">) => (
  <div
    className={cn(
      "absolute top-0 left-0 w-full h-full bg-gradient-to-b pointer-events-none from-transparent to-background z-0",
      className
    )}
  ></div>
);
