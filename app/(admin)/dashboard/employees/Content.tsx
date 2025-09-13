"use client";

import { Input } from "@/components/ui/dashboard/Input";
import { useEffect, useState } from "react";
import { useGetEmployees } from "@/services/employees";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import Image from "next/image";
import { CreateEmployeeButton } from "./components/CreateButton";
import { Employee } from "./components/Employee";

export const Content = () => {
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [page, setPage] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setName(search);
    }, 400);
    return () => clearTimeout(timeout);
  }, [search]);

  const { data, isFetching } = useGetEmployees({
    query: { keywords: name, page },
  });

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
        <div className="options">
          <CreateEmployeeButton />
        </div>
      </div>

      <Table className="mt-5">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px]">#</TableHead>
            <TableHead>Employee</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Caption</TableHead>
            <TableHead>Facebook</TableHead>
            <TableHead>Github</TableHead>
            <TableHead>Linkedin</TableHead>
            <TableHead className="text-right">
              <div className="pr-2">Actions</div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.payload?.map((emp, index) => (
            <Employee emp={emp} index={index} key={emp._id} />
          ))}
        </TableBody>
      </Table>

      {!isFetching && data?.payload?.length === 0 && (
        <h1 className="text-center text-3xl text-white/40 mt-5">
          No Employees Found
        </h1>
      )}
    </section>
  );
};
