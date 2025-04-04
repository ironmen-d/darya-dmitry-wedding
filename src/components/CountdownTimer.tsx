
import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = targetDate.getTime() - new Date().getTime();
    
    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    }
    
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number): string => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  return (
    <div className="w-full">
      <div className="flex justify-center items-center space-x-4 md:space-x-8">
        <div className="flex flex-col items-center">
          <div className="bg-white bg-opacity-80 rounded-lg shadow-md w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
            <span className="text-2xl md:text-3xl font-bold text-wedding-terracotta">{formatNumber(timeLeft.days)}</span>
          </div>
          <span className="text-sm md:text-base mt-2">дней</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="bg-white bg-opacity-80 rounded-lg shadow-md w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
            <span className="text-2xl md:text-3xl font-bold text-wedding-terracotta">{formatNumber(timeLeft.hours)}</span>
          </div>
          <span className="text-sm md:text-base mt-2">часов</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="bg-white bg-opacity-80 rounded-lg shadow-md w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
            <span className="text-2xl md:text-3xl font-bold text-wedding-terracotta">{formatNumber(timeLeft.minutes)}</span>
          </div>
          <span className="text-sm md:text-base mt-2">минут</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="bg-white bg-opacity-80 rounded-lg shadow-md w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
            <span className="text-2xl md:text-3xl font-bold text-wedding-terracotta">{formatNumber(timeLeft.seconds)}</span>
          </div>
          <span className="text-sm md:text-base mt-2">секунд</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
