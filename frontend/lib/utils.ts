import {
  RoomsReservationsDTO,
  RoomsReservationsDTOType,
} from "@/orval/api/model";

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { RoomType } from "@/orval/api/model";
/** Generated room types dynamically from the orval generated files */
export const ROOM_TYPES = Object.keys(RoomType) as unknown as readonly [
  RoomType,
  ...RoomType[]
];

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

export const isPlaystaion = (
  roomType: RoomsReservationsDTOType | undefined
) => {
  return (
    roomType === "PLAYSTATION_PARTITION" || roomType === "PLAYSTATION_ROOM"
  );
};

export const getRoomPrice = (room: RoomsReservationsDTO) => {
  if (!isPlaystaion(room?.type)) {
    return room.priceSingle;
  }
  if (room.priceMulti || room.priceMulti === 0) {
    return room.priceSingle;
  }
  return room.priceMulti;
};
