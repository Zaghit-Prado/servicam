"use client";

import { useState } from "react";
import { Send, Image as ImageIcon, Paperclip } from "lucide-react";
import { sendMessage } from "./actions";

export default function ChatForm({ targetUserId }: { targetUserId: string }) {
  const [content, setContent] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isSending) return;

    setIsSending(true);
    const result = await sendMessage(targetUserId, content);
    if (result.success) {
      setContent("");
    }
    setIsSending(false);
  };

  return (
    <footer className="sticky bottom-0 bg-[#0A0F1C]/60 backdrop-blur-xl border-t border-white/10 p-4 pb-safe z-40">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto flex items-end gap-2">
        <div className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl flex items-center shadow-[0_4px_30px_rgba(0,0,0,0.1)] px-1 py-1 focus-within:border-[#10b981]/50 focus-within:bg-white/10 transition-colors">
          <button type="button" className="p-2.5 text-white/50 hover:text-white/90 transition-colors">
            <Paperclip className="w-5 h-5" />
          </button>
          
          <input 
            type="text" 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Escribe un mensaje..." 
            className="flex-1 bg-transparent px-2 py-2.5 text-[15px] text-white placeholder-white/40 focus:outline-none"
            disabled={isSending}
            autoComplete="off"
          />
          
          <button type="button" className="p-2.5 text-white/50 hover:text-white/90 transition-colors mr-1">
            <ImageIcon className="w-5 h-5" />
          </button>
        </div>
        
        <button 
          type="submit"
          disabled={!content.trim() || isSending}
          className="w-[52px] h-[52px] rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.2)] disabled:opacity-50 disabled:shadow-none bg-gradient-to-tr from-[#10b981] to-[#059669] text-white hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]"
        >
          <Send className="w-5 h-5 ml-0.5" />
        </button>
      </form>
    </footer>
  );
}
