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
import Link from "next/link";
import AlertDialogActionWrapper from "@/components/alert-dialog-action-wrapper";
import { useState } from "react";
import { deleteRoom } from "@/orval/api/api";
import { useToast } from "@/components/ui/use-toast";

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
      const bookUrl = `/new-reservation?roomId=${room.id}`;
      return !!room.currentReservationDto ? (
        <Button variant="destructive" size="sm">
          Checkout
        </Button>
      ) : (
        <Button variant="success" size="sm" asChild>
          <Link href={bookUrl}>Book</Link>
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
      const room = row.original;
      if (!room.currentReservationDto || !room.currentReservationDto.cost) {
        return "-";
      }

      return toEGP(room.currentReservationDto.cost);
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const [isMenuOpen, setIsMenuOpen] = useState(false);
      const { toast } = useToast();
      const room = row.original;
      const deleteMenuItem = (
        <AlertDialogActionWrapper
          title="Are you absolutely sure?"
          description="This action cannot be undone. This will permanently delete this
        room."
          destructive
          onConfirm={() => {
            if (!room.id) return;
            deleteRoom(room.id)
              .then((res) => {
                //FIXME: fix TS error
                //FIXME: this is bad & resource intensive, figure out how to edit state locally instead of fetching all data
                table.options.meta?.refetchData?.();
              })
              .catch((err) => {
                console.error(err);
                toast({
                  title: "Error",
                  description: "Failed to delete room",
                  variant: "destructive",
                });
              });
          }}
          afterClose={() => setIsMenuOpen(false)}
          trigger={
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="text-destructive dark:brightness-150 focus:bg-destructive focus:text-destructive-foreground"
            >
              Delete
            </DropdownMenuItem>
          }
        />
      );
      return (
        <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
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
            {/* <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View Reservation details</DropdownMenuItem> */}
            <DropdownMenuSeparator />
            {deleteMenuItem}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
