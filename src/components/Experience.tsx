import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { bioInfo } from '../data/personalData';
import { ArrowRight, Building2, Calendar, Briefcase, GraduationCap, Film, Workflow, Code2, Sparkles } from 'lucide-react';

// Map job types to color schemes and icons
const typeConfig: Record<string, { bg: string; text: string; border: string; glow: string; label: string; icon: React.FC<{ className?: string }> }> = {
  internship: {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-500',
    border: 'border-emerald-500/20',
    glow: 'shadow-emerald-500/20',
    label: 'Internship — Offer Extended',
    icon: GraduationCap,
  },
  'full-time': {
    bg: 'bg-blue-500/10',
    text: 'text-blue-500',
    border: 'border-blue-500/20',
    glow: 'shadow-blue-500/20',
    label: 'Full-Time',
    icon: Briefcase,
  },
  contract: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-500',
    border: 'border-amber-500/20',
    glow: 'shadow-amber-500/20',
    label: 'Contract',
    icon: Code2,
  },
};

// Pick a unique icon per role
const getRoleIcon = (role: string) => {
  if (role.toLowerCase().includes('video')) return Film;
  if (role.toLowerCase().includes('automation') || role.toLowerCase().includes('workflow')) return Workflow;
  if (role.toLowerCase().includes('facilitator') || role.toLowerCase().includes('mentor')) return Sparkles;
  return Code2;
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.06,
      duration: 0.7,
      type: 'spring',
      stiffness: 80,
      damping: 16,
    },
  }),
};

const achievementVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.25 + i * 0.1,
      duration: 0.4,
      ease: 'easeOut',
    },
  }),
};

const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const ballProgress = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const totalJobs = bioInfo.experience.length;
      const index = Math.min(
        Math.floor(latest * totalJobs),
        totalJobs - 1
      );
      setActiveIndex(Math.max(0, index));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section id="experience" className="py-16 sm:py-20 md:py-32 bg-background relative">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />

      <div className="container px-4 mx-auto max-w-5xl relative z-10">
        {/* Header */}
        <motion.div
          className="mb-12 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-primary" />
            <span className="text-xs font-bold font-mono text-primary uppercase tracking-[0.2em]">
              Career
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4 font-heading">
            WORK EXPERIENCE
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl font-sans leading-relaxed">
            A journey through roles that shaped my engineering craft — from cybersecurity internships to leading AI education.
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Timeline Track */}
          <div className="absolute left-4 sm:left-6 md:left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-border via-border to-transparent rounded-full" />

          {/* Animated fill line */}
          <motion.div
            className="absolute left-4 sm:left-6 md:left-8 top-0 w-[2px] rounded-full origin-top"
            style={{
              height: ballProgress,
              background: 'linear-gradient(180deg, hsl(var(--primary)), hsl(var(--primary) / 0.3))',
            }}
          />

          {/* Scrolling Ball */}
          <motion.div
            className="absolute left-4 sm:left-6 md:left-8 -translate-x-1/2 z-20"
            style={{ top: ballProgress }}
          >
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-primary border-[3px] border-background glow-pulse" />
          </motion.div>

          {/* Experience Items */}
          <div className="space-y-6 sm:space-y-8 md:space-y-10 relative">
            {bioInfo.experience.map((job, index) => {
              const config = typeConfig[job.type] || typeConfig.contract;
              const RoleIcon = getRoleIcon(job.role);
              const isActive = activeIndex === index;
              const isPast = activeIndex > index;
              const isExpanded = expandedIndex === index;

              return (
                <motion.div
                  key={index}
                  className="relative pl-10 sm:pl-14 md:pl-20"
                  variants={cardVariants}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                >
                  {/* Timeline Node */}
                  <div
                    className={`absolute left-[10px] sm:left-[16px] md:left-[24px] top-6 sm:top-7 z-10 transition-all duration-500 ${
                      isPast || isActive ? 'scale-100' : 'scale-75 opacity-50'
                    }`}
                  >
                    <div
                      className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border-[2.5px] transition-all duration-500 ${
                        isActive
                          ? 'border-primary bg-primary/30 scale-125 shadow-lg shadow-primary/30'
                          : isPast
                            ? 'border-primary bg-primary/20'
                            : 'border-muted-foreground/30 bg-background'
                      }`}
                    />
                  </div>

                  {/* Card */}
                  <motion.div
                    className={`group relative rounded-xl sm:rounded-2xl border overflow-hidden transition-all duration-500 cursor-pointer ${
                      isActive
                        ? `border-primary/30 bg-card shadow-xl ${config.glow}`
                        : 'border-border bg-card/80 hover:border-primary/20 hover:shadow-lg'
                    }`}
                    whileHover={{
                      y: -4,
                      transition: { type: 'spring', stiffness: 300, damping: 20 },
                    }}
                    onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  >
                    {/* Top accent bar */}
                    <div
                      className={`h-[3px] w-full transition-all duration-500 ${
                        isActive
                          ? 'bg-gradient-to-r from-primary via-primary/80 to-transparent'
                          : 'bg-gradient-to-r from-border/50 to-transparent'
                      }`}
                    />

                    <div className="p-4 sm:p-6 md:p-8">
                      {/* Top Row: Period + Type + Icon */}
                      <div className="flex items-start justify-between gap-3 mb-4 sm:mb-5">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                          {/* Period */}
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-muted-foreground/60" />
                            <span className="text-[10px] sm:text-xs font-bold font-mono text-muted-foreground uppercase tracking-wider">
                              {job.period}
                            </span>
                          </div>

                          {/* Type Badge */}
                          <span className={`inline-flex items-center gap-1.5 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] uppercase font-bold tracking-wider border ${config.bg} ${config.text} ${config.border}`}>
                            <config.icon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            {config.label}
                          </span>
                        </div>

                        {/* Role Icon */}
                        <div className={`p-1.5 sm:p-2 rounded-lg transition-all duration-300 ${
                          isActive
                            ? 'bg-primary/10 text-primary'
                            : 'bg-secondary text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
                        }`}>
                          <RoleIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                      </div>

                      {/* Role Title */}
                      <h3 className={`text-lg sm:text-xl md:text-2xl font-bold font-heading mb-1.5 transition-colors duration-300 ${
                        isActive ? 'text-foreground' : 'text-foreground/90 group-hover:text-foreground'
                      }`}>
                        {job.role}
                      </h3>

                      {/* Company */}
                      <div className="flex items-center gap-2 mb-3 sm:mb-4">
                        <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground/60" />
                        <span className={`text-sm sm:text-base font-semibold transition-colors duration-300 ${
                          isActive ? 'text-primary' : 'text-primary/70 group-hover:text-primary'
                        }`}>
                          {job.company}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground leading-relaxed text-sm sm:text-[15px] font-sans">
                        {job.description}
                      </p>

                      {/* Achievements — Expandable */}
                      <AnimatePresence>
                        {(isExpanded || isActive) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4 sm:pt-5 mt-4 sm:mt-5 border-t border-border/50">
                              <span className="text-[10px] sm:text-xs font-bold font-mono text-muted-foreground/60 uppercase tracking-wider mb-3 block">
                                Key Achievements
                              </span>
                              <ul className="space-y-2.5 sm:space-y-3">
                                {job.achievements.map((achievement, i) => (
                                  <motion.li
                                    key={i}
                                    className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-foreground/80"
                                    variants={achievementVariants}
                                    custom={i}
                                    initial="hidden"
                                    animate="visible"
                                  >
                                    <div className="mt-1.5 flex-shrink-0">
                                      <div className={`w-1.5 h-1.5 rounded-full ${config.text.replace('text-', 'bg-')}`} />
                                    </div>
                                    <span className="leading-relaxed">{achievement}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Expand hint */}
                      {!isActive && !isExpanded && (
                        <motion.div
                          className="flex items-center gap-1.5 mt-4 text-[10px] sm:text-xs font-mono text-muted-foreground/50 uppercase tracking-wider"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <ArrowRight className="w-3 h-3" />
                          <span>Tap to expand</span>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
