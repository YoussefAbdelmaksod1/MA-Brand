import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Main Arena' },
    { path: '/about', label: 'The Journey' },
    { path: '/services', label: 'Full Arsenal' },
    { path: '/plans', label: 'Choose Difficulty' },
    { path: '/training', label: 'Missions' },
    { path: '/transformations', label: 'Leaderboard' },
    { path: '/contact', label: 'Play Now' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center">
            <img src="/2.png" alt="Moumen Atef Logo" className="h-12 w-auto" />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`relative text-game-white hover:text-game-blue transition-colors duration-300
                  ${location.pathname === path ? 'text-game-blue' : ''}
                  after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5
                  after:bg-game-blue after:transform after:scale-x-0 after:transition-transform
                  hover:after:scale-x-100`}
              >
                {label}
              </Link>
            ))}
          </div>

          <button className="md:hidden text-game-white">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar; 