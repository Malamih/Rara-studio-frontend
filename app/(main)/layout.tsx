import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QueryProvider } from "@/providers/queryProvider";
import SmoothScrolling from "@/providers/SmoothScrolling";
import React from "react";

interface Props {
  children: React.ReactNode;
}
export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <SmoothScrolling>
        <QueryProvider>{children}</QueryProvider>
      </SmoothScrolling>
      <Footer />
    </>
  );
}
