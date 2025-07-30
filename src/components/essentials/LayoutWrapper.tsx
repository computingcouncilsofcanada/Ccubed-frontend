"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isStaffRoute = pathname === "/member" ||
    pathname?.startsWith("/member/") || pathname?.startsWith("/login");

  return (
    <div className="bg-linear-to-b  from-[#0D1C26] to-[#1A384C] min-h-screen w-full">
      {!isStaffRoute && <Navbar />}
      {children}
    </div>
  );
}
