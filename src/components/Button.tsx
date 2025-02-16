import { ButtonHTMLAttributes } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  glowing?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  glowing = false,
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) => {
  const baseStyles = 'font-gaming rounded-lg transition-all duration-300 relative overflow-hidden whitespace-nowrap';
  
  const variantStyles = {
    primary: 'bg-game-red hover:bg-game-red/90 text-game-white',
    secondary: 'bg-game-blue hover:bg-game-blue/90 text-game-white',
  };

  const sizeStyles = {
    sm: 'px-3 sm:px-4 py-1.5 sm:py-2 text-sm',
    md: 'px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg',
    lg: 'px-6 sm:px-8 py-3 sm:py-4 text-lg sm:text-xl',
  };

  const widthStyles = fullWidth ? 'w-full' : '';

  const glowStyles = glowing
    ? 'before:absolute before:inset-0 before:bg-current before:opacity-50 before:blur-lg hover:before:opacity-75'
    : '';

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${glowStyles} ${widthStyles} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default Button; 