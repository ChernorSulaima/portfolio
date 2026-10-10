import React from 'react';
import CaseStudyLayout from '../../components/case-study/CaseStudyLayout';
import {
  CaseHero,
  ChallengeSolution,
  FeatureGrid,
  NextProject,
  OffsetShot,
  SECTION,
  StatusValue,
  TechStack,
} from '../../components/case-study/CaseStudyParts';
import Kicker from '../../components/ui/Kicker';
import Icon from '../../components/ui/Icon';
import { AIRPAY_BACKGROUND, AIRPAY_PHONE_RADIUS, NAKAM_BACKGROUND } from '../../data/personalData';

// Five screens fanned out from the centre: History, Rent goal, Home, Insights, Send money.
const HERO_PHONES = [
  { src: '/images/airpay-history.png', width: '15%', rotate: 28, scale: 0.85, z: 1, mr: '-4%' },
  { src: '/images/airpay-goal.png', width: '17%', rotate: 16, scale: 0.92, z: 2, mr: '-4%' },
  { src: '/images/airpay-home.png', width: '20%', rotate: 0, scale: 1, z: 3 },
  { src: '/images/airpay-insights.png', width: '17%', rotate: -16, scale: 0.92, z: 2, ml: '-4%' },
  { src: '/images/airpay-send.png', width: '15%', rotate: -28, scale: 0.85, z: 1, ml: '-4%' },
];

type Milestone = { id: string; title: string; status: 'done' | 'testing' | 'next' | 'planned' };

const MILESTONES: Milestone[] = [
  { id: 'M0', title: 'Setup — repo, brand theme, API, database, CI', status: 'done' },
  { id: 'M1', title: 'Accounts and onboarding', status: 'testing' },
  { id: 'M2', title: 'Personal goals', status: 'testing' },
  { id: 'M3', title: 'Managing finances — safe-to-spend, History, Insights', status: 'testing' },
  { id: 'M4', title: 'Save together', status: 'testing' },
  { id: 'M5', title: 'Debt book and trusted people', status: 'next' },
  { id: 'M6', title: 'Osusu — rotating group savings', status: 'planned' },
  { id: 'M7', title: 'Beta — 20–50 testers in Freetown', status: 'planned' },
];

const STATUS_STYLE: Record<Milestone['status'], string> = {
  done: 'bg-[rgba(34,197,94,0.14)] text-[#4ADE80]',
  testing: 'bg-accent-soft text-accent-text',
  next: 'border border-accent text-accent-text',
  planned: 'border border-line-2 text-muted',
};

const AirpayCaseStudy: React.FC = () => (
  <CaseStudyLayout title="Airpay">
    <CaseHero
      number="02"
      title="Airpay"
      intro="A savings and money-management app for Sierra Leone — built for salaried workers in Freetown whose money is spread across mobile money, a bank account and cash."
      meta={[
        { label: 'Role', value: 'Product, design & engineering' },
        { label: 'Category', value: 'Fintech / Mobile App' },
        { label: 'Stack', value: 'Expo, React Native, NestJS, PostgreSQL' },
        { label: 'Status', value: <StatusValue>In development · v0</StatusValue> },
      ]}
    />

    <section className="pf-container">
      <div
        role="img"
        aria-label="Five Airpay screens: History, a Rent savings goal, Home, Insights and Send money"
        className="relative aspect-video border border-line-2 rounded-[22px] overflow-hidden shadow-[0_60px_120px_-60px_var(--shadow)]"
        style={{ background: AIRPAY_BACKGROUND }}
      >
        <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '1600px' }}>
          {HERO_PHONES.map((phone) => (
            <span
              key={phone.src}
              className="relative flex-none block leading-[0]"
              style={{
                zIndex: phone.z,
                width: phone.width,
                marginLeft: phone.ml,
                marginRight: phone.mr,
                borderRadius: AIRPAY_PHONE_RADIUS,
                transform: phone.rotate ? `rotateY(${phone.rotate}deg) scale(${phone.scale})` : undefined,
                boxShadow:
                  phone.z === 3 ? '0 40px 70px -24px rgba(0, 0, 0, 0.7)' : '0 30px 50px -20px rgba(0, 0, 0, 0.6)',
              }}
            >
              <img src={phone.src} alt="" className="block w-full h-auto" />
            </span>
          ))}
        </div>
      </div>
    </section>

    <ChallengeSolution
      challenge={{
        title: 'How much can I safely spend today?',
        body: 'Salaried workers in Freetown keep their money in three places — mobile money, a bank account and cash. They want one answer each day: how much can I safely spend, and am I still on track to save? No app gave them that.',
      }}
      solution={{
        title: 'A record app first, ready for real money later.',
        body: 'Banking licences take time, so v0 keeps the record while people keep their own money. The data model is built so a wallet, sending and bills can switch on later without a rewrite — every amount stored as integer cents, never floats.',
      }}
    />

    <section className={SECTION}>
      <div className="p-[clamp(28px,4vw,48px)] border border-line-2 rounded-[22px] bg-surface flex flex-col gap-6">
        <span className="eyebrow">The daily number is maths, not a guess</span>
        <p className="m-0 font-mono text-[clamp(16px,1.8vw,22px)] leading-[1.6]">
          <span className="text-accent-text">safe_to_spend</span> = (money_left − upcoming_bills − planned_savings) ÷
          days_to_payday
        </p>
        <div className="flex flex-wrap gap-3">
          <span className="px-3.5 py-2 rounded-full bg-accent-soft text-accent-text text-[14px] font-semibold">
            “Le 415 a day until payday”
          </span>
          {['Perfect day: up to 90%', 'Good day: up to 110%', 'Over budget is amber, never red'].map((chip) => (
            <span key={chip} className="px-3.5 py-2 rounded-full border border-line-2 text-[14px]">
              {chip}
            </span>
          ))}
        </div>
      </div>
    </section>

    <FeatureGrid
      kicker="Key features"
      minWidth={320}
      features={[
        {
          tag: '01',
          title: 'Safe-to-spend per day',
          body: 'Payday setup turns into one number for today, with a Perfect or Good day rating and a jar of good days.',
        },
        {
          tag: '02',
          title: 'Goals with a pace line',
          body: 'A seven-step wizard works out the amount for you: “Save Le 280 a week to make it on time.”',
        },
        {
          tag: '03',
          title: 'Save together',
          body: 'Shared goals with family and friends, invited by WhatsApp or SMS link. Everyone sees the total with faces.',
        },
        {
          tag: '04',
          title: 'Debt book',
          body: 'Money lent and borrowed between people who trust each other — both sides confirm, and no interest is ever calculated.',
        },
        {
          tag: '05',
          title: 'Works offline',
          body: 'Records wait on the phone and sync in order once there’s a connection. A record sent twice is only saved once.',
        },
        {
          tag: '06',
          title: 'Secure by default',
          body: 'SMS sign-in, single-use refresh tokens, a PIN that never leaves the phone, and Face ID or fingerprint unlock.',
        },
      ]}
    />

    <section className={SECTION}>
      <div className="flex flex-wrap items-center gap-x-16 gap-y-10 p-[clamp(28px,4vw,56px)] border border-line-2 rounded-[22px] bg-surface">
        <div className="flex-[1_1_340px] flex flex-col gap-4">
          <span className="eyebrow">Brand book first</span>
          <h2 className="h2-case">Designed in light and dark, readable in Freetown sunlight.</h2>
          <p className="m-0 text-[16px] text-muted">
            Before any code, a full brand book: the name, the “Stacked Days” logo, mint for calm, deep ink for trust
            and lime as the reward. Every text colour pair was measured for contrast so it stays readable outdoors.
          </p>
        </div>
        <div className="flex-[1_1_380px] flex justify-center gap-6">
          <span
            className="block w-[min(42%,220px)] leading-[0] shadow-[0_30px_60px_-24px_rgba(0,0,0,0.6)]"
            style={{ borderRadius: AIRPAY_PHONE_RADIUS }}
          >
            <img src="/images/airpay-home.png" alt="Airpay Home screen in light mode" className="block w-full h-auto" />
          </span>
          <span
            className="block w-[min(42%,220px)] mt-10 leading-[0] shadow-[0_30px_60px_-24px_rgba(0,0,0,0.6)]"
            style={{ borderRadius: AIRPAY_PHONE_RADIUS }}
          >
            <img
              src="/images/airpay-home-dark.png"
              alt="Airpay Home screen in dark mode"
              className="block w-full h-auto"
            />
          </span>
        </div>
      </div>
    </section>

    <section className={`${SECTION} flex flex-wrap gap-x-[72px] gap-y-10`}>
      <div className="flex-[1_1_300px] flex flex-col gap-4">
        <Kicker>Build plan</Kicker>
        <h2 className="h2-case">Eight milestones, each tested on a real phone.</h2>
        <p className="m-0 text-[16px] text-muted">
          Built on Windows without a Mac: Expo and EAS Build compile the iOS app in the cloud, and Android comes from
          the same code.
        </p>
        <a
          href="https://github.com/ChernorSulaima/AirPay"
          className="self-start inline-flex items-center gap-2 min-h-[48px] px-5 mt-2 rounded-xl bg-fg text-bg text-[15px] font-semibold"
        >
          View on GitHub
          <Icon name="arrow-up-right" size={16} strokeWidth={2} />
        </a>
      </div>
      <ol className="flex-[999_1_560px] min-w-0 m-0 p-0 list-none border-t border-line">
        {MILESTONES.map((m) => (
          <li key={m.id} className="flex items-center gap-4 py-4 border-b border-line">
            <span className="flex-none w-9 font-mono text-[13px] text-muted">{m.id}</span>
            <span className={`flex-1 text-[15px] font-semibold ${m.status === 'planned' ? 'text-muted' : ''}`}>
              {m.title}
            </span>
            <span
              className={`px-2.5 py-[3px] rounded-full font-mono text-[11px] font-bold uppercase ${STATUS_STYLE[m.status]}`}
            >
              {m.status}
            </span>
          </li>
        ))}
      </ol>
    </section>

    <TechStack
      items={[
        { label: 'Mobile app', value: 'Expo SDK 57, React Native, expo-router, TanStack Query, Reanimated' },
        { label: 'API', value: 'NestJS 12, Drizzle ORM, PostgreSQL, Zod, OpenAPI' },
        { label: 'Tests', value: 'Jest for the app, Vitest with PGlite for the API' },
        { label: 'CI and builds', value: 'GitHub Actions, EAS Build and Submit' },
      ]}
    />

    <NextProject
      to="/work/nakam-gaming"
      number="03"
      title="Nakam Gaming"
      cta="Read case study"
      thumbBackground={NAKAM_BACKGROUND}
      thumb={<OffsetShot src="/images/rollbet.png" />}
    />
  </CaseStudyLayout>
);

export default AirpayCaseStudy;
