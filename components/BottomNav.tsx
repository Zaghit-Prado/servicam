"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Heart, UserCircle, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/app/actions";

export function BottomNav() {
  const pathname = usePathname();
  const [userImage, setUserImage] = useState<string | null>(null);

  useEffect(() => {
    getCurrentUser().then(user => {
      if (user?.image) setUserImage(user.image);
    });
  }, []);

  // No mostrar en la vista del mapa para que el mapa ocupe todo
  if (pathname === "/mapa") return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 pb-safe z-40">
      <div className="max-w-md mx-auto flex justify-between px-6 py-2">
        <Link href="/" className={`flex flex-col items-center p-2 ${pathname === "/" ? "text-brand-500" : "text-gray-500 hover:text-gray-900"}`}>
          <Search className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">Explora</span>
        </Link>
        <Link href="/mapa" className={`flex flex-col items-center p-2 ${pathname === "/mapa" ? "text-brand-500" : "text-gray-500 hover:text-gray-900"}`}>
          <MapPin className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">Mapa</span>
        </Link>
        <Link href="/favoritos" className={`flex flex-col items-center p-2 ${pathname === "/favoritos" ? "text-brand-500" : "text-gray-500 hover:text-gray-900"}`}>
          <Heart className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">Favoritos</span>
        </Link>
        <Link href="/perfil" className={`flex flex-col items-center p-2 ${pathname.startsWith("/perfil") ? "text-brand-500" : "text-gray-500 hover:text-gray-900"}`}>
          {userImage ? (
            <img src={userImage} alt="Perfil" className="w-6 h-6 rounded-full mb-1 object-cover border border-gray-200" />
          ) : (
            <UserCircle className="w-6 h-6 mb-1" />
          )}
          <span className="text-[10px] font-medium">Perfil</span>
        </Link>
      </div>
    </div>
  );
}
