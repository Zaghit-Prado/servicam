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

import { Resend } from 'resend';

// 1. Solicitar código de verificación (Magic Code)
export async function requestLoginCode(email: string) {
  if (!email) return { error: "El email es requerido" };

  const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6 dígitos
  const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutos

  let user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        name: email.split("@")[0],
        role: "CLIENT",
        otp: code,
        otpExpires: expires,
      },
    });
  } else {
    await prisma.user.update({
      where: { email },
      data: {
        otp: code,
        otpExpires: expires,
      },
    });
  }

  // ENVÍO DE CORREO REAL CON RESEND
  try {
    const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy');
    const result = await resend.emails.send({
      from: 'ServiCam <onboarding@resend.dev>',
      to: email,
      subject: `Tu código de ServiCam es ${code}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #1853db; margin-top: 0;">ServiCam</h2>
          <h1 style="font-size: 24px; color: #333;">Confirma que eres tú</h1>
          <p style="color: #555; font-size: 16px;">
            Ingresa este código en la aplicación para iniciar sesión de forma segura:
          </p>
          <div style="background-color: #f4f4f5; padding: 20px; text-align: center; border-radius: 8px; margin: 24px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #000;">${code}</span>
          </div>
          <p style="color: #888; font-size: 14px;">
            Este código expirará en 10 minutos. Si no lo solicitaste, puedes ignorar este correo.
          </p>
        </div>
      `
    });

    if (result.error) {
      console.error("Error de Resend:", result.error);
      return { error: "Resend rechazó el envío (Verifica que tu correo sea el autorizado)" };
    }
  } catch (error) {
    console.error("Excepción en Resend:", error);
    return { error: "Error en el servidor al enviar correo" };
  }
  
  return { success: true };
}

// 2. Verificar el código e iniciar sesión
export async function verifyLoginCode(email: string, code: string) {
  if (!email || !code) return { error: "Datos incompletos" };

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || user.otp !== code || !user.otpExpires || user.otpExpires < new Date()) {
    return { error: "Código inválido o expirado" };
  }

  // Limpiar OTP y marcar verificado
  await prisma.user.update({
    where: { email },
    data: {
      otp: null,
      otpExpires: null,
      emailVerified: new Date(),
    },
  });

  // Guardar sesión en cookies
  const cookieStore = await cookies();
  cookieStore.set("userId", user.id, { httpOnly: true, secure: process.env.NODE_ENV === "production" });

  return { success: true };
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
