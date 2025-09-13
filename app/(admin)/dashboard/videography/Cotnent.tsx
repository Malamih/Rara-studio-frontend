"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/dashboard/Input";
import { Button } from "@/components/ui/button";
import { Videography as VideographyType } from "@/types/videography.type";
import { useGetVideographies } from "@/services/videography";
import { CreateVideographyButton } from "./components/CreateButton";
import { VideographyCard } from "./components/Videography";

export const Content = () => {
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");

  // debounce search input
  useEffect(() => {
    const timeout = setTimeout(() => setTitle(search), 400);
    return () => clearTimeout(timeout);
  }, [search]);

  const { data } = useGetVideographies({
    query: { search: title },
  });

  return (
    <section className="space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between gap-5">
        <Input
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-10"
        />
        <CreateVideographyButton />
      </header>

      {/* Video Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.payload?.length ? (
          data.payload.map((video: VideographyType) => (
            <VideographyCard video={video} key={video?._id} />
          ))
        ) : (
          <p className="text-gray-400 col-span-full text-center">
            No Videos Found
          </p>
        )}
      </div>
    </section>
  );
};
