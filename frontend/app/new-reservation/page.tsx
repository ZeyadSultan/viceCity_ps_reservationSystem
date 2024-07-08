import { getData } from "../rooms/page";
import NewReservationForm from "./new-reservation-form";

async function NewReservationPage() {
  const rooms = await getData();
  const availableRooms = rooms.filter((room) => !room.current_reservation);
  // generating random here to match server with client to avoid hydration errors
  const randomNumber = Math.random();
  return (
    <>
      <NewReservationForm rooms={availableRooms} randomNumber={randomNumber} />
    </>
  );
}

export default NewReservationPage;
