import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import Card from '@/components/Card';
import Button from '@/components/Button';
import FitnessScene from '@/components/FitnessScene';
import { FaDumbbell, FaAppleAlt, FaUsers, FaCrown, FaRocket, FaChartLine, FaHeartbeat, FaBrain, 
         FaFire, FaBolt, FaStar, FaTrophy, FaGem, FaScroll, FaShieldAlt } from 'react-icons/fa';

interface Service {
  title: string;
  subtitle: string;
  description: string;
  features: Array<{
    text: string;
    icon: React.ReactNode;
    color: string;
  }>;
  icon: React.ReactNode;
  level: 'Novice' | 'Warrior' | 'Elite' | 'Legendary';
  price: string;
  popular?: boolean;
  unlocks: string[];
  difficulty: number;
  xpBonus: number;
  specialPerks: string[];
}

const services: Service[] = [
  {
    title: 'Novice Quest Pack',
    subtitle: 'Begin Your Legend',
    description: 'Perfect starting point for aspiring fitness warriors. Master the basics and build your foundation.',
    features: [
      { text: 'Basic Training Program', icon: <FaDumbbell />, color: 'text-green-400' },
      { text: 'Nutrition Starter Guide', icon: <FaAppleAlt />, color: 'text-green-400' },
      { text: 'Weekly Progress Tracking', icon: <FaChartLine />, color: 'text-green-400' },
      { text: 'Community Support', icon: <FaUsers />, color: 'text-green-400' },
      { text: 'Basic Form Tutorials', icon: <FaScroll />, color: 'text-green-400' }
    ],
    icon: <FaShieldAlt className="text-4xl text-green-400" />,
    level: 'Novice',
    price: '$79/month',
    difficulty: 1,
    xpBonus: 100,
    unlocks: ['Basic Equipment Mastery', 'Nutrition Knowledge Base', 'Beginner Achievements'],
    specialPerks: ['Starter Gear Pack', 'Basic Movement Library']
  },
  {
    title: 'Warrior Training Protocol',
    subtitle: 'Forge Your Power',
    description: 'Intermediate program for those ready to push their limits and achieve greater results.',
    features: [
      { text: 'Advanced Workout Plans', icon: <FaDumbbell />, color: 'text-blue-400' },
      { text: 'Custom Meal Planning', icon: <FaAppleAlt />, color: 'text-blue-400' },
      { text: 'Bi-weekly Check-ins', icon: <FaRocket />, color: 'text-blue-400' },
      { text: 'Form Video Analysis', icon: <FaHeartbeat />, color: 'text-blue-400' },
      { text: 'Priority Support', icon: <FaBolt />, color: 'text-blue-400' }
    ],
    icon: <FaFire className="text-4xl text-blue-400" />,
    level: 'Warrior',
    price: '$149/month',
    difficulty: 2,
    xpBonus: 250,
    unlocks: ['Advanced Exercise Library', 'Warrior Rank Benefits', 'Exclusive Challenges'],
    specialPerks: ['Custom Progress Dashboard', 'Monthly Strategy Call']
  },
  {
    title: 'Elite Performance System',
    subtitle: 'Master Your Destiny',
    description: 'Advanced program for dedicated athletes seeking exceptional results and personalized coaching.',
    features: [
      { text: 'Elite Programming', icon: <FaCrown />, color: 'text-purple-400' },
      { text: 'Advanced Nutrition', icon: <FaAppleAlt />, color: 'text-purple-400' },
      { text: 'Weekly 1-on-1 Coaching', icon: <FaBrain />, color: 'text-purple-400' },
      { text: '24/7 VIP Support', icon: <FaRocket />, color: 'text-purple-400' },
      { text: 'Recovery Optimization', icon: <FaHeartbeat />, color: 'text-purple-400' }
    ],
    icon: <FaTrophy className="text-4xl text-purple-400" />,
    level: 'Elite',
    price: '$249/month',
    popular: false,
    difficulty: 3,
    xpBonus: 500,
    unlocks: ['Elite Training Modules', 'Premium Features', 'Leadership Board Access'],
    specialPerks: ['Personal Coach Assignment', 'Recovery Protocol Access']
  },
  {
    title: 'Legendary Transformation',
    subtitle: 'Become Immortal',
    description: 'The ultimate fitness experience. Unlimited access to all premium features and personal coaching.',
    features: [
      { text: 'Legendary Programming', icon: <FaGem />, color: 'text-yellow-400' },
      { text: 'Master Nutrition Plan', icon: <FaAppleAlt />, color: 'text-yellow-400' },
      { text: 'Daily Coach Access', icon: <FaCrown />, color: 'text-yellow-400' },
      { text: 'Elite Recovery System', icon: <FaHeartbeat />, color: 'text-yellow-400' },
      { text: 'VIP Perks Unlocked', icon: <FaStar />, color: 'text-yellow-400' }
    ],
    icon: <FaGem className="text-4xl text-yellow-400" />,
    level: 'Legendary',
    price: '$399/month',
    difficulty: 4,
    xpBonus: 1000,
    unlocks: ['All Premium Content', 'Legendary Status', 'Special Events Access'],
    specialPerks: ['Private WhatsApp Line', 'Quarterly Planning Session']
  }
];

const levelColors = {
  Novice: 'from-green-400 to-green-600',
  Warrior: 'from-blue-400 to-blue-600',
  Elite: 'from-purple-400 to-purple-600',
  Legendary: 'from-yellow-400 to-yellow-600'
};

const difficultyStars = (level: number) => {
  return Array(level).fill('⭐').join('');
};

const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative ${service.popular ? 'sm:scale-105' : ''}`}
    >
      <Card
        glowing
        interactive
        className={`relative overflow-hidden transition-all duration-300
          ${service.popular ? 'border-yellow-400/50 hover:border-yellow-400' : ''}`}
      >
        {/* Level Badge */}
        <motion.div
          className={`absolute top-2 sm:top-4 right-2 sm:right-4 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-gaming
            bg-gradient-to-r ${levelColors[service.level]} bg-opacity-20 backdrop-blur-sm`}
          animate={{
            scale: [1, 1.05, 1],
            boxShadow: [
              '0 0 10px rgba(255,255,255,0.2)',
              '0 0 20px rgba(255,255,255,0.4)',
              '0 0 10px rgba(255,255,255,0.2)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Level {service.level}
        </motion.div>

        {/* Popular Badge */}
        {service.popular && (
          <motion.div
            className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-gaming z-10"
            animate={{
              y: [0, -5, 0],
              boxShadow: [
                '0 0 10px rgba(255,200,0,0.5)',
                '0 0 20px rgba(255,200,0,0.7)',
                '0 0 10px rgba(255,200,0,0.5)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Most Popular
          </motion.div>
        )}

        <div className="p-4 sm:p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-4 sm:mb-6">
            <motion.div
              className="flex-shrink-0 p-3 sm:p-4 rounded-lg bg-black/30 backdrop-blur-sm"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              {service.icon}
            </motion.div>
            <div>
              <h3 className="text-xl sm:text-2xl font-gaming text-game-white mb-2">
                {service.title}
              </h3>
              <p className="text-xs sm:text-sm text-game-white/60 mb-2">{service.subtitle}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-gaming text-game-white/80">Difficulty:</span>
                <span className="text-yellow-400 text-xs sm:text-sm">{difficultyStars(service.difficulty)}</span>
              </div>
              <div className="text-lg sm:text-xl font-gaming text-game-blue mt-2">
                {service.price}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-game-white/80 mb-4 sm:mb-6">
            {service.description}
          </p>

          {/* Features */}
          <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
            {service.features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + i * 0.1 }}
                className="flex items-center gap-2 sm:gap-3"
              >
                <span className={`text-base sm:text-lg ${feature.color}`}>
                  {feature.icon}
                </span>
                <span className="text-xs sm:text-sm text-game-white/90">{feature.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Unlocks & Perks */}
          <div className="space-y-4 mb-4 sm:mb-6">
            <div>
              <h4 className="text-xs sm:text-sm font-gaming text-game-white/60 mb-2">Unlocks:</h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {service.unlocks.map((unlock, i) => (
                  <span
                    key={i}
                    className="text-[10px] sm:text-xs px-2 py-1 rounded-full bg-game-blue/20 text-game-blue"
                  >
                    {unlock}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-gaming text-game-white/60 mb-2">Special Perks:</h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {service.specialPerks.map((perk, i) => (
                  <span
                    key={i}
                    className="text-[10px] sm:text-xs px-2 py-1 rounded-full bg-game-red/20 text-game-red"
                  >
                    {perk}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* XP Bonus */}
          <div className="text-center mb-4 sm:mb-6">
            <motion.div
              className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-game-blue/20 text-game-blue font-gaming text-sm sm:text-base"
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: [
                  '0 0 10px rgba(0,163,255,0.2)',
                  '0 0 20px rgba(0,163,255,0.4)',
                  '0 0 10px rgba(0,163,255,0.2)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              +{service.xpBonus} XP Bonus
            </motion.div>
          </div>

          {/* CTA Button */}
          <Button
            variant={service.popular ? "primary" : "secondary"}
            size="lg"
            glowing
            fullWidth
            onClick={() => window.open('https://wa.me/201277877499', '_blank')}
            className="relative overflow-hidden group text-sm sm:text-base"
          >
            <span className="relative z-10 group-hover:text-white transition-colors flex items-center justify-center gap-2">
              <span>Begin Your Quest</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ⚔️
              </motion.span>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-game-blue to-game-red opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

const Services = () => {
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8 sm:mb-16 md:mb-24"
            >
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-gaming font-bold mb-4 sm:mb-8">
                Choose Your <span className="text-game-blue">Path</span>
              </h1>
              <p className="text-base sm:text-xl md:text-2xl text-game-white/90 max-w-3xl mx-auto px-4">
                Select your difficulty and unlock powerful training protocols.
                Each tier grants unique perks and exclusive content.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-10">
              {services.map((service, index) => (
                <ServiceCard key={service.title} service={service} index={index} />
              ))}
            </div>

            {/* Custom Quest Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-12 sm:mt-24 text-center px-3 sm:px-0"
            >
              <Card 
                glowing 
                className="inline-block max-w-2xl w-full transform hover:scale-105 transition-all duration-300 
                  hover:shadow-[0_0_30px_rgba(0,163,255,0.3)] relative overflow-hidden"
              >
                <motion.div 
                  className="absolute inset-0 opacity-20"
                  animate={{
                    background: [
                      'radial-gradient(circle at 0% 0%, rgba(0,163,255,0.4) 0%, transparent 50%)',
                      'radial-gradient(circle at 100% 100%, rgba(255,0,0,0.4) 0%, transparent 50%)',
                      'radial-gradient(circle at 0% 0%, rgba(0,163,255,0.4) 0%, transparent 50%)',
                    ]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                <div className="relative z-10 p-4 sm:p-6">
                  <h2 className="text-2xl sm:text-4xl font-gaming mb-4 sm:mb-6">Need a Custom Quest?</h2>
                  <p className="text-base sm:text-xl text-game-white/80 mb-6 sm:mb-8">
                    Let's craft a unique training protocol tailored to your goals and schedule.
                    Our master trainers will design your perfect program.
                  </p>
                  <Button
                    variant="primary"
                    size="lg"
                    glowing
                    fullWidth
                    onClick={() => window.open('https://wa.me/201277877499', '_blank')}
                    className="relative overflow-hidden group text-sm sm:text-base"
                  >
                    <span className="relative z-10 group-hover:text-white transition-colors flex items-center justify-center gap-2">
                      <span>Create Custom Quest</span>
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        🎯
                      </motion.span>
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-game-blue to-game-red opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Services; 