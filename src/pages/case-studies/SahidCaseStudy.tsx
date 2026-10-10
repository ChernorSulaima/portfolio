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
import PhoneFan from '../../components/ui/PhoneFan';
import { GLOZE_BACKGROUND, SAHID_BACKGROUND, SAHID_PHONE_RADIUS, SAHID_SCREENS } from '../../data/personalData';

const SCREENS = [
  {
    src: '/images/sahid-student-home.webp',
    alt: 'Sahid student home: Today’s focus Al-An’ām ayah 74 to 82, set by Sheikh Yusuf, with Read Quran, My Lessons, Review and Test, and My Progress',
    lead: 'For students.',
    caption: 'Today’s assignment, progress and streak the moment the app opens.',
  },
  {
    src: '/images/sahid-teacher-home.webp',
    alt: 'Sahid teacher home: 3 students need attention, 7 recitations waiting for review, with My Students, AI Review, Weekly Plans and Schedule',
    lead: 'For teachers.',
    caption: 'One signal instead of six numbers — who’s behind and what’s waiting.',
  },
  {
    src: '/images/sahid-quran.webp',
    alt: 'Sahid Quran screen: continue reading Yunus page 211, a verse card, and browse by page, surah or juz',
    lead: 'The Mushaf.',
    caption: 'Your reading position is remembered — by page, surah or juz.',
  },
];

const SahidCaseStudy: React.FC = () => (
  <CaseStudyLayout title="Sahid">
    <CaseHero
      number="04"
      title="Sahid"
      intro="Memorise with your Sheikh. A Qur’an memorisation and classroom app built for students, teachers, teaching assistants and parents."
      meta={[
        { label: 'Role', value: 'Product & full-stack engineering' },
        { label: 'Category', value: 'EdTech / Mobile App' },
        { label: 'Stack', value: 'Expo, React Native, Supabase, TypeScript' },
        { label: 'Status', value: <StatusValue>In development</StatusValue> },
      ]}
    />

    <section className="pf-container">
      <div
        role="img"
        aria-label="Three Sahid screens shown on phones in 3D: the Quran reader, the student home and the teacher home"
        className="relative aspect-video border border-line-2 rounded-[22px] overflow-hidden shadow-[0_60px_120px_-60px_var(--shadow)]"
        style={{ background: SAHID_BACKGROUND }}
      >
        <span
          aria-hidden="true"
          className="absolute left-1/2 bottom-[5%] w-[56%] h-[7%] -translate-x-1/2 rounded-full"
          style={{ background: 'radial-gradient(closest-side, rgba(0, 0, 0, 0.5), transparent)' }}
        />
        <PhoneFan screens={SAHID_SCREENS} radius={SAHID_PHONE_RADIUS} preset="hero" />
      </div>
    </section>

    <ChallengeSolution
      challenge={{
        title: 'A Hifz class has many moving parts.',
        body: 'Running a Qur’an memorisation class means assigning ayat, reviewing recitations, tracking every student’s progress and keeping parents informed — work that usually lives across paper, chats and memory.',
      }}
      solution={{
        title: 'One app, one signal for everyone.',
        body: 'Students open the app to their next ayah. Teachers see at a glance which student needs them. Parents follow progress — all in the same warm, calm product.',
      }}
    />

    <section className={`${SECTION} flex flex-col gap-7`}>
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
        <Kicker>The app</Kicker>
        <span className="font-mono text-[12px] text-muted">Student · Teacher · Mushaf</span>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-5">
        {SCREENS.map((screen) => (
          <figure key={screen.src} className="m-0 flex flex-col gap-3.5">
            <img
              src={screen.src}
              alt={screen.alt}
              loading="lazy"
              className="block w-full h-auto rounded-[20px] border border-line"
            />
            <figcaption className="text-[14px] text-muted">
              <span className="font-semibold text-fg">{screen.lead}</span> {screen.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>

    <FeatureGrid
      kicker="Key features"
      minWidth={320}
      features={[
        {
          tag: '01',
          title: 'Today’s focus',
          body: 'Home opens on the ayat the Sheikh set — like Al-An’ām 74–82 — with progress and one tap into lessons.',
        },
        {
          tag: '02',
          title: 'AI review queue',
          body: 'Students submit recitations; teachers see how many are waiting and review them from one queue.',
        },
        {
          tag: '03',
          title: 'Classroom at a glance',
          body: 'Students, reviews and today’s sessions in one card — plus who needs attention right now.',
        },
        {
          tag: '04',
          title: 'A Mushaf that remembers',
          body: 'Resume exactly where you stopped and browse the Qur’an by page, surah or juz.',
        },
        {
          tag: '05',
          title: 'Review & Test',
          body: 'Memorised ayat come back for review and testing, so new lessons don’t push out old ones.',
        },
        {
          tag: '06',
          title: 'Progress and streaks',
          body: 'Points, a daily streak and a progress view keep students coming back every day.',
        },
      ]}
    />

    <FeatureGrid
      kicker="Built for every role"
      minWidth={250}
      features={[
        {
          tag: 'Sheikh',
          title: 'Runs the class',
          body: 'Manages students, sets weekly plans, reviews recitations and keeps the schedule.',
        },
        {
          tag: 'Teaching assistant',
          title: 'Learns and teaches',
          body: 'A student who also teaches — the student app plus their own assigned learners.',
        },
        {
          tag: 'Student',
          title: 'Memorises and submits',
          body: 'Reads the Qur’an, works through lessons, submits recitations and tracks progress.',
        },
        {
          tag: 'Parent',
          title: 'Follows along',
          body: 'Sees progress, schedule and assignments, and can message or call the teacher.',
        },
      ]}
    />

    <TechStack
      items={[
        { label: 'Mobile app', value: 'Expo, React Native, Expo Router, Reanimated, TanStack Query' },
        { label: 'Backend', value: 'Supabase with PostgreSQL' },
        { label: 'API', value: 'Express 5, Drizzle ORM, Zod, OpenAPI codegen' },
        { label: 'Calls', value: 'ZEGOCLOUD voice and video' },
      ]}
    />

    <NextProject
      to="/work/gloze-skincare"
      number="01"
      title="Gloze Skincare"
      cta="Read case study"
      thumbBackground={GLOZE_BACKGROUND}
      thumb={<OffsetShot src="/images/shopgloze.png" />}
    />
  </CaseStudyLayout>
);

export default SahidCaseStudy;
