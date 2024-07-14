"use client";

import { DataTableCard } from "@/components/data-table-card";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./columns";
import { getAllReservations } from "@/orval/api/api";

function ReservationsPage() {
  const { data: reservations, refetch: refetchReservations } = useQuery({
    queryKey: ["getAllReservations"],
    queryFn: getAllReservations,
  });
  return (
    <DataTableCard
      title={"Reservations"}
      description={undefined}
      columns={columns}
      data={reservations || []}
      refetchData={refetchReservations}
    />
  );
}

export default ReservationsPage;
