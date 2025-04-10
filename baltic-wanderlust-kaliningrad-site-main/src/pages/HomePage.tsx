import React from 'react';
import Layout from '../components/Layout';
import { useLanguage } from '../context/LanguageContext';
import Hero from "../components/Hero";
import FeaturedCard from "../components/FeaturedCard";
import HotelSearchForm from "../components/HotelSearchForm";
import { toast } from "sonner";
import PageTransition from '../components/PageTransition';
import { useNavigate } from 'react-router-dom';

interface AttractionCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const AttractionCard: React.FC<AttractionCardProps> = ({ title, description, imageUrl }) => {
  const [imageError, setImageError] = React.useState(false);
  const { t } = useLanguage();

  const handleLearnMore = (e: React.MouseEvent) => {
    e.preventDefault();
    toast.info("Функционал находится в разработке", {
      description: "Эта функция будет доступна в ближайшее время"
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-48 w-full">
        <img
          src={imageUrl}
          alt={title}
          onError={() => setImageError(true)}
          className={`w-full h-full object-cover transition-transform duration-500 hover:scale-110 ${imageError ? 'hidden' : ''}`}
        />
        {imageError && (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">{t('common.imageUnavailable')}</span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <a
          href="#"
          onClick={handleLearnMore}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Узнать больше →
        </a>
      </div>
    </div>
  );
};

const HomePage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const handleNotImplemented = () => {
    toast.info("Функционал находится в разработке", {
      description: "Эта функция будет доступна в ближайшее время"
    });
  };

  const handleNavigateToHotels = () => {
    navigate('/hotels');
  };

  const handleNavigateToMap = () => {
    navigate('/map');
  };

  const attractions = [
    {
      title: "Кафедральный собор",
      description: "Исторический архитектурный памятник XIV века, символ города. Здесь находится могила Иммануила Канта и музей с органным залом.",
      imageUrl: "/images/attractions/cathedral.jpg"
    },
    {
      title: "Музей янтаря",
      description: "Уникальный музей, расположенный в крепостной башне середины XIX века. Представлена богатая коллекция изделий из янтаря.",
      imageUrl: "/images/attractions/amber-museum.jpg"
    },
    {
      title: "Рыбная деревня",
      description: "Современный этнографический и торгово-ремесленный центр, стилизованный под архитектуру довоенного Кёнигсберга.",
      imageUrl: "/images/attractions/fishing-village.jpg"
    },
    {
      title: "Фридландские ворота",
      description: "Одни из семи сохранившихся городских ворот Кёнигсберга. Построены в неоготическом стиле, сейчас здесь располагается исторический музей.",
      imageUrl: "/images/attractions/friedland-gates.png"
    },
    {
      title: "Королевские ворота",
      description: "Одни из главных городских ворот старого Кёнигсберга, построенные в неоготическом стиле. Сегодня здесь находится историко-культурный центр.",
      imageUrl: "/images/attractions/royal-gates.jpg"
    },
    {
      title: "Куршская коса",
      description: "Уникальный природный заповедник, включенный в список Всемирного наследия ЮНЕСКО. Песчаная коса между Балтийским морем и Куршским заливом.",
      imageUrl: "/images/attractions/kurshskaya-kosa.jpg"
    }
  ];

  return (
    <Layout>
      <PageTransition>
        <div className="relative bg-gray-900 h-[60vh]">
          <div className="absolute inset-0">
            <img
              src="/images/attractions/hero-cathedral.jpg"
              alt="Добро пожаловать в Калининград"
              className="w-full h-full object-cover opacity-60"
            />
          </div>
          <div className="relative h-full flex items-center justify-center text-center">
            <div className="max-w-4xl px-4">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Добро пожаловать в Калининград
              </h1>
              <p className="text-xl md:text-2xl text-white mb-8">
                Откройте для себя уникальный город, где встречаются история и современность, где каждая улица хранит свои тайны, а янтарное побережье манит своей красотой
              </p>
              <button 
                onClick={handleNotImplemented}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition-colors"
              >
                Исследовать
              </button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-center mb-12">
            Главные достопримечательности
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {attractions.map((attraction) => (
              <AttractionCard
                key={attraction.title}
                title={attraction.title}
                description={attraction.description}
                imageUrl={attraction.imageUrl}
              />
            ))}
          </div>
        </div>

        <div className="bg-gray-100 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Планируйте свое путешествие</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={handleNavigateToHotels}
                className="material-button material-button-primary"
              >
                Найти отель
              </button>
              <button
                onClick={handleNavigateToMap}
                className="material-button material-button-primary"
              >
                Открыть карту
              </button>
            </div>
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
};

export default HomePage;
