"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, UserCircle, X, LogOut } from "lucide-react";
import { getCurrentUser } from "@/app/actions";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    getCurrentUser().then(u => {
      if (u) setUser(u);
    });
  }, []);

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
          <div className="w-10 h-10 flex items-center justify-end">
            {user?.image ? (
              <Link href="/perfil">
                <img src={user.image} alt="Perfil" className="w-8 h-8 rounded-full object-cover border border-gray-200" />
              </Link>
            ) : null}
          </div>
        </div>
      </header>

      {/* Menú lateral (Drawer) */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex">
          {/* Overlay oscuro */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Panel del menú */}
          <div className="relative w-[85%] max-w-sm bg-white h-full shadow-2xl flex flex-col transform transition-transform overflow-y-auto">
            <div className="p-4 flex items-center justify-start border-b border-gray-100">
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-900 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="font-bold text-lg text-gray-900 ml-2">Menú</span>
            </div>
            
            {user && (
              <div className="px-6 py-5 flex items-center gap-3 border-b border-gray-100">
                {user.image ? (
                  <img src={user.image} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <UserCircle className="w-8 h-8 text-gray-400" />
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-900 text-base">{user.name}</span>
                  <Link href="/perfil" onClick={() => setIsOpen(false)} className="text-gray-500 text-sm mt-0.5 hover:underline">Mostrar perfil</Link>
                </div>
              </div>
            )}

            <nav className="flex flex-col flex-1">
              {/* Sección principal */}
              <div className="py-2 border-b border-gray-100">
                <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-4 px-6 py-3.5 hover:bg-gray-50">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-gray-900"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                  <span className="text-gray-900 text-[17px]">Inicio</span>
                </Link>
                <Link href="/buscar-trabajo" onClick={() => setIsOpen(false)} className="flex items-center gap-4 px-6 py-3.5 hover:bg-gray-50">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-gray-900"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                  <span className="text-gray-900 text-[17px]">Buscar Trabajo</span>
                </Link>
                <Link href="/publicar" onClick={() => setIsOpen(false)} className="flex items-center gap-4 px-6 py-3.5 hover:bg-gray-50">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-gray-900"><path d="M12 5v14M5 12h14"></path></svg>
                  <span className="text-gray-900 text-[17px]">Publicar Servicio</span>
                </Link>
                <Link href="/mapa" onClick={() => setIsOpen(false)} className="flex items-center gap-4 px-6 py-3.5 hover:bg-gray-50">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-gray-900"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  <span className="text-gray-900 text-[17px]">Mapa de Servicios</span>
                </Link>
              </div>

              {/* Sección secundaria */}
              <div className="py-2 border-b border-gray-100">
                <Link href="/favoritos" onClick={() => setIsOpen(false)} className="flex items-center gap-4 px-6 py-3.5 hover:bg-gray-50">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-gray-900"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                  <span className="text-gray-900 text-[17px]">Listas de favoritos</span>
                </Link>
                <Link href="/perfil" onClick={() => setIsOpen(false)} className="flex items-center gap-4 px-6 py-3.5 hover:bg-gray-50">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-gray-900"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                  <span className="text-gray-900 text-[17px]">Mensajes</span>
                </Link>
                <Link href="/perfil" onClick={() => setIsOpen(false)} className="flex items-center gap-4 px-6 py-3.5 hover:bg-gray-50">
                  <UserCircle className="w-6 h-6 text-gray-900 stroke-[1.5]" />
                  <span className="text-gray-900 text-[17px]">Perfil</span>
                </Link>
              </div>

              {/* Banner Conviértete en prestador */}
              <div className="px-6 py-6 pb-8">
                {user?.role === "PROVIDER" ? (
                  <Link href="/perfil" onClick={() => setIsOpen(false)} className="block">
                    <h3 className="text-[17px] font-semibold text-gray-900 mb-1">Mi panel de Prestador</h3>
                    <p className="text-gray-500 text-[15px] leading-snug">Gestiona tus servicios y trabajos activos.</p>
                  </Link>
                ) : (
                  <Link href="/perfil/editar" onClick={() => setIsOpen(false)} className="block relative">
                    <div className="pr-12">
                      <h3 className="text-[17px] font-semibold text-gray-900 mb-1">Conviértete en Prestador de servicio</h3>
                      <p className="text-gray-500 text-[14px] leading-snug">Empieza a ofrecer tus servicios y genera ingresos adicionales, ¡es muy sencillo!</p>
                    </div>
                    <div className="absolute top-0 right-0">
                      <span className="text-4xl">🛠️</span>
                    </div>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
