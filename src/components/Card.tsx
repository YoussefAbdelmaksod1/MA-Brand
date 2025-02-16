import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
  glowing?: boolean;
  interactive?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Card = ({
  children,
  title,
  className = '',
  glowing = false,
  interactive = false,
  size = 'md',
}: CardProps) => {
  const baseStyles = `
    bg-black/80 border border-game-blue rounded-lg
    backdrop-blur-md transition-all duration-300
  `;

  const sizeStyles = {
    sm: 'p-4 sm:p-4',
    md: 'p-4 sm:p-6',
    lg: 'p-4 sm:p-8',
  };

  const glowStyles = glowing
    ? 'hover:border-game-red hover:shadow-[0_0_15px_rgba(0,163,255,0.5)]'
    : '';

  const cardContent = (
    <>
      {title && (
        <h3 className="text-xl sm:text-2xl font-gaming mb-3 sm:mb-4 text-game-blue">{title}</h3>
      )}
      {children}
    </>
  );

  if (interactive) {
    return (
      <motion.div
        whileHover={{ scale: 1.02, y: -5 }}
        className={`${baseStyles} ${sizeStyles[size]} ${glowStyles} ${className} cursor-pointer`}
      >
        {cardContent}
      </motion.div>
    );
  }

  return (
    <div className={`${baseStyles} ${sizeStyles[size]} ${glowStyles} ${className}`}>
      {cardContent}
    </div>
  );
};

export default Card; 