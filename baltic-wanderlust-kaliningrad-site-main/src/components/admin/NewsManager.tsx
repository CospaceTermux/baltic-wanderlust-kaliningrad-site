import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { News } from "@/types";
import { useData } from "@/context/DataContext";

const NewsManager = () => {
  const { news, addNews, deleteNews } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [currentNews, setCurrentNews] = useState<Partial<News>>({
    title: "",
    content: "",
    imageUrl: "",
    isPublished: false,
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newNews: News = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      ...currentNews,
    } as News;

    addNews(newNews);
    setIsEditing(false);
    setCurrentNews({
      title: "",
      content: "",
      imageUrl: "",
      isPublished: false,
    });
    toast({
      title: "Успешно",
      description: "Новость добавлена",
    });
  };

  const handleDelete = (id: string) => {
    deleteNews(id);
    toast({
      title: "Успешно",
      description: "Новость удалена",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Управление новостями</h2>
        <Button onClick={() => setIsEditing(true)}>Добавить новость</Button>
      </div>

      {isEditing && (
        <Card>
          <CardHeader>
            <CardTitle>Новая новость</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Заголовок</Label>
                <Input
                  id="title"
                  value={currentNews.title}
                  onChange={(e) =>
                    setCurrentNews({ ...currentNews, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Содержание</Label>
                <Textarea
                  id="content"
                  value={currentNews.content}
                  onChange={(e) =>
                    setCurrentNews({ ...currentNews, content: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageUrl">URL изображения</Label>
                <Input
                  id="imageUrl"
                  value={currentNews.imageUrl}
                  onChange={(e) =>
                    setCurrentNews({ ...currentNews, imageUrl: e.target.value })
                  }
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isPublished"
                  checked={currentNews.isPublished}
                  onCheckedChange={(checked) =>
                    setCurrentNews({ ...currentNews, isPublished: checked })
                  }
                />
                <Label htmlFor="isPublished">Опубликовать</Label>
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
        {news.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-2">{item.content}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm">
                  Статус: {item.isPublished ? "Опубликовано" : "Черновик"}
                </span>
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

export default NewsManager; 