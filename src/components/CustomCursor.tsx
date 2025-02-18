import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    // Add global style to hide default cursor
    const style = document.createElement('style');
    style.textContent = `
      * {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    const updateCursor = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };

    const updateCursorType = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Find the closest interactive parent to prevent multiple activations
      const interactiveParent = target.closest('.nav-link, a, button, [role="button"], .clickable');
      
      // Check if the target itself is interactive
      const isTargetInteractive = 
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.hasAttribute('role') ||
        target.classList.contains('nav-link') ||
        target.classList.contains('clickable');

      // Only set pointer if we have exactly one interactive element
      setIsPointer(interactiveParent !== null || isTargetInteractive);
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const relatedTarget = e.relatedTarget as HTMLElement;
      // Only reset if we're not entering another interactive element
      if (!relatedTarget || !relatedTarget.closest('.nav-link, a, button, [role="button"], .clickable')) {
        setIsPointer(false);
      }
    };

    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('mouseover', updateCursorType);
    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      document.head.removeChild(style);
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseover', updateCursorType);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Outer cursor ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: position.x - (isPointer ? 20 : 12),
          y: position.y - (isPointer ? 20 : 12),
          scale: isPointer ? 1.5 : 1,
          rotate: isPointer ? 45 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 1500,
          damping: 80,
          mass: 0.2
        }}
      >
        <div 
          className={`${isPointer ? 'w-10 h-10' : 'w-6 h-6'} 
            transition-all duration-150
            ${isPointer ? 'border-2 border-game-red' : 'border-2 border-game-blue'} 
            ${isPointer ? 'rounded-sm' : 'rounded-full'}`}
          style={{
            boxShadow: isPointer 
              ? '0 0 20px rgba(255,0,0,0.8), 0 0 40px rgba(255,0,0,0.4)'
              : '0 0 15px rgba(0,163,255,0.6), 0 0 30px rgba(0,163,255,0.3)'
          }}
        />
      </motion.div>

      {/* Inner cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: position.x - 2,
          y: position.y - 2,
          scale: isPointer ? 1.2 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 1500,
          damping: 80,
          mass: 0.2
        }}
      >
        <div 
          className={`w-1 h-1 rounded-full ${isPointer ? 'bg-game-red' : 'bg-game-blue'}`}
          style={{
            boxShadow: isPointer 
              ? '0 0 10px rgba(255,0,0,1), 0 0 20px rgba(255,0,0,0.8)'
              : '0 0 10px rgba(0,163,255,1), 0 0 20px rgba(0,163,255,0.8)'
          }}
        />
      </motion.div>

      {/* Crosshair effect for pointer state */}
      {isPointer && (
        <>
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference"
            animate={{
              x: position.x,
              y: position.y - 15,
              opacity: 1
            }}
            transition={{ type: "spring", stiffness: 1500, damping: 80 }}
          >
            <div className="w-[2px] h-8 bg-game-red shadow-[0_0_10px_rgba(255,0,0,1)]" />
          </motion.div>
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference"
            animate={{
              x: position.x - 15,
              y: position.y,
              opacity: 1
            }}
            transition={{ type: "spring", stiffness: 1500, damping: 80 }}
          >
            <div className="w-8 h-[2px] bg-game-red shadow-[0_0_10px_rgba(255,0,0,1)]" />
          </motion.div>
        </>
      )}
    </>
  );
};

export default CustomCursor;