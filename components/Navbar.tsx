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
            
            {user && (
              <div className="px-6 py-4 flex items-center gap-3 border-b border-brand-100 bg-brand-50">
                {user.image ? (
                  <img src={user.image} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center">
                    <UserCircle className="w-6 h-6 text-brand-300" />
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="font-bold text-brand-900 text-sm leading-tight">{user.name}</span>
                  <Link href="/perfil" onClick={() => setIsOpen(false)} className="text-brand-500 text-xs font-medium hover:underline">Ver perfil</Link>
                </div>
              </div>
            )}

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
              {user ? (
                <Link href="/perfil" onClick={() => setIsOpen(false)} className="w-full flex justify-center items-center gap-2 py-3 bg-brand-100 text-brand-900 rounded-xl font-bold hover:bg-brand-300 transition-colors">
                  <UserCircle className="w-5 h-5" /> Mi Perfil
                </Link>
              ) : (
                <Link href="/login" onClick={() => setIsOpen(false)} className="w-full flex justify-center py-3 bg-brand-500 text-white rounded-xl font-bold hover:bg-brand-700">
                  Iniciar Sesión
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
