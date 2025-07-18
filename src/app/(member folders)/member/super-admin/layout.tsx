"use client";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useUser();

  return (
    <div>
      <div className="border-2 border-blue-200 flex justify-between p-3">
        <h1>CCUBED Super Admin</h1>
        <div className="flex items-center gap-3">
          <span>Welcome, {user?.username}</span>
          <Link
            href="/login"
            onClick={() => logout()}
            className="underline cursor-pointer"
          >
            Logout
          </Link>
          <Link href="/events" className="underline cursor-pointer">
            Events
          </Link>
          <Link
            href="/member/super-admin/register-user"
            className="underline cursor-pointer"
          >
            Register User
          </Link>
          <Link
            href="/member/super-admin/users"
            className="underline cursor-pointer"
          >
            Users
          </Link>
          <Link href="/member/super-admin" className="underline cursor-pointer">
            {user?.role}
          </Link>
          <Link
            href="/member/super-admin/profile"
            className="underline cursor-pointer"
          >
            Profile
          </Link>
          <Link
            href="/member/super-admin/schools"
            className="underline cursor-pointer"
          >
            Schools
          </Link>
          <Link
            href="/member/super-admin/departments"
            className="underline cursor-pointer"
          >
            Departments
          </Link>
          <Link
            href="/member/super-admin/events"
            className="underline cursor-pointer"
          >
            Manage Events
          </Link>
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
}
