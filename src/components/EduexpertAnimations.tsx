'use client';

import React, { ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface AnimationProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  once?: boolean;
}

// Eduexpert-style fade in up animation
export const EduexpertFadeInUp: React.FC<AnimationProps> = ({
  children,
  delay = 0,
  duration = 0.8,
  className = '',
  distance = 40,
  once = true
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: distance }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: distance }}
      transition={{ duration, delay, ease: [0.4, 0, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Eduexpert-style slide in from left
export const EduexpertSlideInLeft: React.FC<AnimationProps> = ({
  children,
  delay = 0,
  duration = 0.8,
  className = '',
  distance = 60,
  once = true
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -distance }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -distance }}
      transition={{ duration, delay, ease: [0.4, 0, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Eduexpert-style slide in from right
export const EduexpertSlideInRight: React.FC<AnimationProps> = ({
  children,
  delay = 0,
  duration = 0.8,
  className = '',
  distance = 60,
  once = true
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: distance }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: distance }}
      transition={{ duration, delay, ease: [0.4, 0, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Eduexpert-style scale in animation
export const EduexpertScaleIn: React.FC<AnimationProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  className = '',
  once = true
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration, delay, ease: [0.4, 0, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Eduexpert-style rotate in animation
export const EduexpertRotateIn: React.FC<AnimationProps> = ({
  children,
  delay = 0,
  duration = 0.7,
  className = '',
  once = true
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, rotate: -10, scale: 0.9 }}
      animate={isInView ? { opacity: 1, rotate: 0, scale: 1 } : { opacity: 0, rotate: -10, scale: 0.9 }}
      transition={{ duration, delay, ease: [0.4, 0, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Eduexpert-style bounce in animation
export const EduexpertBounceIn: React.FC<AnimationProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  className = '',
  once = true
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.3 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.3 }}
      transition={{
        duration,
        delay,
        ease: [0.68, -0.55, 0.265, 1.55],
        type: "spring",
        stiffness: 100
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Eduexpert-style text reveal with blur effect
export const EduexpertTextReveal: React.FC<AnimationProps> = ({
  children,
  delay = 0,
  duration = 1,
  className = '',
  once = true
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
      animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 30, filter: 'blur(4px)' }}
      transition={{ duration, delay, ease: [0.4, 0, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Staggered animation container
interface StaggeredAnimationProps {
  children: ReactNode[];
  delay?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export const EduexpertStaggered: React.FC<StaggeredAnimationProps> = ({
  children,
  delay = 0.1,
  className = '',
  direction = 'up'
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: 20 };
      case 'down':
        return { y: -20 };
      case 'left':
        return { x: 20 };
      case 'right':
        return { x: -20 };
      default:
        return { y: 20 };
    }
  };

  const getAnimatePosition = () => {
    switch (direction) {
      case 'up':
        return { y: 0 };
      case 'down':
        return { y: 0 };
      case 'left':
        return { x: 0 };
      case 'right':
        return { x: 0 };
      default:
        return { y: 0 };
    }
  };

  return (
    <div ref={ref} className={className}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, ...getInitialPosition() }}
          animate={isInView ? { opacity: 1, ...getAnimatePosition() } : { opacity: 0, ...getInitialPosition() }}
          transition={{
            duration: 0.6,
            delay: index * delay,
            ease: [0.4, 0, 0.2, 1]
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
};

// Professional card hover animation
interface EduexpertCardProps {
  children: ReactNode;
  className?: string;
  hoverScale?: number;
  hoverRotate?: number;
}

export const EduexpertCard: React.FC<EduexpertCardProps> = ({
  children,
  className = '',
  hoverScale = 1.02,
  hoverRotate = 2
}) => {
  return (
    <motion.div
      className={`eduexpert-card ${className}`}
      whileHover={{
        y: -12,
        scale: hoverScale,
        rotateX: hoverRotate,
        transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
      }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  );
};

// Professional button animation - Optimized
interface EduexpertButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  asChild?: boolean;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'gradient';
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'xl';
}

export const EduexpertButton: React.FC<EduexpertButtonProps> = ({
  children,
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  loading = false,
  asChild = false,
  variant = 'default',
  size = 'default'
}) => {
  const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-95 touch-manipulation";
  
  const variantClasses = {
    default: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md focus:bg-primary/90",
    outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground hover:shadow-md focus:bg-accent focus:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 hover:shadow-md focus:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline focus:underline",
    gradient: "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm hover:from-blue-700 hover:to-purple-700 hover:shadow-md focus:from-blue-700 focus:to-purple-700"
  };
  
  const sizeClasses = {
    default: "h-10 px-4 py-2 min-h-[44px]",
    sm: "h-8 rounded-md px-3 text-xs min-h-[36px]",
    lg: "h-12 rounded-md px-8 text-base min-h-[48px]",
    icon: "h-10 w-10 min-h-[44px] min-w-[44px]",
    xl: "h-14 rounded-lg px-10 text-lg min-h-[56px]"
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={buttonClasses}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      whileHover={!disabled && !loading ? {
        y: -2,
        scale: 1.02,
        transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
      } : {}}
      whileTap={!disabled && !loading ? {
        scale: 0.98,
        transition: { duration: 0.1 }
      } : {}}
      style={{ 
        transformStyle: 'preserve-3d',
        willChange: 'transform'
      }}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </>
      ) : (
        children
      )}
    </motion.button>
  );
};

// Professional image hover effect
interface EduexpertImageProps {
  children: ReactNode;
  className?: string;
}

export const EduexpertImage: React.FC<EduexpertImageProps> = ({
  children,
  className = ''
}) => {
  return (
    <motion.div
      className={`eduexpert-image ${className}`}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
      }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  );
};

// Professional icon animation
interface EduexpertIconProps {
  children: ReactNode;
  className?: string;
}

export const EduexpertIcon: React.FC<EduexpertIconProps> = ({
  children,
  className = ''
}) => {
  return (
    <motion.div
      className={`eduexpert-icon ${className}`}
      whileHover={{
        scale: 1.2,
        rotate: 10,
        transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
      }}
    >
      {children}
    </motion.div>
  );
};
