import 'leaflet';

declare module 'leaflet' {
  interface MarkerOptions {
    icon?: L.Icon;
  }
}