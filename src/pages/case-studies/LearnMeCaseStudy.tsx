import React from 'react';
import CaseStudyLayout from '../../components/case-study/CaseStudyLayout';
import {
  CaseHero,
  ChallengeSolution,
  FeatureGrid,
  LiveLink,
  NextProject,
  SECTION,
  TechStack,
} from '../../components/case-study/CaseStudyParts';
import BrowserBar from '../../components/ui/BrowserBar';
import Kicker from '../../components/ui/Kicker';
import PhoneFan from '../../components/ui/PhoneFan';
import { AIRPAY_BACKGROUND, AIRPAY_SCREENS, LEARNME_URL } from '../../data/personalData';
import { browserShot } from '../../lib/shots';

const HOST = 'learnme-nine.vercel.app';

// What happens between a request arriving and a page reading the database.
const REQUEST_STEPS = [
  {
    tag: '01 · Proxy',
    title: 'The address decides the academy',
    body: 'One function reads the host a request arrived on and maps it to an academy. An academy id from a form, a query string or a client header is never trusted.',
  },
  {
    tag: '02 · Layout',
    title: 'The academy brings its own look',
    body: 'The academy’s name, logo and accent colour are loaded once and scoped to its pages, so every school looks like itself.',
  },
  {
    tag: '03 · Database',
    title: 'Every query runs as the person',
    body: 'Pages read and write as the signed-in user, so PostgreSQL row-level security checks each row, whatever the page asked for.',
  },
];

const STATS = [
  { value: '618', label: 'Database tests proving who can read and change what' },
  { value: '15', label: 'Test suites, one per area of the product' },
  { value: '19', label: 'Migrations, each shipped with its tests' },
  { value: '4', label: 'Roles: owner, admin, instructor and learner' },
];

const SCREENS = [
  {
    shot: 'learnme-dashboard',
    path: '/manage',
    alt: 'LearnMe dashboard for Maya Design School: new learners, courses completed, learner reactions and a 78% satisfaction rate',
    lead: 'Dashboard.',
    caption: 'How learners reacted to this week’s lessons, and what they said.',
  },
  {
    shot: 'learnme-marking',
    path: '/manage/classes/assignments',
    alt: 'LearnMe assignments board with columns for work to mark, submitted work and work marked done',
    lead: 'Marking.',
    caption: 'A board of work to mark, with a reaction and a comment on each piece.',
  },
  {
    shot: 'learnme-sessions',
    path: '/manage/classes/sessions',
    alt: 'LearnMe live sessions list: one session live now and four coming up this week',
    lead: 'Live sessions.',
    caption: 'Schedule a session, share it, and keep the register of who came.',
  },
  {
    shot: 'learnme-learner',
    path: '/',
    alt: 'LearnMe learner home: a live critique session to join, the next lesson, and the week ahead',
    lead: 'The learner’s home.',
    caption: 'What is live now, the next lesson, and the week ahead.',
  },
];

const Shot: React.FC<{ shot: string; alt: string; url: string; sizes: string; lazy?: boolean; size?: 'sm' | 'lg' }> = ({
  shot,
  alt,
  url,
  sizes,
  lazy = true,
  size = 'sm',
}) => (
  <span className="block border border-line-2 rounded-[16px] overflow-hidden bg-surface">
    <BrowserBar url={url} size={size} />
    <img
      {...browserShot(shot)}
      sizes={sizes}
      alt={alt}
      loading={lazy ? 'lazy' : 'eager'}
      className="block w-full aspect-[16/10] object-cover object-top"
    />
  </span>
);

const LearnMeCaseStudy: React.FC = () => (
  <CaseStudyLayout title="LearnMe">
    <CaseHero
      dotted
      number="01"
      title="LearnMe"
      intro="A learning platform where academies, training businesses and coaches run their own branded school: courses, classes and live sessions under their own name and address."
      meta={[
        { label: 'Role', value: 'Product, design & engineering' },
        { label: 'Category', value: 'EdTech / Multi-tenant SaaS' },
        { label: 'Stack', value: 'Next.js 16, React 19, Supabase, PostgreSQL' },
        { label: 'Live site', value: <LiveLink href={LEARNME_URL} label={HOST} /> },
      ]}
    />

    <section className="pf-container">
      <figure className="m-0 rounded-[18px] shadow-[0_60px_120px_-60px_var(--shadow)]">
        <Shot
          shot="learnme-courses"
          url={`${HOST}/a/maya-design/manage/courses`}
          alt="LearnMe academy console: the course list of Maya Design School, grouped into two programmes"
          sizes="(min-width: 1360px) 1280px, 94vw"
          lazy={false}
          size="lg"
        />
      </figure>
    </section>

    <ChallengeSolution
      challenge={{
        title: 'Many schools, one app, no leaks.',
        body: 'Every academy on LearnMe shares one application and one database. That keeps the product affordable to run, but it means a single missed check could show one school another school’s learners, courses or marks.',
      }}
      solution={{
        title: 'Isolation enforced in the database, and proven.',
        body: 'The rule lives where it can’t be skipped: row-level security on every academy-owned table. Each new table ships with tests that sign in as another academy’s owner, admin and learner, and show they get nothing.',
      }}
    />

    <section className={`${SECTION} flex flex-col gap-7`}>
      <Kicker>How a request finds its academy</Kicker>
      <div className="p-[clamp(24px,3.4vw,44px)] border border-line-2 rounded-[22px] bg-surface flex flex-col gap-7">
        <p className="m-0 font-mono text-[clamp(13px,1.5vw,18px)] leading-[1.7] [overflow-wrap:anywhere]">
          <span className="text-accent-text">maya-design</span>.learnme.app/courses{' '}
          <span className="text-muted">→</span> /a/<span className="text-accent-text">maya-design</span>/courses
        </p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-x-10 gap-y-7 pt-7 border-t border-line">
          {REQUEST_STEPS.map((step) => (
            <div key={step.tag} className="flex flex-col gap-2">
              <span className="font-mono text-[12px] text-accent-text">{step.tag}</span>
              <h3 className="m-0 font-heading font-semibold text-[20px]">{step.title}</h3>
              <p className="m-0 text-[15px] text-muted">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
      <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-x-10 gap-y-6 py-7 border-y border-line">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1.5">
            <dt className="order-2 text-[14px] text-muted">{stat.label}</dt>
            <dd className="order-1 m-0 font-heading font-bold text-[44px] leading-none tracking-[-0.03em]">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>

    <section className={`${SECTION} flex flex-col gap-7`}>
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
        <Kicker>The product</Kicker>
        <span className="font-mono text-[12px] text-muted">Captured from the running app</span>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] gap-x-6 gap-y-9">
        {SCREENS.map((screen) => (
          <figure key={screen.shot} className="m-0 flex flex-col gap-3.5">
            <Shot
              shot={screen.shot}
              url={`${HOST}/a/maya-design${screen.path === '/' ? '' : screen.path}`}
              alt={screen.alt}
              sizes="(min-width: 1100px) 640px, 94vw"
            />
            <figcaption className="text-[14px] text-muted">
              <span className="font-semibold text-fg">{screen.lead}</span> {screen.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>

    <section className={SECTION}>
      <div className="flex flex-wrap items-center gap-x-14 gap-y-9 p-[clamp(24px,3.4vw,48px)] border border-line-2 rounded-[22px] bg-surface">
        <div className="flex-[1_1_320px] flex flex-col gap-4">
          <span className="eyebrow">White-label by design</span>
          <h2 className="h2-case">Each academy looks like itself.</h2>
          <p className="m-0 text-[16px] text-muted">
            Maya Design School is pink; Kora Code Camp is blue. The accent an academy picks flows through design
            tokens to every button, badge and chart, and the interface never hard-codes a colour.
          </p>
        </div>
        <div className="flex-[999_1_480px] min-w-0">
          <Shot
            shot="learnme-kora"
            url={`${HOST}/a/kora-code/manage`}
            alt="The same LearnMe dashboard for Kora Code Camp, with a blue accent"
            sizes="(min-width: 1100px) 700px, 94vw"
          />
        </div>
      </div>
    </section>

    <FeatureGrid
      kicker="What an academy gets"
      minWidth={320}
      features={[
        {
          tag: '01',
          title: 'Course builder',
          body: 'Programmes, courses and an outline you drag into order. Lessons are written in a rich editor and keep their history.',
        },
        {
          tag: '02',
          title: 'Classes',
          body: 'A course taken week by week from a first day, with a join link, facilitators and a progress view of who is behind.',
        },
        {
          tag: '03',
          title: 'Assignments and marking',
          body: 'Learners hand work in; facilitators mark it done or not done with a reaction and a comment, stepping between learners from the keyboard.',
        },
        {
          tag: '04',
          title: 'Live sessions',
          body: 'Sessions are scheduled against a class, shared on WhatsApp, and the register is kept afterwards.',
        },
        {
          tag: '05',
          title: 'File library',
          body: 'Each course has folders for files of any type, shared with learners folder by folder. Videos are stored in Cloudflare R2.',
        },
        {
          tag: '06',
          title: 'People and invitations',
          body: 'Owners invite admins, instructors and learners by link. Only a hash of each link is stored, and links expire.',
        },
      ]}
    />

    <TechStack
      items={[
        { label: 'Application', value: 'Next.js 16 with the App Router and Server Actions, React 19, TypeScript' },
        { label: 'Data', value: 'Supabase: PostgreSQL with row-level security, Auth and Storage' },
        { label: 'Interface', value: 'Tailwind CSS 4 driven by design tokens, Tiptap editor, dnd-kit' },
        { label: 'Tests and delivery', value: 'pgTAP database tests, Node’s test runner, GitHub Actions, Vercel' },
      ]}
    />

    <NextProject
      to="/work/airpay"
      number="02"
      title="Airpay"
      cta="Read case study"
      thumbBackground={AIRPAY_BACKGROUND}
      thumb={<PhoneFan screens={AIRPAY_SCREENS} preset="card" />}
    />
  </CaseStudyLayout>
);

export default LearnMeCaseStudy;
