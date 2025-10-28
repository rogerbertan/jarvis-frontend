import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getGreeting() {
  const hour = new Date().getHours();

  if (hour > 5 && hour <= 12) {
    return "Bom dia";
  }

  if (hour > 12 && hour <= 18) {
    return "Boa tarde";
  }

  return "Boa noite";
}
