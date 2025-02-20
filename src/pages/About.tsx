import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import Card from '@/components/Card';
import Button from '@/components/Button';
import FitnessScene from '@/components/FitnessScene';
import { FaGraduationCap, FaDumbbell, FaCertificate, FaUserTie, FaChartLine, FaTrophy, FaMedal, FaStar, FaUniversity, FaBook } from 'react-icons/fa';

interface TimelineItem {
  date: string;
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

interface Education {
  degree: string;
  institution: string;
  period: string;
  description: string;
  icon: React.ReactNode;
}

const timelineData: TimelineItem[] = [
  {
    date: 'March 2025',
    title: 'Branch Manager',
    description: 'Leading operations at Elegant and N13 Gyms, overseeing facility management and team development.',
    type: 'management',
    icon: <FaChartLine size={24} className="text-purple-500" />,
    highlight: true
  },
  {
    date: 'June 2024',
    title: 'Fitness Manager',
    description: 'Managing fitness operations and client success at Doctor and Coach.',
    type: 'management',
    icon: <FaUserTie size={24} className="text-purple-500" />,
  },
  {
    date: 'January 2024',
    title: 'Fitness Management',
    description: 'Advanced to Fitness Manager at Dr and Coach, expanding into Personal Training roles at N13 and Elegant Gyms.',
    type: 'management',
    icon: <FaChartLine size={24} className="text-purple-500" />
  },
  {
    date: 'June 2023',
    title: 'Professional Coaching',
    description: 'Gained diverse experience across B1 Gym and Mego Gym, progressing to Operations Manager.',
    type: 'career',
    icon: <FaDumbbell size={24} className="text-game-red" />
  },
  {
    date: 'September 2022',
    title: 'Well and Fit Founder',
    description: 'Established Well and Fit while serving as Vice Head of Education Committee.',
    type: 'career',
    icon: <FaUserTie size={24} className="text-game-red" />,
    highlight: true
  },
  {
    date: 'March 2022',
    title: 'Online Training Launch',
    description: 'Started online personal training services, reaching clients globally.',
    type: 'career',
    icon: <FaDumbbell size={24} className="text-game-red" />
  }
];

const certifications: Certification[] = [
  {
    title: 'Sport Nutrition Coach',
    organization: 'Swedish Academy of Sports Training',
    type: 'online',
    icon: <FaCertificate size={24} className="text-game-gold" />,
    description: 'Advanced sports nutrition principles and meal planning',
    date: 'December 2023'
  },
  {
    title: 'Weight Management: Beyond Balancing Calories',
    organization: 'Stanford University',
    type: 'online',
    icon: <FaCertificate size={24} className="text-game-gold" />,
    description: 'Comprehensive approach to sustainable weight management',
    date: 'October 2023'
  },
  {
    title: 'Introduction To Food And Health',
    organization: 'Stanford University',
    type: 'online',
    icon: <FaCertificate size={24} className="text-game-gold" />,
    description: 'Foundation in nutrition science and health optimization',
    date: 'September 2023'
  },
  {
    title: 'Certified Personal Trainer',
    organization: 'TASS UK Academy & PBLS Academy',
    type: 'onsite',
    icon: <FaCertificate size={24} className="text-game-gold" />,
    description: 'Specialized in Sports Nutrition, CFT, and Personal Training',
    date: 'July 2023'
  },
  {
    title: 'A+ Training Certification',
    organization: 'World Gym',
    type: 'onsite',
    icon: <FaCertificate size={24} className="text-game-gold" />,
    description: 'Excellence in Personal Training methodology and practice',
    date: 'May 2023'
  }
];

const educationData: Education[] = [
  {
    degree: 'Bachelor of Sports Science',
    institution: 'Alexandria University',
    period: '2021 - Present',
    description: 'Specializing in Physical Education and Sports Training, with focus on advanced training methodologies and sports nutrition.',
    icon: <FaUniversity size={24} className="text-game-blue" />
  },
  {
    degree: 'Sports Nutrition Advanced Studies',
    institution: 'International Sports Sciences Association',
    period: '2023',
    description: 'Specialized program in sports nutrition and performance optimization.',
    icon: <FaBook size={24} className="text-game-blue" />
  }
];

const TimelineItem = ({ item, index }: { item: TimelineItem; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const formatDate = (dateStr: string) => {
    const [month, year] = dateStr.split(' ');
    const monthAbbr = month.substring(0, 3).toUpperCase();
    return { monthAbbr, year };
  };

  const { monthAbbr, year } = formatDate(item.date);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="relative flex items-center gap-4 mb-12 last:mb-0 md:gap-8"
    >
      {/* Left side - Date and Icon */}
      <div className="flex flex-col items-center min-w-[120px] md:min-w-[160px]">
        {/* Date Badge */}
        <motion.div
          className={`px-4 py-2 rounded-xl text-sm font-gaming mb-4 w-full text-center bg-black border-2
            ${item.type === 'education' ? 'border-game-blue text-game-blue' : 
              item.type === 'management' ? 'border-purple-500 text-purple-500' : 
              'border-game-red text-game-red'}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.3 }}
        >
          <div className="text-lg font-bold">{monthAbbr}</div>
          <div className="text-sm opacity-90">{year}</div>
        </motion.div>

        {/* Icon Circle */}
        <motion.div
          className={`relative z-20 w-12 h-12 rounded-full border-2 flex items-center justify-center bg-black
            ${item.type === 'education' ? 'border-game-blue' : 
              item.type === 'management' ? 'border-purple-500' : 
              'border-game-red'}
            ${item.highlight ? 'shadow-[0_0_15px_rgba(255,0,0,0.3)]' : ''}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          whileHover={{ scale: 1.1 }}
        >
          <motion.div 
            className={`text-xl
              ${item.type === 'education' ? 'text-game-blue' : 
                item.type === 'management' ? 'text-purple-500' : 
                'text-game-red'}`}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.3 }}
          >
            {item.icon}
          </motion.div>
        </motion.div>
      </div>

      {/* Vertical Line */}
      <div className="absolute left-[120px] md:left-[160px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-game-white/10 to-transparent" />

      {/* Right side - Content */}
      <div className="flex-1">
        <Card
          glowing
          interactive
          size="sm"
          className={`transform transition-all duration-300 hover:scale-[1.02] bg-black
            ${item.highlight ? 'border-2 shadow-[0_0_20px_rgba(255,0,0,0.2)]' : 'border'}
            ${item.type === 'education' ? 'border-game-blue/50 hover:border-game-blue' : 
              item.type === 'career' ? 'border-game-red/50 hover:border-game-red' : 
              'border-purple-500/50 hover:border-purple-500'}`}
        >
          <div className="p-4">
            <h3 className={`text-lg font-gaming mb-2 
              ${item.type === 'education' ? 'text-game-blue' : 
                item.type === 'management' ? 'text-purple-500' : 
                'text-game-red'}`}>
              {item.title}
            </h3>
            <p className="text-sm text-game-white/80">{item.description}</p>
          </div>
        </Card>
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
          backdrop-blur-lg bg-black border-opacity-50 hover:border-opacity-100"
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

const EducationCard = ({ edu, index }: { edu: Education; index: number }) => {
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
          backdrop-blur-lg bg-black border-game-blue border-opacity-50 hover:border-opacity-100"
      >
        <div className="flex flex-col items-center p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 right-0 w-32 h-32 bg-game-blue/20 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-game-blue/20 rounded-full blur-2xl"></div>
          </div>
          <motion.div
            className="relative"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            {edu.icon}
          </motion.div>
          <h3 className="text-lg font-gaming mt-4 mb-2 text-center relative z-10">{edu.degree}</h3>
          <p className="text-sm text-game-white/80 text-center mb-2 relative z-10">{edu.institution}</p>
          <p className="text-xs text-game-blue text-center mb-2 relative z-10">{edu.period}</p>
          <p className="text-xs text-game-white/60 text-center relative z-10">{edu.description}</p>
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
            <section className="mb-24">
              <h2 className="text-4xl font-gaming text-center mb-16">
                My <span className="text-game-blue">Journey</span>
              </h2>
              <div className="relative max-w-5xl mx-auto px-4">
                <div className="relative">
                  {/* Main Timeline Container */}
                  <div className="relative">
                    {timelineData.map((item, index) => (
                      <TimelineItem key={item.date} item={item} index={index} />
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Education Section */}
            <section className="mb-24">
              <h2 className="text-4xl font-gaming text-center mb-16">
                <span className="text-game-blue">Education</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4">
                {educationData.map((edu, index) => (
                  <EducationCard key={edu.degree} edu={edu} index={index} />
                ))}
              </div>
            </section>

            {/* Certifications Section */}
            <section className="mb-24">
              <h2 className="text-4xl font-gaming text-center mb-16">
                <span className="text-game-gold">Certifications</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
                {certifications.map((cert, index) => (
                  <CertificationCard key={cert.title} cert={cert} index={index} />
                ))}
              </div>
            </section>

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
