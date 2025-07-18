/**
 * Staff Page Component
 *
 * This page serves as the staff dashboard, accessible only to users with
 * STAFF or SUPER_ADMIN roles. It implements role-based access control
 * and redirects unauthorized users to appropriate pages.
 */

"use client";

import React, { useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

/**
 * MemberPage Component
 *
 * This component:
 * 1. Implements role-based access control for staff users
 * 2. Redirects unauthorized users:
 *    - Unauthenticated users to home page
 *    - Non-staff users to member page
 * 3. Handles loading states during authentication check
 * 4. Provides a placeholder for staff-specific content
 */
export default function MemberPage() {
  // Get user context and navigation utilities
  const { user, isLoading } = useUser();
  const router = useRouter();

  // Effect hook to handle authentication and authorization
  useEffect(() => {
    if (!isLoading) {
      // Redirect to home if user is not authenticated
      if (!user) {
        router.push("/");
      }
      // Redirect to member page if user is not staff
      else if (user.role !== "STAFF" && user.role !== "SUPER_ADMIN") {
        router.push("/member");
      }
    }
  }, [user, isLoading, router]);

  // Return null if user is not authenticated or authorized
  if (!user || (user.role !== "STAFF" && user.role !== "SUPER_ADMIN")) {
    return null;
  }

  // Render staff page content
  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-3xl">This is the Staff Page</h1>
    </div>
  );
}
