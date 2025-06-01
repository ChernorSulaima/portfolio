import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import SocialLinks from './SocialLinks';
import { bioInfo } from '../data/personalData';

const Hero: React.FC = () => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section id="home" className="min-h-[calc(100vh-4rem)] flex items-center py-16 lg:py-24">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="text-foreground">Hi, I'm </span>
                <span className="text-primary">{bioInfo.name}</span>
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground font-medium">
                {bioInfo.title}
              </p>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                {bioInfo.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <a
                href="#contact"
                className="button button-primary px-8 py-3 rounded-full w-full sm:w-auto text-base"
              >
                Contact Me
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <div className="w-full sm:w-auto">
                <SocialLinks links={bioInfo.socialLinks} variant="muted" />
              </div>
            </div>
          </div>

          {/* Profile Image */}
          <div className="relative order-first lg:order-last mx-auto max-w-sm lg:max-w-none">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-96 lg:h-96 mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-primary/0 animate-float" />
              {!imageError ? (
                <img
                  src="/images/Chernor_1MB_HighQuality.jpg"
                  alt={bioInfo.name}
                  className={`rounded-full object-cover w-full h-full relative z-10 p-2 transition-opacity duration-300 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onError={(e) => {
                    console.error('Image failed to load:', e);
                    setImageError(true);
                  }}
                  onLoad={() => setImageLoaded(true)}
                  loading="eager"
                  style={{
                    objectPosition: '50% 15%',
                    objectFit: 'cover'
                  }}
                />
              ) : (
                <div className="rounded-full w-full h-full relative z-10 p-2 bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                  <span className="text-4xl font-bold text-gray-400">
                    {bioInfo.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
            </div>

            {/* Background decorations */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/5 to-primary/0 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;