"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ADMIN_SECRET = process.env.ADMIN_SECRET || "admin123";

export async function loginAdmin(formData: FormData) {
  const password = formData.get("password") as string;
  
  if (password === ADMIN_SECRET) {
    const cookieStore = await cookies();
    cookieStore.set("adminToken", ADMIN_SECRET, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 // 1 day
    });
    return { success: true };
  }
  
  return { error: "Contraseña incorrecta" };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("adminToken");
  redirect("/admin/login");
}

export async function checkAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("adminToken")?.value;
  return token === ADMIN_SECRET;
}
