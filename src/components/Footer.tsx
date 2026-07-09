import React from 'react';
import { socialLinks } from '../data/personalData';
import SocialLinks from './SocialLinks';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 sm:py-12 bg-background border-t border-border">
      <div className="container px-4 mx-auto max-w-6xl flex flex-col items-center gap-6 sm:gap-8 md:flex-row md:justify-between">

        {/* Brand */}
        <div className="text-center md:text-left">
          <a href="#home" className="text-xl sm:text-2xl font-extrabold font-heading tracking-tight text-foreground hover:opacity-80 transition-opacity">
            Sulaiman<span className="text-primary">.</span>
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center order-last md:order-none">
          <p className="text-xs sm:text-sm font-medium font-sans text-muted-foreground">
            &copy; {new Date().getFullYear()} Chernor Sulaiman Jalloh. All rights reserved.
          </p>
        </div>

        {/* Socials */}
        <div>
          <SocialLinks links={socialLinks} variant="default" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;