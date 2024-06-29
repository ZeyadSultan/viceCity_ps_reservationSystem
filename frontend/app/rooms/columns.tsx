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
import { Room } from "@/schemas";
import { toEGP } from "@/lib/utils";

export const columns: ColumnDef<Room>[] = [
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
      return !!room.current_reservation ? "Occupied" : "Vacant";
    },
  },
  {
    header: "Book/Checkout",
    cell: ({ row }) => {
      const room = row.original;
      return !!room.current_reservation ? (
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
    accessorKey: "price_per_hour",
    header: "Price/Hour",
    cell: ({ row }) => {
      return toEGP(row.getValue("price_per_hour"));
    },
  },
  {
    header: "Duration",
    cell: ({ row }) => {
      const room = row.original;
      if (!room.current_reservation) return "-";
      const start = new Date(room.current_reservation.start_time);
      const end = new Date();
      const diff = end.getTime() - start.getTime();
      console.log({ diff });

      const hours = Math.floor(diff / 1000 / 60 / 60);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      return `${hours}h ${minutes}m`;
    },
  },
  {
    header: "Cost",
    cell: ({ row }) => {
      //TODO: make user configurable
      const divideHourIntoChunks = 4;

      const room = row.original;
      if (!room.current_reservation) return "-";
      const start = new Date(room.current_reservation.start_time);
      const end = new Date();
      const diff = end.getTime() - start.getTime();
      const minutes = Math.floor(diff / 1000 / 60);
      const chunks = Math.round(minutes / (60 / divideHourIntoChunks));
      const cost = chunks * (room.price_per_hour / divideHourIntoChunks);
      return toEGP(cost);
    },
  },
  // {
  //   accessorKey: "type",
  //   header: "Type",
  // },
  // {
  //   accessorKey: "current_reservation_id",
  //   header: "Current Reservation ID",
  // }
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
              onClick={() => navigator.clipboard.writeText(room.id.toString())}
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
