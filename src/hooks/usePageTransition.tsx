
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export function usePageTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  const transitionTo = useCallback((path: string) => {
    setIsTransitioning(true);
    // Wait for animation to finish before navigating
    setTimeout(() => {
      navigate(path);
      setIsTransitioning(false);
    }, 1000);
  }, [navigate]);

  return { isTransitioning, transitionTo };
}
