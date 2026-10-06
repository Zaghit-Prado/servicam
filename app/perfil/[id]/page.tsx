"use client";

import Link from "next/link";
import { ChevronLeft, Star, MapPin, CheckCircle, MessageCircle, Share, Award } from "lucide-react";

export default function PerfilPrestador() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-24">
      {/* Header flotante */}
      <header className="absolute top-0 left-0 right-0 z-50 p-4 flex justify-between items-center">
        <Link href="/prestadores" className="bg-white/80 backdrop-blur-md p-2 text-gray-800 shadow-sm rounded-full transition-colors hover:bg-white">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <button className="bg-white/80 backdrop-blur-md p-2 text-gray-800 shadow-sm rounded-full transition-colors hover:bg-white">
          <Share className="w-5 h-5" />
        </button>
      </header>

      {/* Cover y Foto */}
      <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
        <div className="absolute -bottom-12 left-6">
          <div className="w-24 h-24 bg-gray-200 border-4 border-white rounded-full shadow-md"></div>
          <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full flex justify-center items-center">
             <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
      </div>

      <main className="px-6 pt-16 max-w-md mx-auto w-full">
        {/* Info Principal */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Carlos Mendoza</h1>
          <p className="text-gray-500 mb-3">Especialista en Carpintería y Muebles</p>
          
          <div className="flex flex-wrap gap-4 text-sm mb-4">
            <div className="flex items-center gap-1 font-semibold text-gray-900">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              4.9 <span className="text-gray-500 font-normal">(124 reseñas)</span>
            </div>
            <div className="flex items-center gap-1 font-semibold text-gray-900">
              <Award className="w-4 h-4 text-blue-500" />
              Top Pro
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <MapPin className="w-4 h-4 text-gray-400" />
              Miraflores
            </div>
          </div>
          
          <p className="text-sm text-gray-700 leading-relaxed">
            Tengo más de 10 años de experiencia trabajando con madera, restaurando muebles antiguos y realizando instalaciones de puertas y ventanas a medida. El detalle y la puntualidad son mi sello.
          </p>
        </div>

        {/* Habilidades */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Habilidades verificadas</h2>
          <div className="flex flex-wrap gap-2">
            <span className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-semibold flex gap-1 items-center">
               <CheckCircle className="w-3 h-3" /> Reparación de puertas
            </span>
            <span className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-xs font-medium">Instalación</span>
            <span className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-xs font-medium">Muebles</span>
            <span className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-xs font-medium">Melamina</span>
          </div>
        </div>

        {/* Galería (mock) */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Trabajos recientes</h2>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
            <div className="min-w-[120px] h-24 bg-gray-200 rounded-xl"></div>
            <div className="min-w-[120px] h-24 bg-gray-200 rounded-xl"></div>
            <div className="min-w-[120px] h-24 bg-gray-200 rounded-xl"></div>
          </div>
        </div>

      </main>

      {/* Footer Fijo de Contacto */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-50 pb-safe">
        <button className="w-full max-w-md mx-auto flex justify-center items-center gap-2 bg-blue-600 text-white font-bold text-lg py-4 rounded-2xl shadow-lg hover:bg-blue-700 transition-colors">
          <MessageCircle className="w-5 h-5" /> Enviar mensaje
        </button>
      </div>

    </div>
  );
}
