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
        {messages.length === 0 && (
          <div className="text-center text-xs text-gray-400 my-4">Aún no hay mensajes. ¡Escribe algo!</div>
        )}
        
        {messages.map((msg) => {
          const isMine = msg.senderId === currentUser.id;
          return (
            <div key={msg.id} className={`flex gap-2 w-full max-w-[80%] ${isMine ? 'self-end justify-end' : 'self-start'}`}>
              {!isMine && (
                <div className="w-8 h-8 rounded-full bg-brand-100 flex-shrink-0 flex items-center justify-center overflow-hidden">
                  {targetUser.image ? <img src={targetUser.image} alt="" className="w-full h-full object-cover" /> : <span className="text-xs font-bold text-brand-700">{targetUser.name?.[0] || "U"}</span>}
                </div>
              )}
              <div className={`p-3 rounded-2xl text-sm shadow-sm border ${
                isMine 
                  ? 'bg-brand-600 text-white rounded-tr-sm border-brand-700' 
                  : 'bg-white text-gray-800 rounded-tl-sm border-brand-50'
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
