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
    description: 'Perfect starting point for aspiring fitness warriors. Master the basics and build your foundation with personalized guidance.',
    features: [
      { text: 'Customized Training Program', icon: <FaDumbbell />, color: 'text-green-400' },
      { text: 'Detailed Nutrition Guide', icon: <FaAppleAlt />, color: 'text-green-400' },
      { text: 'Weekly Progress Tracking', icon: <FaChartLine />, color: 'text-green-400' },
      { text: 'WhatsApp Community Access', icon: <FaUsers />, color: 'text-green-400' },
      { text: 'Video Form Tutorials', icon: <FaScroll />, color: 'text-green-400' }
    ],
    icon: <FaShieldAlt className="text-4xl text-green-400" />,
    level: 'Novice',
    price: '999 EGP/month',
    difficulty: 1,
    xpBonus: 100,
    unlocks: ['Basic Equipment Guide', 'Nutrition Fundamentals', 'Beginner Achievements'],
    specialPerks: ['Free Starter Pack', 'Exercise Library Access', 'Weekly Check-ins']
  },
  {
    title: 'Warrior Training Protocol',
    subtitle: 'Forge Your Power',
    description: 'Intermediate program with advanced training techniques, personalized nutrition, and regular coaching support.',
    features: [
      { text: 'Advanced Training Plans', icon: <FaDumbbell />, color: 'text-blue-400' },
      { text: 'Personalized Meal Plans', icon: <FaAppleAlt />, color: 'text-blue-400' },
      { text: '2x Weekly Check-ins', icon: <FaRocket />, color: 'text-blue-400' },
      { text: 'Video Form Analysis', icon: <FaHeartbeat />, color: 'text-blue-400' },
      { text: '24/7 WhatsApp Support', icon: <FaBolt />, color: 'text-blue-400' }
    ],
    icon: <FaFire className="text-4xl text-blue-400" />,
    level: 'Warrior',
    price: '1,499 EGP/month',
    popular: false,
    difficulty: 2,
    xpBonus: 250,
    unlocks: ['Advanced Exercise Library', 'Warrior Rank Benefits', 'Premium Challenges'],
    specialPerks: ['Progress Dashboard', 'Monthly Strategy Call', 'Supplement Guide']
  },
  {
    title: 'Elite Performance System',
    subtitle: 'Master Your Destiny',
    description: 'Advanced program for dedicated athletes with comprehensive coaching, nutrition planning, and premium support.',
    features: [
      { text: 'Elite Custom Programming', icon: <FaCrown />, color: 'text-purple-400' },
      { text: 'Advanced Nutrition Planning', icon: <FaAppleAlt />, color: 'text-purple-400' },
      { text: '3x Weekly Coaching Calls', icon: <FaBrain />, color: 'text-purple-400' },
      { text: 'Priority VIP Support', icon: <FaRocket />, color: 'text-purple-400' },
      { text: 'Recovery & Sleep Guide', icon: <FaHeartbeat />, color: 'text-purple-400' }
    ],
    icon: <FaTrophy className="text-4xl text-purple-400" />,
    level: 'Elite',
    price: '1,999 EGP/month',
    difficulty: 3,
    xpBonus: 500,
    unlocks: ['Elite Training Modules', 'VIP Features', 'Competition Prep Guide'],
    specialPerks: ['Dedicated Coach', 'Recovery Protocols', 'Monthly Body Analysis']
  },
  {
    title: 'Legendary Transformation',
    subtitle: 'Become Immortal',
    description: 'The ultimate VIP experience with unlimited access, daily coaching, and exclusive benefits for maximum results.',
    features: [
      { text: 'Legendary Custom Plans', icon: <FaGem />, color: 'text-yellow-400' },
      { text: 'Master Nutrition System', icon: <FaAppleAlt />, color: 'text-yellow-400' },
      { text: 'Daily Personal Coaching', icon: <FaCrown />, color: 'text-yellow-400' },
      { text: 'Elite Recovery System', icon: <FaHeartbeat />, color: 'text-yellow-400' },
      { text: 'Exclusive VIP Benefits', icon: <FaStar />, color: 'text-yellow-400' }
    ],
    icon: <FaGem className="text-4xl text-yellow-400" />,
    level: 'Legendary',
    price: '2,999 EGP/month',
    difficulty: 4,
    xpBonus: 1000,
    unlocks: ['All Premium Content', 'Legendary Status', 'VIP Events Access'],
    specialPerks: ['Private WhatsApp Line', 'Weekly Planning', 'Photoshoot Session']
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
      className="relative w-full"
    >
      <Card
        glowing
        interactive
        className="relative overflow-hidden transition-all duration-300 h-full bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-lg border-opacity-50 hover:border-opacity-100"
      >
        {/* Level Badge */}
        <motion.div
          className={`absolute top-3 right-3 px-3 py-1.5 rounded-full text-[10px] xs:text-xs sm:text-sm font-gaming
            bg-gradient-to-r ${levelColors[service.level]} bg-opacity-30 backdrop-blur-sm border border-current`}
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

        <div className="p-4 xs:p-5 sm:p-6">
          {/* Header */}
          <div className="flex flex-col xs:flex-row items-center xs:items-start gap-4 xs:gap-5 sm:gap-6 mb-4 xs:mb-5 sm:mb-6">
            <motion.div
              className="flex-shrink-0 p-3 xs:p-4 rounded-2xl bg-gradient-to-br from-black/60 to-black/20 backdrop-blur-sm border border-white/10"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              {service.icon}
            </motion.div>
            <div className="flex-1 text-center xs:text-left">
              <h3 className="text-xl xs:text-2xl sm:text-3xl font-gaming text-game-white mb-2">
                {service.title}
              </h3>
              <p className="text-xs sm:text-sm text-game-white/60 mb-2">{service.subtitle}</p>
              <div className="flex items-center justify-center xs:justify-start gap-2">
                <span className="text-xs sm:text-sm font-gaming text-game-white/80">Difficulty:</span>
                <span className="text-yellow-400 text-xs sm:text-sm">{difficultyStars(service.difficulty)}</span>
              </div>
              <div className="text-xl xs:text-2xl sm:text-3xl font-gaming bg-gradient-to-r from-game-blue to-game-red bg-clip-text text-transparent mt-2">
                {service.price}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="relative mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-xs sm:text-sm text-game-white/90">
              {service.description}
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3 mb-6">
            {service.features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + i * 0.1 }}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <span className={`text-lg sm:text-xl ${feature.color}`}>
                  {feature.icon}
                </span>
                <span className="text-xs sm:text-sm text-game-white/90">{feature.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Unlocks & Perks */}
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 mb-6">
            <div className="p-3 rounded-xl bg-game-blue/5 border border-game-blue/20">
              <h4 className="text-xs sm:text-sm font-gaming text-game-blue mb-2">Unlocks:</h4>
              <div className="flex flex-wrap gap-1.5">
                {service.unlocks.map((unlock, i) => (
                  <span
                    key={i}
                    className="text-[10px] sm:text-xs px-2 py-1 rounded-full bg-game-blue/20 text-game-blue/90"
                  >
                    {unlock}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-game-red/5 border border-game-red/20">
              <h4 className="text-xs sm:text-sm font-gaming text-game-red mb-2">Special Perks:</h4>
              <div className="flex flex-wrap gap-1.5">
                {service.specialPerks.map((perk, i) => (
                  <span
                    key={i}
                    className="text-[10px] sm:text-xs px-2 py-1 rounded-full bg-game-red/20 text-game-red/90"
                  >
                    {perk}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* XP Bonus */}
          <div className="text-center mb-6">
            <motion.div
              className="inline-block px-4 py-2 rounded-xl bg-gradient-to-r from-game-blue/20 to-game-red/20 text-white font-gaming text-sm sm:text-base border border-white/10"
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
            variant="secondary"
            size="lg"
            glowing
            fullWidth
            onClick={() => window.open('https://wa.me/201277877499', '_blank')}
            className="relative overflow-hidden group text-sm sm:text-base font-gaming rounded-xl border-2"
          >
            <span className="relative z-10 group-hover:text-white transition-colors flex items-center justify-center gap-2 py-1">
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
        <div className="fixed inset-0 pointer-events-none opacity-50">
          <FitnessScene />
        </div>

        {/* Content */}
        <div className="relative z-10 pt-20 xs:pt-24 sm:pt-32 pb-8 xs:pb-12 sm:pb-16 px-3 xs:px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8 xs:mb-12 sm:mb-16"
            >
              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-gaming font-bold mb-4 sm:mb-6 bg-gradient-to-r from-game-blue via-white to-game-red bg-clip-text text-transparent">
                Choose Your Path
              </h1>
              <p className="text-sm xs:text-base sm:text-lg text-game-white/90 max-w-3xl mx-auto px-4">
                Select your difficulty and unlock powerful training protocols.
                Each tier grants unique perks and exclusive content.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-8 sm:gap-10">
              {services.map((service, index) => (
                <ServiceCard key={service.title} service={service} index={index} />
              ))}
            </div>

            {/* Custom Quest Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-10 xs:mt-16 sm:mt-24 text-center px-0"
            >
              <Card 
                glowing 
                className="inline-block max-w-2xl w-full transform hover:scale-105 transition-all duration-300 
                  hover:shadow-[0_0_30px_rgba(0,163,255,0.3)] relative overflow-hidden bg-gradient-to-br from-black/80 to-black/40"
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
                
                <div className="relative z-10 p-6 xs:p-8 sm:p-10">
                  <h2 className="text-2xl xs:text-3xl sm:text-4xl font-gaming mb-4 xs:mb-6 bg-gradient-to-r from-game-blue to-game-red bg-clip-text text-transparent">
                    Need a Custom Quest?
                  </h2>
                  <p className="text-sm xs:text-base sm:text-lg text-game-white/90 mb-6 xs:mb-8">
                    Let's craft a unique training protocol tailored to your goals and schedule.
                    Our master trainers will design your perfect program.
                  </p>
                  <Button
                    variant="primary"
                    size="lg"
                    glowing
                    fullWidth
                    onClick={() => window.open('https://wa.me/201277877499', '_blank')}
                    className="relative overflow-hidden group text-sm sm:text-base font-gaming rounded-xl border-2"
                  >
                    <span className="relative z-10 group-hover:text-white transition-colors flex items-center justify-center gap-2 py-1">
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