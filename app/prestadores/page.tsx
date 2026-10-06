"use client";

import Link from "next/link";
import { ChevronLeft, Star, MapPin, CheckCircle, MessageCircle } from "lucide-react";

export default function PrestadoresRecomendados() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm px-4 h-16 flex items-center gap-3">
        <Link href="/" className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="font-bold text-lg text-gray-900">Prestadores Recomendados</h1>
      </header>

      <main className="px-4 py-6 flex flex-col gap-6 max-w-md mx-auto w-full pb-24">
        
        {/* Match Alert */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex gap-3">
          <div className="bg-blue-100 p-2 rounded-full h-fit">
            <CheckCircle className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-blue-900 mb-1">¡Hemos encontrado 3 coincidencias altas!</h3>
            <p className="text-xs text-blue-800">Basado en tu solicitud: "Reparación de puerta de madera".</p>
          </div>
        </div>

        {/* Provider Profile Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="h-24 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
          <div className="px-5 pb-5">
            <div className="flex justify-between items-end -mt-10 mb-4">
              <div className="w-20 h-20 bg-gray-200 border-4 border-white rounded-full"></div>
              <div className="flex gap-1 items-center bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-100">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                Disponible
              </div>
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 mb-1">Carlos Mendoza</h2>
            <p className="text-sm text-gray-500 mb-4">Especialista en Carpintería y Muebles</p>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <div>
                  <div className="font-bold text-gray-900">4.9</div>
                  <div className="text-xs text-gray-500">124 reseñas</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="font-bold text-gray-900">2.5 km</div>
                  <div className="text-xs text-gray-500">Distancia</div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">Reparación de puertas</span>
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">Instalación</span>
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">Muebles</span>
            </div>

            <div className="flex gap-3">
              <Link href="/perfil/carlos-mendoza" className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 font-semibold py-3 rounded-xl transition-colors flex justify-center items-center">
                Ver Perfil
              </Link>
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl flex justify-center items-center gap-2 transition-colors">
                <MessageCircle className="w-4 h-4" /> Contactar
              </button>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
