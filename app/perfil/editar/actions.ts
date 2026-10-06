"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function updateUserProfile(formData: FormData) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;
  if (!userId) throw new Error("No autenticado");

  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;

  await prisma.user.update({
    where: { id: userId },
    data: { name, phone },
  });

  redirect("/perfil");
}
