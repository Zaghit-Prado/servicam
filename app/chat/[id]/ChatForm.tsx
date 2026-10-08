"use client";

import { useState } from "react";
import { Send } from "lucide-react";
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
    <footer className="sticky bottom-0 bg-white border-t border-gray-100 p-4 pb-safe">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto flex items-center gap-2">
        <input 
          type="text" 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Escribe un mensaje..." 
          className="flex-1 bg-gray-100 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          disabled={isSending}
        />
        <button 
          type="submit"
          disabled={!content.trim() || isSending}
          className="w-12 h-12 bg-brand-600 rounded-full flex items-center justify-center text-white flex-shrink-0 hover:bg-brand-700 transition-colors shadow-md disabled:opacity-50"
        >
          <Send className="w-5 h-5 ml-1" />
        </button>
      </form>
    </footer>
  );
}
