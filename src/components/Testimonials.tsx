import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { testimonials } from '../data/personalData';
import { Testimonial } from '../types';

// Generate a consistent gradient from a string
const getAvatarGradient = (str: string): string => {
  const gradients = [
    'from-blue-500 to-indigo-600',
    'from-emerald-500 to-teal-600',
    'from-amber-500 to-orange-600',
    'from-rose-500 to-pink-600',
    'from-violet-500 to-purple-600',
    'from-cyan-500 to-blue-600',
  ];
  const index = str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % gradients.length;
  return gradients[index];
};

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Split testimonials into two rows
const topRow = testimonials.filter((_, i) => i % 2 === 0);
const bottomRow = testimonials.filter((_, i) => i % 2 !== 0);

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
  <motion.div
    className="flex-shrink-0 w-[300px] sm:w-[380px] md:w-[480px] p-5 sm:p-7 rounded-xl border border-border bg-card hover:border-primary/30 transition-all duration-300 group"
    whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
  >
    {/* Author row */}
    <div className="flex items-center gap-3 mb-3 sm:mb-4">
      <div
        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br ${getAvatarGradient(testimonial.company)} flex items-center justify-center flex-shrink-0`}
      >
        {testimonial.image ? (
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <span className="text-white text-[10px] sm:text-xs font-bold font-mono">
            {getInitials(testimonial.company)}
          </span>
        )}
      </div>
      <div className="min-w-0">
        <p className="font-semibold text-foreground text-xs sm:text-sm truncate">{testimonial.name}</p>
        <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
          {testimonial.role}, {testimonial.company}
        </p>
      </div>
      {/* Stars */}
      <div className="flex gap-0.5 ml-auto flex-shrink-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${
              i < testimonial.rating
                ? 'text-amber-400 fill-amber-400'
                : 'text-border fill-border'
            }`}
          />
        ))}
      </div>
    </div>

    {/* Quote */}
    <p className="text-foreground/70 font-sans leading-relaxed text-[12px] sm:text-[14px]">
      "{testimonial.quote}"
    </p>
  </motion.div>
);

const MarqueeRow: React.FC<{ items: Testimonial[]; direction: 'left' | 'right' }> = ({
  items,
  direction,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  // Triple the items to ensure seamless loop
  const repeatedItems = [...items, ...items, ...items];

  return (
    <div
      className="relative overflow-hidden py-2"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-3 sm:gap-5"
        animate={{
          x: direction === 'left' ? ['0%', '-33.333%'] : ['-33.333%', '0%'],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: direction === 'left' ? 40 : 45,
            ease: 'linear',
          },
        }}
        style={{
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        {repeatedItems.map((testimonial, index) => (
          <TestimonialCard key={`${testimonial.company}-${index}`} testimonial={testimonial} />
        ))}
      </motion.div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-16 sm:py-20 md:py-32 bg-background border-t border-border overflow-hidden">
      <div className="container px-4 mx-auto max-w-6xl mb-8 sm:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4 font-heading">
            WHAT CLIENTS SAY
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground font-sans leading-relaxed max-w-xl">
            Real feedback from people I've worked with across development, video editing, and automation.
          </p>
        </motion.div>
      </div>

      {/* Scrolling rows — full bleed */}
      <div className="space-y-3 sm:space-y-5">
        <MarqueeRow items={topRow.length > 0 ? topRow : testimonials.slice(0, 2)} direction="left" />
        <MarqueeRow items={bottomRow.length > 0 ? bottomRow : testimonials.slice(2)} direction="right" />
      </div>

      <div className="container px-4 mx-auto max-w-6xl mt-8 sm:mt-10">
        <motion.p
          className="text-xs sm:text-sm text-muted-foreground font-sans"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          Feedback from clients across web development, video production, and automation projects.
        </motion.p>
      </div>
    </section>
  );
};

export default Testimonials;
