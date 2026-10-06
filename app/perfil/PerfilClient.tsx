"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  UserCircle, Settings, HelpCircle, LogOut, ChevronRight, ChevronLeft, ShieldCheck,
  Briefcase, Globe, Clock, Dog, Languages, MapPin, X, Camera
} from "lucide-react";
import Link from "next/link";
import { logout } from "@/app/actions";
import { updateProfile } from "./actions"; // Lo crearemos después

export default function PerfilClient({ user, stats }: { user: any, stats: any }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    work: user?.work || "",
    dreamDest: user?.dreamDest || "",
    timeSpent: user?.timeSpent || "",
    pets: user?.pets || "",
    languages: user?.languages || "",
    image: user?.image || "",
    name: user?.name || ""
  });
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    // Asumiremos que crearemos un server action updateProfile
    await updateProfile(formData);
    setLoading(false);
    setIsEditing(false);
    // Un simple reload para ver los datos frescos (o podríamos manejar estado local)
    window.location.reload();
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 pb-24">
        <h1 className="text-2xl font-bold mb-4">Tu Perfil</h1>
        <p className="text-gray-500 mb-8 text-center">Inicia sesión para ver tu perfil, editar tu información y gestionar tus configuraciones.</p>
        <Link href="/login" className="w-full bg-[#E51D53] hover:bg-rose-600 text-white font-semibold py-4 rounded-xl transition-colors shadow-md text-center">
          Iniciar Sesión / Registrarse
        </Link>
      </div>
    );
  }

  const userRoleText = user.role === "PROVIDER" ? "Prestador" : "Cliente";
  const numJobs = user.role === "PROVIDER" ? stats.trabajosRealizados : stats.trabajosPublicados;
  const labelJobs = user.role === "PROVIDER" ? "Trabajos" : "Publicaciones";

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white pb-24 relative"
    >
      {/* Header */}
      <header className="px-4 py-4 flex items-center justify-between bg-white z-10 sticky top-0">
        <Link href="/" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
          <ChevronLeft className="w-5 h-5 text-gray-800" />
        </Link>
        <button 
          onClick={() => setIsEditing(true)}
          className="px-5 py-2 bg-gray-100 font-semibold rounded-full text-gray-800 hover:bg-gray-200 transition-colors"
        >
          Editar
        </button>
      </header>

      <main className="px-6 max-w-md mx-auto">
        {/* Profile Card Airbnb Style */}
        <div className="bg-white rounded-3xl shadow-[0_8px_28px_rgba(0,0,0,0.12)] p-6 mt-4 flex items-center justify-between border border-gray-100">
          <div className="flex flex-col items-center w-1/2 border-r border-gray-200 pr-4">
            <div className="relative w-24 h-24 mb-3">
              {user.image ? (
                <img src={user.image} alt={user.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                  <UserCircle className="w-12 h-12 text-gray-400" />
                </div>
              )}
              {user.isVerified && (
                <div className="absolute bottom-0 right-0 bg-[#E51D53] w-7 h-7 rounded-full flex items-center justify-center border-2 border-white">
                  <ShieldCheck className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <h1 className="text-2xl font-bold text-gray-900 text-center leading-tight">{user.name}</h1>
            <p className="text-gray-500 text-sm mt-1">{userRoleText}</p>
          </div>

          <div className="w-1/2 pl-6 flex flex-col gap-4">
            <div>
              <p className="text-xl font-bold text-gray-900 leading-none">{numJobs}</p>
              <p className="text-xs text-gray-500 mt-1 font-medium">{labelJobs}</p>
            </div>
            <div className="h-px w-full bg-gray-200"></div>
            <div>
              <p className="text-xl font-bold text-gray-900 leading-none">{stats.resenas}</p>
              <p className="text-xs text-gray-500 mt-1 font-medium">Reseñas</p>
            </div>
            <div className="h-px w-full bg-gray-200"></div>
            <div>
              <p className="text-xl font-bold text-gray-900 leading-none">{stats.antiguedadAnios}</p>
              <p className="text-xs text-gray-500 mt-1 font-medium">Años en ServiCam</p>
            </div>
          </div>
        </div>

        {/* Profile Details List */}
        <div className="mt-8 flex flex-col gap-5 border-b border-gray-200 pb-8">
          {user.work && (
            <div className="flex items-start gap-4">
              <Briefcase className="w-6 h-6 text-gray-700 shrink-0 mt-0.5" />
              <p className="text-gray-800 text-[17px]">A qué me dedico: <span className="font-medium">{user.work}</span></p>
            </div>
          )}
          {user.dreamDest && (
            <div className="flex items-start gap-4">
              <Globe className="w-6 h-6 text-gray-700 shrink-0 mt-0.5" />
              <p className="text-gray-800 text-[17px]">A donde siempre quise ir: <span className="font-medium">{user.dreamDest}</span></p>
            </div>
          )}
          {user.timeSpent && (
            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-gray-700 shrink-0 mt-0.5" />
              <p className="text-gray-800 text-[17px]">A qué le dedico mucho tiempo: <span className="font-medium">{user.timeSpent}</span></p>
            </div>
          )}
          {user.pets && (
            <div className="flex items-start gap-4">
              <Dog className="w-6 h-6 text-gray-700 shrink-0 mt-0.5" />
              <p className="text-gray-800 text-[17px]">Mascotas: <span className="font-medium">{user.pets}</span></p>
            </div>
          )}
          {user.languages && (
            <div className="flex items-start gap-4">
              <Languages className="w-6 h-6 text-gray-700 shrink-0 mt-0.5" />
              <p className="text-gray-800 text-[17px]">Habla <span className="font-medium">{user.languages}</span></p>
            </div>
          )}
          
          <div className="flex items-start gap-4">
            <ShieldCheck className="w-6 h-6 text-gray-700 shrink-0 mt-0.5" />
            <p className="text-gray-800 text-[17px] font-medium underline underline-offset-2">{user.isVerified ? "Identidad verificada" : "Identidad no verificada"}</p>
          </div>
        </div>

        {/* Settings Links */}
        <div className="mt-4">
          <form action={logout}>
            <button type="submit" className="w-full flex items-center justify-between py-4 hover:bg-gray-50 transition-colors">
              <span className="font-medium text-gray-900 text-[17px] underline">Cerrar sesión</span>
            </button>
          </form>
        </div>
      </main>

      {/* MODAL DE EDICIÓN DE PERFIL */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[200] flex flex-col overflow-y-auto"
          >
            <header className="px-4 py-4 flex items-center justify-between sticky top-0 bg-white border-b border-gray-100 z-10">
              <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-900" />
              </button>
              <h2 className="font-bold text-lg text-gray-900">Editar perfil</h2>
              <div className="w-10"></div> {/* Spacer */}
            </header>

            <main className="flex-1 p-6 max-w-md mx-auto w-full">
              
              <div className="flex flex-col items-center mb-8">
                <div className="relative w-32 h-32 mb-4 group cursor-pointer">
                  {formData.image ? (
                     <img src={formData.image} alt="Perfil" className="w-full h-full rounded-full object-cover shadow-sm" />
                  ) : (
                     <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                       <UserCircle className="w-16 h-16 text-gray-400" />
                     </div>
                  )}
                  {/* Photo Edit input - For demo, we just show a link input */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-4 py-1.5 rounded-full shadow-md border border-gray-100 flex items-center gap-2">
                    <Camera className="w-4 h-4 text-gray-800" />
                    <span className="text-sm font-semibold text-gray-900">Editar</span>
                  </div>
                </div>
                
                <input 
                  type="text" 
                  placeholder="URL de la imagen (Ej: https://...)" 
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full text-center text-sm text-gray-500 bg-transparent border-none outline-none focus:ring-0 mt-4"
                />
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Mi perfil</h3>
                <p className="text-gray-500 text-sm">
                  Los clientes y prestadores pueden ver tu perfil para ayudarnos a fomentar la confianza en nuestra comunidad.
                </p>
              </div>

              <div className="flex flex-col gap-6">
                
                {/* Inputs */}
                <div className="border border-gray-300 rounded-xl px-4 py-3 focus-within:border-black focus-within:ring-1 focus-within:ring-black">
                  <label className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1 block">Nombre</label>
                  <input type="text" className="w-full outline-none text-gray-900 font-medium" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>

                <div className="border border-gray-300 rounded-xl px-4 py-3 focus-within:border-black focus-within:ring-1 focus-within:ring-black">
                  <label className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1 block">A qué me dedico</label>
                  <input type="text" className="w-full outline-none text-gray-900 font-medium" placeholder="Ej: Carpintero profesional" value={formData.work} onChange={(e) => setFormData({...formData, work: e.target.value})} />
                </div>

                <div className="border border-gray-300 rounded-xl px-4 py-3 focus-within:border-black focus-within:ring-1 focus-within:ring-black">
                  <label className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1 block">A dónde siempre quise ir</label>
                  <input type="text" className="w-full outline-none text-gray-900 font-medium" placeholder="Ej: Cusco" value={formData.dreamDest} onChange={(e) => setFormData({...formData, dreamDest: e.target.value})} />
                </div>

                <div className="border border-gray-300 rounded-xl px-4 py-3 focus-within:border-black focus-within:ring-1 focus-within:ring-black">
                  <label className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1 block">A qué le dedico mucho tiempo</label>
                  <input type="text" className="w-full outline-none text-gray-900 font-medium" placeholder="Ej: A mi trabajo y familia" value={formData.timeSpent} onChange={(e) => setFormData({...formData, timeSpent: e.target.value})} />
                </div>

                <div className="border border-gray-300 rounded-xl px-4 py-3 focus-within:border-black focus-within:ring-1 focus-within:ring-black">
                  <label className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1 block">Mascotas</label>
                  <input type="text" className="w-full outline-none text-gray-900 font-medium" placeholder="Ej: Sí, se llama Beyli y es un perro" value={formData.pets} onChange={(e) => setFormData({...formData, pets: e.target.value})} />
                </div>

                <div className="border border-gray-300 rounded-xl px-4 py-3 focus-within:border-black focus-within:ring-1 focus-within:ring-black">
                  <label className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1 block">Idiomas que hablo</label>
                  <input type="text" className="w-full outline-none text-gray-900 font-medium" placeholder="Ej: Español, Inglés" value={formData.languages} onChange={(e) => setFormData({...formData, languages: e.target.value})} />
                </div>

              </div>

              <div className="mt-8 pb-10">
                <button 
                  onClick={handleSave}
                  disabled={loading}
                  className="w-full bg-[#222222] hover:bg-black text-white font-bold py-4 rounded-xl transition-colors disabled:opacity-50"
                >
                  {loading ? "Guardando..." : "Listo"}
                </button>
              </div>

            </main>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
