"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toEGP } from "@/lib/utils";
import { RoomDTO } from "@/orval/api/model";
import * as DateFns from "date-fns";

export const columns: ColumnDef<RoomDTO>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    header: "Status",
    cell: ({ row }) => {
      const room = row.original;
      return !!room.currentReservationDto ? "Occupied" : "Vacant";
    },
  },
  {
    header: "Book/Checkout",
    cell: ({ row }) => {
      const room = row.original;
      return !!room.currentReservationDto ? (
        <Button variant="destructive" size="sm">
          Checkout
        </Button>
      ) : (
        <Button variant="success" size="sm">
          Book
        </Button>
      );
    },
  },
  {
    header: "Price/Hour",
    cell: ({ row }) => {
      const room = row.original;
      return toEGP(room.pricePerHour || 0);
    },
  },
  {
    header: "Duration",
    cell: ({ row }) => {
      const room = row.original;
      if (
        !room.currentReservationDto ||
        !room.currentReservationDto?.startTime ||
        !room.currentReservationDto?.endTime
      )
        return "-";
      const dur = DateFns.intervalToDuration({
        start: room.currentReservationDto.startTime,
        end: room.currentReservationDto.endTime,
      });
      return DateFns.formatDuration(dur);
    },
  },
  {
    header: "Cost",
    cell: ({ row }) => {
      //TODO: make user configurable
      const divideHourIntoChunks = 4;

      const room = row.original;
      if (
        !room.currentReservationDto ||
        !room.currentReservationDto.startTime ||
        !room.currentReservationDto.endTime ||
        !room.pricePerHour
      )
        return "-";

      const minutes = DateFns.differenceInMinutes(
        room.currentReservationDto.endTime,
        room.currentReservationDto.startTime
      );
      const chunks = Math.round(minutes / (60 / divideHourIntoChunks));
      const cost = chunks * (room.pricePerHour / divideHourIntoChunks);
      return toEGP(cost);
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const room = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(room.id?.toString() || "")
              }
            >
              Copy Room ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View Reservation details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
