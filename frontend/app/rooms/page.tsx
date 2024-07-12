"use client";

import { useQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";

import { columns } from "./columns";
import { DataTable } from "./data-table";

import { Button } from "@/components/ui/button";
import DialogFormWrapper from "@/components/forms/dialog-form-wrapper";

import NewRoomForm from "@/app/new-room/new-room-form";

import { getAllRoomsWithCurrReservation } from "@/orval/api/api";

export default function RoomsPage() {
  const { data: rooms, refetch: refetchRooms } = useQuery({
    queryKey: ["getAllRoomsWithCurrReservation"],
    queryFn: getAllRoomsWithCurrReservation,
  });
  return (
    <div className="container mx-auto py-10">
      <div className="py-4">
        <div className="w-fit ms-auto">
          <DialogFormWrapper
            FormComponent={NewRoomForm}
            afterSubmit={refetchRooms}
            title="Add New Room"
            description="Fill in the form to add a new room"
            trigger={
              <Button>
                <PlusIcon size={20} className="mr-1" />
                New Room
              </Button>
            }
          />
        </div>
      </div>
      <DataTable
        title={"Rooms"}
        description={undefined}
        columns={columns}
        data={rooms || []}
      />
    </div>
  );
}
