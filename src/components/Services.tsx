import React from 'react';
import { Section } from './ui/Section';
import { Card } from './ui/Card';
import { services } from '../data/personalData';
import { Code2, Layout, Zap, ArrowRight, Monitor, Laptop } from 'lucide-react';

const iconMap: { [key: string]: React.FC<{ className?: string }> } = {
  Code2,
  Layout,
  Zap,
};

const Services: React.FC = () => {
  return (
    <Section id="services" className="bg-background py-12 border-t border-border">
      <div className="container px-4 mx-auto max-w-6xl">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-4 font-heading">
              SERVICES
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl font-sans leading-relaxed">
              Engineering solutions that drive business growth.
            </p>
          </div>
          <a href="#contact" className="group inline-flex items-center text-sm font-bold font-mono text-foreground hover:text-primary transition-colors uppercase tracking-wider">
            Start a Project <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Code2;
            return (
              <Card
                key={index}
                className="p-8 h-full border border-border bg-card hover:border-foreground/20 transition-all duration-300 group"
                variant="default"
              >
                <div className="flex flex-col h-full">
                  <div className="w-12 h-12 rounded bg-secondary text-foreground flex items-center justify-center mb-6 group-hover:bg-foreground group-hover:text-background transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-4 font-heading tracking-tight">
                    {service.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed mb-8 flex-grow font-sans">
                    {service.description}
                  </p>

                  <ul className="space-y-4 border-t border-border pt-6">
                    {service.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-bold text-foreground/80 font-mono">
                        <div className="w-1.5 h-1.5 rounded-full bg-foreground flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

export default Services;