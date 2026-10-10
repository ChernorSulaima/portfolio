import React from 'react';
import BrowserBar from './ui/BrowserBar';
import PhoneFan from './ui/PhoneFan';
import Icon from './ui/Icon';
import Link from './ui/Link';
import type { Project } from '../types';

const CHIP =
  'absolute z-[3] inline-flex items-center gap-2 rounded-full border text-[#EAF4EE]';

/** Brand mark + platform chips laid over the phone stacks. */
const BrandChips: React.FC<{ brand: 'airpay' | 'sahid'; compact?: boolean }> = ({ brand, compact = false }) => {
  const airpay = brand === 'airpay';
  const glass = airpay
    ? 'bg-[rgba(255,255,255,0.07)] border-[rgba(255,255,255,0.12)]'
    : 'bg-[rgba(255,255,255,0.08)] border-[rgba(255,255,255,0.14)] !text-[#EEF3FF]';

  return (
    <>
      <span
        className={`${CHIP} ${glass} font-heading font-bold ${
          compact
            ? 'top-3 left-3 !gap-1.5 py-1 pl-1 pr-2.5 text-[12px]'
            : 'top-4 left-4 py-[5px] pl-[5px] pr-3 text-[14px] tracking-[-0.01em]'
        }`}
      >
        <span
          className={`grid place-items-center ${
            compact ? 'w-5 h-5 rounded-md' : 'w-6 h-6 rounded-[7px]'
          } ${airpay ? 'bg-[#0F6B45]' : 'bg-[#6C4632]'}`}
        >
          {airpay ? (
            <svg width={compact ? 12 : 15} height={compact ? 12 : 15} viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="5" width="14" height="4" rx="2" fill="#F1F7F3" />
              <rect x="3" y="10.5" width="10" height="4" rx="2" fill="#F1F7F3" />
              <rect x="3" y="16" width="13" height="4" rx="2" fill="#F1F7F3" />
              <circle cx="18.5" cy="12.5" r="2.5" fill="#C9F25B" />
            </svg>
          ) : (
            <Icon name="book-open" size={14} strokeWidth={2} stroke="#F0D3A8" />
          )}
        </span>
        {airpay ? 'airpay' : 'Sahid'}
      </span>
      {!compact && (
        <span
          className={`${CHIP} ${glass} top-4 right-4 px-3 py-1.5 font-mono text-[11px] font-bold tracking-[0.08em] uppercase`}
        >
          <span className={`w-[7px] h-[7px] rounded-full ${airpay ? 'bg-[#C9F25B]' : 'bg-[#D9A066]'}`} />
          iOS + Android
        </span>
      )}
    </>
  );
};

interface ProjectVisualProps {
  project: Project;
  /** Phone layout: smaller chrome, square phone stage. */
  compact?: boolean;
  className?: string;
}

/** The screenshot block for a project: a browser window for websites, a 3D phone stack for apps. */
const ProjectVisual: React.FC<ProjectVisualProps> = ({ project, compact = false, className = '' }) => {
  const { visual } = project;
  const frame = compact
    ? 'block border border-line-2 rounded-[14px] overflow-hidden'
    : 'block border border-line-2 rounded-2xl overflow-hidden shadow-[0_40px_80px_-40px_var(--shadow)]';

  if (visual.kind === 'browser') {
    return (
      <Link
        to={project.caseStudyPath}
        aria-label={`Open the ${project.title} case study`}
        className={`${frame} bg-surface ${className}`}
      >
        <BrowserBar url={visual.url} size={compact ? 'sm' : 'md'} />
        <img src={visual.image} alt={visual.alt} className="block w-full aspect-[16/10] object-cover object-top" />
      </Link>
    );
  }

  return (
    <Link
      to={project.caseStudyPath}
      aria-label={`Open the ${project.title} case study: ${visual.label}`}
      className={`${frame} relative ${compact ? 'aspect-square' : 'aspect-[4/3]'} ${className}`}
      style={{ background: visual.background }}
    >
      {!compact && (
        <span
          aria-hidden="true"
          className="absolute left-1/2 bottom-[6%] w-[64%] h-[7%] -translate-x-1/2 rounded-full"
          style={{ background: 'radial-gradient(closest-side, rgba(0, 0, 0, 0.5), transparent)' }}
        />
      )}
      <PhoneFan
        screens={visual.screens}
        radius={visual.radius}
        preset={compact ? 'mobile' : 'home'}
        className={compact ? 'pt-4' : ''}
      />
      <BrandChips brand={visual.brand} compact={compact} />
    </Link>
  );
};

export default ProjectVisual;
