"use client";

import React, { useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function MemberPage() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/");
      }
      else if (user.role !== "STAFF" && user.role !== "SUPER_ADMIN") {
        router.push("/member");
      }
    }
  }, [user, isLoading, router]);

  if (!user || (user.role !== "STAFF" && user.role !== "SUPER_ADMIN")) {
    return null;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-3xl">This is the Staff Page</h1>
    </div>
  );
}
