import React from 'react';
import ThemeToggle from './ui/ThemeToggle';

const NAV_ITEMS = [
  { label: 'Work', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const Header: React.FC = () => (
  <header className="sticky top-0 z-10 border-b border-line bg-glass backdrop-blur-[14px]">
    <div className="pf-container min-h-[72px] flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
      <a href="#home" className="font-heading font-extrabold text-[22px] tracking-[-0.02em]">
        Sulaiman<span className="text-accent">.</span>
      </a>
      <div className="flex items-center gap-7">
        <nav aria-label="Primary" className="flex gap-x-8 gap-y-1 text-[15px] font-medium text-muted">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} className="py-2.5">
              {item.label}
            </a>
          ))}
        </nav>
        <span aria-hidden="true" className="w-px h-[22px] bg-line-2" />
        <ThemeToggle />
      </div>
    </div>
  </header>
);

export default Header;
