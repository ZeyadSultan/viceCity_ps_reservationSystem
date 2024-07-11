import NewReservationForm, { PreFillableFields } from "./new-reservation-form";

type SearchParams = { [key: string]: string | undefined };

type NewReservationPageProps = {
  searchParams: SearchParams;
};

async function NewReservationPage({ searchParams }: NewReservationPageProps) {
  const preFilledData: PreFillableFields = {
    customerName: searchParams?.customerName,
    customerPhoneNumber: searchParams?.customerPhoneNumber,
    roomId: searchParams?.roomId,
  };
  // generating random here to match server with client to avoid hydration errors
  const randomNumber = Math.random();
  return (
    <>
      <NewReservationForm
        preFilledData={preFilledData}
        randomNumber={randomNumber}
      />
    </>
  );
}

export default NewReservationPage;
