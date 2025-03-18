import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { FaGamepad, FaTrophy, FaMedal, FaChartLine, FaCrown, FaGift } from 'react-icons/fa';

const XPSystem = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentXP, setCurrentXP] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const maxXP = 1000;

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    const newSlide = Math.max(0, Math.min(10, currentSlide + Math.round(diff / 100)));
    setCurrentSlide(newSlide);
    setStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleClick = (level: number) => {
    setCurrentSlide(level);
  };

  useEffect(() => {
    if (!isDragging) {
      const slideTimer = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % 11);
      }, 3000);

      return () => clearInterval(slideTimer);
    }
  }, [isDragging]);

  useEffect(() => {
    // Simulate XP progress animation
    const timer = setInterval(() => {
      setCurrentXP(prev => (prev < maxXP ? prev + 5 : prev));
    }, 50);

    return () => clearInterval(timer);
  }, []);

  const xpProgress = (currentXP / maxXP) * 100;
  const levelTiers = [
    { level: '1-9', title: 'Fitness Novice', reward: 'Gaining exercise experience', icon: '🌱' },
    { level: '10-19', title: 'MA Warrior', reward: 'Special MA Warrior T-shirt', icon: '⚔️' },
    { level: '20-29', title: 'Elite Trainee', reward: 'MA Hoodie for distinguished players', icon: '🎯' },
    { level: '30-39', title: 'MA Legend', reward: 'Special Edition MA T-shirt', icon: '🌟' },
    { level: '40-49', title: 'Fitness Leader', reward: 'Limited Edition MA Hoodie', icon: '👑' },
    { level: '50-59', title: 'MA Knight', reward: 'New Design MA T-shirt', icon: '🛡️' },
    { level: '60-69', title: 'Victory Master', reward: 'Level-specific MA Hoodie', icon: '🏆' },
    { level: '70-79', title: 'MA Champion', reward: 'Exclusive Design MA T-shirt', icon: '💫' },
    { level: '80-89', title: 'Fitness Beast', reward: 'Champions MA Hoodie', icon: '🔥' },
    { level: '90-98', title: 'MA Legend Elite', reward: 'Top-tier MA T-shirt', icon: '⭐' },
    { level: '99', title: 'Supreme Warrior', reward: 'VIP Edition MA Hoodie', icon: '💎' },
    { level: '100', title: 'Captain MA', reward: 'Exclusive to Captain Moumen (MA)', icon: '👑' },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,163,255,0.2)_0%,transparent_70%)] animate-pulse opacity-70" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,0,0,0.2)_0%,transparent_100%)] animate-pulse opacity-50" />
        <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,rgba(0,163,255,0.1)_0%,rgba(255,0,0,0.1)_25%,rgba(0,163,255,0.1)_50%,rgba(255,0,0,0.1)_75%,rgba(0,163,255,0.1)_100%)] animate-spin-slow opacity-30" />
      
        {/* Current Level Display with Enhanced Effects */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block bg-gradient-to-br from-black/80 to-black/40 p-8 rounded-2xl border-2 border-game-blue/30 shadow-[0_0_50px_rgba(0,163,255,0.4)] relative overflow-hidden group hover:scale-105 transition-transform duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-game-blue/10 via-transparent to-game-red/10 animate-pulse" />
            <div className="relative z-10">
              <h2 className="text-4xl font-gaming text-game-blue mb-4 animate-glow">Current Level</h2>
              <div className="text-7xl font-gaming text-game-white mb-6 animate-bounce-slow relative">
                {currentLevel}
                <div className="absolute -inset-4 bg-gradient-to-r from-game-blue/20 to-game-red/20 blur-lg animate-pulse" />
              </div>
              <div className="relative w-full h-6 bg-black/50 rounded-full overflow-hidden border-2 border-game-blue/30 p-1">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-game-blue via-white to-game-red relative overflow-hidden"
                  style={{ width: `${xpProgress}%` }}
                  initial={{ width: '0%' }}
                  animate={{ width: `${xpProgress}%` }}
                  transition={{ duration: 1 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.4)_50%,transparent_100%)] animate-shimmer"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>
              </div>
              <div className="mt-4 text-xl text-game-white/80 font-gaming animate-pulse">
                {currentXP} / {maxXP} XP
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-game-blue/10 to-game-red/10 blur-xl animate-pulse" />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-gaming text-game-white mb-6 relative z-10">
            MA Warrior Journey
          </h1>
          <p className="text-lg sm:text-xl text-game-white/80 max-w-3xl mx-auto relative z-10">
            Welcome to MA Fitness, where your fitness journey transforms into a real gameplay experience!
          </p>
        </motion.div>

        {/* How to Earn XP Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <Card glowing className="p-6 sm:p-8 bg-gradient-to-br from-black/80 to-black/40 border-game-blue/30 hover:border-game-blue/50 transition-colors duration-300">
            <div className="flex items-center gap-3 mb-6">
              <FaGamepad className="text-3xl text-game-blue animate-bounce-slow" />
              <h2 className="text-2xl sm:text-3xl font-gaming text-game-white">How to Earn XP</h2>
            </div>
            <ul className="space-y-4 text-game-white/80">
              <motion.li 
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                whileHover={{ scale: 1.02 }}
              >
                <span className="w-2 h-2 mt-2 bg-game-blue rounded-full group-hover:animate-pulse" />
                <p className="group-hover:text-game-blue transition-colors">Start at Level 1 when you subscribe to any package</p>
              </motion.li>
              <motion.li 
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                whileHover={{ scale: 1.02 }}
              >
                <span className="w-2 h-2 mt-2 bg-game-blue rounded-full group-hover:animate-pulse" />
                <p className="group-hover:text-game-blue transition-colors">Each package grants you XP to help you progress</p>
              </motion.li>
              <motion.li 
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                whileHover={{ scale: 1.02 }}
              >
                <span className="w-2 h-2 mt-2 bg-game-blue rounded-full group-hover:animate-pulse" />
                <p className="group-hover:text-game-blue transition-colors">Every 10 levels, unlock a new title and special rewards</p>
              </motion.li>
              <motion.li 
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                whileHover={{ scale: 1.02 }}
              >
                <span className="w-2 h-2 mt-2 bg-game-blue rounded-full group-hover:animate-pulse" />
                <p className="group-hover:text-game-blue transition-colors">Track your progress and compete with others on our Leaderboard</p>
              </motion.li>
            </ul>
          </Card>
        </motion.section>

        {/* Level Tiers Section - Horizontal Timeline */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-16 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-game-blue/5 to-game-red/5 animate-pulse-slow" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,163,255,0.1)_0%,transparent_70%)] animate-pulse" />
          
          <div className="flex items-center justify-between mb-8 relative z-10">
            <h2 className="text-2xl sm:text-3xl font-gaming text-game-white flex items-center gap-3">
              <FaTrophy className="text-game-red animate-bounce-slow" />
              <span className="bg-gradient-to-r from-game-blue to-game-red bg-clip-text text-transparent">Levels & Titles</span>
            </h2>
            <div className="hidden sm:flex items-center gap-2 text-game-white/60 text-sm">
              <span>Scroll</span>
              <motion.div 
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-game-blue"
              >
                →
              </motion.div>
            </div>
          </div>

          {/* Horizontal Timeline */}
          <div className="relative z-10 mb-8 px-4 sm:px-0">
            <div className="w-full h-2 bg-gradient-to-r from-game-blue/30 to-game-red/30 rounded-full relative">
              <motion.div 
                className="absolute top-0 left-0 w-full h-full overflow-hidden"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2 }}
              >
                <div className="w-full h-full bg-gradient-to-r from-game-blue to-game-red rounded-full" />
              </motion.div>
              
              {/* Timeline Markers */}
              {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((level, i) => (
                <motion.div 
                  key={level}
                  className="absolute top-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ left: `${level}%` }}
                  initial={{ scale: 0 }}
                  onClick={() => handleClick(i)}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  animate={{ 
                    scale: currentSlide === i ? 1.5 : 1,
                    boxShadow: currentSlide === i ? '0 0 20px rgba(0,163,255,0.9)' : 'none'
                  }}
                  transition={{ duration: 0.5 }}
                  onClick={() => setCurrentSlide(i)}
                  onMouseDown={() => setIsDragging(true)}
                  onMouseUp={() => setIsDragging(false)}
                  onMouseLeave={() => setIsDragging(false)}
                >
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-game-blue to-game-red -mt-1 shadow-[0_0_10px_rgba(0,163,255,0.7)]" />
                  <div className="absolute -left-3 -bottom-8 text-xs font-gaming text-game-white/80">{level}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Auto-sliding Cards Container */}
          <div className="relative z-10 overflow-hidden pb-4 mx-auto max-w-[90vw] sm:max-w-none">
            <motion.div 
              className="flex space-x-8 px-4 sm:px-0 py-6"
              animate={{ x: currentSlide * -320 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{ width: `${levelTiers.length * 320}px` }}
            >
              {levelTiers.map((tier, index) => (
                <motion.div
                  key={tier.level}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="w-[280px] sm:w-[300px] flex-shrink-0"
                >
                  <Card
                    glowing
                    interactive
                    className="h-full p-6 sm:p-8 transform hover:scale-105 transition-all duration-300 relative overflow-hidden group bg-gradient-to-br from-black/80 to-black/40 border-2 border-game-blue/20 hover:border-game-blue/50"
                  >
                    {/* Animated Background Effects */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-game-blue/10 to-game-red/10 opacity-0 group-hover:opacity-100 transition-all duration-500"
                      animate={{
                        background: [
                          'linear-gradient(45deg, rgba(0,163,255,0.1) 0%, rgba(255,0,0,0.1) 100%)',
                          'linear-gradient(45deg, rgba(255,0,0,0.1) 0%, rgba(0,163,255,0.1) 100%)'
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
                    />
                    <motion.div
                      className="absolute -inset-1 bg-gradient-to-r from-game-blue to-game-red opacity-0 group-hover:opacity-30 blur-lg transition-all duration-500"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    />
                    
                    {/* Level Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-sm font-gaming bg-black/70 backdrop-blur-sm border-2 border-game-blue/50 text-game-white/90 shadow-[0_0_15px_rgba(0,163,255,0.3)] group-hover:shadow-[0_0_25px_rgba(0,163,255,0.5)] transition-all duration-300">
                      {tier.level}
                    </div>
                    
                    {/* Content */}
                    <div className="flex flex-col items-center text-center mb-6 relative z-10 pt-3">
                      <motion.div 
                        className="w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-br from-black/60 to-black/20 border-2 border-game-blue/30 mb-4 shadow-[0_0_20px_rgba(0,163,255,0.2)] group-hover:shadow-[0_0_30px_rgba(0,163,255,0.4)] transition-all duration-300"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <FaMedal className="text-4xl text-game-red group-hover:text-game-blue transition-colors duration-300" />
                      </motion.div>
                      <h3 className="text-2xl font-gaming text-game-white mb-2 group-hover:text-game-blue transition-colors duration-300 flex items-center justify-center gap-2">
                        <span className="text-2xl">{tier.icon}</span>
                        <span>{tier.title}</span>
                      </h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-game-blue to-game-red rounded-full my-3 group-hover:w-24 transition-all duration-300" />
                    </div>
                    
                    <div className="relative z-10 bg-black/40 backdrop-blur-sm p-4 rounded-xl border border-white/10 group-hover:border-white/20 transition-colors duration-300">
                      <p className="text-game-white/90 text-sm group-hover:text-white transition-colors duration-300">{tier.reward}</p>
                    </div>
                    
                    <motion.div 
                      className="w-full h-1 bg-gradient-to-r from-game-blue to-game-red mt-6 rounded-full overflow-hidden opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.7, delay: index * 0.1 }}
                    />
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
              <motion.div
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${index === currentSlide ? 'bg-game-blue' : 'bg-gray-600'}`}
              />
            ))}
          </div>
        </motion.section>

        {/* View Full Arsenal CTA */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-16 text-center"
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
                Ready to Begin Your Journey?
              </h2>
              <p className="text-sm xs:text-base sm:text-lg text-game-white/90 mb-6 xs:mb-8">
                View our complete arsenal of training packages and choose the perfect path for your fitness quest.
              </p>
              <Button
                variant="primary"
                size="lg"
                glowing
                fullWidth
                onClick={() => window.location.href = '/services'}
                className="relative overflow-hidden group text-sm sm:text-base font-gaming rounded-xl border-2"
              >
                <span className="relative z-10 group-hover:text-white transition-colors flex items-center justify-center gap-2 py-1">
                  <span>View Full Arsenal</span>
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
        </motion.section>

        {/* Benefits Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-16"
        >
          <Card glowing className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <FaChartLine className="text-3xl text-game-red" />
              <h2 className="text-2xl sm:text-3xl font-gaming text-game-white">Why Level Up?</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4 text-game-white/80">
                <div className="flex items-start gap-3">
                  <FaCrown className="text-xl text-game-blue mt-1" />
                  <p>Exclusive titles displayed on the Global Leaderboard</p>
                </div>
                <div className="flex items-start gap-3">
                  <FaGift className="text-xl text-game-blue mt-1" />
                  <p>Free T-shirt or Hoodie every 10 levels</p>
                </div>
              </div>
              <div className="space-y-4 text-game-white/80">
                <div className="flex items-start gap-3">
                  <FaTrophy className="text-xl text-game-blue mt-1" />
                  <p>Higher levels = More strength and determination</p>
                </div>
                <div className="flex items-start gap-3">
                  <FaMedal className="text-xl text-game-blue mt-1" />
                  <p>Chance to appear among MA Fitness's top players</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.section>
      </div>
    </PageTransition>
  );
};

export default XPSystem;