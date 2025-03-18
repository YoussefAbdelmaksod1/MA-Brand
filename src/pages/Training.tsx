import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import Card from '@/components/Card';
import Button from '@/components/Button';
import FitnessScene from '@/components/FitnessScene';
import { FaLock, FaClock, FaFacebook, FaGamepad, FaTrophy, FaFire, FaMedal } from 'react-icons/fa';

interface Mission {
  id: string;
  title: string;
  type: 'strength' | 'cardio' | 'flexibility' | 'recovery';
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'elite';
  duration: string;
  xp: number;
  description: string;
  objectives: string[];
  rewards: string[];
}

const missions: Mission[] = [
  {
    id: 'str-001',
    title: 'Power Level: Upper Body',
    type: 'strength',
    difficulty: 'intermediate',
    duration: '45 mins',
    xp: 500,
    description: 'Build strength and muscle in your upper body with this intense workout mission.',
    objectives: [
      'Complete 4 sets of each exercise',
      'Maintain proper form',
      'Track your weights',
      'Rest 60-90 seconds between sets',
    ],
    rewards: [
      'Strength +5',
      'Upper Body Badge',
      'Progress towards "Warrior" title',
    ],
  },
  {
    id: 'crd-001',
    title: 'Speed Run Challenge',
    type: 'cardio',
    difficulty: 'advanced',
    duration: '30 mins',
    xp: 400,
    description: 'High-intensity cardio mission to boost your endurance and agility.',
    objectives: [
      'Complete all intervals',
      'Maintain target heart rate',
      'Track your distance',
      'Minimal rest between sets',
    ],
    rewards: [
      'Endurance +5',
      'Speed Runner Badge',
      'Progress towards "Swift" title',
    ],
  },
  {
    id: 'flx-001',
    title: 'Mobility Quest',
    type: 'flexibility',
    difficulty: 'beginner',
    duration: '20 mins',
    xp: 300,
    description: 'Improve your flexibility and mobility with this guided stretching routine.',
    objectives: [
      'Hold each stretch for 30s',
      'Focus on breathing',
      'Track your range of motion',
      'No bouncing',
    ],
    rewards: [
      'Flexibility +3',
      'Mobility Master Badge',
      'Progress towards "Agile" title',
    ],
  },
  {
    id: 'rec-001',
    title: 'Recovery Day',
    type: 'recovery',
    difficulty: 'beginner',
    duration: '40 mins',
    xp: 200,
    description: 'Essential recovery mission to help your body rebuild and prevent injury.',
    objectives: [
      'Complete foam rolling routine',
      'Light stretching',
      'Meditation session',
      'Track sleep quality',
    ],
    rewards: [
      'Recovery +4',
      'Zen Master Badge',
      'Progress towards "Wise" title',
    ],
  },
];

const typeColors = {
  strength: 'text-red-400',
  cardio: 'text-green-400',
  flexibility: 'text-blue-400',
  recovery: 'text-purple-400',
};

const difficultyColors = {
  beginner: 'text-green-400',
  intermediate: 'text-blue-400',
  advanced: 'text-purple-400',
  elite: 'text-yellow-400',
};

const MissionCard = ({ mission }: { mission: Mission }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div layout>
      <Card
        glowing
        interactive
        size="lg"
        className="h-full cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <motion.div layout>
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-gaming text-game-white mb-2">
                {mission.title}
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-4">
                <span className={`text-sm font-gaming ${typeColors[mission.type]}`}>
                  {mission.type.charAt(0).toUpperCase() + mission.type.slice(1)}
                </span>
                <span className={`text-sm font-gaming ${difficultyColors[mission.difficulty]}`}>
                  {mission.difficulty.charAt(0).toUpperCase() + mission.difficulty.slice(1)}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-game-blue font-gaming text-sm sm:text-base">{mission.duration}</span>
              <div className="text-xs sm:text-sm text-game-white/60">
                +{mission.xp} XP
              </div>
            </div>
          </div>

          <p className="text-sm sm:text-base text-game-white/80 mb-4">{mission.description}</p>
        </motion.div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="pt-4 border-t border-game-blue/30"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h4 className="text-lg sm:text-xl font-gaming text-game-blue mb-3">
                    Objectives
                  </h4>
                  <ul className="space-y-2">
                    {mission.objectives.map((objective, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-sm sm:text-base text-game-white/80"
                      >
                        <span className="w-1.5 h-1.5 bg-game-blue rounded-full"></span>
                        {objective}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg sm:text-xl font-gaming text-game-red mb-3">
                    Rewards
                  </h4>
                  <ul className="space-y-2">
                    {mission.rewards.map((reward, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-sm sm:text-base text-game-white/80"
                      >
                        <span className="w-1.5 h-1.5 bg-game-red rounded-full"></span>
                        {reward}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                glowing
                fullWidth
                className="mt-6 sm:mt-8"
              >
                Start Mission
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};

const Training = () => {
  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,163,255,0.2)_0%,transparent_70%)] animate-pulse opacity-70" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,0,0,0.2)_0%,transparent_100%)] animate-pulse opacity-50" />
        <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,rgba(0,163,255,0.1)_0%,rgba(255,0,0,0.1)_25%,rgba(0,163,255,0.1)_50%,rgba(255,0,0,0.1)_75%,rgba(0,163,255,0.1)_100%)] animate-spin-slow opacity-30" />

        {/* Content */}
        <div className="relative z-10 min-h-screen flex flex-col justify-center px-4 py-20 sm:py-32">
          <div className="max-w-7xl mx-auto w-full">
            {/* Logo and Title Section */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 sm:mb-16"
            >
              {/* Logo */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative mb-8 inline-block"
              >
                <motion.div
                  animate={{
                    boxShadow: [
                      '0 0 30px rgba(0,163,255,0.3)',
                      '0 0 50px rgba(0,163,255,0.6)',
                      '0 0 30px rgba(0,163,255,0.3)',
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-game-blue/50"
                >
                  <motion.img
                    src="/4.gif"
                    alt="Coach Moumen"
                    className="w-full h-full object-cover"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                </motion.div>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-6xl md:text-7xl font-gaming mb-6 relative inline-block"
              >
                <span className="text-game-blue">Epic</span>{' '}
                <span className="text-game-red">Missions</span>
                <motion.span
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.02, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 text-xl sm:text-2xl text-game-gold"
                >
                  BETA
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-lg sm:text-xl text-game-white/80 max-w-2xl mx-auto mb-8"
              >
                Embark on your fitness journey through gamified workouts and challenges
              </motion.p>
            </motion.div>

            {/* Mission Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12"
            >
              {[
                {
                  title: 'Daily Quests',
                  icon: <FaGamepad className="text-game-blue" />,
                  description: 'Quick daily workouts',
                  color: 'border-game-blue'
                },
                {
                  title: 'Boss Battles',
                  icon: <FaFire className="text-game-red" />,
                  description: 'Intense challenges',
                  color: 'border-game-red'
                },
                {
                  title: 'Achievement Hunt',
                  icon: <FaTrophy className="text-game-gold" />,
                  description: 'Unlock rewards',
                  color: 'border-yellow-500'
                },
                {
                  title: 'Skill Tree',
                  icon: <FaMedal className="text-purple-400" />,
                  description: 'Progress tracking',
                  color: 'border-purple-400'
                }
              ].map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className={`bg-black/30 backdrop-blur-md border ${category.color} rounded-xl p-6 
                    flex flex-col items-center text-center group cursor-pointer
                    hover:bg-black/50 transition-all duration-300`}
                >
                  <div className="text-3xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-gaming mb-2">{category.title}</h3>
                  <p className="text-sm text-game-white/60">{category.description}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Coming Soon Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-game-blue/20 to-game-red/20 
                backdrop-blur-md border border-white/10 p-8 sm:p-12 text-center"
            >
              {/* Animated Background */}
              <motion.div
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  scale: [0.95, 1.05, 0.95],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="absolute inset-0 bg-gradient-to-r from-game-blue/10 to-game-red/10 blur-xl"
              />

              <div className="relative z-10">
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="text-5xl sm:text-6xl mb-6 inline-block"
                >
                  🎮
                </motion.div>

                <h2 className="text-2xl sm:text-3xl font-gaming mb-4">
                  <span className="text-game-blue">Launching</span>{' '}
                  <span className="text-game-red">Soon</span>
                </h2>

                <p className="text-lg text-game-white/80 mb-8 max-w-2xl mx-auto">
                  Get ready for an epic fitness adventure! Join our community to be the first to access exclusive missions and rewards.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#1877F2] hover:bg-[#0D65D9] text-white font-gaming px-8 py-4 rounded-xl
                      flex items-center gap-3 transition-colors duration-300 group relative overflow-hidden w-full sm:w-auto"
                    onClick={() => window.open('https://www.facebook.com/groups/coachmoumen', '_blank')}
                  >
                    <FaFacebook className="text-2xl" />
                    <span>Join Community</span>
                    <motion.div
                      className="absolute inset-0 bg-white/10"
                      animate={{
                        x: ["0%", "100%"]
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "linear"
                      }}
                      style={{ clipPath: "polygon(0 0, 20% 0, 60% 100%, 40% 100%)" }}
                    />
                  </motion.button>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 bg-black/50 px-6 py-4 rounded-xl backdrop-blur-lg 
                      border border-game-blue/30 w-full sm:w-auto justify-center"
                  >
                    <FaClock className="text-game-blue" />
                    <span className="font-gaming text-game-white/90">Phase 1 Development</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Training;