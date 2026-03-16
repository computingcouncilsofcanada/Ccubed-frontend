"use client";

import Link from "next/link";
import { NavigationItem, Category, Permission } from "./types";
import { useUser } from "@/context/UserContext";

interface NavigationItemsProps {
  items: NavigationItem[];
  isCollapsed: boolean;
  isMobile: boolean;
  onItemClick?: () => void;
}

const CATEGORY_ORDER: Category[] = ["SYSTEM", "MANAGEMENT", "ADMINISTRATION"];
const CATEGORY_LABELS: Record<Category, string> = {
  SYSTEM: "System",
  MANAGEMENT: "Management",
  ADMINISTRATION: "Administration",
};

function groupByCategory(items: NavigationItem[]): Map<Category | "OTHER", NavigationItem[]> {
  const groups = new Map<Category | "OTHER", NavigationItem[]>();
  for (const item of items) {
    const category = item.category ?? "OTHER";
    const list = groups.get(category) ?? [];
    list.push(item);
    groups.set(category, list);
  }
  return groups;
}

export default function NavigationItems({
  items,
  isCollapsed,
  isMobile,
  onItemClick,
}: NavigationItemsProps) {
  const showLabels = isMobile || !isCollapsed;
  const grouped = groupByCategory(items);
  const { permissions, user } = useUser();

  const hasPermission = (permission: Permission) => {
    if(user?.role === "SUPER_ADMIN") {
      return true;
    }
    return permissions.includes(permission);
  };
  return (
    <>
      {CATEGORY_ORDER.map((category) => {
        const categoryItems = grouped.get(category);
        if (!categoryItems?.length) return null;

        return (
          <div key={category} className="mb-4 last:mb-0">
            {showLabels && (
              <div className="px-4 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {CATEGORY_LABELS[category]}
                </span>
              </div>
            )}
            <div className="space-y-1">
              {categoryItems.map((item) => {
                const Icon = item.icon;
                if (item.permission && !hasPermission(item.permission)) {
                  return null;
                }
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={onItemClick}
                    className={`w-full flex items-center ${
                      showLabels ? "gap-3 px-4" : "justify-center"
                    } py-3 rounded-xl transition-all duration-200 group border border-transparent ${
                      item.active
                        ? "bg-[#FAA336] text-white shadow-lg scale-[1.02] border-blue-400/30 font-semibold"
                        : "text-slate-300 hover:bg-slate-700 hover:text-white hover:scale-[1.01] hover:border-slate-500"
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
            </div>
          </div>
        );
      })}
      {/* Items without a known category (OTHER) */}
      {grouped.get("OTHER")?.map((item) => {
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
                ? "bg-[#FAA336] text-white shadow-lg scale-[1.02] border-blue-400/30 font-semibold"
                : "text-slate-300 hover:bg-slate-700 hover:text-white hover:scale-[1.01] hover:border-slate-500"
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

