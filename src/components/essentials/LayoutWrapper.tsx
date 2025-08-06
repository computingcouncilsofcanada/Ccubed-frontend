"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isHydrated, setIsHydrated] = useState(false);
  
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const isStaffRoute = pathname === "/member" ||
    pathname?.startsWith("/member/") || pathname?.startsWith("/login");

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#0D1C26] to-[#1A384C]">
      {isHydrated && !isStaffRoute && <Navbar />}
      {children}
    </div>
  );
}
