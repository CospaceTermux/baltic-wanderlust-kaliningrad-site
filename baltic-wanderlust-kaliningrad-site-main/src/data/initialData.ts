import { Hotel, News, MapMarker } from "@/types";

export const initialHotels: Hotel[] = [
  {
    id: "1",
    name: "Отель Балтийская корона",
    description: "Роскошный отель с видом на Балтийское море, расположенный в историческом центре города.",
    address: "Калининград, ул. Морская, 15",
    price: 250,
    rating: 4.8,
    imageUrl: "/hotels/baltic-crown.jpg",
    amenities: ["Бесплатный WiFi", "Спа-центр", "Ресторан", "Бассейн", "Фитнес-центр"],
    type: "luxury",
    coordinates: { lat: 54.705880, lng: 20.511569 }
  },
  {
    id: "2",
    name: "Гостиница Кёнигсберг",
    description: "Очаровательный бутик-отель в восстановленном здании 19-го века, в пешей доступности от главных достопримечательностей.",
    address: "Калининград, ул. Октябрьская, 6А",
    price: 180,
    rating: 4.3,
    imageUrl: "/hotels/koenigsberg.jpg",
    amenities: ["Бесплатный WiFi", "Историческое здание", "Центральное расположение"],
    type: "boutique",
    coordinates: { lat: 54.714745, lng: 20.504898 }
  },
  {
    id: "3",
    name: "Янтарная Плаза",
    description: "Современный отель с высоким уровнем комфорта и отличным расположением.",
    address: "Калининград, пр. Мира, 24",
    price: 150,
    rating: 4.5,
    imageUrl: "/hotels/amber-plaza.jpg",
    amenities: ["Бесплатный WiFi", "Фитнес-центр", "Ресторан"],
    type: "business",
    coordinates: { lat: 54.720556, lng: 20.485833 }
  }
];

export const initialNews: News[] = [
  {
    id: "1",
    title: "Открытие нового туристического маршрута",
    content: "В Калининграде открылся новый пешеходный маршрут по историческим местам города.",
    imageUrl: "/news/route.jpg",
    date: "2024-04-10",
    isPublished: true
  }
];

export const initialMapMarkers: MapMarker[] = []; 