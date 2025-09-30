'use client';

import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
};

// Hook for staggered animations
export const useStaggeredAnimation = (itemCount: number, delay: number = 100) => {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(itemCount).fill(false));
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    if (isVisible) {
      const timers: NodeJS.Timeout[] = [];
      
      for (let i = 0; i < itemCount; i++) {
        const timer = setTimeout(() => {
          setVisibleItems(prev => {
            const newState = [...prev];
            newState[i] = true;
            return newState;
          });
        }, i * delay);
        
        timers.push(timer);
      }

      return () => {
        timers.forEach(timer => clearTimeout(timer));
      };
    }
  }, [isVisible, itemCount, delay]);

  return { ref, visibleItems };
};

// Hook for parallax effects
export const useParallax = (speed: number = 0.5) => {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        ref.current.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const rate = scrolled * -speed;
        setOffset(rate);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { ref, offset };
};

// Hook for smooth reveal animations
export const useRevealAnimation = (direction: 'up' | 'down' | 'left' | 'right' = 'up') => {
  const { ref, isVisible } = useScrollAnimation();
  
  const getTransform = () => {
    switch (direction) {
      case 'up':
        return isVisible ? 'translateY(0)' : 'translateY(60px)';
      case 'down':
        return isVisible ? 'translateY(0)' : 'translateY(-60px)';
      case 'left':
        return isVisible ? 'translateX(0)' : 'translateX(60px)';
      case 'right':
        return isVisible ? 'translateX(0)' : 'translateX(-60px)';
      default:
        return isVisible ? 'translateY(0)' : 'translateY(60px)';
    }
  };

  return {
    ref,
    isVisible,
    style: {
      opacity: isVisible ? 1 : 0,
      transform: getTransform(),
      transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
    }
  };
};
