"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/dashboard/Input";
import { useGetPortfolios } from "@/services/portfolio";
import { CreatePortfolioButton } from "./components/CreateButton";
import { PortfolioCard } from "./components/Portfolio";

export const Content = () => {
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [page, setPage] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setName(search);
    }, 400);
    return () => clearTimeout(timeout);
  }, [search]);

  const { data, isFetching } = useGetPortfolios({
    query: { search: name, ...(page ? { page } : {}) },
  });

  return (
    <section>
      <div className="flex justify-between gap-12 mb-6">
        <div className="w-full max-w-xl">
          <Input
            placeholder="Search by project name."
            type="text"
            className="h-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <CreatePortfolioButton />{" "}
        {/* still using portfolio logic, so name stays */}
      </div>

      <div className="flex flex-wrap gap-4">
        {data?.payload?.map((portfolio, i) => (
          <PortfolioCard portfolio={portfolio} key={portfolio?._id} />
        ))}
      </div>

      {!isFetching && data?.payload?.length === 0 && (
        <h1 className="text-center text-3xl text-white/40 mt-10">
          No Projects Found
        </h1>
      )}
    </section>
  );
};
