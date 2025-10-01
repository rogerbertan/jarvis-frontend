import type { LucideIcon } from "lucide-react";

export interface INavigationItem {
  id: string;
  label?: string;
  icon: LucideIcon;
  href?: string;
  onClick?: () => void;
}

export interface INavigationSection {
  items: INavigationItem[];
}