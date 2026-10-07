"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteCategory } from "@/app/actions/admin";

export default function DeleteCategoryBtn({ categoryId }: { categoryId: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button 
      disabled={isPending}
      onClick={() => {
        if(confirm("¿Eliminar categoría?")) {
          startTransition(async () => {
            await deleteCategory(categoryId);
          });
        }
      }}
      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
    >
      <Trash2 className="w-5 h-5" />
    </button>
  );
}
