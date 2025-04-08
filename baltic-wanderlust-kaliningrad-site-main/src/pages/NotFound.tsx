
import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import { useLanguage } from '@/context/LanguageContext';

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md p-8 material-card">
          <h1 className="text-6xl font-bold text-primary-700 mb-6">404</h1>
          <p className="text-xl text-gray-800 mb-6">{t('notFound.title')}</p>
          <p className="text-gray-600 mb-8">
            {t('notFound.description')}
          </p>
          <a 
            href="/" 
            className="material-button material-button-primary inline-block"
          >
            {t('notFound.return')}
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
