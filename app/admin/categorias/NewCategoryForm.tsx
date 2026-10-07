"use client";

import { useTransition } from "react";
import { createCategory } from "@/app/actions/admin";

export default function NewCategoryForm() {
  const [isPending, startTransition] = useTransition();

  return (
    <form action={(formData) => {
      startTransition(async () => {
        await createCategory(formData);
      });
    }} className="flex flex-col gap-3">
      <input 
        name="name" 
        required 
        placeholder="Nombre (ej. Gasfitería)" 
        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
      />
      <input 
        name="icon" 
        placeholder="Emoji (ej. 🔧)" 
        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
      />
      <button 
        disabled={isPending}
        className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50 mt-2"
      >
        {isPending ? "Guardando..." : "Crear Categoría"}
      </button>
    </form>
  );
}
