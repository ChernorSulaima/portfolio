import React from 'react';
import { socialLinks } from '../data/personalData';

const FOOTER_NAV = [
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'GitHub', href: '#github' },
  { label: 'Pricing', href: '#pricing' },
];

const Footer: React.FC = () => (
  <footer className="mt-auto border-t border-line">
    <div className="pf-container pt-14 pb-8 flex flex-col gap-10">
      <div className="flex flex-wrap justify-between gap-x-16 gap-y-8">
        <div className="flex-[1_1_280px] max-w-[360px] flex flex-col gap-3">
          <a href="#home" className="font-heading font-extrabold text-[24px] tracking-[-0.02em]">
            Sulaiman<span className="text-accent">.</span>
          </a>
          <p className="m-0 text-[14px] text-muted">
            Full-stack software engineer building secure, high-performance web apps from Freetown, Sierra Leone.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-[72px] gap-y-8">
          <nav aria-label="Footer" className="flex flex-col gap-2.5 text-[14px]">
            <span className="eyebrow">Navigate</span>
            {FOOTER_NAV.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-2.5 text-[14px]">
            <span className="eyebrow">Elsewhere</span>
            {socialLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-between gap-x-8 gap-y-3 pt-6 border-t border-line text-[13px] text-muted">
        <span>© 2026 Chernor Sulaiman Jalloh. All rights reserved.</span>
        <a href="#home">Back to top ↑</a>
      </div>
    </div>
  </footer>
);

export default Footer;
