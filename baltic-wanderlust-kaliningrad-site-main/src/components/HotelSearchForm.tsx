
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const HotelSearchForm = () => {
  const { t } = useLanguage();
  
  return (
    <div className="material-card p-6">
      <h3 className="text-xl font-medium mb-4">{t('hotelSearch.title')}</h3>
      <form className="space-y-4">
        <div>
          <label className="block mb-1 text-gray-700">{t('hotelSearch.destination')}</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            defaultValue="Kaliningrad"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-gray-700">{t('hotelSearch.checkIn')}</label>
            <input type="date" className="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">{t('hotelSearch.checkOut')}</label>
            <input type="date" className="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-gray-700">{t('hotelSearch.guests')}</label>
            <select className="w-full border border-gray-300 rounded px-3 py-2">
              <option>1 {t('hotelSearch.guest')}</option>
              <option>2 {t('hotelSearch.guestsPlural')}</option>
              <option>3 {t('hotelSearch.guestsPlural')}</option>
              <option>4+ {t('hotelSearch.guestsPlural')}</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 text-gray-700">{t('hotelSearch.rooms')}</label>
            <select className="w-full border border-gray-300 rounded px-3 py-2">
              <option>1 {t('hotelSearch.room')}</option>
              <option>2 {t('hotelSearch.roomsPlural')}</option>
              <option>3+ {t('hotelSearch.roomsPlural')}</option>
            </select>
          </div>
        </div>
        <button 
          type="submit" 
          className="material-button material-button-primary w-full"
        >
          {t('hotelSearch.search')}
        </button>
      </form>
    </div>
  );
};

export default HotelSearchForm;
