import { redirect } from "next/navigation";

export default async function TaskPage() {
  redirect("/rooms");
  return <div>HOMEPAGE</div>;
}
