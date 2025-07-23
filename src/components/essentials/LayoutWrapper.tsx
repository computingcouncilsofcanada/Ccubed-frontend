"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isStaffRoute =
    pathname?.startsWith("/member/") || pathname?.startsWith("/login");

  return (
    <div className="bg-gradient-to-b from-[#0B161E] to-[#10212E] min-h-screen w-full">
      {!isStaffRoute && <Navbar />}
      {children}
    </div>
  );
}
