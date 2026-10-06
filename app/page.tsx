import Link from "next/link";
import { HomeSearchPill } from "@/components/home/HomeSearchPill";
import { HomeCategories } from "@/components/home/HomeCategories";
import { HomeServiceCards } from "@/components/home/HomeServiceCards";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <HomeSearchPill />
      <HomeCategories />
      <HomeServiceCards />

      {/* Botón Flotante para Publicar (adicional al Navbar inferior) */}
      <div className="fixed bottom-20 right-6 z-40">
        <Link 
          href="/publicar" 
          className="bg-gray-900 text-white px-5 py-3 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-800 transition-transform hover:scale-105"
        >
          <div className="flex gap-2 items-center font-bold text-sm">
            <span className="text-lg">+</span>
            Publicar
          </div>
        </Link>
      </div>
    </div>
  );
}
