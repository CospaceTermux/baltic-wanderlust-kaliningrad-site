import React from 'react';
import { Toaster } from "../components/ui/sonner";
import Navigation from './Navigation';
import { useLanguage } from '../context/LanguageContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
      <footer className="bg-primary-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-medium mb-4">{t('footer.discover')}</h3>
              <p className="text-gray-300">{t('footer.discover.text')}</p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-4">{t('footer.links')}</h3>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-300 hover:text-white">{t('nav.home')}</a></li>
                <li><a href="/news" className="text-gray-300 hover:text-white">{t('nav.news')}</a></li>
                <li><a href="/map" className="text-gray-300 hover:text-white">{t('nav.map')}</a></li>
                <li><a href="/hotels" className="text-gray-300 hover:text-white">{t('nav.hotels')}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-4">{t('footer.contact')}</h3>
              <p className="text-gray-300">{t('footer.contact.office')}</p>
              <p className="text-gray-300">{t('footer.contact.address')}</p>
              <p className="text-gray-300">{t('footer.contact.country')}</p>
              <p className="text-gray-300 mt-2">info@visitkaliningrad.ru</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Kaliningrad Tourism Portal. {t('footer.rights')}</p>
          </div>
        </div>
      </footer>
      <Toaster />
    </div>
  );
};

export default Layout;
