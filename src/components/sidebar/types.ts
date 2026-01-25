import { IconProps } from "@tabler/icons-react";

export interface NavigationItem {
  icon: React.ComponentType<IconProps>; 
  label: string;
  href: string;
  active: boolean;
}

