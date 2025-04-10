import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { MapMarker } from "@/types";
import { useData } from "@/context/DataContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MapMarkerManager = () => {
  const { mapMarkers, addMapMarker, deleteMapMarker } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [currentMarker, setCurrentMarker] = useState<Partial<MapMarker>>({
    title: "",
    description: "",
    coordinates: { lat: 0, lng: 0 },
    type: "attraction",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMarker: MapMarker = {
      id: Date.now().toString(),
      ...currentMarker,
    } as MapMarker;

    addMapMarker(newMarker);
    setIsEditing(false);
    setCurrentMarker({
      title: "",
      description: "",
      coordinates: { lat: 0, lng: 0 },
      type: "attraction",
    });
    toast({
      title: "Успешно",
      description: "Метка добавлена",
    });
  };

  const handleDelete = (id: string) => {
    deleteMapMarker(id);
    toast({
      title: "Успешно",
      description: "Метка удалена",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Управление метками на карте</h2>
        <Button onClick={() => setIsEditing(true)}>Добавить метку</Button>
      </div>

      {isEditing && (
        <Card>
          <CardHeader>
            <CardTitle>Новая метка</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Название</Label>
                <Input
                  id="title"
                  value={currentMarker.title}
                  onChange={(e) =>
                    setCurrentMarker({ ...currentMarker, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Описание</Label>
                <Textarea
                  id="description"
                  value={currentMarker.description}
                  onChange={(e) =>
                    setCurrentMarker({
                      ...currentMarker,
                      description: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Тип метки</Label>
                <Select
                  value={currentMarker.type}
                  onValueChange={(value: MapMarker["type"]) =>
                    setCurrentMarker({ ...currentMarker, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите тип" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="attraction">Достопримечательность</SelectItem>
                    <SelectItem value="restaurant">Ресторан</SelectItem>
                    <SelectItem value="shop">Магазин</SelectItem>
                    <SelectItem value="other">Другое</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageUrl">URL изображения (необязательно)</Label>
                <Input
                  id="imageUrl"
                  value={currentMarker.imageUrl}
                  onChange={(e) =>
                    setCurrentMarker({ ...currentMarker, imageUrl: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lat">Широта</Label>
                  <Input
                    id="lat"
                    type="number"
                    step="any"
                    value={currentMarker.coordinates?.lat}
                    onChange={(e) =>
                      setCurrentMarker({
                        ...currentMarker,
                        coordinates: {
                          ...currentMarker.coordinates!,
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
                    value={currentMarker.coordinates?.lng}
                    onChange={(e) =>
                      setCurrentMarker({
                        ...currentMarker,
                        coordinates: {
                          ...currentMarker.coordinates!,
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
        {mapMarkers.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-2">{item.description}</p>
              <div className="grid grid-cols-2 gap-4 mb-2">
                <div>
                  <span className="font-semibold">Тип:</span>{" "}
                  {item.type === "attraction"
                    ? "Достопримечательность"
                    : item.type === "restaurant"
                    ? "Ресторан"
                    : item.type === "shop"
                    ? "Магазин"
                    : "Другое"}
                </div>
                <div>
                  <span className="font-semibold">Координаты:</span>{" "}
                  {item.coordinates.lat}, {item.coordinates.lng}
                </div>
              </div>
              <div className="flex justify-end">
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

export default MapMarkerManager; 