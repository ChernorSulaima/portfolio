import React, { useEffect } from 'react';
import Link from '../ui/Link';

const NAV_ITEMS = [
  { label: 'Work', to: '/#projects', current: true },
  { label: 'About', to: '/#about' },
  { label: 'Contact', to: '/#contact' },
];

interface CaseStudyLayoutProps {
  title: string;
  children: React.ReactNode;
}

const CaseStudyLayout: React.FC<CaseStudyLayoutProps> = ({ title, children }) => {
  useEffect(() => {
    document.title = `${title} — Case study | Chernor Sulaiman Jalloh`;
  }, [title]);

  return (
    <>
      <header className="sticky top-0 z-10 border-b border-line bg-glass backdrop-blur-[14px]">
        <div className="pf-container min-h-[72px] flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
          <Link to="/" className="font-heading font-extrabold text-[22px] tracking-[-0.02em]">
            Sulaiman<span className="text-accent">.</span>
          </Link>
          <nav aria-label="Primary" className="flex gap-x-8 gap-y-1 text-[15px] font-medium text-muted">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                aria-current={item.current ? 'true' : undefined}
                className={`relative py-2.5 ${item.current ? 'text-fg' : ''}`}
              >
                {item.label}
                {item.current && <span className="absolute inset-x-0 bottom-1 h-0.5 rounded-sm bg-accent" />}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="mt-auto border-t border-line">
        <div className="pf-container py-7 flex flex-wrap justify-between items-center gap-x-8 gap-y-3 text-[13px] text-muted">
          <span>© 2026 Chernor Sulaiman Jalloh. All rights reserved.</span>
          <Link to="/#contact" className="font-semibold text-fg">
            Start a project →
          </Link>
        </div>
      </footer>
    </>
  );
};

export default CaseStudyLayout;
