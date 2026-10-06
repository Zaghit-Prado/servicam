"use client";

import Link from "next/link";
import { Heart, Star, ArrowRight } from "lucide-react";

export function HomeServiceCards() {
  return (
    <>
      {/* Section 1: Servicios populares */}
      <section className="px-4 py-6 max-w-md mx-auto w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Servicios populares cerca de ti</h2>
          <Link href="/buscar-trabajo" className="p-1.5 bg-gray-100 rounded-full hover:bg-gray-200">
            <ArrowRight className="w-5 h-5 text-gray-600" />
          </Link>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
          {/* Card 1 */}
          <div className="snap-start min-w-[280px] flex flex-col gap-3">
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-gray-200 group block">
              <Link href="/perfil/carlos-mendoza" className="absolute inset-0 z-0"></Link>
              <div className="absolute top-3 right-3 z-10">
                <button className="p-1">
                  <Heart className="w-6 h-6 text-white stroke-[1.5px] drop-shadow-md hover:fill-red-500 hover:text-red-500 transition-colors" />
                </button>
              </div>
              <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-gray-900 shadow-sm pointer-events-none">
                Favorito de clientes
              </div>
              <div className="w-full h-full bg-gradient-to-tr from-blue-600 to-cyan-500 pointer-events-none"></div>
            </div>
            <Link href="/perfil/carlos-mendoza" className="block">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-900 text-base">Gasfitería General</h3>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 fill-gray-900 text-gray-900" />
                  <span>4.85</span>
                </div>
              </div>
              <p className="text-gray-500 text-sm">Carlos Mendoza</p>
              <p className="text-gray-900 mt-1"><span className="font-semibold">S/ 80</span> por visita</p>
            </Link>
          </div>

          {/* Card 2 */}
          <div className="snap-start min-w-[280px] flex flex-col gap-3">
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-gray-200 group block">
              <Link href="/perfil/ana-suarez" className="absolute inset-0 z-0"></Link>
              <div className="absolute top-3 right-3 z-10">
                <button className="p-1">
                  <Heart className="w-6 h-6 text-white stroke-[1.5px] drop-shadow-md hover:fill-red-500 hover:text-red-500 transition-colors" />
                </button>
              </div>
              <div className="w-full h-full bg-gradient-to-tr from-yellow-500 to-orange-400 pointer-events-none"></div>
            </div>
            <Link href="/perfil/ana-suarez" className="block">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-900 text-base">Electricidad</h3>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 fill-gray-900 text-gray-900" />
                  <span>4.92</span>
                </div>
              </div>
              <p className="text-gray-500 text-sm">Ana Suárez</p>
              <p className="text-gray-900 mt-1"><span className="font-semibold">S/ 50</span> por visita</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2: Trabajos recientes */}
      <section className="px-4 py-2 max-w-md mx-auto w-full pb-24">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Trabajos recientes publicados</h2>
          <Link href="/buscar-trabajo" className="p-1.5 bg-gray-100 rounded-full hover:bg-gray-200">
            <ArrowRight className="w-5 h-5 text-gray-600" />
          </Link>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
          {/* Card 3 */}
          <div className="snap-start min-w-[280px] flex flex-col gap-3">
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-gray-200 group block">
              <Link href="/buscar-trabajo" className="absolute inset-0 z-0"></Link>
              <div className="absolute top-3 right-3 z-10">
                <button className="p-1">
                  <Heart className="w-6 h-6 text-white stroke-[1.5px] drop-shadow-md hover:fill-red-500 hover:text-red-500 transition-colors" />
                </button>
              </div>
              <div className="w-full h-full bg-gradient-to-tr from-green-500 to-emerald-400 pointer-events-none"></div>
            </div>
            <Link href="/buscar-trabajo" className="block">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-900 text-base">Armado de Muebles</h3>
              </div>
              <p className="text-gray-500 text-sm line-clamp-1">Armar ropero de 3 puertas...</p>
              <p className="text-gray-900 mt-1"><span className="font-semibold">S/ 120</span> presupuesto</p>
            </Link>
          </div>
          
           {/* Card 4 */}
           <div className="snap-start min-w-[280px] flex flex-col gap-3">
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-gray-200 group block">
              <Link href="/buscar-trabajo" className="absolute inset-0 z-0"></Link>
              <div className="absolute top-3 right-3 z-10">
                <button className="p-1">
                  <Heart className="w-6 h-6 text-white stroke-[1.5px] drop-shadow-md hover:fill-red-500 hover:text-red-500 transition-colors" />
                </button>
              </div>
              <div className="w-full h-full bg-gradient-to-tr from-purple-500 to-pink-500 pointer-events-none"></div>
            </div>
            <Link href="/buscar-trabajo" className="block">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-900 text-base">Pintura de fachada</h3>
              </div>
              <p className="text-gray-500 text-sm line-clamp-1">Pintar pared exterior de 5x3m...</p>
              <p className="text-gray-900 mt-1"><span className="font-semibold">S/ 300</span> presupuesto</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
