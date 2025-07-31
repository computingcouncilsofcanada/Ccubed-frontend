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
    pathname?.startsWith("/member/") || pathname?.startsWith("/login") || pathname?.startsWith("/coming-soon");

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#0B161E] to-[#10212E]">
      {!isStaffRoute && <Navbar />}
      {children}
    </div>
  );
}
