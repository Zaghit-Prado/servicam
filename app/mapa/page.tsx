"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ChevronLeft, SlidersHorizontal } from "lucide-react";

// Carga dinámica del mapa para evitar el error "window is not defined" de Leaflet en SSR
const Map = dynamic(() => import('@/components/Map'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-500">Cargando mapa...</div>
});

export default function MapaInteractivo() {
  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden relative">
      
      {/* Floating Header */}
      <header className="absolute top-0 left-0 right-0 z-[100] px-4 pt-4 pb-2 pointer-events-none">
        <div className="flex gap-2 w-full max-w-md mx-auto pointer-events-auto">
          <Link href="/" className="bg-white flex items-center justify-center w-12 h-12 text-gray-800 shadow-[0_3px_10px_rgb(0,0,0,0.08)] rounded-full transition-colors hover:bg-gray-50 shrink-0">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div className="flex-1 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.08)] rounded-full flex items-center px-4">
            <input 
              type="text" 
              placeholder="Buscar por ubicación..." 
              className="w-full bg-transparent border-none focus:outline-none text-sm text-gray-900 font-medium"
            />
          </div>
          <button className="bg-white flex items-center justify-center w-12 h-12 text-gray-800 shadow-[0_3px_10px_rgb(0,0,0,0.08)] rounded-full transition-colors hover:bg-gray-50 shrink-0">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Mapa Interactivo Real (React Leaflet) */}
      <div className="flex-1 w-full h-full z-0">
        <Map />
      </div>

      {/* Bottom Card Preview (Selected Service) */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.08)] p-6 z-[100]">
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-6"></div>
        <div className="flex justify-between items-start mb-2">
          <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-xs font-semibold">Gasfitería</div>
          <span className="font-bold text-gray-900 text-base">S/ 120</span>
        </div>
        <h3 className="font-bold text-lg text-gray-900 mb-1">Reparación de tubería</h3>
        <p className="text-sm text-gray-500 line-clamp-1 mb-6">Fuga de agua en el lavadero de la cocina.</p>
        
        <div className="flex gap-3">
          <Link href="/buscar-trabajo" className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 shrink-0 transition-colors">
             ✕
          </Link>
          <Link href="/perfil/carlos-mendoza" className="flex-1 flex justify-center items-center bg-[#222222] hover:bg-black text-white font-semibold py-3 rounded-xl transition-colors">
            Ver detalle
          </Link>
        </div>
      </div>

    </div>
  );
}
