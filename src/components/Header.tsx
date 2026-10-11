import React, { useEffect, useState } from 'react';
import Icon from './ui/Icon';
import ThemeToggle from './ui/ThemeToggle';
import { PHONE_QUERY, useMediaQuery } from '../hooks/useMediaQuery';

const NAV_ITEMS = [
  { label: 'Work', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const PHONE_MENU = [
  { label: 'Work', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'About', href: '#about' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

const Logo: React.FC<{ size: string }> = ({ size }) => (
  <a href="#home" className={`font-heading font-extrabold tracking-[-0.02em] ${size}`}>
    Sulaiman<span className="text-accent">.</span>
  </a>
);

/** Phones: logo, theme toggle and a full-screen menu. */
const PhoneHeader: React.FC = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-10 h-16 box-border px-5 flex items-center justify-between border-b border-line bg-bg">
        <Logo size="text-[21px]" />
        <div className="flex gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="phone-menu"
            data-testid="mobile-menu-toggle"
            className="icon-btn text-fg"
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </header>
      {open && (
        <nav
          id="phone-menu"
          aria-label="Primary"
          className="fixed z-[9] top-16 inset-x-0 bottom-0 box-border px-5 py-6 bg-bg flex flex-col overflow-y-auto"
        >
          {PHONE_MENU.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between min-h-[72px] border-b border-line font-heading font-semibold text-[30px] tracking-[-0.02em]"
            >
              {item.label}
              <span className="font-mono text-[11px] text-muted">{String(i + 1).padStart(2, '0')}</span>
            </a>
          ))}
        </nav>
      )}
    </>
  );
};

const Header: React.FC = () => {
  const isPhone = useMediaQuery(PHONE_QUERY);
  if (isPhone) return <PhoneHeader />;

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-glass backdrop-blur-[14px]">
      <div className="pf-container min-h-[72px] flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
        <Logo size="text-[22px]" />
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
};

export default Header;
