"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Obtener servicios para el mapa
export async function getMapServices() {
  return await prisma.serviceRequest.findMany({
    where: { status: "PUBLISHED" },
    include: { client: true },
  });
}

// Iniciar sesión o registrarse
export async function loginOrRegister(formData: FormData) {
  const email = formData.get("email") as string;
  const name = formData.get("name") as string;

  if (!email) {
    throw new Error("El email es requerido");
  }

  let user = await prisma.user.findUnique({ where: { email } });

  // Si no existe, lo creamos (Registro)
  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        name: name || email.split("@")[0], // Nombre por defecto
        role: "CLIENT",
      },
    });
  }

  // Guardar sesión en cookies
  const cookieStore = await cookies();
  cookieStore.set("userId", user.id, { httpOnly: true, secure: process.env.NODE_ENV === "production" });

  redirect("/perfil");
}

// Cerrar sesión
export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("userId");
  redirect("/");
}

// Obtener usuario actual
export async function getCurrentUser() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;
  if (!userId) return null;

  return await prisma.user.findUnique({
    where: { id: userId },
  });
}

