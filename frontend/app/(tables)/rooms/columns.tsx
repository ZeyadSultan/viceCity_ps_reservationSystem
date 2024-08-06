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
import { isPlaystaion, toEGP } from "@/lib/utils";
import { Reservation, RoomsReservationsDTO } from "@/orval/api/model";
import * as DateFns from "date-fns";
import Link from "next/link";
import AlertDialogActionWrapper from "@/components/alert-dialog-action-wrapper";
import { useEffect, useState } from "react";
import { checkout, deleteRoom } from "@/orval/api/api";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const columns: ColumnDef<RoomsReservationsDTO>[] = [
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
      return !!room.currentReservation ? "Occupied" : "Vacant";
    },
  },
  {
    header: "Book/Checkout",
    cell: ({ row, table }) => {
      return <BookOrCheckoutButtonCell row={row} table={table} />;
    },
  },
  {
    header: "Price/Hour",
    cell: ({ row }) => {
      const room = row.original;
      if (isPlaystaion(room.type)) {
        return (
          <div className="flex flex-col gap-1">
            <span>Single: {room.priceSingle}</span>
            <span>Multi: {room.priceMulti}</span>
          </div>
        );
      }
      return toEGP(room.priceSingle || 0);
    },
  },
  {
    header: "Duration",
    cell: ({ row }) => {
      const room = row.original;
      if (!room.currentReservation || !room.currentReservation?.startTime)
        return "-";

      const endTime = room.currentReservation.endTime || new Date();
      const dur = DateFns.intervalToDuration({
        start: room.currentReservation.startTime,
        end: endTime,
      });
      return DateFns.formatDuration(dur);
    },
  },
  // {
  //   header: "Cost",
  //   cell: ({ row }) => {
  //     const room = row.original;
  //     if (!room.currentReservation || !room.currentReservation.cost) {
  //       return "-";
  //     }

  //     return toEGP(room.currentReservation.cost);
  //   },
  // },
  {
    id: "actions",
    cell: ({ row, table }) => {
      return <ActionCell row={row} table={table} />;
    },
  },
];

function BookOrCheckoutButtonCell({ row, table }: any) {
  const room = row.original;
  const bookUrl = `/new-reservation?roomId=${room.id}`;

  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [reservation, setReservation] = useState<Reservation>();

  useEffect(() => {
    if (!dialogOpen) {
      //FIXME: fix TS error
      //FIXME: this is bad & resource intensive, figure out how to edit state locally instead of fetching all data
      table.options.meta?.refetchData?.();
    }
  }, [dialogOpen]);

  return !!room.currentReservation ? (
    <>
      <AlertDialogActionWrapper
        title="Are you sure?"
        description="This will end user session and checkout the room"
        destructive
        onConfirm={() => {
          if (!room.id || !room.currentReservation?.id) return;
          checkout(room.currentReservation.id)
            .then((res) => {
              setDialogOpen(true);
              res && setReservation(res);
            })
            .catch((err) => {
              console.error(err);
              toast({
                title: "Error",
                description: "Failed to checkout",
                variant: "destructive",
              });
            });
        }}
        trigger={
          <Button variant="destructive" size="sm">
            Checkout
          </Button>
        }
      />
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Session Cost</DialogTitle>
            <DialogDescription>
              Duration:{" "}
              {reservation?.startTime &&
                reservation?.endTime &&
                DateFns.formatDuration(
                  DateFns.intervalToDuration({
                    start: reservation?.startTime,
                    end: reservation?.endTime,
                  })
                )}
            </DialogDescription>
          </DialogHeader>
          <div>Cost: {toEGP(reservation?.cost || 0)}</div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  ) : (
    <Button variant="success" size="sm" asChild>
      <Link href={bookUrl}>Book</Link>
    </Button>
  );
}

function ActionCell({ row, table }: any) {
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
}
