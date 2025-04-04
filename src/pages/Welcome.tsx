
import React from 'react';
import { usePageTransition } from '../hooks/usePageTransition';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

const Welcome = () => {
  const { isTransitioning, transitionTo } = usePageTransition();

  const handleButtonClick = () => {
    transitionTo('/main');
  };

  return (
    <div className={`welcome-container ${isTransitioning ? 'animate-page-transition' : ''}`}>
      <div className="floating-decoration top-10 left-[10%]">
        <Heart size={30} className="text-wedding-dusty-pink/80" />
      </div>
      <div className="floating-decoration top-20 right-[15%]">
        <Heart size={20} className="text-wedding-peach/80" />
      </div>
      <div className="floating-decoration bottom-20 left-[20%]">
        <Heart size={25} className="text-wedding-terracotta/80" />
      </div>
      <div className="floating-decoration bottom-30 right-[25%]">
        <Heart size={15} className="text-wedding-dusty-pink/80" />
      </div>
      
      <div className="welcome-card">
        <h1 className="font-hand text-4xl md:text-5xl lg:text-6xl mb-4 text-wedding-terracotta">Дарья и Дмитрий</h1>
        <div className="w-16 h-0.5 bg-wedding-dusty-pink/50 mx-auto my-4"></div>
        <p className="text-lg md:text-xl font-serif mb-4">С большой радостью приглашаем вас на нашу свадьбу</p>
        <div className="text-2xl md:text-3xl font-serif font-light my-6">25.09.2025</div>
        <Button 
          onClick={handleButtonClick}
          className="mt-4 bg-wedding-dusty-pink hover:bg-wedding-terracotta text-white px-8 py-2 rounded-md transition-all hover:shadow-lg font-medium"
        >
          Открыть приглашение
        </Button>
      </div>
    </div>
  );
};

export default Welcome;
