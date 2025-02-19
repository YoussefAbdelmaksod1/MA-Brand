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
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center"
            role="button"
          >
            <motion.img 
              src="/4.gif" 
              alt="Coach Moumen" 
              className="h-20 w-auto sm:h-24 md:h-28"
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
          <motion.button 
            className="md:hidden fixed top-6 right-6 z-50 p-4 rounded-lg bg-black
              border-2 border-game-white hover:border-game-blue transition-all duration-300
              shadow-[0_0_20px_rgba(0,163,255,0.3)]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-8 h-8 flex flex-col justify-center items-center gap-2">
              <motion.span
                className="w-8 h-0.5 bg-white transform-gpu origin-center"
                variants={{
                  open: { rotate: 45, y: 3 },
                  closed: { rotate: 0, y: 0 }
                }}
                animate={isMobileMenuOpen ? "open" : "closed"}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-8 h-0.5 bg-white transform-gpu origin-center"
                variants={{
                  open: { opacity: 0 },
                  closed: { opacity: 1 }
                }}
                animate={isMobileMenuOpen ? "open" : "closed"}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-8 h-0.5 bg-white transform-gpu origin-center"
                variants={{
                  open: { rotate: -45, y: -3 },
                  closed: { rotate: 0, y: 0 }
                }}
                animate={isMobileMenuOpen ? "open" : "closed"}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.button>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="fixed inset-0 bg-black z-50 md:hidden"
                style={{ paddingTop: "8rem" }}
              >
                <div className="flex flex-col items-center justify-start min-h-[calc(100vh-8rem)] gap-8 p-8">
                  {navLinks.map(({ path, label }, index) => (
                    <motion.div
                      key={path}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="w-full max-w-sm"
                    >
                      <Link
                        to={path}
                        className={`relative px-8 py-6 font-gaming text-2xl tracking-wider block w-full text-center
                          rounded-lg transition-all duration-300
                          ${location.pathname === path 
                            ? 'text-game-white bg-game-blue/20 border-2 border-game-blue shadow-[0_0_20px_rgba(0,163,255,0.5)]' 
                            : 'text-game-white hover:bg-game-blue/10 border-2 border-transparent hover:border-game-blue/50'}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
};

export default memo(Navbar); 