import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import HotelSearchForm from '@/components/HotelSearchForm';
import HotelCard from '@/components/HotelCard';
import { useLanguage } from '@/context/LanguageContext';
import { useData } from '@/context/DataContext';
import { Hotel } from '@/types';
import PageTransition from '@/components/PageTransition';

const HotelsPage = () => {
  const [filter, setFilter] = useState<'all' | Hotel['type']>('all');
  const { t } = useLanguage();
  const { hotels } = useData();
  
  const hotelTypes: Record<'all' | Hotel['type'], string> = {
    'all': t('hotels.type.all'),
    'luxury': t('hotels.type.luxury'),
    'boutique': t('hotels.type.boutique'),
    'business': t('hotels.type.business'),
    'budget': t('hotels.type.budget')
  };

  const filteredHotels = filter === 'all' ? hotels : hotels.filter(hotel => hotel.type === filter);

  return (
    <Layout>
      <PageTransition>
        <Hero
          title={t('hotels.title')}
          subtitle={t('hotels.subtitle')}
          backgroundImage="/images/attractions/hero-cathedral.jpg"
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
                    {(Object.keys(hotelTypes) as Array<keyof typeof hotelTypes>).map((type) => (
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
                {filteredHotels.map((hotel) => (
                  <HotelCard
                    key={hotel.id}
                    name={hotel.name}
                    image={hotel.imageUrl}
                    rating={hotel.rating}
                    price={hotel.price}
                    description={hotel.description}
                    features={hotel.amenities}
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
      </PageTransition>
    </Layout>
  );
};

export default HotelsPage;
