"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/useIsMobile";
import { ChevronsRight } from "lucide-react";
import Sidebar from "@/components/sidebar/Sidebar";
import { fetchMyPermissions } from "@/services/useApiPermission";
import { useUser } from "@/context/UserContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useUser();
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const { handleSetPermissions } = useUser();

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await fetchMyPermissions();
        handleSetPermissions(response.data);
      } catch {}
    };
    fetchPermissions();
  }, [pathname]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/");
    }
  }, [user, isLoading]);

  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#0D1C26] to-[#1A384C] relative overflow-hidden">
      {/* Mobile menu button */}
      {isMobile && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="absolute top-6 -left-3 text-white bg-gradient-to-br from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 rounded-full p-2 z-[60] shadow-xl border-2 border-white/30 transition-all duration-200 hover:scale-110"
        >
          <ChevronsRight size={24} />
        </button>
      )}

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="inset-0 absolute bg-black/60 backdrop-blur-sm z-50"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <Sidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        pathname={pathname}
        isMobile={isMobile}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden p-3">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-[#0D1C26] to-[#1A384C] shadow-xl relative">
          {/* Main Content */}
          <div className="h-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
