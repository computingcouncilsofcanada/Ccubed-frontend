"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  IconUser,
  IconChevronDown,
  IconMail,
  IconFileText,
  IconLogout,
} from "@tabler/icons-react";
// User type matches the one from UserContext
type User = {
  email: string;
  username: string;
  role: string;
  status: number;
  created_at: string;
  updated_at: string;
  is_verified: boolean;
  verify_token: string;
  id: string;
  school_id: string | null;
  year_of_study: number | null;
  department: string | null;
};

interface UserMenuProps {
  user: User | null;
  isCollapsed: boolean;
  isMobile: boolean;
  onLogout: () => void;
  onMenuClose?: () => void;
}

export default function UserMenu({
  user,
  isCollapsed,
  isMobile,
  onLogout,
  onMenuClose,
}: UserMenuProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserMenuOpen]);

  const handleMenuClose = () => {
    setIsUserMenuOpen(false);
    if (onMenuClose) {
      onMenuClose();
    }
  };

  return (
    <div className={`px-6 mb-4 ${isMobile || !isCollapsed ? "" : "flex justify-center"}`}>
      <div className="relative" ref={userMenuRef}>
        <button
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          className={`flex items-center gap-3 w-full ${
            isMobile || !isCollapsed ? "" : "justify-center"
          } p-2.5 rounded-xl hover:bg-slate-700 active:bg-slate-600 transition-all duration-200 group border border-transparent hover:border-slate-500`}
        >
          <div className="w-10 h-10 rounded-md  border-2 border-gray-400/40 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 group-hover:scale-110 group-hover:from-blue-600 group-hover:to-cyan-700">
            <IconUser size={20} className="text-white" />
          </div>
          {(isMobile || !isCollapsed) && (
            <div className="flex-1 min-w-0 text-left">
              <p className="text-sm font-bold text-white truncate">
                {user?.username}
              </p>
              <p className="text-xs text-slate-300 capitalize truncate font-medium">
                {user?.role?.toLowerCase().replace("_", " ")}
              </p>
            </div>
          )}
          {(isMobile || !isCollapsed) && (
            <IconChevronDown
              size={18}
              className={`text-slate-300 transition-all duration-200 ${
                isUserMenuOpen ? "rotate-180 text-white" : ""
              }`}
            />
          )}
        </button>

        {/* Dropdown Menu */}
        {isUserMenuOpen && (
          <div
            className={`absolute ${
              isMobile || !isCollapsed
                ? "left-0 right-0 top-full"
                : "left-full top-0 ml-2"
            } mt-2 w-64 bg-white rounded-xl shadow-2xl border-2 border-slate-200 z-50 overflow-hidden backdrop-blur-sm`}
          >
            <div className="p-4 bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 text-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center shadow-lg">
                  <IconUser size={24} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">
                    {user?.username}
                  </p>
                  <p className="text-xs text-white/90 capitalize truncate font-medium">
                    {user?.role?.toLowerCase().replace("_", " ")}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-2 bg-gradient-to-b from-white to-slate-50/50">
              <div className="px-3 py-2.5 text-sm text-slate-700 border-b border-slate-200 bg-slate-50/50 rounded-t-lg">
                <div className="flex items-center gap-2 text-slate-600">
                  <IconMail size={16} className="text-blue-500" />
                  <span className="truncate font-medium">
                    {user?.email || "No email"}
                  </span>
                </div>
              </div>
              <Link
                href="/events"
                onClick={handleMenuClose}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 hover:text-blue-700 transition-all duration-200 group font-medium"
              >
                <IconFileText
                  size={18}
                  className="text-blue-500 group-hover:text-blue-700 transition-colors"
                />
                <span>Events</span>
              </Link>
              <Link
                href="/login"
                onClick={() => {
                  onLogout();
                  handleMenuClose();
                }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-rose-50 hover:text-red-700 transition-all duration-200 group font-medium"
              >
                <IconLogout
                  size={18}
                  className="text-red-500 group-hover:text-red-700 group-hover:scale-110 transition-all"
                />
                <span>Logout</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

