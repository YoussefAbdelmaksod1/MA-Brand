import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);

  const loadingTips = [
    "Press START to begin your fitness journey",
    "Collect XP by completing workouts",
    "Level up your strength stats daily",
    "Join multiplayer mode for group challenges",
    "Save your progress with healthy meals",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onLoadingComplete, 800);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    const tipTimer = setInterval(() => {
      setTipIndex(prev => (prev + 1) % loadingTips.length);
    }, 3000);

    return () => {
      clearInterval(timer);
      clearInterval(tipTimer);
    };
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-game-blue via-transparent to-game-red animate-pulse-slow" />
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--game-blue)_0%,_transparent_50%)]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,163,255,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,163,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Main Content Container */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-2xl mx-auto text-center px-6 py-12"
      >
        {/* Logo */}
        <motion.div
          className="mb-12"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <motion.img 
            src="/4.gif" 
            alt="Coach Moumen"
            className="w-32 h-32 mx-auto rounded-full border-4 border-game-blue shadow-[0_0_30px_rgba(0,163,255,0.5)]"
            animate={{
              borderColor: ['#00a3ff', '#ff0000', '#00a3ff'],
              boxShadow: [
                '0 0 30px rgba(0,163,255,0.5)',
                '0 0 30px rgba(255,0,0,0.5)',
                '0 0 30px rgba(0,163,255,0.5)'
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Title */}
        <motion.h1 
          className="text-4xl sm:text-6xl font-gaming mb-12 text-transparent bg-clip-text bg-gradient-to-r from-game-blue to-game-red"
          animate={{
            textShadow: [
              "0 0 20px rgba(0,163,255,0.5)",
              "0 0 40px rgba(255,0,0,0.8)",
              "0 0 20px rgba(0,163,255,0.5)"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          INITIALIZING GAME
        </motion.h1>
        
        {/* Progress Bar */}
        <div className="relative w-full max-w-md mx-auto h-8 bg-black/50 border-2 border-game-blue rounded-full overflow-hidden">
          {/* Progress Fill */}
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-game-blue via-game-red to-game-blue bg-[length:200%_100%]"
            initial={{ width: "0%", backgroundPosition: "0% 50%" }}
            animate={{ 
              width: `${progress}%`,
              backgroundPosition: ["0% 50%", "100% 50%"]
            }}
            transition={{
              width: { duration: 0.3 },
              backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear" }
            }}
          />
          
          {/* Shine Effect */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Progress Text */}
        <div className="mt-6 font-gaming text-2xl flex items-center justify-center gap-4">
          <motion.span 
            className="text-game-blue"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {progress}%
          </motion.span>
          <motion.div 
            className="flex gap-1"
            animate={{ opacity: progress < 100 ? [1, 0.5, 1] : 1 }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            {progress < 100 ? (
              <>
                <span className="text-game-red">LOADING</span>
                <motion.span
                  animate={{
                    opacity: [0, 1, 1, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    times: [0, 0.2, 0.4, 0.6, 1]
                  }}
                  className="text-game-red"
                >
                  ...
                </motion.span>
              </>
            ) : (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-game-gold"
              >
                READY!
              </motion.span>
            )}
          </motion.div>
        </div>

        {/* Loading Tips */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tipIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mt-12 h-8"
          >
            <p className="text-sm sm:text-base font-gaming tracking-wide text-game-white/80">
              {loadingTips[tipIndex]}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Bottom Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-game-blue to-transparent opacity-50" />
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen; 