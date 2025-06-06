/**
 * Super Admin Page Component
 *
 * This page serves as the super admin dashboard, accessible only to users with
 * SUPER_ADMIN role. It implements strict role-based access control and redirects
 * unauthorized users to appropriate pages.
 */

"use client";

// This is the Super Admin Page

import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

/**
 * SuperAdminPage Component
 *
 * This component:
 * 1. Implements strict role-based access control for super admin users
 * 2. Redirects unauthorized users:
 *    - Unauthenticated users to home page
 *    - Non-super-admin users to member page
 * 3. Handles loading states during authentication check
 * 4. Provides a placeholder for super admin-specific content
 */
export default function SuperAdminPage() {
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
      // Redirect to member page if user is not a super admin
      else if (user.role !== "SUPER_ADMIN") {
        router.push("/member");
      }
    }
  }, [user, isLoading, router]);

  // Return null if user is not authenticated or authorized
  if (!user || user.role !== "SUPER_ADMIN") {
    return null;
  }

  // Render super admin page content
  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-3xl">This is the Super Admin Page</h1>
    </div>
  );
}
