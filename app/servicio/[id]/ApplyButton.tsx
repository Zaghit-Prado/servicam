"use client";

import { useState } from "react";
import { applyToService } from "./actions";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function ApplyButton({ serviceId, hasApplied, clientId }: { serviceId: string, hasApplied: boolean, clientId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (hasApplied) {
    return (
      <Link href={`/chat/${clientId}`} className="flex-1 bg-green-600 text-white flex items-center justify-center gap-2 font-bold text-lg py-4 rounded-2xl shadow-lg hover:bg-green-700 transition-colors">
        <CheckCircle className="w-5 h-5" /> Seguir coordinando
      </Link>
    );
  }

  const handleApply = async () => {
    setLoading(true);
    const res = await applyToService(serviceId);
    if (res.success) {
      router.refresh();
      router.push(`/chat/${clientId}`); // Redirigir al chat al postular
    } else {
      alert(res.error);
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleApply}
      disabled={loading}
      className={`flex-1 font-bold text-lg py-4 rounded-2xl shadow-lg transition-colors ${loading ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'}`}
    >
      {loading ? "Postulando..." : "Postular a este trabajo"}
    </button>
  );
}
