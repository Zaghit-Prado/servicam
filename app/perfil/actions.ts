"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/app/actions";
import { revalidatePath } from "next/cache";

export async function updateProfile(data: {
  work: string;
  dreamDest: string;
  timeSpent: string;
  pets: string;
  languages: string;
  image: string;
  name: string;
}) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("No autenticado");
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      work: data.work,
      dreamDest: data.dreamDest,
      timeSpent: data.timeSpent,
      pets: data.pets,
      languages: data.languages,
      image: data.image,
      name: data.name,
    }
  });

  revalidatePath("/perfil");
  return { success: true };
}
