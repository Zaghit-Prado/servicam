import { getCurrentUser } from "@/app/actions";
import PerfilClient from "./PerfilClient";

export default async function MiPerfilPage() {
  const user = await getCurrentUser();
  return <PerfilClient user={user} />;
}
