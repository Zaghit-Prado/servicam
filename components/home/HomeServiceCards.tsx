import Link from "next/link";
import { Heart, Star, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/app/actions";
import FavoriteButton from "@/app/servicio/[id]/FavoriteButton";

export async function HomeServiceCards() {
  const user = await getCurrentUser();
  let savedServiceIds = new Set<string>();

  if (user) {
    const userWithSaved = await prisma.user.findUnique({
      where: { id: user.id },
      select: { savedServices: { select: { id: true } } }
    });
    if (userWithSaved) {
      savedServiceIds = new Set(userWithSaved.savedServices.map(s => s.id));
    }
  }

  // Fetch prestadores (proveedores) and sus reviews
  const prestadores = await prisma.user.findMany({
    where: { role: "PROVIDER" },
    include: {
      skills: true,
      reviewsReceived: true,
    },
    take: 4,
  });

  // Fetch trabajos recientes (servicios) limitados para la primera sección
  const serviciosRecientes = await prisma.serviceRequest.findMany({
    orderBy: { createdAt: 'desc' },
    take: 4,
  });

  // Fetch todos los servicios para agrupar
  const todosLosServicios = await prisma.serviceRequest.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { createdAt: 'desc' },
  });

  // Agrupar por locationName
  const groupedServices = todosLosServicios.reduce((acc: any, servicio) => {
    // Extraer distrito o usar 'Otras zonas'
    const loc = servicio.locationName || 'Otras zonas';
    if (!acc[loc]) acc[loc] = [];
    acc[loc].push(servicio);
    return acc;
  }, {});

  return (
    <>
      {/* Section 1: Servicios populares */}
      <section className="px-4 py-6 max-w-md mx-auto w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Prestadores cerca de ti</h2>
          <Link href="/prestadores" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
            <ArrowRight className="w-4 h-4 text-gray-900" />
          </Link>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-6 snap-x hide-scrollbar">
          {prestadores.map((prestador) => {
            const avgRating = prestador.reviewsReceived.length > 0
              ? (prestador.reviewsReceived.reduce((acc, rev) => acc + rev.rating, 0) / prestador.reviewsReceived.length).toFixed(1)
              : "Nuevo";

            return (
              <div key={prestador.id} className="snap-start min-w-[280px] w-[280px] sm:min-w-[300px] flex flex-col gap-3 group">
                <div className="relative aspect-[4/4] sm:aspect-[4/3] w-full rounded-[24px] overflow-hidden bg-gray-100">
                  {prestador.image ? (
                    <img src={prestador.image || undefined} alt={prestador.name || ""} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-500 to-brand-300"></div>
                  )}
                  <Link href={`/perfil/${prestador.id}`} className="absolute inset-0 z-10"></Link>
                  
                  <div className="absolute top-4 right-4 z-20">
                    <button className="p-0 hover:scale-110 transition-transform">
                      <Heart className="w-[26px] h-[26px] text-white stroke-[2px] drop-shadow-md hover:fill-red-500 hover:text-red-500 transition-colors" />
                    </button>
                  </div>
                  
                  {prestador.reviewsReceived.length > 0 && (
                    <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm pointer-events-none">
                      <p className="text-[13px] font-bold text-gray-900 leading-tight">Favorito entre<br/>clientes</p>
                    </div>
                  )}
                </div>
                
                <Link href={`/perfil/${prestador.id}`} className="block px-1">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-medium text-[16px] text-gray-900 leading-snug line-clamp-1">
                      {prestador.skills.length > 0 ? prestador.skills[0].name : "Servicios Generales"}
                    </h3>
                    <div className="flex items-center gap-1 text-[15px] shrink-0 mt-0.5">
                      <Star className="w-3.5 h-3.5 fill-gray-900 text-gray-900" />
                      <span className="text-gray-800">{avgRating}</span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-[15px] mt-0.5 line-clamp-1 text-ellipsis">{prestador.name}</p>
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 2: Trabajos recientes */}
      <section className="px-4 py-2 max-w-md mx-auto w-full pb-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Trabajos recientes</h2>
          <Link href="/buscar-trabajo" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
            <ArrowRight className="w-4 h-4 text-gray-900" />
          </Link>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-6 snap-x hide-scrollbar">
          {serviciosRecientes.map((servicio) => (
            <div key={servicio.id} className="snap-start min-w-[280px] w-[280px] sm:min-w-[300px] flex flex-col gap-3 group">
              <div className="relative aspect-[4/4] sm:aspect-[4/3] w-full rounded-[24px] overflow-hidden bg-gray-100">
                {servicio.images && servicio.images.length > 5 && (servicio.images.startsWith("http") || servicio.images.startsWith("data:image")) ? (
                  <img src={servicio.images} alt={servicio.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-900 to-brand-700"></div>
                )}
                <Link href={`/servicio/${servicio.id}`} className="absolute inset-0 z-10"></Link>
                
                <div className="absolute top-4 right-4 z-20">
                  <FavoriteButton serviceId={servicio.id} initialFavorited={savedServiceIds.has(servicio.id)} variant="card" />
                </div>
              </div>
              
              <Link href={`/servicio/${servicio.id}`} className="block px-1">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-medium text-[16px] text-gray-900 leading-snug line-clamp-1">{servicio.title}</h3>
                </div>
                <p className="text-gray-500 text-[15px] mt-0.5 line-clamp-1">S/ {servicio.minPrice} - S/ {servicio.maxPrice} • Presupuesto</p>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Mid Categories */}
      <section className="px-4 py-6 max-w-md mx-auto w-full">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Descubre categorías</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
          
          <Link href="/buscar-trabajo?cat=Automotriz" className="snap-start min-w-[140px] h-[120px] bg-[#f7f7f7] hover:bg-[#f0f0f0] rounded-3xl flex flex-col items-center justify-center gap-2 transition-colors border border-transparent hover:border-gray-200">
            <span className="text-5xl drop-shadow-md">🚗</span>
            <span className="font-bold text-gray-900 text-sm">Automotriz</span>
          </Link>
          
          <Link href="/buscar-trabajo?cat=Fotografía" className="snap-start min-w-[140px] h-[120px] bg-[#f7f7f7] hover:bg-[#f0f0f0] rounded-3xl flex flex-col items-center justify-center gap-2 transition-colors border border-transparent hover:border-gray-200">
            <span className="text-5xl drop-shadow-md">📷</span>
            <span className="font-bold text-gray-900 text-sm">Fotografía</span>
          </Link>

          <Link href="/buscar-trabajo?cat=Cocina" className="snap-start min-w-[140px] h-[120px] bg-[#f7f7f7] hover:bg-[#f0f0f0] rounded-3xl flex flex-col items-center justify-center gap-2 transition-colors border border-transparent hover:border-gray-200">
            <span className="text-5xl drop-shadow-md">🔪</span>
            <span className="font-bold text-gray-900 text-sm">Cocina</span>
          </Link>

          <Link href="/buscar-trabajo?cat=Reparaciones" className="snap-start min-w-[140px] h-[120px] bg-[#f7f7f7] hover:bg-[#f0f0f0] rounded-3xl flex flex-col items-center justify-center gap-2 transition-colors border border-transparent hover:border-gray-200">
            <span className="text-5xl drop-shadow-md">🔧</span>
            <span className="font-bold text-gray-900 text-sm">Reparaciones</span>
          </Link>
          
        </div>
      </section>

      {/* Dynamic Location Carousels */}
      {(Object.entries(groupedServices) as [string, any[]][])
        // Shuffle groups
        .sort(() => Math.random() - 0.5)
        .map(([location, groupServices]) => {
          if (groupServices.length === 0) return null;
          // Extract just the main city/district name for a cleaner title
          const shortLocation = location.split(",")[0] || "Otras zonas";
          
          return (
            <section key={location} className="px-4 py-4 max-w-md mx-auto w-full pb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Alojamientos populares en {shortLocation}</h2>
                <Link href="/buscar-trabajo" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                  <ArrowRight className="w-4 h-4 text-gray-900" />
                </Link>
              </div>
              
              <div className="flex gap-4 overflow-x-auto pb-6 snap-x hide-scrollbar">
                {groupServices
                  // Shuffle services within group
                  .sort(() => Math.random() - 0.5)
                  .map((servicio: any) => (
                  <div key={servicio.id} className="snap-start min-w-[280px] w-[280px] sm:min-w-[300px] flex flex-col gap-3 group">
                    <div className="relative aspect-[4/4] sm:aspect-[4/3] w-full rounded-[24px] overflow-hidden bg-gray-100">
                      {servicio.images && servicio.images.length > 5 && (servicio.images.startsWith("http") || servicio.images.startsWith("data:image")) ? (
                        <img src={servicio.images} alt={servicio.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-tr from-brand-900 to-brand-700"></div>
                      )}
                      <Link href={`/servicio/${servicio.id}`} className="absolute inset-0 z-10"></Link>
                      
                      <div className="absolute top-4 right-4 z-20">
                        <FavoriteButton serviceId={servicio.id} initialFavorited={savedServiceIds.has(servicio.id)} variant="card" />
                      </div>
                      
                      {/* Simulación del "Favorito entre huéspedes" de Airbnb */}
                      <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm pointer-events-none">
                        <p className="text-[13px] font-bold text-gray-900 leading-tight">Favorito entre<br/>clientes</p>
                      </div>
                    </div>
                    
                    <Link href={`/servicio/${servicio.id}`} className="block px-1">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-medium text-[16px] text-gray-900 leading-snug line-clamp-1">{servicio.title}</h3>
                        <div className="flex items-center gap-1 text-[15px] shrink-0 mt-0.5">
                          <Star className="w-3.5 h-3.5 fill-gray-900 text-gray-900" />
                          <span className="text-gray-800">4.95</span>
                        </div>
                      </div>
                      <p className="text-gray-500 text-[15px] mt-0.5 line-clamp-1">S/ {servicio.minPrice} - S/ {servicio.maxPrice} • Presupuesto</p>
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          );
      })}
      {/* Spacer para el FAB */}
      <div className="h-12 w-full"></div>
    </>
  );
}
