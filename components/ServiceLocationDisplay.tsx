"use client";

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin } from 'lucide-react';

export default function ServiceLocationDisplay({ 
  latitude, 
  longitude 
}: { 
  latitude: number | null, 
  longitude: number | null 
}) {
  const [address, setAddress] = useState<string>("Buscando ubicación...");

  useEffect(() => {
    if (!latitude || !longitude) {
      setAddress("Ubicación no especificada");
      return;
    }

    const fetchAddress = async () => {
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
        const data = await res.json();
        
        if (data && data.address) {
          const { suburb, city, town, state } = data.address;
          const district = suburb || town || city || "";
          const province = city || town || "";
          const department = state || "";
          
          const parts = [district, province, department].filter(Boolean);
          // Eliminar duplicados en caso district y province sean iguales
          const uniqueParts = Array.from(new Set(parts));
          
          setAddress(uniqueParts.join(", ") || "Ubicación aproximada");
        } else {
          setAddress("Ubicación aproximada");
        }
      } catch (e) {
        setAddress("Ubicación aproximada");
      }
    };

    fetchAddress();
  }, [latitude, longitude]);

  if (!latitude || !longitude) {
    return (
      <div className="bg-gray-50 p-4 rounded-2xl flex flex-col gap-1 border border-gray-100">
        <MapPin className="w-5 h-5 text-gray-400 mb-1" />
        <span className="font-bold text-gray-900 text-sm">Ubicación</span>
        <span className="text-xs text-gray-500">A coordinar</span>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-4 mt-6">
      <h2 className="font-bold text-lg text-gray-900">Ubicación del trabajo</h2>
      
      {/* Mapa */}
      <div className="w-full h-[200px] rounded-2xl overflow-hidden border border-gray-200 relative z-0 pointer-events-none">
        <MapContainer 
          center={[latitude, longitude]} 
          zoom={14} 
          style={{ height: '100%', width: '100%', zIndex: 0 }}
          zoomControl={false}
          dragging={false}
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            attribution='&copy; Google Maps'
          />
          <Circle 
            center={[latitude, longitude]} 
            radius={400} 
            pathOptions={{ fillColor: '#5b67d8', color: 'transparent', fillOpacity: 0.25 }}
          />
        </MapContainer>
      </div>

      {/* Dirección Texto */}
      <div className="flex items-start gap-3 bg-brand-50 p-4 rounded-2xl border border-brand-100">
        <div className="bg-brand-100 p-2 rounded-full mt-0.5">
          <MapPin className="w-5 h-5 text-brand-600" />
        </div>
        <div>
          <p className="font-bold text-brand-900">Zona aproximada</p>
          <p className="text-sm text-brand-700 mt-0.5 leading-snug">{address}</p>
        </div>
      </div>
    </section>
  );
}
