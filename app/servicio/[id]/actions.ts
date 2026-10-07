"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/app/actions";
import { revalidatePath } from "next/cache";

export async function applyToService(serviceId: string) {
  const user = await getCurrentUser();
  if (!user || user.role !== "PROVIDER") {
    return { success: false, error: "No autorizado" };
  }

  try {
    await prisma.application.create({
      data: {
        serviceId,
        providerId: user.id
      }
    });

    // Crear un mensaje automático inicial para que aparezca en el chat (opcional)
    const service = await prisma.serviceRequest.findUnique({ where: { id: serviceId } });
    if (service) {
      await prisma.message.create({
        data: {
          content: `Hola, he postulado a tu trabajo: "${service.title}". ¡Me encantaría ayudarte!`,
          senderId: user.id,
          receiverId: service.clientId
        }
      });
    }

    revalidatePath(`/servicio/${serviceId}`);
    return { success: true };
  } catch (e: any) {
    if (e.code === 'P2002') {
      return { success: false, error: "Ya estás postulado a este servicio." };
    }
    return { success: false, error: "Error al postular" };
  }
}
