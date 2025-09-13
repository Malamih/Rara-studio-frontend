"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/dashboard/Input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Trash } from "lucide-react";
import {
  useDeletePhotography,
  useGetPhotographies,
} from "@/services/photography";
import { Photography as PhotographyType } from "@/types/photography.type";
import { CreatePhotographyButton } from "./components/CreateButton";
import { PhotographyCard } from "./components/Photography";

export const Content = () => {
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => setTitle(search), 400);
    return () => clearTimeout(timeout);
  }, [search]);

  const { data } = useGetPhotographies({
    query: { keywords: title },
  });

  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between gap-5">
        <Input
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-10"
        />
        <CreatePhotographyButton />
      </header>

      {/* Image Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.payload?.length ? (
          data.payload.map((photo: PhotographyType) => (
            <PhotographyCard photo={photo} key={photo._id} />
          ))
        ) : (
          <p className="text-gray-400 col-span-full text-center">
            No Photos Found
          </p>
        )}
      </div>
    </section>
  );
};
