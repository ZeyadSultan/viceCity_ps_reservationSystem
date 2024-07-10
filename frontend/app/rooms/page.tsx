import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getAllRoomsWithCurrReservation } from "@/orval/api/api";

export default async function DemoPage() {
  const rooms = await getAllRoomsWithCurrReservation();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={rooms} />
    </div>
  );
}
