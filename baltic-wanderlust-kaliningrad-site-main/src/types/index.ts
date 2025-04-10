export interface News {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  date: string;
  isPublished: boolean;
}

export interface Hotel {
  id: string;
  name: string;
  description: string;
  address: string;
  price: number;
  rating: number;
  imageUrl: string;
  amenities: string[];
  type: 'luxury' | 'boutique' | 'business' | 'budget';
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface MapMarker {
  id: string;
  title: string;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  type: 'attraction' | 'museum' | 'restaurant' | 'shop' | 'landmark' | 'entertainment' | 'other';
  imageUrl?: string;
} 