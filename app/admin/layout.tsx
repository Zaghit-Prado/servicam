import { checkAdmin, logoutAdmin } from "@/app/actions/adminAuth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Users, AlertTriangle, MessageSquare, Settings, LogOut, ArrowLeft } from "lucide-react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const isAdmin = await checkAdmin();
  
  if (!isAdmin) {
    redirect("/admin-login");
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar Desktop */}
      <aside className="w-64 bg-[#1a1625] text-white flex-shrink-0 hidden md:flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-brand-500">Servi</span>Admin
          </h1>
          <p className="text-gray-400 text-xs mt-1">Panel de Control</p>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors">
            <LayoutDashboard className="w-5 h-5 text-gray-400" /> Dashboard
          </Link>
          <Link href="/admin/usuarios" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors">
            <Users className="w-5 h-5 text-gray-400" /> Usuarios
          </Link>
          <Link href="/admin/servicios" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors">
            <AlertTriangle className="w-5 h-5 text-gray-400" /> Moderación
          </Link>
          <Link href="/admin/categorias" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors">
            <Settings className="w-5 h-5 text-gray-400" /> Categorías
          </Link>
          <Link href="/admin/soporte" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors">
            <MessageSquare className="w-5 h-5 text-gray-400" /> Soporte
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10">
          <form action={logoutAdmin}>
            <button type="submit" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-red-400 transition-colors">
              <LogOut className="w-5 h-5" /> Salir del Panel
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto w-full relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-[#1a1625] p-4 flex justify-between items-center text-white sticky top-0 z-50">
          <h1 className="text-xl font-bold">ServiAdmin</h1>
          <Link href="/"><ArrowLeft className="w-6 h-6" /></Link>
        </div>
        
        <div className="p-4 md:p-8 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
