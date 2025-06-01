import React, { useEffect, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import SocialLinks from './SocialLinks';
import { bioInfo, socialLinks } from '../data/personalData';
import profileImage from '../assets/Chernor_1MB_HighQuality.jpg';
import '../styles/noise.css';

const Hero: React.FC = () => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = window.innerHeight;
      const newOpacity = Math.max(0, 1 - (scrollPosition / maxScroll));
      setOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center pt-16 bg-background/80 dark:bg-background/80 backdrop-blur-sm transition-opacity duration-300"
      style={{ opacity }}
    >
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="heading-1 text-foreground dark:text-white">
                Hi, I'm <span className="text-primary dark:text-primary-foreground">{bioInfo.name}</span>
              </h1>
              <h2 className="heading-2 text-foreground dark:text-white">
                <span className="text-primary dark:text-primary-foreground">Frontend</span> Developer
              </h2>
              <p className="text-foreground dark:text-gray-300 text-lg max-w-lg">
                {bioInfo.description}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <a 
                href="#contact" 
                className="button button-primary dark:bg-primary-foreground dark:text-primary dark:hover:bg-primary-foreground/90 px-8 py-3 text-lg group"
              >
                Hire Me
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </a>
              <SocialLinks links={socialLinks} />
            </div>

            <div className="hidden lg:flex items-center gap-4 text-foreground dark:text-gray-300">
              <span className="h-px w-16 bg-border dark:bg-gray-600"></span>
              <span className="text-sm font-medium">Scroll to explore</span>
            </div>
          </div>
          
          {/* Profile Image with Circle Effects */}
          <div className="relative flex justify-center items-center">
            {/* Outer decorative ring */}
            <div className="absolute w-[32rem] h-[32rem] rounded-full border-2 border-gray-200/20 dark:border-white/10 animate-[spin_30s_linear_infinite]"></div>
            
            {/* Middle ring with segments */}
            <div className="absolute w-[30rem] h-[30rem]">
              <div className="absolute inset-0 rounded-full border-2 border-gray-200/20 dark:border-white/10"></div>
              {/* Ring segments */}
              <div className="absolute h-full w-full animate-[spin_20s_linear_infinite]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-8 border-2 border-gray-200/30 dark:border-white/20 rounded-full"></div>
                <div className="absolute top-1/2 right-0 -translate-y-1/2 h-4 w-8 border-2 border-gray-200/30 dark:border-white/20 rounded-full"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-8 border-2 border-gray-200/30 dark:border-white/20 rounded-full"></div>
                <div className="absolute top-1/2 left-0 -translate-y-1/2 h-4 w-8 border-2 border-gray-200/30 dark:border-white/20 rounded-full"></div>
              </div>
            </div>

            {/* Main image container */}
            <div className="relative w-[28rem] h-[28rem] overflow-hidden rounded-full shadow-xl transform hover:scale-[1.02] transition-transform duration-500">
              <img 
                src={profileImage}
                alt="Professional headshot"
                className="w-full h-full object-cover object-center filter contrast-105 saturate-95"
              />
              {/* Vintage effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-amber-800/5 to-neutral-900/10 mix-blend-overlay rounded-full"></div>
              {/* Film grain effect */}
              <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-overlay rounded-full"></div>
              {/* Inner circle border */}
              <div className="absolute -inset-px rounded-full border-2 border-gray-200/20 dark:border-white/10"></div>
            </div>

            {/* Background glow */}
            <div className="absolute -inset-x-20 -inset-y-32 hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-800/10 via-neutral-900/5 to-neutral-800/10 blur-3xl opacity-30 dark:opacity-20"></div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden lg:block">
          <ChevronDown className="text-primary dark:text-white" size={24} />
        </div>
      </div>
    </section>
  );
};

export default Hero;