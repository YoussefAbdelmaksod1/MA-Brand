import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Card from '../components/Card';
import Button from '../components/Button';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

const timelineData: TimelineItem[] = [
  {
    year: '2015',
    title: 'The Beginning',
    description: 'Started the journey into fitness and gaming fusion.',
  },
  {
    year: '2017',
    title: 'First Transformation',
    description: 'Achieved remarkable personal transformation through gaming-inspired workouts.',
  },
  {
    year: '2019',
    title: 'Coaching Journey',
    description: 'Began helping others transform their lives through innovative training methods.',
  },
  {
    year: '2021',
    title: 'Community Growth',
    description: 'Built a thriving community of gamers committed to fitness.',
  },
  {
    year: '2023',
    title: 'Global Impact',
    description: 'Expanded reach to help gamers worldwide level up their fitness journey.',
  },
];

const TimelineItem = ({ item, index }: { item: TimelineItem; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-4 md:gap-8`}
    >
      <div className="w-full md:w-1/2 text-center md:text-right">
        <Card
          glowing
          interactive
          size="sm"
          className={`${index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'} max-w-md mx-auto md:mx-0`}
        >
          <span className="text-game-blue font-gaming text-lg sm:text-xl">{item.year}</span>
          <h3 className="text-xl sm:text-2xl font-gaming mt-2 mb-3 sm:mb-4">{item.title}</h3>
          <p className="text-sm sm:text-base text-game-white/80">{item.description}</p>
        </Card>
      </div>
      <div className="relative flex flex-col items-center">
        <div className="h-full w-1 bg-game-blue/30"></div>
        <div className="absolute w-3 h-3 sm:w-4 sm:h-4 bg-game-blue rounded-full shadow-[0_0_10px_rgba(0,163,255,0.7)]"></div>
      </div>
      <div className="hidden md:block w-1/2"></div>
    </motion.div>
  );
};

const About = () => {
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
              The <span className="text-game-blue">Journey</span>
            </h1>
            <p className="text-lg sm:text-xl text-game-white/90 max-w-3xl mx-auto px-4">
              From passionate gamer to elite fitness coach, discover how Moumen Atef
              is revolutionizing the fitness industry by merging gaming culture with
              health and wellness.
            </p>
          </motion.div>

          <div className="space-y-12 sm:space-y-16 mt-16 sm:mt-24">
            {timelineData.map((item, index) => (
              <TimelineItem key={item.year} item={item} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-16 sm:mt-24 text-center px-4"
          >
            <Card glowing className="inline-block max-w-2xl w-full">
              <h2 className="text-2xl sm:text-3xl font-gaming mb-4 sm:mb-6">Ready to Start Your Journey?</h2>
              <p className="text-sm sm:text-base text-game-white/80 mb-6 sm:mb-8">
                Join our community of gamers who are transforming their lives through
                fitness. Your adventure begins here.
              </p>
              <Button
                variant="primary"
                size="lg"
                glowing
                fullWidth
              >
                Begin Your Quest
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default About; 