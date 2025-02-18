import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import Card from '@/components/Card';
import FitnessScene from '@/components/FitnessScene';
import { FaTrophy, FaStar, FaFire, FaMedal, FaWeightHanging, FaChartLine, FaCalendar } from 'react-icons/fa';

interface Transformation {
  id: string;
  playerName: string;
  beforeImage: string;
  afterImage: string;
  achievement: string;
  duration: string;
  weightLost: string;
  rank: number;
  xpGained: number;
  program: string;
  testimonial: string;
  badges: string[];
}

// Placeholder data - we'll update the images when you provide them
const transformations: Transformation[] = [
  {
    id: '1',
    playerName: 'Noor Eldin Mahmoud',
    beforeImage: '/Clients/Before/client_1.jpg',
    afterImage: '/Clients/After/client_1.jpg',
    achievement: 'Player One',
    duration: '12 weeks',
    weightLost: '15 kg',
    rank: 1,
    xpGained: 5000,
    program: 'Elite Performance System',
    testimonial: "Coach Moumen's program completely changed my life. The gaming approach made fitness fun!",
    badges: ['Weight Warrior', 'Consistency King', 'Transformation Elite']
  },
  // Add more transformations here when you have the images
];

const rankColors = {
  1: 'from-yellow-400 to-yellow-600',
  2: 'from-gray-300 to-gray-500',
  3: 'from-amber-600 to-amber-800',
};

const TransformationCard = ({ transformation, index }: { transformation: Transformation; index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <Card
        glowing
        interactive
        className="relative overflow-hidden transform transition-all duration-500 h-full cursor-pointer"
      >
        {/* Rank Badge */}
        <motion.div
          className={`absolute top-2 sm:top-4 right-2 sm:right-4 w-8 sm:w-12 h-8 sm:h-12 rounded-full 
            bg-gradient-to-r ${rankColors[transformation.rank as keyof typeof rankColors] || 'from-blue-400 to-blue-600'}
            flex items-center justify-center z-20`}
          animate={{
            scale: [1, 1.1, 1],
            boxShadow: [
              '0 0 20px rgba(255,255,255,0.2)',
              '0 0 40px rgba(255,255,255,0.4)',
              '0 0 20px rgba(255,255,255,0.2)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-base sm:text-xl font-gaming text-white">#{transformation.rank}</span>
        </motion.div>

        <div className="p-3 sm:p-6">
          <motion.div
            className="relative w-full"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Front Side */}
            <div className={`relative ${isFlipped ? 'invisible' : 'visible'}`}>
              {/* Before/After Images */}
              <div className="relative h-48 sm:h-80 flex">
                <motion.div
                  className="w-1/2 relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={transformation.beforeImage}
                    alt="Before"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 bg-black/50 px-2 py-1 text-[10px] sm:text-xs font-gaming">
                    BEFORE
                  </div>
                </motion.div>
                <motion.div
                  className="w-1/2 relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={transformation.afterImage}
                    alt="After"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 right-0 bg-black/50 px-2 py-1 text-[10px] sm:text-xs font-gaming">
                    AFTER
                  </div>
                </motion.div>
              </div>

              {/* Player Info */}
              <div className="mt-4 sm:mt-6">
                <h3 className="text-xl sm:text-2xl font-gaming text-game-white mb-2">
                  {transformation.playerName}
                </h3>
                <div className="flex items-center gap-2 mb-4">
                  <FaTrophy className="text-game-gold text-base sm:text-lg" />
                  <span className="text-game-gold font-gaming text-xs sm:text-sm">
                    {transformation.achievement}
                  </span>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
                  <div className="bg-black/30 rounded-lg p-2 sm:p-3 backdrop-blur-sm">
                    <div className="flex items-center gap-1 sm:gap-2 text-game-blue">
                      <FaCalendar className="text-xs sm:text-base" />
                      <span className="text-[10px] sm:text-sm font-gaming">{transformation.duration}</span>
                    </div>
                  </div>
                  <div className="bg-black/30 rounded-lg p-2 sm:p-3 backdrop-blur-sm">
                    <div className="flex items-center gap-1 sm:gap-2 text-game-red">
                      <FaWeightHanging className="text-xs sm:text-base" />
                      <span className="text-[10px] sm:text-sm font-gaming">{transformation.weightLost}</span>
                    </div>
                  </div>
                  <div className="bg-black/30 rounded-lg p-2 sm:p-3 backdrop-blur-sm">
                    <div className="flex items-center gap-1 sm:gap-2 text-game-gold">
                      <FaFire className="text-xs sm:text-base" />
                      <span className="text-[10px] sm:text-sm font-gaming">+{transformation.xpGained} XP</span>
                    </div>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {transformation.badges.map((badge, i) => (
                    <motion.span
                      key={i}
                      className="px-2 sm:px-3 py-0.5 sm:py-1 bg-game-blue/20 text-game-blue rounded-full text-[10px] sm:text-xs font-gaming"
                      whileHover={{ scale: 1.1 }}
                    >
                      {badge}
                    </motion.span>
                  ))}
                </div>

                <div className="mt-3 sm:mt-4 text-center text-[10px] sm:text-sm text-game-white/60">
                  Tap to see journey details
                </div>
              </div>
            </div>

            {/* Back Side (Journey Details) */}
            <div
              className={`absolute inset-0 bg-black/90 backdrop-blur-md p-4 sm:p-6 ${isFlipped ? 'visible' : 'invisible'}`}
              style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
            >
              <h4 className="text-lg sm:text-xl font-gaming text-game-blue mb-4">Journey Details</h4>
              
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h5 className="text-base sm:text-lg font-gaming text-game-gold mb-2">Program</h5>
                  <p className="text-sm sm:text-base text-game-white/80">{transformation.program}</p>
                </div>

                <div>
                  <h5 className="text-base sm:text-lg font-gaming text-game-gold mb-2">Testimonial</h5>
                  <p className="text-sm sm:text-base text-game-white/80 italic">{transformation.testimonial}</p>
                </div>

                <div>
                  <h5 className="text-base sm:text-lg font-gaming text-game-gold mb-2">Achievements</h5>
                  <div className="grid grid-cols-2 gap-2 sm:gap-4">
                    <div className="bg-black/30 rounded-lg p-2 sm:p-3">
                      <div className="flex items-center gap-1 sm:gap-2 text-game-blue">
                        <FaChartLine className="text-xs sm:text-base" />
                        <span className="text-[10px] sm:text-sm">Progress Elite</span>
                      </div>
                    </div>
                    <div className="bg-black/30 rounded-lg p-2 sm:p-3">
                      <div className="flex items-center gap-1 sm:gap-2 text-game-red">
                        <FaFire className="text-xs sm:text-base" />
                        <span className="text-[10px] sm:text-sm">Transformation Master</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 sm:mt-4 text-center text-[10px] sm:text-sm text-game-white/60">
                Tap to see transformation
              </div>
            </div>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
};

const Transformations = () => {
  return (
    <PageTransition>
      <div className="relative min-h-screen bg-game-black">
        {/* Background Scene */}
        <div className="fixed inset-0 pointer-events-none">
          <FitnessScene />
        </div>

        {/* Content */}
        <div className="relative z-10 pt-20 sm:pt-32 pb-8 sm:pb-16 px-3 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8 sm:mb-16"
            >
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-gaming font-bold mb-4 sm:mb-8 relative inline-block">
                Players <span className="text-game-blue">Leaderboard</span>
                <motion.div
                  className="absolute -top-4 sm:-top-6 -right-4 sm:-right-6 text-2xl sm:text-4xl text-game-gold"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <FaStar />
                </motion.div>
              </h1>
              <p className="text-base sm:text-xl md:text-2xl text-game-white/90 max-w-3xl mx-auto px-4">
                Witness the epic transformations of our legendary players
              </p>
            </motion.div>

            {/* Transformations Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {transformations.map((transformation, index) => (
                <TransformationCard
                  key={transformation.id}
                  transformation={transformation}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Transformations; 