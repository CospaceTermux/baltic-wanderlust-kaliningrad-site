import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import NewsManager from "@/components/admin/NewsManager";
import HotelManager from "@/components/admin/HotelManager";
import MapMarkerManager from "@/components/admin/MapMarkerManager";

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // В реальном приложении здесь должна быть проверка через API
    if (username === "admin" && password === "admin123") {
      setIsAuthenticated(true);
      toast({
        title: "Успешный вход",
        description: "Добро пожаловать в админ-панель",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Неверные учетные данные",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto max-w-md mt-10">
        <Card>
          <CardHeader>
            <CardTitle>Вход в админ-панель</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Имя пользователя"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Войти
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Админ-панель</h1>
        <Button
          variant="outline"
          onClick={() => setIsAuthenticated(false)}
        >
          Выйти
        </Button>
      </div>
      <Tabs defaultValue="news" className="space-y-4">
        <TabsList>
          <TabsTrigger value="news">Новости</TabsTrigger>
          <TabsTrigger value="hotels">Отели</TabsTrigger>
          <TabsTrigger value="map">Карта</TabsTrigger>
        </TabsList>
        
        <TabsContent value="news">
          <NewsManager />
        </TabsContent>

        <TabsContent value="hotels">
          <HotelManager />
        </TabsContent>

        <TabsContent value="map">
          <MapMarkerManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage; 