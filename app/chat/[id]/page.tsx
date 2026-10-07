import Link from "next/link";
import { ChevronLeft, Send, Phone, MoreVertical } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function ChatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const targetUser = await prisma.user.findUnique({
    where: { id }
  });

  if (!targetUser) return notFound();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 bg-white shadow-sm px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="javascript:history.back()" className="p-2 -ml-2 text-brand-900 hover:bg-brand-100 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center font-bold text-brand-700 overflow-hidden">
              {targetUser.image ? <img src={targetUser.image} alt="" className="w-full h-full object-cover" /> : targetUser.name?.[0] || "U"}
            </div>
            <div>
              <h1 className="font-bold text-gray-900 leading-tight">{targetUser.name}</h1>
              <p className="text-xs text-green-600 font-medium">En línea</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2 text-brand-900 hover:bg-brand-100 rounded-full"><Phone className="w-5 h-5" /></button>
          <button className="p-2 text-brand-900 hover:bg-brand-100 rounded-full"><MoreVertical className="w-5 h-5" /></button>
        </div>
      </header>

      <main className="flex-1 p-4 flex flex-col justify-end gap-4 max-w-md mx-auto w-full">
        <div className="text-center text-xs text-gray-400 my-4">Hoy</div>
        <div className="flex gap-2 w-full max-w-[80%]">
          <div className="w-8 h-8 rounded-full bg-brand-100 flex-shrink-0" />
          <div className="bg-white p-3 rounded-2xl rounded-tl-sm shadow-sm border border-brand-50 text-sm text-gray-800">
            Hola, acabo de ver el trabajo que publicaste o tu perfil. Me gustaría conectar contigo para hablar sobre los detalles.
          </div>
        </div>
      </main>

      <footer className="sticky bottom-0 bg-white border-t border-gray-100 p-4 pb-safe">
        <div className="max-w-md mx-auto flex items-center gap-2">
          <input 
            type="text" 
            placeholder="Escribe un mensaje..." 
            className="flex-1 bg-gray-100 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <button className="w-12 h-12 bg-brand-600 rounded-full flex items-center justify-center text-white flex-shrink-0 hover:bg-brand-700 transition-colors shadow-md">
            <Send className="w-5 h-5 ml-1" />
          </button>
        </div>
      </footer>
    </div>
  );
}
