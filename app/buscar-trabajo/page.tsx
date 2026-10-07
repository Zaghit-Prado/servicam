import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/app/actions";
import BuscarTrabajoClient from "./BuscarTrabajoClient";

export const dynamic = "force-dynamic";

export default async function BuscarTrabajo() {
  const user = await getCurrentUser();
  let savedServiceIds: string[] = [];
  let userSkills: string[] = [];

  if (user) {
    const userWithSaved = await prisma.user.findUnique({
      where: { id: user.id },
      select: { 
        savedServices: { select: { id: true } },
        skills: { select: { name: true } }
      }
    });
    if (userWithSaved) {
      savedServiceIds = userWithSaved.savedServices.map(s => s.id);
      userSkills = userWithSaved.skills.map(skill => skill.name.toLowerCase());
    }
  }

  const servicios = await prisma.serviceRequest.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: 'desc' },
  });

  // SISTEMA INTELIGENTE DE MATCHING
  // Evalúa cada servicio frente a las habilidades del prestador
  const scoredServices = servicios.map(svc => {
    let score = 0;
    const cat = svc.category.toLowerCase();
    const title = svc.title.toLowerCase();
    const desc = svc.description.toLowerCase();

    userSkills.forEach(skill => {
      // Coincidencia de Categoría (Peso Alto)
      if (cat.includes(skill) || skill.includes(cat)) {
        score += 50;
      }
      
      // Coincidencia en Título (Peso Medio)
      if (title.includes(skill)) {
        score += 30;
      }

      // Coincidencia en Descripción (Peso Bajo)
      if (desc.includes(skill)) {
        score += 15;
      }
    });

    return { ...svc, matchScore: score };
  });

  // Ordenar primero por coincidencia (mayor a menor) y luego por fecha
  scoredServices.sort((a, b) => {
    if (b.matchScore !== a.matchScore) {
      return b.matchScore - a.matchScore;
    }
    return b.createdAt.getTime() - a.createdAt.getTime();
  });

  return <BuscarTrabajoClient initialServices={scoredServices} savedServiceIds={savedServiceIds} />;
}
