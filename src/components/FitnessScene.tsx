import { motion } from 'framer-motion';

const FitnessScene = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full"
    >
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-game-black/95" />
      </div>
    </motion.div>
  );
};

export default FitnessScene; 