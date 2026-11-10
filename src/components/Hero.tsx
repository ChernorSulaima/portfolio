import React from 'react';
import PortraitCard from './PortraitCard';
import Icon from './ui/Icon';
import { RESUME_FILENAME, RESUME_URL, heroFacts, mobileHeroFacts, socialLinks } from '../data/personalData';
import { PHONE_QUERY, useMediaQuery } from '../hooks/useMediaQuery';

/** Small label above the name: where Chernor is and what he does. */
const RoleLine: React.FC<{ className?: string }> = ({ className = '' }) => (
  <span className={`inline-flex items-center gap-3 font-mono text-[12px] font-bold tracking-[0.2em] uppercase text-accent-text ${className}`}>
    <span className="w-10 h-px bg-accent" />
    Software engineer · Freetown
  </span>
);

const INTRO =
  'I design and ship web and mobile products end to end: multi-tenant SaaS, fintech and education apps, built in TypeScript from the database to the interface.';

const Socials: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex gap-2.5 ${className}`}>
    {socialLinks.map((link) => (
      <a key={link.href} href={link.href} aria-label={link.label} className="icon-btn">
        <Icon name={link.icon} />
      </a>
    ))}
  </div>
);

const ResumeLink: React.FC<{ className?: string }> = ({ className = '' }) => (
  <a href={RESUME_URL} download={RESUME_FILENAME} className={`btn-outline ${className}`}>
    <Icon name="download" size={16} strokeWidth={2} />
    Resume
  </a>
);

const dotGridMask = (mask: string): React.CSSProperties => ({ WebkitMaskImage: mask, maskImage: mask });

/** Phone hero: text first, the portrait underneath, then a 2×2 fact grid. */
const PhoneHero: React.FC = () => (
  <section id="home" className="relative overflow-hidden pt-14 pb-10">
    <div
      aria-hidden="true"
      className="dot-grid !bg-[length:28px_28px]"
      style={dotGridMask('radial-gradient(ellipse 80% 45% at 50% 22%, #000 20%, transparent 75%)')}
    />
    <div className="relative px-5 flex flex-col gap-[22px]">
      <RoleLine className="self-start !text-[11px]" />
      <div className="flex flex-col gap-2">
        <h1 className="m-0 font-heading font-bold text-[42px] leading-[1.02] tracking-[-0.035em]">
          Chernor Sulaiman Jalloh
        </h1>
        <p className="m-0 font-heading font-medium text-[20px] text-muted">Full-Stack Software Engineer</p>
      </div>
      <p className="m-0 text-[16px] text-muted">{INTRO}</p>
      <div className="flex flex-col gap-2.5">
        <a href="#projects" className="btn-solid justify-center">
          View selected work
          <Icon name="arrow-right" size={16} strokeWidth={2} />
        </a>
        <ResumeLink className="justify-center" />
      </div>
      <Socials className="justify-center" />
      <PortraitCard compact className="mt-2" />
    </div>
    <dl className="relative mx-5 mt-10 mb-0 grid grid-cols-2 gap-px bg-line border border-line rounded-[14px] overflow-hidden">
      {mobileHeroFacts.map((fact) => (
        <div key={fact.label} className="p-4 bg-surface">
          <dt className="eyebrow !text-[10px]">{fact.label}</dt>
          <dd className="mt-1 mb-0 ml-0 text-[14px] font-semibold leading-[1.4]">{fact.value}</dd>
        </div>
      ))}
    </dl>
  </section>
);

const Hero: React.FC = () => {
  const isPhone = useMediaQuery(PHONE_QUERY);
  if (isPhone) return <PhoneHero />;

  return (
    <section id="home" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="dot-grid"
        style={dotGridMask('radial-gradient(ellipse 70% 65% at 60% 40%, #000 20%, transparent 75%)')}
      />
      <div className="pf-container relative pt-[clamp(56px,7vw,104px)] pb-[72px]">
        <div className="flex flex-wrap items-center gap-x-20 gap-y-[72px]">
          <div className="flex-[999_1_520px] min-w-0 flex flex-col items-start gap-7">
            <RoleLine />
            <div className="flex flex-col gap-3.5">
              <h1 className="m-0 font-heading font-bold text-[clamp(48px,6.2vw,88px)] leading-none tracking-[-0.035em]">
                Chernor Sulaiman Jalloh
              </h1>
              <p className="m-0 font-heading font-medium text-[clamp(22px,2.1vw,28px)] leading-[1.3] tracking-[-0.01em] text-muted">
                Full-Stack Software Engineer
              </p>
            </div>
            <p className="m-0 max-w-[520px] text-[18px] text-muted">{INTRO}</p>
            <div className="flex flex-wrap gap-3">
              <a href="#projects" className="btn-solid">
                View selected work
                <Icon name="arrow-right" size={16} strokeWidth={2} />
              </a>
              <ResumeLink />
            </div>
            <Socials />
          </div>

          <PortraitCard className="flex-[1_1_360px] max-w-[460px] mx-auto" />
        </div>

        <dl className="mt-[88px] mb-0 grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-x-10 gap-y-6 pt-7 border-t border-line">
          {heroFacts.map((fact) => (
            <div key={fact.label}>
              <dt className="eyebrow">{fact.label}</dt>
              <dd className="mt-1.5 mb-0 ml-0 text-[15px] font-semibold">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default Hero;
