
"use client";
import { useUser } from "@/context/UserContext";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSafariImageFallback } from "@/hooks/useSafariImageFallback";
import { useIsMobile } from "@/hooks/useIsMobile";
import {
  IconLayoutGrid,
  IconUser,
  IconFileText,
  IconBroadcast,
  IconSearch,
  IconHeadphones,
  IconHash,
  IconMoodSmile,
  IconBox,
  IconChevronsRight,
  IconChevronsLeft,
  IconLogout,
  IconUsers,
  IconUserPlus,
  IconSchool,
  IconBuilding,
  IconShield,
} from "@tabler/icons-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useUser();
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
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

  const baseNavigationItems = [
    {
      icon: IconLayoutGrid,
      label: "Dashboard",
      href: basePath,
      active: pathname === basePath,
    },
    {
      icon: IconUser,
      label: "Profile",
      href: `${basePath}/profile`,
      active: pathname?.includes("/profile"),
    },
    {
      icon: IconFileText,
      label: "Events",
      href: `${basePath}/events`,
      active: pathname?.includes("/events"),
    },
  ];

  const superAdminNavigationItems = [
    {
      icon: IconUserPlus,
      label: "Register User",
      href: `${basePath}/register-user`,
      active: pathname?.includes("/register-user"),
    },
    {
      icon: IconUsers,
      label: "Users",
      href: `${basePath}/users`,
      active: pathname?.includes("/users") && !pathname?.includes("/register-user"),
    },
    {
      icon: IconShield,
      label: "Roles",
      href: `${basePath}/roles`,
      active: pathname?.includes("/roles"),
    },
    {
      icon: IconSchool,
      label: "Schools",
      href: `${basePath}/schools`,
      active: pathname?.includes("/schools"),
    },
    {
      icon: IconBuilding,
      label: "Departments",
      href: `${basePath}/departments`,
      active: pathname?.includes("/departments"),
    },
  ];

  const otherNavigationItems = [
    {
      icon: IconBroadcast,
      label: "Broadcast",
      href: "#",
      active: false,
    },
    {
      icon: IconSearch,
      label: "Search",
      href: "#",
      active: false,
    },
    {
      icon: IconHeadphones,
      label: "Support",
      href: "#",
      active: false,
    },
    {
      icon: IconHash,
      label: "Tags",
      href: "#",
      active: false,
    },
    {
      icon: IconMoodSmile,
      label: "Feedback",
      href: "#",
      active: false,
    },
    {
      icon: IconBox,
      label: "Resources",
      href: "#",
      active: false,
    },
  ];

  // Combine navigation items based on user role
  const navigationItems = [
    ...baseNavigationItems,
    ...(user?.role === "SUPER_ADMIN" ? superAdminNavigationItems : []),
    // ...otherNavigationItems,
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex h-screen bg-gradient-to-l from-[#8462F0] via-[#7c3aed] to-[#6d28d9] relative overflow-hidden">
      {/* Mobile menu button */}
      {isMobile && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="absolute top-6 -left-3 text-white bg-gradient-to-br from-[#8462F0] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#6d28d9] rounded-full p-2 z-[60] shadow-lg border border-white/20 transition-all duration-200"
        >
          <IconChevronsRight size={24} />
        </button>
      )}

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="inset-0 absolute bg-black/50 z-50"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Left Sidebar */}
      {(isOpen || !isMobile) && (
        <aside
          className={`bg-[#7C3AED] text-white flex flex-col transition-all duration-300 ${
            isMobile || !sidebarCollapsed ? "w-64" : "w-20 items-center"
          } ${
            isMobile
              ? "absolute left-0 top-0 h-full z-[60]"
              : "relative"
          }`}
        >
        {/* Logo at top */}
        <div className={`p-4 mb-4 ${isMobile || !sidebarCollapsed ? "px-6" : ""}`}>
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <Image
              src={logoSrc}
              alt="CCubed Logo"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </div>
        </div>

        {/* Collapse/Expand Button - Hidden on mobile */}
        {!isMobile && (
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={`mb-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors ${
              sidebarCollapsed ? "mx-auto" : "ml-6"
            }`}
          >
            {sidebarCollapsed ? (
              <IconChevronsRight size={16} />
            ) : (
              <IconChevronsLeft size={16} />
            )}
          </button>
        )}

        {/* Close button for mobile */}
        {isMobile && (
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <IconChevronsLeft size={16} />
          </button>
        )}

        {/* Navigation Icons */}
        <nav className="flex-1 flex flex-col gap-2 w-full px-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const showLabels = isMobile || !sidebarCollapsed;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => {
                  if (isMobile) setIsOpen(false);
                }}
                className={`w-full flex items-center ${
                  showLabels ? "gap-3 px-4" : "justify-center"
                } p-3 rounded-lg transition-colors ${
                  item.active
                    ? "bg-white text-[#7C3AED]"
                    : "text-white hover:bg-white/20"
                }`}
                title={!showLabels ? item.label : undefined}
              >
                <Icon size={24} />
                {showLabels && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logo at bottom */}
        <div className={`p-4 mt-auto ${isMobile || !sidebarCollapsed ? "px-6" : ""}`}>
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <Image
              src={logoSrc}
              alt="CCubed Logo"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </div>
        </div>
        </aside>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden p-2">
        <main className="flex-1 overflow-x-hidden overflow-y-auto rounded-xl bg-gray-50 relative">
          {/* Top Bar */}
          <header className="bg-white border-b-2 border-[#7C3AED] px-6 py-4 rounded-t-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                <div className="flex items-center gap-2 text-gray-600">
                  <IconUser size={20} />
                  <span className="text-sm">{user?.username}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Link
                  href="/events"
                  className="text-sm text-gray-700 hover:text-[#7C3AED] transition-colors"
                >
                  Events
                </Link>
                <Link
                  href="/login"
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm text-gray-700 hover:text-red-600 transition-colors"
                >
                  <IconLogout size={18} />
                  Logout
                </Link>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
}
