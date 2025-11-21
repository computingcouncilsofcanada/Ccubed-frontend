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

  const isStaffRoute =
    pathname?.startsWith("/member/") || pathname?.startsWith("/login") || pathname?.startsWith("/coming-soon");
    
  return (
    <div className="min-h-screen w-full" style={{
      background: 'linear-gradient(180deg, #0D1C26 0%, #0D1C26 25%, #0D1C26 40%, #1A384C 70%, #1A384C 100%)',
      border: '2px solid red'
    }}>
      {isHydrated && !isStaffRoute && <Navbar />}
      {children}
    </div>
  );
}
