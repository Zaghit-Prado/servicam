import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, MapPin, Clock, Star, Heart, CheckCircle2 } from "lucide-react";
import FavoriteButton from "./FavoriteButton";
import { getCurrentUser } from "@/app/actions";
import ServiceLocationWrapper from "@/components/ServiceLocationWrapper";

export default async function ServicioDetalle({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const servicio = await prisma.serviceRequest.findUnique({
    where: { id },
    include: { client: true }
  });

  if (!servicio) return notFound();

  const user = await getCurrentUser();
  let isFavorited = false;
  
  if (user) {
    const existing = await prisma.user.findUnique({
      where: { id: user.id },
      select: { savedServices: { where: { id } } }
    });
    isFavorited = existing?.savedServices?.length ? existing.savedServices.length > 0 : false;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white pb-24">
      {/* Header flotante */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-4 max-w-md mx-auto pointer-events-none">
        <Link href="/" className="pointer-events-auto bg-white/90 backdrop-blur-md p-2 rounded-full shadow-sm">
          <ChevronLeft className="w-6 h-6 text-gray-900" />
        </Link>
        <div className="pointer-events-auto flex gap-2">
           <FavoriteButton serviceId={servicio.id} initialFavorited={isFavorited} />
        </div>
      </header>

      {/* Imagen (simulada o real) */}
      <div className="relative w-full aspect-square max-w-md mx-auto bg-gray-200">
        <img 
          src={(servicio.images.startsWith("http") || servicio.images.startsWith("data:image")) ? servicio.images : "https://images.unsplash.com/photo-1581092160562-40aa08e78837"} 
          alt={servicio.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
        <div className="absolute bottom-6 left-6 text-white">
           <div className="bg-blue-600 px-3 py-1 text-xs font-bold rounded-full inline-block mb-2 shadow-md">
             {servicio.category}
           </div>
           <h1 className="text-3xl font-bold leading-tight drop-shadow-md">{servicio.title}</h1>
        </div>
      </div>

      <main className="max-w-md mx-auto w-full px-6 pt-6 flex flex-col gap-8">
        
        {/* Info y Precio */}
        <div className="flex justify-between items-start border-b border-gray-100 pb-6">
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-bold text-gray-900">S/ {servicio.minPrice} - S/ {servicio.maxPrice}</span>
            <span className="text-gray-500 text-sm">Presupuesto estimado</span>
          </div>
          <div className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-bold border border-green-100">
            <CheckCircle2 className="w-4 h-4" /> Activo
          </div>
        </div>

        {/* Autor */}
        <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
           {servicio.client.image ? (
             <img src={servicio.client.image} alt={servicio.client.name || "Cliente"} className="w-12 h-12 rounded-full object-cover" />
           ) : (
             <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center font-bold text-gray-600">
               {servicio.client.name?.[0] || "C"}
             </div>
           )}
           <div>
             <p className="font-bold text-gray-900">Publicado por {servicio.client.name || "Cliente"}</p>
             <p className="text-sm text-gray-500">Miembro desde 2026</p>
           </div>
        </div>

        {/* Descripción */}
        <section>
          <h2 className="font-bold text-lg text-gray-900 mb-3">Sobre este trabajo</h2>
          <p className="text-gray-600 leading-relaxed text-sm">
            {servicio.description}
          </p>
        </section>

        {/* Detalles Rápidos */}
        <section className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-2xl flex flex-col gap-1 border border-gray-100">
            <Clock className="w-5 h-5 text-gray-400 mb-1" />
            <span className="font-bold text-gray-900 text-sm">Urgencia</span>
            <span className="text-xs text-gray-500">{servicio.urgency}</span>
          </div>
        </section>

        {/* Ubicación del Servicio */}
        <ServiceLocationWrapper latitude={servicio.latitude} longitude={servicio.longitude} />

      </main>

      {/* Footer Fijo */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-50">
        <div className="max-w-md mx-auto flex items-center gap-4">
          <button className="flex-1 bg-black text-white font-bold text-lg py-4 rounded-2xl shadow-lg hover:bg-gray-800 transition-colors">
            Postular a este trabajo
          </button>
        </div>
      </div>
    </div>
  );
}
