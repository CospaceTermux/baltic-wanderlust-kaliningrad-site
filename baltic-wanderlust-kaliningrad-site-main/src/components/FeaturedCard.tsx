
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface FeaturedCardProps {
  title: string;
  description: string;
  image: string;
  link?: string;
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({ title, description, image, link }) => {
  const { t } = useLanguage();
  
  const content = (
    <div className="material-card h-full overflow-hidden flex flex-col">
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 flex-1">{description}</p>
        {link && (
          <a 
            href={link} 
            className="mt-auto inline-block material-button material-button-primary self-start"
          >
            {t('common.learnMore')}
          </a>
        )}
      </div>
    </div>
  );

  if (link) {
    return <a href={link} className="block h-full no-underline text-inherit">{content}</a>;
  }

  return content;
};

export default FeaturedCard;
