import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Section } from './ui/Section';
import { skills, extraSkills } from '../data/personalData';
import { Sparkles, CheckCircle2 } from 'lucide-react';

// Animated counter hook
const useCountUp = (end: number, inView: boolean, duration = 1.2) => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, end, duration]);

  return count;
};

const SkillBar: React.FC<{ skill: { name: string; percentage: number }; index: number }> = ({ skill, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useCountUp(skill.percentage, isInView);

  return (
    <motion.div
      ref={ref}
      className="group"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold font-mono text-sm sm:text-base text-foreground tracking-tight group-hover:text-primary transition-colors">
          {skill.name}
        </span>
        <span className="text-xs font-mono font-bold text-muted-foreground tabular-nums">{count}%</span>
      </div>
      <div className="h-2 sm:h-2.5 w-full bg-secondary rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-foreground rounded-full group-hover:bg-primary transition-colors shimmer-effect"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.percentage}%` }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.06 + 0.3, duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
};

const Skills: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'technical' | 'professional'>('technical');

  return (
    <Section id="skills" className="bg-background py-16 sm:py-20 md:py-32 border-t border-border">
      <div className="container px-4 mx-auto max-w-4xl">
        <motion.div
          className="mb-10 sm:mb-12 text-center"
          initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-6 sm:mb-8 font-heading">
            SKILLS & EXPERTISE
          </h2>

          {/* Tab Slider */}
          <div className="inline-flex p-1 rounded-full bg-secondary/50 border border-border mx-auto relative overflow-hidden">
            <button
              onClick={() => setActiveTab('technical')}
              className={`relative z-10 px-3 sm:px-6 py-2 rounded-full text-[11px] sm:text-sm font-bold font-mono tracking-wide transition-all duration-300 ${
                activeTab === 'technical'
                  ? 'bg-foreground text-background shadow-md'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              TECHNICAL
            </button>
            <button
              onClick={() => setActiveTab('professional')}
              className={`relative z-10 px-3 sm:px-6 py-2 rounded-full text-[11px] sm:text-sm font-bold font-mono tracking-wide transition-all duration-300 ${
                activeTab === 'professional'
                  ? 'bg-foreground text-background shadow-md'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              PROFICIENCIES
            </button>
          </div>
        </motion.div>

        <div className="min-h-[400px] sm:min-h-[500px]">
          <AnimatePresence mode="wait">
            {activeTab === 'technical' ? (
              <motion.div
                key="technical"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-3 mb-6 sm:mb-8 justify-center md:justify-start">
                  <Sparkles className="w-5 h-5 text-foreground" />
                  <h3 className="text-lg sm:text-xl font-bold text-foreground font-mono">CORE STACK</h3>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  {skills.map((skill, index) => (
                    <SkillBar key={skill.name} skill={skill} index={index} />
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="professional"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-3 mb-6 sm:mb-8 justify-center md:justify-start">
                  <CheckCircle2 className="w-5 h-5 text-foreground" />
                  <h3 className="text-lg sm:text-xl font-bold text-foreground font-mono">PROFESSIONAL COMPETENCIES</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {extraSkills.map((skill, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-lg border border-border bg-card hover:bg-secondary/50 hover:border-primary/30 transition-all duration-300 group"
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05, duration: 0.4 }}
                      whileHover={{ y: -2 }}
                    >
                      <div className="w-2 h-2 rounded-full bg-primary group-hover:scale-150 transition-transform flex-shrink-0" />
                      <span className="text-sm sm:text-base font-bold font-mono text-foreground tracking-tight">
                        {skill.name.toUpperCase()}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
};

export default Skills;
