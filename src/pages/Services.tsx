import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Card from '../components/Card';
import Button from '../components/Button';

interface Service {
  title: string;
  description: string;
  features: string[];
  icon: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Elite';
}

const services: Service[] = [
  {
    title: 'Personalized Training Programs',
    description: 'Custom workout routines designed around your gaming schedule and fitness goals.',
    features: [
      'Tailored workout plans',
      'Progress tracking',
      'Video demonstrations',
      'Weekly adjustments',
    ],
    icon: '🎮',
    level: 'Beginner',
  },
  {
    title: 'Nutrition & Diet Coaching',
    description: 'Level up your nutrition with gaming-inspired meal plans and supplement guidance.',
    features: [
      'Customized meal plans',
      'Supplement recommendations',
      'Macro tracking',
      'Hydration guides',
    ],
    icon: '🍎',
    level: 'Intermediate',
  },
  {
    title: 'Virtual Group Sessions',
    description: 'Join live group workouts and compete in fitness challenges with fellow gamers.',
    features: [
      'Live workout streams',
      'Community challenges',
      'Leaderboards',
      'Achievement system',
    ],
    icon: '👥',
    level: 'Advanced',
  },
  {
    title: 'Elite Coaching Package',
    description: 'The ultimate training experience with direct access to Coach Moumen.',
    features: [
      '24/7 coach support',
      'Personalized strategy',
      'VIP discord access',
      'Monthly 1-on-1 calls',
    ],
    icon: '👑',
    level: 'Elite',
  },
];

const levelColors = {
  Beginner: 'text-green-400',
  Intermediate: 'text-blue-400',
  Advanced: 'text-purple-400',
  Elite: 'text-yellow-400',
};

const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card
        glowing
        interactive
        size="lg"
        className="h-full"
      >
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <span className="text-3xl sm:text-4xl">{service.icon}</span>
          <div className="flex-1">
            <h3 className="text-xl sm:text-2xl font-gaming text-game-blue mb-2">
              {service.title}
            </h3>
            <span className={`text-sm font-gaming ${levelColors[service.level]}`}>
              {service.level} Level
            </span>
          </div>
        </div>
        
        <p className="mt-4 text-sm sm:text-base text-game-white/80">{service.description}</p>
        
        <ul className="mt-6 space-y-3">
          {service.features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-sm sm:text-base">
              <span className="w-1.5 h-1.5 bg-game-blue rounded-full"></span>
              <span className="text-game-white/90">{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          variant="secondary"
          size="lg"
          glowing
          fullWidth
          className="mt-6 sm:mt-8"
        >
          Select Quest
        </Button>
      </Card>
    </motion.div>
  );
};

const Services = () => {
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
              The Full <span className="text-game-blue">Arsenal</span>
            </h1>
            <p className="text-lg sm:text-xl text-game-white/90 max-w-3xl mx-auto px-4">
              Choose your path to greatness with our comprehensive range of
              gaming-inspired fitness services. Each service is designed to help you
              level up your fitness journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-16">
            {services.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-16 sm:mt-24 text-center px-4"
          >
            <Card glowing className="inline-block max-w-2xl w-full">
              <h2 className="text-2xl sm:text-3xl font-gaming mb-4 sm:mb-6">Need Help Choosing?</h2>
              <p className="text-sm sm:text-base text-game-white/80 mb-6 sm:mb-8">
                Schedule a free consultation to find the perfect program for your goals.
              </p>
              <Button
                variant="primary"
                size="lg"
                glowing
                fullWidth
              >
                Schedule Consultation
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Services; 