"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Search, SlidersHorizontal, MapPin, Clock, ArrowRight } from "lucide-react";

export default function BuscarTrabajo() {
  const [filtro, setFiltro] = useState("Recomendados");
  const filtros = ["Recomendados", "Cerca de mí", "Nuevos", "Urgentes"];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm px-4 h-16 flex items-center gap-3">
        <Link href="/" className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar trabajos..."
            className="w-full bg-gray-100 rounded-full py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="p-2 -mr-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
          <SlidersHorizontal className="w-5 h-5" />
        </button>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-40">
        <div className="flex overflow-x-auto hide-scrollbar px-4 py-3 gap-2">
          {filtros.map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filtro === f 
                  ? "bg-gray-900 text-white" 
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <main className="px-4 py-6 flex flex-col gap-4 max-w-md mx-auto w-full pb-20">
        {/* Card Job 1 */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-3">
            <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
              Alta Coincidencia
            </div>
            <span className="font-bold text-gray-900">S/ 100 - 150</span>
          </div>
          <h3 className="font-bold text-lg text-gray-900 mb-1">Reparación de puerta de madera</h3>
          <p className="text-sm text-gray-500 line-clamp-2 mb-4">
            La puerta de mi baño no cierra bien. Las bisagras parecen estar vencidas y rosa contra el piso.
          </p>
          
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span>A 2.5 km de ti (Miraflores)</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Clock className="w-4 h-4 text-gray-400" />
              <span>Publicado hace 2 horas • <span className="text-orange-500 font-semibold">Urgente</span></span>
            </div>
          </div>

          <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-900 font-semibold py-3 rounded-xl flex justify-center items-center gap-2 transition-colors">
            Ver detalles <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Card Job 2 */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-3">
            <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">
              Electricidad
            </div>
            <span className="font-bold text-gray-900">S/ 50 - 80</span>
          </div>
          <h3 className="font-bold text-lg text-gray-900 mb-1">Instalación de focos LED</h3>
          <p className="text-sm text-gray-500 line-clamp-2 mb-4">
            Necesito cambiar 4 focos dicroicos antiguos por paneles LED en la sala. Ya tengo los focos comprados.
          </p>
          
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span>A 5 km de ti (San Isidro)</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Clock className="w-4 h-4 text-gray-400" />
              <span>Publicado hace 5 horas</span>
            </div>
          </div>

          <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-900 font-semibold py-3 rounded-xl flex justify-center items-center gap-2 transition-colors">
            Ver detalles <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </main>
    </div>
  );
}
