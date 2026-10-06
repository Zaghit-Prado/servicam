"use client";

import Link from "next/link";

export function HomeCategories() {
  return (
    <div className="px-4 py-3 flex gap-3 overflow-x-auto hide-scrollbar max-w-md mx-auto w-full">
      <Link href="/buscar-trabajo?cat=servicios" className="flex items-center gap-2 bg-brand-100 hover:bg-brand-300/20 px-5 py-2.5 rounded-full border border-brand-300 transition-colors shrink-0">
        <span className="text-lg">🛠️</span>
        <span className="font-semibold text-brand-900 text-sm">Servicios</span>
      </Link>
      <Link href="/buscar-trabajo?cat=urgentes" className="flex items-center gap-2 bg-white hover:bg-brand-50 px-5 py-2.5 rounded-full border border-gray-200 transition-colors shrink-0">
        <span className="text-lg">⚡</span>
        <span className="font-semibold text-brand-900 text-sm">Urgentes</span>
      </Link>
      <Link href="/prestadores" className="flex items-center gap-2 bg-white hover:bg-brand-50 px-5 py-2.5 rounded-full border border-gray-200 transition-colors shrink-0">
        <span className="text-lg">⭐</span>
        <span className="font-semibold text-brand-900 text-sm">Destacados</span>
      </Link>
    </div>
  );
}
