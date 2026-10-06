"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Camera, ImagePlus, ChevronLeft, MapPin, X } from "lucide-react";
import { publishService } from "@/app/actions";
import { useRouter } from "next/navigation";

const LocationPickerMap = dynamic(() => import('@/components/LocationPickerMap'), { 
  ssr: false,
  loading: () => <div className="w-full h-[300px] bg-gray-100 rounded-2xl flex items-center justify-center text-gray-500 text-sm font-semibold border border-brand-200">Cargando mapa...</div>
});

export default function PublicarServicio() {
  const router = useRouter();
  const [categoria, setCategoria] = useState("Reparaciones");
  const [urgency, setUrgency] = useState("NORMAL");
  const [image64, setImage64] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const categorias = ["Gasfitería", "Electricidad", "Carpintería", "Armado de Muebles", "Reparaciones", "Pintura"];
  const urgencias = [
    { id: "URGENT", label: "Lo antes posible", emoji: "🔥" },
    { id: "NORMAL", label: "En los próximos días", emoji: "📅" },
    { id: "LOW", label: "Flexible", emoji: "⏳" }
  ];

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_SIZE = 500; // Reducido para evitar errores 413 Payload Too Large
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL("image/jpeg", 0.5); // Compresión al 50%
          setImage64(dataUrl);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        await publishService(formData);
        router.push("/");
      } catch (err) {
        console.error(err);
        alert("Ocurrió un error al publicar. Es posible que tu sesión haya expirado o la imagen sea muy grande.");
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white pb-32">
      {/* Header Secundario */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-brand-100 px-4 h-16 flex items-center gap-3">
        <Link href="/" className="p-2 -ml-2 text-brand-900 hover:bg-brand-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="font-bold text-lg text-brand-900">Publicar un servicio</h1>
      </header>

      <form onSubmit={handleSubmit} className="px-6 pt-6 flex flex-col gap-8 max-w-md mx-auto w-full">
        {/* Campos ocultos */}
        <input type="hidden" name="category" value={categoria} />
        <input type="hidden" name="urgency" value={urgency} />
        <input type="hidden" name="images" value={image64} />
        {latitude && <input type="hidden" name="latitude" value={latitude} />}
        {longitude && <input type="hidden" name="longitude" value={longitude} />}
        
        {/* Fotos */}
        <section>
          <h2 className="text-sm font-bold text-brand-900 mb-3">Añade una foto del problema (opcional)</h2>
          
          {image64 ? (
            <div className="relative w-full aspect-video bg-gray-100 rounded-2xl overflow-hidden border border-brand-200">
              <img src={image64} alt="Problema" className="w-full h-full object-cover" />
              <button 
                type="button" 
                onClick={() => setImage64("")} 
                className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <label className="flex-1 flex flex-col items-center justify-center gap-2 bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-2xl py-6 cursor-pointer transition-colors">
                <Camera className="w-8 h-8 text-brand-500" />
                <span className="font-semibold text-brand-900 text-sm">Tomar foto</span>
                <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleImage} />
              </label>
              
              <label className="flex-1 flex flex-col items-center justify-center gap-2 bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-2xl py-6 cursor-pointer transition-colors">
                <ImagePlus className="w-8 h-8 text-brand-500" />
                <span className="font-semibold text-brand-900 text-sm">Subir imagen</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
              </label>
            </div>
          )}
        </section>

        {/* Título Breve */}
        <section>
          <h2 className="text-sm font-bold text-brand-900 mb-3">Título breve de tu problema</h2>
          <input
            type="text"
            name="title"
            required
            className="w-full bg-white border border-brand-200 rounded-2xl p-4 text-gray-900 focus:ring-2 focus:ring-brand-500 focus:outline-none shadow-sm"
            placeholder="Ej: Fuga de agua debajo del lavadero"
          />
        </section>

        {/* Categoría */}
        <section>
          <h2 className="text-sm font-bold text-brand-900 mb-3">¿Qué tipo de ayuda necesitas?</h2>
          <div className="flex flex-wrap gap-2">
            {categorias.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setCategoria(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors border ${
                  categoria === cat 
                    ? "bg-brand-900 border-brand-900 text-white shadow-md" 
                    : "bg-white border-brand-200 text-brand-900 hover:bg-brand-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Urgencia */}
        <section>
          <h2 className="text-sm font-bold text-brand-900 mb-3">¿Qué tan urgente es?</h2>
          <div className="flex flex-col gap-2">
            {urgencias.map((urg) => (
              <button
                type="button"
                key={urg.id}
                onClick={() => setUrgency(urg.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors border ${
                  urgency === urg.id
                    ? "bg-brand-100 border-brand-500 text-brand-900"
                    : "bg-white border-brand-200 text-gray-600 hover:bg-brand-50"
                }`}
              >
                <span className="text-xl">{urg.emoji}</span>
                <span>{urg.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Descripción */}
        <section>
          <h2 className="text-sm font-bold text-brand-900 mb-3">Describe el problema</h2>
          <textarea
            name="description"
            required
            rows={4}
            className="w-full bg-white border border-brand-200 rounded-2xl p-4 text-gray-900 focus:ring-2 focus:ring-brand-500 focus:outline-none resize-none shadow-sm"
            placeholder="Da detalles útiles para el prestador..."
          ></textarea>
        </section>

        {/* Presupuesto */}
        <section>
          <h2 className="text-sm font-bold text-brand-900 mb-3">Presupuesto estimado (Soles)</h2>
          <div className="flex items-center gap-3">
            <input
              type="number"
              name="minPrice"
              required
              placeholder="Mínimo"
              className="w-1/2 bg-white border border-brand-200 rounded-xl p-3 text-gray-900 focus:ring-2 focus:ring-brand-500 focus:outline-none shadow-sm"
            />
            <span className="text-gray-400 font-bold">-</span>
            <input
              type="number"
              name="maxPrice"
              required
              placeholder="Máximo"
              className="w-1/2 bg-white border border-brand-200 rounded-xl p-3 text-gray-900 focus:ring-2 focus:ring-brand-500 focus:outline-none shadow-sm"
            />
          </div>
        </section>

        {/* Ubicación Visual */}
        <section>
          <h2 className="text-sm font-bold text-brand-900 mb-3">Ubicación exacta</h2>
          <p className="text-xs text-gray-500 mb-3">Toca el mapa para indicar dónde necesitas el servicio. La ubicación exacta solo la verá el prestador contratado; los demás verán un área aproximada.</p>
          
          <LocationPickerMap 
            onLocationChange={(lat, lng) => {
              setLatitude(lat);
              setLongitude(lng);
            }} 
          />
        </section>

        {/* Footer Fixed Action Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-50 shadow-[0_-10px_20px_rgb(0,0,0,0.05)]">
          <button 
            type="submit" 
            disabled={isPending || !latitude || !longitude}
            className="w-full max-w-md mx-auto block bg-brand-500 text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:bg-brand-700 transition-colors disabled:opacity-50"
          >
            {isPending ? "Publicando..." : (!latitude ? "Falta ubicación" : "Publicar Solicitud")}
          </button>
        </div>
      </form>
    </div>
  );
}
