import Link from "next/link";
import { ChevronLeft, Star, MapPin, CheckCircle, MessageCircle } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function PrestadoresRecomendados() {
  const providers = await prisma.user.findMany({
    where: { role: "PROVIDER" },
    include: {
      skills: true,
      reviewsReceived: true,
      servicesDone: true,
    }
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm px-4 h-16 flex items-center gap-3">
        <Link href="/" className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="font-bold text-lg text-gray-900">Nuestros Prestadores</h1>
      </header>

      <main className="px-4 py-6 flex flex-col gap-6 max-w-md mx-auto w-full pb-24">
        
        {providers.length > 0 ? (
          <>
            <div className="bg-brand-50 border border-brand-100 rounded-2xl p-4 flex gap-3">
              <div className="bg-brand-100 p-2 rounded-full h-fit">
                <CheckCircle className="w-5 h-5 text-brand-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-brand-900 mb-1">¡Hemos encontrado {providers.length} prestadores!</h3>
                <p className="text-xs text-brand-800">Conecta con los mejores profesionales en tu área.</p>
              </div>
            </div>

            {providers.map((provider) => {
              const reviewCount = provider.reviewsReceived.length;
              const avgRating = reviewCount > 0 
                ? (provider.reviewsReceived.reduce((acc, r) => acc + r.rating, 0) / reviewCount).toFixed(1)
                : "Nuevo";

              return (
                <div key={provider.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="h-24 bg-gradient-to-r from-brand-900 to-brand-700"></div>
                  <div className="px-5 pb-5">
                    <div className="flex justify-between items-end -mt-10 mb-4">
                      {provider.image ? (
                        <img src={provider.image} alt={provider.name || "Prestador"} className="w-20 h-20 rounded-full border-4 border-white object-cover bg-gray-200" />
                      ) : (
                        <div className="w-20 h-20 bg-gray-200 border-4 border-white rounded-full flex items-center justify-center font-bold text-xl text-gray-500">
                          {provider.name?.[0] || "P"}
                        </div>
                      )}
                      <div className="flex gap-1 items-center bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-100">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        Disponible
                      </div>
                    </div>
                    
                    <h2 className="text-xl font-bold text-gray-900 mb-1">{provider.name || "Prestador"}</h2>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">{provider.bio || "Profesional en servicios para el hogar."}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Star className={`w-5 h-5 ${avgRating === "Nuevo" ? "text-gray-300" : "fill-yellow-400 text-yellow-400"}`} />
                        <div>
                          <div className="font-bold text-gray-900">{avgRating}</div>
                          <div className="text-xs text-gray-500">{reviewCount} reseñas</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <div>
                          <div className="font-bold text-gray-900">{provider.servicesDone.length}</div>
                          <div className="text-xs text-gray-500">Trabajos</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {provider.skills.map(skill => (
                        <span key={skill.id} className="bg-brand-50 text-brand-700 border border-brand-100 px-3 py-1 rounded-full text-xs font-bold">
                          {skill.name}
                        </span>
                      ))}
                      {provider.skills.length === 0 && (
                         <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">Servicios generales</span>
                      )}
                    </div>

                    <div className="flex gap-3">
                      {/* Por ahora no tenemos perfil público individual, pero lo dejamos como placeholder */}
                      <button className="flex-1 bg-white border border-gray-200 text-gray-400 font-semibold py-3 rounded-xl cursor-not-allowed">
                        Ver Perfil
                      </button>
                      <button className="flex-1 bg-brand-500 hover:bg-brand-700 text-white font-semibold py-3 rounded-xl flex justify-center items-center gap-2 transition-colors">
                        <MessageCircle className="w-4 h-4" /> Contactar
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Aún no hay prestadores</h2>
            <p className="text-gray-500">Sé el primero en registrarte como prestador desde tu Perfil.</p>
          </div>
        )}

      </main>
    </div>
  );
}
