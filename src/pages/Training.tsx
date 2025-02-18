import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import Card from '@/components/Card';
import Button from '@/components/Button';
import FitnessScene from '@/components/FitnessScene';
import { FaLock, FaClock, FaFacebook } from 'react-icons/fa';

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
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredMissions = selectedType === 'all'
    ? missions
    : missions.filter(mission => mission.type === selectedType);

  return (
    <PageTransition>
      <div className="relative min-h-screen bg-game-black">
        {/* Background Scene with Blur */}
        <div className="fixed inset-0 pointer-events-none backdrop-blur-xl">
          <FitnessScene />
        </div>

        {/* Content */}
        <div className="relative z-10 h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-4xl mx-auto">
            {/* Lock Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.3
              }}
              className="mb-8"
            >
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(0,163,255,0.3)",
                    "0 0 40px rgba(0,163,255,0.5)",
                    "0 0 20px rgba(0,163,255,0.3)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="w-24 h-24 mx-auto bg-black/50 rounded-full flex items-center justify-center backdrop-blur-lg border border-game-blue/30"
              >
                <FaLock className="text-5xl text-game-blue" />
              </motion.div>
            </motion.div>

            {/* Coming Soon Text */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-5xl sm:text-7xl font-gaming mb-6 relative inline-block"
            >
              <span className="text-game-blue">Missions</span>
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
                className="absolute -top-6 -right-6 text-2xl text-game-gold"
              >
                BETA
              </motion.span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-xl sm:text-2xl font-gaming text-game-white/80 mb-8"
            >
              <span className="text-game-red">Launching Soon</span>
            </motion.div>

            {/* Timer-like Display */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex items-center justify-center gap-4 mb-12"
            >
              <div className="flex items-center gap-2 bg-black/50 px-4 py-2 rounded-lg backdrop-blur-lg border border-game-blue/30">
                <FaClock className="text-game-blue" />
                <span className="font-gaming text-game-white/90">Phase 1 Development</span>
              </div>
            </motion.div>

            {/* Features Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12"
            >
              {[
                'Daily Quests',
                'Achievement System',
                'Progress Tracking',
                'Skill Trees',
                'Leaderboards',
                'Special Events'
              ].map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                  className="bg-black/30 backdrop-blur-md border border-game-blue/20 rounded-lg px-4 py-3"
                >
                  <span className="text-game-white/70 font-gaming text-sm">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Join Facebook Community CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="inline-block"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#1877F2] hover:bg-[#0D65D9] text-white font-gaming px-8 py-4 rounded-lg
                  flex items-center gap-3 transition-colors duration-300 group relative overflow-hidden"
                onClick={() => window.open('#', '_blank')}
              >
                <FaFacebook className="text-2xl" />
                <span>Join Our Community</span>
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
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Training; 