import React, { useState } from 'react';
import { Hotel } from '@/types';
import ImageUpload from './ImageUpload';

interface HotelFormProps {
  onSubmit: (hotel: Omit<Hotel, 'id'>) => void;
  initialData?: Hotel;
}

export default function HotelForm({ onSubmit, initialData }: HotelFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    address: initialData?.address || '',
    price: initialData?.price?.toString() || '',
    rating: initialData?.rating || 0,
    imageUrl: initialData?.imageUrl || '',
    amenities: initialData?.amenities || [],
    type: initialData?.type || 'standard',
    coordinates: initialData?.coordinates || { lat: 0, lng: 0 }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAmenitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(value)
        ? prev.amenities.filter(item => item !== value)
        : [...prev.amenities, value]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      price: parseFloat(formData.price),
      rating: parseFloat(formData.rating.toString())
    };
    onSubmit(submissionData);
  };

  const handleImageUpload = (imageUrl: string) => {
    setFormData(prev => ({ ...prev, imageUrl }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Название</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Описание</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={4}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Адрес</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Цена</label>
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Рейтинг</label>
        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          min="0"
          max="5"
          step="0.1"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Тип отеля</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="luxury">Люкс</option>
          <option value="boutique">Бутик-отель</option>
          <option value="business">Бизнес</option>
          <option value="standard">Стандарт</option>
          <option value="budget">Эконом</option>
        </select>
      </div>

      <ImageUpload onImageUpload={handleImageUpload} />

      {formData.imageUrl && (
        <div className="mt-2">
          <img
            src={formData.imageUrl}
            alt="Preview"
            className="h-32 w-auto object-cover rounded-md"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Удобства</label>
        <div className="mt-2 space-y-2">
          {['Wi-Fi', 'Парковка', 'Спа', 'Ресторан', 'Фитнес-центр', 'Бассейн'].map((amenity) => (
            <div key={amenity} className="flex items-center">
              <input
                type="checkbox"
                value={amenity}
                checked={formData.amenities.includes(amenity)}
                onChange={handleAmenitiesChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-700">{amenity}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {initialData ? 'Обновить' : 'Добавить'} отель
        </button>
      </div>
    </form>
  );
} 