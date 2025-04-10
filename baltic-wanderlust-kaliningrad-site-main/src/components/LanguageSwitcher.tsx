import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const LanguageSwitcher: React.FC<{ isScrolled?: boolean }> = ({ isScrolled = false }) => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1">
        <Globe size={18} className={`${isScrolled ? 'text-gray-800' : 'text-white'}`} />
        <span className={`${isScrolled ? 'text-gray-800' : 'text-white'} text-sm hidden sm:block`}>
          {t('language')}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className={language === 'ru' ? 'bg-accent text-accent-foreground' : ''}
          onClick={() => setLanguage('ru')}
        >
          {t('language.ru')}
        </DropdownMenuItem>
        <DropdownMenuItem
          className={language === 'en' ? 'bg-accent text-accent-foreground' : ''}
          onClick={() => setLanguage('en')}
        >
          {t('language.en')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
