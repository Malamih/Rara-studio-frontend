import "./dashboard.css";
import React from "react";
import { Sidebar } from "./components/Sidebar";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Toaster } from "sonner";

interface Props {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: Props) {
  return (
    <ProtectedRoute>
      <Toaster />
      <div className="min-h-screen bg-black text-white">
        <Sidebar />
        <div className="ms-[var(--sidebar-width)]">{children}</div>
      </div>
    </ProtectedRoute>
  );
}
