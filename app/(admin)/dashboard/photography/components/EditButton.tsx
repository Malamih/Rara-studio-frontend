"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/dashboard/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { queryClient } from "@/providers/queryProvider";
import { useUpdatePhotography } from "@/services/photography";
import { useGetPortfolios } from "@/services/portfolio";
import { Photography } from "@/types/photography.type";
import { Label } from "@radix-ui/react-label";
import { PenIcon } from "lucide-react";
import React, { useState } from "react";
import { Portfolio } from "@/types/portfolio.type";
import { ImageInput } from "@/components/ui/dashboard/ImageInput";

export const EditPhotographyButton = ({
  photography,
}: {
  photography: Photography;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync, isPending, error }: any = useUpdatePhotography(
    photography._id
  );
  const { data: projects } = useGetPortfolios({}); // keep hook name for logic

  const updatePhotography = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);

    if (form.get("title") === photography.title) form.delete("title");
    if (form.get("url") === photography.image.url) form.delete("url");
    if (form.get("portfolio") === (photography.portfolio as Portfolio)._id) {
      form.delete("portfolio");
    }

    await mutateAsync(form)
      .then(() => {
        setIsOpen(false);
        queryClient.invalidateQueries({ queryKey: ["photographies"] });
      })
      .catch(() => {});
  };

  const hasProjects = (projects?.payload?.length ?? 0) > 0;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <PenIcon />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-auto custom-scroll-area">
        <DialogHeader>
          <DialogTitle>Edit Photography</DialogTitle>
          <DialogDescription>
            Update the photography details. Changes will reflect in the list.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={updatePhotography} className="mt-4 space-y-4">
          {/* Title */}
          <div className="space-y-1">
            <Label>Title</Label>
            <Input
              placeholder="Enter photography title"
              type="text"
              name="title"
              defaultValue={photography.title}
              variant={error?.fieldErrors?.title && "destructive"}
            />
            {error?.fieldErrors?.title && (
              <p className="text-red-500 text-sm">{error.fieldErrors.title}</p>
            )}
          </div>

          {/* Image */}
          <div className="space-y-1">
            <Label>Image</Label>
            <ImageInput
              name="image"
              id={`id-image-input-${photography._id}`}
              defaultImage={photography.image.url}
              variant={
                error?.message === "Image is required" ||
                error?.fieldErrors?.image
                  ? "destructive"
                  : "default"
              }
            />
            {(error?.fieldErrors?.image ||
              error?.message === "Image is required") && (
              <p className="text-red-500 text-sm">
                {error?.fieldErrors?.image || error?.message}
              </p>
            )}
          </div>

          {/* Project Select */}
          <div className="space-y-1">
            <Label>Project</Label>
            <Select
              name="portfolio" // keep same for logic
              required
              disabled={!hasProjects}
              defaultValue={(photography?.portfolio as Portfolio)?._id}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={
                    hasProjects ? "Select a project" : "No projects available"
                  }
                />
              </SelectTrigger>
              <SelectContent className="w-full">
                {projects?.payload?.map((p: any) => (
                  <SelectItem key={p._id} value={p._id}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {!hasProjects && (
              <p className="text-gray-400 text-sm mt-1">
                You need to create a project first.
              </p>
            )}
            {error?.fieldErrors?.portfolio && (
              <p className="text-red-500 text-sm">
                {error.fieldErrors.portfolio}
              </p>
            )}
          </div>

          <Button className="w-full mt-6" disabled={isPending || !hasProjects}>
            {isPending ? "Updating..." : "Update"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
