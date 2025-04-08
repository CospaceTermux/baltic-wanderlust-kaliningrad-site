
import React from 'react';
import Hero from '@/components/Hero';
import Layout from '@/components/Layout';
import FeaturedCard from '@/components/FeaturedCard';
import HotelSearchForm from '@/components/HotelSearchForm';
import { useLanguage } from '@/context/LanguageContext';

const HomePage: React.FC = () => {
  const { t } = useLanguage();
  
  const featuredAttractions = [
    {
      title: t('home.attractions.gates'),
      description: t('home.attractions.gates.description'),
      image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=800&q=60",
      link: "/"
    },
    {
      title: t('home.attractions.cathedral'),
      description: t('home.attractions.cathedral.description'),
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=60",
      link: "/"
    },
    {
      title: t('home.attractions.amber'),
      description: t('home.attractions.amber.description'),
      image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=800&q=60",
      link: "/"
    }
  ];

  return (
    <Layout>
      <Hero
        title={t('home.title')}
        subtitle={t('home.subtitle')}
        backgroundImage="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=2070&q=80"
        height="large"
      />

      <section className="page-section">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t('home.explore')}</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            {t('home.about.text')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredAttractions.map((attraction, index) => (
            <FeaturedCard
              key={index}
              title={attraction.title}
              description={attraction.description}
              image={attraction.image}
              link={attraction.link}
            />
          ))}
        </div>
      </section>

      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className="text-3xl font-bold mb-6">{t('home.find.stay')}</h2>
              <p className="text-lg text-gray-700 mb-6">
                {t('home.find.stay.description')}
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-primary-700 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">✓</div>
                  <p>{t('home.find.stay.option1')}</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary-700 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">✓</div>
                  <p>{t('home.find.stay.option2')}</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary-700 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">✓</div>
                  <p>{t('home.find.stay.option3')}</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary-700 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">✓</div>
                  <p>{t('home.find.stay.option4')}</p>
                </li>
              </ul>
              <a href="/hotels" className="material-button material-button-primary inline-block mt-8">
                {t('home.browse.hotels')}
              </a>
            </div>
            <div>
              <HotelSearchForm />
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t('home.events')}</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            {t('home.events.description')}
          </p>
        </div>

        <div className="space-y-6">
          {[
            {
              title: t('home.events.cityDay'),
              date: t('home.events.cityDay.date'),
              description: t('home.events.cityDay.description')
            },
            {
              title: t('home.events.amberFest'),
              date: t('home.events.amberFest.date'),
              description: t('home.events.amberFest.description')
            },
            {
              title: t('home.events.jazzFest'),
              date: t('home.events.jazzFest.date'),
              description: t('home.events.jazzFest.description')
            }
          ].map((event, index) => (
            <div key={index} className="material-card p-6">
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <h3 className="text-xl font-medium mb-2">{event.title}</h3>
                  <p className="text-gray-600">{event.description}</p>
                </div>
                <div className="md:text-right mt-4 md:mt-0">
                  <div className="inline-block bg-secondary-100 text-secondary-800 px-4 py-2 rounded font-medium">
                    {event.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
