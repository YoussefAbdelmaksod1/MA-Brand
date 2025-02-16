import { useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Card from '../components/Card';
import Button from '../components/Button';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  experience: 'beginner' | 'intermediate' | 'advanced' | 'elite';
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    experience: 'beginner',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const inputStyles = `
    w-full bg-black/50 border border-game-blue rounded-lg px-4 py-3
    text-game-white placeholder-game-white/50 focus:outline-none
    focus:border-game-red focus:ring-1 focus:ring-game-red
    transition-all duration-300 backdrop-blur-sm
  `;

  return (
    <PageTransition>
      <div className="min-h-screen pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-game-black/95">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-gaming font-bold mb-8">
              Ready to <span className="text-game-blue">Play</span>?
            </h1>
            <p className="text-xl text-game-white/90 max-w-3xl mx-auto">
              Take the first step towards leveling up your fitness journey.
              Fill out the form below to connect with Coach Moumen.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card glowing className="h-full">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-game-white mb-2 font-gaming">
                      Player Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={inputStyles}
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-game-white mb-2 font-gaming">
                      Communication Crystal (Email)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputStyles}
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-game-white mb-2 font-gaming">
                      Quest Title
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={inputStyles}
                      placeholder="What's your main goal?"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-game-white mb-2 font-gaming">
                      Experience Level
                    </label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className={inputStyles}
                      required
                    >
                      <option value="beginner">Beginner (Easy Mode)</option>
                      <option value="intermediate">Intermediate (Normal Mode)</option>
                      <option value="advanced">Advanced (Hard Mode)</option>
                      <option value="elite">Elite (Legendary Mode)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-game-white mb-2 font-gaming">
                      Quest Details
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className={`${inputStyles} resize-none h-32`}
                      placeholder="Tell us about your fitness goals and gaming schedule..."
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    glowing
                    className="w-full"
                  >
                    Begin Your Journey
                  </Button>
                </form>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <Card glowing>
                <h3 className="text-2xl font-gaming text-game-blue mb-4">
                  Join the Elite Squad
                </h3>
                <p className="text-game-white/80 mb-6">
                  Connect with Coach Moumen and fellow fitness gamers on our
                  various platforms. Get exclusive tips, live updates, and
                  community support.
                </p>
                <div className="space-y-4">
                  <a
                    href="#"
                    className="flex items-center gap-4 text-game-white hover:text-game-blue transition-colors"
                  >
                    <span className="text-2xl">📱</span>
                    <span>@MoumenAtef</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-4 text-game-white hover:text-game-blue transition-colors"
                  >
                    <span className="text-2xl">💬</span>
                    <span>Discord Community</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-4 text-game-white hover:text-game-blue transition-colors"
                  >
                    <span className="text-2xl">📺</span>
                    <span>YouTube Channel</span>
                  </a>
                </div>
              </Card>

              <Card glowing>
                <h3 className="text-2xl font-gaming text-game-blue mb-4">
                  Quick Support
                </h3>
                <p className="text-game-white/80 mb-6">
                  Need immediate assistance? Our support team is ready to help
                  you with any questions about our programs or technical issues.
                </p>
                <Button variant="secondary" size="lg" glowing className="w-full">
                  Open Support Ticket
                </Button>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact; 