import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import Card from '@/components/Card';
import Button from '@/components/Button';
import FitnessScene from '@/components/FitnessScene';
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok, FaEnvelope, FaDiscord, 
         FaWhatsapp, FaStar, FaHandshake, FaArrowRight, FaSnapchatGhost } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const EMAILJS_PUBLIC_KEY = "x9dqPxdwnZdgOh1jq";
const EMAILJS_SERVICE_ID = "service_e8k2jpe";
const EMAILJS_TEMPLATE_ID = "template_6vx5sp6";

const socialLinks = [
  {
    name: 'Facebook',
    icon: <FaFacebook className="text-3xl" />,
    url: 'https://www.facebook.com/moumenatef.fitness',
    color: 'bg-[#1877F2] hover:bg-[#0D65D9]',
    shadowColor: 'rgba(24,119,242,0.5)'
  },
  {
    name: 'Instagram',
    icon: <FaInstagram className="text-3xl" />,
    url: 'https://www.instagram.com/moumenatef.fitness',
    color: 'bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:from-[#722A9C] hover:via-[#E01A1A] hover:to-[#D66A31]',
    shadowColor: 'rgba(225,48,108,0.5)'
  },
  {
    name: 'Snapchat',
    icon: <FaSnapchatGhost className="text-3xl" />,
    url: 'https://www.snapchat.com/add/moumenatef.fitness',
    color: 'bg-[#FFFC00] hover:bg-[#F7E300]',
    shadowColor: 'rgba(255,252,0,0.5)'
  },
  {
    name: 'YouTube',
    icon: <FaYoutube className="text-3xl" />,
    url: 'https://www.youtube.com/@moumenatef.fitness',
    color: 'bg-[#FF0000] hover:bg-[#D90000]',
    shadowColor: 'rgba(255,0,0,0.5)'
  },
  {
    name: 'TikTok',
    icon: <FaTiktok className="text-3xl" />,
    url: 'https://www.tiktok.com/@moumenatef.fitness',
    color: 'bg-black hover:bg-gray-900',
    shadowColor: 'rgba(0,0,0,0.5)'
  },
  {
    name: 'WhatsApp',
    icon: <FaWhatsapp className="text-3xl" />,
    url: 'https://wa.me/201277877499',
    color: 'bg-[#25D366] hover:bg-[#20BD5A]',
    shadowColor: 'rgba(37,211,102,0.5)'
  }
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  requestType: 'partnership' | 'job';
  position?: string;
  experience?: string;
  message: string;
  resume?: File;
}

const Contact = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    requestType: 'partnership',
    position: '',
    experience: '',
    message: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      const templateParams = {
        from_name: formData.name,
        to_name: "Coach Moumen",
        message: `
Type: ${formData.requestType}
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
${formData.position ? `Position: ${formData.position}\n` : ''}
${formData.experience ? `Experience: ${formData.experience}\n` : ''}

Message:
${formData.message}`,
        reply_to: formData.email
      };

      // Initialize EmailJS
      emailjs.init(EMAILJS_PUBLIC_KEY);

      // Show loading state
      const button = document.querySelector('button[type="submit"]');
      if (button) {
        button.setAttribute('disabled', 'true');
        button.textContent = 'Sending...';
      }

      // Send the email
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      // Show success message
      alert('Your message has been sent successfully! We will contact you soon.');
      setShowForm(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        requestType: 'partnership',
        position: '',
        experience: '',
        message: '',
      });
    } catch (error) {
      console.error('Error sending form:', error);
      alert('There was an error sending your message. Please try again.');
    } finally {
      // Reset button state
      const button = document.querySelector('button[type="submit"]');
      if (button) {
        button.removeAttribute('disabled');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        resume: e.target.files![0]
      }));
    }
  };

  return (
    <PageTransition>
      <div className="relative min-h-screen bg-game-black">
        {/* Background Scene */}
        <div className="fixed inset-0 pointer-events-none">
          <FitnessScene />
        </div>

        {/* Content */}
        <div className="relative z-10 pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-gaming font-bold mb-8 relative inline-block">
                Join The <span className="text-game-blue">Adventure</span>
                <motion.div
                  className="absolute -top-6 -right-6 text-4xl text-game-gold"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <FaStar />
                </motion.div>
              </h1>
              <p className="text-xl sm:text-2xl text-game-white/90 max-w-3xl mx-auto">
                Connect with Coach Moumen and start your fitness journey today
              </p>
            </motion.div>

            {/* Social Media Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${social.color} rounded-xl p-6 flex items-center gap-4 
                    transform transition-all duration-300 group relative overflow-hidden`}
                  style={{
                    boxShadow: `0 0 20px ${social.shadowColor}`
                  }}
                >
                  <div className="relative z-10">
                    {social.icon}
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-gaming text-white mb-1">
                      {social.name}
                    </h3>
                    <p className="text-sm text-white/80">
                      Follow Coach Moumen
                    </p>
                  </div>
                  <motion.div
                    className="absolute inset-0 bg-white/10"
                    animate={{
                      x: ["0%", "100%"]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "linear"
                    }}
                    style={{ clipPath: "polygon(0 0, 20% 0, 60% 100%, 40% 100%)" }}
                  />
                  <FaArrowRight className="ml-auto text-xl text-white/80 group-hover:translate-x-2 transition-transform duration-300" />
                </motion.a>
              ))}
            </div>

            {/* Form Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <Card glowing className="relative overflow-hidden">
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-game-blue/20 rounded-lg">
                      <FaHandshake className="text-3xl text-game-blue" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-gaming text-game-white">Contact Us</h2>
                      <p className="text-game-white/80">Partner with us or join our team</p>
                    </div>
                  </div>

                  {!showForm ? (
                    <Button
                      variant="primary"
                      size="lg"
                      glowing
                      fullWidth
                      onClick={() => setShowForm(true)}
                      className="relative overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <span>Start Application</span>
                        <motion.span
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          🤝
                        </motion.span>
                      </span>
                    </Button>
                  ) : (
                    <motion.form
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                      onSubmit={handleSubmit}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-game-white mb-2 font-gaming">Your Name</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 rounded-lg bg-black/30 border-2 border-game-blue/30 text-game-white
                              focus:outline-none focus:border-game-blue focus:ring-2 focus:ring-game-blue/50
                              placeholder-game-white/50 transition-all duration-300 hover:border-game-blue/50
                              backdrop-blur-sm"
                            placeholder="Enter your name"
                          />
                        </div>

                        <div>
                          <label className="block text-game-white mb-2 font-gaming">Your Email</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 rounded-lg bg-black/30 border-2 border-game-blue/30 text-game-white
                              focus:outline-none focus:border-game-blue focus:ring-2 focus:ring-game-blue/50
                              placeholder-game-white/50 transition-all duration-300 hover:border-game-blue/50
                              backdrop-blur-sm"
                            placeholder="Enter your email"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-game-white mb-2 font-gaming">Phone Number</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 rounded-lg bg-black/30 border-2 border-game-blue/30 text-game-white
                              focus:outline-none focus:border-game-blue focus:ring-2 focus:ring-game-blue/50
                              placeholder-game-white/50 transition-all duration-300 hover:border-game-blue/50
                              backdrop-blur-sm"
                            placeholder="Enter your phone number"
                          />
                        </div>

                        <div>
                          <label className="block text-game-white mb-2 font-gaming">Request Type</label>
                          <select
                            name="requestType"
                            value={formData.requestType}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 rounded-lg bg-black/30 border-2 border-game-blue/30 text-game-white
                              focus:outline-none focus:border-game-blue focus:ring-2 focus:ring-game-blue/50
                              transition-all duration-300 hover:border-game-blue/50 backdrop-blur-sm
                              cursor-pointer"
                          >
                            <option value="partnership" className="bg-game-black">Partnership Request</option>
                            <option value="job" className="bg-game-black">Job Application</option>
                          </select>
                        </div>
                      </div>

                      {formData.requestType === 'job' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-6"
                        >
                          <div>
                            <label className="block text-game-white mb-2 font-gaming">Position</label>
                            <input
                              type="text"
                              name="position"
                              value={formData.position}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 rounded-lg bg-black/30 border-2 border-game-blue/30 text-game-white
                                focus:outline-none focus:border-game-blue focus:ring-2 focus:ring-game-blue/50
                                placeholder-game-white/50 transition-all duration-300 hover:border-game-blue/50
                                backdrop-blur-sm"
                              placeholder="Enter the position you're applying for"
                            />
                          </div>

                          <div>
                            <label className="block text-game-white mb-2 font-gaming">Years of Experience</label>
                            <input
                              type="text"
                              name="experience"
                              value={formData.experience}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 rounded-lg bg-black/30 border-2 border-game-blue/30 text-game-white
                                focus:outline-none focus:border-game-blue focus:ring-2 focus:ring-game-blue/50
                                placeholder-game-white/50 transition-all duration-300 hover:border-game-blue/50
                                backdrop-blur-sm"
                              placeholder="Enter your years of experience"
                            />
                          </div>

                          <div>
                            <label className="block text-game-white mb-2 font-gaming">Resume/CV</label>
                            <input
                              type="file"
                              name="resume"
                              onChange={handleFileChange}
                              accept=".pdf,.doc,.docx"
                              required
                              className="w-full px-4 py-3 rounded-lg bg-black/30 border-2 border-game-blue/30 text-game-white
                                focus:outline-none focus:border-game-blue focus:ring-2 focus:ring-game-blue/50
                                file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
                                file:text-sm file:font-gaming file:bg-game-blue file:text-white
                                hover:file:bg-game-blue/80 transition-all duration-300"
                            />
                          </div>
                        </motion.div>
                      )}

                      <div>
                        <label className="block text-game-white mb-2 font-gaming">Message</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-lg bg-black/30 border-2 border-game-blue/30 text-game-white
                            focus:outline-none focus:border-game-blue focus:ring-2 focus:ring-game-blue/50
                            placeholder-game-white/50 transition-all duration-300 hover:border-game-blue/50
                            backdrop-blur-sm min-h-[120px] resize-y"
                          placeholder={formData.requestType === 'job' ? 
                            "Tell us about your experience and why you'd be a great fit" : 
                            "Tell us about your partnership idea"}
                        />
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          variant="primary"
                          size="lg"
                          glowing
                          fullWidth
                          type="submit"
                          className="relative overflow-hidden group hover:shadow-[0_0_20px_rgba(0,163,255,0.5)]
                            transition-all duration-300"
                        >
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            <span>{formData.requestType === 'job' ? 'Submit Application' : 'Send Partnership Request'}</span>
                            <motion.span
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              {formData.requestType === 'job' ? '📝' : '✉️'}
                            </motion.span>
                          </span>
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-game-blue to-game-red opacity-0 
                              group-hover:opacity-100 transition-opacity duration-300"
                          />
                        </Button>
                      </motion.div>
                    </motion.form>
                  )}
                </div>

                {/* Background Effects */}
                <motion.div 
                  className="absolute inset-0 opacity-20 pointer-events-none"
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
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact; 