import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Card from '../components/Card';
import Button from '../components/Button';

interface Plan {
  title: string;
  difficulty: string;
  price: number;
  description: string;
  features: string[];
  recommended?: boolean;
  color: string;
}

const plans: Plan[] = [
  {
    title: 'Easy Mode',
    difficulty: 'Beginner',
    price: 49,
    description: 'Perfect for those starting their fitness journey.',
    features: [
      'Basic workout routines',
      'Weekly check-ins',
      'Nutrition guidelines',
      'Community access',
      'Progress tracking app',
    ],
    color: 'from-green-500/20 to-green-700/20',
  },
  {
    title: 'Normal Mode',
    difficulty: 'Intermediate',
    price: 99,
    description: 'For dedicated players ready to level up.',
    features: [
      'Customized workout plans',
      'Bi-weekly check-ins',
      'Detailed meal plans',
      'Priority community access',
      'Advanced progress tracking',
      'Monthly group sessions',
    ],
    color: 'from-blue-500/20 to-blue-700/20',
  },
  {
    title: 'Hard Mode',
    difficulty: 'Advanced',
    price: 149,
    description: 'Challenge yourself with intense training.',
    features: [
      'Advanced training programs',
      'Weekly 1-on-1 check-ins',
      'Custom meal & supplement plans',
      'VIP community access',
      'Premium progress tracking',
      'Weekly group sessions',
      'Video form checks',
    ],
    recommended: true,
    color: 'from-purple-500/20 to-purple-700/20',
  },
  {
    title: 'Legendary Mode',
    difficulty: 'Elite',
    price: 299,
    description: 'The ultimate training experience.',
    features: [
      'Elite programming',
      '24/7 coach access',
      'Personalized nutrition',
      'Exclusive community perks',
      'Real-time progress tracking',
      'Unlimited group sessions',
      'Priority form checks',
      'Monthly strategy calls',
      'Custom supplement stack',
    ],
    color: 'from-yellow-500/20 to-yellow-700/20',
  },
];

const PlanCard = ({ plan }: { plan: Plan }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative ${plan.recommended ? 'scale-100 sm:scale-105' : ''}`}
    >
      {plan.recommended && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-game-blue px-4 py-1 rounded-full text-sm font-gaming z-10">
          Recommended
        </div>
      )}
      <Card
        glowing
        interactive
        size="lg"
        className={`h-full bg-gradient-to-br ${plan.color} backdrop-blur-lg
          ${plan.recommended ? 'border-2 border-game-blue' : ''}`}
      >
        <div className="text-center mb-4 sm:mb-6">
          <h3 className="text-2xl sm:text-3xl font-gaming text-game-white mb-2">
            {plan.title}
          </h3>
          <p className="text-sm sm:text-base text-game-white/80 mb-4">{plan.description}</p>
          <div className="text-3xl sm:text-4xl font-gaming text-game-blue">
            ${plan.price}
            <span className="text-base sm:text-lg text-game-white/60">/month</span>
          </div>
        </div>

        <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
          {plan.features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 text-sm sm:text-base"
            >
              <span className="text-game-blue">✓</span>
              <span className="text-game-white/90">{feature}</span>
            </motion.li>
          ))}
        </ul>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm
                flex items-center justify-center p-4 sm:p-6"
            >
              <Button
                variant="primary"
                size="lg"
                glowing
                fullWidth
              >
                Level Up Now
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};

const Plans = () => {
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
              Choose Your <span className="text-game-blue">Difficulty</span>
            </h1>
            <p className="text-lg sm:text-xl text-game-white/90 max-w-3xl mx-auto px-4">
              Select your training intensity and unlock exclusive features to
              accelerate your fitness journey. Each tier is designed to match your
              commitment level and goals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-16">
            {plans.map((plan) => (
              <PlanCard key={plan.title} plan={plan} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-16 sm:mt-24 text-center px-4"
          >
            <Card glowing className="inline-block max-w-2xl w-full">
              <h2 className="text-2xl sm:text-3xl font-gaming mb-4 sm:mb-6">Custom Challenge?</h2>
              <p className="text-sm sm:text-base text-game-white/80 mb-6 sm:mb-8">
                Need a specialized program? Let's create a custom plan that matches
                your unique goals and gaming schedule.
              </p>
              <Button
                variant="secondary"
                size="lg"
                glowing
                fullWidth
              >
                Create Custom Quest
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Plans; 