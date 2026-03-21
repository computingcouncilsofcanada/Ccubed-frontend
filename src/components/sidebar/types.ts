import { IconProps } from "@tabler/icons-react";
import { PERMISSIONS } from "@/constants/permissions";

export interface NavigationItem {
  icon: React.ComponentType<IconProps>; 
  label: string;
  href: string;
  active: boolean;
  permission?: Permission;
  category?: Category;
}

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];
export type Category = "SYSTEM" | "MANAGEMENT" | "ADMINISTRATION";