import React, { useRef } from 'react';
import { useData } from '@/context/DataContext';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
}

export default function ImageUpload({ onImageUpload }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadImage } = useData();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const imageUrl = await uploadImage(file);
        onImageUpload(imageUrl);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } catch (error) {
        console.error('Ошибка при загрузке изображения:', error);
        alert('Произошла ошибка при загрузке изображения');
      }
    }
  };

  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700">Изображение</label>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mt-1 block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />
    </div>
  );
} 