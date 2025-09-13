"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ImageInput } from "@/components/ui/dashboard/ImageInput";
import { Input } from "@/components/ui/dashboard/Input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { PlusIcon } from "lucide-react";
import { useCreatePhotography } from "@/services/photography";
import { useGetPortfolios } from "@/services/portfolio"; // keep logic as-is
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { queryClient } from "@/providers/queryProvider";

export const CreatePhotographyButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: portfolios } = useGetPortfolios({});
  const { mutateAsync, isPending, error }: any = useCreatePhotography();

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);

    await mutateAsync(form)
      .then(() => {
        setIsOpen(false);
        queryClient.invalidateQueries({ queryKey: ["photographies"] });
      })
      .catch(() => {});
  };

  const hasPortfolios = (portfolios?.payload?.length ?? 0) > 0;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusIcon className="mr-2 w-4 h-4" />
          Add Photography
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-auto custom-scroll-area">
        <DialogHeader>
          <DialogTitle>Add New Photography</DialogTitle>
          <DialogDescription>
            Fill out the photography details and select a project.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleCreate} className="mt-4 space-y-4">
          {/* Title */}
          <div className="space-y-1">
            <Label>Title</Label>
            <Input
              placeholder="Enter title"
              type="text"
              name="title"
              required
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
              id="photography-image-input"
              name="image"
              variant={
                error?.message === "Image is required"
                  ? "destructive"
                  : "default"
              }
            />
            {error?.message === "Image is required" && (
              <p className="text-red-500 text-sm">{error.message}</p>
            )}
          </div>

          {/* Project Select */}
          <div className="space-y-1">
            <Label>Project</Label>
            <Select name="portfolio" required disabled={!hasPortfolios}>
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={
                    hasPortfolios ? "Select a project" : "No projects available"
                  }
                />
              </SelectTrigger>
              <SelectContent className="w-full">
                {portfolios?.payload?.map((p: any) =>
                  p?._id ? (
                    <SelectItem key={p?._id} value={p?._id}>
                      {p.name}
                    </SelectItem>
                  ) : null
                )}
              </SelectContent>
            </Select>
            {!hasPortfolios && (
              <p className="text-gray-400 text-sm mt-1">
                You need to create a project first.
              </p>
            )}
          </div>

          <Button
            className="w-full mt-6"
            disabled={isPending || !hasPortfolios}
          >
            {isPending ? "Creating..." : "Create"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
