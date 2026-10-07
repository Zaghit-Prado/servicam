import { prisma } from "@/lib/prisma";
import { Plus } from "lucide-react";
import DeleteCategoryBtn from "./DeleteCategoryBtn";
import NewCategoryForm from "./NewCategoryForm";

export default async function AdminCategorias() {
  const categories = await prisma.systemCategory.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestión de Categorías</h2>
          <p className="text-gray-500">Agrega o elimina categorías globales para la app.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-fit">
          <h3 className="font-bold text-gray-900 mb-4">Nueva Categoría</h3>
          <NewCategoryForm />
        </div>

        <div className="md:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-4 text-sm font-semibold text-gray-600">Icono</th>
                  <th className="p-4 text-sm font-semibold text-gray-600">Nombre</th>
                  <th className="p-4 text-sm font-semibold text-gray-600">Estado</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 text-2xl">{cat.icon || "📁"}</td>
                    <td className="p-4 font-semibold text-gray-900">{cat.name}</td>
                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">Activo</span>
                    </td>
                    <td className="p-4 text-right">
                      <DeleteCategoryBtn categoryId={cat.id} />
                    </td>
                  </tr>
                ))}
                {categories.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-gray-500">No hay categorías. Crea la primera a la izquierda.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
