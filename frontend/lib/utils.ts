import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toEGP(amount: string | number) {
  if (typeof amount === "string") {
    amount = parseFloat(amount);
  }
  const formatted = new Intl.NumberFormat("en-EG", {
    style: "currency",
    currency: "EGP",
  }).format(amount);
  return formatted;
}
