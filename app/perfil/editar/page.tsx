import { getCurrentUser } from "@/app/actions";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { updateUserProfile } from "./actions";

export default async function EditarPerfil() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Link href="/login" className="text-blue-600">Inicia sesión primero</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <header className="bg-white px-4 py-4 flex items-center border-b border-gray-100 shadow-sm sticky top-0 z-10 max-w-md mx-auto">
        <Link href="/perfil" className="p-2 -ml-2 rounded-full hover:bg-gray-50 transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-900" />
        </Link>
        <h1 className="font-bold text-lg text-gray-900 ml-2">Configuración</h1>
      </header>

      <main className="px-6 pt-8 max-w-md mx-auto w-full">
        <form action={updateUserProfile} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Nombre completo</label>
            <input 
              type="text" 
              name="name" 
              defaultValue={user.name || ""} 
              className="border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:border-black focus:ring-1 focus:ring-black outline-none"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Teléfono</label>
            <input 
              type="tel" 
              name="phone" 
              defaultValue={user.phone || ""} 
              className="border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:border-black focus:ring-1 focus:ring-black outline-none"
              placeholder="+51 999 999 999"
            />
          </div>

          <div className="flex flex-col gap-2 opacity-50">
            <label className="text-sm font-semibold text-gray-700">Correo electrónico</label>
            <input 
              type="email" 
              defaultValue={user.email || ""} 
              className="border border-gray-300 rounded-xl px-4 py-3 text-gray-900 bg-gray-100"
              disabled
            />
            <span className="text-xs text-gray-500">El correo no se puede cambiar.</span>
          </div>

          <button type="submit" className="mt-6 w-full bg-black hover:bg-gray-800 text-white font-semibold py-4 rounded-xl transition-colors">
            Guardar cambios
          </button>
        </form>
      </main>
    </div>
  );
}
