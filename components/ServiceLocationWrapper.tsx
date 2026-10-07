"use client";

import dynamic from "next/dynamic";

const ServiceLocationDisplay = dynamic(() => import('./ServiceLocationDisplay'), {
  ssr: false,
  loading: () => <div className="w-full h-[200px] bg-gray-100 rounded-2xl flex items-center justify-center text-gray-500 text-sm font-semibold border border-brand-200 mt-6">Cargando mapa...</div>
});

export default function ServiceLocationWrapper({ latitude, longitude }: { latitude: number | null, longitude: number | null }) {
  return <ServiceLocationDisplay latitude={latitude} longitude={longitude} />;
}
