import React from 'react';
import { AVAILABILITY, PORTRAIT, portraitFacts } from '../data/personalData';

interface PortraitCardProps {
  /** Phone layout: shorter photo so the card fits under the hero text. */
  compact?: boolean;
  className?: string;
}

/** The hero portrait: a framed photo with what Chernor is doing now underneath. */
const PortraitCard: React.FC<PortraitCardProps> = ({ compact = false, className = '' }) => (
  <figure
    className={`m-0 relative border border-line-2 rounded-[28px] bg-surface p-2.5 shadow-[0_50px_100px_-50px_var(--shadow)] ${className}`}
  >
    <div className={`relative overflow-hidden rounded-[20px] bg-surface-2 ${compact ? 'aspect-[4/4.4]' : 'aspect-[4/4.7]'}`}>
      <img
        src={PORTRAIT.src}
        srcSet={PORTRAIT.srcSet}
        sizes={compact ? '90vw' : '(min-width: 1100px) 440px, 60vw'}
        alt="Portrait of Chernor Sulaiman Jalloh"
        className="block w-full h-full object-cover object-[50%_18%]"
      />
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[38%]"
        style={{ background: 'linear-gradient(to top, rgba(8, 12, 22, 0.72), rgba(8, 12, 22, 0))' }}
      />
      <span className="absolute left-4 bottom-4 inline-flex items-center gap-2.5 py-1.5 pl-2.5 pr-3.5 rounded-full border border-[rgba(255,255,255,0.18)] bg-[rgba(8,12,22,0.55)] backdrop-blur-md text-white font-mono text-[11px] font-bold tracking-[0.12em] uppercase">
        <span className="w-2 h-2 rounded-full bg-[#22C55E] shadow-[0_0_0_4px_rgba(34,197,94,0.22)]" />
        {AVAILABILITY}
      </span>
    </div>
    <figcaption className="grid grid-cols-2 gap-px mt-2.5 bg-line rounded-[16px] overflow-hidden border border-line">
      {portraitFacts.map((fact) => (
        <div key={fact.label} className={`bg-bg ${compact ? 'px-4 py-3.5' : 'px-5 py-4'}`}>
          <div className="eyebrow !text-[10px]">{fact.label}</div>
          <div className={`mt-1 font-semibold leading-[1.35] ${compact ? 'text-[13px]' : 'text-[14px]'}`}>{fact.value}</div>
        </div>
      ))}
    </figcaption>
  </figure>
);

export default PortraitCard;
