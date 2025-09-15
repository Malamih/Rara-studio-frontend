"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash, GripVertical } from "lucide-react";
import Image from "next/image";
import { Employee as EmployeeType } from "@/types/employees.type";
import { EditEmployeeButton } from "./EditButton";
import { useDeleteEmployee } from "@/services/employees";
import { queryClient } from "@/providers/queryProvider";
import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const Employee = ({
  emp,
  index,
}: {
  emp: EmployeeType;
  index: number;
}) => {
  const { mutateAsync, isPending } = useDeleteEmployee();
  const [loading, setLoading] = useState(false);

  // DND setup
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: emp._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await mutateAsync(emp._id);
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    } catch (err) {
      console.error("Failed to delete employee:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TableRow ref={setNodeRef} style={style}>
      {/* Sort handle */}
      <TableCell>
        <Button
          variant="ghost"
          size="sm"
          className="cursor-grab active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <GripVertical size={16} />
        </Button>
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-2">
          {emp.image?.url && (
            <div className="w-10 h-10 relative rounded-lg overflow-hidden">
              <Image
                src={emp.image.url}
                alt={emp.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <span>{emp.name}</span>
        </div>
      </TableCell>

      <TableCell>{emp.position}</TableCell>
      <TableCell>{emp.caption}</TableCell>

      <TableCell>
        {emp.facebook ? (
          <a
            href={emp.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Facebook
          </a>
        ) : (
          "-"
        )}
      </TableCell>
      <TableCell>
        {emp.github ? (
          <a
            href={emp.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Github
          </a>
        ) : (
          "-"
        )}
      </TableCell>
      <TableCell>
        {emp.linkedin ? (
          <a
            href={emp.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Linkedin
          </a>
        ) : (
          "-"
        )}
      </TableCell>
      <TableCell className="text-center">{emp?.order}</TableCell>
      {/* Actions */}
      <TableCell className="text-right">
        <div className="flex justify-end gap-2 pr-2">
          <EditEmployeeButton employee={emp} />
          <Button
            variant="ghost"
            size="sm"
            className="text-red-500"
            onClick={handleDelete}
            disabled={loading || isPending}
          >
            <Trash size={16} />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};
