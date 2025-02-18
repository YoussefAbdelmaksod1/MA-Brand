import React, { useState } from 'react';
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

const badges: Badge[] = [
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

const achievements = [
  { title: 'Warriors Trained', value: '1000+', icon: '👥', color: 'from-purple-400 to-purple-600' },
  { title: 'Boss Fights Won', value: '500+', icon: '⚔️', color: 'from-red-400 to-red-600' },
  { title: 'Success Rate', value: '95%', icon: '🎯', color: 'from-green-400 to-green-600' },
  { title: 'Experience Points', value: '8+ Years', icon: '⭐', color: 'from-yellow-400 to-yellow-600' }
];

const specialMoves = [
  { name: 'Perfect Form Master', description: 'Execute exercises with flawless precision', icon: '🎯' },
  { name: 'Nutrition Strategist', description: 'Craft optimal fuel plans for peak performance', icon: '🥗' },
  { name: 'Mind-Body Sync', description: 'Achieve perfect harmony of mental and physical power', icon: '🧘' },
  { name: 'Motivation Amplifier', description: 'Boost warrior spirits to new heights', icon: '🔥' }
];

const CoachProfile = () => {
  const [activeTab, setActiveTab] = useState<'stats' | 'achievements' | 'moves'>('stats');
  const [hoveredStat, setHoveredStat] = useState<string | null>(null);

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
        <p className="text-lg text-game-white/80">Level 100 Elite Fitness Master</p>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Section - Image Only */}
        <div className="lg:col-span-1 flex items-center justify-center py-8">
          <motion.div 
            className="relative w-64 h-64"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            {/* Rotating Gradient Border */}
            <motion.div
              className="absolute -inset-1 rounded-full"
              animate={{
                background: [
                  'conic-gradient(from 0deg, rgba(0,163,255,0.5), rgba(255,0,0,0.5), rgba(0,163,255,0.5))',
                  'conic-gradient(from 360deg, rgba(0,163,255,0.5), rgba(255,0,0,0.5), rgba(0,163,255,0.5))'
                ],
                rotate: [0, 360]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            {/* Image Container */}
            <div className="absolute inset-1 rounded-full overflow-hidden z-10">
              <img
                src="/profile.jpg"
                alt="Coach Moumen"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Glow Effect */}
            <div
              className="absolute -inset-2 rounded-full opacity-30 blur-xl"
              style={{
                background: 'radial-gradient(circle at center, rgba(0,163,255,0.5), rgba(255,0,0,0.5))'
              }}
            />
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
                          <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="mt-2 text-sm text-game-white/80"
                          >
                            {stat.description}
                          </motion.p>
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
                {achievements.map((achievement) => (
                  <Card
                    key={achievement.title}
                    interactive
                    className="p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${achievement.color} 
                        flex items-center justify-center text-2xl`}>
                        {achievement.icon}
                      </div>
                      <div>
                        <h4 className="font-gaming text-game-white">{achievement.title}</h4>
                        <p className="text-xl font-gaming text-game-blue">{achievement.value}</p>
                      </div>
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
                className="grid grid-cols-1 gap-4"
              >
                {specialMoves.map((move, index) => (
                  <Card
                    key={move.name}
                    interactive
                    className="p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-game-blue to-game-red 
                        flex items-center justify-center text-2xl">
                        {move.icon}
                      </div>
                      <div>
                        <h4 className="font-gaming text-game-white">{move.name}</h4>
                        <p className="text-sm text-game-white/80">{move.description}</p>
                      </div>
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