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
import { useUpdatePortfolio } from "@/services/portfolio";
import { Portfolio } from "@/types/portfolio.type";
import { Label } from "@radix-ui/react-label";
import { PenIcon } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useGetPartners } from "@/services/partners";

export const EditPortfolioButton = ({
  portfolio,
}: {
  portfolio: Portfolio;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [useAutoDate, setUseAutoDate] = useState(!portfolio.projectDate);
  const [manualDate, setManualDate] = useState<Date | undefined>(
    portfolio.projectDate ? new Date(portfolio.projectDate) : undefined
  );

  const { data: partners, isLoading: partnersLoading } = useGetPartners({
    query: {},
  });
  const { mutateAsync, isPending, error }: any = useUpdatePortfolio(
    portfolio._id
  );

  const updatePortfolio = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);

    // handle project date
    if (!useAutoDate && manualDate) {
      form.set("projectDate", manualDate.toISOString());
    }

    // remove unchanged fields to avoid unnecessary updates
    if (form.get("name") === portfolio.name) form.delete("name");
    if (form.get("insight") === portfolio.insight) form.delete("insight");
    if (form.get("description") === portfolio.description)
      form.delete("description");
    if (form.get("client") === portfolio.client?._id) form.delete("client");

    await mutateAsync(form)
      .then(() => {
        setIsOpen(false);
        queryClient.invalidateQueries({ queryKey: ["portfolios"] });
        toast.success("Project updated successfully");
      })
      .catch(() => {});
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <PenIcon />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-auto custom-scroll-area">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
          <DialogDescription>
            Update the project details. This will update the info in the
            Projects page.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={updatePortfolio} className="mt-4 space-y-4">
          {/* Name */}
          <div className="space-y-1">
            <Label>Name</Label>
            <Input
              placeholder="Enter project name"
              type="text"
              name="name"
              defaultValue={portfolio.name}
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
              defaultValue={portfolio.insight || ""}
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
              defaultValue={portfolio.description || ""}
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
              <Select name="client" defaultValue={portfolio.client?._id}>
                <SelectTrigger className="w-full">
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
                ⚠️ No clients available. Please add a client before updating a
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
            <Label>Project Image</Label>
            <ImageInput
              id={`project-image-input-${portfolio._id}`}
              name="image"
              defaultImage={portfolio.image?.url}
              className="bg-white"
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
            <ImageInput
              id={`project-banner-input-${portfolio._id}`}
              name="banner"
              defaultImage={portfolio.banner?.url}
            />
          </div>

          <Button
            className="w-full mt-6"
            disabled={isPending || partners?.payload?.length === 0}
          >
            {isPending ? "Updating..." : "Update"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
