"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteServiceRequest } from "@/app/actions/admin";

export default function DeleteServiceBtn({ serviceId }: { serviceId: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button 
      disabled={isPending}
      onClick={() => {
        if(confirm("¿Estás seguro de eliminar esta publicación permanentemente?")) {
          startTransition(async () => {
            await deleteServiceRequest(serviceId);
          });
        }
      }}
      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
      title="Eliminar publicación"
    >
      <Trash2 className="w-5 h-5" />
    </button>
  );
}
