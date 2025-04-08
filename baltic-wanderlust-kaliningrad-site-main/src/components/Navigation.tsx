
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.news'), path: '/news' },
    { name: t('nav.map'), path: '/map' },
    { name: t('nav.hotels'), path: '/hotels' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-elevation-2' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className={`text-2xl font-bold ${isScrolled ? 'text-primary-700' : 'text-white'}`}>
                {t('home.title')}
              </span>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                className={`transition-colors hover:text-primary-600 ${
                  isScrolled ? 'text-gray-800' : 'text-white'
                } ${isActive(link.path) ? 'border-b-2 border-secondary-500' : ''}`}
              >
                {link.name}
              </a>
            ))}
            <div className="ml-4">
              <LanguageSwitcher isScrolled={isScrolled} />
            </div>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <div className="mr-4">
              <LanguageSwitcher isScrolled={isScrolled} />
            </div>
            <button 
              onClick={toggleMobileMenu}
              className={`p-2 rounded-md ${isScrolled ? 'text-gray-800' : 'text-white'}`}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-elevation-4 animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.path}
                  href={link.path}
                  className={`block px-3 py-2 rounded-md ${
                    isActive(link.path) 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'text-gray-800 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;
