"use client";

import { DataTableCard } from "@/components/data-table-card";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./columns";
import { getReservations } from "@/orval/api/api";

function ReservationsPage() {
  const { data: reservations, refetch: refetchReservations } = useQuery({
    queryKey: ["getAllReservations"],
    queryFn: getReservations,
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
