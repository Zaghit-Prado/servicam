"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ChevronLeft, SlidersHorizontal, Search, Map as MapIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getMapServices } from "@/app/actions";

const Map = dynamic(() => import('@/components/Map'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-500">Cargando mapa...</div>
});

export default function MapaInteractivo() {
  const [allServices, setAllServices] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  // Filtros
  const [filtro, setFiltro] = useState("Todos");
  const filtros = ["Todos", "Reparaciones", "Gasfitería", "Electricidad", "Carpintería"];

  useEffect(() => {
    getMapServices().then(data => {
      setAllServices(data);
      setServices(data);
    });
  }, []);

  useEffect(() => {
    if (filtro === "Todos") {
      setServices(allServices);
    } else {
      setServices(allServices.filter(s => s.category === filtro));
    }
  }, [filtro, allServices]);

  const selectedService = services.find(s => s.id === selectedId);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-screen bg-gray-50 overflow-hidden relative"
    >
      {/* Floating Header */}
      <header className="absolute top-0 left-0 right-0 z-[100] px-4 pt-12 pb-2 pointer-events-none flex flex-col items-center gap-4">
        
        <div className="flex gap-2 w-full max-w-md pointer-events-auto">
          <Link href="/" className="bg-white flex items-center justify-center w-14 h-14 text-gray-800 shadow-[0_3px_15px_rgb(0,0,0,0.1)] rounded-full transition-colors hover:bg-gray-50 shrink-0">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <div className="flex-1 bg-white shadow-[0_3px_15px_rgb(0,0,0,0.1)] rounded-full flex flex-col justify-center items-center px-4 cursor-text">
            <span className="font-bold text-gray-900 text-[15px]">Trabajos en tu área</span>
            <span className="text-xs text-gray-500">Cualquier fecha • Cualquier precio</span>
          </div>
          <button className="bg-white flex items-center justify-center w-14 h-14 text-gray-800 shadow-[0_3px_15px_rgb(0,0,0,0.1)] rounded-full transition-colors hover:bg-gray-50 shrink-0 relative">
            <SlidersHorizontal className="w-5 h-5" />
            <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-black rounded-full border-2 border-white"></span>
          </button>
        </div>

        {/* Pill Filters (Like Airbnb) */}
        <div className="w-full max-w-md overflow-x-auto hide-scrollbar pointer-events-auto px-2">
          <div className="flex gap-2">
            {filtros.map((f) => (
              <button
                key={f}
                onClick={() => setFiltro(f)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-sm ${
                  filtro === f 
                    ? "bg-gray-900 text-white border border-gray-900" 
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

      </header>

      {/* Mapa Interactivo */}
      <div className="flex-1 w-full h-full z-0">
        <Map services={services} selectedId={selectedId} onSelect={setSelectedId} />
      </div>

      {/* Floating Lista Button */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[90] pointer-events-auto">
        <Link href="/buscar-trabajo" className="bg-[#222222] hover:bg-black text-white px-5 py-3 rounded-full font-bold flex items-center gap-2 shadow-[0_8px_20px_rgb(0,0,0,0.2)] transition-transform hover:scale-105">
          <span>Lista</span>
          <Search className="w-4 h-4" />
        </Link>
      </div>

      {/* Animated Bottom Card Preview */}
      <AnimatePresence>
        {selectedService && (
          <motion.div 
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.08)] p-6 z-[100] max-w-md mx-auto"
          >
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-6" onClick={() => setSelectedId(null)}></div>
            <div className="flex justify-between items-start mb-2">
              <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-xs font-semibold">{selectedService.category}</div>
              <span className="font-bold text-gray-900 text-base">S/ {selectedService.minPrice}</span>
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-1">{selectedService.title}</h3>
            <p className="text-sm text-gray-500 line-clamp-1 mb-6">{selectedService.description}</p>
            
            <div className="flex gap-3">
              <button onClick={() => setSelectedId(null)} className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 shrink-0 transition-colors">
                 ✕
              </button>
              <Link href={`/servicio/${selectedService.id}`} className="flex-1 flex justify-center items-center bg-[#222222] hover:bg-black text-white font-semibold py-3 rounded-xl transition-colors shadow-md">
                Ver detalles
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
