"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/app/actions";
import { revalidatePath } from "next/cache";

export async function sendMessage(receiverId: string, content: string) {
  const user = await getCurrentUser();
  if (!user) {
    return { success: false, error: "No autorizado" };
  }

  if (!content.trim()) return { success: false };

  try {
    await prisma.message.create({
      data: {
        content: content.trim(),
        senderId: user.id,
        receiverId
      }
    });

    revalidatePath(`/chat/${receiverId}`);
    return { success: true };
  } catch (e) {
    return { success: false, error: "Error al enviar mensaje" };
  }
}
