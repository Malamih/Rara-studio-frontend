"use client";

import { Button } from "@/components/ui/button";
import { ImageInput } from "@/components/ui/dashboard/ImageInput";
import { Input } from "@/components/ui/dashboard/Input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { queryClient } from "@/providers/queryProvider";
import { useCreateEmployee } from "@/services/employees";
import { Label } from "@radix-ui/react-label";
import { PlusIcon } from "lucide-react";
import React, { useState } from "react";

export const CreateEmployeeButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutateAsync, isPending, error }: any = useCreateEmployee();

  const createEmployee = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);

    await mutateAsync(data)
      .then(() => {
        setIsOpen(false);
        queryClient.invalidateQueries({ queryKey: ["employees"] });
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
          <DialogTitle>Add New Employee</DialogTitle>
          <DialogDescription>
            Fill out the employee details. This will appear in the Employees
            page.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={createEmployee} className="mt-4 space-y-4">
          {/* Name */}
          <div className="space-y-1">
            <Label>Name</Label>
            <Input
              placeholder="Enter employee name"
              type="text"
              name="name"
              variant={error?.fieldErrors?.name && "destructive"}
            />
            {error?.fieldErrors?.name && (
              <p className="text-red-500 text-sm">{error.fieldErrors.name}</p>
            )}
          </div>

          {/* Position */}
          <div className="space-y-1">
            <Label>Position</Label>
            <Input
              placeholder="Enter employee position"
              type="text"
              name="position"
              variant={error?.fieldErrors?.position && "destructive"}
            />
            {error?.fieldErrors?.position && (
              <p className="text-red-500 text-sm">
                {error.fieldErrors.position}
              </p>
            )}
          </div>

          {/* Caption */}
          <div className="space-y-1">
            <Label>Caption</Label>
            <Input
              placeholder="Enter employee caption"
              type="text"
              name="caption"
              variant={error?.fieldErrors?.caption && "destructive"}
            />
            {error?.fieldErrors?.caption && (
              <p className="text-red-500 text-sm">
                {error.fieldErrors.caption}
              </p>
            )}
          </div>

          {/* Facebook */}
          <div className="space-y-1">
            <Label>Facebook (optional)</Label>
            <Input
              placeholder="Enter employee facebook link"
              type="url"
              name="facebook"
              variant={error?.fieldErrors?.facebook && "destructive"}
            />
            {error?.fieldErrors?.facebook && (
              <p className="text-red-500 text-sm">
                {error.fieldErrors.facebook}
              </p>
            )}
          </div>

          {/* Github */}
          <div className="space-y-1">
            <Label>Github (optional)</Label>
            <Input
              placeholder="Enter employee github link"
              type="url"
              name="github"
              variant={error?.fieldErrors?.github && "destructive"}
            />
            {error?.fieldErrors?.github && (
              <p className="text-red-500 text-sm">{error.fieldErrors.github}</p>
            )}
          </div>

          {/* Linkedin */}
          <div className="space-y-1">
            <Label>Linkedin (optional)</Label>
            <Input
              placeholder="Enter employee linkedin link"
              type="url"
              name="linkedin"
              variant={error?.fieldErrors?.linkedin && "destructive"}
            />
            {error?.fieldErrors?.linkedin && (
              <p className="text-red-500 text-sm">
                {error.fieldErrors.linkedin}
              </p>
            )}
          </div>

          {/* Image */}
          <div className="space-y-1">
            <Label>Employee Image</Label>
            <ImageInput
              id="employee-image-input"
              name="image"
              className="bg-white"
              variant={
                error?.message == "Employee image is required"
                  ? "destructive"
                  : "default"
              }
            />
            {error?.message == "Employee image is required" && (
              <p className="text-red-500 text-sm">{error.message}</p>
            )}
          </div>

          <Button className="w-full mt-6" disabled={isPending}>
            {isPending ? "Creating..." : "Create"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
