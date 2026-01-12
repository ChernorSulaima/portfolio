import React, { useState } from 'react';
import { Section } from './ui/Section';
import { skills, extraSkills } from '../data/personalData';
import { Sparkles, CheckCircle2 } from 'lucide-react';

const Skills: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'technical' | 'professional'>('technical');

  return (
    <Section id="skills" className="bg-background py-20 border-t border-border">
      <div className="container px-4 mx-auto max-w-4xl">

        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-8 font-heading">
            SKILLS & EXPERTISE
          </h2>

          {/* Tab Slider */}
          <div className="inline-flex p-1 rounded-full bg-secondary/50 border border-border mx-auto relative overflow-hidden">

            <button
              onClick={() => setActiveTab('technical')}
              className={`relative z-10 px-6 py-2 rounded-full text-sm font-bold font-mono tracking-wide transition-all duration-300 ${activeTab === 'technical'
                  ? 'bg-foreground text-background shadow-md'
                  : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              TECHNICAL ABILITY
            </button>

            <button
              onClick={() => setActiveTab('professional')}
              className={`relative z-10 px-6 py-2 rounded-full text-sm font-bold font-mono tracking-wide transition-all duration-300 ${activeTab === 'professional'
                  ? 'bg-foreground text-background shadow-md'
                  : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              PROFICIENCIES
            </button>

          </div>
        </div>

        <div className="min-h-[400px]">
          <div key={activeTab} className="animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out fill-mode-forwards">

            {activeTab === 'technical' ? (
              <>
                <div className="flex items-center gap-3 mb-8 justify-center md:justify-start">
                  <Sparkles className="w-5 h-5 text-foreground" />
                  <h3 className="text-xl font-bold text-foreground font-mono">CORE STACK</h3>
                </div>

                <div className="space-y-8">
                  {skills.map((skill, index) => (
                    <div
                      key={skill.name}
                      className="group animate-in fade-in slide-in-from-left-4 duration-700 fill-mode-backwards"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold font-mono text-foreground tracking-tight group-hover:text-primary transition-colors">{skill.name}</span>
                        <span className="text-xs font-mono font-bold text-muted-foreground">{skill.percentage}%</span>
                      </div>
                      <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-foreground rounded-full transition-all duration-1000 ease-out group-hover:bg-primary"
                          style={{ width: `${skill.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-8 justify-center md:justify-start">
                  <CheckCircle2 className="w-5 h-5 text-foreground" />
                  <h3 className="text-xl font-bold text-foreground font-mono">PROFESSIONAL COMPETENCIES</h3>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {extraSkills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-5 rounded-lg border border-border bg-card hover:bg-secondary/50 hover:border-foreground/30 transition-all duration-300 group animate-in fade-in zoom-in-95 duration-500 fill-mode-backwards"
                      style={{ animationDelay: `${index * 75}ms` }}
                    >
                      <div className="w-2 h-2 rounded-full bg-foreground group-hover:scale-125 transition-transform flex-shrink-0" />
                      <span className="text-base font-bold font-mono text-foreground tracking-tight">
                        {skill.name.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}

          </div>
        </div>

      </div>
    </Section>
  );
};

export default Skills;