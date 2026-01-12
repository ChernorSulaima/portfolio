import React, { useState } from 'react';
import { ArrowRight, Download, GraduationCap, Calendar, User } from 'lucide-react';
import SocialLinks from './SocialLinks';
import { bioInfo } from '../data/personalData';

const Hero: React.FC = () => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section id="home" className="relative pt-20 pb-24 lg:pt-32 lg:pb-32 overflow-hidden bg-background">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-24">

          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left space-y-8 z-10">

            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary rounded-full mb-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-bold font-mono uppercase tracking-wider text-foreground">Available for work</span>
            </div>

            {/* Name & Title */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight text-foreground font-heading leading-[1.1]">
                Chernor Sulaiman Jalloh
              </h1>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-muted-foreground font-heading">
                Full-Stack Software Engineer
              </h2>
            </div>

            {/* Personal Details Row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm sm:text-base text-foreground/80 font-medium font-sans">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 border border-border transition-colors hover:bg-secondary">
                <User className="w-4 h-4 text-primary" />
                <span>24 Years Old</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 border border-border transition-colors hover:bg-secondary">
                <GraduationCap className="w-4 h-4 text-primary" />
                <span>Limkokwing University Sierra Leone</span>
              </div>
            </div>

            <p className="text-lg text-foreground/70 max-w-xl mx-auto lg:mx-0 font-sans leading-relaxed">
              I build pixel-perfect, performant web applications with a focus on seamless user experiences and scalable architecture.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#projects"
                className="px-8 py-4 bg-foreground text-background font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                View Selected Works <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border border-border text-foreground font-bold rounded-lg hover:bg-secondary transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Resume
              </a>
            </div>

            <div className="pt-6">
              <SocialLinks links={bioInfo.socialLinks} variant="default" />
            </div>
          </div>

          {/* Image Content - Larger & Animated */}
          <div className="relative flex-shrink-0">
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px]">

              {/* Animated Rings */}
              <div className="absolute inset-[-20px] rounded-full border border-border/30 border-t-primary/60 animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-[-10px] rounded-full border border-border/30 border-b-primary/60 animate-[spin_12s_linear_infinite_reverse]" />

              {/* Container Glow (Subtle) */}
              <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl -z-10" />

              <div className="w-full h-full rounded-full border-[6px] border-background shadow-2xl overflow-hidden ring-1 ring-border/50 relative z-10 transition-transform duration-500 hover:scale-[1.02]">
                {!imageError ? (
                  <img
                    src="/images/Chernor_1MB_HighQuality.jpg"
                    alt={bioInfo.name}
                    className={`w-full h-full object-cover transition-all duration-1000 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                    onError={() => setImageError(true)}
                    onLoad={() => setImageLoaded(true)}
                    loading="eager"
                  />
                ) : (
                  <div className="w-full h-full bg-secondary flex items-center justify-center text-4xl font-bold font-heading text-muted-foreground">
                    CJ
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;