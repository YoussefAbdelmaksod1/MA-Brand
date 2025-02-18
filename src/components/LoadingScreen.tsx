import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onLoadingComplete, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black flex items-center justify-center p-4"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-radial from-game-blue/10 to-transparent opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

      {/* Content Container */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-lg mx-auto text-center px-4 py-8 rounded-lg backdrop-blur-sm"
      >
        {/* Title */}
        <motion.h1 
          className="text-4xl sm:text-6xl font-gaming mb-12 text-game-blue"
          animate={{
            textShadow: [
              "0 0 10px rgba(0,163,255,0.5)",
              "0 0 20px rgba(0,163,255,0.8)",
              "0 0 10px rgba(0,163,255,0.5)"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        >
          LOADING GAME
        </motion.h1>
        
        {/* Progress Bar Container */}
        <div className="w-full max-w-md mx-auto h-6 bg-black/50 border-2 border-game-blue relative overflow-hidden rounded-full">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-game-blue via-game-red to-game-blue"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
          
          {/* Glowing Effect */}
          <motion.div
            className="absolute top-0 left-0 h-full w-full bg-game-blue/20"
            animate={{
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />
        </div>
        
        {/* Progress Text */}
        <div className="mt-6 font-gaming text-2xl">
          <span className="text-game-white">{progress}%</span>
          <motion.span 
            className="text-game-red ml-3"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {progress < 100 ? "LOADING..." : "READY!"}
          </motion.span>
        </div>

        {/* Gaming Tips */}
        <motion.div
          className="mt-12 text-game-white/70"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <p className="text-sm sm:text-base font-gaming tracking-wide max-w-sm mx-auto">
            {[
              "Press START to begin your fitness journey",
              "Collect XP by completing workouts",
              "Level up your strength stats daily",
              "Join multiplayer mode for group challenges",
              "Save your progress with healthy meals",
            ][Math.floor((progress / 20) % 5)]}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen; 