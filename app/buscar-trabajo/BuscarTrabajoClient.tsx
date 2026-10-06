"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Search, SlidersHorizontal, MapPin, Clock, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BuscarTrabajoClient({ initialServices }: { initialServices: any[] }) {
  const [filtro, setFiltro] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const filtros = ["Todos", "Reparaciones", "Gasfitería", "Electricidad", "Carpintería"];

  // Filtrar en el cliente
  const filteredServices = initialServices.filter(svc => {
    const matchFiltro = filtro === "Todos" || svc.category === filtro;
    const matchSearch = svc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        svc.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchFiltro && matchSearch;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      className="flex flex-col min-h-screen bg-gray-50"
    >
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-100 rounded-full py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
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
                  ? "bg-gray-900 text-white shadow-md" 
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <main className="px-4 py-6 flex flex-col gap-4 max-w-md mx-auto w-full pb-20">
        <AnimatePresence>
          {filteredServices.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-center py-20 text-gray-500"
            >
              No se encontraron trabajos con estos filtros.
            </motion.div>
          ) : (
            filteredServices.map((servicio) => (
              <motion.div 
                key={servicio.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                    {servicio.category}
                  </div>
                  <span className="font-bold text-gray-900">S/ {servicio.minPrice} - {servicio.maxPrice}</span>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-1">{servicio.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4">{servicio.description}</p>
                
                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>A calcular...</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>Publicado recientemente</span>
                  </div>
                </div>

                <Link href={`/servicio/${servicio.id}`} className="w-full bg-gray-50 hover:bg-gray-100 text-gray-900 font-semibold py-3 rounded-xl flex justify-center items-center gap-2 transition-colors">
                  Ver detalles <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </main>
    </motion.div>
  );
}
