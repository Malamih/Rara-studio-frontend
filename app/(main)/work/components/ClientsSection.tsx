"use client";
import { useGetPartners } from "@/services/partners";
import { Clients } from "../../components/Clients";
import { Partner } from "@/types/partners";

export const ClientsSection = () => {
  const { data: clients } = useGetPartners({ query: {} });
  return (
    <section className="py-28 bg-white text-black">
      <Clients variant={"black"} clients={clients?.payload as Partner[]} />
    </section>
  );
};
