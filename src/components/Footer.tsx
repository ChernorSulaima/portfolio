import React from 'react';
import { socialLinks } from '../data/personalData';
import SocialLinks from './SocialLinks';

const secondaryLinks = [
  { label: 'Skills', href: '#skills' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'GitHub', href: '#github' },
  { label: 'Pricing', href: '#pricing' },
];

const Footer: React.FC = () => {
  return (
    <footer className="py-8 sm:py-12 bg-background border-t border-border">
      <div className="container px-4 mx-auto max-w-6xl flex flex-col items-center gap-6 sm:gap-8">
        <div className="w-full flex flex-col items-center gap-6 sm:gap-8 md:flex-row md:justify-between">
          <div className="text-center md:text-left">
            <a
              href="#home"
              className="text-xl sm:text-2xl font-extrabold font-heading tracking-tight text-foreground hover:opacity-80 transition-opacity"
            >
              Sulaiman<span className="text-primary">.</span>
            </a>
          </div>

          <nav aria-label="Secondary" className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {secondaryLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors min-h-[44px] inline-flex items-center"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div>
            <SocialLinks links={socialLinks} variant="default" />
          </div>
        </div>

        <p className="text-xs sm:text-sm font-medium font-sans text-muted-foreground text-center">
          &copy; {new Date().getFullYear()} Chernor Sulaiman Jalloh. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
