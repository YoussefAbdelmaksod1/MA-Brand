import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import FitnessScene from './components/FitnessScene';
import { motion } from 'framer-motion';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Training = lazy(() => import('./pages/Training'));
const Transformations = lazy(() => import('./pages/Transformations'));
const Contact = lazy(() => import('./pages/Contact'));

import './styles/globals.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(() => {
    return sessionStorage.getItem('hasLoaded') === 'true';
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Only show loading screen on first visit
    if (!hasLoaded) {
      const preloadAssets = async () => {
        try {
          const images = ['/4.gif', '/profile.jpg'];
          await Promise.all(
            images.map(src => {
              return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = src;
                img.onload = resolve;
                img.onerror = reject;
              });
            })
          );
          setIsLoading(false);
          setHasLoaded(true);
          sessionStorage.setItem('hasLoaded', 'true');
        } catch (error) {
          console.error('Error preloading assets:', error);
          setIsLoading(false);
          setHasLoaded(true);
          sessionStorage.setItem('hasLoaded', 'true');
        }
      };
      preloadAssets();
    } else {
      setIsLoading(false);
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, [hasLoaded]);

  return (
    <Router>
      <div className="relative min-h-screen bg-game-black text-game-white overflow-x-hidden">
        {/* Global Background - Only render on desktop */}
        {!isMobile && <FitnessScene />}
        
        {/* Content Layer */}
        <div className="relative z-10">
          {/* Only show custom cursor on desktop */}
          {!isMobile && <CustomCursor />}
          
          <AnimatePresence mode="wait">
            {isLoading && !hasLoaded ? (
              <motion.div
                className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
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
                  LOADING GAME
                </motion.h1>

                {/* Progress Bar */}
                <div className="relative w-full max-w-md mx-auto h-4 bg-black/50 border-2 border-game-blue rounded-full overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-game-blue via-game-red to-game-blue bg-[length:200%_100%]"
                    initial={{ width: "0%" }}
                    animate={{ 
                      width: "100%",
                      backgroundPosition: ["0% 50%", "100% 50%"]
                    }}
                    transition={{
                      width: { duration: 1 },
                      backgroundPosition: { duration: 1, repeat: Infinity, ease: "linear" }
                    }}
                  />
                </div>

                {/* Loading Text */}
                <motion.div 
                  className="mt-8 text-xl font-gaming text-game-blue"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  PRESS START TO BEGIN
                </motion.div>
              </motion.div>
            ) : (
              <>
                <Navbar />
                <Suspense fallback={
                  <div className="fixed inset-0 bg-black flex items-center justify-center">
                    <div className="w-32 h-32 border-4 border-game-blue rounded-full animate-spin border-t-transparent" />
                  </div>
                }>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/training" element={<Training />} />
                    <Route path="/transformations" element={<Transformations />} />
                    <Route path="/contact" element={<Contact />} />
                  </Routes>
                </Suspense>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Router>
  );
}

export default App;
