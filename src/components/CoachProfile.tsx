import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from './Card';

interface Badge {
  title: string;
  level: number;
  color: string;
  icon: string;
  description: string;
  position: { x: number; y: number };
  unlockRequirement: string;
}

interface Stat {
  name: string;
  value: number;
  icon: string;
  color: string;
  description: string;
}

// Badges data for future implementation
const _badges: Badge[] = [
  {
    title: 'Master Trainer',
    level: 100,
    color: 'from-yellow-400 to-yellow-600',
    icon: '👑',
    description: 'Legendary status achieved through years of dedication',
    position: { x: -20, y: -20 },
    unlockRequirement: 'Train 1000+ clients successfully'
  },
  {
    title: 'Strength Sage',
    level: 95,
    color: 'from-red-500 to-red-700',
    icon: '💪',
    description: 'Expert in strength and conditioning',
    position: { x: 20, y: -40 },
    unlockRequirement: 'Perfect form in all exercises'
  },
  {
    title: 'Nutrition Oracle',
    level: 90,
    color: 'from-green-400 to-green-600',
    icon: '🥗',
    description: 'Master of performance nutrition',
    position: { x: -30, y: 20 },
    unlockRequirement: 'Create 500+ meal plans'
  },
  {
    title: 'Transformation Guru',
    level: 100,
    color: 'from-purple-400 to-purple-600',
    icon: '⚡',
    description: 'Specialist in complete body transformations',
    position: { x: 30, y: 30 },
    unlockRequirement: 'Guide 100+ successful transformations'
  },
  {
    title: 'Quest Master',
    level: 88,
    color: 'from-blue-400 to-blue-600',
    icon: '🎮',
    description: 'Creator of epic fitness challenges',
    position: { x: 0, y: -50 },
    unlockRequirement: 'Design 200+ workout programs'
  }
];

const stats: Stat[] = [
  { 
    name: 'Strength', 
    value: 95, 
    icon: '💪', 
    color: 'from-red-500 to-red-700',
    description: 'Master of power and form'
  },
  { 
    name: 'Agility', 
    value: 88, 
    icon: '⚡', 
    color: 'from-yellow-400 to-yellow-600',
    description: 'Swift and precise movements'
  },
  { 
    name: 'Endurance', 
    value: 92, 
    icon: '🏃', 
    color: 'from-green-400 to-green-600',
    description: 'Unstoppable stamina'
  },
  { 
    name: 'Wisdom', 
    value: 97, 
    icon: '🧠', 
    color: 'from-blue-400 to-blue-600',
    description: 'Elite coaching knowledge'
  }
];

// Achievements data for future implementation
const _achievements = [
  { title: 'Warriors Trained', value: '1000+', icon: '👥', color: 'from-purple-400 to-purple-600' },
  { title: 'Boss Fights Won', value: '500+', icon: '⚔️', color: 'from-red-400 to-red-600' },
  { title: 'Success Rate', value: '95%', icon: '🎯', color: 'from-green-400 to-green-600' },
  { title: 'Experience Points', value: '8+ Years', icon: '⭐', color: 'from-yellow-400 to-yellow-600' }
];

// Special moves data for future implementation
const _specialMoves = [
  { name: 'Perfect Form Master', description: 'Execute exercises with flawless precision', icon: '🎯' },
  { name: 'Nutrition Strategist', description: 'Craft optimal fuel plans for peak performance', icon: '🥗' },
  { name: 'Mind-Body Sync', description: 'Achieve perfect harmony of mental and physical power', icon: '🧘' },
  { name: 'Motivation Amplifier', description: 'Boost warrior spirits to new heights', icon: '🔥' }
];

const CoachProfile = () => {
  const [activeTab, setActiveTab] = useState<'stats' | 'achievements' | 'moves'>('stats');
  const [hoveredStat, setHoveredStat] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Profile Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl sm:text-5xl font-gaming mb-4">
          <span className="text-game-blue">Character</span>
          <span className="text-game-white"> Profile</span>
        </h2>
        <p className="text-lg text-game-white/80">Coach Moumen Atef</p>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Section - Enhanced Image */}
        <div className="lg:col-span-1 flex items-center justify-center py-8">
          <motion.div 
            className="relative w-[600px] h-[600px] max-w-full max-h-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
          >
            {/* Hexagonal Frame */}
            <div className="absolute inset-0">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-full h-full"
                  style={{
                    transform: `rotate(${60 * i + rotation}deg)`,
                    transformOrigin: 'center',
                    border: '2px solid rgba(0,163,255,0.5)',
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                  }}
                />
              ))}
            </div>

            {/* Energy Particles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-game-blue to-game-red"
                style={{
                  left: `${50 + 45 * Math.cos(2 * Math.PI * i / 12)}%`,
                  top: `${50 + 45 * Math.sin(2 * Math.PI * i / 12)}%`
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}

            {/* Rotating Border */}
            <motion.div
              className="absolute -inset-4 rounded-xl"
              style={{
                background: 'conic-gradient(from 0deg, rgba(0,163,255,0.7), rgba(255,0,0,0.7), rgba(0,163,255,0.7))',
                filter: 'blur(8px)'
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            {/* Profile Image */}
            <motion.div
              className="absolute inset-8 rounded-xl overflow-hidden bg-game-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <img
                src="/profile.jpg"
                alt="Coach Profile"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-game-black/80 to-transparent" />
            </motion.div>
            {/* Hexagonal Frame */}
            <div className="absolute inset-0">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-full h-full"
                  style={{
                    transform: `rotate(${60 * i + rotation}deg)`,
                    transformOrigin: 'center',
                    border: '2px solid rgba(0,163,255,0.5)',
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  }}
                />
              ))}
            </div>

            {/* Energy Particles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-game-blue to-game-red"
                style={{
                  left: `${50 + 45 * Math.cos(2 * Math.PI * i / 12)}%`,
                  top: `${50 + 45 * Math.sin(2 * Math.PI * i / 12)}%`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}

            {/* Rotating Border */}
            <motion.div
              className="absolute -inset-4 rounded-xl"
              style={{
                background: 'conic-gradient(from 0deg, rgba(0,163,255,0.7), rgba(255,0,0,0.7), rgba(0,163,255,0.7))',
                filter: 'blur(8px)',
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            {/* Pulsing Glow Effect */}
            <motion.div
              className="absolute -inset-6"
              animate={{
                boxShadow: [
                  '0 0 40px rgba(0,163,255,0.8), inset 0 0 40px rgba(0,163,255,0.8)',
                  '0 0 80px rgba(255,0,0,0.8), inset 0 0 80px rgba(255,0,0,0.8)',
                  '0 0 40px rgba(0,163,255,0.8), inset 0 0 40px rgba(0,163,255,0.8)'
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Image Container */}
            <div className="absolute inset-4 overflow-hidden rounded-xl border-4 border-game-white/30 bg-gradient-to-br from-game-blue/20 to-game-red/20">
              <img
                src="/profile.jpg"
                alt="Coach Moumen"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Power Level Indicator */}
            <motion.div
              className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-game-black/90 px-6 py-3 rounded-full border-2 border-game-blue/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.1 }}
            >
              <div className="text-game-blue font-gaming text-xl">Captain MA</div>
            </motion.div>

            {/* Corner Decorations */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-8 h-8"
                style={{
                  top: i < 2 ? '-1rem' : 'auto',
                  bottom: i >= 2 ? '-1rem' : 'auto',
                  left: i % 2 === 0 ? '-1rem' : 'auto',
                  right: i % 2 === 1 ? '-1rem' : 'auto',
                  background: 'linear-gradient(45deg, var(--game-blue), var(--game-red))',
                  clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
                }}
                animate={{
                  rotate: [0, 180, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.5
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Stats and Achievements */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tab Navigation */}
          <div className="flex gap-4">
            {[
              { id: 'stats', label: 'Stats Matrix' },
              { id: 'achievements', label: 'Achievement Log' },
              { id: 'moves', label: 'Special Moves' }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-6 py-3 rounded-lg font-gaming text-lg transition-all
                  ${activeTab === tab.id 
                    ? 'bg-gradient-to-r from-game-blue to-game-red text-white' 
                    : 'bg-black/50 text-game-white/70 hover:bg-black/70'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Content Sections */}
          <AnimatePresence mode="wait">
            {activeTab === 'stats' && (
              <motion.div
                key="stats"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {stats.map((stat) => (
                  <Card
                    key={stat.name}
                    interactive
                    className="relative overflow-hidden"
                    onClick={() => setHoveredStat(stat.name)}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r"
                      style={{
                        backgroundImage: `linear-gradient(to right, ${stat.color})`,
                        opacity: 0.1
                      }}
                    />
                    <div className="relative z-10 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{stat.icon}</span>
                          <span className="font-gaming text-game-white">{stat.name}</span>
                        </div>
                        <span className="font-gaming text-game-blue">{stat.value}/100</span>
                      </div>
                      <div className="h-3 bg-black/30 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${stat.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${stat.value}%` }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                      <AnimatePresence>
                        {hoveredStat === stat.name && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mt-4 p-3 bg-black/50 rounded-lg border border-game-blue/30"
                          >
                            <p className="text-sm text-game-white/90">{stat.description}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Card>
                ))}
              </motion.div>
            )}

            {activeTab === 'achievements' && (
              <motion.div
                key="achievements"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {_achievements.map((achievement) => (
                  <Card
                    key={achievement.title}
                    interactive
                    className="relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r"
                      style={{
                        backgroundImage: `linear-gradient(to right, ${achievement.color})`,
                        opacity: 0.1
                      }}
                    />
                    <div className="relative z-10 p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <motion.span
                            className="text-3xl"
                            animate={{
                              scale: [1, 1.2, 1],
                              rotate: [0, 10, -10, 0]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            {achievement.icon}
                          </motion.span>
                          <div>
                            <h3 className="font-gaming text-game-white text-lg">{achievement.title}</h3>
                            <span className="font-gaming text-game-blue text-xl">{achievement.value}</span>
                          </div>
                        </div>
                      </div>
                      <motion.div
                        className="h-2 bg-black/30 rounded-full overflow-hidden"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1 }}
                      >
                        <motion.div
                          className={`h-full bg-gradient-to-r ${achievement.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                        />
                      </motion.div>
                    </div>
                  </Card>
                ))}
              </motion.div>
            )}

            {activeTab === 'moves' && (
              <motion.div
                key="moves"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {_specialMoves.map((move) => (
                  <Card
                    key={move.name}
                    interactive
                    className="relative overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-game-blue/20 to-game-red/20 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                    <div className="relative z-10 p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <motion.span
                          className="text-3xl"
                          animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 360]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          {move.icon}
                        </motion.span>
                        <h3 className="font-gaming text-game-white text-lg">{move.name}</h3>
                      </div>
                      <p className="text-game-white/80 text-sm">{move.description}</p>
                      <motion.div
                        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-game-blue to-game-red"
                        initial={{ width: 0 }}
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </Card>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CoachProfile;