import React from 'react';
import { Star } from 'lucide-react';

interface HotelCardProps {
  name: string;
  image: string;
  rating: number;
  price: number;
  description: string;
  features: string[];
}

const HotelCard: React.FC<HotelCardProps> = ({ 
  name, 
  image, 
  rating, 
  price, 
  description, 
  features 
}) => {
  return (
    <div className="material-card overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/3 h-48 md:h-auto">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        
        <div className="p-6 md:w-2/3">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-medium">{name}</h3>
            <div className="flex items-center bg-primary-700 text-white px-2 py-1 rounded">
              <Star size={16} className="fill-secondary-400 text-secondary-400 mr-1" />
              <span>{rating.toFixed(1)}</span>
            </div>
          </div>
          
          <p className="text-gray-600 mb-4">{description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {features.map((feature, index) => (
              <span 
                key={index} 
                className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-700"
              >
                {feature}
              </span>
            ))}
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <div>
              <span className="text-2xl font-bold">{price} ₽</span>
              <span className="text-gray-500 ml-1">/ night</span>
            </div>
            
            <button className="material-button material-button-primary">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
