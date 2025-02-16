import { Suspense, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FloatingLogo from '../components/FloatingLogo';
import CoachProfile from '../components/CoachProfile';
import FitnessScene from '../components/FitnessScene';
import { fadeInUp, fadeInDown, staggerContainer, neonPulse, floatingAnimation, bounceIn, powerUpAnimation, progressBarFill, gameCardHover, levelUpFlash, shakeAnimation, pixelateIn } from '../hooks/useAnimations';

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
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <div className="relative min-h-screen bg-game-black">
      {/* Background Scene */}
      <div className="fixed inset-0 pointer-events-none">
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
          <div className="min-h-screen flex items-center justify-center">
            <motion.div
              style={{ opacity, scale }}
              className="text-center max-w-4xl px-4 sm:px-6"
            >
              <motion.div
                variants={floatingAnimation}
                initial="initial"
                animate="animate"
                className="mb-8 sm:mb-12 w-32 h-32 sm:w-48 sm:h-48 mx-auto"
              >
                <FloatingLogo />
              </motion.div>

              <motion.h1
                variants={fadeInDown}
                className="text-4xl sm:text-6xl md:text-8xl font-gaming font-bold mb-6 sm:mb-8"
              >
                <motion.span
                  variants={pixelateIn}
                  className="text-game-white"
                >
                  Enter
                </motion.span>
                <motion.span
                  variants={neonPulse}
                  initial="initial"
                  animate="animate"
                  className="text-game-blue"
                > the Game
                </motion.span>
                <motion.span
                  variants={neonPulse}
                  initial="initial"
                  animate="animate"
                  className="block text-game-red mt-2 sm:mt-4"
                >
                  Level Up Your Life
                </motion.span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg sm:text-xl md:text-3xl mb-8 sm:mb-12 text-game-white/90 font-gaming px-4"
              >
                Join the ultimate fusion of gaming and fitness with Coach Moumen Atef
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="neon-button bg-game-red text-lg sm:text-xl px-6 sm:px-8 py-3 sm:py-4 rounded-lg w-full sm:w-64 relative overflow-hidden group"
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
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="neon-button bg-game-blue text-lg sm:text-xl px-6 sm:px-8 py-3 sm:py-4 rounded-lg w-full sm:w-64 relative overflow-hidden group"
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
            className="py-16 sm:py-24"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              <StatCounter value={1000} label="Active Players" icon="👥" />
              <StatCounter value={50000} label="Workouts Completed" icon="💪" />
              <StatCounter value={95} label="Success Rate" icon="⭐" />
              <StatCounter value={500} label="Transformations" icon="🎯" />
            </div>
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