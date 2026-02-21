"use client";

import { useState } from "react";
import {
  IconChevronsRight,
  IconChevronsLeft,
} from "@tabler/icons-react";
import SidebarHeader from "@/components/sidebar/SidebarHeader";
import SidebarFooter from "@/components/sidebar/SidebarFooter";
import UserMenu from "@/components/sidebar/UserMenu";
import NavigationItems from "@/components/sidebar/NavigationItems";
import {
  createBaseNavigationItems,
  createSuperAdminNavigationItems,
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

  const basePath = `/member/${
    user?.role === "SUPER_ADMIN"
      ? "super-admin"
      : user?.role === "ADMIN"
      ? "admin"
      : "staff"
  }`;

  const baseNavigationItems = createBaseNavigationItems(basePath, pathname);
  const superAdminNavigationItems =
    user?.role === "SUPER_ADMIN"
      ? createSuperAdminNavigationItems(basePath, pathname)
      : [];

  return (
    <>

      {(isOpen || !isMobile) && (
        <aside
          className={`bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 text-slate-800 flex flex-col transition-all duration-300 shadow-xl border-r border-slate-200/60 ${
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
              } w-9 h-9 z-10 rounded-full bg-white hover:bg-slate-100 border-2 border-slate-300 hover:border-blue-400 flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg hover:scale-110 ${
                sidebarCollapsed ? "mx-auto" : "ml-6"
              }`}
            >
              {sidebarCollapsed ? (
                <IconChevronsRight size={18} className="text-slate-700" />
              ) : (
                <IconChevronsLeft size={18} className="text-slate-700" />
              )}
            </button>
          )}

          {/* Close button for mobile */}
          {isMobile && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-lg bg-white hover:bg-slate-100 border-2 border-slate-300 hover:border-blue-400 flex items-center justify-center transition-all duration-200 shadow-md hover:scale-110"
            >
              <IconChevronsLeft size={18} className="text-slate-700" />
            </button>
          )}

          {/* Navigation Icons */}
          <nav className="flex-1 flex flex-col gap-1.5 w-full px-3 overflow-y-auto">
            <NavigationItems
              items={baseNavigationItems}
              isCollapsed={sidebarCollapsed}
              isMobile={isMobile}
              onItemClick={() => {
                if (isMobile) onClose();
              }}
            />

            {/* Divider for Super Admin items */}
            {user?.role === "SUPER_ADMIN" && (isMobile || !sidebarCollapsed) && (
              <div className="px-4 py-2">
                <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-2 px-2">
                  Administration
                </p>
              </div>
            )}

            {/* Super Admin Navigation Items */}
            {user?.role === "SUPER_ADMIN" && (
              <NavigationItems
                items={superAdminNavigationItems}
                isCollapsed={sidebarCollapsed}
                isMobile={isMobile}
                onItemClick={() => {
                  if (isMobile) onClose();
                }}
              />
            )}
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

