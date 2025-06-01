import React, { useState } from 'react';
import { personalInfo, bioInfo } from '../data/personalData';
import { ArrowRight } from 'lucide-react';

const About: React.FC = () => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const infoItems = [
    { label: 'Age', value: personalInfo.age },
    { label: 'Residence', value: personalInfo.residence },
    { label: 'Freelance', value: personalInfo.freelanceStatus },
    { label: 'Address', value: personalInfo.address },
  ];

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              About Me
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Get to know me better
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Image Section */}
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-96 lg:h-96 mx-auto">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary/20 to-primary/0 animate-float" />
                {!imageError ? (
                  <img
                    src={bioInfo.profileImage}
                    alt={bioInfo.name}
                    className={`rounded-2xl object-cover w-full h-full relative z-10 p-2 transition-opacity duration-300 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onError={(e) => {
                      console.error('Image failed to load:', e);
                      setImageError(true);
                    }}
                    onLoad={() => setImageLoaded(true)}
                    loading="lazy"
                    style={{
                      objectPosition: '50% 15%',
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <div className="rounded-2xl w-full h-full relative z-10 p-2 bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                    <span className="text-4xl font-bold text-gray-400">
                      {bioInfo.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 rounded-2xl border-2 border-primary/20" />
              </div>
              {/* Background decorations */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/5 to-primary/0 rounded-full blur-3xl" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 rounded-full blur-3xl" />
            </div>

            {/* Content Section */}
            <div className="space-y-6">
              <div className="prose prose-lg dark:prose-invert">
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
                  I am a passionate Software Engineer with a focus on creating beautiful and functional web experiences. 
                  My journey in web development started with a curiosity for how things work on the internet, 
                  and has evolved into a professional career building modern web applications.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {infoItems.map((item) => (
                  <div key={item.label} className="space-y-1">
                    <dt className="text-sm text-gray-500 dark:text-gray-400">{item.label}:</dt>
                    <dd className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#contact"
                  className="button button-primary px-6 py-3 rounded-full inline-flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  Hire Me
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button-secondary px-6 py-3 rounded-full inline-flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  Download CV
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;