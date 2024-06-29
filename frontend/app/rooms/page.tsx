import { Room } from "@/schemas";
import { columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Room[]> {
  // Fetch data from your API here.
  return [
    {
      id: 1,
      name: "PlayStation Room 1",
      type: "playstaion",
      price_per_hour: 15,
      // status: "occupied",
      current_reservation: {
        id: 1,
        room_id: 1,
        customer_phone_number: "01000000000",
        start_time: new Date("2024-06-28T10:00:00Z"),
        end_time: new Date("2024-06-28T12:00:00Z"),
      },
    },
    {
      id: 2,
      name: "Billiard Room 1",
      type: "pool",
      price_per_hour: 20,
      // status: "vacant",
      current_reservation: null,
    },
    {
      id: 3,
      name: "Ping Pong Room 1",
      type: "ping-pong",
      price_per_hour: 10,
      // status: "occupied",
      current_reservation: {
        id: 2,
        room_id: 3,
        customer_phone_number: "01000000001",
        start_time: new Date("2024-06-28T11:00:00Z"),
        end_time: new Date("2024-06-28T13:00:00Z"),
      },
    },
    {
      id: 4,
      name: "PlayStation Room 2",
      type: "playstaion",
      price_per_hour: 15,
      // status: "vacant",
      current_reservation: null,
    },
    {
      id: 5,
      name: "Billiard Room 2",
      type: "pool",
      price_per_hour: 20,
      // status: "vacant",
      current_reservation: null,
    },
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
