import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Card from '../components/Card';
import Button from '../components/Button';

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
      <div className="min-h-screen pt-20 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-game-black/95">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-gaming font-bold mb-6 sm:mb-8">
              Available <span className="text-game-blue">Missions</span>
            </h1>
            <p className="text-lg sm:text-xl text-game-white/90 max-w-3xl mx-auto px-4">
              Choose your next fitness mission from our curated selection of
              workouts. Each mission offers unique challenges and rewards.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 px-4">
            {['all', 'strength', 'cardio', 'flexibility', 'recovery'].map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? 'primary' : 'secondary'}
                size="md"
                glowing={selectedType === type}
                onClick={() => setSelectedType(type)}
                className="capitalize text-sm sm:text-base"
              >
                {type === 'all' ? 'All Missions' : type}
              </Button>
            ))}
          </div>

          <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredMissions.map((mission) => (
                <MissionCard key={mission.id} mission={mission} />
              ))}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-16 sm:mt-24 text-center px-4"
          >
            <Card glowing className="inline-block max-w-2xl w-full">
              <h2 className="text-2xl sm:text-3xl font-gaming mb-4 sm:mb-6">Custom Mission?</h2>
              <p className="text-sm sm:text-base text-game-white/80 mb-6 sm:mb-8">
                Need a specialized workout program? Let's create a custom mission
                that matches your goals and preferences.
              </p>
              <Button
                variant="secondary"
                size="lg"
                glowing
                fullWidth
              >
                Create Custom Mission
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Training; 