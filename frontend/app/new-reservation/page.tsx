import NewReservationForm from "./new-reservation-form";

async function NewReservationPage() {
  // generating random here to match server with client to avoid hydration errors
  const randomNumber = Math.random();
  return (
    <>
      {/* <NewReservationForm rooms={availableRooms} randomNumber={randomNumber} /> */}
      <NewReservationForm randomNumber={randomNumber} />
    </>
  );
}

export default NewReservationPage;
