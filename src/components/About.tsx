import React from 'react';
import { personalInfo, languages } from '../data/personalData';
import { Section } from './ui/Section';
import { MapPin, Clock, Zap, Target, Users2 } from 'lucide-react';

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
    <Section id="about" className="py-12 bg-background border-t border-border">
      <div className="container px-4 mx-auto max-w-6xl">

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

          {/* Left Column: Bio */}
          <div className="flex-1 space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-6 font-heading">
                ABOUT ME
              </h2>
              <div className="space-y-6 text-lg leading-relaxed text-muted-foreground font-sans">
                <p>
                  I am a software engineer focused on bridging the gap between <strong className="text-foreground">complex backend logic</strong> and <strong className="text-foreground">intuitive user interfaces</strong>.
                  Currently organizing my workflows to maximize efficiency, I have delivered production-grade applications for diverse clients,
                  including securing a return offer from a leading cybersecurity firm.
                </p>
                <p>
                  My engineering philosophy is grounded in reality: <strong className="text-foreground">Ship clean, maintainable code that solves actual business problems.</strong> I avoid over-engineering in favor of robust, scalable solutions.
                </p>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-lg border border-border bg-secondary/20">
                <div className="flex items-center gap-3 mb-2 opacity-80">
                  <MapPin className="w-4 h-4 text-foreground" />
                  <span className="text-xs font-bold font-mono uppercase tracking-wider text-foreground">Location</span>
                </div>
                <p className="font-bold text-foreground">{personalInfo.address}</p>
              </div>
              <div className="p-5 rounded-lg border border-border bg-secondary/20">
                <div className="flex items-center gap-3 mb-2 opacity-80">
                  <Clock className="w-4 h-4 text-foreground" />
                  <span className="text-xs font-bold font-mono uppercase tracking-wider text-foreground">Availability</span>
                </div>
                <p className="font-bold text-foreground">{personalInfo.freelanceStatus}</p>
              </div>
            </div>

            <div className="pt-2">
              <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-muted-foreground mb-4">LANGUAGES</h3>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <span key={lang.name} className="px-4 py-1.5 border border-border bg-background text-foreground text-sm font-bold font-mono rounded overflow-hidden uppercase tracking-tight">
                    {lang.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Highlights (Structural Style) */}
          <div className="w-full lg:w-[400px] flex flex-col gap-4">
            {highlights.map((item, index) => (
              <div key={index} className="group p-6 rounded-lg border border-border bg-card hover:bg-secondary/40 transition-all duration-300">
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-2 rounded bg-foreground text-background">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold font-mono text-foreground tracking-tight">{item.title}</h4>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </Section>
  );
};

export default About;