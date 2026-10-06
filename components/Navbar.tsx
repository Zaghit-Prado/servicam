"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, UserCircle, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-md mx-auto px-6 h-16 flex items-center justify-between">
          <button 
            onClick={() => setIsOpen(true)}
            className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <Link href="/" className="font-bold text-xl tracking-tight text-brand-900">
            Servi<span className="text-brand-500">Cam</span>
          </Link>
          <div className="w-10 h-10"></div>
        </div>
      </header>

      {/* Menú lateral (Drawer) */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex">
          {/* Overlay oscuro */}
          <div 
            className="fixed inset-0 bg-brand-900/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Panel del menú */}
          <div className="relative w-3/4 max-w-sm bg-white h-full shadow-2xl flex flex-col transform transition-transform">
            <div className="p-6 flex items-center justify-between border-b border-brand-100">
              <span className="font-bold text-xl text-brand-900">Menú</span>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 -mr-2 text-brand-900 hover:bg-brand-100 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="p-4 flex flex-col gap-2 flex-1">
              <Link href="/" onClick={() => setIsOpen(false)} className="p-3 hover:bg-brand-50 rounded-xl font-medium text-brand-900">
                Inicio
              </Link>
              <Link href="/buscar-trabajo" onClick={() => setIsOpen(false)} className="p-3 hover:bg-brand-50 rounded-xl font-medium text-brand-900">
                Buscar Trabajo
              </Link>
              <Link href="/publicar" onClick={() => setIsOpen(false)} className="p-3 hover:bg-brand-50 rounded-xl font-medium text-brand-900">
                Publicar Servicio
              </Link>
              <Link href="/prestadores" onClick={() => setIsOpen(false)} className="p-3 hover:bg-brand-50 rounded-xl font-medium text-brand-900">
                Prestadores
              </Link>
              <Link href="/mapa" onClick={() => setIsOpen(false)} className="p-3 hover:bg-brand-50 rounded-xl font-medium text-brand-900">
                Mapa
              </Link>
            </nav>
            <div className="p-6 border-t border-brand-100">
              <Link href="/login" onClick={() => setIsOpen(false)} className="w-full flex justify-center py-3 bg-brand-500 text-white rounded-xl font-bold hover:bg-brand-700">
                Iniciar Sesión
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
