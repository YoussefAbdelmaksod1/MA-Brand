import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        <div className="flex items-center justify-between h-20">
          <Link 
            to="/" 
            className="flex items-center"
            role="button"
          >
            <motion.img 
              src="/4.gif" 
              alt="Coach Moumen" 
              className="h-16 w-auto sm:h-20"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className="nav-link relative group"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-4 py-2 font-gaming text-sm tracking-wider
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
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-game-blue/0 via-white/10 to-game-blue/0
                      transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform
                      duration-1000"
                  />
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
            className="md:hidden relative z-50 p-2 rounded-lg bg-gradient-to-r from-game-blue to-game-red
              border-2 border-game-white hover:from-game-red hover:to-game-blue transition-all duration-300
              shadow-[0_0_15px_rgba(0,163,255,0.5)]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="w-6 h-6 relative"
              animate={isMobileMenuOpen ? "open" : "closed"}
            >
              <motion.span
                className="absolute w-full h-0.5 bg-white transform-gpu"
                style={{ top: "25%" }}
                variants={{
                  open: { rotate: 45, y: "160%" },
                  closed: { rotate: 0, y: 0 }
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="absolute w-full h-0.5 bg-white top-1/2 -translate-y-1/2"
                variants={{
                  open: { opacity: 0 },
                  closed: { opacity: 1 }
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="absolute w-full h-0.5 bg-white transform-gpu"
                style={{ bottom: "25%" }}
                variants={{
                  open: { rotate: -45, y: "-160%" },
                  closed: { rotate: 0, y: 0 }
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.button>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="fixed inset-0 bg-black/95 backdrop-blur-lg md:hidden pt-24"
              >
                <div className="flex flex-col items-center gap-4 p-8">
                  {navLinks.map(({ path, label }) => (
                    <motion.div
                      key={path}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Link
                        to={path}
                        className={`relative px-6 py-3 font-gaming text-lg tracking-wider block w-full text-center
                          ${location.pathname === path 
                            ? 'text-game-white bg-game-blue rounded-lg' 
                            : 'text-game-white'}`}
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

export default Navbar; 