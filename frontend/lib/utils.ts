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

export const toTitleCase = (str: string) => {
  return str
    .toLowerCase()
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    ?.map((x) => x.slice(0, 1).toUpperCase() + x.slice(1))
    ?.join(" ");
};

export const toSentenceCase = (str: string) => {
  const s =
    str &&
    str
      .toLowerCase()
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      ?.join(" ");
  return s && s.slice(0, 1).toUpperCase() + s.slice(1);
};
