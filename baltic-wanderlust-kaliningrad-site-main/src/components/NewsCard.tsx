
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface NewsCardProps {
  title: string;
  date: string;
  summary: string;
  image: string;
  link: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, date, summary, image, link }) => {
  const { t } = useLanguage();
  
  return (
    <div className="material-card flex flex-col md:flex-row overflow-hidden">
      <div className="md:w-1/3">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 md:w-2/3">
        <div className="text-sm text-gray-500 mb-2">{date}</div>
        <h3 className="text-xl font-medium mb-3">{title}</h3>
        <p className="text-gray-600 mb-4">{summary}</p>
        <a 
          href={link} 
          className="material-button material-button-primary inline-block"
        >
          {t('common.learnMore')}
        </a>
      </div>
    </div>
  );
};

export default NewsCard;
