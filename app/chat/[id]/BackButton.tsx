"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();
  
  return (
    <button 
      onClick={() => router.back()}
      className="p-2 -ml-2 text-white/80 hover:bg-white/10 rounded-full transition-colors"
    >
      <ChevronLeft className="w-6 h-6" />
    </button>
  );
}
