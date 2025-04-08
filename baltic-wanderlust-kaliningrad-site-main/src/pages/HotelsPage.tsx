
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import HotelSearchForm from '@/components/HotelSearchForm';
import HotelCard from '@/components/HotelCard';
import { useLanguage } from '@/context/LanguageContext';

const HotelsPage = () => {
  const [filter, setFilter] = useState('all');
  const { t } = useLanguage();
  
  const hotels = [
    {
      name: t('hotels.crown'),
      image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&w=800&q=60",
      rating: 4.7,
      price: 120,
      description: t('hotels.crown.description'),
      features: [t('hotels.feature.wifi'), t('hotels.feature.spa'), t('hotels.feature.restaurant'), t('hotels.feature.seaView')],
      type: "luxury"
    },
    {
      name: t('hotels.inn'),
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=60",
      rating: 4.3,
      price: 85,
      description: t('hotels.inn.description'),
      features: [t('hotels.feature.wifi'), t('hotels.feature.historic'), t('hotels.feature.central')],
      type: "boutique"
    },
    {
      name: t('hotels.plaza'),
      image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=800&q=60",
      rating: 4.5,
      price: 95,
      description: t('hotels.plaza.description'),
      features: [t('hotels.feature.wifi'), t('hotels.feature.fitness'), t('hotels.feature.business'), t('hotels.feature.restaurant')],
      type: "business"
    },
    {
      name: t('hotels.victory'),
      image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=800&q=60",
      rating: 4.0,
      price: 70,
      description: t('hotels.victory.description'),
      features: [t('hotels.feature.wifi'), t('hotels.feature.central'), t('hotels.feature.breakfast')],
      type: "standard"
    },
    {
      name: t('hotels.hostel'),
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=60",
      rating: 4.1,
      price: 25,
      description: t('hotels.hostel.description'),
      features: [t('hotels.feature.wifi'), t('hotels.feature.kitchen'), t('hotels.feature.common')],
      type: "budget"
    }
  ];

  const filteredHotels = filter === 'all' ? hotels : hotels.filter(hotel => hotel.type === filter);

  const hotelTypes = {
    'all': t('hotels.type.all'),
    'luxury': t('hotels.type.luxury'),
    'boutique': t('hotels.type.boutique'),
    'business': t('hotels.type.business'),
    'standard': t('hotels.type.standard'),
    'budget': t('hotels.type.budget')
  };

  return (
    <Layout>
      <Hero
        title={t('hotels.title')}
        subtitle={t('hotels.subtitle')}
        backgroundImage="https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&w=2070&q=80"
        height="medium"
      />
      
      <section className="page-section">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <HotelSearchForm />
              
              <div className="material-card p-6 mt-8">
                <h3 className="text-lg font-medium mb-4">{t('hotels.filterType')}</h3>
                <div className="space-y-2">
                  {Object.keys(hotelTypes).map((type) => (
                    <div key={type} className="flex items-center">
                      <input
                        type="radio"
                        id={type}
                        name="hotel-type"
                        checked={filter === type}
                        onChange={() => setFilter(type)}
                        className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                      />
                      <label htmlFor={type} className="ml-2">
                        {hotelTypes[type]}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-medium">
                {filter === 'all' ? t('hotels.all') : t(`hotels.type.${filter}`)}
              </h2>
              <div className="text-gray-600">
                {filteredHotels.length} {filteredHotels.length === 1 ? t('hotels.result') : t('hotels.results')}
              </div>
            </div>
            
            <div className="space-y-6">
              {filteredHotels.map((hotel, index) => (
                <HotelCard
                  key={index}
                  name={hotel.name}
                  image={hotel.image}
                  rating={hotel.rating}
                  price={hotel.price}
                  description={hotel.description}
                  features={hotel.features}
                />
              ))}
              
              {filteredHotels.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-600">{t('hotels.noResults')}</p>
                  <button 
                    className="material-button material-button-primary mt-4"
                    onClick={() => setFilter('all')}
                  >
                    {t('hotels.viewAll')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HotelsPage;
