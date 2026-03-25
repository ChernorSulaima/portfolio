import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/personalData';
import { ArrowUpRight, ChevronRight, Lock } from 'lucide-react';
import { Project } from '../types';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-20 md:py-32 bg-background">
      <div className="container px-4 mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-primary" />
            <span className="text-xs font-bold font-mono text-primary uppercase tracking-[0.2em]">
              Portfolio
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-4 font-heading">
            SELECTED WORKS
          </h2>
          <p className="text-lg text-muted-foreground font-sans leading-relaxed max-w-xl">
            Real-world applications built for real businesses — from procurement platforms to gaming arenas.
          </p>
        </motion.div>
      </div>

      {/* Project Cards — Alternating Layout */}
      <div className="space-y-0">
        {projects.map((project, index) => (
          <ProjectShowcase key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* NDA Section */}
      <div className="container px-4 mx-auto max-w-6xl mt-20">
        <motion.div
          className="rounded-2xl border border-border bg-card/50 backdrop-blur p-8 md:p-10 flex flex-col md:flex-row gap-6 items-start md:items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="p-4 bg-primary/10 border border-primary/20 rounded-2xl text-primary shrink-0">
            <Lock className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold font-mono text-foreground uppercase tracking-wide">
              + More Under NDA
            </h3>
            <p className="text-muted-foreground font-sans text-base leading-relaxed">
              I've built <strong>7+ additional projects</strong> for clients under strict NDAs — SaaS platforms, internal dashboards, and enterprise tools that can't be publicly showcased.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Individual project showcase — alternating image/content sides
const ProjectShowcase: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8 }}
    >
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="container px-4 mx-auto max-w-7xl">
          <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-16 py-16 md:py-24 border-t border-border`}>
            {/* Image Side */}
            <motion.div
              className="w-full lg:w-[58%] relative"
              initial={{ opacity: 0, x: isEven ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0, 1] }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-muted aspect-video shadow-2xl shadow-black/10">
                {/* Gradient overlay on hover */}
                <motion.div
                  className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 via-transparent to-transparent"
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                />
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center"
                  animate={{ scale: isHovered ? 1.05 : 1 }}
                  transition={{ duration: 0.7, ease: [0.25, 0.1, 0, 1] }}
                />
                {/* Visit button on hover */}
                <motion.div
                  className="absolute bottom-6 left-6 z-20 flex items-center gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <span className="px-5 py-2.5 bg-white text-black text-sm font-bold font-mono uppercase tracking-wider rounded-full flex items-center gap-2 shadow-lg">
                    Visit Live Site
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </motion.div>
              </div>

              {/* Floating project number */}
              <motion.div
                className={`absolute -top-6 ${isEven ? '-right-4 lg:-right-8' : '-left-4 lg:-left-8'} z-20 hidden lg:block`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <span className="text-8xl font-black font-heading text-primary/10 select-none">
                  0{index + 1}
                </span>
              </motion.div>
            </motion.div>

            {/* Content Side */}
            <motion.div
              className="w-full lg:w-[42%] space-y-6"
              initial={{ opacity: 0, x: isEven ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0, 1] }}
            >
              {/* Category */}
              <motion.span
                className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold font-mono uppercase tracking-[0.15em]"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                {project.category}
              </motion.span>

              {/* Title */}
              <h3 className="text-3xl md:text-4xl font-bold font-heading text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground font-sans text-base md:text-lg leading-relaxed">
                {project.description}
              </p>

              {/* Problem → Solution */}
              <div className="space-y-4 pt-2">
                <div className="flex gap-3">
                  <div className="w-1 rounded-full bg-red-400/30 shrink-0" />
                  <div>
                    <p className="text-[11px] font-bold font-mono text-red-400 uppercase tracking-wider mb-1">Challenge</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{project.problem}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-1 rounded-full bg-emerald-400/30 shrink-0" />
                  <div>
                    <p className="text-[11px] font-bold font-mono text-emerald-400 uppercase tracking-wider mb-1">Solution</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{project.solution}</p>
                  </div>
                </div>
              </div>

              {/* Key Features */}
              {project.keyFeatures && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.keyFeatures.map((feature) => (
                    <span
                      key={feature}
                      className="flex items-center gap-1.5 text-xs text-foreground/70 font-medium"
                    >
                      <ChevronRight className="w-3 h-3 text-primary" />
                      {feature}
                    </span>
                  ))}
                </div>
              )}

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 pt-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg bg-secondary/80 text-secondary-foreground text-[11px] font-bold font-mono uppercase tracking-tight border border-border/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <motion.div
                className="flex items-center gap-2 text-primary font-bold font-mono text-sm uppercase tracking-wider pt-2 group-hover:gap-3 transition-all duration-300"
                animate={{ x: isHovered ? 4 : 0 }}
              >
                <span>View Project</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </a>
    </motion.div>
  );
};

export default Projects;
