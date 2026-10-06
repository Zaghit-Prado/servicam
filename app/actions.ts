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

// Publicar un nuevo servicio
export async function publishService(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Debes iniciar sesión para publicar un servicio");

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const minPrice = Number(formData.get("minPrice"));
  const maxPrice = Number(formData.get("maxPrice"));

  // Crear servicio en Prisma
  await prisma.serviceRequest.create({
    data: {
      title: title || "Servicio solicitado",
      description,
      category: category || "Reparaciones",
      minPrice,
      maxPrice,
      clientId: user.id,
      // Coordenadas aleatorias cerca del centro de la ciudad para simular
      latitude: -12.046 + (Math.random() - 0.5) * 0.05,
      longitude: -77.042 + (Math.random() - 0.5) * 0.05,
      images: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=600&q=80",
    }
  });

  redirect("/");
}


// Alternar un servicio en favoritos
export async function toggleFavorite(serviceId: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Debes iniciar sesión para guardar favoritos");

  // Verificar si ya está en favoritos
  const existing = await prisma.user.findUnique({
    where: { id: user.id },
    select: { savedServices: { where: { id: serviceId } } }
  });

  const isFavorited = existing?.savedServices.length ? existing.savedServices.length > 0 : false;

  if (isFavorited) {
    // Quitar de favoritos
    await prisma.user.update({
      where: { id: user.id },
      data: { savedServices: { disconnect: { id: serviceId } } }
    });
    return { isFavorited: false };
  } else {
    // Añadir a favoritos
    await prisma.user.update({
      where: { id: user.id },
      data: { savedServices: { connect: { id: serviceId } } }
    });
    return { isFavorited: true };
  }
}
