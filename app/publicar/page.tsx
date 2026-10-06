"use client";

import { useState } from "react";
import Link from "next/link";
import { Camera, ImagePlus, ChevronLeft, MapPin } from "lucide-react";
import { publishService } from "@/app/actions";

export default function PublicarServicio() {
  const [categoria, setCategoria] = useState("Reparaciones");

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

      <form action={publishService} className="px-6 pt-6 flex flex-col gap-8 max-w-md mx-auto w-full">
        {/* Campo oculto para enviar el estado de react al Server Action */}
        <input type="hidden" name="category" value={categoria} />
        
        {/* Título Breve */}
        <section>
          <h2 className="text-sm font-bold text-gray-900 mb-3">Título breve de tu problema</h2>
          <input
            type="text"
            name="title"
            required
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Ej: Fuga de agua debajo del lavadero"
          />
        </section>

        {/* Categoría */}
        <section>
          <h2 className="text-sm font-bold text-gray-900 mb-3">¿Qué tipo de ayuda necesitas?</h2>
          <div className="flex flex-wrap gap-2">
            {categorias.map((cat) => (
              <button
                type="button"
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
            name="description"
            required
            rows={4}
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            placeholder="Da detalles útiles para el prestador..."
          ></textarea>
        </section>

        {/* Presupuesto */}
        <section>
          <h2 className="text-sm font-bold text-gray-900 mb-3">Presupuesto estimado (Soles)</h2>
          <div className="flex items-center gap-3">
            <input
              type="number"
              name="minPrice"
              required
              placeholder="Mínimo"
              className="w-1/2 bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <span className="text-gray-400">-</span>
            <input
              type="number"
              name="maxPrice"
              required
              placeholder="Máximo"
              className="w-1/2 bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </section>

        {/* Ubicación Visual */}
        <section>
          <h2 className="text-sm font-bold text-gray-900 mb-3">Ubicación</h2>
          <button type="button" className="w-full flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl p-4 text-left hover:bg-gray-100 transition-colors">
            <div className="bg-blue-100 p-2 rounded-full">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Usar mi ubicación actual</p>
              <p className="text-xs text-gray-500">Privado, solo se usa para calcular distancias</p>
            </div>
          </button>
        </section>

        {/* Footer Fixed Action Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-50">
          <button type="submit" className="w-full max-w-md mx-auto block bg-blue-600 text-white font-bold text-lg py-4 rounded-2xl shadow-lg hover:bg-blue-700 transition-colors">
            Publicar Solicitud
          </button>
        </div>
      </form>
    </div>
  );
}
