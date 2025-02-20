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
    playerName: 'Player One',
    beforeImage: '/Clients/Before/client_1.jpeg',
    afterImage: '/Clients/After/client_1.jpeg',
    achievement: 'Elite Champion',
    duration: '12 weeks',
    weightLost: '15 kg',
    rank: 1,
    xpGained: 5000,
    program: 'Elite Performance System',
    testimonial: "The transformation journey was incredible. The gaming approach made every workout exciting!",
    badges: ['Weight Warrior', 'Consistency King', 'Transformation Elite']
  },
  {
    id: '2',
    playerName: 'Player Two',
    beforeImage: '/Clients/Before/client_2.jpeg',
    afterImage: '/Clients/After/client_2.jpeg',
    achievement: 'Transformation Master',
    duration: '16 weeks',
    weightLost: '18 kg',
    rank: 2,
    xpGained: 4800,
    program: 'Warrior Training Protocol',
    testimonial: "Amazing results with the structured program. Achieved more than I thought possible!",
    badges: ['Fat Loss Champion', 'Dedication Master', 'Muscle Builder']
  },
  {
    id: '3',
    playerName: 'Player Three',
    beforeImage: '/Clients/Before/client_3.jpeg',
    afterImage: '/Clients/After/client_3.jpeg',
    achievement: 'Elite Warrior',
    duration: '14 weeks',
    weightLost: '12 kg',
    rank: 3,
    xpGained: 4600,
    program: 'Elite Performance System',
    testimonial: "The program transformed not just my body, but my entire lifestyle!",
    badges: ['Strength Gains', 'Nutrition Expert', 'Elite Performer']
  },
  {
    id: '4',
    playerName: 'Player Four',
    beforeImage: '/Clients/Before/client_4.jpeg',
    afterImage: '/Clients/After/client_4.jpeg',
    achievement: 'Fitness Legend',
    duration: '20 weeks',
    weightLost: '22 kg',
    rank: 4,
    xpGained: 4400,
    program: 'Legendary Transformation',
    testimonial: "Every workout was a new challenge. The results speak for themselves!",
    badges: ['Legend Status', 'Maximum Effort', 'Body Recomposition']
  },
  {
    id: '5',
    playerName: 'Player Five',
    beforeImage: '/Clients/Before/client_5.jpeg',
    afterImage: '/Clients/After/client_5.jpeg',
    achievement: 'Dedication King',
    duration: '15 weeks',
    weightLost: '14 kg',
    rank: 5,
    xpGained: 4200,
    program: 'Warrior Training Protocol',
    testimonial: "The structured approach and constant support made all the difference.",
    badges: ['Consistency Pro', 'Fat Loss Expert', 'Transformation Warrior']
  },
  {
    id: '6',
    playerName: 'Player Six',
    beforeImage: '/Clients/Before/client_6.jpeg',
    afterImage: '/Clients/After/client_6.jpeg',
    achievement: 'Rising Star',
    duration: '13 weeks',
    weightLost: '16 kg',
    rank: 6,
    xpGained: 4000,
    program: 'Elite Performance System',
    testimonial: "The program's gaming elements kept me motivated throughout the journey.",
    badges: ['Progress Master', 'Dedication Elite', 'Transformation Pro']
  },
  {
    id: '7',
    playerName: 'Player Seven',
    beforeImage: '/Clients/Before/client_7.jpeg',
    afterImage: '/Clients/After/client_7.jpeg',
    achievement: 'Fitness Master',
    duration: '18 weeks',
    weightLost: '20 kg',
    rank: 7,
    xpGained: 3800,
    program: 'Legendary Transformation',
    testimonial: "Incredible journey with amazing results. The support was outstanding!",
    badges: ['Weight Loss Elite', 'Consistency Master', 'Transformation King']
  },
  {
    id: '8',
    playerName: 'Player Eight',
    beforeImage: '/Clients/Before/client_8.jpeg',
    afterImage: '/Clients/After/client_8.jpeg',
    achievement: 'Transformation Elite',
    duration: '14 weeks',
    weightLost: '15 kg',
    rank: 8,
    xpGained: 3600,
    program: 'Warrior Training Protocol',
    testimonial: "The program helped me achieve my fitness goals and beyond!",
    badges: ['Dedication Pro', 'Fitness Elite', 'Progress Champion']
  },
  {
    id: '9',
    playerName: 'Player Nine',
    beforeImage: '/Clients/Before/client_9.jpeg',
    afterImage: '/Clients/After/client_9.jpeg',
    achievement: 'Progress Champion',
    duration: '16 weeks',
    weightLost: '17 kg',
    rank: 9,
    xpGained: 3400,
    program: 'Elite Performance System',
    testimonial: "The transformation process was incredible. Exceeded all expectations!",
    badges: ['Elite Warrior', 'Nutrition Master', 'Transformation Expert']
  },
  {
    id: '10',
    playerName: 'Player Ten',
    beforeImage: '/Clients/Before/client_10.jpeg',
    afterImage: '/Clients/After/client_10.jpeg',
    achievement: 'Fitness Warrior',
    duration: '15 weeks',
    weightLost: '19 kg',
    rank: 10,
    xpGained: 3200,
    program: 'Warrior Training Protocol',
    testimonial: "Amazing journey with fantastic results. The program was perfect!",
    badges: ['Progress Elite', 'Dedication Champion', 'Weight Loss Master']
  },
  {
    id: '11',
    playerName: 'Player Eleven',
    beforeImage: '/Clients/Before/client_11.jpeg',
    afterImage: '/Clients/After/client_11.jpeg',
    achievement: 'Transformation Pro',
    duration: '17 weeks',
    weightLost: '16 kg',
    rank: 11,
    xpGained: 3000,
    program: 'Elite Performance System',
    testimonial: "The program's approach to fitness was revolutionary. Great results!",
    badges: ['Elite Progress', 'Consistency Expert', 'Transformation Ace']
  },
  {
    id: '12',
    playerName: 'Player Twelve',
    beforeImage: '/Clients/Before/client_12.jpeg',
    afterImage: '/Clients/After/client_12.jpeg',
    achievement: 'Fitness Expert',
    duration: '14 weeks',
    weightLost: '18 kg',
    rank: 12,
    xpGained: 2800,
    program: 'Warrior Training Protocol',
    testimonial: "Achieved my dream physique through dedication and expert guidance!",
    badges: ['Weight Loss Pro', 'Dedication Expert', 'Progress Master']
  },
  {
    id: '13',
    playerName: 'Player Thirteen',
    beforeImage: '/Clients/Before/client_13.jpeg',
    afterImage: '/Clients/After/client_13.jpeg',
    achievement: 'Progress Master',
    duration: '16 weeks',
    weightLost: '15 kg',
    rank: 13,
    xpGained: 2600,
    program: 'Elite Performance System',
    testimonial: "The transformation journey exceeded my expectations!",
    badges: ['Elite Warrior', 'Fitness Master', 'Transformation Pro']
  },
  {
    id: '14',
    playerName: 'Player Fourteen',
    beforeImage: '/Clients/Before/client_14.jpeg',
    afterImage: '/Clients/After/client_14.jpeg',
    achievement: 'Elite Performer',
    duration: '15 weeks',
    weightLost: '17 kg',
    rank: 14,
    xpGained: 2400,
    program: 'Legendary Transformation',
    testimonial: "Amazing progress with the program's structured approach!",
    badges: ['Progress Elite', 'Dedication Master', 'Weight Loss Expert']
  },
  {
    id: '15',
    playerName: 'Player Fifteen',
    beforeImage: '/Clients/Before/client_15.jpeg',
    afterImage: '/Clients/After/client_15.jpeg',
    achievement: 'Transformation Elite',
    duration: '19 weeks',
    weightLost: '21 kg',
    rank: 15,
    xpGained: 2200,
    program: 'Warrior Training Protocol',
    testimonial: "The program transformed my life in ways I never imagined!",
    badges: ['Elite Progress', 'Fitness Pro', 'Transformation Master']
  },
  {
    id: '16',
    playerName: 'Player Sixteen',
    beforeImage: '/Clients/Before/client_16.jpeg',
    afterImage: '/Clients/After/client_16.jpeg',
    achievement: 'Fitness Master',
    duration: '13 weeks',
    weightLost: '14 kg',
    rank: 16,
    xpGained: 2000,
    program: 'Elite Performance System',
    testimonial: "Incredible results with the program's expert guidance!",
    badges: ['Progress Champion', 'Dedication Elite', 'Weight Loss Master']
  },
  {
    id: '17',
    playerName: 'Player Seventeen',
    beforeImage: '/Clients/Before/client_17.jpeg',
    afterImage: '/Clients/After/client_17.jpeg',
    achievement: 'Progress Elite',
    duration: '18 weeks',
    weightLost: '19 kg',
    rank: 17,
    xpGained: 1800,
    program: 'Legendary Transformation',
    testimonial: "The journey was challenging but the results were worth it!",
    badges: ['Elite Warrior', 'Fitness Expert', 'Transformation Pro']
  },
  {
    id: '18',
    playerName: 'Player Eighteen',
    beforeImage: '/Clients/Before/client_18.jpeg',
    afterImage: '/Clients/After/client_18.jpeg',
    achievement: 'Transformation Master',
    duration: '15 weeks',
    weightLost: '16 kg',
    rank: 18,
    xpGained: 1600,
    program: 'Warrior Training Protocol',
    testimonial: "Found my strength and achieved my goals with this program!",
    badges: ['Progress Master', 'Dedication Pro', 'Weight Loss Elite']
  },
  {
    id: '19',
    playerName: 'Player Nineteen',
    beforeImage: '/Clients/Before/client_19.jpeg',
    afterImage: '/Clients/After/client_19.jpeg',
    achievement: 'Fitness Pro',
    duration: '17 weeks',
    weightLost: '18 kg',
    rank: 19,
    xpGained: 1400,
    program: 'Elite Performance System',
    testimonial: "The program's structure helped me achieve consistent results!",
    badges: ['Elite Progress', 'Transformation Expert', 'Fitness Master']
  },
  {
    id: '20',
    playerName: 'Player Twenty',
    beforeImage: '/Clients/Before/client_20.jpeg',
    afterImage: '/Clients/After/client_20.jpeg',
    achievement: 'Progress Champion',
    duration: '16 weeks',
    weightLost: '15 kg',
    rank: 20,
    xpGained: 1200,
    program: 'Warrior Training Protocol',
    testimonial: "Transformed my body and mindset through this journey!",
    badges: ['Weight Loss Pro', 'Dedication Master', 'Transformation Elite']
  },
  {
    id: '21',
    playerName: 'Player Twenty One',
    beforeImage: '/Clients/Before/client_21.jpeg',
    afterImage: '/Clients/After/client_21.jpeg',
    achievement: 'Elite Master',
    duration: '14 weeks',
    weightLost: '17 kg',
    rank: 21,
    xpGained: 1000,
    program: 'Legendary Transformation',
    testimonial: "The program exceeded all my expectations. Amazing results!",
    badges: ['Progress Elite', 'Fitness Expert', 'Weight Loss Master']
  },
  {
    id: '22',
    playerName: 'Player Twenty Two',
    beforeImage: '/Clients/Before/client_22.jpeg',
    afterImage: '/Clients/After/client_22.jpeg',
    achievement: 'Transformation Expert',
    duration: '15 weeks',
    weightLost: '16 kg',
    rank: 22,
    xpGained: 800,
    program: 'Elite Performance System',
    testimonial: "Found my strength and achieved incredible results!",
    badges: ['Elite Warrior', 'Dedication Pro', 'Progress Champion']
  },
  {
    id: '23',
    playerName: 'Player Twenty Three',
    beforeImage: '/Clients/Before/client_23.jpeg',
    afterImage: '/Clients/After/client_23.jpeg',
    achievement: 'Fitness Elite',
    duration: '18 weeks',
    weightLost: '20 kg',
    rank: 23,
    xpGained: 600,
    program: 'Warrior Training Protocol',
    testimonial: "The journey was incredible, and the results speak for themselves!",
    badges: ['Progress Master', 'Transformation Pro', 'Weight Loss Elite']
  }
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