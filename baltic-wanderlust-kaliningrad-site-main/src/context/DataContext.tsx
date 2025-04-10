import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Hotel, News, MapMarker } from "@/types";
import { initialHotels, initialNews, initialMapMarkers } from "@/data/initialData";

// Текущий курс доллара (можно заменить на API запрос к курсам валют)
const USD_TO_RUB_RATE = 92;

// Конвертация цен из USD в RUB
const convertPrices = (hotels: Hotel[]): Hotel[] => {
  return hotels.map(hotel => ({
    ...hotel,
    price: Math.round(hotel.price * USD_TO_RUB_RATE)
  }));
};

interface DataContextType {
  hotels: Hotel[];
  news: News[];
  mapMarkers: MapMarker[];
  setHotels: (hotels: Hotel[]) => void;
  setNews: (news: News[]) => void;
  setMapMarkers: (markers: MapMarker[]) => void;
  addHotel: (hotel: Hotel) => void;
  addNews: (news: News) => void;
  addMapMarker: (marker: MapMarker) => void;
  deleteHotel: (id: string) => void;
  deleteNews: (id: string) => void;
  deleteMapMarker: (id: string) => void;
  resetToInitial: () => void;
  uploadImage: (file: File) => Promise<string>;
  clearAllMapMarkers: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Функции для работы с localStorage
const loadFromStorage = <T,>(key: string, initialData: T): T => {
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      const parsedData = JSON.parse(stored) as T;
      if (Array.isArray(parsedData) && parsedData.length > 0) {
        console.log(`Загружены данные из localStorage для ${key}:`, parsedData.length, 'элементов');
        return parsedData;
      }
    }
    
    if (key === "hotels") {
      const convertedHotels = convertPrices(initialData as Hotel[]);
      saveToStorage(key, convertedHotels);
      console.log('Инициализированы отели с конвертированными ценами');
      return convertedHotels as T;
    }
    
    saveToStorage(key, initialData);
    console.log(`Инициализированы начальные данные для ${key}`);
    return initialData;
  } catch (error) {
    console.error(`Ошибка при загрузке данных ${key}:`, error);
    if (key === "hotels") {
      return convertPrices(initialData as Hotel[]) as T;
    }
    return initialData;
  }
};

const saveToStorage = <T,>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    console.log(`Данные успешно сохранены в localStorage для ${key}`);
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'QuotaExceededError') {
        console.error('Превышен лимит localStorage. Очищаем старые данные...');
        // Очищаем старые изображения
        Object.keys(localStorage).forEach(key => {
          if (key.startsWith('image_')) {
            localStorage.removeItem(key);
          }
        });
        // Пробуем сохранить снова
        try {
          localStorage.setItem(key, JSON.stringify(data));
        } catch (retryError) {
          console.error('Не удалось сохранить данные даже после очистки:', retryError);
        }
      } else {
        console.error(`Ошибка при сохранении ${key}:`, error);
      }
    }
  }
};

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [hotels, setHotels] = useState<Hotel[]>(() => 
    loadFromStorage('hotels', initialHotels)
  );
  
  const [news, setNews] = useState<News[]>(() => 
    loadFromStorage('news', initialNews)
  );
  
  const [mapMarkers, setMapMarkers] = useState<MapMarker[]>(() => 
    loadFromStorage('mapMarkers', initialMapMarkers)
  );

  // Сохраняем данные при их изменении
  useEffect(() => {
    saveToStorage('hotels', hotels);
  }, [hotels]);

  useEffect(() => {
    saveToStorage('news', news);
  }, [news]);

  useEffect(() => {
    if (!mapMarkers || mapMarkers.length === 0) {
      setMapMarkers(initialMapMarkers);
      return;
    }
    saveToStorage('mapMarkers', mapMarkers);
  }, [mapMarkers]);

  const addHotel = (hotel: Hotel) => {
    const newHotel = {
      ...hotel,
      id: hotel.id || `hotel_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setHotels([...hotels, newHotel]);
  };

  const addNews = (newsItem: News) => {
    const newNewsItem = {
      ...newsItem,
      id: newsItem.id || `news_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setNews([...news, newNewsItem]);
  };

  const addMapMarker = (marker: MapMarker) => {
    const newMarker = {
      ...marker,
      id: marker.id || `marker_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setMapMarkers([...mapMarkers, newMarker]);
  };

  const deleteHotel = (id: string) => {
    setHotels(hotels.filter(hotel => hotel.id !== id));
  };

  const deleteNews = (id: string) => {
    setNews(news.filter(item => item.id !== id));
  };

  const deleteMapMarker = (id: string) => {
    setMapMarkers(mapMarkers.filter(marker => marker.id !== id));
  };

  const resetToInitial = () => {
    const resetHotels = convertPrices(initialHotels);
    const resetNews = initialNews;
    const resetMapMarkers = initialMapMarkers;
    
    setHotels(resetHotels);
    setNews(resetNews);
    setMapMarkers(resetMapMarkers);
    
    localStorage.clear();
    
    saveToStorage('hotels', resetHotels);
    saveToStorage('news', resetNews);
    saveToStorage('mapMarkers', resetMapMarkers);
  };

  // Функция для загрузки изображений
  const uploadImage = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          // Сохраняем изображение в localStorage
          const imageKey = `image_${Date.now()}`;
          localStorage.setItem(imageKey, reader.result);
          resolve(imageKey);
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  };

  const clearAllMapMarkers = () => {
    setMapMarkers([]);
    localStorage.removeItem('mapMarkers');
  };

  // Делаем функцию доступной глобально
  if (typeof window !== 'undefined') {
    (window as any).clearAllMapMarkers = clearAllMapMarkers;
  }

  return (
    <DataContext.Provider
      value={{
        hotels,
        news,
        mapMarkers,
        setHotels,
        setNews,
        setMapMarkers,
        addHotel,
        addNews,
        addMapMarker,
        deleteHotel,
        deleteNews,
        deleteMapMarker,
        resetToInitial,
        uploadImage,
        clearAllMapMarkers,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}; 