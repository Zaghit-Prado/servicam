import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/app/actions";
import BuscarTrabajoClient from "./BuscarTrabajoClient";

export const dynamic = "force-dynamic";

export default async function BuscarTrabajo() {
  const user = await getCurrentUser();
  let savedServiceIds: string[] = [];

  if (user) {
    const userWithSaved = await prisma.user.findUnique({
      where: { id: user.id },
      select: { savedServices: { select: { id: true } } }
    });
    if (userWithSaved) {
      savedServiceIds = userWithSaved.savedServices.map(s => s.id);
    }
  }

  const servicios = await prisma.serviceRequest.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: 'desc' },
  });

  return <BuscarTrabajoClient initialServices={servicios} savedServiceIds={savedServiceIds} />;
}
