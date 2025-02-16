import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface Badge {
  title: string;
  level: number;
  color: string;
  icon: string;
  description: string;
  position: { x: number; y: number };
  unlockRequirement: string;
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

const CoachProfile = () => {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [isHoveringImage, setIsHoveringImage] = useState(false);

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Coach Image and Floating Badges */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative"
          onHoverStart={() => setIsHoveringImage(true)}
          onHoverEnd={() => setIsHoveringImage(false)}
        >
          {/* Main Image Container */}
          <motion.div
            className="relative rounded-lg overflow-hidden border-4 border-game-blue"
            animate={{
              boxShadow: isHoveringImage
                ? '0 0 30px rgba(0, 163, 255, 0.6)'
                : '0 0 20px rgba(0, 163, 255, 0.3)'
            }}
          >
            <img
              src="/profile.jpg"
              alt="Coach Moumen"
              className="w-full h-auto object-cover"
            />
            
            {/* Level Indicator */}
            <motion.div
              className="absolute top-4 right-4 bg-black/80 px-6 py-3 rounded-full border border-game-blue"
              animate={{
                scale: [1, 1.05, 1],
                borderColor: ['#00A3FF', '#FF0000', '#00A3FF']
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="text-xl font-gaming">
                <span className="text-game-blue">LVL</span>
                <span className="text-game-red ml-2">100</span>
              </span>
            </motion.div>

            {/* Experience Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-black/50">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2 }}
                className="h-full bg-gradient-to-r from-game-blue via-game-red to-game-blue"
              />
            </div>

            {/* Floating Badges */}
            {badges.map((badge, index) => (
              <motion.div
                key={badge.title}
                className="absolute"
                style={{
                  left: `${50 + badge.position.x}%`,
                  top: `${50 + badge.position.y}%`
                }}
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, 5, -5, 0],
                  scale: selectedBadge === badge ? 1.2 : 1
                }}
                transition={{
                  duration: 4,
                  delay: index * 0.2,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
                whileHover={{ scale: 1.2, zIndex: 10 }}
                onClick={() => setSelectedBadge(badge)}
              >
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${badge.color} 
                  flex items-center justify-center text-2xl
                  border-2 border-white/50 cursor-pointer
                  shadow-lg hover:shadow-xl transition-shadow`}
                >
                  {badge.icon}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Badge Details Popup */}
          <AnimatePresence>
            {selectedBadge && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute inset-0 bg-black/90 rounded-lg p-6 flex flex-col items-center justify-center text-center"
                onClick={() => setSelectedBadge(null)}
              >
                <div className="text-4xl mb-4">{selectedBadge.icon}</div>
                <h3 className="text-2xl font-gaming text-game-blue mb-2">
                  {selectedBadge.title}
                </h3>
                <div className="text-game-red font-gaming mb-4">
                  Level {selectedBadge.level}
                </div>
                <p className="text-game-white/90 mb-4">{selectedBadge.description}</p>
                <div className="text-sm text-game-blue/80">
                  Unlock Requirement: {selectedBadge.unlockRequirement}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Stats and Achievements */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* Character Stats */}
          <div className="game-card">
            <h2 className="text-3xl font-gaming text-game-blue mb-6">Character Stats</h2>
            <div className="space-y-4">
              {[
                { stat: 'Strength', value: 95, color: 'from-red-500 to-red-700' },
                { stat: 'Agility', value: 88, color: 'from-green-400 to-green-600' },
                { stat: 'Endurance', value: 92, color: 'from-blue-400 to-blue-600' },
                { stat: 'Wisdom', value: 97, color: 'from-purple-400 to-purple-600' }
              ].map(({ stat, value, color }) => (
                <div key={stat}>
                  <div className="flex justify-between mb-2">
                    <span className="font-gaming text-game-white">{stat}</span>
                    <span className="font-gaming text-game-blue">{value}/100</span>
                  </div>
                  <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${value}%` }}
                      transition={{ duration: 1.5, delay: 0.2 }}
                      className={`h-full bg-gradient-to-r ${color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="game-card">
            <h2 className="text-3xl font-gaming text-game-blue mb-6">Quest Completion</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: 'Clients Trained', value: '1000+', icon: '👥' },
                { title: 'Transformations', value: '500+', icon: '🎯' },
                { title: 'Programs Created', value: '200+', icon: '📋' },
                { title: 'Success Rate', value: '95%', icon: '⭐' }
              ].map(({ title, value, icon }) => (
                <motion.div
                  key={title}
                  className="bg-black/50 p-4 rounded-lg text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-2xl mb-2">{icon}</div>
                  <div className="font-gaming text-game-blue text-xl">{value}</div>
                  <div className="text-game-white/80 text-sm">{title}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Special Abilities */}
          <div className="game-card">
            <h2 className="text-3xl font-gaming text-game-blue mb-6">Special Abilities</h2>
            <div className="space-y-4">
              {[
                'Master of Form and Technique',
                'Elite Programming Specialist',
                'Nutrition Strategy Expert',
                'Motivation Amplifier'
              ].map((ability) => (
                <motion.div
                  key={ability}
                  className="flex items-center gap-3 bg-black/30 p-3 rounded-lg"
                  whileHover={{ x: 10 }}
                >
                  <span className="text-game-red">⚡</span>
                  <span className="text-game-white/90">{ability}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CoachProfile; 