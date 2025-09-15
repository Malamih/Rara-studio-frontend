"use client";

import { Input } from "@/components/ui/dashboard/Input";
import { useEffect, useState, useMemo } from "react";
import { useGetEmployees, useReorderEmployees } from "@/services/employees";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CreateEmployeeButton } from "./components/CreateButton";
import { Employee } from "./components/Employee";
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { toast } from "sonner";
import { Employee as EmployeeType } from "@/types/employees.type";

export const Content = () => {
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [page, setPage] = useState("");
  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  const [canSave, setCanSave] = useState(false);

  const { data, isFetching } = useGetEmployees({
    query: { keywords: name, page },
  });

  const { mutate: updateOrder, isPending: updating } = useReorderEmployees();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setName(search);
    }, 400);
    return () => clearTimeout(timeout);
  }, [search]);

  // Always keep employees sorted by order
  const sortedEmployees = useMemo(() => {
    if (!data?.payload) return [];
    return [...data.payload].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [data]);

  useEffect(() => {
    setEmployees(sortedEmployees);
  }, [sortedEmployees]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = employees.findIndex((emp) => emp._id === active.id);
    const newIndex = employees.findIndex((emp) => emp._id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    setEmployees((prev) => {
      const next = arrayMove(prev, oldIndex, newIndex);
      return next;
    });
    setCanSave(true);
  };

  const handleSaveOrder = () => {
    const reordered = employees.map((emp, index) => ({
      employee: emp._id,
      order: index + 1,
    }));
    updateOrder(reordered);
  };

  return (
    <section>
      <div className="flex justify-between gap-12">
        <div className="w-full max-w-xl">
          <Input
            placeholder="Search by employee name."
            type="text"
            className="h-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="options flex items-center gap-2">
          {canSave && (
            <Button onClick={handleSaveOrder} disabled={updating}>
              {updating ? "Saving..." : "Save Order"}
            </Button>
          )}
          <CreateEmployeeButton />
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={employees.map((emp) => emp._id)}
          strategy={verticalListSortingStrategy}
        >
          <Table className="mt-5">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px]">Sort</TableHead>
                <TableHead>Employee</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Caption</TableHead>
                <TableHead>Facebook</TableHead>
                <TableHead>Github</TableHead>
                <TableHead>Linkedin</TableHead>
                <TableHead className="w-[100px] text-center">Order</TableHead>
                <TableHead className="text-right">
                  <div className="pr-2">Actions</div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees?.map((emp, index) => (
                <Employee emp={emp} index={index} key={emp._id} />
              ))}
            </TableBody>
          </Table>
        </SortableContext>
      </DndContext>

      {!isFetching && employees.length === 0 && (
        <h1 className="text-center text-3xl text-white/40 mt-5">
          No Employees Found
        </h1>
      )}
    </section>
  );
};
