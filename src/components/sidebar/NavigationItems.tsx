"use client";

import Link from "next/link";
import { NavigationItem } from "../types";

interface NavigationItemsProps {
  items: NavigationItem[];
  isCollapsed: boolean;
  isMobile: boolean;
  onItemClick?: () => void;
}

export default function NavigationItems({
  items,
  isCollapsed,
  isMobile,
  onItemClick,
}: NavigationItemsProps) {
  const showLabels = isMobile || !isCollapsed;

  return (
    <>
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.label}
            href={item.href}
            onClick={onItemClick}
            className={`w-full flex items-center ${
              showLabels ? "gap-3 px-4" : "justify-center"
            } py-3 rounded-xl transition-all duration-200 group border border-transparent ${
              item.active
                ? "bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg scale-[1.02] border-blue-400/30 font-semibold"
                : "text-slate-700 hover:bg-slate-100 hover:text-slate-900 hover:scale-[1.01] hover:border-slate-300"
            }`}
            title={!showLabels ? item.label : undefined}
          >
            <Icon
              size={22}
              className={`transition-transform ${
                item.active ? "scale-110" : "group-hover:scale-110"
              }`}
              strokeWidth={item.active ? 2.5 : 2}
            />
            {showLabels && (
              <span
                className={`text-sm font-medium ${
                  item.active ? "font-semibold" : ""
                }`}
              >
                {item.label}
              </span>
            )}
          </Link>
        );
      })}
    </>
  );
}

