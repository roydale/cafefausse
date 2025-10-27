import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Combine class names safely with Tailwind merging
export function cn(...inputs) {
  return twMerge(clsx(...inputs));
}
