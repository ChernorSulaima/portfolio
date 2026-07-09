import React from 'react';
import { motion } from 'framer-motion';
import { Section } from './ui/Section';
import { Card } from './ui/Card';
import { services } from '../data/personalData';
import { Code2, Layout, Zap, ArrowRight, Film, Workflow } from 'lucide-react';

const iconMap: { [key: string]: React.FC<{ className?: string }> } = {
  Code2,
  Layout,
  Zap,
  Film,
  Workflow,
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95, filter: 'blur(4px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  }),
};

const Services: React.FC = () => {
  return (
    <Section id="services" className="bg-background py-16 sm:py-20 md:py-32 border-t border-border">
      <div className="container px-4 mx-auto max-w-6xl">
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-4 font-heading">
              SERVICES
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-xl font-sans leading-relaxed">
              Engineering solutions that drive business growth.
            </p>
          </div>
          <a href="#contact" className="group inline-flex items-center text-sm font-bold font-mono text-foreground hover:text-primary transition-colors uppercase tracking-wider">
            Start a Project <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Code2;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
              >
                <Card
                  className="p-5 sm:p-6 md:p-8 h-full border border-border bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group"
                  variant="default"
                >
                  <div className="flex flex-col h-full">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-secondary text-foreground flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 group-hover-spin" />
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4 font-heading tracking-tight">
                      {service.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed mb-6 sm:mb-8 flex-grow font-sans text-sm sm:text-base">
                      {service.description}
                    </p>

                    <ul className="space-y-3 sm:space-y-4 border-t border-border pt-4 sm:pt-6">
                      {service.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold text-foreground/80 font-mono">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

export default Services;
