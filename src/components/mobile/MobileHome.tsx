import React, { useEffect, useState } from 'react';
import IdBadge from '../IdBadge';
import Clients from '../Clients';
import ProjectVisual from '../ProjectVisual';
import Kicker from '../ui/Kicker';
import Icon from '../ui/Icon';
import Link from '../ui/Link';
import ThemeToggle from '../ui/ThemeToggle';
import { WHATSAPP_PHONE } from '../../data/pricingData';
import {
  RESUME_FILENAME,
  RESUME_URL,
  contactInfo,
  jobs,
  mobileHeroFacts,
  projects,
  socialLinks,
} from '../../data/personalData';

/** The phone home page is a shorter edit of the desktop one (see the "Home — mobile" artboard). */

const MENU = [
  { label: 'Work', href: '#projects', n: '01' },
  { label: 'About', href: '#experience', n: '02' },
  { label: 'Contact', href: '#contact', n: '03' },
];

const VISIBLE_ROLES = 3;
const VISIBLE_PROJECTS = 2;

const MobileHeader: React.FC = () => {
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
      <header className="sticky top-0 z-[6] h-16 box-border px-5 flex items-center justify-between border-b border-line bg-bg">
        <a href="#home" className="font-heading font-extrabold text-[21px] tracking-[-0.02em]">
          Sulaiman<span className="text-accent">.</span>
        </a>
        <div className="flex gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            data-testid="mobile-menu-toggle"
            className="icon-btn text-fg"
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </header>
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Primary"
          className="fixed z-[5] top-16 inset-x-0 bottom-0 box-border px-5 py-6 bg-bg flex flex-col"
        >
          {MENU.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between min-h-[72px] border-b border-line font-heading font-semibold text-[30px] tracking-[-0.02em]"
            >
              {item.label}
              <span className="font-mono text-[11px] text-muted">{item.n}</span>
            </a>
          ))}
        </nav>
      )}
    </>
  );
};

const MobileHero: React.FC = () => (
  <section id="home" className="relative overflow-hidden pt-14 px-5 pb-10">
    <div
      aria-hidden="true"
      className="dot-grid !bg-[length:28px_28px]"
      style={{
        WebkitMaskImage: 'radial-gradient(ellipse 80% 45% at 50% 22%, #000 20%, transparent 75%)',
        maskImage: 'radial-gradient(ellipse 80% 45% at 50% 22%, #000 20%, transparent 75%)',
      }}
    />
    <div className="relative flex flex-col gap-[22px]">
      <span className="self-start inline-flex items-center gap-2.5 py-1.5 pl-2.5 pr-3.5 border border-line-2 rounded-full bg-surface font-mono text-[11px] font-bold tracking-[0.14em] uppercase">
        <span className="w-2 h-2 rounded-full bg-[#22C55E] shadow-[0_0_0_4px_rgba(34,197,94,0.18)]" />
        Available for work
      </span>
      <div className="flex flex-col gap-2">
        <h1 className="m-0 font-heading font-bold text-[42px] leading-[1.02] tracking-[-0.035em]">
          Chernor Sulaiman Jalloh
        </h1>
        <p className="m-0 font-heading font-medium text-[20px] text-muted">Full-Stack Software Engineer</p>
      </div>
      <p className="m-0 text-[16px] text-muted">
        I build pixel-perfect, performant web applications with a focus on seamless user experiences and scalable
        architecture.
      </p>
      <div className="flex flex-col gap-2.5">
        <a href="#projects" className="btn-solid justify-center">
          View selected work
          <Icon name="arrow-right" size={16} strokeWidth={2} />
        </a>
        <a href={RESUME_URL} download={RESUME_FILENAME} className="btn-outline justify-center">
          <Icon name="download" size={16} strokeWidth={2} />
          Resume
        </a>
      </div>
      <div className="flex justify-center gap-2.5">
        {socialLinks.map((link) => (
          <a key={link.href} href={link.href} aria-label={link.label} className="icon-btn">
            <Icon name={link.icon} />
          </a>
        ))}
      </div>
      <IdBadge compact className="mt-[18px]" />
    </div>
  </section>
);

const ViewAllButton: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex justify-between items-center min-h-[52px] px-[18px] border border-line-2 rounded-xl bg-transparent text-fg text-[15px] font-semibold cursor-pointer"
  >
    {children}
    <Icon name="arrow-right" size={16} strokeWidth={2} />
  </button>
);

const MobileExperience: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const shown = showAll ? jobs : jobs.slice(0, VISIBLE_ROLES);

  return (
    <section id="experience" className="pt-16 px-5 flex flex-col gap-6">
      <div className="flex flex-col gap-3.5">
        <Kicker compact>Career</Kicker>
        <h2 className="h2-mobile">Work experience</h2>
      </div>
      <ol className="relative m-0 pl-7 list-none flex flex-col gap-3">
        <span aria-hidden="true" className="absolute left-1.5 top-2.5 bottom-2.5 w-px bg-line-2" />
        {shown.map((job) => {
          const ongoing = job.period.includes('Present');
          return (
            <li key={`${job.role}-${job.period}`} className="relative">
              <span
                aria-hidden="true"
                className={`absolute -left-7 top-6 w-[13px] h-[13px] box-border rounded-full ${
                  job.current
                    ? 'bg-accent shadow-[0_0_0_4px_var(--accent-soft)]'
                    : `bg-bg border-2 ${ongoing ? 'border-accent' : 'border-line-2'}`
                }`}
              />
              <article
                className={`px-5 py-[18px] border rounded-[14px] bg-surface ${
                  job.current ? 'border-accent' : 'border-line'
                }`}
              >
                <div className="flex justify-between items-center gap-2">
                  <span className="font-mono text-[11px] font-bold uppercase text-muted">{job.period}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-bold tracking-[0.08em] uppercase whitespace-nowrap ${
                      job.current ? 'bg-accent-soft text-accent-text' : 'border border-line-2 text-muted'
                    }`}
                  >
                    {job.badge}
                  </span>
                </div>
                <h3 className="mt-2 mb-0 font-heading font-semibold text-[18px] leading-[1.3]">{job.role}</h3>
                <p className="mt-0.5 mb-0 text-[14px] font-semibold text-accent-text">{job.company}</p>
              </article>
            </li>
          );
        })}
      </ol>
      {!showAll && <ViewAllButton onClick={() => setShowAll(true)}>View all {jobs.length} roles</ViewAllButton>}
    </section>
  );
};

const MobileProjects: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const shown = showAll ? projects : projects.slice(0, VISIBLE_PROJECTS);

  return (
    <section id="projects" className="pt-16 px-5 flex flex-col gap-6">
      <div className="flex flex-col gap-3.5">
        <Kicker compact>Portfolio</Kicker>
        <h2 className="h2-mobile">Selected works</h2>
      </div>
      {shown.map((project, i) => (
        <article
          key={project.number}
          className={`flex flex-col gap-4 ${i > 0 ? 'pt-6 border-t border-line' : ''}`}
        >
          <ProjectVisual project={project} compact />
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2.5 font-mono text-[11px] font-bold tracking-[0.14em] uppercase">
              <span className="text-accent-text">{project.number}</span>
              <span className="w-5 h-px bg-line-2" />
              <span className="text-muted">{project.category}</span>
            </div>
            <h3 className="m-0 font-heading font-semibold text-[26px] leading-[1.15] tracking-[-0.02em]">
              {project.title}
            </h3>
            <p className="m-0 text-[15px] text-muted">{project.mobileDescription}</p>
            <p className="m-0 font-mono text-[11px] text-muted">{project.mobileStack}</p>
            <Link to={project.caseStudyPath} className="link-accent self-start">
              Read case study
              <Icon name="arrow-right" size={16} strokeWidth={2} />
            </Link>
          </div>
        </article>
      ))}
      {!showAll && <ViewAllButton onClick={() => setShowAll(true)}>View all projects</ViewAllButton>}
    </section>
  );
};

const MobileContact: React.FC = () => {
  const details = [
    { icon: 'mail' as const, label: 'Email', value: contactInfo.email, href: `mailto:${contactInfo.email}` },
    { icon: 'phone' as const, label: 'Phone / WhatsApp', value: contactInfo.phoneDisplay, href: contactInfo.phoneHref },
  ];

  return (
    <section id="contact" className="mt-16 py-14 px-5 border-t border-line bg-surface flex flex-col gap-5">
      <Kicker compact>Contact</Kicker>
      <h2 className="h2-mobile">Let’s build something great together.</h2>
      <p className="m-0 text-[15px] text-muted">
        Have a project in mind? Send a message and I’ll get back to you with next steps.
      </p>
      <ul className="m-0 p-0 list-none border-t border-line">
        {details.map((d) => (
          <li key={d.label} className="border-b border-line">
            <a href={d.href} className="flex items-center gap-3.5 py-4">
              <span className="icon-tile !w-10 !h-10 !rounded-[10px]">
                <Icon name={d.icon} size={16} />
              </span>
              <span className="flex flex-col min-w-0 leading-[1.4]">
                <span className="eyebrow !text-[10px]">{d.label}</span>
                <span className="text-[14px] font-semibold [overflow-wrap:anywhere]">{d.value}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
      <a
        href={`https://wa.me/${WHATSAPP_PHONE}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex justify-center items-center gap-2.5 min-h-[52px] rounded-xl bg-accent text-white font-semibold text-[15px]"
      >
        Message on WhatsApp
        <Icon name="send" size={16} strokeWidth={2} />
      </a>
    </section>
  );
};

const MobileHome: React.FC = () => (
  <>
    <MobileHeader />
    <main className="flex flex-col">
      <MobileHero />
      <dl className="mx-5 my-0 grid grid-cols-2 gap-px bg-line border border-line rounded-[14px] overflow-hidden">
        {mobileHeroFacts.map((fact) => (
          <div key={fact.label} className="p-4 bg-surface">
            <dt className="eyebrow !text-[10px]">{fact.label}</dt>
            <dd className="mt-1 mb-0 ml-0 text-[14px] font-semibold leading-[1.4]">{fact.value}</dd>
          </div>
        ))}
      </dl>
      <Clients compact />
      <MobileExperience />
      <MobileProjects />
      <MobileContact />
    </main>
    <footer className="mt-auto pt-8 pb-10 px-5 border-t border-line flex flex-col gap-3.5">
      <a href="#home" className="font-heading font-extrabold text-[20px] tracking-[-0.02em]">
        Sulaiman<span className="text-accent">.</span>
      </a>
      <span className="text-[13px] text-muted">© 2026 Chernor Sulaiman Jalloh. All rights reserved.</span>
    </footer>
  </>
);

export default MobileHome;
