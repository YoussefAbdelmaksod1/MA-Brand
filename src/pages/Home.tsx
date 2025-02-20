import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FloatingLogo from '../components/FloatingLogo';
import CoachProfile from '../components/CoachProfile';
import FitnessScene from '../components/FitnessScene';
import {
  fadeInUp,
  fadeInDown,
  staggerContainer,
  neonPulse,
  floatingAnimation,
  powerUpAnimation,
  levelUpFlash,
  pixelateIn,
  gameCardHover,
  progressBarFill,
  bounceIn,
  shakeAnimation
} from '../hooks/useAnimations';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaChartLine, FaTrophy, FaHeartbeat } from 'react-icons/fa';

const StatCounter = ({ value, label, icon }: { value: number; label: string; icon: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setCount(Math.min(Math.round(increment * currentStep), value));
      if (currentStep >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      variants={bounceIn}
      className="game-card transform hover:scale-105 transition-all duration-300 p-4 sm:p-6"
      whileHover="hover"
    >
      <motion.div
        variants={powerUpAnimation}
        className="text-3xl sm:text-4xl mb-2"
      >
        {icon}
      </motion.div>
      <motion.span
        className="text-2xl sm:text-4xl font-gaming text-game-blue block"
        variants={neonPulse}
        initial="initial"
        animate="animate"
      >
        {count}+
      </motion.span>
      <motion.div
        className="h-2 bg-black/30 rounded-full overflow-hidden mt-2"
      >
        <motion.div
          className="h-full bg-gradient-to-r from-game-blue to-game-red"
          variants={progressBarFill}
          initial="initial"
          animate="animate"
        />
      </motion.div>
      <p className="text-sm sm:text-base text-game-white/80 mt-2">{label}</p>
    </motion.div>
  );
};

const FeatureCard = ({ title, description, icon }: { title: string; description: string; icon: string }) => {
  return (
    <motion.div
      variants={gameCardHover}
      initial="initial"
      whileHover="hover"
      className="game-card relative overflow-hidden group p-4 sm:p-6"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-game-blue/20 to-game-red/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
      <motion.div
        variants={powerUpAnimation}
        className="text-3xl sm:text-4xl mb-3 sm:mb-4 text-game-blue"
      >
        {icon}
      </motion.div>
      <h3 className="text-xl sm:text-2xl font-gaming mb-3 sm:mb-4 text-game-blue">{title}</h3>
      <p className="text-sm sm:text-base text-game-white/80 relative z-10">{description}</p>
      
      <motion.div
        variants={levelUpFlash}
        className="absolute inset-0 bg-white/10 pointer-events-none"
        initial="initial"
        animate="animate"
      />
    </motion.div>
  );
};

const Home = () => {
  const { scrollYProgress } = useScroll();
  const navigate = useNavigate();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-game-black to-black">
      {/* Background Scene with enhanced effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,163,255,0.1)_0%,transparent_70%)] opacity-50" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,0,0,0.1)_0%,transparent_100%)] opacity-30" />
        <FitnessScene />
      </div>
      
      {/* Content */}
      <div className="relative z-10 pointer-events-auto">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-32"
        >
          {/* Hero Section */}
          <div className="min-h-[90vh] flex flex-col justify-center items-center relative">
            <motion.div
              style={{ opacity, scale }}
              className="text-center max-w-5xl mx-auto relative z-10 px-4 sm:px-6 -mt-48"
            >
              <motion.div
                variants={floatingAnimation}
                initial="initial"
                animate="animate"
                className="mb-6 sm:mb-8 w-32 h-32 sm:w-48 sm:h-48 mx-auto"
              >
                <FloatingLogo />
              </motion.div>

              <motion.h1
                variants={fadeInDown}
                className="text-4xl sm:text-6xl md:text-7xl font-gaming font-bold mb-4 sm:mb-6 leading-tight tracking-wider"
              >
                <motion.span
                  variants={pixelateIn}
                  className="text-game-white text-glow inline-block transform hover:scale-105 transition-transform duration-300"
                >
                  Enter
                </motion.span>{' '}
                <motion.span
                  variants={neonPulse}
                  initial="initial"
                  animate="animate"
                  className="text-game-blue text-glow inline-block transform hover:scale-105 transition-transform duration-300"
                >
                  the Game
                </motion.span>
                <motion.span
                  variants={neonPulse}
                  initial="initial"
                  animate="animate"
                  className="block text-game-red text-glow-red mt-3 sm:mt-4 transform hover:scale-105 transition-transform duration-300"
                >
                  Level Up Your Life
                </motion.span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg sm:text-xl md:text-3xl mb-8 sm:mb-12 text-game-white/90 font-gaming tracking-wide text-glow max-w-3xl mx-auto px-4"
              >
                Join the ultimate fusion of gaming and fitness with Coach Moumen Atef
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 px-4 sm:px-0"
              >
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: [
                      '0 0 20px rgba(255,0,0,0.5)',
                      '0 0 30px rgba(255,0,0,0.3)',
                      '0 0 40px rgba(255,0,0,0.1)'
                    ]
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open('https://wa.me/201277877499', '_blank')}
                  className="relative group bg-gradient-to-r from-game-red to-game-red/80 
                    text-xl sm:text-2xl px-8 sm:px-12 py-4 sm:py-5 rounded-lg w-full sm:w-auto 
                    min-w-[200px] font-gaming text-white border-2 border-game-red/50 
                    hover:border-game-red transition-all duration-300 overflow-hidden
                    shadow-[0_0_20px_rgba(255,0,0,0.3)]"
                >
                  <motion.span
                    variants={shakeAnimation}
                    className="relative z-10"
                  >
                    Start Your Journey
                  </motion.span>
                  <motion.div
                    variants={levelUpFlash}
                    className="absolute inset-0 bg-white/20"
                    initial="initial"
                    animate="animate"
                  />
                </motion.button>

                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: [
                      '0 0 20px rgba(0,163,255,0.5)',
                      '0 0 30px rgba(0,163,255,0.3)',
                      '0 0 40px rgba(0,163,255,0.1)'
                    ]
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/services')}
                  className="relative group bg-gradient-to-r from-game-blue to-game-blue/80 
                    text-xl sm:text-2xl px-8 sm:px-12 py-4 sm:py-5 rounded-lg w-full sm:w-auto 
                    min-w-[200px] font-gaming text-white border-2 border-game-blue/50 
                    hover:border-game-blue transition-all duration-300 overflow-hidden
                    shadow-[0_0_20px_rgba(0,163,255,0.3)]"
                >
                  <motion.span
                    variants={shakeAnimation}
                    className="relative z-10"
                  >
                    View Programs
                  </motion.span>
                  <motion.div
                    variants={levelUpFlash}
                    className="absolute inset-0 bg-white/20"
                    initial="initial"
                    animate="animate"
                  />
                </motion.button>
              </motion.div>
            </motion.div>
          </div>

          {/* Coach Profile Section */}
          <motion.section
            variants={fadeInUp}
            className="py-16 sm:py-24"
          >
            <CoachProfile />
          </motion.section>

          {/* Stats Section */}
          <motion.section
            variants={fadeInUp}
            className="py-16 sm:py-24 relative"
          >
            <div className="absolute inset-0">
              <div className="bg-[radial-gradient(ellipse_at_top,rgba(0,163,255,0.15),transparent_50%)]" />
              <div className="bg-[radial-gradient(ellipse_at_bottom,rgba(255,0,0,0.15),transparent_50%)]" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="relative"
            >
              <motion.div 
                className="text-center mb-12"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-gaming mb-4">
                  Achievement <span className="text-game-red">Unlocked</span>
                </h2>
                <div className="flex justify-center items-center gap-2 text-xl font-gaming text-game-white/80">
                  <span className="text-2xl">🎮</span>
                  <span>Level Up Your Fitness Journey</span>
                  <span className="text-2xl">💪</span>
                </div>
              </motion.div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                <StatCounter 
                  value={1500} 
                  label="Total XP Gained" 
                  icon="⚡" 
                />
                <StatCounter 
                  value={350} 
                  label="Active Warriors" 
                  icon="⚔️" 
                />
                <StatCounter 
                  value={95} 
                  label="Success Rate" 
                  icon="🎯" 
                />
                <StatCounter 
                  value={180} 
                  label="Boss Battles Won" 
                  icon="👑" 
                />
              </div>

              <motion.div 
                className="mt-16 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="inline-block relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/transformations')}
                    className="px-8 py-4 bg-gradient-to-r from-game-blue to-game-red rounded-lg font-gaming text-xl relative overflow-hidden group"
                  >
                    <span className="relative z-10">View Leaderboard</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-game-red to-game-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </motion.button>
                  <motion.div
                    className="absolute -top-2 -right-2 bg-game-red text-white text-sm px-2 py-1 rounded font-gaming"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    NEW!
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.section>

          {/* Game-Style Progress Section */}
          <motion.section
            variants={fadeInUp}
            className="py-16 sm:py-24 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-game-blue/5 to-transparent" />
            <div className="relative max-w-4xl mx-auto px-4">
              <motion.div 
                className="bg-black/40 backdrop-blur-md rounded-2xl p-8 border border-game-blue/30"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl sm:text-3xl font-gaming text-game-blue">Current Quest</h3>
                  <span className="px-4 py-2 bg-game-red/20 rounded-lg text-game-red font-gaming">LEVEL 1</span>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-game-white/90 mb-2">
                      <span className="font-gaming">Daily Workout Streak</span>
                      <span className="font-gaming">7/10</span>
                    </div>
                    <div className="h-4 bg-black/50 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full w-[70%] bg-gradient-to-r from-game-blue to-game-red"
                        initial={{ width: 0 }}
                        whileInView={{ width: "70%" }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-game-white/90 mb-2">
                      <span className="font-gaming">Nutrition Goals</span>
                      <span className="font-gaming">85%</span>
                    </div>
                    <div className="h-4 bg-black/50 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full w-[85%] bg-gradient-to-r from-game-blue to-game-red"
                        initial={{ width: 0 }}
                        whileInView={{ width: "85%" }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-8">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 bg-game-blue/20 rounded-lg border border-game-blue/50"
                    >
                      <span className="font-gaming text-game-blue">🎯 Perfect Form</span>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 bg-game-red/20 rounded-lg border border-game-red/50"
                    >
                      <span className="font-gaming text-game-red">💪 Strength +10</span>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 bg-white/10 rounded-lg border border-white/30"
                    >
                      <span className="font-gaming text-white">⚡ Speed +5</span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* Video Section - Repositioned and Improved */}
          <motion.section
            variants={fadeInUp}
            className="py-16 sm:py-24 relative"
          >
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-game-blue/10 via-transparent to-game-red/10" />
              <motion.div
                className="absolute inset-0"
                animate={{
                  background: [
                    'radial-gradient(circle at 20% 20%, rgba(0,163,255,0.15) 0%, transparent 40%)',
                    'radial-gradient(circle at 80% 80%, rgba(255,0,0,0.15) 0%, transparent 40%)',
                    'radial-gradient(circle at 20% 20%, rgba(0,163,255,0.15) 0%, transparent 40%)'
                  ]
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />
            </div>

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Section Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-gaming mb-4 relative inline-block">
                  <span className="text-game-blue">Experience</span> The{' '}
                  <span className="text-game-red">Journey</span>
                  <motion.div
                    className="absolute -top-4 -right-4 text-2xl text-game-gold opacity-75"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <FaStar />
                  </motion.div>
                </h2>
                <p className="text-base sm:text-lg text-game-white/90 max-w-2xl mx-auto">
                  Discover how our gamified fitness system transforms your workout experience
                  into an epic adventure of personal growth and achievement.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                {/* Video Container */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="relative"
                >
                  <div className="relative rounded-xl overflow-hidden shadow-[0_0_30px_rgba(0,163,255,0.2)]">
                    {/* Gradient Border */}
                    <div className="absolute inset-0 p-[2px] rounded-xl bg-gradient-to-r from-game-blue via-white to-game-red">
                      <div className="absolute inset-0 rounded-xl bg-black" />
                    </div>
                    
                    {/* Video Player */}
                    <div className="relative">
                      <video
                        className="w-full rounded-xl aspect-video"
                        controls
                        playsInline
                        poster="/4.gif"
                        controlsList="nodownload"
                        onContextMenu={(e) => e.preventDefault()}
                        disablePictureInPicture
                        disableRemotePlayback
                      >
                        <source src="/video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      
                      {/* Overlay Glow Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-game-blue/10 to-game-red/10 pointer-events-none"
                        animate={{
                          opacity: [0.2, 0.3, 0.2],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="space-y-6"
                >
                  {[
                    {
                      icon: <FaChartLine className="text-game-blue" />,
                      title: "Smart Progress Tracking",
                      description: "Advanced analytics to monitor your fitness journey in real-time"
                    },
                    {
                      icon: <FaTrophy className="text-game-gold" />,
                      title: "Achievement System",
                      description: "Earn rewards and unlock special perks as you reach new milestones"
                    },
                    {
                      icon: <FaHeartbeat className="text-game-red" />,
                      title: "Personalized Coaching",
                      description: "Get expert guidance tailored to your unique fitness goals"
                    }
                  ].map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-4 sm:p-6
                        hover:border-game-blue/50 transition-all duration-300 group flex items-start gap-4"
                    >
                      <motion.div
                        className="text-2xl sm:text-3xl flex-shrink-0"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {feature.icon}
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-gaming mb-2">{feature.title}</h3>
                        <p className="text-sm text-game-white/70">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Quote Section */}
          <motion.section
            variants={fadeInUp}
            className="py-16 sm:py-24 relative overflow-hidden"
          >
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-game-blue/20 via-black to-game-red/20" />
              <motion.div
                className="absolute top-0 left-0 w-full h-full"
                animate={{
                  background: [
                    'radial-gradient(circle at 30% 30%, rgba(0,163,255,0.1) 0%, transparent 50%)',
                    'radial-gradient(circle at 70% 70%, rgba(255,0,0,0.1) 0%, transparent 50%)',
                    'radial-gradient(circle at 30% 30%, rgba(0,163,255,0.1) 0%, transparent 50%)'
                  ]
                }}
                transition={{ duration: 10, repeat: Infinity }}
              />
            </div>
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 max-w-4xl mx-auto text-center px-4"
            >
              <motion.div 
                className="mb-8 text-6xl"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                🏆
              </motion.div>
              
              <motion.div
                className="relative bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-game-blue/30"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-game-blue" />
                <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-game-red" />
                <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-game-red" />
                <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-game-blue" />
                
                <p className="text-xl sm:text-2xl md:text-3xl font-gaming mb-6 text-game-white leading-relaxed">
                  "In the game of fitness, every rep is a power-up, 
                  every set is a level, and every workout is a boss fight. 
                  Are you ready to become the main character of your story?"
                </p>
                
                <motion.div
                  className="text-game-blue font-gaming text-xl"
                  animate={{ 
                    color: ['#00A3FF', '#FF0000', '#00A3FF']
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  - Coach Moumen
                </motion.div>
              </motion.div>
              
              <div className="mt-12 flex flex-wrap justify-center gap-4">
                <motion.div
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-game-blue/20 to-game-blue/10 border border-game-blue"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0,163,255,0.3)' }}
                >
                  <span className="text-game-blue font-gaming">Elite Trainer</span>
                </motion.div>
                <motion.div
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-game-red/20 to-game-red/10 border border-game-red"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255,0,0,0.3)' }}
                >
                  <span className="text-game-red font-gaming">Fitness Master</span>
                </motion.div>
                <motion.div
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-game-blue/20 to-game-red/20 border-2 border-white/20"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255,255,255,0.2)' }}
                >
                  <span className="text-white font-gaming">Level 99</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.section>

          {/* Features Section */}
          <motion.section
            variants={staggerContainer}
            className="py-16 sm:py-24"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              <FeatureCard
                title="Personalized Training"
                description="Custom workout routines tailored to your goals and gaming schedule. Level up your fitness journey with expert guidance."
                icon="🎮"
              />
              <FeatureCard
                title="Nutrition Mastery"
                description="Level up your diet with gaming-inspired meal plans. Unlock new recipes and power-ups for optimal performance."
                icon="🥗"
              />
              <FeatureCard
                title="Community Quests"
                description="Join fellow gamers in epic fitness challenges. Compete, achieve, and earn rewards together."
                icon="⚔️"
              />
            </div>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
};

export default Home; 