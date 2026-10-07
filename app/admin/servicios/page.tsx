import { prisma } from "@/lib/prisma";
import { Search, Trash2 } from "lucide-react";
import DeleteServiceBtn from "./DeleteServiceBtn";
import Link from "next/link";

export default async function AdminServicios() {
  const services = await prisma.serviceRequest.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      client: true
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Moderación de Servicios</h2>
          <p className="text-gray-500">Revisa y elimina publicaciones que incumplan las normas.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 text-sm font-semibold text-gray-600">Servicio</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Cliente</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Fecha</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Estado</th>
                <th className="p-4 text-sm font-semibold text-gray-600 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {services.map((svc) => (
                <tr key={svc.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <Link href={`/servicio/${svc.id}`} className="font-semibold text-brand-600 hover:underline">
                      {svc.title}
                    </Link>
                    <p className="text-xs text-gray-500 line-clamp-1">{svc.description}</p>
                  </td>
                  <td className="p-4 text-sm text-gray-900">
                    {svc.client.name}
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {new Date(svc.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                      {svc.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <DeleteServiceBtn serviceId={svc.id} />
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
