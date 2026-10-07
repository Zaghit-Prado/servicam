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
  bio?: string;
  skills?: string[];
}) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("No autenticado");
  }

  const updateData: any = {
    work: data.work,
    dreamDest: data.dreamDest,
    timeSpent: data.timeSpent,
    pets: data.pets,
    languages: data.languages,
    image: data.image,
    name: data.name,
  };

  if (data.bio !== undefined) {
    updateData.bio = data.bio;
  }

  if (data.skills !== undefined) {
    // Primero, upsert skills for relationships
    const skillsConnect = await Promise.all(data.skills.map(async (skillName) => {
      const skill = await prisma.skill.upsert({
        where: { name: skillName },
        update: {},
        create: { name: skillName }
      });
      return { id: skill.id };
    }));
    
    updateData.skills = {
      set: [], // Clear existing relations
      connect: skillsConnect
    };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: updateData
  });

  revalidatePath("/perfil");
  return { success: true };
}
