"use client";

import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function StaffPage() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/");
      }
      else if (
        user.role !== "ADMIN" &&
        user.role !== "STAFF" &&
        user.role !== "SUPER_ADMIN"
      ) {
        router.push("/");
      }
    }
  }, [user, isLoading, router]);

  // Return null if user is not authenticated or authorized
  if (
    !user ||
    (user.role !== "ADMIN" &&
      user.role !== "STAFF" &&
      user.role !== "SUPER_ADMIN")
  ) {
    return null;
  }

  // Render member page content
  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-3xl">This is the Member Page</h1>
    </div>
  );
}
