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
    title: '1 Month Quest Pack',
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
    price: '300 EGP',
    difficulty: 1,
    xpBonus: 300,
    unlocks: ['Basic Equipment Guide', 'Nutrition Fundamentals', 'Beginner Achievements'],
    specialPerks: ['Free Starter Pack', 'Exercise Library Access', 'Weekly Check-ins']
  },
  {
    title: '3 Months Training Protocol',
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
    price: '900 EGP',
    popular: false,
    difficulty: 2,
    xpBonus: 900,
    unlocks: ['Advanced Exercise Library', 'Warrior Rank Benefits', 'Premium Challenges'],
    specialPerks: ['Progress Dashboard', 'Monthly Strategy Call', 'Supplement Guide']
  },
  {
    title: '6 Months Performance System',
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
    price: '2,000 EGP',
    difficulty: 3,
    xpBonus: 2000,
    unlocks: ['Elite Training Modules', 'VIP Features', 'Competition Prep Guide'],
    specialPerks: ['Dedicated Coach', 'Recovery Protocols', 'Monthly Body Analysis']
  },
  {
    title: '12 Months Legendary Transformation',
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
    price: '3,500 EGP (Regular: 5,000 EGP)',
    difficulty: 4,
    xpBonus: 5000,
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
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 15,
          delay: index * 0.2
        }
      }}
      whileHover={{ 
        scale: 1.02,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative w-full"
    >
      <Card
        glowing
        interactive
        className="relative overflow-hidden transition-all duration-500 h-full bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-lg border-2 border-game-blue/50 hover:border-game-red/50 shadow-[0_0_30px_rgba(0,163,255,0.3)] hover:shadow-[0_0_50px_rgba(255,0,0,0.5)] group"
      >
        {/* Particle Effects */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            transition: { duration: 0.3 }
          }}
        >
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-game-blue rounded-full"
                animate={{
                  y: [-10, -50],
                  x: [Math.random() * 100, Math.random() * 100],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        </motion.div>
        {/* Gaming Frame Effects */}
        <div className="absolute inset-0 border-4 border-transparent bg-gradient-to-br from-game-blue/20 via-transparent to-game-red/20 animate-pulse-slow group-hover:opacity-80 transition-opacity duration-500" />
        <div className="absolute -inset-1 border border-game-blue/30 clip-frame animate-rotate-slow group-hover:border-game-blue/50" />
        <div className="absolute -inset-1 border border-game-red/30 clip-frame animate-rotate-reverse-slow group-hover:border-game-red/50" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-game-blue/10 to-game-red/10"
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.02, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
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

        <div className="p-6 sm:p-8">
          {/* Icon and Title Section */}
          <div className="text-center mb-8">
            <motion.div
              className="mx-auto w-24 h-24 p-6 mb-6 rounded-2xl bg-gradient-to-br from-black/60 to-black/20 backdrop-blur-sm border-2 border-game-blue/30 hover:border-game-red/30 shadow-[0_0_20px_rgba(0,163,255,0.3)] hover:shadow-[0_0_20px_rgba(255,0,0,0.3)]"
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
              <div className="text-5xl transform hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
            </motion.div>
            
            <h3 className="text-2xl sm:text-3xl font-gaming text-game-white mb-3">
              {service.title}
            </h3>
            <p className="text-sm sm:text-base text-game-white/60 mb-4">{service.subtitle}</p>
            
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-sm sm:text-base font-gaming text-game-white/80">Difficulty:</span>
              <span className="text-yellow-400 text-sm sm:text-base">{difficultyStars(service.difficulty)}</span>
            </div>
            
            <div className="text-2xl sm:text-3xl font-gaming">
              {service.title === '12 Months Legendary Transformation' ? (
                <div className="flex flex-col items-center gap-2">
                  <motion.span 
                    className="text-gray-400 line-through text-xl"
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    5,000 EGP
                  </motion.span>
                  <motion.span 
                    className="bg-gradient-to-r from-game-blue to-game-red bg-clip-text text-transparent"
                    animate={{
                      textShadow: [
                        '0 0 5px rgba(0,163,255,0.5)',
                        '0 0 20px rgba(255,0,0,0.5)',
                        '0 0 5px rgba(0,163,255,0.5)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    3,500 EGP
                  </motion.span>
                </div>
              ) : (
                <motion.span 
                  className="bg-gradient-to-r from-game-blue to-game-red bg-clip-text text-transparent"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  {service.price}
                </motion.span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="relative mb-8 p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <p className="text-sm sm:text-base text-game-white/90 text-center">
              {service.description}
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3 mb-8">
            {service.features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + i * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  transition: { type: 'spring', stiffness: 400 }
                }}
                className="flex items-center gap-4 p-3 rounded-lg border border-white/5 transform-gpu"
              >
                <span className={`text-xl sm:text-2xl ${feature.color}`}>
                  {feature.icon}
                </span>
                <span className="text-sm sm:text-base text-game-white/90">{feature.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Unlocks & Perks */}
          <div className="grid grid-cols-1 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-game-blue/5 border border-game-blue/20 backdrop-blur-sm">
              <h4 className="text-sm sm:text-base font-gaming text-game-blue mb-3 text-center">Unlocks:</h4>
              <div className="flex flex-wrap justify-center gap-2">
                {service.unlocks.map((unlock, i) => (
                  <span
                    key={i}
                    className="text-xs sm:text-sm px-3 py-1.5 rounded-full bg-game-blue/20 text-game-blue/90 border border-game-blue/30"
                  >
                    {unlock}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-game-red/5 border border-game-red/20 backdrop-blur-sm">
              <h4 className="text-sm sm:text-base font-gaming text-game-red mb-3 text-center">Special Perks:</h4>
              <div className="flex flex-wrap justify-center gap-2">
                {service.specialPerks.map((perk, i) => (
                  <span
                    key={i}
                    className="text-xs sm:text-sm px-3 py-1.5 rounded-full bg-game-red/20 text-game-red/90 border border-game-red/30"
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
      <div className="relative min-h-screen bg-game-black overflow-hidden">
        {/* Enhanced Background Effects */}
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(0,163,255,0.2)_0%,transparent_70%)] animate-pulse opacity-70" />
        <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(255,0,0,0.2)_0%,transparent_100%)] animate-pulse opacity-50" />
        <div className="fixed inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,rgba(0,163,255,0.1)_0%,rgba(255,0,0,0.1)_25%,rgba(0,163,255,0.1)_50%,rgba(255,0,0,0.1)_75%,rgba(0,163,255,0.1)_100%)] animate-spin-slow opacity-30" />

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
              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-gaming font-bold mb-4 sm:mb-6 bg-gradient-to-r from-game-blue via-white to-game-red bg-clip-text text-transparent animate-glow">
                Full Arsenal
              </h1>
              <p className="text-sm xs:text-base sm:text-lg text-game-white/90 max-w-3xl mx-auto px-4">
                Select your difficulty and unlock powerful training protocols.
                Each tier grants unique perks and exclusive content.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 xl:gap-10 mb-12">
              {services.map((service, index) => (
                <div key={service.title} className="flex">
                  <ServiceCard service={service} index={index} />
                </div>
              ))}
            </div>

            {/* Custom Quest Section with improved spacing */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8, type: "spring", stiffness: 100 }}
              className="mt-16 sm:mt-24 lg:mt-32 text-center px-4 sm:px-6"
            >
              <Card 
                glowing 
                className="inline-block max-w-3xl w-full transform hover:scale-105 transition-all duration-500 
                  hover:shadow-[0_0_50px_rgba(0,163,255,0.5)] relative overflow-hidden bg-gradient-to-br from-black/80 to-black/40 group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-game-blue/20 to-game-red/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <motion.div
                  className="absolute -inset-1 border-2 border-game-blue/30 rounded-xl"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
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
                
                <div className="relative z-10 p-8 sm:p-10 lg:p-12">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-gaming mb-6 sm:mb-8 bg-gradient-to-r from-game-blue to-game-red bg-clip-text text-transparent">
                    Need a Custom Quest?
                  </h2>
                  <p className="text-base sm:text-lg lg:text-xl text-game-white/90 mb-8 sm:mb-10 max-w-2xl mx-auto">
                    Let's craft a unique training protocol tailored to your goals and schedule.
                    Our master trainers will design your perfect program.
                  </p>
                  <Button
                    variant="primary"
                    size="lg"
                    glowing
                    fullWidth
                    onClick={() => window.open('https://wa.me/201277877499', '_blank')}
                    className="relative overflow-hidden group text-base sm:text-lg font-gaming rounded-xl border-2 max-w-md mx-auto"
                  >
                    <span className="relative z-10 group-hover:text-white transition-colors flex items-center justify-center gap-3 py-2">
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