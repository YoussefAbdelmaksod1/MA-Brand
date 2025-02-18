import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import FitnessScene from './components/FitnessScene';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Training from './pages/Training';
import Transformations from './pages/Transformations';
import Contact from './pages/Contact';
import './styles/globals.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Preload any necessary assets here
    const preloadAssets = async () => {
      // Add any asset preloading logic here
    };

    preloadAssets();
  }, []);

  return (
    <Router>
      <div className="relative min-h-screen bg-game-black text-game-white overflow-x-hidden">
        {/* Global Background */}
        <FitnessScene />
        
        {/* Content Layer */}
        <div className="relative z-10">
          <CustomCursor />
          <AnimatePresence mode="wait">
            {isLoading ? (
              <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
            ) : (
              <>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/training" element={<Training />} />
                  <Route path="/transformations" element={<Transformations />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Router>
  );
}

export default App;
