"use client";

import { useState, useTransition } from "react";
import { loginAdmin } from "@/app/actions/adminAuth";
import { useRouter } from "next/navigation";
import { Shield } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      const res = await loginAdmin(formData);
      if (res.error) {
        setError(res.error);
      } else {
        router.push("/admin");
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#1a1625] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-brand-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">ServiAdmin</h1>
          <p className="text-gray-500 text-sm mt-1">Acceso restringido</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Contraseña de Administrador</label>
            <input 
              type="password" 
              name="password"
              required
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900 focus:ring-2 focus:ring-brand-500 outline-none"
              placeholder="••••••••"
            />
          </div>
          
          {error && (
            <p className="text-red-500 text-sm font-medium">{error}</p>
          )}

          <button 
            type="submit"
            disabled={isPending}
            className="w-full bg-brand-600 text-white font-bold py-4 rounded-xl mt-4 hover:bg-brand-700 transition-colors disabled:opacity-50"
          >
            {isPending ? "Verificando..." : "Entrar al Panel"}
          </button>
        </form>
      </div>
    </div>
  );
}
