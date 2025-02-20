import { useState, useEffect, useCallback, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Memoize scroll handler for better performance
  const handleScroll = useCallback(() => {
    const shouldBeScrolled = window.scrollY > 50;
    if (isScrolled !== shouldBeScrolled) {
      setIsScrolled(shouldBeScrolled);
    }
  }, [isScrolled]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: 'Main Arena' },
    { path: '/about', label: 'The Journey' },
    { path: '/services', label: 'Full Arsenal' },
    { path: '/training', label: 'Missions' },
    { path: '/transformations', label: 'Leaderboard' },
    { path: '/contact', label: 'Play Now' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen ? 'bg-black/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center"
            role="button"
          >
            <motion.img 
              src="/4.gif" 
              alt="Coach Moumen" 
              className="h-16 w-auto sm:h-20"
              loading="eager"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className="nav-link relative group"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-3 lg:px-4 py-2 font-gaming text-sm tracking-wider
                    ${location.pathname === path 
                      ? 'text-game-white bg-game-blue border-2 border-game-blue rounded-lg' 
                      : 'text-game-white hover:text-game-white'}
                    transition-all duration-300 hover:bg-gradient-to-r hover:from-game-blue hover:to-game-red
                    before:absolute before:inset-0 before:border-2 before:border-transparent
                    before:rounded-lg hover:before:border-game-white before:transition-all
                    before:duration-300 hover:before:scale-110 before:opacity-0
                    hover:before:opacity-100 overflow-hidden`}
                >
                  <span className="relative z-10">{label}</span>
                  {location.pathname === path && (
                    <motion.span
                      className="absolute inset-0 rounded-lg"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: [0.2, 0.4, 0.2],
                        boxShadow: [
                          '0 0 10px rgba(0,163,255,0.5), 0 0 20px rgba(0,163,255,0.3)',
                          '0 0 20px rgba(0,163,255,0.7), 0 0 40px rgba(0,163,255,0.5)',
                          '0 0 10px rgba(0,163,255,0.5), 0 0 20px rgba(0,163,255,0.3)'
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    />
                  )}
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden fixed top-4 right-4 z-50 w-10 h-10 flex items-center justify-center
              rounded-lg bg-black border border-game-white/30 hover:border-game-blue 
              transition-all duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="w-5 h-3.5 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-white transform transition-all duration-300 origin-center
                ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`w-full h-0.5 bg-white transition-all duration-300 
                ${isMobileMenuOpen ? 'opacity-0 scale-0' : ''}`} />
              <span className={`w-full h-0.5 bg-white transform transition-all duration-300 origin-center
                ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <div className="fixed inset-0 z-40 md:hidden bg-black">
                {/* Menu Content */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="h-screen flex flex-col items-center justify-center p-4"
                >
                  <div className="w-full max-w-[280px] flex flex-col gap-3">
                    {navLinks.map(({ path, label }, index) => (
                      <Link
                        key={path}
                        to={path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`px-4 py-3 rounded-lg font-gaming text-base text-center bg-black
                          ${location.pathname === path 
                            ? 'border-2 border-white/20' 
                            : 'border border-white/10'}
                          hover:border-white/30 transition-all duration-300`}
                      >
                        <span className={`text-white ${location.pathname === path ? 'opacity-100' : 'opacity-80'} 
                          hover:opacity-100 transition-opacity duration-300`}>
                          {label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
};

export default memo(Navbar); 