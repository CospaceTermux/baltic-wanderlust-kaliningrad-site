import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import L from 'leaflet';

// Фикс для стандартных иконок
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/marker-icon-2x.png',
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

createRoot(document.getElementById("root")!).render(<App />);

