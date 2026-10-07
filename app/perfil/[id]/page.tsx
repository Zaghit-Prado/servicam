import Link from "next/link";
import { ChevronLeft, Star, MapPin, CheckCircle, MessageCircle, Share, Award } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/app/actions";
import { notFound } from "next/navigation";

export default async function PerfilPrestador({ params }: { params: { id: string } }) {
  const provider = await prisma.user.findUnique({
    where: { id: params.id },
    include: {
      skills: true,
      reviewsReceived: true,
      servicesDone: true
    }
  });

  if (!provider) {
    return notFound();
  }

  const currentUser = await getCurrentUser();
  const isOwnProfile = currentUser?.id === provider.id;

  const avgRating = provider.reviewsReceived.length > 0
    ? (provider.reviewsReceived.reduce((acc, rev) => acc + rev.rating, 0) / provider.reviewsReceived.length).toFixed(1)
    : "Nuevo";

  const mainSkill = provider.skills.length > 0 ? provider.skills[0].name : "Servicios Generales";

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-24">
      {/* Header flotante */}
      <header className="absolute top-0 left-0 right-0 z-50 p-4 flex justify-between items-center">
        <Link href="/" className="bg-white/80 backdrop-blur-md p-2 text-gray-800 shadow-sm rounded-full transition-colors hover:bg-white">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <button className="bg-white/80 backdrop-blur-md p-2 text-gray-800 shadow-sm rounded-full transition-colors hover:bg-white">
          <Share className="w-5 h-5" />
        </button>
      </header>

      {/* Cover y Foto */}
      <div className="h-48 bg-gradient-to-r from-brand-500 to-brand-700 relative">
        <div className="absolute -bottom-12 left-6">
          <div className="w-24 h-24 bg-gray-200 border-4 border-white rounded-full shadow-md overflow-hidden">
            {provider.image ? (
              <img src={provider.image} alt={provider.name || "Provider"} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-brand-100 flex items-center justify-center text-brand-500 font-bold text-3xl">
                {provider.name?.[0] || "U"}
              </div>
            )}
          </div>
          <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full flex justify-center items-center">
             <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
      </div>

      <main className="px-6 pt-16 max-w-md mx-auto w-full">
        {/* Info Principal */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{provider.name}</h1>
          <p className="text-gray-500 mb-3 text-sm">
            Especialista en <span className="font-semibold text-brand-600">{mainSkill}</span>
          </p>
          
          <div className="flex flex-wrap gap-4 text-sm mb-4">
            <div className="flex items-center gap-1 font-semibold text-gray-900">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              {avgRating} <span className="text-gray-500 font-normal">({provider.reviewsReceived.length} reseñas)</span>
            </div>
            {provider.reviewsReceived.length > 5 && (
              <div className="flex items-center gap-1 font-semibold text-gray-900">
                <Award className="w-4 h-4 text-brand-500" />
                Top Pro
              </div>
            )}
            <div className="flex items-center gap-1 text-gray-500">
              <MapPin className="w-4 h-4 text-gray-400" />
              Perú
            </div>
          </div>
          
          <p className="text-sm text-gray-700 leading-relaxed italic">
            {provider.bio || "Este prestador aún no ha añadido una descripción profesional a su perfil."}
          </p>
        </div>

        {/* Habilidades */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Habilidades verificadas</h2>
          {provider.skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {provider.skills.map((skill, index) => (
                <span key={skill.id} className={`px-3 py-1.5 rounded-full text-xs font-semibold flex gap-1 items-center ${index === 0 ? 'bg-brand-50 text-brand-700' : 'bg-gray-100 text-gray-700'}`}>
                  {index === 0 && <CheckCircle className="w-3 h-3" />} {skill.name}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">Sin habilidades específicas.</p>
          )}
        </div>

        {/* Galería / Trabajos */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Trabajos realizados</h2>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
            {provider.servicesDone.length > 0 ? (
              provider.servicesDone.map(svc => (
                <div key={svc.id} className="min-w-[120px] h-24 bg-brand-50 rounded-xl border border-brand-100 flex flex-col justify-center p-3">
                  <span className="text-xs font-bold text-brand-900 line-clamp-2">{svc.title}</span>
                </div>
              ))
            ) : (
              <div className="w-full p-4 bg-gray-50 rounded-xl border border-gray-100 text-center text-sm text-gray-500">
                Aún no ha completado trabajos en ServiCam
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer Fijo de Contacto */}
      {!isOwnProfile && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-50 pb-safe">
          <Link href={`/chat/${provider.id}`} className="w-full max-w-md mx-auto flex justify-center items-center gap-2 bg-brand-600 text-white font-bold text-lg py-4 rounded-2xl shadow-lg hover:bg-brand-700 transition-colors">
            <MessageCircle className="w-5 h-5" /> Enviar mensaje
          </Link>
        </div>
      )}
    </div>
  );
}
