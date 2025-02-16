import { useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import Card from '@/components/Card';
import Button from '@/components/Button';

interface Transformation {
  id: string;
  name: string;
  rank: 'Bronze' | 'Silver' | 'Gold' | 'Diamond';
  duration: string;
  achievements: string[];
  stats: {
    strengthGain: number;
    weightLoss: number;
    enduranceBoost: number;
    totalWorkouts: number;
  };
  testimonial: string;
}

const transformations: Transformation[] = [
  {
    id: 'tr-001',
    name: 'Alex "The Warrior" Chen',
    rank: 'Diamond',
    duration: '12 months',
    achievements: [
      'Lost 30kg',
      'Gained significant muscle mass',
      'Completed 300+ workouts',
      'Achieved 5 fitness milestones',
    ],
    stats: {
      strengthGain: 85,
      weightLoss: 95,
      enduranceBoost: 90,
      totalWorkouts: 320,
    },
    testimonial: "Moumen's gaming-inspired approach made fitness fun and addictive. I've never felt stronger or more confident!",
  },
  {
    id: 'tr-002',
    name: 'Sarah "Swift" Johnson',
    rank: 'Gold',
    duration: '8 months',
    achievements: [
      'Improved running speed by 40%',
      'Completed marathon',
      'Lost 15kg',
      'Achieved 3 fitness milestones',
    ],
    stats: {
      strengthGain: 70,
      weightLoss: 85,
      enduranceBoost: 95,
      totalWorkouts: 280,
    },
    testimonial: 'The gamification elements kept me motivated. Every workout felt like a new quest to conquer!',
  },
  {
    id: 'tr-003',
    name: 'Mike "Tank" Thompson',
    rank: 'Silver',
    duration: '6 months',
    achievements: [
      'Gained 10kg muscle',
      'Doubled strength numbers',
      'Completed 200+ workouts',
      'Achieved 2 fitness milestones',
    ],
    stats: {
      strengthGain: 90,
      weightLoss: 60,
      enduranceBoost: 75,
      totalWorkouts: 220,
    },
    testimonial: 'The structured progression system made it easy to track my gains and stay motivated.',
  },
  {
    id: 'tr-004',
    name: 'Emma "Agile" Martinez',
    rank: 'Bronze',
    duration: '3 months',
    achievements: [
      'Improved flexibility by 60%',
      'Lost 8kg',
      'Completed 100+ workouts',
      'Achieved first fitness milestone',
    ],
    stats: {
      strengthGain: 65,
      weightLoss: 75,
      enduranceBoost: 80,
      totalWorkouts: 120,
    },
    testimonial: 'As a beginner, the gaming approach made fitness less intimidating and more enjoyable.',
  },
];

const rankColors = {
  Bronze: 'from-orange-700/20 to-orange-900/20 border-orange-500',
  Silver: 'from-gray-400/20 to-gray-600/20 border-gray-400',
  Gold: 'from-yellow-400/20 to-yellow-600/20 border-yellow-400',
  Diamond: 'from-blue-400/20 to-blue-600/20 border-blue-400',
};

const StatBar = ({ value, color }: { value: number; color: string }) => (
  <div className="h-1.5 sm:h-2 bg-black/50 rounded-full overflow-hidden">
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${value}%` }}
      transition={{ duration: 1, delay: 0.5 }}
      className={`h-full ${color}`}
    />
  </div>
);

const TransformationCard = ({ transformation }: { transformation: Transformation }) => {
  return (
    <Card
      glowing
      interactive
      size="lg"
      className={`h-full bg-gradient-to-br ${rankColors[transformation.rank]} border-2`}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4 sm:mb-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-gaming text-game-white mb-2">
            {transformation.name}
          </h3>
          <span className="text-sm font-gaming text-game-blue">
            {transformation.duration} Journey
          </span>
        </div>
        <span className={`px-3 sm:px-4 py-1 rounded-full text-sm font-gaming bg-black/30 border border-current
          ${transformation.rank === 'Bronze' ? 'text-orange-500' :
          transformation.rank === 'Silver' ? 'text-gray-400' :
          transformation.rank === 'Gold' ? 'text-yellow-400' :
          'text-blue-400'}`}
        >
          {transformation.rank}
        </span>
      </div>

      <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm sm:text-base text-game-white/80">Strength</span>
            <span className="text-sm sm:text-base text-game-blue">{transformation.stats.strengthGain}%</span>
          </div>
          <StatBar value={transformation.stats.strengthGain} color="bg-red-500" />
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm sm:text-base text-game-white/80">Weight Loss</span>
            <span className="text-sm sm:text-base text-game-blue">{transformation.stats.weightLoss}%</span>
          </div>
          <StatBar value={transformation.stats.weightLoss} color="bg-green-500" />
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm sm:text-base text-game-white/80">Endurance</span>
            <span className="text-sm sm:text-base text-game-blue">{transformation.stats.enduranceBoost}%</span>
          </div>
          <StatBar value={transformation.stats.enduranceBoost} color="bg-blue-500" />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg sm:text-xl font-gaming text-game-blue">Achievements</h4>
        <ul className="space-y-2">
          {transformation.achievements.map((achievement, index) => (
            <li key={index} className="flex items-center gap-2 text-sm sm:text-base text-game-white/80">
              <span className="text-game-blue">✓</span>
              {achievement}
            </li>
          ))}
        </ul>
      </div>

      <blockquote className="mt-6 sm:mt-8 p-4 bg-black/30 rounded-lg border-l-4 border-game-blue">
        <p className="text-sm sm:text-base text-game-white/90 italic">"{transformation.testimonial}"</p>
      </blockquote>
    </Card>
  );
};

const Transformations = () => {
  const [selectedRank, setSelectedRank] = useState<string>('all');

  const filteredTransformations = selectedRank === 'all'
    ? transformations
    : transformations.filter(t => t.rank.toLowerCase() === selectedRank);

  return (
    <PageTransition>
      <div className="min-h-screen pt-20 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-game-black/95">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-gaming font-bold mb-6 sm:mb-8">
              The <span className="text-game-blue">Leaderboard</span>
            </h1>
            <p className="text-lg sm:text-xl text-game-white/90 max-w-3xl mx-auto px-4">
              Witness the incredible transformations of our community members.
              Each story represents a unique journey of dedication and achievement.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 px-4">
            {['all', 'bronze', 'silver', 'gold', 'diamond'].map((rank) => (
              <Button
                key={rank}
                variant={selectedRank === rank ? 'primary' : 'secondary'}
                size="md"
                glowing={selectedRank === rank}
                onClick={() => setSelectedRank(rank)}
                className="capitalize text-sm sm:text-base"
              >
                {rank === 'all' ? 'All Ranks' : rank}
              </Button>
            ))}
          </div>

          <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {filteredTransformations.map((transformation) => (
              <TransformationCard
                key={transformation.id}
                transformation={transformation}
              />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-16 sm:mt-24 text-center px-4"
          >
            <Card glowing className="inline-block max-w-2xl w-full">
              <h2 className="text-2xl sm:text-3xl font-gaming mb-4 sm:mb-6">Ready to Join the Ranks?</h2>
              <p className="text-sm sm:text-base text-game-white/80 mb-6 sm:mb-8">
                Start your transformation journey today and become part of our
                growing community of successful fitness gamers.
              </p>
              <Button
                variant="primary"
                size="lg"
                glowing
                fullWidth
              >
                Begin Your Transformation
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Transformations; 