import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const LoadingScreen = () => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    // Animate percentage from 0 to 100 faster (1.5 seconds total)
    const timer = setInterval(() => {
      setPercentage(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 4; // Increment by 4 to go faster
      });
    }, 40); // Update every 40ms

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
    >
      <div className="relative flex flex-col items-center max-w-lg w-full mx-auto px-4">
        {/* Background Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
            className="absolute inset-0 bg-gradient-to-r from-game-blue/20 to-game-red/20 blur-3xl"
          />
        </div>

        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="mb-6"
        >
          <motion.div
            animate={{
              boxShadow: [
                '0 0 30px rgba(0,163,255,0.4)',
                '0 0 50px rgba(0,163,255,0.6)',
                '0 0 30px rgba(0,163,255,0.4)'
              ]
            }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="w-32 h-32 rounded-full overflow-hidden border-4 border-game-blue/50"
          >
            <motion.img
              src="/4.gif"
              alt="Coach Moumen"
              className="w-full h-full object-cover"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>

        {/* Game Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl sm:text-5xl font-gaming mb-2 relative">
            <motion.span
              animate={{ color: ['#00A3FF', '#FF0000', '#00A3FF'] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="inline-block"
            >
              LOADING
            </motion.span>{' '}
            <motion.span
              animate={{ color: ['#FF0000', '#00A3FF', '#FF0000'] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="inline-block"
            >
              THE GAME
            </motion.span>
          </h1>
        </motion.div>

        {/* Progress Bar Container */}
        <div className="w-full max-w-sm mx-auto">
          {/* Progress Bar Background */}
          <div className="h-3 bg-black border-2 border-game-blue/30 rounded-full overflow-hidden relative">
            {/* Progress Bar Fill */}
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.2 }}
              className="h-full bg-gradient-to-r from-game-blue via-white to-game-red relative"
            >
              {/* Shine Effect */}
              <motion.div
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
            </motion.div>
          </div>

          {/* Loading Status */}
          <div className="mt-3 text-center">
            <motion.span
              className="text-lg font-gaming text-game-blue"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              {percentage}%
            </motion.span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen; 