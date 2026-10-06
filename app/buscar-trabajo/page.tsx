import { prisma } from "@/lib/prisma";
import BuscarTrabajoClient from "./BuscarTrabajoClient";

export const dynamic = "force-dynamic";

export default async function BuscarTrabajo() {
  const servicios = await prisma.serviceRequest.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: 'desc' },
  });

  return <BuscarTrabajoClient initialServices={servicios} />;
}
