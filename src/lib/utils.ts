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

export function parseNumericValue(val: string): {
  numericValue: number;
  prefix: string;
  isCurrency: boolean;
} {
  const cleanValue = val.replace(/[^\d,-]/g, "");

  const isCurrency = val.includes("R$");

  const numericValue = parseFloat(cleanValue.replace(",", "."));

  const prefix = isCurrency ? "R$ " : "";

  return {
    numericValue: isNaN(numericValue) ? 0 : numericValue,
    prefix,
    isCurrency,
  };
}

/**
 * Format a Date object to YYYY-MM-DD string in local timezone
 * Avoids UTC conversion issues that can shift dates by one day
 * @param date - The date to format
 * @returns Date string in YYYY-MM-DD format
 */
export function formatDateToString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
