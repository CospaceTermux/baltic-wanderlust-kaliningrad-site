import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import NewsCard from '@/components/NewsCard';
import { useLanguage } from '@/context/LanguageContext';
import { useData } from '@/context/DataContext';
import PageTransition from '@/components/PageTransition';

const NewsPage = () => {
  const { t } = useLanguage();
  const { news } = useData();
  
  // Фильтруем только опубликованные новости
  const publishedNews = news.filter(item => item.isPublished);

  return (
    <Layout>
      <PageTransition>
        <Hero
          title={t('news.title')}
          subtitle={t('news.subtitle')}
          backgroundImage="/images/attractions/hero-cathedral.jpg"
          height="medium"
        />
        
        <section className="page-section">
          <div className="space-y-8">
            {publishedNews.map((item) => (
              <NewsCard 
                key={item.id}
                title={item.title}
                date={new Date(item.date).toLocaleDateString()}
                summary={item.content}
                image={item.imageUrl}
                link="#"
              />
            ))}
            
            {publishedNews.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">{t('news.noResults')}</p>
              </div>
            )}
          </div>
        </section>
      </PageTransition>
    </Layout>
  );
};

export default NewsPage;
