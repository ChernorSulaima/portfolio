import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo, languages } from '../data/personalData';
import { Section } from './ui/Section';
import { MapPin, Clock, Zap, Target, Users2 } from 'lucide-react';

const highlightVariants = {
  hidden: { opacity: 0, x: 40, filter: 'blur(4px)' },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  }),
};

const About: React.FC = () => {
  const highlights = [
    {
      icon: Zap,
      title: 'ADAPTABILITY',
      description: 'Rapidly mastering new frameworks and engineering paradigms.',
    },
    {
      icon: Users2,
      title: 'COLLABORATION',
      description: 'Thriving in cross-functional, agile teams to deliver excellence.',
    },
    {
      icon: Target,
      title: 'PRODUCT FOCUS',
      description: 'Building with the end-user in mind to solve tangible problems.',
    },
  ];

  return (
    <Section id="about" className="py-16 sm:py-20 md:py-32 bg-background border-t border-border">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-10 sm:gap-12 lg:gap-24 items-start">

          {/* Left Column: Bio */}
          <div className="flex-1 space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-4 sm:mb-6 font-heading">
                ABOUT ME
              </h2>
              <div className="space-y-4 sm:space-y-6 text-base sm:text-lg leading-relaxed text-muted-foreground font-sans">
                <p>
                  I am a software engineer focused on bridging the gap between <strong className="text-foreground">complex backend logic</strong> and <strong className="text-foreground">intuitive user interfaces</strong>.
                  Currently organizing my workflows to maximize efficiency, I have delivered production-grade applications for diverse clients,
                  including securing a return offer from a leading cybersecurity firm.
                </p>
                <p>
                  My engineering philosophy is grounded in reality: <strong className="text-foreground">Ship clean, maintainable code that solves actual business problems.</strong> I avoid over-engineering in favor of robust, scalable solutions.
                </p>
              </div>
            </motion.div>

            {/* Info Grid */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <motion.div
                className="p-4 sm:p-5 rounded-lg border border-border bg-secondary/20 hover:bg-secondary/40 transition-colors"
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center gap-3 mb-2 opacity-80">
                  <MapPin className="w-4 h-4 text-foreground" />
                  <span className="text-xs font-bold font-mono uppercase tracking-wider text-foreground">Location</span>
                </div>
                <p className="font-bold text-foreground text-sm sm:text-base">{personalInfo.address}</p>
              </motion.div>
              <motion.div
                className="p-4 sm:p-5 rounded-lg border border-border bg-secondary/20 hover:bg-secondary/40 transition-colors"
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center gap-3 mb-2 opacity-80">
                  <Clock className="w-4 h-4 text-foreground" />
                  <span className="text-xs font-bold font-mono uppercase tracking-wider text-foreground">Availability</span>
                </div>
                <p className="font-bold text-foreground text-sm sm:text-base">{personalInfo.freelanceStatus}</p>
              </motion.div>
            </motion.div>

            <motion.div
              className="pt-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-muted-foreground mb-3 sm:mb-4">LANGUAGES</h3>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <motion.span
                    key={lang.name}
                    className="px-3 sm:px-4 py-1.5 border border-border bg-background text-foreground text-xs sm:text-sm font-bold font-mono rounded overflow-hidden uppercase tracking-tight hover:border-primary/50 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    {lang.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Highlights */}
          <div className="w-full lg:w-[400px] flex flex-col gap-3 sm:gap-4">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                className="group p-4 sm:p-6 rounded-lg border border-border bg-card hover:bg-secondary/40 hover:border-primary/30 transition-all duration-300"
                variants={highlightVariants}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
              >
                <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-3">
                  <div className="p-1.5 sm:p-2 rounded bg-foreground text-background group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5 group-hover-spin" />
                  </div>
                  <h4 className="font-bold font-mono text-sm sm:text-base text-foreground tracking-tight">{item.title}</h4>
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default About;
