"use client";

import Link from "next/link";
import { Search } from "lucide-react";

export function HomeSearchPill() {
  return (
    <div className="px-4 pt-4 pb-2">
      <Link href="/buscar-trabajo" className="flex items-center justify-center gap-3 bg-white border border-gray-200 shadow-[0_3px_10px_rgb(0,0,0,0.08)] rounded-full py-3.5 px-6 w-full max-w-md mx-auto hover:shadow-md transition-shadow">
        <Search className="w-5 h-5 text-gray-800" />
        <span className="font-semibold text-gray-900 text-[15px]">Empieza la búsqueda</span>
      </Link>
    </div>
  );
}
