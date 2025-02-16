// Button component with motion animations and TypeScript support
import { motion, HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  glowing?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
}

const Button = ({
  variant = 'primary',
  size = 'md',
  glowing = false,
  fullWidth = false,
  children,
  className = '',
  ...props
}: ButtonProps) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-game-blue text-white hover:bg-game-blue/90 focus:ring-game-blue',
    secondary: 'bg-game-red text-white hover:bg-game-red/90 focus:ring-game-red',
    outline: 'border-2 border-game-blue text-game-blue hover:bg-game-blue/10 focus:ring-game-blue',
  };

  const sizes = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  };

  const glowStyles = glowing ? 'before:absolute before:inset-0 before:bg-current before:opacity-50 before:blur-lg hover:before:opacity-75' : '';

  const classes = [
    baseClasses,
    variants[variant],
    sizes[size],
    glowStyles,
    fullWidth ? 'w-full' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <motion.button
      className={classes}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button; 