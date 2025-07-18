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
    <div className="bg-linear-to-r  from-[#0B161E] to-[#306184] min-h-screen w-full">
      {!isStaffRoute && <Navbar />}
      {children}
    </div>
  );
}
