import { prisma } from "@/lib/prisma";
import { Search, Ban, Edit, Trash2 } from "lucide-react";
import BanButton from "./BanButton";

export default async function AdminUsuarios() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { servicesDone: true, servicesPosted: true }
      }
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestión de Usuarios</h2>
          <p className="text-gray-500">Administra, edita perfiles o restringe cuentas.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Buscar usuario..." 
            className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none w-full md:w-64"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 text-sm font-semibold text-gray-600">Usuario</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Rol</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Actividad</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Estado</th>
                <th className="p-4 text-sm font-semibold text-gray-600 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {user.image ? (
                        <img src={user.image} className="w-10 h-10 rounded-full object-cover" alt={user.name || "User"} />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold">
                          {user.name?.[0] || "U"}
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-gray-900">{user.name || "Sin nombre"}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      user.role === "ADMIN" ? "bg-red-100 text-red-700" :
                      user.role === "PROVIDER" ? "bg-brand-100 text-brand-700" : 
                      "bg-gray-100 text-gray-700"
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-gray-600">
                      <span className="font-semibold text-gray-900">{user._count.servicesPosted}</span> pedidos
                      <br/>
                      <span className="font-semibold text-gray-900">{user._count.servicesDone}</span> trabajos
                    </div>
                  </td>
                  <td className="p-4">
                    {user.isBanned ? (
                      <span className="flex items-center gap-1 text-red-600 text-sm font-semibold">
                        <Ban className="w-4 h-4" /> Baneado
                      </span>
                    ) : (
                      <span className="text-green-600 text-sm font-semibold">Activo</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-brand-600 transition-colors" title="Editar Perfil">
                        <Edit className="w-5 h-5" />
                      </button>
                      <BanButton userId={user.id} isBanned={user.isBanned} />
                      <button className="p-2 text-gray-400 hover:text-red-600 transition-colors" title="Eliminar cuenta">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
