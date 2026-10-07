"use server";

import { prisma } from "@/lib/prisma";
import { checkAdmin } from "./adminAuth";
import { revalidatePath } from "next/cache";

export async function toggleBanUser(userId: string, ban: boolean) {
  const isAdmin = await checkAdmin();
  if (!isAdmin) throw new Error("No autorizado");

  await prisma.user.update({
    where: { id: userId },
    data: { isBanned: ban }
  });

  revalidatePath("/admin/usuarios");
  return { success: true };
}

export async function deleteServiceRequest(serviceId: string) {
  const isAdmin = await checkAdmin();
  if (!isAdmin) throw new Error("No autorizado");

  await prisma.serviceRequest.delete({
    where: { id: serviceId }
  });

  revalidatePath("/admin/servicios");
  return { success: true };
}

export async function createCategory(formData: FormData) {
  const isAdmin = await checkAdmin();
  if (!isAdmin) throw new Error("No autorizado");

  const name = formData.get("name") as string;
  const icon = formData.get("icon") as string;

  if (name) {
    await prisma.systemCategory.create({
      data: { name, icon }
    });
  }

  revalidatePath("/admin/categorias");
  return { success: true };
}

export async function deleteCategory(id: string) {
  const isAdmin = await checkAdmin();
  if (!isAdmin) throw new Error("No autorizado");

  await prisma.systemCategory.delete({
    where: { id }
  });

  revalidatePath("/admin/categorias");
  return { success: true };
}
