/**
 * Admin Page Component
 *
 * This page serves as the admin dashboard, accessible only to users with
 * ADMIN or SUPER_ADMIN roles. It implements role-based access control
 * and redirects unauthorized users to appropriate pages.
 */

"use client";
// This is the Admin Page

import React, { useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

/**
 * AdminPage Component
 *
 * This component:
 * 1. Implements role-based access control for admin users
 * 2. Redirects unauthorized users:
 *    - Unauthenticated users to home page
 *    - Non-admin users to member page
 * 3. Handles loading states during authentication check
 * 4. Provides a placeholder for admin-specific content
 */
export default function AdminPage() {
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
      // Redirect to member page if user is not an admin
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
