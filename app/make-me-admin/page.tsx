import { makeMeAdmin } from "@/app/actions";
import { redirect } from "next/navigation";

export default async function MakeMeAdmin() {
  await makeMeAdmin();
  redirect("/admin");
}
