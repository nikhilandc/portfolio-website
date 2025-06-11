import React from 'react';
import { useContent } from '../../context/ContentContext';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BrainCircuit as Circuit, Cpu, Code, Zap } from 'lucide-react';

const About: React.FC = () => {
  const { content } = useContent();
  const { about } = content;
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: <Circuit className="w-6 h-6" />,
      title: 'Electronics Enthusiast',
      description: 'Passionate about circuit design and embedded systems'
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: 'Hardware Design',
      description: 'Experience with microcontrollers and digital systems'
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: 'Software Development',
      description: 'Full-stack development with modern technologies'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Innovation Drive',
      description: 'Always exploring new technologies and solutions'
    }
  ];

  return (
    <section id="about" className="section-padding bg-dark relative overflow-hidden">
      <div className="container relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{about.title}</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-accent to-primary-light rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {about.image && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center md:justify-start"
            >
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-xl" />
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-full opacity-50" />
                <img
                  src={about.image}
                  alt="Profile"
                  className="relative w-full h-full object-cover rounded-full border-4 border-dark"
                />
                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-dark rounded-full border-2 border-primary flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-primary animate-pulse" />
                </div>
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="prose prose-lg text-gray-300 max-w-none">
              {about.description.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6 mt-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="bg-dark-accent p-4 rounded-xl border border-primary/10"
                >
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-3 text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;