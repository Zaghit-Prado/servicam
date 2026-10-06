"use client";

import { useState } from "react";
import Link from "next/link";
import { Camera, ImagePlus, ChevronLeft, MapPin } from "lucide-react";

export default function PublicarServicio() {
  const [categoria, setCategoria] = useState("");
  const [urgencia, setUrgencia] = useState("normal");

  const categorias = ["Gasfitería", "Electricidad", "Carpintería", "Armado de Muebles", "Reparaciones", "Pintura"];

  return (
    <div className="flex flex-col min-h-screen bg-white pb-24">
      {/* Header Secundario */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 h-16 flex items-center gap-3">
        <Link href="/" className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="font-bold text-lg text-gray-900">Publicar un servicio</h1>
      </header>

      <main className="px-6 pt-6 flex flex-col gap-8 max-w-md mx-auto w-full">
        
        {/* Sección de Fotos */}
        <section>
          <h2 className="text-sm font-bold text-gray-900 mb-3">Fotos del problema</h2>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 bg-gray-50 rounded-2xl h-32 hover:bg-gray-100 transition-colors">
              <Camera className="w-8 h-8 text-gray-400" />
              <span className="text-xs font-semibold text-gray-600">Tomar foto</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 bg-gray-50 rounded-2xl h-32 hover:bg-gray-100 transition-colors">
              <ImagePlus className="w-8 h-8 text-gray-400" />
              <span className="text-xs font-semibold text-gray-600">Subir galería</span>
            </button>
          </div>
        </section>

        {/* Categoría */}
        <section>
          <h2 className="text-sm font-bold text-gray-900 mb-3">¿Qué tipo de ayuda necesitas?</h2>
          <div className="flex flex-wrap gap-2">
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoria(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  categoria === cat 
                    ? "bg-blue-600 text-white shadow-md" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Descripción */}
        <section>
          <h2 className="text-sm font-bold text-gray-900 mb-3">Describe el problema</h2>
          <textarea
            rows={4}
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            placeholder="Ej: La puerta del baño no cierra bien porque las bisagras están vencidas..."
          ></textarea>
        </section>

        {/* Presupuesto */}
        <section>
          <h2 className="text-sm font-bold text-gray-900 mb-3">Presupuesto estimado (Soles)</h2>
          <div className="flex items-center gap-3">
            <input
              type="number"
              placeholder="Min"
              className="w-1/2 bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <span className="text-gray-400">-</span>
            <input
              type="number"
              placeholder="Max"
              className="w-1/2 bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </section>

        {/* Ubicación */}
        <section>
          <h2 className="text-sm font-bold text-gray-900 mb-3">Ubicación</h2>
          <button className="w-full flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl p-4 text-left hover:bg-gray-100 transition-colors">
            <div className="bg-blue-100 p-2 rounded-full">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Usar mi ubicación actual</p>
              <p className="text-xs text-gray-500">Se usará solo para calcular distancias</p>
            </div>
          </button>
        </section>

      </main>

      {/* Footer Fixed Action Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
        <button className="w-full max-w-md mx-auto block bg-blue-600 text-white font-bold text-lg py-4 rounded-2xl shadow-lg hover:bg-blue-700 transition-colors">
          Publicar Solicitud
        </button>
      </div>

    </div>
  );
}
