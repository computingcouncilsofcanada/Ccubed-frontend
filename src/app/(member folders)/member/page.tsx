/**
 * Member Page Component
 *
 * This is the main member page that serves as a landing page for authenticated users.
 * It implements role-based access control and redirects unauthorized users.
 * Currently displays a placeholder content that can be expanded with more features.
 */

"use client";

import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

/**
 * StaffPage Component
 *
 * This component:
 * 1. Implements role-based access control
 * 2. Redirects unauthorized users to home page
 * 3. Handles loading states during authentication check
 * 4. Provides a placeholder for member-specific content
 */
export default function StaffPage() {
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
      // Redirect to home if user role is not authorized
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
      <h1 className="text-3xl">This is the Staff Page</h1>
    </div>
  );
}
