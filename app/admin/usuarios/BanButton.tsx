"use client";

import { useTransition } from "react";
import { Ban, CheckCircle } from "lucide-react";
import { toggleBanUser } from "@/app/actions/admin";

export default function BanButton({ userId, isBanned }: { userId: string, isBanned: boolean }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button 
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await toggleBanUser(userId, !isBanned);
        });
      }}
      className={`p-2 transition-colors ${
        isBanned ? "text-green-600 hover:bg-green-50" : "text-gray-400 hover:text-red-600 hover:bg-red-50"
      } rounded-lg`}
      title={isBanned ? "Desbanear" : "Banear"}
    >
      {isBanned ? <CheckCircle className="w-5 h-5" /> : <Ban className="w-5 h-5" />}
    </button>
  );
}
