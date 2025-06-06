/**
 * Member Layout Component
 *
 * This layout component provides the common structure for all member pages
 * (Admin, Staff, and Super Admin). It includes:
 * - Navigation header with user information
 * - Role-based navigation links
 * - Logout functionality
 * - Conditional rendering based on user role
 */

"use client";
import { useUser } from "@/context/UserContext";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

/**
 * AdminLayout Component
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be rendered
 *
 * This component:
 * 1. Provides a consistent layout for member pages
 * 2. Displays user information and role
 * 3. Handles navigation between different member sections
 * 4. Manages logout functionality
 * 5. Conditionally renders header based on user role
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get user context and navigation utilities
  const { user, logout } = useUser();
  const pathname = usePathname();
  const isSuperAdmin = pathname?.includes("/super-admin");

  return (
    <div>
      {/* Navigation Header - Hidden for Super Admin pages */}
      {!isSuperAdmin && (
        <div className="border-2 border-blue-200 flex justify-between p-3">
          {/* Application Title and User Role */}
          <h1>CCUBED {user?.role}</h1>

          {/* Navigation Links and User Actions */}
          <div className="flex items-center gap-3">
            <span>Welcome, {user?.username}</span>

            {/* Logout Link */}
            <Link
              href="/login"
              onClick={() => logout()}
              className="underline cursor-pointer"
            >
              Logout
            </Link>

            {/* Events Link */}
            <Link href="/events" className="underline cursor-pointer">
              Events
            </Link>

            {/* Profile Link - Dynamic based on user role */}
            <Link
              href={`/member/${
                user?.role === "SUPER_ADMIN"
                  ? "super-admin"
                  : user?.role === "ADMIN"
                  ? "admin"
                  : "staff"
              }/profile`}
              className="underline cursor-pointer"
            >
              Profile
            </Link>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main>{children}</main>
    </div>
  );
}
