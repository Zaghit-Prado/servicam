"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function FavoritosPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-white px-6 pt-10 pb-24 max-w-md mx-auto"
    >
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Favoritos</h1>
      <p className="text-gray-500 mb-10">Tus servicios y prestadores guardados aparecerán aquí.</p>

      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Heart className="w-8 h-8 text-gray-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Aún no tienes favoritos</h2>
        <p className="text-gray-500">A medida que explores servicios, toca el ícono del corazón para guardarlos.</p>
      </div>
    </motion.div>
  );
}
