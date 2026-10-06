"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { toggleFavorite } from "@/app/actions";
import { useRouter } from "next/navigation";

export default function FavoriteButton({ 
  serviceId, 
  initialFavorited,
  variant = "detail" 
}: { 
  serviceId: string, 
  initialFavorited: boolean,
  variant?: "detail" | "card" | "dark-card"
}) {
  const [isFavorited, setIsFavorited] = useState(initialFavorited);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (loading) return;
    setLoading(true);
    try {
      const res = await toggleFavorite(serviceId);
      setIsFavorited(res.isFavorited);
    } catch (err: any) {
      if (err?.message?.includes("Debes iniciar sesión")) {
        router.push("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  if (variant === "card") {
    return (
      <button 
        type="button"
        onClick={handleToggle} 
        disabled={loading}
        className="p-1 cursor-pointer transition-transform active:scale-90 z-20"
      >
        <Heart className={`w-6 h-6 stroke-[1.5px] drop-shadow-md transition-colors ${
          isFavorited 
            ? 'fill-red-500 text-red-500' 
            : 'text-white hover:fill-red-500 hover:text-red-500'
        }`} />
      </button>
    );
  }

  if (variant === "dark-card") {
    return (
      <button 
        type="button"
        onClick={handleToggle} 
        disabled={loading}
        className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer active:scale-90"
      >
        <Heart className={`w-5 h-5 transition-colors ${
          isFavorited 
            ? 'fill-red-500 text-red-500' 
            : 'text-gray-600 hover:text-red-500'
        }`} />
      </button>
    );
  }

  return (
    <button 
      type="button"
      onClick={handleToggle} 
      className="bg-white/90 backdrop-blur-md p-2 rounded-full shadow-sm hover:scale-105 transition-transform cursor-pointer"
      disabled={loading}
    >
      <Heart className={`w-6 h-6 transition-colors ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-900'}`} />
    </button>
  );
}
