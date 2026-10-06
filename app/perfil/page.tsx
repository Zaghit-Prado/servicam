"use client";

import { motion } from "framer-motion";
import { UserCircle, Settings, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function MiPerfilPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gray-50 pb-24"
    >
      <div className="bg-white px-6 pt-10 pb-6 shadow-sm mb-2 max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Tu Perfil</h1>
        
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
             <UserCircle className="w-10 h-10 text-gray-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Usuario Invitado</h2>
            <Link href="/login" className="text-blue-600 font-semibold text-sm hover:underline">Inicia sesión o regístrate</Link>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto bg-white px-4 py-2 shadow-sm">
        <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
          <div className="flex items-center gap-3">
            <Settings className="w-6 h-6 text-gray-700" />
            <span className="font-medium text-gray-900">Configuración</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
        <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-gray-700" />
            <span className="font-medium text-gray-900">Ayuda y soporte</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
        <div className="h-px bg-gray-100 my-2"></div>
        <Link href="/login" className="w-full flex items-center justify-between p-4 hover:bg-red-50 rounded-xl transition-colors text-red-600">
          <div className="flex items-center gap-3">
            <LogOut className="w-6 h-6" />
            <span className="font-medium">Cerrar sesión</span>
          </div>
        </Link>
      </div>
    </motion.div>
  );
}
