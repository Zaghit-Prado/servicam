"use client";

import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Icono personalizado para la ubicación del usuario
const userIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowSize: [41, 41]
});

// Pines flotantes estilo Airbnb (S/ 120, S/ 80) creados con HTML nativo de Leaflet
const priceIcon120 = L.divIcon({
  className: 'bg-transparent border-none',
  html: `<div style="background-color: #2563eb; color: white; padding: 4px 10px; border-radius: 999px; font-weight: bold; font-size: 13px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2); position: relative; width: max-content; display: inline-block;">
            S/ 120
            <div style="position: absolute; bottom: -5px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 6px solid #2563eb;"></div>
         </div>`,
  iconSize: [0, 0],
  iconAnchor: [30, 30],
});

const priceIcon80 = L.divIcon({
  className: 'bg-transparent border-none',
  html: `<div style="background-color: #222222; color: white; padding: 4px 10px; border-radius: 999px; font-weight: bold; font-size: 13px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2); position: relative; width: max-content; display: inline-block;">
            S/ 80
            <div style="position: absolute; bottom: -5px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 6px solid #222222;"></div>
         </div>`,
  iconSize: [0, 0],
  iconAnchor: [30, 30],
});

export default function Map() {
  return (
    <MapContainer 
      center={[-12.046374, -77.042793]} // Coordenadas de Lima, Perú
      zoom={14} 
      style={{ height: '100%', width: '100%', zIndex: 0 }}
      zoomControl={false}
    >
      {/* Mapa de alta calidad de Esri (No requiere API KEY) */}
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
        attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
      />
      
      {/* Ubicación del usuario */}
      <Marker position={[-12.046374, -77.042793]} icon={userIcon}></Marker>

      {/* Pines de Servicios Cercanos */}
      <Marker position={[-12.051, -77.048]} icon={priceIcon120}></Marker>
      <Marker position={[-12.042, -77.038]} icon={priceIcon80}></Marker>
      
    </MapContainer>
  );
}
