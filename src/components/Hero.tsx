import React from 'react';
import IdBadge from './IdBadge';
import Icon from './ui/Icon';
import { RESUME_FILENAME, RESUME_URL, heroFacts, mobileHeroFacts, socialLinks } from '../data/personalData';
import { PHONE_QUERY, useMediaQuery } from '../hooks/useMediaQuery';

const AvailablePill: React.FC<{ className?: string }> = ({ className = '' }) => (
  <span
    className={`inline-flex items-center gap-2.5 py-1.5 pl-2.5 pr-3.5 border border-line-2 rounded-full bg-surface font-mono text-[11px] font-bold tracking-[0.14em] uppercase ${className}`}
  >
    <span className="w-2 h-2 rounded-full bg-[#22C55E] shadow-[0_0_0_4px_rgba(34,197,94,0.18)]" />
    Available for work
  </span>
);

const INTRO =
  'I build pixel-perfect, performant web applications with a focus on seamless user experiences and scalable architecture.';

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

/** Phone hero, from the "Home — mobile" artboard: text first, the badge underneath, then a 2×2 fact grid. */
const PhoneHero: React.FC = () => (
  <section id="home" className="relative overflow-hidden pt-14 pb-10">
    <div
      aria-hidden="true"
      className="dot-grid !bg-[length:28px_28px]"
      style={dotGridMask('radial-gradient(ellipse 80% 45% at 50% 22%, #000 20%, transparent 75%)')}
    />
    <div className="relative px-5 flex flex-col gap-[22px]">
      <AvailablePill className="self-start" />
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
      <IdBadge compact className="mt-[18px]" />
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
            <AvailablePill />
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

          <IdBadge className="flex-[1_1_380px] max-w-[520px] mx-auto" />
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
