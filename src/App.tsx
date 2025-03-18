import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
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
const XPSystem = lazy(() => import('./pages/XPSystem'));
const Contact = lazy(() => import('./pages/Contact'));

import './styles/globals.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Show loading screen for 1.5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
      setHasLoaded(true);
    }, 1500);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

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
            {isLoading ? (
              <LoadingScreen />
            ) : (
              <>
                <Navbar />
                <Suspense fallback={
                  <div className="fixed inset-0 bg-black flex items-center justify-center">
                    <motion.div
                      animate={{
                        boxShadow: [
                          '0 0 20px rgba(0,163,255,0.3)',
                          '0 0 40px rgba(0,163,255,0.5)',
                          '0 0 20px rgba(0,163,255,0.3)'
                        ]
                      }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-16 h-16 rounded-full overflow-hidden border-2 border-game-blue/50"
                    >
                      <img src="/4.gif" alt="Loading" className="w-full h-full object-cover" />
                    </motion.div>
                  </div>
                }>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/training" element={<Training />} />
                    <Route path="/transformations" element={<Transformations />} />
                    <Route path="/xp-system" element={<XPSystem />} />
                    <Route path="/contact" element={<Contact />} />
                  </Routes>
                  <Footer />
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
