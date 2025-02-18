import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import Card from '@/components/Card';
import Button from '@/components/Button';
import FitnessScene from '@/components/FitnessScene';
import { FaGraduationCap, FaDumbbell, FaCertificate, FaUserTie, FaChartLine, FaTrophy, FaMedal, FaStar } from 'react-icons/fa';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  type: 'education' | 'career' | 'certification' | 'management';
  icon: React.ReactNode;
  highlight?: boolean;
}

interface Certification {
  title: string;
  organization: string;
  type: 'online' | 'onsite';
  icon: React.ReactNode;
  description?: string;
  date?: string;
}

const timelineData: TimelineItem[] = [
  {
    year: '2025',
    title: 'Branch Manager',
    description: 'Leading operations at Elegant and N13 Gyms, overseeing facility management and team development.',
    type: 'management',
    icon: <FaChartLine className="text-2xl text-purple-500" />,
    highlight: true
  },
  {
    year: '2024',
    title: 'Fitness Management',
    description: 'Advanced to Fitness Manager at Dr and Coach, expanding into Personal Training roles at N13 and Elegant Gyms.',
    type: 'management',
    icon: <FaChartLine className="text-2xl text-purple-500" />
  },
  {
    year: '2023',
    title: 'Professional Coaching',
    description: 'Gained diverse experience across B1 Gym and Mego Gym, progressing to Operations Manager.',
    type: 'career',
    icon: <FaDumbbell className="text-2xl text-game-red" />
  },
  {
    year: '2022',
    title: 'Well and Fit Founder',
    description: 'Established Well and Fit while serving as Vice Head of Education Committee.',
    type: 'career',
    icon: <FaUserTie className="text-2xl text-game-blue" />
  },
  {
    year: '2021',
    title: 'Academic & Digital Pioneer',
    description: 'Started Sports Science at Alexandria University while launching online coaching initiatives.',
    type: 'education',
    icon: <FaGraduationCap className="text-2xl text-game-blue" />
  }
];

const certifications: Certification[] = [
  {
    title: 'Sport Nutrition Coach',
    organization: 'Swedish Academy of Sports Training',
    type: 'online',
    icon: <FaCertificate className="text-2xl text-game-gold" />,
    description: 'Advanced sports nutrition principles and meal planning'
  },
  {
    title: 'Weight Management: Beyond Balancing Calories',
    organization: 'Stanford University',
    type: 'online',
    icon: <FaCertificate className="text-2xl text-game-gold" />,
    description: 'Comprehensive approach to sustainable weight management'
  },
  {
    title: 'Introduction To Food And Health',
    organization: 'Stanford University',
    type: 'online',
    icon: <FaCertificate className="text-2xl text-game-gold" />,
    description: 'Foundation in nutrition science and health optimization'
  },
  {
    title: 'Certified Personal Trainer',
    organization: 'TASS UK Academy & PBLS Academy',
    type: 'onsite',
    icon: <FaCertificate className="text-2xl text-game-gold" />,
    description: 'Specialized in Sports Nutrition, CFT, and Personal Training',
    date: '2023'
  },
  {
    title: 'A+ Training Certification',
    organization: 'World Gym',
    type: 'onsite',
    icon: <FaCertificate className="text-2xl text-game-gold" />,
    description: 'Excellence in Personal Training methodology and practice',
    date: '2023'
  }
];

const TimelineItem = ({ item, index }: { item: TimelineItem; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="relative mb-16 last:mb-0"
    >
      {/* Year Badge */}
      <motion.div
        className={`absolute -left-4 sm:-left-32 top-0 flex items-center gap-2 bg-opacity-20 px-4 py-2 rounded-lg
          ${item.type === 'education' ? 'text-game-blue' : 
            item.type === 'management' ? 'text-purple-500' : 
            'text-game-red'}`}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.3 }}
        whileHover={{ scale: 1.1 }}
      >
        <div className="hidden sm:block w-12 h-[2px] bg-gradient-to-r from-game-blue to-game-red" />
        <div className="text-xl sm:text-3xl font-gaming">
          {item.date}
        </div>
      </motion.div>

      {/* Content Card */}
      <Card
        glowing
        interactive
        size="sm"
        className={`ml-8 sm:ml-8 max-w-2xl transform transition-all duration-300 hover:scale-105
          ${item.type === 'education' ? 'border-game-blue' : 
            item.type === 'career' ? 'border-game-red' : 'border-yellow-400'}`}
      >
        <div className="flex items-start gap-4">
          <span className="text-2xl sm:text-3xl">{item.icon}</span>
          <div>
            <h3 className="text-lg sm:text-xl font-gaming text-game-white mb-2">{item.title}</h3>
            <p className="text-sm text-game-white/80">{item.description}</p>
          </div>
        </div>
      </Card>

      {/* Timeline Line */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-game-blue via-game-red to-game-blue">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 sm:w-4 h-3 sm:h-4 bg-game-blue rounded-full 
          shadow-[0_0_10px_rgba(0,163,255,0.7)] animate-pulse" />
      </div>
    </motion.div>
  );
};

const CertificationCard = ({ cert, index }: { cert: Certification; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card
        glowing
        interactive
        size="sm"
        className="h-full transform hover:-translate-y-2 transition-all duration-300
          backdrop-blur-lg bg-black/40 border-opacity-50 hover:border-opacity-100"
      >
        <div className="flex flex-col items-center p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 right-0 w-32 h-32 bg-game-blue/20 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-game-red/20 rounded-full blur-2xl"></div>
          </div>
          <motion.div
            className="relative"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-game-gold/20 blur-xl"></div>
            {cert.icon}
          </motion.div>
          <h3 className="text-lg font-gaming mt-4 mb-2 text-center relative z-10">{cert.title}</h3>
          <p className="text-sm text-game-white/80 text-center mb-2 relative z-10">{cert.organization}</p>
          {cert.description && (
            <p className="text-xs text-game-white/60 text-center mb-2 relative z-10">{cert.description}</p>
          )}
          {cert.date && (
            <p className="text-xs text-game-blue text-center mb-2 relative z-10">{cert.date}</p>
          )}
          <motion.span 
            className={`mt-3 px-4 py-1.5 rounded-full text-xs font-gaming
              ${cert.type === 'online' ? 'bg-game-blue/20 text-game-blue' : 'bg-game-red/20 text-game-red'}
              relative z-10`}
            whileHover={{ scale: 1.05 }}
          >
            {cert.type.toUpperCase()}
          </motion.span>
        </div>
      </Card>
    </motion.div>
  );
};

const About = () => {
  return (
    <PageTransition>
      <div className="relative min-h-screen bg-game-black">
        {/* Background Scene */}
        <div className="fixed inset-0 pointer-events-none">
          <FitnessScene />
        </div>
        
        {/* Content */}
        <div className="relative z-10 pointer-events-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16 sm:mb-24"
            >
              <motion.h1 
                className="text-6xl md:text-7xl font-gaming font-bold mb-8 relative inline-block"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                The <span className="text-game-blue">Journey</span> of
                <span className="text-game-red"> Coach Moumen</span>
                <motion.div
                  className="absolute -top-8 -right-8 text-4xl text-game-gold opacity-75"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <FaStar />
                </motion.div>
              </motion.h1>
              <p className="text-lg sm:text-xl text-game-white/90 max-w-3xl mx-auto mb-12">
                From Sports Science student to Fitness Industry Leader, discover how I turned the 
                challenges of COVID-19 into opportunities to transform lives through innovative fitness solutions.
              </p>

              {/* Coach Images Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
              >
                {['/8.png', '/9.png', '/7.png'].map((image, index) => (
                  <motion.div
                    key={image}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="relative group"
                  >
                    <motion.div
                      className="absolute -inset-1 bg-gradient-to-r from-game-blue via-game-red to-game-blue rounded-xl opacity-75 blur-lg group-hover:opacity-100 transition duration-300"
                      animate={{
                        background: [
                          'linear-gradient(to right, rgba(0,163,255,0.5), rgba(255,0,0,0.5), rgba(0,163,255,0.5))',
                          'linear-gradient(to right, rgba(255,0,0,0.5), rgba(0,163,255,0.5), rgba(255,0,0,0.5))',
                          'linear-gradient(to right, rgba(0,163,255,0.5), rgba(255,0,0,0.5), rgba(0,163,255,0.5))'
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <motion.img
                      src={image}
                      alt={`Coach Moumen ${index + 1}`}
                      className="relative w-72 h-72 object-cover rounded-xl border-2 border-game-white/20 transform group-hover:scale-105 transition duration-300"
                      whileHover={{ scale: 1.05 }}
                      layoutId={`coach-image-${index}`}
                    />
                    <motion.div
                      className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Timeline Section */}
            <div className="max-w-4xl mx-auto relative">
              {/* Background Effects */}
              <div className="absolute inset-0 pointer-events-none">
                <motion.div 
                  className="absolute top-0 right-0 w-96 h-96 bg-game-blue/5 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div 
                  className="absolute bottom-0 left-0 w-96 h-96 bg-game-red/5 rounded-full blur-3xl"
                  animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.5, 0.3, 0.5],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>

              {/* Timeline Items */}
              <div className="space-y-16">
                {timelineData.map((item, index) => (
                  <TimelineItem key={item.year + item.title} item={item} index={index} />
                ))}
              </div>
            </div>

            {/* Achievements Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-32 text-center"
            >
              <h2 className="text-4xl sm:text-5xl font-gaming mb-16">
                <span className="text-game-gold">Achievements</span> Unlocked
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {certifications.map((cert, index) => (
                  <CertificationCard key={cert.title} cert={cert} index={index} />
                ))}
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-32 mb-16 text-center"
            >
              <Card 
                glowing 
                className="inline-block max-w-2xl w-full transform hover:scale-105 transition-all duration-300 
                  hover:shadow-[0_0_30px_rgba(0,163,255,0.3)] relative overflow-hidden"
              >
                {/* Background Animation */}
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
                
                <div className="relative z-10">
                  <h2 className="text-3xl sm:text-4xl font-gaming mb-6">Ready to Level Up?</h2>
                  <p className="text-lg sm:text-xl text-game-white/80 mb-8">
                    Join me on this journey of transformation, backed by science and proven by results.
                  </p>
                  <Button
                    variant="primary"
                    size="lg"
                    glowing
                    fullWidth
                    onClick={() => window.open('https://wa.me/201277877499', '_blank')}
                    className="relative overflow-hidden group hover:shadow-[0_0_20px_rgba(255,0,0,0.3)]"
                  >
                    <span className="relative z-10 group-hover:text-white transition-colors flex items-center justify-center gap-2">
                      <span>Start Your Transformation</span>
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        💪
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

export default About; // Force update
