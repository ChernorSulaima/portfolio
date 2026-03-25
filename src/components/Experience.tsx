import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { bioInfo } from '../data/personalData';
import { ArrowRight, Briefcase, Building2 } from 'lucide-react';

const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  // The ball's vertical progress along the timeline
  const ballProgress = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Track which job card the ball is near
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
    <section id="experience" className="py-20 md:py-32 bg-background">
      <div className="container px-4 mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4 font-heading">
            WORK EXPERIENCE
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl font-sans leading-relaxed">
            A journey through roles that shaped my engineering craft.
          </p>
          <div className="h-1 w-20 bg-primary rounded-full mt-6" />
        </motion.div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-border" />

          {/* Animated fill line */}
          <motion.div
            className="absolute left-6 md:left-8 top-0 w-px bg-primary origin-top"
            style={{ height: ballProgress }}
          />

          {/* Scrolling Ball */}
          <motion.div
            className="absolute left-6 md:left-8 -translate-x-1/2 z-20"
            style={{ top: ballProgress }}
          >
            <div className="w-5 h-5 rounded-full bg-primary shadow-[0_0_20px_rgba(59,130,246,0.5)] border-[3px] border-background transition-all duration-300" />
          </motion.div>

          {/* Experience Items */}
          <div ref={timelineRef} className="space-y-16 md:space-y-20 relative">
            {bioInfo.experience.map((job, index) => (
              <motion.div
                key={index}
                className="relative pl-16 md:pl-20"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {/* Static dot on the line */}
                <div
                  className={`absolute left-[18px] md:left-[26px] top-2 w-3.5 h-3.5 rounded-full border-[3px] transition-all duration-500 ${
                    activeIndex >= index
                      ? 'border-primary bg-primary/20 scale-110'
                      : 'border-muted-foreground/30 bg-background'
                  }`}
                />

                {/* Card */}
                <div
                  className={`group relative p-6 md:p-8 rounded-xl border transition-all duration-500 ${
                    activeIndex === index
                      ? 'border-primary/40 bg-card shadow-lg shadow-primary/5'
                      : 'border-border bg-card hover:border-primary/20 hover:shadow-md'
                  }`}
                >
                  {/* Period & Type Badge */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-xs font-bold font-mono text-primary uppercase tracking-wider">
                      {job.period}
                    </span>
                    {job.type === 'internship' && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-bold bg-emerald-500/10 text-emerald-600 tracking-wider border border-emerald-500/20">
                        Offer Extended
                      </span>
                    )}
                    {job.type === 'full-time' && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-bold bg-blue-500/10 text-blue-600 tracking-wider border border-blue-500/20">
                        Full-Time
                      </span>
                    )}
                    {job.type === 'contract' && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-bold bg-amber-500/10 text-amber-600 tracking-wider border border-amber-500/20">
                        Freelance
                      </span>
                    )}
                  </div>

                  {/* Role */}
                  <h3 className="text-xl md:text-2xl font-bold text-foreground font-heading mb-1">
                    {job.role}
                  </h3>

                  {/* Company */}
                  <div className="flex items-center gap-2 mb-4">
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                    <span className="text-base font-semibold text-primary">
                      {job.company}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed mb-6 text-[15px] font-sans">
                    {job.description}
                  </p>

                  {/* Achievements */}
                  <ul className="space-y-3">
                    {job.achievements.map((achievement, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-3 text-sm text-foreground/80"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                      >
                        <ArrowRight className="w-4 h-4 text-primary/60 mt-0.5 flex-shrink-0" />
                        <span>{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
