import Link from "next/link";
import { Heart, Star, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";

export async function HomeServiceCards() {
  // Fetch prestadores (proveedores) and sus reviews
  const prestadores = await prisma.user.findMany({
    where: { role: "PROVIDER" },
    include: {
      skills: true,
      reviewsReceived: true,
    },
    take: 4,
  });

  // Fetch trabajos recientes (servicios)
  const serviciosRecientes = await prisma.serviceRequest.findMany({
    orderBy: { createdAt: 'desc' },
    take: 4,
  });

  return (
    <>
      {/* Section 1: Servicios populares */}
      <section className="px-4 py-6 max-w-md mx-auto w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Prestadores cerca de ti</h2>
          <Link href="/prestadores" className="p-1.5 bg-gray-100 rounded-full hover:bg-gray-200">
            <ArrowRight className="w-5 h-5 text-gray-600" />
          </Link>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
          {prestadores.map((prestador) => {
            const avgRating = prestador.reviewsReceived.length > 0
              ? (prestador.reviewsReceived.reduce((acc, rev) => acc + rev.rating, 0) / prestador.reviewsReceived.length).toFixed(1)
              : "Nuevo";

            return (
              <div key={prestador.id} className="snap-start min-w-[280px] flex flex-col gap-3">
                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-gray-200 group block">
                  {prestador.image ? (
                    <img src={prestador.image || undefined} alt={prestador.name || ""} className="absolute inset-0 w-full h-full object-cover z-0" />
                  ) : (
                    <div className="absolute inset-0 z-0 bg-gradient-to-tr from-blue-600 to-cyan-500"></div>
                  )}
                  <Link href={`/perfil/${prestador.id}`} className="absolute inset-0 z-10"></Link>
                  <div className="absolute top-3 right-3 z-20">
                    <button className="p-1">
                      <Heart className="w-6 h-6 text-white stroke-[1.5px] drop-shadow-md hover:fill-red-500 hover:text-red-500 transition-colors" />
                    </button>
                  </div>
                  {prestador.reviewsReceived.length > 5 && (
                    <div className="absolute top-3 left-3 z-20 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-gray-900 shadow-sm pointer-events-none">
                      Favorito de clientes
                    </div>
                  )}
                </div>
                <Link href={`/perfil/${prestador.id}`} className="block">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-900 text-base">
                      {prestador.skills.length > 0 ? prestador.skills[0].name : "Servicios Generales"}
                    </h3>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 fill-gray-900 text-gray-900" />
                      <span>{avgRating}</span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm">{prestador.name}</p>
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 2: Trabajos recientes */}
      <section className="px-4 py-2 max-w-md mx-auto w-full pb-24">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Trabajos recientes publicados</h2>
          <Link href="/buscar-trabajo" className="p-1.5 bg-gray-100 rounded-full hover:bg-gray-200">
            <ArrowRight className="w-5 h-5 text-gray-600" />
          </Link>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
          {serviciosRecientes.map((servicio) => (
            <div key={servicio.id} className="snap-start min-w-[280px] flex flex-col gap-3">
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-gray-200 group block">
                {servicio.images && servicio.images.length > 5 && servicio.images.startsWith("http") ? (
                  <img src={servicio.images} alt={servicio.title} className="absolute inset-0 w-full h-full object-cover z-0" />
                ) : (
                  <div className="absolute inset-0 z-0 bg-gradient-to-tr from-green-500 to-emerald-400"></div>
                )}
                <Link href={`/servicio/${servicio.id}`} className="absolute inset-0 z-10"></Link>
                <div className="absolute top-3 right-3 z-20">
                  {/* Este botón no lo conecto aquí al Server Action de Favoritos por simplicidad, pero se puede luego. */}
                  <button className="p-1">
                    <Heart className="w-6 h-6 text-white stroke-[1.5px] drop-shadow-md hover:fill-red-500 hover:text-red-500 transition-colors" />
                  </button>
                </div>
              </div>
              <Link href={`/servicio/${servicio.id}`} className="block">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-900 text-base">{servicio.title}</h3>
                </div>
                <p className="text-gray-500 text-sm line-clamp-1">{servicio.description}</p>
                <p className="text-gray-900 mt-1"><span className="font-semibold">S/ {servicio.minPrice} - S/ {servicio.maxPrice}</span> presupuesto</p>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
