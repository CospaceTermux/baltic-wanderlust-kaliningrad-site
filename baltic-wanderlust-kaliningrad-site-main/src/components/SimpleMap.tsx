import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// 1. Типизация данных
type Position = [number, number];

interface Attraction {
  id: string;
  name: string;
  position: Position;
  description: string;
  category: string;
  color: string;
}

// 2. Конфигурация маркеров
const MARKER_ICON_CONFIG = {
  size: [25, 41] as [number, number],
  anchor: [12, 41] as [number, number],
  popupAnchor: [1, -34] as [number, number],
  shadowSize: [41, 41] as [number, number]
};

// 3. Фабрика иконок
const createCustomIcon = (color: string) => {
  return L.icon({
    iconUrl: `/marker-icon-${color}.png`,
    iconRetinaUrl: `/marker-icon-2x-${color}.png`,
    shadowUrl: '/marker-shadow.png',
    ...MARKER_ICON_CONFIG
  });
};

// 4. Фикс для стандартных иконок
const initLeafletIcons = () => {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/marker-icon-2x-red.png',
    iconUrl: '/marker-icon-red.png',
    shadowUrl: '/marker-shadow.png',
    ...MARKER_ICON_CONFIG
  });
};

// 5. Данные достопримечательностей
const ATTRACTIONS: Attraction[] = [
  {
    id: '1',
    name: "Кафедральный собор",
    position: [54.7065, 20.5113],
    description: "Главный символ города с органным залом",
    category: "Культура",
    color: 'red'
  },
  {
    id: '2',
    name: "Музей янтаря",
    position: [54.7173, 20.5206],
    description: "Единственный в России музей одного минерала",
    category: "Музеи",
    color: 'blue'
  },
  {
    id: '3',
    name: "Форт №5",
    position: [54.7048, 20.4427],
    description: "Памятник оборонительного зодчества XIX века",
    category: "История",
    color: 'green'
  }
];

// 6. Основной компонент
const SimpleMap = () => {
  const center: Position = [54.7104, 20.4522];
  
  // Инициализация иконок при монтировании
  React.useEffect(() => {
    initLeafletIcons();
  }, []);

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: '500px', width: '100%', borderRadius: '8px' }}
      className="z-0 leaflet-container"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      {ATTRACTIONS.map((attraction) => (
        <Marker
          key={attraction.id}
          position={attraction.position}
          icon={createCustomIcon(attraction.color)}
        >
          <Popup>
            <div className="p-2 min-w-[200px]">
              <h3 className="font-bold text-lg mb-1">{attraction.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{attraction.description}</p>
              <span 
                className="inline-block px-2 py-1 text-xs rounded-full"
                style={{ 
                  backgroundColor: `var(--color-${attraction.color}-100)`,
                  color: `var(--color-${attraction.color}-800)`
                }}
              >
                {attraction.category}
              </span>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default SimpleMap;