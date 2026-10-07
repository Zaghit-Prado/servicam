"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, Briefcase, Camera, X, Check } from "lucide-react";
import { becomeProvider } from "@/app/actions";

export default function HaztePrestador() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [image64, setImage64] = useState("");
  const [bio, setBio] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const skillOptions = [
    "Gasfitería", "Electricidad", "Carpintería", "Instalación de focos",
    "Armado de muebles", "Reparaciones", "Pintura", "Mantenimiento", "Obras varias"
  ];

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_SIZE = 400;
          let width = img.width;
          let height = img.height;
          if (width > height) {
            if (width > MAX_SIZE) { height *= MAX_SIZE / width; width = MAX_SIZE; }
          } else {
            if (height > MAX_SIZE) { width *= MAX_SIZE / height; height = MAX_SIZE; }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);
          setImage64(canvas.toDataURL("image/jpeg", 0.8));
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSkills.length === 0) {
      alert("Por favor selecciona al menos una especialidad.");
      return;
    }
    
    startTransition(async () => {
      try {
        await becomeProvider({ bio, skills: selectedSkills, image: image64 });
        router.push("/perfil");
      } catch (err) {
        alert("Ocurrió un error al guardar tu perfil.");
        console.error(err);
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-32">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-brand-100 px-4 h-16 flex items-center gap-3 shadow-sm">
        <Link href="/perfil" className="p-2 -ml-2 text-brand-900 hover:bg-brand-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="font-bold text-lg text-brand-900">Perfil Profesional</h1>
      </header>

      <form onSubmit={handleSubmit} className="px-6 pt-6 flex flex-col gap-8 max-w-md mx-auto w-full">
        
        {/* Encabezado */}
        <div className="text-center">
          <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8 text-brand-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Conviértete en Prestador</h2>
          <p className="text-sm text-gray-500">
            Ofrece tus servicios, conecta con clientes y comienza a trabajar. Completa tu perfil profesional.
          </p>
        </div>

        {/* Foto */}
        <section className="flex flex-col items-center">
          <div className="relative w-32 h-32 rounded-full bg-gray-200 border-4 border-white shadow-md overflow-hidden mb-3">
            {image64 ? (
              <img src={image64} alt="Tu foto" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-brand-50 text-brand-500">
                <Camera className="w-8 h-8 mb-1" />
                <span className="text-xs font-bold">Foto</span>
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleImage} className="absolute inset-0 opacity-0 cursor-pointer" />
          </div>
          <p className="text-xs text-gray-500 text-center">Toca para subir una foto real tuya.<br/>Los clientes confían más en perfiles con foto.</p>
        </section>

        {/* Bio */}
        <section>
          <h3 className="text-sm font-bold text-gray-900 mb-3">Descripción profesional</h3>
          <textarea
            value={bio}
            onChange={e => setBio(e.target.value)}
            required
            rows={4}
            className="w-full bg-white border border-gray-200 rounded-2xl p-4 text-gray-900 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none resize-none shadow-sm"
            placeholder="Ej: Soy Juan, tengo más de 10 años de experiencia en electricidad y trabajos generales del hogar..."
          ></textarea>
        </section>

        {/* Skills */}
        <section>
          <h3 className="text-sm font-bold text-gray-900 mb-1">Especialidades</h3>
          <p className="text-xs text-gray-500 mb-4">Selecciona los servicios que sabes realizar.</p>
          
          <div className="flex flex-wrap gap-2">
            {skillOptions.map(skill => {
              const isSelected = selectedSkills.includes(skill);
              return (
                <button
                  key={skill}
                  type="button"
                  onClick={() => toggleSkill(skill)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-colors border ${
                    isSelected 
                      ? "bg-brand-900 border-brand-900 text-white shadow-md" 
                      : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {isSelected && <Check className="w-4 h-4" />}
                  {skill}
                </button>
              );
            })}
          </div>
        </section>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-50 shadow-[0_-10px_20px_rgb(0,0,0,0.05)]">
          <button 
            type="submit" 
            disabled={isPending}
            className="w-full max-w-md mx-auto block bg-brand-500 text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:bg-brand-700 transition-colors disabled:opacity-50"
          >
            {isPending ? "Guardando perfil..." : "Activar modo Prestador"}
          </button>
        </div>
      </form>
    </div>
  );
}
