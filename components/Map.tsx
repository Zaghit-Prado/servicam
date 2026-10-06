"use client";

import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

// Icono personalizado para la ubicación del usuario
const userIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowSize: [41, 41]
});

// Helper para crear pines con precios
const createPriceIcon = (price: number, isSelected: boolean) => {
  const bgColor = isSelected ? '#222222' : '#2563eb';
  return L.divIcon({
    className: 'bg-transparent border-none',
    html: `<div style="background-color: ${bgColor}; color: white; padding: 4px 10px; border-radius: 999px; font-weight: bold; font-size: 13px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2); position: relative; width: max-content; display: inline-block; transition: all 0.3s ease; transform: ${isSelected ? 'scale(1.1)' : 'scale(1)'}; z-index: ${isSelected ? 100 : 1};">
              S/ ${price}
              <div style="position: absolute; bottom: -5px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 6px solid ${bgColor};"></div>
           </div>`,
    iconSize: [0, 0],
    iconAnchor: [30, 30],
  });
};

export default function Map({ services, selectedId, onSelect }: { services: any[], selectedId: string | null, onSelect: (id: string | null) => void }) {
  return (
    <MapContainer 
      center={[-12.046374, -77.042793]} 
      zoom={14} 
      style={{ height: '100%', width: '100%', zIndex: 0 }}
      zoomControl={false}
      onClick={() => onSelect(null)}
    >
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
        attribution='&copy; Esri, HERE, Garmin, NGA, USGS'
      />
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}"
      />
      
      {/* Ubicación del usuario */}
      <Marker position={[-12.046374, -77.042793]} icon={userIcon}></Marker>

      {/* Pines de Servicios Dinámicos */}
      {services.map((svc) => (
        <Marker 
          key={svc.id} 
          position={[svc.latitude, svc.longitude]} 
          icon={createPriceIcon(svc.minPrice, selectedId === svc.id)}
          eventHandlers={{
            click: () => onSelect(svc.id),
          }}
        />
      ))}
    </MapContainer>
  );
}
