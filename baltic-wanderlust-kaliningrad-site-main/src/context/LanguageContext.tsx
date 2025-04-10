import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ru' | 'en';

type TranslationKey = keyof typeof translations.ru;

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
}

// Default to Russian
const defaultLanguage: Language = 'ru';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations = {
  ru: {
    // Navigation
    'nav.home': 'Главная',
    'nav.news': 'Новости',
    'nav.map': 'Карта города',
    'nav.hotels': 'Отели',
    
    // Common UI Elements
    'common.learnMore': 'Узнать больше',
    'common.imageUnavailable': 'Изображение недоступно',
    
    // Home Page
    'home.title': 'Добро пожаловать в Калининград',
    'home.subtitle': 'Откройте для себя уникальный город, где встречаются история и современность, где каждая улица хранит свои тайны, а янтарное побережье манит своей красотой',
    'home.explore': 'Исследовать',
    'home.about': 'О городе',
    'home.about.text': 'Калининград — самый западный город России, расположенный на побережье Балтийского моря. Бывший Кёнигсберг сочетает в себе богатую историю, уникальную архитектуру и морское очарование.',
    'home.attractions': 'Главные достопримечательности',
    'home.attractions.gates': 'Королевские ворота',
    'home.attractions.gates.description': 'Одни из семи сохранившихся городских ворот Калининграда, построенные в неоготическом стиле в середине 19-го века',
    'home.attractions.cathedral': 'Кафедральный собор',
    'home.attractions.cathedral.description': 'Исторический кафедральный собор 14-го века на острове Канта',
    'home.attractions.amber': 'Музей янтаря',
    'home.attractions.amber.description': 'Музей с экспозицией изделий из балтийского янтаря и уникальной коллекцией',
    'home.attractions.fishingVillage': 'Рыбная деревня',
    'home.attractions.fishingVillage.description': 'Современный этнографический и торгово-ремесленный центр, стилизованный под архитектуру довоенного Кёнигсберга',
    'home.attractions.curonian': 'Куршская коса',
    'home.attractions.curonian.description': 'Уникальный природный заповедник, включенный в список Всемирного наследия ЮНЕСКО',
    'home.attractions.friedland': 'Фридландские ворота',
    'home.attractions.friedland.description': 'Одни из семи сохранившихся городских ворот Калининграда, построенные в середине XIX века',
    'home.find.stay': 'Найдите идеальное место для проживания',
    'home.find.stay.description': 'От роскошных отелей на берегу моря до уютных квартир в центре города - Калининград предлагает варианты размещения для любого путешественника и бюджета.',
    'home.find.stay.option1': 'Курорты на побережье Балтийского моря',
    'home.find.stay.option2': 'Бутик-отели в историческом центре',
    'home.find.stay.option3': 'Семейные отели со всеми удобствами',
    'home.find.stay.option4': 'Бюджетные хостелы для путешественников',
    'home.browse.hotels': 'Просмотреть все отели',
    'home.events': 'Предстоящие события',
    'home.events.description': 'Познакомьтесь с яркой культурой и праздниками Калининграда в течение всего года.',
    'home.events.cityDay': 'День города Калининграда',
    'home.events.cityDay.date': '4-5 июля 2025',
    'home.events.cityDay.description': 'Ежегодное празднование основания города с концертами, парадами и фейерверками.',
    'home.events.amberFest': 'Фестиваль янтаря',
    'home.events.amberFest.date': '15-18 августа 2025',
    'home.events.amberFest.description': 'Выставка изделий из янтаря, мастер-классы по изготовлению украшений и выставки.',
    'home.events.jazzFest': 'Международный джазовый фестиваль',
    'home.events.jazzFest.date': '3-7 сентября 2025',
    'home.events.jazzFest.description': 'Выступления признанных джазовых музыкантов со всего мира на различных площадках.',
    
    // News Page
    'news.title': 'Последние новости',
    'news.subtitle': 'Будьте в курсе последних событий в Калининграде',
    'news.loadMore': 'Загрузить больше новостей',
    'news.noResults': 'Новости не найдены',
    'news.flight': 'Объявлены новые международные авиарейсы в Калининград',
    'news.flight.date': '5 апреля 2025',
    'news.flight.summary': 'С следующего месяца авиакомпании добавят прямые рейсы из Берлина, Варшавы и Стокгольма в Калининград, что облегчит европейским туристам визит в российский анклав.',
    'news.museum': 'В Музее Мирового океана открылась новая выставка',
    'news.museum.date': '28 марта 2025',
    'news.museum.summary': 'Новая выставка музея "Балтийские сокровища" представляет подводные археологические находки из Балтийского моря, включая артефакты с кораблекрушений 17-го века.',
    'news.app': 'Запущено приложение для пешеходных туров по историческому Кёнигсбергу',
    'news.app.date': '15 марта 2025',
    'news.app.summary': 'Новое мобильное приложение теперь позволяет туристам совершать самостоятельные пешеходные экскурсии по Калининграду, с акцентом на исторические места бывшего прусского города Кёнигсберга.',
    'news.amber': 'Объявлены даты ежегодного фестиваля янтаря',
    'news.amber.date': '20 февраля 2025',
    'news.amber.summary': 'Организаторы знаменитого Калининградского фестиваля янтаря объявили, что в этом году мероприятие пройдет с 15 по 18 августа, с участием мастеров со всего Балтийского региона.',
    
    // Map Page
    'map.title': 'Исследуйте Калининград',
    'map.subtitle': 'Ориентируйтесь среди главных достопримечательностей и скрытых жемчужин города',
    'map.topAttractions': 'Главные достопримечательности',
    'map.download': 'Скачать полный путеводитель по городу',
    'map.districts': 'Откройте для себя районы Калининграда',
    'map.cathedral': 'Кафедральный собор Кёнигсберга',
    'map.cathedral.description': 'Исторический кафедральный собор 14-го века на острове Канта',
    'map.cathedral.address': 'Остров Канта, Калининград, Россия',
    'map.amber': 'Музей янтаря',
    'map.amber.description': 'Музей с экспозицией изделий из балтийского янтаря',
    'map.amber.address': 'Площадь маршала Василевского, 1, Калининград, Россия',
    'map.gate': 'Королевские ворота',
    'map.gate.description': 'Исторические крепостные ворота, построенные в 19 веке',
    'map.gate.address': 'Королевские ворота, ул. Фрунзе, Калининград, Россия',
    'map.square': 'Площадь Победы',
    'map.square.description': 'Центральная площадь с Кафедральным собором Христа Спасителя',
    'map.square.address': 'Площадь Победы, Калининград, Россия',
    'map.ocean': 'Музей Мирового океана',
    'map.ocean.description': 'Морской музей с судами и выставками',
    'map.ocean.address': 'Набережная Петра Великого, 1, Калининград, Россия',
    'map.category.cultural': 'Культурный',
    'map.category.museum': 'Музей',
    'map.category.landmarks': 'Достопримечательности',
    'map.category.publicSpace': 'Общественное пространство',
    'map.district.center': 'Исторический центр',
    'map.district.center.description': 'Сердце города с историческими зданиями и соборами',
    'map.district.amalienau': 'Амалиенау',
    'map.district.amalienau.description': 'Бывший немецкий квартал с красивыми довоенными виллами',
    'map.district.fishing': 'Рыбная деревня',
    'map.district.fishing.description': 'Реконструированный квартал с традиционной архитектурой',
    'map.district.svetlogorsk': 'Светлогорск',
    'map.district.svetlogorsk.description': 'Прибрежный курортный город рядом с Калининградом',
    
    // Hotels Page
    'hotels.title': 'Забронируйте проживание',
    'hotels.subtitle': 'Найдите идеальное жилье для вашего визита в Калининград',
    'hotels.filterType': 'Фильтровать по типу',
    'hotels.all': 'Все отели',
    'hotels.result': 'результат',
    'hotels.results': 'результатов',
    'hotels.noResults': 'Отели по вашим критериям не найдены.',
    'hotels.viewAll': 'Посмотреть все отели',
    'hotels.type.all': 'Все типы',
    'hotels.type.luxury': 'Люкс',
    'hotels.type.boutique': 'Бутик',
    'hotels.type.business': 'Бизнес',
    'hotels.type.standard': 'Стандарт',
    'hotels.type.budget': 'Бюджетный',
    'hotels.crown': 'Отель Балтийская корона',
    'hotels.crown.description': 'Роскошный отель на берегу моря с спа-услугами и панорамными видами на Балтийское море. Расположен в центре Калининграда.',
    'hotels.inn': 'Гостиница Кёнигсберг',
    'hotels.inn.description': 'Очаровательный бутик-отель в восстановленном здании 19-го века, в пешей доступности от главных достопримечательностей.',
    'hotels.plaza': 'Янтарная Плаза',
    'hotels.plaza.description': 'Современный отель с просторными номерами и фитнес-центром. Рядом с торговыми центрами и деловыми районами.',
    'hotels.victory': 'Отель Площадь Победы',
    'hotels.victory.description': 'Комфортабельный отель, расположенный около площади Победы, с легким доступом к общественному транспорту.',
    'hotels.hostel': 'Балтийский хостел',
    'hotels.hostel.description': 'Бюджетный хостел с частными и общими комнатами. Популярен среди путешественников и одиночных туристов.',
    'hotels.feature.wifi': 'Бесплатный WiFi',
    'hotels.feature.spa': 'Спа',
    'hotels.feature.restaurant': 'Ресторан',
    'hotels.feature.seaView': 'Вид на море',
    'hotels.feature.historic': 'Историческое здание',
    'hotels.feature.central': 'Центральное расположение',
    'hotels.feature.fitness': 'Фитнес-центр',
    'hotels.feature.business': 'Бизнес-центр',
    'hotels.feature.breakfast': 'Завтрак включен',
    'hotels.feature.kitchen': 'Общая кухня',
    'hotels.feature.common': 'Общая зона',
    
    // Hotel Search Form
    'hotelSearch.title': 'Поиск отелей',
    'hotelSearch.destination': 'Направление',
    'hotelSearch.checkIn': 'Дата заезда',
    'hotelSearch.checkOut': 'Дата выезда',
    'hotelSearch.guests': 'Гости',
    'hotelSearch.guest': 'гость',
    'hotelSearch.guestsPlural': 'гостя',
    'hotelSearch.rooms': 'Номера',
    'hotelSearch.room': 'номер',
    'hotelSearch.roomsPlural': 'номера',
    'hotelSearch.search': 'Поиск отелей',
    
    // 404 Page
    'notFound.title': 'Ой! Мы не смогли найти эту страницу.',
    'notFound.description': 'Страница, которую вы ищете, возможно, была удалена, изменила название или временно недоступна.',
    'notFound.return': 'Вернуться на главную',
    
    // Footer
    'footer.discover': 'Откройте для себя Калининград',
    'footer.discover.text': 'Познакомьтесь с уникальным сочетанием европейской и российской культуры в этом историческом балтийском городе.',
    'footer.links': 'Быстрые ссылки',
    'footer.contact': 'Контакты',
    'footer.contact.office': 'Туристический офис Калининграда',
    'footer.contact.address': 'Площадь Победы, Калининград',
    'footer.contact.country': 'Россия, 236022',
    'footer.rights': 'Все права защищены.',
    
    // Language Switcher
    'language': 'Язык',
    'language.ru': 'Русский',
    'language.en': 'Английский',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.news': 'News',
    'nav.map': 'City Map',
    'nav.hotels': 'Hotels',
    
    // Common UI Elements
    'common.learnMore': 'Learn More',
    'common.imageUnavailable': 'Image Unavailable',
    
    // Home Page
    'home.title': 'Welcome to Kaliningrad',
    'home.subtitle': 'Discover a unique city where history meets modernity, where every street holds its secrets, and the amber coast beckons with its beauty',
    'home.explore': 'Explore',
    'home.about': 'About the City',
    'home.about.text': "Kaliningrad is Russia's westernmost city, located on the Baltic Sea coast. The former Königsberg combines rich history, unique architecture and maritime charm.",
    'home.attractions': 'Main Attractions',
    'home.attractions.gates': "King's Gate",
    'home.attractions.gates.description': "One of Kaliningrad's seven surviving city gates, built in Neo-Gothic style in the mid-19th century",
    'home.attractions.cathedral': 'Cathedral',
    'home.attractions.cathedral.description': '14th-century historic cathedral on Kant Island',
    'home.attractions.amber': 'Amber Museum',
    'home.attractions.amber.description': 'Museum featuring Baltic amber artifacts and a unique collection',
    'home.attractions.fishingVillage': 'Fishing Village',
    'home.attractions.fishingVillage.description': 'Modern ethnographic and trade center styled after pre-war Königsberg architecture',
    'home.attractions.curonian': 'Curonian Spit',
    'home.attractions.curonian.description': 'Unique nature reserve included in the UNESCO World Heritage List',
    'home.attractions.friedland': 'Friedland Gate',
    'home.attractions.friedland.description': "One of Kaliningrad's seven surviving city gates, built in the mid-19th century",
    'home.find.stay': 'Find Your Perfect Stay',
    'home.find.stay.description': 'From luxurious waterfront hotels to cozy downtown apartments, Kaliningrad offers accommodation options for every traveler and budget.',
    'home.find.stay.option1': 'Beachfront resorts along the Baltic coast',
    'home.find.stay.option2': 'Historic downtown boutique hotels',
    'home.find.stay.option3': 'Family-friendly accommodations with amenities',
    'home.find.stay.option4': 'Budget hostels for backpackers',
    'home.browse.hotels': 'Browse All Hotels',
    'home.events': 'Upcoming Events',
    'home.events.description': 'Experience the vibrant culture and festivities that Kaliningrad has to offer throughout the year.',
    'home.events.cityDay': 'Kaliningrad City Day',
    'home.events.cityDay.date': 'July 4-5, 2025',
    'home.events.cityDay.description': "Annual celebration of the city's founding with concerts, parades, and fireworks.",
    'home.events.amberFest': 'Baltic Amber Festival',
    'home.events.amberFest.date': 'August 15-18, 2025',
    'home.events.amberFest.description': 'Showcase of amber artwork, jewelry-making workshops, and exhibitions.',
    'home.events.jazzFest': 'International Jazz Festival',
    'home.events.jazzFest.date': 'September 3-7, 2025',
    'home.events.jazzFest.description': 'Performances by acclaimed jazz musicians from around the world at various venues.',
    
    // News Page
    'news.title': 'Latest News',
    'news.subtitle': 'Stay updated with the latest happenings in Kaliningrad',
    'news.loadMore': 'Load More News',
    'news.noResults': 'No news found',
    'news.flight': 'New International Flight Routes to Kaliningrad Announced',
    'news.flight.date': 'April 5, 2025',
    'news.flight.summary': 'Starting next month, airlines will be adding direct flights from Berlin, Warsaw, and Stockholm to Kaliningrad, making it easier for European tourists to visit the Russian enclave.',
    'news.museum': "Kaliningrad's World Ocean Museum Opens New Exhibition",
    'news.museum.date': 'March 28, 2025',
    'news.museum.summary': "The museum's new 'Baltic Treasures' exhibition showcases underwater archaeological findings from the Baltic Sea, including artifacts from shipwrecks dating back to the 17th century.",
    'news.app': 'Historical Königsberg Walking Tour App Launched',
    'news.app.date': 'March 15, 2025',
    'news.app.summary': 'A new smartphone application now allows tourists to take self-guided walking tours of Kaliningrad, highlighting historical sites from its past as the Prussian city of Königsberg.',
    'news.amber': 'Annual Amber Festival Dates Announced',
    'news.amber.date': 'February 20, 2025',
    'news.amber.summary': "The organizers of Kaliningrad's famous Amber Festival have announced that this year's event will take place from August 15-18, featuring artisans from across the Baltic region.",
    
    // Map Page
    'map.title': 'Explore Kaliningrad',
    'map.subtitle': "Navigate the city's top attractions and hidden gems",
    'map.topAttractions': 'Top Attractions',
    'map.download': 'Download Full City Guide',
    'map.districts': "Discover Kaliningrad's Districts",
    'map.cathedral': 'Königsberg Cathedral',
    'map.cathedral.description': 'Historic 14th-century cathedral on Kant Island',
    'map.cathedral.address': 'Kant Island, Kaliningrad, Russia',
    'map.amber': 'Amber Museum',
    'map.amber.description': 'Museum displaying Baltic amber artifacts',
    'map.amber.address': 'Marshal Vasilevsky Square, 1, Kaliningrad, Russia',
    'map.gate': "King's Gate",
    'map.gate.description': 'Historic fortress gate built in the 19th century',
    'map.gate.address': "King's Gate, Frunze St, Kaliningrad, Russia",
    'map.square': 'Victory Square',
    'map.square.description': 'Central square with the Christ the Saviour Cathedral',
    'map.square.address': 'Victory Square, Kaliningrad, Russia',
    'map.ocean': 'World Ocean Museum',
    'map.ocean.description': 'Maritime museum with vessels and exhibitions',
    'map.ocean.address': 'Naberezhnaya Petra Velikogo, 1, Kaliningrad, Russia',
    'map.category.cultural': 'Cultural',
    'map.category.museum': 'Museum',
    'map.category.landmarks': 'Landmarks',
    'map.category.publicSpace': 'Public Space',
    'map.district.center': 'Historical Center',
    'map.district.center.description': 'The heart of the city with historic buildings and cathedrals',
    'map.district.amalienau': 'Amalienau',
    'map.district.amalienau.description': 'Former German neighborhood with beautiful pre-war villas',
    'map.district.fishing': 'Fishing Village',
    'map.district.fishing.description': 'Reconstructed quarter with traditional architecture',
    'map.district.svetlogorsk': 'Svetlogorsk',
    'map.district.svetlogorsk.description': 'Coastal resort town near Kaliningrad',
    
    // Hotels Page
    'hotels.title': 'Book Your Stay',
    'hotels.subtitle': 'Find the perfect accommodation for your visit to Kaliningrad',
    'hotels.filterType': 'Filter by Type',
    'hotels.all': 'All Hotels',
    'hotels.result': 'result',
    'hotels.results': 'results',
    'hotels.noResults': 'No hotels found matching your criteria.',
    'hotels.viewAll': 'View All Hotels',
    'hotels.type.all': 'All Types',
    'hotels.type.luxury': 'Luxury',
    'hotels.type.boutique': 'Boutique',
    'hotels.type.business': 'Business',
    'hotels.type.standard': 'Standard',
    'hotels.type.budget': 'Budget',
    'hotels.crown': 'Baltic Crown Hotel',
    'hotels.crown.description': 'Luxury waterfront hotel with spa facilities and panoramic views of the Baltic Sea. Located in the heart of Kaliningrad.',
    'hotels.inn': 'Königsberg Inn',
    'hotels.inn.description': 'Charming boutique hotel in a restored 19th-century building, within walking distance to major attractions.',
    'hotels.plaza': 'Amber Plaza',
    'hotels.plaza.description': 'Modern hotel with spacious rooms and a fitness center. Close to shopping centers and business districts.',
    'hotels.victory': 'Victory Square Hotel',
    'hotels.victory.description': 'Comfortable hotel located near Victory Square with easy access to public transportation.',
    'hotels.hostel': 'Baltic Hostel',
    'hotels.hostel.description': 'Budget-friendly hostel with private and shared rooms. Popular among backpackers and solo travelers.',
    'hotels.feature.wifi': 'Free WiFi',
    'hotels.feature.spa': 'Spa',
    'hotels.feature.restaurant': 'Restaurant',
    'hotels.feature.seaView': 'Sea View',
    'hotels.feature.historic': 'Historic Building',
    'hotels.feature.central': 'Central Location',
    'hotels.feature.fitness': 'Fitness Center',
    'hotels.feature.business': 'Business Center',
    'hotels.feature.breakfast': 'Breakfast Included',
    'hotels.feature.kitchen': 'Shared Kitchen',
    'hotels.feature.common': 'Common Area',
    
    // Hotel Search Form
    'hotelSearch.title': 'Hotel Search',
    'hotelSearch.destination': 'Destination',
    'hotelSearch.checkIn': 'Check-in Date',
    'hotelSearch.checkOut': 'Check-out Date',
    'hotelSearch.guests': 'Guests',
    'hotelSearch.guest': 'guest',
    'hotelSearch.guestsPlural': 'guests',
    'hotelSearch.rooms': 'Rooms',
    'hotelSearch.room': 'room',
    'hotelSearch.roomsPlural': 'rooms',
    'hotelSearch.search': 'Search Hotels',
    
    // 404 Page
    'notFound.title': "Oops! We couldn't find that page.",
    'notFound.description': 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.',
    'notFound.return': 'Return to Homepage',
    
    // Footer
    'footer.discover': 'Discover Kaliningrad',
    'footer.discover.text': 'Experience the unique blend of European and Russian culture in this historic Baltic city.',
    'footer.links': 'Quick Links',
    'footer.contact': 'Contact',
    'footer.contact.office': 'Kaliningrad Tourism Office',
    'footer.contact.address': 'Victory Square, Kaliningrad',
    'footer.contact.country': 'Russia, 236022',
    'footer.rights': 'All rights reserved.',
    
    // Language Switcher
    'language': 'Language',
    'language.ru': 'Russian',
    'language.en': 'English',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage && (savedLanguage === 'ru' || savedLanguage === 'en') 
      ? savedLanguage 
      : defaultLanguage;
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: TranslationKey): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
