import React from 'react';

interface AttractionCard {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

const attractions: AttractionCard[] = [
  {
    id: 'royal-gates',
    title: 'Королевские ворота',
    description: 'Одни из семи сохранившихся городских ворот Калининграда, построенные в неоготическом стиле в середине 19-го века',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Königstor_Kaliningrad.jpg/1280px-Königstor_Kaliningrad.jpg'
  },
  {
    id: 'cathedral',
    title: 'Кафедральный собор',
    description: 'Исторический кафедральный собор 14-го века на острове Канта',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Königsberg_Cathedral_2021.jpg/1280px-Königsberg_Cathedral_2021.jpg'
  },
  {
    id: 'amber-museum',
    title: 'Музей янтаря',
    description: 'Музей с экспозицией изделий из балтийского янтаря и уникальной коллекцией',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Башня_Дона_в_Калининграде.jpg/1280px-Башня_Дона_в_Калининграде.jpg'
  },
  {
    id: 'fishing-village',
    title: 'Рыбная деревня',
    description: 'Современный этнографический и торгово-ремесленный центр, стилизованный под архитектуру довоенного Кёнигсберга',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Рыбная_деревня_в_Калининграде.jpg/1280px-Рыбная_деревня_в_Калининграде.jpg'
  },
  {
    id: 'kurshskaya-kosa',
    title: 'Куршская коса',
    description: 'Уникальный природный заповедник, включенный в список Всемирного наследия ЮНЕСКО',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Curonian_Spit_NP_02.jpg/1280px-Curonian_Spit_NP_02.jpg'
  },
  {
    id: 'friedland-gates',
    title: 'Фридландские ворота',
    description: 'Одни из семи сохранившихся городских ворот Калининграда, построенные в середине XIX века',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Friedland_Gate_in_Kaliningrad.jpg/1280px-Friedland_Gate_in_Kaliningrad.jpg'
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero section */}
      <div className="relative bg-gray-900 h-[60vh]">
        <div className="absolute inset-0">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Кафедральный_собор_в_Калининграде.jpg/1280px-Кафедральный_собор_в_Калининграде.jpg"
            alt="Калининград"
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Добро пожаловать в Калининград
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl">
            Откройте для себя уникальный город, где встречаются история и современность, 
            где каждая улица хранит свои тайны, а янтарное побережье манит своей красотой
          </p>
        </div>
      </div>

      {/* Attractions section */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
          Главные достопримечательности
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {attractions.map((attraction) => (
            <div
              key={attraction.id}
              className="relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-48 w-full relative">
                <img
                  src={attraction.imageUrl}
                  alt={attraction.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {attraction.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {attraction.description}
                </p>
                <a 
                  href={`/attractions/${attraction.id}`}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Узнать больше
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to action section */}
      <div className="bg-blue-700 mt-12">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Готовы к путешествию?</span>
            <span className="block text-blue-200">Исследуйте все возможности нашего города.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="/hotels"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50"
              >
                Найти отель
              </a>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="/map"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900"
              >
                Открыть карту
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
