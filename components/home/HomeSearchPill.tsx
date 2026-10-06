"use client";

import Link from "next/link";
import { Search } from "lucide-react";

export function HomeSearchPill() {
  return (
    <div className="px-4 pt-4 pb-2">
      <Link href="/buscar-trabajo" className="flex items-center justify-center gap-3 bg-white border border-brand-100 shadow-[0_3px_10px_rgb(0,0,0,0.08)] rounded-full py-3.5 px-6 w-full max-w-md mx-auto hover:shadow-md transition-shadow">
        <Search className="w-5 h-5 text-brand-500" />
        <span className="font-semibold text-brand-900 text-[15px]">Empieza la búsqueda</span>
      </Link>
    </div>
  );
}
