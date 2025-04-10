import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import SimpleMap from '@/components/SimpleMap';
import { useLanguage } from '@/context/LanguageContext';
import { toast } from "sonner";
import PageTransition from '@/components/PageTransition';

const MapPage = () => {
  const { t } = useLanguage();
  
  const handleDownload = () => {
    toast.info("Функционал находится в разработке", {
      description: "Скачивание карты будет доступно в ближайшее время"
    });
  };

  const attractions = [
    {
      name: t('map.cathedral'),
      description: t('map.cathedral.description'),
      address: t('map.cathedral.address'),
      category: t('map.category.cultural')
    },
    {
      name: t('map.amber'),
      description: t('map.amber.description'),
      address: t('map.amber.address'),
      category: t('map.category.museum')
    },
    {
      name: t('map.gate'),
      description: t('map.gate.description'),
      address: t('map.gate.address'),
      category: t('map.category.landmarks')
    },
    {
      name: t('map.square'),
      description: t('map.square.description'),
      address: t('map.square.address'),
      category: t('map.category.publicSpace')
    },
    {
      name: t('map.ocean'),
      description: t('map.ocean.description'),
      address: t('map.ocean.address'),
      category: t('map.category.museum')
    }
  ];

  return (
    <Layout>
      <PageTransition>
        <Hero
          title={t('map.title')}
          subtitle={t('map.subtitle')}
          backgroundImage="/images/attractions/hero-cathedral.jpg"
          height="medium"
        />
        
        <section className="page-section">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <SimpleMap />
            </div>
            
            <div>
              <div className="material-card p-6">
                <h2 className="text-2xl font-medium mb-4">{t('map.topAttractions')}</h2>
                <div className="space-y-4">
                  {attractions.map((attraction, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                      <h3 className="text-lg font-medium mb-1">{attraction.name}</h3>
                      <p className="text-gray-600 text-sm mb-1">{attraction.description}</p>
                      <p className="text-gray-500 text-sm">{attraction.address}</p>
                      <div className="mt-2">
                        <span className="inline-block bg-primary-100 text-primary-800 px-2 py-1 rounded text-xs">
                          {attraction.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <button 
                    onClick={handleDownload}
                    className="material-button material-button-primary w-full"
                  >
                    {t('map.download')}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12">
            <h2 className="text-2xl font-medium mb-6">{t('map.districts')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: t('map.district.center'),
                  description: t('map.district.center.description'),
                  image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=60"
                },
                {
                  name: t('map.district.amalienau'),
                  description: t('map.district.amalienau.description'),
                  image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=800&q=60"
                },
                {
                  name: t('map.district.fishing'),
                  description: t('map.district.fishing.description'),
                  image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=800&q=60"
                },
                {
                  name: t('map.district.svetlogorsk'),
                  description: t('map.district.svetlogorsk.description'),
                  image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&w=800&q=60"
                }
              ].map((district, index) => (
                <div key={index} className="material-card overflow-hidden">
                  <div className="h-48">
                    <img 
                      src={district.image} 
                      alt={district.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium mb-2">{district.name}</h3>
                    <p className="text-gray-600 text-sm">{district.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </PageTransition>
    </Layout>
  );
};

export default MapPage;
