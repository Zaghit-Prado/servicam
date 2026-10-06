"use client";

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Search } from 'lucide-react';

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

// Componente para mover el mapa cuando se busca
function MapUpdater({ center }: { center: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 16);
    }
  }, [center, map]);
  return null;
}

export default function LocationPickerMap({ 
  onLocationChange 
}: { 
  onLocationChange: (lat: number, lng: number) => void 
}) {
  const [position, setPosition] = useState<{lat: number, lng: number} | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);

  const handleLocation = (lat: number, lng: number) => {
    setPosition({ lat, lng });
    onLocationChange(lat, lng);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery + ", Lima")}&limit=5`);
      const data = await res.json();
      setSearchResults(data);
    } catch (e) {
      console.error(e);
    }
  };

  const selectResult = (result: any) => {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);
    setMapCenter([lat, lng]);
    handleLocation(lat, lng);
    setSearchResults([]);
    setSearchQuery(result.display_name.split(',')[0]);
  };

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Buscador */}
      <div className="relative z-10">
        <div className="flex bg-gray-50 border border-brand-200 rounded-xl overflow-hidden focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-200 transition-all">
          <input 
            type="text" 
            placeholder="Buscar calle, distrito..." 
            className="flex-1 bg-transparent px-4 py-3 outline-none text-gray-900 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleSearch())}
          />
          <button type="button" onClick={handleSearch} className="px-4 text-brand-500 hover:bg-brand-50 transition-colors">
            <Search className="w-5 h-5" />
          </button>
        </div>
        
        {searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
            {searchResults.map((res, i) => (
              <button 
                key={i}
                type="button"
                onClick={() => selectResult(res)}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-0 text-sm"
              >
                <div className="font-semibold text-gray-900 line-clamp-1">{res.display_name.split(',')[0]}</div>
                <div className="text-xs text-gray-500 line-clamp-1">{res.display_name}</div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="w-full h-[300px] rounded-2xl overflow-hidden border border-brand-200 z-0 relative">
        <MapContainer 
          center={[-12.046374, -77.042793]} 
          zoom={14} 
          style={{ height: '100%', width: '100%', zIndex: 0 }}
        >
          <MapEvents onLocationChange={handleLocation} />
          <MapUpdater center={mapCenter} />
          <TileLayer
            url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            attribution='&copy; Google Maps'
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
    </div>
  );
}
