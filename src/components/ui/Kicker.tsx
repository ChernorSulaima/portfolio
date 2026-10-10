import React from 'react';

interface KickerProps {
  children: React.ReactNode;
  /** Smaller rule and label used on phones. */
  compact?: boolean;
}

/** Accent rule + uppercase label that sits above section headings. */
const Kicker: React.FC<KickerProps> = ({ children, compact = false }) => (
  <div className="flex items-center gap-3">
    <span className={`h-px bg-accent ${compact ? 'w-8' : 'w-10'}`} />
    <span
      className={`font-mono font-bold uppercase tracking-[0.2em] text-accent-text ${
        compact ? 'text-[11px]' : 'text-[12px]'
      }`}
    >
      {children}
    </span>
  </div>
);

export default Kicker;
