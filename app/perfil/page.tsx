import { getCurrentUser } from "@/app/actions";
import { prisma } from "@/lib/prisma";
import PerfilClient from "./PerfilClient";

export default async function MiPerfilPage() {
  const sessionUser = await getCurrentUser();
  
  if (!sessionUser) {
    return <PerfilClient user={null} stats={null} />;
  }

  const fullUser = await prisma.user.findUnique({
    where: { id: sessionUser.id },
    include: {
      servicesPosted: true,
      servicesDone: true,
      reviewsReceived: true,
      skills: true,
      applications: {
        include: { service: true }
      }
    }
  });

  const stats = {
    trabajosPublicados: fullUser?.servicesPosted.length || 0,
    trabajosRealizados: fullUser?.servicesDone.length || 0,
    resenas: fullUser?.reviewsReceived.length || 0,
    antiguedadAnios: new Date().getFullYear() - new Date(fullUser?.createdAt || new Date()).getFullYear() || 1
  };

  return <PerfilClient user={fullUser} stats={stats} />;
}
