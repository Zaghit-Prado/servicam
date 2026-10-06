"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { toggleFavorite } from "@/app/actions";
import { useRouter } from "next/navigation";

export default function FavoriteButton({ serviceId, initialFavorited }: { serviceId: string, initialFavorited: boolean }) {
  const [isFavorited, setIsFavorited] = useState(initialFavorited);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleToggle = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await toggleFavorite(serviceId);
      setIsFavorited(res.isFavorited);
    } catch (e: any) {
      if (e.message.includes("Debes iniciar sesión")) {
        router.push("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleToggle} 
      className="bg-white/90 backdrop-blur-md p-2 rounded-full shadow-sm hover:scale-105 transition-transform"
      disabled={loading}
    >
      <Heart className={`w-6 h-6 transition-colors ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-900'}`} />
    </button>
  );
}
