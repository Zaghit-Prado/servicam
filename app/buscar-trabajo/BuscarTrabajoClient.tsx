"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Search, SlidersHorizontal, MapPin, Clock, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FavoriteButton from "@/app/servicio/[id]/FavoriteButton";

export default function BuscarTrabajoClient({ 
  initialServices,
  savedServiceIds = [] 
}: { 
  initialServices: any[],
  savedServiceIds?: string[]
}) {
  const [filtro, setFiltro] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const savedSet = new Set(savedServiceIds);
  const filtros = ["Todos", "Reparaciones", "Gasfitería", "Electricidad", "Carpintería"];

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [tempMinPrice, setTempMinPrice] = useState(0);
  const [tempMaxPrice, setTempMaxPrice] = useState(1000);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  // Filtrar en el cliente
  const filteredServices = initialServices.filter(svc => {
    const matchFiltro = filtro === "Todos" || svc.category === filtro;
    const matchSearch = svc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        svc.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Asumimos que los precios vienen en formato numérico o string numérico
    const svcMin = Number(svc.minPrice) || 0;
    const svcMax = Number(svc.maxPrice) || 0;
    
    // Si el trabajo está completamente fuera del rango de precio deseado, lo ocultamos
    // (Ejemplo: si el usuario busca entre 0 y 100, y el trabajo es 150-200)
    const matchPrice = (svcMin <= maxPrice && svcMax >= minPrice);

    return matchFiltro && matchSearch && matchPrice;
  });

  const applyFilters = () => {
    setMinPrice(tempMinPrice);
    setMaxPrice(tempMaxPrice);
    setIsFilterModalOpen(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      className="flex flex-col min-h-screen bg-gray-50"
    >
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm px-4 h-16 flex items-center gap-3">
        <Link href="/" className="p-2 -ml-2 text-brand-900 hover:bg-brand-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar trabajos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-brand-100/50 rounded-full py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition-shadow"
          />
        </div>
        <button 
          onClick={() => setIsFilterModalOpen(true)}
          className="p-2 -mr-2 text-brand-900 hover:bg-brand-100 rounded-full transition-colors"
        >
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
                  ? "bg-brand-900 text-white shadow-md" 
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-brand-50"
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
                className="bg-white p-5 rounded-3xl shadow-sm border border-brand-100"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="bg-brand-100 text-brand-700 px-3 py-1 rounded-full text-xs font-bold">
                      {servicio.category}
                    </div>
                    {(servicio as any).matchScore > 0 && (
                      <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-green-200">
                        ⭐ Recomendado para ti
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 pl-2">
                    <span className="font-bold text-gray-900 whitespace-nowrap">S/ {servicio.minPrice} - {servicio.maxPrice}</span>
                    <FavoriteButton serviceId={servicio.id} initialFavorited={savedSet.has(servicio.id)} variant="dark-card" />
                  </div>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-1">{servicio.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4">{servicio.description}</p>
                
                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <MapPin className="w-4 h-4 text-brand-500/70" />
                    <span>A calcular...</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Clock className="w-4 h-4 text-brand-500/70" />
                    <span>Publicado recientemente</span>
                  </div>
                </div>

                <Link href={`/servicio/${servicio.id}`} className="w-full bg-brand-50 hover:bg-brand-100 text-brand-900 font-semibold py-3 rounded-xl flex justify-center items-center gap-2 transition-colors">
                  Ver detalles <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </main>

      {/* Floating Map Button */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[50]">
        <Link href="/mapa" className="bg-brand-900 hover:bg-brand-700 text-white px-5 py-3 rounded-full font-bold flex items-center gap-2 shadow-[0_8px_20px_rgb(0,0,0,0.2)] transition-transform hover:scale-105">
          <span>Mapa</span>
          <MapPin className="w-4 h-4" />
        </Link>
      </div>

      {/* Modal de Filtros */}
      <AnimatePresence>
        {isFilterModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterModalOpen(false)}
              className="fixed inset-0 bg-brand-900/40 z-[60] backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-[70] p-6 pb-10 max-w-md mx-auto"
            >
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
              <h2 className="text-xl font-bold text-gray-900 mb-6">Filtros de Búsqueda</h2>
              
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-900 mb-4">Rango de Precio Estimado (S/)</label>
                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-xs text-gray-500 mb-1 block">Mínimo</span>
                    <input 
                      type="number" 
                      value={tempMinPrice}
                      onChange={(e) => setTempMinPrice(Number(e.target.value))}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-brand-500" 
                    />
                  </div>
                  <div className="mt-5 text-gray-400">-</div>
                  <div>
                    <span className="text-xs text-gray-500 mb-1 block">Máximo</span>
                    <input 
                      type="number" 
                      value={tempMaxPrice}
                      onChange={(e) => setTempMaxPrice(Number(e.target.value))}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-brand-500" 
                    />
                  </div>
                </div>
              </div>

              <button 
                onClick={applyFilters}
                className="w-full bg-brand-500 hover:bg-brand-700 text-white font-bold py-4 rounded-xl transition-colors"
              >
                Mostrar resultados
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
