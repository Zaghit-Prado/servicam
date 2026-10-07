"use client";

import { MapContainer, TileLayer, Marker, Circle, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Componente para detectar clics en el fondo del mapa
function MapEvents({ onMapClick }: { onMapClick: () => void }) {
  useMapEvents({
    click: () => {
      onMapClick();
    },
  });
  return null;
}

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

import { Fragment } from 'react';

export default function Map({ services, selectedId, onSelect }: { services: any[], selectedId: string | null, onSelect: (id: string | null) => void }) {
  return (
    <MapContainer 
      center={[-12.046374, -77.042793]} 
      zoom={14} 
      style={{ height: '100%', width: '100%', zIndex: 0 }}
      zoomControl={false}
    >
      <MapEvents onMapClick={() => onSelect(null)} />
      <TileLayer
        url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
        attribution='&copy; Google Maps'
      />
      
      {/* Ubicación del usuario */}
      <Marker position={[-12.046374, -77.042793]} icon={userIcon}></Marker>

      {/* Pines de Servicios Dinámicos con Área Aproximada (Círculo) */}
      {services.map((svc) => (
        <Fragment key={svc.id}>
          {/* Círculo de privacidad */}
          <Circle 
            center={[svc.latitude, svc.longitude]} 
            radius={400} // 400 metros de radio aproximado
            pathOptions={{ fillColor: '#5b67d8', color: 'transparent', fillOpacity: 0.15 }}
            eventHandlers={{
              click: () => onSelect(svc.id),
            }}
          />
          {/* Marcador de Precio encima del área */}
          <Marker 
            position={[svc.latitude, svc.longitude]} 
            icon={createPriceIcon(svc.minPrice, selectedId === svc.id)}
            eventHandlers={{
              click: () => onSelect(svc.id),
            }}
          />
        </Fragment>
      ))}
    </MapContainer>
  );
}
