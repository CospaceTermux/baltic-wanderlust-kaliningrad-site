import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Hotel } from "@/types";
import { useData } from "@/context/DataContext";

const HotelManager = () => {
  const { hotels, addHotel, deleteHotel, resetToInitial, uploadImage } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [currentHotel, setCurrentHotel] = useState<Partial<Hotel>>({
    name: "",
    description: "",
    address: "",
    price: 0,
    rating: 0,
    imageUrl: "",
    amenities: [],
    type: "budget",
    coordinates: { lat: 0, lng: 0 },
  });
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newHotel: Hotel = {
      id: Date.now().toString(),
      ...currentHotel,
    } as Hotel;

    addHotel(newHotel);
    setIsEditing(false);
    setCurrentHotel({
      name: "",
      description: "",
      address: "",
      price: 0,
      rating: 0,
      imageUrl: "",
      amenities: [],
      type: "budget",
      coordinates: { lat: 0, lng: 0 },
    });
    toast({
      title: "Успешно",
      description: "Отель добавлен",
    });
  };

  const handleDelete = (id: string) => {
    deleteHotel(id);
    toast({
      title: "Успешно",
      description: "Отель удален",
    });
  };

  const handleAmenitiesChange = (value: string) => {
    const amenities = value.split(",").map((item) => item.trim());
    setCurrentHotel({ ...currentHotel, amenities });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const imageKey = await uploadImage(file);
        const imageUrl = localStorage.getItem(imageKey);
        if (imageUrl) {
          setCurrentHotel({ ...currentHotel, imageUrl });
          toast({
            title: "Успешно",
            description: "Изображение загружено",
          });
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: "Не удалось загрузить изображение",
        });
      }
    }
  };

  const handleReset = () => {
    resetToInitial();
    toast({
      title: "Успешно",
      description: "Данные сброшены к исходному состоянию",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Управление отелями</h2>
        <div className="space-x-2">
          <Button onClick={() => setIsEditing(true)}>Добавить отель</Button>
          <Button variant="outline" onClick={handleReset}>
            Сбросить к исходному состоянию
          </Button>
        </div>
      </div>

      {isEditing && (
        <Card>
          <CardHeader>
            <CardTitle>Новый отель</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Название</Label>
                <Input
                  id="name"
                  value={currentHotel.name}
                  onChange={(e) =>
                    setCurrentHotel({ ...currentHotel, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Описание</Label>
                <Textarea
                  id="description"
                  value={currentHotel.description}
                  onChange={(e) =>
                    setCurrentHotel({ ...currentHotel, description: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Адрес</Label>
                <Input
                  id="address"
                  value={currentHotel.address}
                  onChange={(e) =>
                    setCurrentHotel({ ...currentHotel, address: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Цена</Label>
                  <Input
                    id="price"
                    type="number"
                    value={currentHotel.price}
                    onChange={(e) =>
                      setCurrentHotel({
                        ...currentHotel,
                        price: Number(e.target.value),
                      })
                    }
                    placeholder="Цена за ночь в рублях"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rating">Рейтинг</Label>
                  <Input
                    id="rating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={currentHotel.rating}
                    onChange={(e) =>
                      setCurrentHotel({
                        ...currentHotel,
                        rating: Number(e.target.value),
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Изображение</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Загрузить изображение
                  </Button>
                  {currentHotel.imageUrl && (
                    <span className="text-sm text-green-600">
                      Изображение загружено
                    </span>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amenities">Удобства (через запятую)</Label>
                <Input
                  id="amenities"
                  value={currentHotel.amenities?.join(", ")}
                  onChange={(e) => handleAmenitiesChange(e.target.value)}
                  placeholder="Wi-Fi, Парковка, Бассейн"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lat">Широта</Label>
                  <Input
                    id="lat"
                    type="number"
                    step="any"
                    value={currentHotel.coordinates?.lat}
                    onChange={(e) =>
                      setCurrentHotel({
                        ...currentHotel,
                        coordinates: {
                          ...currentHotel.coordinates!,
                          lat: Number(e.target.value),
                        },
                      })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lng">Долгота</Label>
                  <Input
                    id="lng"
                    type="number"
                    step="any"
                    value={currentHotel.coordinates?.lng}
                    onChange={(e) =>
                      setCurrentHotel({
                        ...currentHotel,
                        coordinates: {
                          ...currentHotel.coordinates!,
                          lng: Number(e.target.value),
                        },
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <Button type="submit">Сохранить</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                >
                  Отмена
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {hotels.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {item.imageUrl && (
                  <div className="col-span-2">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
                <p className="text-sm text-gray-500 col-span-2">{item.description}</p>
                <div>
                  <span className="font-semibold">Адрес:</span> {item.address}
                </div>
                <div>
                  <span className="font-semibold">Цена:</span> {item.price} ₽ за ночь
                </div>
                <div>
                  <span className="font-semibold">Рейтинг:</span> {item.rating}/5
                </div>
                <div>
                  <span className="font-semibold">Удобства:</span>{" "}
                  {item.amenities.join(", ")}
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                >
                  Удалить
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HotelManager; 