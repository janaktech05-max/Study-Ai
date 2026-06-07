import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
  glass?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = false,
  gradient = false,
  glass = false,
  onClick,
}) => {
  const baseStyles = 'rounded-2xl transition-all duration-300';
  
  const getStyles = () => {
    if (glass) {
      return 'glass dark:glass-dark';
    }
    if (gradient) {
      return 'gradient-border bg-white dark:bg-dark-900';
    }
    return 'bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700';
  };

  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      onClick={onClick}
      className={cn(
        baseStyles,
        getStyles(),
        hover && 'cursor-pointer shadow-lg hover:shadow-xl',
        className
      )}
    >
      {children}
    </motion.div>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => (
  <div className={cn('px-6 py-4 border-b border-gray-100 dark:border-dark-700', className)}>
    {children}
  </div>
);

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className }) => (
  <div className={cn('p-6', className)}>
    {children}
  </div>
);

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className }) => (
  <div className={cn('px-6 py-4 border-t border-gray-100 dark:border-dark-700', className)}>
    {children}
  </div>
);
