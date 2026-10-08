import Link from "next/link";
import { ChevronLeft, Phone, MoreVertical } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/app/actions";
import ChatForm from "./ChatForm";

export default async function ChatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const currentUser = await getCurrentUser();
  if (!currentUser) redirect("/login");

  const targetUser = await prisma.user.findUnique({
    where: { id }
  });

  if (!targetUser) return notFound();

  // Fetch messages between the two users
  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { senderId: currentUser.id, receiverId: id },
        { senderId: id, receiverId: currentUser.id }
      ]
    },
    orderBy: { createdAt: "asc" }
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0F1C] relative overflow-hidden selection:bg-brand-500/30">
      {/* Luces de fondo (Liquid Glass Ambient) */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-500/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#10b981]/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[40%] left-[50%] w-[40%] h-[40%] bg-brand-300/10 rounded-full blur-[100px] pointer-events-none transform -translate-x-1/2"></div>

      {/* Glass Header */}
      <header className="sticky top-0 z-50 bg-[#0A0F1C]/40 backdrop-blur-xl border-b border-white/10 px-4 h-16 flex items-center justify-between shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-3">
          <Link href="javascript:history.back()" className="p-2 -ml-2 text-white/80 hover:bg-white/10 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 border border-white/20 rounded-full flex items-center justify-center font-bold text-white overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              {targetUser.image ? <img src={targetUser.image} alt="" className="w-full h-full object-cover" /> : targetUser.name?.[0] || "U"}
            </div>
            <div>
              <h1 className="font-bold text-white leading-tight">{targetUser.name}</h1>
              <p className="text-xs text-[#10b981] font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
                En línea
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2 text-white/80 hover:bg-white/10 rounded-full transition-colors"><Phone className="w-5 h-5" /></button>
          <button className="p-2 text-white/80 hover:bg-white/10 rounded-full transition-colors"><MoreVertical className="w-5 h-5" /></button>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 p-4 flex flex-col justify-end gap-5 max-w-md mx-auto w-full z-10">
        {messages.length === 0 && (
          <div className="text-center text-xs text-white/40 my-4 backdrop-blur-sm bg-white/5 py-2 px-4 rounded-full self-center border border-white/5">
            Aún no hay mensajes. ¡Escribe algo!
          </div>
        )}
        
        {messages.map((msg) => {
          const isMine = msg.senderId === currentUser.id;
          return (
            <div key={msg.id} className={`flex gap-2 w-full max-w-[85%] ${isMine ? 'self-end justify-end' : 'self-start'}`}>
              {!isMine && (
                <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex-shrink-0 flex items-center justify-center overflow-hidden shadow-[0_0_10px_rgba(255,255,255,0.05)] mt-auto">
                  {targetUser.image ? <img src={targetUser.image} alt="" className="w-full h-full object-cover" /> : <span className="text-xs font-bold text-white/80">{targetUser.name?.[0] || "U"}</span>}
                </div>
              )}
              <div className={`px-4 py-3 rounded-[24px] text-[15px] shadow-xl backdrop-blur-md border transition-all duration-300 hover:shadow-2xl ${
                isMine 
                  ? 'bg-gradient-to-br from-[#10b981]/20 to-[#047857]/40 text-white rounded-br-sm border-[#10b981]/30 shadow-[0_0_20px_rgba(16,185,129,0.15)]' 
                  : 'bg-white/10 text-white/90 rounded-bl-sm border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)]'
              }`}>
                {msg.content}
              </div>
            </div>
          );
        })}
      </main>

      <ChatForm targetUserId={targetUser.id} />
    </div>
  );
}
