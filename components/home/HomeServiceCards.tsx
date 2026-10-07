import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/app/actions";

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
    take: 6,
  });

  // Fetch trabajos recientes (servicios) limitados para la primera sección
  const serviciosRecientes = await prisma.serviceRequest.findMany({
    orderBy: { createdAt: 'desc' },
    take: 6,
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
        
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
          {prestadores.map((prestador) => {
            return (
              <div key={prestador.id} className="snap-start min-w-[155px] w-[155px] sm:min-w-[170px] sm:w-[170px] relative aspect-square rounded-[32px] overflow-hidden group shadow-sm border border-gray-100 bg-gray-100">
                {prestador.image ? (
                  <img src={prestador.image || undefined} alt={prestador.name || ""} className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-105" />
                ) : (
                  <div className="absolute inset-0 z-0 bg-gradient-to-tr from-brand-500 to-brand-300"></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none"></div>
                
                <Link href={`/perfil/${prestador.id}`} className="absolute inset-0 z-20"></Link>
                
                <div className="absolute bottom-4 left-3 right-3 z-20 text-white text-center flex flex-col justify-end items-center h-full pointer-events-none">
                  <h3 className="font-bold text-[17px] drop-shadow-md leading-tight line-clamp-2">
                    {prestador.skills.length > 0 ? prestador.skills[0].name : "Servicios"}
                  </h3>
                  <p className="text-white/80 text-[12px] mt-1 line-clamp-1">{prestador.name}</p>
                </div>
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
        
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
          {serviciosRecientes.map((servicio) => (
            <div key={servicio.id} className="snap-start min-w-[155px] w-[155px] sm:min-w-[170px] sm:w-[170px] relative aspect-square rounded-[32px] overflow-hidden group shadow-sm border border-gray-100 bg-gray-100">
              {servicio.images && servicio.images.length > 5 && (servicio.images.startsWith("http") || servicio.images.startsWith("data:image")) ? (
                <img src={servicio.images} alt={servicio.title} className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-105" />
              ) : (
                <div className="absolute inset-0 z-0 bg-gradient-to-tr from-brand-900 to-brand-700"></div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none"></div>
              
              <Link href={`/servicio/${servicio.id}`} className="absolute inset-0 z-20"></Link>
              
              <div className="absolute bottom-4 left-3 right-3 z-20 text-white text-center flex flex-col justify-end items-center h-full pointer-events-none">
                <h3 className="font-bold text-[16px] drop-shadow-md leading-tight line-clamp-2 mb-2">{servicio.title}</h3>
                <div className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-lg inline-block border border-white/20">
                  <span className="font-bold text-[11px] drop-shadow-sm">S/ {servicio.minPrice}</span>
                </div>
              </div>
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
            <section key={location} className="px-4 py-2 max-w-md mx-auto w-full pb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Servicios activos en {shortLocation}</h2>
                <Link href="/buscar-trabajo" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                  <ArrowRight className="w-4 h-4 text-gray-900" />
                </Link>
              </div>
              
              <div className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
                {groupServices
                  // Shuffle services within group
                  .sort(() => Math.random() - 0.5)
                  .map((servicio: any) => (
                  <div key={servicio.id} className="snap-start min-w-[155px] w-[155px] sm:min-w-[170px] sm:w-[170px] relative aspect-square rounded-[32px] overflow-hidden group shadow-sm border border-gray-100 bg-gray-100">
                    {servicio.images && servicio.images.length > 5 && (servicio.images.startsWith("http") || servicio.images.startsWith("data:image")) ? (
                      <img src={servicio.images} alt={servicio.title} className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                      <div className="absolute inset-0 z-0 bg-gradient-to-tr from-brand-900 to-brand-700"></div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none"></div>
                    
                    <Link href={`/servicio/${servicio.id}`} className="absolute inset-0 z-20"></Link>
                    
                    <div className="absolute bottom-4 left-3 right-3 z-20 text-white text-center flex flex-col justify-end items-center h-full pointer-events-none">
                      <h3 className="font-bold text-[16px] drop-shadow-md leading-tight line-clamp-2 mb-2">{servicio.title}</h3>
                      <div className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-lg inline-block border border-white/20">
                        <span className="font-bold text-[11px] drop-shadow-sm">S/ {servicio.minPrice}</span>
                      </div>
                    </div>
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
