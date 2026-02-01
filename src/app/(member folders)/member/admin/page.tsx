"use client";
// This is the Admin Page

import React, { useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/");
      }
      else if (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN") {
        router.push("/member");
      }
    }
  }, [user, isLoading, router]);

  // Return null if user is not authenticated or authorized
  if (!user || (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN")) {
    return null;
  }

  // Render admin page content
  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-3xl">This is the Admin Page</h1>
    </div>
  );
}
