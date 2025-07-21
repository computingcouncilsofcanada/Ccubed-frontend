
"use client";
import { useUser } from "@/context/UserContext";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useUser();
  const pathname = usePathname();
  const isSuperAdmin = pathname?.includes("/super-admin");

  return (
    <div>
      {/* Navigation Header - Hidden for Super Admin pages */}
      {!isSuperAdmin && (
        <div className="border-2 border-blue-200 flex justify-between p-3  text-white">
          <h1>CCUBED {user?.role}</h1>

          <div className="flex items-center gap-3">
            <span>Welcome, {user?.username}</span>

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
            <Link
              href={`/member/${
                user?.role === "SUPER_ADMIN"
                  ? "super-admin"
                  : user?.role === "ADMIN"
                  ? "admin"
                  : "staff"
              }/events`}
              className="underline cursor-pointer"
            >
              Manage Events
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
