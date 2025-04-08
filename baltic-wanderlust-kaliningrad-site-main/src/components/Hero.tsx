
import React from 'react';

interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  height?: "small" | "medium" | "large";
}

const Hero: React.FC<HeroProps> = ({ 
  title, 
  subtitle, 
  backgroundImage,
  height = "medium"
}) => {
  const heightClass = {
    small: "h-[30vh]",
    medium: "h-[50vh]",
    large: "h-[80vh]"
  }[height];

  return (
    <div 
      className={`relative ${heightClass} flex items-center justify-center bg-cover bg-center`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{title}</h1>
        {subtitle && <p className="text-xl md:text-2xl max-w-3xl mx-auto">{subtitle}</p>}
      </div>
    </div>
  );
};

export default Hero;
