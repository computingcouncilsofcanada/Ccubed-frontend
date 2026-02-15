import {
  IconLayoutGrid,
  IconUser,
  IconFileText,
  IconUserPlus,
  IconUsers,
  IconShield,
  IconSchool,
  IconBuilding,
  IconUserShield,
  IconUserEdit,
} from "@tabler/icons-react";
import { NavigationItem } from "./types";

const isActive = (pathname: string | null, path: string) =>
  pathname === path || (pathname && pathname.startsWith(`${path}/`)) || false;

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
    active: isActive(pathname, `${basePath}/profile`),
  },
  {
    icon: IconFileText,
    label: "Events",
    href: `${basePath}/events`,
    active: isActive(pathname, `${basePath}/events`),
  },
];

export const createSuperAdminNavigationItems = (basePath: string, pathname: string | null): NavigationItem[] => [
  {
    icon: IconUserPlus,
    label: "Register User",
    href: `${basePath}/register-user`,
    active: isActive(pathname, `${basePath}/register-user`),
  },
  {
    icon: IconUsers,
    label: "Users",
    href: `${basePath}/users`,
    active: isActive(pathname, `${basePath}/users`) && !isActive(pathname, `${basePath}/register-user`),
  },
  {
    icon: IconShield,
    label: "Roles & Permissions",
    href: `${basePath}/roles-permissions`,
    active: isActive(pathname, `${basePath}/roles-permissions`),
  },
  {
    icon: IconUserShield,
    label: "Roles",
    href: `${basePath}/roles`,
    active: isActive(pathname, `${basePath}/roles`),
  },
  {
    icon: IconUserEdit,
    label: "Update user requests",
    href: `${basePath}/update-user-request`,
    active: isActive(pathname, `${basePath}/update-user-request`),
  },
  {
    icon: IconSchool,
    label: "Schools",
    href: `${basePath}/schools`,
    active: isActive(pathname, `${basePath}/schools`),
  },
  {
    icon: IconBuilding,
    label: "Departments",
    href: `${basePath}/departments`,
    active: isActive(pathname, `${basePath}/departments`),
  },
];

