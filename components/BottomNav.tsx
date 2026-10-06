"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Heart, UserCircle, MapPin } from "lucide-react";

export function BottomNav() {
  const pathname = usePathname();

  // No mostrar en la vista del mapa para que el mapa ocupe todo
  if (pathname === "/mapa") return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 pb-safe z-40">
      <div className="max-w-md mx-auto flex justify-between px-6 py-2">
        <Link href="/" className={`flex flex-col items-center p-2 ${pathname === "/" ? "text-red-500" : "text-gray-500 hover:text-gray-900"}`}>
          <Search className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">Explora</span>
        </Link>
        <Link href="/mapa" className={`flex flex-col items-center p-2 ${pathname === "/mapa" ? "text-red-500" : "text-gray-500 hover:text-gray-900"}`}>
          <MapPin className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">Mapa</span>
        </Link>
        <Link href="/favoritos" className={`flex flex-col items-center p-2 ${pathname === "/favoritos" ? "text-red-500" : "text-gray-500 hover:text-gray-900"}`}>
          <Heart className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">Favoritos</span>
        </Link>
        <Link href="/perfil" className={`flex flex-col items-center p-2 ${pathname === "/perfil" ? "text-red-500" : "text-gray-500 hover:text-gray-900"}`}>
          <UserCircle className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">Perfil</span>
        </Link>
      </div>
    </div>
  );
}
