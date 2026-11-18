import React, { useEffect, useMemo, useState } from 'react';
import Link from '../components/ui/Link';
import Reveal from '../components/ui/Reveal';
import { PROFILE_PHOTO, RESUME_FILENAME, RESUME_URL, contactInfo } from '../data/personalData';
import {
  WHATSAPP_PHONE,
  buildQuoteMessage,
  calculateQuoteTotal,
  formatPrice,
  individualAddOns,
  nextAddOnSelection,
  pricingAddOns,
  projectTypes,
  timelineOptions,
} from '../data/pricingData';

const HOME_TITLE = 'Chernor Sulaiman Jalloh | Software Engineer';

interface ContributionDay {
  contributionCount: number;
  date: string;
  color: string;
}

interface GitHubSnapshot {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: { contributionDays: ContributionDay[] }[];
        };
      };
    };
  };
}

interface WorkEntry {
  slug: string;
  title: string;
  href: string;
  external?: boolean;
  caseStudyPath: string;
  badge?: string;
  archLabel: string;
  archNodes: string[];
  archNote: string;
  chipText: string;
  summaryPrefix: string;
  summarySuffix: string;
  bullets: React.ReactNode[];
}

const WORKS: WorkEntry[] = [
  {
    slug: 'airpay',
    title: 'Airpay',
    href: 'https://github.com/ChernorSulaima/AirPay',
    external: true,
    caseStudyPath: '/work/airpay',
    badge: 'In development · v0',
    archLabel: 'System Design · Offline Tolerant Ledger',
    archNodes: ['Expo Mobile App', 'NestJS API Gateway', 'Safe to Spend Engine', 'PostgreSQL Ledger'],
    archNote:
      'Idempotent transaction mutations reconcile mobile money, bank, and cash balances into a single daily safe to spend allowance with two party confirmation for shared debts.',
    summaryPrefix: 'A ',
    chipText: 'personal finance mobile app',
    summarySuffix:
      ' built for salaried workers in Sierra Leone whose money is split across mobile money, bank accounts, and cash.',
    bullets: [
      'Calculates a clear daily safe to spend amount after bills and savings targets',
      'Shared family goals, pace tracking, and a mutual debt book confirmed by both sides',
      <>
        Built with <span className="chip">Expo &amp; React Native</span>, <span className="chip">NestJS</span>, and
        PostgreSQL
      </>,
    ],
  },
  {
    slug: 'gloze-skincare',
    title: 'Gloze Skincare',
    href: 'https://shopgloze.vercel.app',
    external: true,
    caseStudyPath: '/work/gloze-skincare',
    archLabel: 'System Design · Storefront & Routine Recommendation Engine',
    archNodes: ['Skin Quiz State Machine', 'Routine Matcher', 'Persistent Cart & Loyalty Store'],
    archNote:
      'Zero latency client side filtering maps skin profile answers to ingredient compatible bundles and instant checkout.',
    summaryPrefix: 'A custom ',
    chipText: 'online storefront',
    summarySuffix: ' for a Korean skincare brand formulated specifically for melanin rich skin tones.',
    bullets: [
      'Interactive skin quiz that recommends personalized daily routines',
      'Ingredient breakdown explorer, loyalty rewards program, and fast cart experience',
      <>
        Engineered with <span className="chip">React</span>, <span className="chip">TypeScript</span>, and Tailwind CSS
      </>,
    ],
  },
  {
    slug: 'nakam-gaming',
    title: 'Nakam Gaming Arena',
    href: 'https://rollbet-arena.vercel.app',
    external: true,
    caseStudyPath: '/work/nakam-gaming',
    archLabel: 'System Design · Real Time Matchmaking & Wallet State',
    archNodes: ['React Arena Client', 'WebSocket Room Broker', 'Atomic Wallet Settlement'],
    archNote:
      'Event driven room state machine locks wagers before round resolution to prevent double spend race conditions.',
    summaryPrefix: 'A live ',
    chipText: 'multiplayer gaming platform',
    summarySuffix: ' featuring dice duels, coin flips, and community tournaments.',
    bullets: [
      <>
        Instant matchmaking lobbies powered by <span className="chip">WebSockets</span>
      </>,
      'Integrated wallet system, transparent game rounds, and live leaderboards',
      'Responsive interface designed for both mobile and desktop players',
    ],
  },
  {
    slug: 'sahid',
    title: 'Sahid',
    href: '/work/sahid',
    external: false,
    caseStudyPath: '/work/sahid',
    badge: 'In development',
    archLabel: 'System Design · Multi Role Classroom & Recitation Queue',
    archNodes: ['Student Mushaf App', 'Supabase Realtime & Auth', 'AI Recitation Review Queue'],
    archNote:
      'Role scoped access synchronizes daily Hifz assignments across students, Sheikhs, teaching assistants, and parents.',
    summaryPrefix: 'Memorise with your Sheikh, a ',
    chipText: 'Qur’an memorisation & classroom app',
    summarySuffix: ' connecting students, teachers, teaching assistants, and parents.',
    bullets: [
      <>
        Daily Hifz focus assigned by the Sheikh with an <span className="chip">AI recitation review queue</span>
      </>,
      'Interactive Mushaf that saves reading progress, streaks, and parent updates',
      <>
        Built with <span className="chip">Expo &amp; React Native</span> and <span className="chip">Supabase</span>
      </>,
    ],
  },
];

const FIELD_NOTES = [
  {
    title: 'Designing a Two Party Debt & Safe to Spend Ledger',
    tag: 'System Design',
    body: 'Modelling split balances across mobile money, bank accounts, and cash so every daily safe to spend calculation stays accurate even when transactions happen offline.',
  },
  {
    title: 'Cutting Client Operations Overhead by 60% with Event Driven Workflows',
    tag: 'Forward Deployed Eng',
    body: 'Embedding directly with business teams to map manual bottlenecks and replacing fragile spreadsheet handoffs with automated n8n webhook pipelines across CRMs and payment gateways.',
  },
  {
    title: 'Synchronizing Real Time Multiplayer Lobbies over WebSockets',
    tag: 'Distributed State',
    body: 'Structuring deterministic room state transitions for live dice duels and tournament brackets so concurrent players see instant updates without wallet race conditions.',
  },
];

const EXPERIENCE_ROWS = [
  {
    role: 'Facilitator of AI & Software Dev',
    company: 'Altruistech Luminary Center',
    period: '2026 to Present',
  },
  {
    role: 'Full Stack Software Engineer',
    company: 'Sendme SL',
    period: '2025 to 2026',
  },
  {
    role: 'Workflow Automation Engineer (n8n)',
    company: 'Freelance',
    period: '2025 to Present',
  },
  {
    role: 'Frontend Developer (Intern, Offer Extended)',
    company: 'KNS',
    period: '2024',
  },
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const LEVEL_BY_COLOR: Record<string, number> = {
  '#ebedf0': 0,
  '#9be9a8': 1,
  '#40c463': 2,
  '#30a14e': 3,
  '#216e39': 4,
};

const ArrowUpRight: React.FC<{ size?: number; className?: string }> = ({ size = 13, className = '' }) => (
  <svg
    className={`transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${className}`}
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 24 24"
    height={size}
    width={size}
    aria-hidden="true"
  >
    <path d="M18.25 15.5a.75.75 0 0 1-.75-.75V7.56L7.28 17.78a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L16.44 6.5H9.25a.75.75 0 0 1 0-1.5h9a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-.75.75Z" />
  </svg>
);

const Home: React.FC = () => {
  const [dark, setDark] = useState(() =>
    typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : true
  );
  const [openArch, setOpenArch] = useState<Record<string, boolean>>({ airpay: true });
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Pricing Calculator state inside the Hire Me Drawer
  const [selectedTypeId, setSelectedTypeId] = useState<string>('web-app');
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>(['auth']);
  const [selectedTimelineId, setSelectedTimelineId] = useState<string>('standard');

  // GitHub Contribution Calendar state
  const [snapshot, setSnapshot] = useState<GitHubSnapshot | null>(null);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

  useEffect(() => {
    document.title = HOME_TITLE;
  }, []);

  useEffect(() => {
    fetch('/github-data.json')
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('Failed to load GitHub data'))))
      .then((data: GitHubSnapshot) => {
        if (data?.data?.user) setSnapshot(data);
      })
      .catch(() => {
        // Fallback silently if offline
      });
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('portfolio-theme', next ? 'dark' : 'light');
    } catch {
      // Ignore storage errors
    }
  };

  const toggleArch = (slug: string) => {
    setOpenArch((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  const calendarStats = useMemo(() => {
    const cal = snapshot?.data.user.contributionsCollection.contributionCalendar;
    if (!cal) return null;
    const days = cal.weeks.flatMap((w) => w.contributionDays).filter((d) => d.date);
    const monthLabels: { col: number; label: string }[] = [];
    let lastCol = -10;
    cal.weeks.forEach((week, colIdx) => {
      const first = week.contributionDays[0]?.date;
      if (!first) return;
      const d = new Date(`${first}T12:00:00`);
      const prev = cal.weeks[colIdx - 1]?.contributionDays[0]?.date;
      const isNewMonth = colIdx === 0 || (prev && new Date(`${prev}T12:00:00`).getMonth() !== d.getMonth());
      if (isNewMonth && colIdx - lastCol >= 3) {
        monthLabels.push({ col: colIdx, label: MONTHS[d.getMonth()] });
        lastCol = colIdx;
      }
    });
    const fmt = (iso: string) =>
      new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    return {
      total: cal.totalContributions,
      weeks: cal.weeks,
      monthLabels,
      range: days.length ? `${fmt(days[0].date)} to ${fmt(days[days.length - 1].date)}` : 'Nov 2025 to Nov 2026',
    };
  }, [snapshot]);

  // Pricing Calculator derived values
  const selectedType = projectTypes.find((t) => t.id === selectedTypeId) ?? projectTypes[1];
  const selectedTimeline = timelineOptions.find((t) => t.id === selectedTimelineId) ?? timelineOptions[0];
  const bundleSelected = selectedAddOnIds.includes('full-bundle');
  const activeAddOns = pricingAddOns.filter((a) => selectedAddOnIds.includes(a.id));
  const { total } = calculateQuoteTotal(
    selectedType.basePrice,
    activeAddOns.map((a) => a.price),
    selectedTimeline.multiplier
  );
  const formattedTotal = formatPrice(total);
  const effectiveAddOnLabels = bundleSelected
    ? [`Full Feature Bundle (${individualAddOns.map((a) => a.label).join(', ')})`]
    : activeAddOns.map((a) => a.label);
  const quoteMessage = buildQuoteMessage({
    projectTypeLabel: selectedType.label,
    addOnLabels: effectiveAddOnLabels,
    timelineLabel: selectedTimeline.label,
    formattedTotal,
  });
  const whatsAppQuoteHref = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(quoteMessage)}`;

  const cellFill = (color?: string, count = 0) => {
    const lvl = (color && LEVEL_BY_COLOR[color.toLowerCase()]) ?? (count > 0 ? 2 : 0);
    if (dark) {
      return [
        '#16213A',
        'rgba(59, 130, 246, 0.32)',
        'rgba(59, 130, 246, 0.56)',
        'rgba(59, 130, 246, 0.80)',
        '#3B82F6',
      ][lvl];
    }
    return ['#EBEDF0', '#9BE9A8', '#40C463', '#30A14E', '#216E39'][lvl];
  };

  return (
    <div className="editorial-page min-h-screen">
      <main id="home" className="max-w-[40rem] mx-auto px-5 pt-10 pb-16">
        {/* Top Bar: Profile Photo + Theme Toggle + Prominent Hire Me Button */}
        <Reveal className="flex items-center justify-between">
          <div className="w-[88px] h-[88px] rounded-[18px] overflow-hidden border border-line-2 bg-surface shadow-sm">
            <img
              src={PROFILE_PHOTO}
              alt="Chernor Sulaiman Jalloh"
              className="w-full h-full object-cover block"
            />
          </div>

          <div className="flex items-center gap-2 font-sans">
            <button
              type="button"
              data-testid="theme-toggle"
              onClick={toggleTheme}
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="pill-btn"
            >
              <span>{dark ? 'Light mode' : 'Dark mode'}</span>
            </button>

            <button
              type="button"
              data-testid="hire-me-top"
              onClick={() => setDrawerOpen(true)}
              className="hire-btn group"
            >
              <span className="avail-dot" />
              <span>Hire me</span>
              <ArrowUpRight />
            </button>
          </div>
        </Reveal>

        {/* Intro / Bio Section */}
        <Reveal delay={70} className="pt-5">
          <section id="about" aria-label="Introduction">
            <div>
              <h1 className="serif-heading text-[2.15rem] leading-[1.15]">Chernor Sulaiman Jalloh</h1>
              <h6 className="font-serif text-[1rem] font-medium text-muted mt-0.5 mb-0">Software Engineer</h6>
            </div>

            <div className="mt-4 space-y-3">
              <p className="m-0">
                Hi there, I’m <span className="chip">Sulaiman</span> and I’m a{' '}
                <span className="strike-wrap">
                  frontend<span className="strike-note">fullstack</span>
                </span>{' '}
                engineer who loves building smooth and reliable web and mobile products. While my daily work centers on{' '}
                <span className="chip">React &amp; TypeScript</span>, I enjoy looking at the bigger picture of how an
                entire application comes together from the first sketch to real users.
              </p>

              <p className="m-0">
                Right now, I am studying <span className="chip">Forward Deployed Engineering</span> and working toward
                becoming a <span className="chip">System Design Architect</span>. There is something deeply satisfying
                about sitting close to a real business problem, figuring out what is slowing a team down, and building
                software or <span className="chip">n8n automations</span> that make everyone’s workflow effortless.
              </p>

              <p className="m-0">
                On the side, I also teach and mentor upcoming developers in{' '}
                <span className="chip">AI &amp; Software Development</span> at the Altruistech Luminary Center in
                Freetown, helping students turn their ideas into working products.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 mt-4 font-sans">
              <button
                type="button"
                data-testid="hire-me-hero"
                onClick={() => setDrawerOpen(true)}
                className="hire-btn group"
              >
                <span className="avail-dot" />
                <span>Hire me</span>
                <ArrowUpRight />
              </button>

              <a href={RESUME_URL} download={RESUME_FILENAME} className="pill-btn group">
                <span>Download CV</span>
                <ArrowUpRight />
              </a>
            </div>
          </section>
        </Reveal>

        {/* Some of my Works (#1 Inline Architecture & Case Study Toggles) */}
        <Reveal delay={130}>
          <section id="projects" className="pt-8">
            <h2 className="serif-heading text-[1.95rem] leading-[1.2] mb-3.5">Some of my Works</h2>

            <div className="space-y-6">
              {WORKS.map((work) => {
                const isArchOpen = Boolean(openArch[work.slug]);
                return (
                  <article key={work.slug} className="mb-5">
                    <div className="flex flex-wrap items-center gap-1.5 mb-1">
                      {work.external ? (
                        <a
                          href={work.href}
                          target="_blank"
                          rel="noreferrer"
                          className="group inline-flex items-center gap-1 text-[1.1rem] text-fg underline underline-offset-4 mr-1"
                        >
                          <span>{work.title}</span>
                          <ArrowUpRight size={15} />
                        </a>
                      ) : (
                        <Link
                          to={work.href}
                          className="group inline-flex items-center gap-1 text-[1.1rem] text-fg underline underline-offset-4 mr-1"
                        >
                          <span>{work.title}</span>
                          <ArrowUpRight size={15} />
                        </Link>
                      )}

                      <button
                        type="button"
                        data-testid={`arch-toggle-${work.slug}`}
                        onClick={() => toggleArch(work.slug)}
                        aria-expanded={isArchOpen}
                        className={`action-chip ${isArchOpen ? 'is-open' : ''}`}
                      >
                        Architecture ▾
                      </button>

                      <Link
                        to={work.caseStudyPath}
                        aria-label={`Read case study for ${work.title}`}
                        className="action-chip"
                      >
                        Case Study ↗
                      </Link>

                      {work.badge && (
                        <span className="font-mono text-[10.5px] text-muted border border-line-2 rounded-full px-2 py-0.5 inline-flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                          {work.badge}
                        </span>
                      )}
                    </div>

                    <div className={`collapsible ${isArchOpen ? 'is-open' : ''}`}>
                      <div>
                        <div className="my-2 p-3.5 border border-line-2 rounded-[10px] bg-surface font-sans text-[13px] leading-[1.6]">
                          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted block mb-2">
                            {work.archLabel}
                          </span>
                          <div className="flex flex-wrap items-center gap-1.5 mb-2">
                            {work.archNodes.map((node, idx) => (
                              <React.Fragment key={node}>
                                <span className="font-mono text-[11.5px] font-medium px-2.5 py-0.5 rounded-md bg-bg border border-line-2 text-fg">
                                  {node}
                                </span>
                                {idx < work.archNodes.length - 1 && (
                                  <span className="font-mono text-[12px] text-muted">→</span>
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                          <p className="m-0 text-[12.5px] text-muted">{work.archNote}</p>
                        </div>
                      </div>
                    </div>

                    <p className="my-1 text-[15px] leading-[1.85]">
                      {work.summaryPrefix}
                      <span className="chip">{work.chipText}</span>
                      {work.summarySuffix}
                    </p>

                    <ul className="list-none p-0 mt-1 ml-4 sm:ml-7 space-y-1">
                      {work.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-[14.75px] leading-[1.75]">
                          <span className="sq-bullet" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </section>
        </Reveal>

        {/* #2 Field Notes & System Design Mini-Section */}
        <Reveal delay={180}>
          <section id="field-notes" className="pt-8">
            <h2 className="serif-heading text-[1.95rem] leading-[1.2] mb-3.5">Field Notes &amp; System Design</h2>
            <div className="flex flex-col gap-2.5">
              {FIELD_NOTES.map((note) => (
                <div
                  key={note.title}
                  className="p-3.5 border border-line-2 rounded-[10px] bg-surface transition-colors hover:border-fg"
                >
                  <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1">
                    <span className="font-bold text-[14.75px] text-fg">{note.title}</span>
                    <span className="font-mono text-[10.5px] text-muted border border-line-2 bg-bg px-2 py-0.5 rounded-full">
                      {note.tag}
                    </span>
                  </div>
                  <p className="m-0 text-[14px] leading-[1.7] text-muted">{note.body}</p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Experience */}
        <Reveal delay={220}>
          <section id="experience" className="pt-8">
            <h2 className="serif-heading text-[1.95rem] leading-[1.2] mb-3.5">Experience</h2>
            <div className="flex flex-col gap-2">
              {EXPERIENCE_ROWS.map((row) => (
                <div
                  key={row.role}
                  data-xp-item
                  className="flex flex-wrap justify-between items-baseline gap-2 py-2 border-b border-dashed border-line-2 text-[14.75px]"
                >
                  <div>
                    <span className="font-bold text-fg">{row.role}</span>{' '}
                    <span className="text-muted">· {row.company}</span>
                  </div>
                  <span className="font-mono text-[12px] text-muted">{row.period}</span>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Connect / Socials (Placed JUST BEFORE GitHub Contributions) */}
        <Reveal delay={260}>
          <section id="contact" className="pt-8">
            <h2 className="serif-heading text-[1.95rem] leading-[1.2] mb-2">Connect</h2>
            <p className="m-0">
              You can contact me at{' '}
              <a href={`mailto:${contactInfo.email}`} className="group">
                <span className="chip cursor-pointer">
                  here
                  <ArrowUpRight size={12} className="ml-1" />
                </span>
              </a>{' '}
              or scope a project using{' '}
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="chip cursor-pointer font-serif group"
              >
                Hire me
                <ArrowUpRight size={12} className="ml-1" />
              </button>
            </p>

            <div className="flex flex-wrap gap-2.5 mt-5 font-sans">
              <div className="social-item">
                <span className="social-float" style={{ background: '#0D1117', rotate: '-10deg' }}>
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    height="18"
                    width="18"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </span>
                <a
                  className="social-pill"
                  href="https://github.com/ChernorSulaima"
                  target="_blank"
                  rel="noreferrer"
                >
                  Github
                </a>
              </div>

              <div className="social-item">
                <span className="social-float" style={{ background: '#0075B1', rotate: '5deg' }}>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 448 512"
                    height="18"
                    width="18"
                  >
                    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                  </svg>
                </span>
                <a
                  className="social-pill"
                  href="https://www.linkedin.com/in/chernor-sulaiman-jalloh-0a9854366"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </div>

              <div className="social-item">
                <span className="social-float" style={{ background: '#0D1117', rotate: '10deg' }}>
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    height="18"
                    width="18"
                  >
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                  </svg>
                </span>
                <a className="social-pill" href="https://x.com/ThisisChizo" target="_blank" rel="noreferrer">
                  𝕏
                </a>
              </div>

              <div className="social-item">
                <span className="social-float" style={{ background: '#E1306C', rotate: '-6deg' }}>
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    height="18"
                    width="18"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </span>
                <a
                  className="social-pill"
                  href="https://www.instagram.com/thisischizo"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
              </div>

              <div className="social-item">
                <span className="social-float" style={{ background: '#22C55E', rotate: '6deg' }}>
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    height="18"
                    width="18"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </span>
                <a
                  className="social-pill"
                  href={`https://wa.me/${WHATSAPP_PHONE}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </section>
        </Reveal>

        {/* Latest GitHub Contributions */}
        <Reveal delay={300} className="sig-wrap">
          <section id="github" className="pt-8">
            <h2 className="serif-heading text-[1.95rem] leading-[1.2] mb-3.5">GitHub Contributions</h2>

            <div className="w-full mt-3 border border-line-2 rounded-[10px] p-4 sm:p-5 bg-surface">
              {calendarStats ? (
                <>
                  <div className="max-w-full overflow-x-auto overflow-y-hidden pb-1">
                    <div
                      className="grid gap-[2.5px] font-mono text-[10px] text-muted h-[15px] mb-1 w-max"
                      style={{ gridTemplateColumns: `repeat(${calendarStats.weeks.length}, 10px)` }}
                    >
                      {calendarStats.monthLabels.map((m) => (
                        <span key={m.col} style={{ gridColumnStart: m.col + 1 }}>
                          {m.label}
                        </span>
                      ))}
                    </div>

                    <div
                      role="img"
                      aria-label={`${calendarStats.total} GitHub contributions`}
                      className="flex gap-[2.5px] w-max"
                    >
                      {calendarStats.weeks.map((week, colIdx) => (
                        <div key={colIdx} className="flex flex-col gap-[2.5px]">
                          {week.contributionDays.map((day) => (
                            <span
                              key={day.date}
                              onMouseEnter={() => setHoveredDay(day)}
                              onMouseLeave={() => setHoveredDay(null)}
                              style={{
                                backgroundColor: cellFill(day.color, day.contributionCount),
                                transitionDelay: `${colIdx * 8}ms`,
                              }}
                              className="aspect-square w-[10px] h-[10px] rounded-[2px] block transition-transform duration-300 hover:ring-1 hover:ring-fg"
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-between items-center gap-2 mt-2.5 text-[12px] text-muted font-mono">
                    <span>
                      {hoveredDay ? (
                        <>
                          <strong className="text-fg">{hoveredDay.contributionCount}</strong>{' '}
                          {hoveredDay.contributionCount === 1 ? 'contribution' : 'contributions'} on{' '}
                          {new Date(`${hoveredDay.date}T12:00:00`).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </>
                      ) : (
                        <>
                          <strong className="text-fg">{calendarStats.total}</strong> contributions in the last year (
                          {calendarStats.range})
                        </>
                      )}
                    </span>

                    <div className="flex items-center gap-1 font-sans text-[11.5px]">
                      <span>Less</span>
                      {[0, 1, 2, 3, 4].map((lvl) => (
                        <span
                          key={lvl}
                          className="w-[10px] h-[10px] rounded-[2px] inline-block"
                          style={{
                            backgroundColor: cellFill(
                              ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'][lvl],
                              lvl
                            ),
                          }}
                        />
                      ))}
                      <span>More</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="min-h-[140px] flex items-center justify-center font-mono text-[12px] text-muted">
                  Loading contribution activity...
                </div>
              )}
            </div>

            {/* Hand-drawn SVG Signature */}
            <svg
              width="115"
              height="48"
              className="mt-6"
              viewBox="0 0 115 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                className="sig-path"
                d="M28 9C21 3 10 5 7 13C4 21 14 25 22 28C30 31 29 41 18 42C10 43 5 38 8 33C12 27 25 28 35 23C43 19 47 11 46 8C45 14 43 26 46 31C49 35 55 27 59 22C62 18 62 28 66 30C71 32 76 23 80 19C82 17 83 26 87 28C92 30 98 22 106 18"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </section>
        </Reveal>
      </main>

      {/* #4 Minimalist "Hire Me / Scope a Project" Modal */}
      {drawerOpen && (
        <div
          id="pricing"
          data-testid="hire-drawer"
          onClick={(e) => {
            if (e.target === e.currentTarget) setDrawerOpen(false);
          }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 font-sans"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-heading"
            className="w-full max-w-[500px] bg-bg border border-line-2 rounded-2xl p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <h3 id="drawer-heading" className="serif-heading text-[1.85rem] leading-[1.1]">
                  Scope a Project
                </h3>
                <p className="text-[13px] text-muted mt-1 mb-0">
                  Configure a quick estimate or message me directly on WhatsApp.
                </p>
              </div>
              <button
                type="button"
                data-testid="close-hire-drawer"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close modal"
                className="w-8 h-8 rounded-full border border-line-2 bg-surface text-fg grid place-items-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-muted block mt-3.5 mb-1.5">
              1. Project Type
            </span>
            <div className="grid grid-cols-2 gap-2">
              {projectTypes.map((option) => {
                const active = option.id === selectedTypeId;
                return (
                  <button
                    key={option.id}
                    type="button"
                    data-testid={`project-type-${option.id}`}
                    aria-pressed={active}
                    onClick={() => setSelectedTypeId(option.id)}
                    className={`p-2.5 rounded-lg border text-left cursor-pointer flex items-center justify-between text-[13px] font-medium transition-all ${
                      active
                        ? 'border-fg bg-bg ring-1 ring-fg text-fg'
                        : 'border-line-2 bg-surface text-fg hover:border-fg/50'
                    }`}
                  >
                    <span>{option.label}</span>
                    <span className="font-mono text-[11.5px] text-muted">{formatPrice(option.basePrice)}</span>
                  </button>
                );
              })}
            </div>

            <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-muted block mt-3.5 mb-1.5">
              2. Add-ons
            </span>
            <div className="flex flex-wrap gap-1.5">
              {pricingAddOns.map((addon) => {
                const isSelected = selectedAddOnIds.includes(addon.id);
                const includedViaBundle = !addon.isBundle && bundleSelected;
                const active = isSelected || includedViaBundle;
                return (
                  <button
                    key={addon.id}
                    type="button"
                    data-testid={`addon-${addon.id}`}
                    aria-pressed={active}
                    disabled={includedViaBundle}
                    onClick={() => setSelectedAddOnIds((prev) => nextAddOnSelection(prev, addon.id))}
                    className={`px-3 py-1.5 rounded-full border text-[12px] cursor-pointer transition-all ${
                      active
                        ? 'bg-fg text-bg border-fg font-medium'
                        : 'bg-surface text-fg border-line-2 hover:border-fg/50'
                    } ${includedViaBundle ? 'opacity-75 cursor-not-allowed' : ''}`}
                  >
                    {addon.label}{' '}
                    <span className="opacity-80">
                      ({includedViaBundle ? 'Included' : `+${formatPrice(addon.price)}`})
                    </span>
                  </button>
                );
              })}
            </div>

            <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-muted block mt-3.5 mb-1.5">
              3. Delivery Pace
            </span>
            <div className="grid grid-cols-2 gap-2">
              {timelineOptions.map((option) => {
                const active = option.id === selectedTimelineId;
                return (
                  <button
                    key={option.id}
                    type="button"
                    data-testid={`timeline-${option.id}`}
                    aria-pressed={active}
                    onClick={() => setSelectedTimelineId(option.id)}
                    className={`p-2.5 rounded-lg border text-left cursor-pointer flex items-center justify-between text-[13px] font-medium transition-all ${
                      active
                        ? 'border-fg bg-bg ring-1 ring-fg text-fg'
                        : 'border-line-2 bg-surface text-fg hover:border-fg/50'
                    }`}
                  >
                    <span>{option.label}</span>
                    <span className="font-mono text-[11.5px] text-muted">{option.multiplier}x</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 pt-4 border-t border-line-2 flex items-center justify-between gap-3">
              <div>
                <span data-testid="summary-total" className="serif-heading text-[2rem] leading-none block">
                  {formattedTotal}
                </span>
                <span className="font-mono text-[10.5px] text-muted block mt-1">
                  Provisional non-binding estimate
                </span>
              </div>

              <a
                data-testid="send-whatsapp-quote"
                href={whatsAppQuoteHref}
                target="_blank"
                rel="noreferrer"
                className="hire-btn group !h-[38px] !px-4"
              >
                <span className="avail-dot" />
                <span>Send to WhatsApp</span>
                <ArrowUpRight />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
