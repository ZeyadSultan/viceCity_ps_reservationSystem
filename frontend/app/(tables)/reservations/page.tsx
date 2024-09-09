"use client";

import { useQuery } from "@tanstack/react-query";
import { columns } from "./columns";
import { getReservations } from "@/orval/api/api";
import ReservationsTableCard from "./reservations-table-card";

function ReservationsPage() {
  const { data: reservations, refetch: refetchReservations } = useQuery({
    queryKey: ["getAllReservations"],
    queryFn: getReservations,
  });
  return (
    <ReservationsTableCard
      title={"Reservations"}
      description={undefined}
      columns={columns}
      data={reservations || []}
      refetchData={refetchReservations}
    />
  );
}

export default ReservationsPage;
