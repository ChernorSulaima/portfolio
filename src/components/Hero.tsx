import React from 'react';
import IdBadge from './IdBadge';
import Icon from './ui/Icon';
import { RESUME_FILENAME, RESUME_URL, heroFacts, socialLinks } from '../data/personalData';

const Hero: React.FC = () => (
  <section id="home" className="relative overflow-hidden">
    <div
      aria-hidden="true"
      className="dot-grid"
      style={{
        WebkitMaskImage: 'radial-gradient(ellipse 70% 65% at 60% 40%, #000 20%, transparent 75%)',
        maskImage: 'radial-gradient(ellipse 70% 65% at 60% 40%, #000 20%, transparent 75%)',
      }}
    />
    <div className="pf-container relative pt-[clamp(56px,7vw,104px)] pb-[72px]">
      <div className="flex flex-wrap items-center gap-x-20 gap-y-[72px]">
        <div className="flex-[999_1_520px] min-w-0 flex flex-col items-start gap-7">
          <span className="inline-flex items-center gap-2.5 py-1.5 pl-2.5 pr-3.5 border border-line-2 rounded-full bg-surface font-mono text-[11px] font-bold tracking-[0.14em] uppercase">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] shadow-[0_0_0_4px_rgba(34,197,94,0.18)]" />
            Available for work
          </span>
          <div className="flex flex-col gap-3.5">
            <h1 className="m-0 font-heading font-bold text-[clamp(48px,6.2vw,88px)] leading-none tracking-[-0.035em]">
              Chernor Sulaiman Jalloh
            </h1>
            <p className="m-0 font-heading font-medium text-[clamp(22px,2.1vw,28px)] leading-[1.3] tracking-[-0.01em] text-muted">
              Full-Stack Software Engineer
            </p>
          </div>
          <p className="m-0 max-w-[520px] text-[18px] text-muted">
            I build pixel-perfect, performant web applications with a focus on seamless user experiences and
            scalable architecture.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#projects" className="btn-solid">
              View selected work
              <Icon name="arrow-right" size={16} strokeWidth={2} />
            </a>
            <a href={RESUME_URL} download={RESUME_FILENAME} className="btn-outline">
              <Icon name="download" size={16} strokeWidth={2} />
              Resume
            </a>
          </div>
          <div className="flex gap-2.5">
            {socialLinks.map((link) => (
              <a key={link.href} href={link.href} aria-label={link.label} className="icon-btn">
                <Icon name={link.icon} />
              </a>
            ))}
          </div>
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

export default Hero;
