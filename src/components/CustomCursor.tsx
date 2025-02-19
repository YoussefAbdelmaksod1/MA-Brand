import { useEffect, useState, useCallback, useMemo } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isPointer, setIsPointer] = useState(false);

  // Optimized spring config for better performance
  const springConfig = useMemo(() => ({ 
    damping: 15, 
    stiffness: 150,
    mass: 0.1
  }), []);

  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const updateCursor = useCallback((e: MouseEvent) => {
    requestAnimationFrame(() => {
      cursorX.set(e.clientX - (isPointer ? 20 : 12));
      cursorY.set(e.clientY - (isPointer ? 20 : 12));
    });
  }, [isPointer, cursorX, cursorY]);

  const updateCursorType = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    setIsPointer(target.matches('a, button, [role="button"], .nav-link, .clickable, input, select, textarea') || 
                 !!target.closest('a, button, [role="button"], .nav-link, .clickable, input, select, textarea'));
  }, []);

  useEffect(() => {
    if (window.innerWidth <= 768) return;

    const style = document.createElement('style');
    style.textContent = '* { cursor: none !important; }';
    document.head.appendChild(style);

    document.addEventListener('mousemove', updateCursor, { passive: true });
    document.addEventListener('mouseover', updateCursorType, { passive: true });

    return () => {
      document.head.removeChild(style);
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseover', updateCursorType);
    };
  }, [updateCursor, updateCursorType]);

  if (typeof window !== 'undefined' && window.innerWidth <= 768) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference transform-gpu will-change-transform"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    >
      <div 
        className={`${isPointer ? 'w-10 h-10' : 'w-6 h-6'} 
          transition-all duration-150
          ${isPointer ? 'border-2 border-game-red' : 'border-2 border-game-blue'} 
          ${isPointer ? 'rounded-sm' : 'rounded-full'}`}
        style={{
          boxShadow: isPointer 
            ? '0 0 10px rgba(255,0,0,0.5)'
            : '0 0 10px rgba(0,163,255,0.5)',
          willChange: 'transform'
        }}
      />
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          w-1 h-1 rounded-full transform-gpu
          ${isPointer ? 'bg-game-red' : 'bg-game-blue'}`}
        style={{
          boxShadow: isPointer 
            ? '0 0 5px rgba(255,0,0,0.8)'
            : '0 0 5px rgba(0,163,255,0.8)',
          willChange: 'transform'
        }}
      />
    </motion.div>
  );
};

export default CustomCursor;