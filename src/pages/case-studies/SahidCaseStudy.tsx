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
import IPhone from '../../components/ui/IPhone';
import PhoneFan from '../../components/ui/PhoneFan';
import { LEARNME_BACKGROUND, SAHID_BACKGROUND, SAHID_SCREENS } from '../../data/personalData';
import { browserShot } from '../../lib/shots';

const SCREENS = [
  {
    screen: 'sahid-student-home',
    alt: 'Sahid student home: Today’s focus Surah 6 ayah 74 to 82, with Read Quran, My Lessons, Review and Test, and My Progress',
    lead: 'For students.',
    caption: 'Today’s assignment, progress and streak the moment the app opens.',
  },
  {
    screen: 'sahid-lessons',
    alt: 'Sahid lessons: 5 of 8 assignments complete, the lesson to continue, and the list of assignments',
    lead: 'Lessons.',
    caption: 'What the Sheikh assigned, what is done, and the one to continue.',
  },
  {
    screen: 'sahid-teacher-home',
    alt: 'Sahid teacher home: 3 students need attention, 7 recitations waiting for review, with My Students and AI Review',
    lead: 'For teachers.',
    caption: 'One signal instead of six numbers: who’s behind and what’s waiting.',
  },
  {
    screen: 'sahid-quran',
    alt: 'Sahid Quran tab: search by verse, page, surah or juz, open the Quran, and browse by page, surah or juz',
    lead: 'The Mushaf.',
    caption: 'Search or browse by page, surah or juz, and return to what you read last.',
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
        aria-label="Three Sahid screens on iPhones: the Quran tab, the student home and the teacher home"
        className="relative aspect-video border border-line-2 rounded-[22px] overflow-hidden shadow-[0_60px_120px_-60px_var(--shadow)]"
        style={{ background: SAHID_BACKGROUND }}
      >
        <span
          aria-hidden="true"
          className="absolute left-1/2 bottom-[5%] w-[56%] h-[7%] -translate-x-1/2 rounded-full"
          style={{ background: 'radial-gradient(closest-side, rgba(0, 0, 0, 0.5), transparent)' }}
        />
        <PhoneFan screens={SAHID_SCREENS} preset="hero" />
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
        <span className="font-mono text-[12px] text-muted">Captured from the running app</span>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,210px),1fr))] gap-x-6 gap-y-9">
        {SCREENS.map((screen) => (
          <figure key={screen.screen} className="m-0 flex flex-col items-center gap-4">
            <IPhone
              screen={screen.screen}
              alt={screen.alt}
              sizes="(min-width: 1100px) 290px, (min-width: 640px) 40vw, 80vw"
              className="w-full max-w-[290px]"
              style={{ borderRadius: '17% / 8%', boxShadow: '0 30px 60px -30px var(--shadow)' }}
            />
            <figcaption className="w-full max-w-[290px] text-[14px] text-muted">
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
          body: 'Home opens on the ayat the Sheikh set, like Surah 6, ayah 74–82, with progress and one tap into lessons.',
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
      to="/work/learnme"
      number="01"
      title="LearnMe"
      cta="Read case study"
      thumbBackground={LEARNME_BACKGROUND}
      thumb={<OffsetShot src={browserShot('learnme-courses').src} />}
    />
  </CaseStudyLayout>
);

export default SahidCaseStudy;
