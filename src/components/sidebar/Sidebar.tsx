"use client";

import { useEffect, useState } from "react";
import {
  IconChevronsRight,
  IconChevronsLeft,
} from "@tabler/icons-react";
import SidebarHeader from "@/components/sidebar/SidebarHeader";
import SidebarFooter from "@/components/sidebar/SidebarFooter";
import UserMenu from "@/components/sidebar/UserMenu";
import NavigationItems from "@/components/sidebar/NavigationItems";
import {
  createNavigationItems,
} from "@/components/sidebar/constants";
import { useUser } from "@/context/UserContext";
import { useSafariImageFallback } from "@/hooks/useSafariImageFallback";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string | null;
  isMobile: boolean;
}

export default function Sidebar({
  isOpen,
  onClose,
  pathname,
  isMobile,
}: SidebarProps) {
  const { user, logout } = useUser();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const logoSrc = useSafariImageFallback(
    "/FigmaFiles/ccubed-icon.svg",
    "/FigmaFiles/ccubed-icon.png"
  );

  const basePath = `/member`;

  const navigationItems = createNavigationItems(basePath, pathname);

  return (
    <>

      {(isOpen || !isMobile) && (
        <aside
          className={`bg-gradient-to-br from-[#0D1C26] to-[#1A384C] text-white flex flex-col transition-all duration-300 shadow-xl border-r border-slate-200/60 ${
            isMobile || !sidebarCollapsed ? "w-64" : "w-20 items-center"
          } ${
            isMobile
              ? "absolute left-0 top-0 h-full z-[60]"
              : "relative"
          }`}
        >
          <SidebarHeader
            logoSrc={logoSrc}
            isCollapsed={sidebarCollapsed}
            isMobile={isMobile}
          />

          <UserMenu
            user={user}
            isCollapsed={sidebarCollapsed}
            isMobile={isMobile}
            onLogout={logout}
            onMenuClose={() => {
              if (isMobile) onClose();
            }}
          />

          {/* Collapse/Expand Button - Hidden on mobile */}
          {!isMobile && (
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className={`absolute ${
                sidebarCollapsed
                  ? "left-[calc(100%-18px)] top-10"
                  : "left-[calc(100%-40px)] top-10"
              } w-9 h-9 z-10 rounded-full bg-slate-700 hover:bg-slate-600 border-2 border-slate-500 hover:border-slate-400 flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg hover:scale-110 ${
                sidebarCollapsed ? "mx-auto" : "ml-6"
              }`}
            >
              {sidebarCollapsed ? (
                <IconChevronsRight size={18} className="text-white" />
              ) : (
                <IconChevronsLeft size={18} className="text-white" />
              )}
            </button>
          )}

          {/* Close button for mobile */}
          {isMobile && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-lg bg-slate-700 hover:bg-slate-600 border-2 border-slate-500 hover:border-slate-400 flex items-center justify-center transition-all duration-200 shadow-md hover:scale-110"
            >
              <IconChevronsLeft size={18} className="text-white" />
            </button>
          )}

          {/* Navigation Icons */}
          <nav className="flex-1 flex flex-col gap-1.5 w-full px-3 overflow-y-auto">
            <NavigationItems
              items={navigationItems}
              isCollapsed={sidebarCollapsed}
              isMobile={isMobile}
              onItemClick={() => {
                if (isMobile) onClose();
              }}
            />

          </nav>

          <SidebarFooter
            logoSrc={logoSrc}
            isCollapsed={sidebarCollapsed}
            isMobile={isMobile}
          />
        </aside>
      )}
    </>
  );
}

