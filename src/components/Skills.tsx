import React from 'react';
import { skills, extraSkills } from '../data/personalData';
import ProgressBar from './ProgressBar';
import { Check } from 'lucide-react';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-16 bg-background dark:bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground dark:text-white">My Skills</h2>
        
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="lg:w-2/3">
            <div className="bg-card dark:bg-card/40 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-6 text-foreground dark:text-white">Technical Skills</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-foreground dark:text-gray-200">{skill.name}</span>
                      <span className="text-muted-foreground dark:text-gray-400">{skill.percentage}%</span>
                    </div>
                    <ProgressBar percentage={skill.percentage} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/3">
            <div className="bg-card dark:bg-card/40 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-6 text-foreground dark:text-white">Extra Skills</h3>
              
              <div className="space-y-4">
                {extraSkills.map((skill, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mt-1 mr-3 min-w-6 flex-shrink-0">
                      <div className="w-5 h-5 bg-primary dark:bg-primary-foreground rounded-sm flex items-center justify-center">
                        <Check size={14} className="text-white dark:text-primary" />
                      </div>
                    </div>
                    <span className="text-foreground dark:text-gray-300">{skill.name}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <p className="text-muted-foreground dark:text-gray-400 leading-relaxed">
                  Beyond my core technical skills, I'm constantly learning and exploring new technologies 
                  to expand my toolkit and stay ahead in the rapidly evolving web development landscape.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;