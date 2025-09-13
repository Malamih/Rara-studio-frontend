"use client";

import { Button } from "@/components/ui/button";
import { ImageInput } from "@/components/ui/dashboard/ImageInput";
import { Input } from "@/components/ui/dashboard/Input";
import { Textarea } from "@/components/ui/dashboard/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { queryClient } from "@/providers/queryProvider";
import { useCreatePortfolio } from "@/services/portfolio";
import { useGetPartners } from "@/services/partners";
import { Label } from "@radix-ui/react-label";
import { PlusIcon } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import clsx from "clsx";

export const CreatePortfolioButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [useAutoDate, setUseAutoDate] = useState(true);
  const [manualDate, setManualDate] = useState<Date | undefined>(undefined);

  const { mutateAsync, isPending, error }: any = useCreatePortfolio();
  const { data: partners, isLoading: partnersLoading } = useGetPartners({
    query: {},
  });

  const createPortfolio = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);

    if (!useAutoDate && manualDate) {
      form.set("projectDate", manualDate.toISOString());
    }

    await mutateAsync(form)
      .then(() => {
        setIsOpen(false);
        queryClient.invalidateQueries({ queryKey: ["portfolios"] });
        toast.success("Project created successfully");
      })
      .catch(() => {});
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-auto custom-scroll-area">
        <DialogHeader>
          <DialogTitle>Add New Project</DialogTitle>
          <DialogDescription>
            Fill out the project details. This will appear in the Projects page.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={createPortfolio} className="mt-4 space-y-4">
          {/* Name */}
          <div className="space-y-1">
            <Label>Name</Label>
            <Input
              placeholder="Enter project name"
              type="text"
              name="name"
              variant={error?.fieldErrors?.name && "destructive"}
            />
            {error?.fieldErrors?.name && (
              <p className="text-red-500 text-sm">{error.fieldErrors.name}</p>
            )}
          </div>

          {/* Insight */}
          <div className="space-y-1">
            <Label>Insight (optional)</Label>
            <Textarea
              placeholder="Enter project insight"
              name="insight"
              variant={error?.fieldErrors?.insight && "destructive"}
            />
            {error?.fieldErrors?.insight && (
              <p className="text-red-500 text-sm">
                {error.fieldErrors.insight}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1">
            <Label>Description (optional)</Label>
            <Textarea
              placeholder="Enter project description"
              name="description"
              variant={error?.fieldErrors?.description && "destructive"}
            />
            {error?.fieldErrors?.description && (
              <p className="text-red-500 text-sm">
                {error.fieldErrors.description}
              </p>
            )}
          </div>

          {/* Client */}
          <div className="space-y-1">
            <Label>Client (required)</Label>
            {partnersLoading ? (
              <p className="text-gray-400 text-sm">Loading clients...</p>
            ) : partners?.payload?.length ? (
              <Select name="client">
                <SelectTrigger
                  className={clsx("w-full border", {
                    "border-red-500": error?.fieldErrors?.client,
                    "border-gray-500": !error?.fieldErrors?.client,
                  })}
                >
                  <SelectValue placeholder="Select a client" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  {partners.payload.map((partner) => (
                    <SelectItem key={partner._id} value={partner._id}>
                      {partner.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <p className="text-yellow-500 text-sm">
                ⚠️ No clients available. Please add a client before creating a
                project.
              </p>
            )}
          </div>

          {/* Project Date */}
          <div className="space-y-1">
            <Label>Project Date</Label>
            <div className="flex items-center gap-2">
              <Switch
                id="auto-date-toggle"
                checked={useAutoDate}
                onCheckedChange={(val) => setUseAutoDate(val)}
              />
              <span>{useAutoDate ? "Auto (creation date)" : "Manual"}</span>
            </div>

            {!useAutoDate && (
              <Input
                type="date"
                className="w-full"
                value={manualDate ? manualDate.toISOString().split("T")[0] : ""}
                onChange={(e) => setManualDate(new Date(e.target.value))}
              />
            )}
          </div>

          {/* Image */}
          <div className="space-y-1">
            <Label>Project Image (optional)</Label>
            <ImageInput
              id="project-image-input"
              name="image"
              variant={
                error?.message === "Project image is required"
                  ? "destructive"
                  : "default"
              }
            />
            {error?.message === "Project image is required" && (
              <p className="text-red-500 text-sm">{error.message}</p>
            )}
          </div>

          {/* Banner */}
          <div className="space-y-1">
            <Label>Project Banner (optional)</Label>
            <ImageInput id="project-banner-input" name="banner" />
          </div>

          <Button
            className="w-full mt-6"
            disabled={isPending || partners?.payload?.length === 0}
          >
            {isPending ? "Creating..." : "Create"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
