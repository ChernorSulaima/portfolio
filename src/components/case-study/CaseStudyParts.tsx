import React from 'react';
import Kicker from '../ui/Kicker';
import Icon, { type IconName } from '../ui/Icon';
import Link from '../ui/Link';

/** Building blocks shared by the case-study pages. */

export const SECTION = 'pf-container pt-[clamp(72px,8vw,112px)]';

interface MetaItem {
  label: string;
  value: React.ReactNode;
}

interface CaseHeroProps {
  number: string;
  title: string;
  /** Short name for the breadcrumb, when it differs from the title. */
  crumb?: string;
  intro: string;
  meta: MetaItem[];
  /** Gloze's hero has the dotted backdrop and a narrower intro. */
  dotted?: boolean;
}

export const CaseHero: React.FC<CaseHeroProps> = ({ number, title, crumb, intro, meta, dotted = false }) => {
  const body = (
    <div className="pf-container relative pt-[clamp(56px,7vw,96px)] pb-14 flex flex-col gap-6">
      <nav aria-label="Breadcrumb" className="font-mono text-[12px] text-muted">
        <Link to="/#projects">Work</Link> <span aria-hidden="true">/</span>{' '}
        <span aria-current="page" className="text-fg">
          {crumb ?? title}
        </span>
      </nav>
      <Kicker>Case study · {number}</Kicker>
      <h1 className="m-0 font-heading font-bold text-[clamp(48px,6.4vw,88px)] leading-none tracking-[-0.035em]">
        {title}
      </h1>
      <p className={`m-0 text-[clamp(18px,1.6vw,21px)] text-muted ${dotted ? 'max-w-[720px]' : 'max-w-[760px]'}`}>
        {intro}
      </p>
      <dl className="mt-6 mb-0 grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-x-10 gap-y-6 pt-7 border-t border-line">
        {meta.map((item) => (
          <div key={item.label}>
            <dt className="eyebrow">{item.label}</dt>
            <dd className="mt-1.5 mb-0 ml-0 text-[15px] font-semibold">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );

  if (!dotted) return <section>{body}</section>;

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="dot-grid"
        style={{
          WebkitMaskImage: 'radial-gradient(ellipse 60% 70% at 30% 20%, #000 20%, transparent 75%)',
          maskImage: 'radial-gradient(ellipse 60% 70% at 30% 20%, #000 20%, transparent 75%)',
        }}
      />
      {body}
    </section>
  );
};

export const LiveLink: React.FC<{ href: string; label: string }> = ({ href, label }) => (
  <a href={href} className="inline-flex items-center gap-1.5 text-accent-text">
    {label}
    <Icon name="arrow-up-right" size={14} strokeWidth={2} />
  </a>
);

export const StatusValue: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="flex items-center gap-2">
    <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
    {children}
  </span>
);

interface ChallengeSolutionProps {
  challenge: { title: string; body: string };
  solution: { title: string; body: string };
}

export const ChallengeSolution: React.FC<ChallengeSolutionProps> = ({ challenge, solution }) => (
  <section
    className={`${SECTION} grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-x-20 gap-y-12`}
  >
    {[
      { label: 'The challenge', ...challenge },
      { label: 'The solution', ...solution },
    ].map((block) => (
      <div key={block.label} className="flex flex-col gap-4">
        <span className="eyebrow">{block.label}</span>
        <h2 className="h2-case">{block.title}</h2>
        <p className="m-0 text-[17px] text-muted">{block.body}</p>
      </div>
    ))}
  </section>
);

interface Feature {
  title: string;
  body: string;
  icon?: IconName;
  /** Small mono label shown instead of an icon (a number or a role). */
  tag?: string;
}

interface FeatureGridProps {
  kicker: string;
  features: Feature[];
  minWidth: number;
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({ kicker, features, minWidth }) => (
  <section className={`${SECTION} flex flex-col gap-7`}>
    <Kicker>{kicker}</Kicker>
    <div
      className="grid gap-px bg-line border border-line rounded-[20px] overflow-hidden"
      style={{ gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${minWidth}px), 1fr))` }}
    >
      {features.map((f) =>
        f.icon ? (
          <div key={f.title} className="p-[30px] bg-surface flex flex-col gap-3">
            <span className="icon-tile">
              <Icon name={f.icon} size={20} />
            </span>
            <h3 className="mt-2 mb-0 font-heading font-semibold text-[20px]">{f.title}</h3>
            <p className="m-0 text-[15px] text-muted">{f.body}</p>
          </div>
        ) : (
          <div key={f.title} className="p-[30px] bg-surface flex flex-col gap-2.5">
            <span className="font-mono text-[12px] text-accent-text">{f.tag}</span>
            <h3 className="m-0 font-heading font-semibold text-[20px]">{f.title}</h3>
            <p className="m-0 text-[15px] text-muted">{f.body}</p>
          </div>
        )
      )}
    </div>
  </section>
);

interface OutcomeProps {
  /** Placeholder stats until real numbers are available. */
  stats: { value: string; label: string }[];
  quote: string;
  initials: string;
  name: string;
  role: string;
}

export const Outcome: React.FC<OutcomeProps> = ({ stats, quote, initials, name, role }) => (
  <section className={`${SECTION} flex flex-col gap-7`}>
    <Kicker>Outcome</Kicker>
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-x-10 gap-y-6 py-7 border-y border-line">
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col gap-1.5">
          <span className="font-heading font-bold text-[44px] leading-none tracking-[-0.03em] text-muted">
            {s.value}
          </span>
          <span className="text-[14px] text-muted">{s.label}</span>
        </div>
      ))}
    </div>
    <figure className="m-0 p-[clamp(28px,4vw,48px)] border border-line rounded-[20px] bg-surface flex flex-col gap-7">
      <Icon name="quote" size={32} strokeWidth={1.6} stroke="var(--accent)" />
      <blockquote className="m-0 max-w-[900px] font-heading font-medium text-[clamp(22px,2.2vw,28px)] leading-[1.4] tracking-[-0.01em]">
        {quote}
      </blockquote>
      <figcaption className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="grid place-items-center w-11 h-11 rounded-full bg-accent-soft text-accent-text text-[13px] font-bold"
        >
          {initials}
        </span>
        <span className="flex flex-col leading-[1.35]">
          <span className="font-semibold">{name}</span>
          <span className="text-[14px] text-muted">{role}</span>
        </span>
      </figcaption>
    </figure>
  </section>
);

export const TechStack: React.FC<{ items: { label: string; value: string }[] }> = ({ items }) => (
  <section className={`${SECTION} flex flex-col gap-7`}>
    <Kicker>Tech stack</Kicker>
    <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-px bg-line border border-line rounded-[18px] overflow-hidden text-[15px]">
      {items.map((item) => (
        <div key={item.label} className="p-6 bg-surface">
          <dt className="eyebrow">{item.label}</dt>
          <dd className="mt-2 mb-0 ml-0">{item.value}</dd>
        </div>
      ))}
    </dl>
  </section>
);

interface NextProjectProps {
  to: string;
  number: string;
  title: string;
  cta: string;
  thumbBackground: string;
  thumb: React.ReactNode;
}

export const NextProject: React.FC<NextProjectProps> = ({ to, number, title, cta, thumbBackground, thumb }) => (
  <section className="pf-container py-[clamp(72px,8vw,112px)]">
    <Link
      to={to}
      className="flex flex-wrap items-center gap-x-12 gap-y-6 p-5 border border-line rounded-[20px] bg-surface"
    >
      <span
        className="flex-[1_1_300px] max-w-[400px] relative block aspect-[16/10] rounded-xl overflow-hidden border border-line"
        style={{ background: thumbBackground }}
      >
        {thumb}
      </span>
      <span className="flex-[999_1_300px] flex flex-col gap-2.5">
        <span className="eyebrow">Next project · {number}</span>
        <span className="font-heading font-bold text-[clamp(32px,3.6vw,44px)] leading-[1.05] tracking-[-0.03em]">
          {title}
        </span>
        <span className="inline-flex items-center gap-2 text-[15px] font-semibold text-accent-text">
          {cta}
          <Icon name="arrow-right" size={16} strokeWidth={2} />
        </span>
      </span>
    </Link>
  </section>
);

/** A website screenshot tilted into the corner of a next-project thumbnail. */
export const OffsetShot: React.FC<{ src: string }> = ({ src }) => (
  <img
    src={src}
    alt=""
    className="absolute left-[9%] top-[13%] w-[110%] max-w-none h-auto rounded-lg shadow-[0_20px_40px_-12px_rgba(0,0,0,0.6)]"
  />
);
