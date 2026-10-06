import { getCurrentUser } from "@/app/actions";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ChevronLeft, ArrowRight, MapPin } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function FavoritosPage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Tus Favoritos</h1>
        <p className="text-gray-500 mb-6">Inicia sesión para ver y guardar trabajos que te interesan.</p>
        <Link href="/login" className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full">
          Iniciar Sesión
        </Link>
      </div>
    );
  }

  const userData = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      savedServices: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  const favorites = userData?.savedServices || [];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-24">
      <header className="bg-white px-4 py-4 flex items-center border-b border-gray-100 shadow-sm sticky top-0 z-10">
        <h1 className="font-bold text-xl text-gray-900 mx-auto">Favoritos</h1>
      </header>

      <main className="px-4 py-6 flex flex-col gap-4 max-w-md mx-auto w-full">
        {favorites.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">💔</span>
            </div>
            <h2 className="text-lg font-bold text-gray-900">Aún no tienes favoritos</h2>
            <p className="text-gray-500 text-sm mt-2 mb-6">Los trabajos que marques con el corazón aparecerán aquí.</p>
            <Link href="/buscar-trabajo" className="text-blue-600 font-bold hover:underline">
              Explorar trabajos
            </Link>
          </div>
        ) : (
          favorites.map((servicio) => (
            <div key={servicio.id} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                  {servicio.category}
                </div>
                <span className="font-bold text-gray-900">S/ {servicio.minPrice} - {servicio.maxPrice}</span>
              </div>
              <h3 className="font-bold text-lg text-gray-900">{servicio.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">{servicio.description}</p>
              <Link href={`/servicio/${servicio.id}`} className="mt-2 w-full bg-gray-50 hover:bg-gray-100 text-gray-900 font-semibold py-3 rounded-xl flex justify-center items-center gap-2 transition-colors">
                Ver detalles <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))
        )}
      </main>
    </div>
  );
}
