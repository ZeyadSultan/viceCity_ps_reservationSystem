"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal } from "lucide-react";

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
import { ReservationDTO } from "@/orval/api/model";
import * as DateFns from "date-fns";
import AlertDialogActionWrapper from "@/components/alert-dialog-action-wrapper";
import { ReactNode, useState } from "react";
import { deleteReservation } from "@/orval/api/api";
import { useToast } from "@/components/ui/use-toast";

const SortingButton = ({
  onClickHandler,
  children,
}: {
  onClickHandler: () => void;
  children: ReactNode;
}) => {
  return (
    <Button variant="ghost" className="text-left p-1" onClick={onClickHandler}>
      {children}
      <ArrowUpDown className="ml-2 w-4 h-4" />
    </Button>
  );
};

export const columns: ColumnDef<ReservationDTO>[] = [
  {
    accessorKey: "id",
    id: "id",
    header: ({ column }) => {
      return (
        <SortingButton
          onClickHandler={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          ID
        </SortingButton>
      );
    },
  },
  {
    accessorFn: (row) => row.room?.name || "-",
    header: ({ column }) => {
      return (
        <SortingButton
          onClickHandler={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Room Name
        </SortingButton>
      );
    },
    id: "roomName",
  },
  {
    id: "customerName",
    accessorFn: (row) => row.reserverName || "-",
    header: ({ column }) => {
      return (
        <SortingButton
          onClickHandler={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Customer Name
        </SortingButton>
      );
    },
  },
  {
    id: "phoneNumber",
    accessorFn: (row) => row.phoneNumber || "-",
    header: ({ column }) => {
      return (
        <SortingButton
          onClickHandler={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Phone Number
        </SortingButton>
      );
    },
  },
  {
    id: "startTime",
    accessorFn: (row) => {
      const reservation = row;
      if (!reservation || !reservation.startTime) return "-";
      return DateFns.format(
        new Date(reservation.startTime),
        "dd/MM/yyyy HH:mm"
      );
    },
    header: ({ column }) => {
      return (
        <SortingButton
          onClickHandler={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Start Time
        </SortingButton>
      );
    },
  },
  {
    header: "Duration",
    accessorFn: (row) => {
      const reservation = row;
      if (!reservation || !reservation?.startTime || !reservation?.endTime)
        return "-";
      const dur = DateFns.intervalToDuration({
        start: reservation.startTime,
        end: reservation.endTime,
      });
      return DateFns.formatDuration(dur);
    },
  },
  {
    header: "Cost",
    accessorFn: (row) => toEGP(row.cost || 0),
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      return <ActionCell row={row} table={table} />;
    },
  },
];

function ActionCell({ row, table }: any) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();
  const reservation = row.original;
  const deleteMenuItem = (
    <AlertDialogActionWrapper
      title="Are you absolutely sure?"
      description="This action cannot be undone. This will permanently delete this
        reservation."
      destructive
      onConfirm={() => {
        if (!reservation.id) return;
        deleteReservation(reservation.id)
          .then((res) => {
            //FIXME: fix TS error
            //FIXME: this is bad & resource intensive, figure out how to edit state locally instead of fetching all data
            table.options.meta?.refetchData?.();
          })
          .catch((err) => {
            console.error(err);
            toast({
              title: "Error",
              description: "Failed to delete reservation",
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
            navigator.clipboard.writeText(reservation.id?.toString() || "")
          }
        >
          Copy Reservation ID
        </DropdownMenuItem>
        {/* <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View Reservation details</DropdownMenuItem> */}
        <DropdownMenuSeparator />
        {deleteMenuItem}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
