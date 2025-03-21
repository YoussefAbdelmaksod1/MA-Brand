import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative py-8 mt-auto bg-gradient-to-r from-black via-black/95 to-black border-t border-game-blue/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <motion.div 
            className="text-game-white/80 font-gaming text-sm"
            whileHover={{ scale: 1.05 }}
          >
            © {new Date().getFullYear()} Coach Moumen. All Rights Reserved.
          </motion.div>

          {/* Powered By */}
          <motion.div 
            className="flex items-center gap-2 text-sm"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-game-white/60">Powered by</span>
            <span className="text-game-blue">
              Devnium
            </span>
          </motion.div>
        </div>
      </div>

      {/* Animated Border */}
      <motion.div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0,163,255,0.5), rgba(255,0,0,0.5), transparent)'
        }}
        animate={{
          backgroundPosition: ['200% 0', '-200% 0']
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    </motion.footer>
  );
};

export default Footer;