import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, GraduationCap, User } from 'lucide-react';
import SocialLinks from './SocialLinks';
import { bioInfo } from '../data/personalData';

// Stagger container for children
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const Hero: React.FC = () => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section id="home" className="relative pt-20 pb-24 lg:pt-32 lg:pb-32 overflow-hidden bg-background">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10 sm:gap-16 lg:gap-24">

          {/* Text Content */}
          <motion.div
            className="flex-1 text-center lg:text-left space-y-6 sm:space-y-8 z-10"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Status Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1 bg-secondary rounded-full mb-2"
              variants={fadeUpItem}
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-bold font-mono uppercase tracking-wider text-foreground">Available for work</span>
            </motion.div>

            {/* Name & Title */}
            <div className="space-y-3 sm:space-y-4">
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight text-foreground font-heading leading-[1.1]"
                variants={fadeUpItem}
              >
                Chernor Sulaiman Jalloh
              </motion.h1>
              <motion.h2
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-muted-foreground font-heading"
                variants={fadeUpItem}
              >
                Full-Stack Software Engineer
              </motion.h2>
            </div>

            {/* Personal Details Row */}
            <motion.div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-4 text-sm sm:text-base text-foreground/80 font-medium font-sans"
              variants={fadeUpItem}
            >
              <div className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-secondary/50 border border-border transition-colors hover:bg-secondary">
                <User className="w-4 h-4 text-primary" />
                <span>24 Years Old</span>
              </div>
              <div className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-secondary/50 border border-border transition-colors hover:bg-secondary">
                <GraduationCap className="w-4 h-4 text-primary" />
                <span className="text-xs sm:text-sm md:text-base">Limkokwing University Sierra Leone</span>
              </div>
            </motion.div>

            <motion.p
              className="text-base sm:text-lg text-foreground/70 max-w-xl mx-auto lg:mx-0 font-sans leading-relaxed"
              variants={fadeUpItem}
            >
              I build pixel-perfect, performant web applications with a focus on seamless user experiences and scalable architecture.
            </motion.p>

            <motion.div
              className="flex flex-col xs:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2"
              variants={fadeUpItem}
            >
              <motion.a
                href="#projects"
                className="w-full xs:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-foreground text-background font-bold rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                View Selected Works <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="/resume.pdf"
                download="ChernorJalloh_CV.pdf"
                className="w-full xs:w-auto px-6 sm:px-8 py-3 sm:py-4 border border-border text-foreground font-bold rounded-lg hover:bg-secondary transition-all flex items-center justify-center gap-2"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <Download className="w-4 h-4" />
                Resume
              </motion.a>
            </motion.div>

            <motion.div
              className="pt-4 sm:pt-6"
              variants={fadeUpItem}
            >
              <SocialLinks links={bioInfo.socialLinks} variant="default" />
            </motion.div>
          </motion.div>

          {/* Image Content */}
          <motion.div
            className="relative flex-shrink-0 animate-gentle-float"
            initial={{ opacity: 0, scale: 0.85, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ delay: 0.3, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[460px] lg:h-[460px] xl:w-[500px] xl:h-[500px]">
              {/* Animated Rings */}
              <div className="absolute inset-[-16px] sm:inset-[-20px] rounded-full border border-border/30 border-t-primary/60 animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-[-8px] sm:inset-[-10px] rounded-full border border-border/30 border-b-primary/60 animate-[spin_12s_linear_infinite_reverse]" />

              {/* Glow Pulse Ring */}
              <div className="absolute inset-[-4px] rounded-full glow-pulse" />

              {/* Container Glow */}
              <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl -z-10" />

              <motion.div
                className="w-full h-full rounded-full border-4 sm:border-[6px] border-background shadow-2xl overflow-hidden ring-1 ring-border/50 relative z-10"
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {!imageError ? (
                  <img
                    src="/images/1760520818253.png"
                    alt={bioInfo.name}
                    className={`w-full h-full object-cover transition-all duration-1000 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                    onError={() => setImageError(true)}
                    onLoad={() => setImageLoaded(true)}
                    loading="eager"
                  />
                ) : (
                  <div className="w-full h-full bg-secondary flex items-center justify-center text-4xl font-bold font-heading text-muted-foreground">
                    CJ
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
