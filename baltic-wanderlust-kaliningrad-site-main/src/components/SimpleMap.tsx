import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useData } from '@/context/DataContext';

// 1. Типизация данных
type Position = [number, number];

// 2. Создание иконок для разных типов маркеров
const createIcon = (color: string) => L.icon({
  iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const icons = {
  landmark: createIcon('red'),
  museum: createIcon('violet'),
  restaurant: createIcon('blue'),
  shop: createIcon('green'),
  entertainment: createIcon('yellow'),
  attraction: createIcon('orange'),
  other: createIcon('gray')
};

// 3. Основной компонент
const SimpleMap = () => {
  const center: Position = [54.706151, 20.511099];
  const { mapMarkers } = useData();

  return (
    <MapContainer
      center={center}
      zoom={14}
      style={{ height: '500px', width: '100%', borderRadius: '8px' }}
      className="z-0 leaflet-container"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      {mapMarkers.map((marker) => (
        <Marker
          key={marker.id}
          position={[marker.coordinates.lat, marker.coordinates.lng]}
          icon={icons[marker.type] || icons.other}
        >
          <Popup>
            <div className="p-2 min-w-[200px]">
              <h3 className="font-bold text-lg mb-1">{marker.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{marker.description}</p>
              <span 
                className="inline-block px-2 py-1 text-xs rounded-full bg-primary-100 text-primary-800"
              >
                {marker.type === 'attraction' ? 'Достопримечательность'
                  : marker.type === 'restaurant' ? 'Ресторан'
                  : marker.type === 'shop' ? 'Магазин'
                  : marker.type === 'museum' ? 'Музей'
                  : marker.type === 'landmark' ? 'Памятник'
                  : marker.type === 'entertainment' ? 'Развлечения'
                  : 'Другое'}
              </span>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default SimpleMap;