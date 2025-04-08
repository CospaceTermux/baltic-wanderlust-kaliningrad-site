
import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import NewsCard from '@/components/NewsCard';
import { useLanguage } from '@/context/LanguageContext';

const NewsPage = () => {
  const { t } = useLanguage();
  
  const news = [
    {
      title: t('news.flight'),
      date: t('news.flight.date'),
      summary: t('news.flight.summary'),
      image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&w=800&q=60",
      link: "/"
    },
    {
      title: t('news.museum'),
      date: t('news.museum.date'),
      summary: t('news.museum.summary'),
      image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=800&q=60",
      link: "/"
    },
    {
      title: t('news.app'),
      date: t('news.app.date'),
      summary: t('news.app.summary'),
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=60",
      link: "/"
    },
    {
      title: t('news.amber'),
      date: t('news.amber.date'),
      summary: t('news.amber.summary'),
      image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=800&q=60",
      link: "/"
    }
  ];

  return (
    <Layout>
      <Hero
        title={t('news.title')}
        subtitle={t('news.subtitle')}
        backgroundImage="https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&w=2070&q=80"
        height="medium"
      />
      
      <section className="page-section">
        <div className="space-y-8">
          {news.map((item, index) => (
            <NewsCard 
              key={index}
              title={item.title}
              date={item.date}
              summary={item.summary}
              image={item.image}
              link={item.link}
            />
          ))}
        </div>
        
        <div className="mt-12 flex justify-center">
          <button className="material-button material-button-primary flex items-center">
            {t('news.loadMore')}
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default NewsPage;
