import {
  IconLayoutGrid,
  IconUser,
  IconFileText,
  IconUserPlus,
  IconUsers,
  IconShield,
  IconSchool,
  IconBuilding,
} from "@tabler/icons-react";
import { NavigationItem } from "./types";

export const createBaseNavigationItems = (basePath: string, pathname: string | null): NavigationItem[] => [
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
    active: pathname?.includes("/profile") ?? false,
  },
  {
    icon: IconFileText,
    label: "Events",
    href: `${basePath}/events`,
    active: pathname?.includes("/events") ?? false,
  },
];

export const createSuperAdminNavigationItems = (basePath: string, pathname: string | null): NavigationItem[] => [
  {
    icon: IconUserPlus,
    label: "Register User",
    href: `${basePath}/register-user`,
    active: pathname?.includes("/register-user") ?? false,
  },
  {
    icon: IconUsers,
    label: "Users",
    href: `${basePath}/users`,
    active: (pathname?.includes("/users") ?? false) && !(pathname?.includes("/register-user") ?? false),
  },
  {
    icon: IconShield,
    label: "Roles",
    href: `${basePath}/roles`,
    active: pathname?.includes("/roles") ?? false,
  },
  {
    icon: IconSchool,
    label: "Schools",
    href: `${basePath}/schools`,
    active: pathname?.includes("/schools") ?? false,
  },
  {
    icon: IconBuilding,
    label: "Departments",
    href: `${basePath}/departments`,
    active: pathname?.includes("/departments") ?? false,
  },
];

