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
import { useUpdateEmployee } from "@/services/employees";
import { Employee } from "@/types/employees.type";
import { Label } from "@radix-ui/react-label";
import { PenIcon } from "lucide-react";
import React, { useState } from "react";

export const EditEmployeeButton = ({ employee }: { employee: Employee }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutateAsync, isPending, error }: any = useUpdateEmployee(
    employee._id
  );

  const updateEmployee = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);

    // remove unchanged fields to avoid unnecessary updates
    if (form.get("name") === employee.name) form.delete("name");
    if (form.get("position") === employee.position) form.delete("position");
    if (form.get("caption") === employee.caption) form.delete("caption");
    if (form.get("facebook") === employee.facebook) form.delete("facebook");
    if (form.get("github") === employee.github) form.delete("github");
    if (form.get("linkedin") === employee.linkedin) form.delete("linkedin");

    await mutateAsync(form)
      .then(() => {
        setIsOpen(false);
        queryClient.invalidateQueries({ queryKey: ["employees"] });
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
          <DialogTitle>Edit Employee</DialogTitle>
          <DialogDescription>
            Update the employee details. This will update the info in the
            Employees page.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={updateEmployee} className="mt-4 space-y-4">
          {/* Name */}
          <div className="space-y-1">
            <Label>Name</Label>
            <Input
              placeholder="Enter employee name"
              type="text"
              name="name"
              defaultValue={employee.name}
              variant={error?.fieldErrors?.name && "destructive"}
            />
            {error?.fieldErrors?.name && (
              <p className="text-red-500 text-sm">{error.fieldErrors.name}</p>
            )}
          </div>

          {/* Position */}
          <div className="space-y-1">
            <Label>Position (optional)</Label>
            <Input
              placeholder="Enter employee position"
              type="text"
              name="position"
              defaultValue={employee.position}
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
            <Label>Caption (optional)</Label>
            <Input
              placeholder="Enter employee caption"
              type="text"
              name="caption"
              defaultValue={employee.caption}
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
              defaultValue={employee.facebook || ""}
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
              defaultValue={employee.github || ""}
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
              defaultValue={employee.linkedin || ""}
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
              id={`employee-image-input-${employee._id}`}
              name="image"
              defaultImage={employee.image?.url}
              className="bg-white"
              variant={
                error?.message === "Employee image is required"
                  ? "destructive"
                  : "default"
              }
            />
            {error?.message === "Employee image is required" && (
              <p className="text-red-500 text-sm">{error.message}</p>
            )}
          </div>

          <Button className="w-full mt-6" disabled={isPending}>
            {isPending ? "Updating..." : "Update"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
