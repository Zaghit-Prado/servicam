"use client";

import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const icon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowSize: [41, 41]
});

function MapEvents({ onLocationChange }: { onLocationChange: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onLocationChange(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function LocationPickerMap({ 
  onLocationChange 
}: { 
  onLocationChange: (lat: number, lng: number) => void 
}) {
  const [position, setPosition] = useState<{lat: number, lng: number} | null>(null);

  const handleLocation = (lat: number, lng: number) => {
    setPosition({ lat, lng });
    onLocationChange(lat, lng);
  };

  return (
    <div className="w-full h-[300px] rounded-2xl overflow-hidden border border-brand-200 z-0 relative">
      <MapContainer 
        center={[-12.046374, -77.042793]} 
        zoom={14} 
        style={{ height: '100%', width: '100%', zIndex: 0 }}
      >
        <MapEvents onLocationChange={handleLocation} />
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
        />
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}"
        />
        {position && <Marker position={position} icon={icon} />}
      </MapContainer>
      {!position && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center bg-black/5 z-[1000]">
          <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-full font-bold text-sm text-brand-900 shadow-sm">
            Toca el mapa para fijar la ubicación
          </div>
        </div>
      )}
    </div>
  );
}
