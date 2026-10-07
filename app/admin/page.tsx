import { prisma } from "@/lib/prisma";
import { Users, Briefcase, AlertCircle, CheckCircle } from "lucide-react";
import AdminChart from "./AdminChart";

export default async function AdminDashboard() {
  const totalUsers = await prisma.user.count();
  const providersCount = await prisma.user.count({ where: { role: "PROVIDER" } });
  const activeServices = await prisma.serviceRequest.count({ where: { status: "PUBLISHED" } });
  
  // Agrupar prestadores por habilidad
  const skills = await prisma.skill.findMany({
    include: {
      _count: {
        select: { users: true }
      }
    }
  });

  // Ordenar de mayor a menor y formatear para Recharts
  const chartData = skills
    .map(skill => ({
      name: skill.name,
      prestadores: skill._count.users
    }))
    .sort((a, b) => b.prestadores - a.prestadores);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard General</h2>
        <p className="text-gray-500">Resumen del estado de la plataforma ServiCam.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Usuarios Totales</p>
            <h3 className="text-2xl font-bold text-gray-900">{totalUsers}</h3>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-brand-50 text-brand-600 rounded-xl">
            <Briefcase className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Prestadores</p>
            <h3 className="text-2xl font-bold text-gray-900">{providersCount}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-xl">
            <CheckCircle className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Trabajos Activos</p>
            <h3 className="text-2xl font-bold text-gray-900">{activeServices}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Reportes</p>
            <h3 className="text-2xl font-bold text-gray-900">0</h3>
          </div>
        </div>
      </div>

      {/* Gráfico de Habilidades */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Prestadores por Especialidad</h3>
        <div className="h-[400px] w-full">
          <AdminChart data={chartData} />
        </div>
      </div>
    </div>
  );
}
