import React from 'react';
import CaseStudyLayout from '../../components/case-study/CaseStudyLayout';
import {
  CaseHero,
  ChallengeSolution,
  FeatureGrid,
  LiveLink,
  NextProject,
  Outcome,
} from '../../components/case-study/CaseStudyParts';
import PhoneFan from '../../components/ui/PhoneFan';
import {
  NAKAM_BACKGROUND,
  SAHID_BACKGROUND,
  SAHID_PHONE_RADIUS,
  SAHID_SCREENS,
} from '../../data/personalData';

const NakamCaseStudy: React.FC = () => (
  <CaseStudyLayout title="Nakam Gaming">
    <CaseHero
      number="03"
      title="Nakam Gaming Platform"
      crumb="Nakam Gaming"
      intro="A real-time gaming platform where players compete in dice duels, coin flips and tournaments — with wallet integration and live game lobbies."
      meta={[
        { label: 'Role', value: 'Full Stack Developer' },
        { label: 'Category', value: 'Gaming / Fintech' },
        { label: 'Stack', value: 'React, TypeScript, Tailwind, WebSockets' },
        {
          label: 'Live site',
          value: <LiveLink href="https://rollbet-arena.vercel.app" label="rollbet-arena.vercel.app" />,
        },
      ]}
    />

    <section className="pf-container">
      <div
        className="relative aspect-video border border-line-2 rounded-[22px] overflow-hidden shadow-[0_60px_120px_-60px_var(--shadow)]"
        style={{ background: NAKAM_BACKGROUND }}
      >
        {/* The site is dark-only, so its window chrome stays dark in both themes. */}
        <span className="absolute left-[8%] right-[8%] top-[9%] block rounded-xl overflow-hidden border border-[rgba(255,255,255,0.1)] bg-[#0B1120] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.7)]">
          <span className="flex items-center gap-3 h-[38px] px-4 bg-[#0F172A] border-b border-[#1E293B]">
            <span className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#334155]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#334155]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#334155]" />
            </span>
            <span className="flex-1 flex justify-center">
              <span className="px-3.5 py-[2px] rounded-md bg-[#16213A] font-mono text-[12px] text-[#94A3B8]">
                rollbet-arena.vercel.app
              </span>
            </span>
            <span className="w-[46px]" />
          </span>
          <img
            src="/images/rollbet.png"
            alt="Nakam game lobby with open games, total pot value, players online and game modes"
            className="block w-full h-auto"
          />
        </span>
      </div>
    </section>

    <ChallengeSolution
      challenge={{
        title: 'Fair, transparent and real-time.',
        body: 'Players wanted a fair, transparent gaming experience with real-time multiplayer and secure transactions. Before, the team was duct-taping separate tools together.',
      }}
      solution={{
        title: 'One platform for play, money and competition.',
        body: 'A full-featured gaming platform with live lobbies, multiple game modes, leaderboards, a wallet system and tournament management — all running in real time over WebSockets.',
      }}
    />

    <FeatureGrid
      kicker="Key features"
      minWidth={260}
      features={[
        {
          icon: 'users',
          title: 'Real-time multiplayer',
          body: 'Live lobbies and open tables that update instantly for every player over WebSockets.',
        },
        {
          icon: 'wallet',
          title: 'Wallet system',
          body: 'Balances and pot values in leones, with secure transactions behind every game.',
        },
        {
          icon: 'trophy',
          title: 'Tournament mode',
          body: 'Brackets, leaderboards and tournament management for organised competition.',
        },
        {
          icon: 'dashboard',
          title: 'Live lobby dashboard',
          body: 'Open games, total pot value and players online at a glance, with Quick Play one tap away.',
        },
      ]}
    />

    <Outcome
      stats={[
        { value: '[X]', label: 'Games played' },
        { value: '[X]', label: 'Registered players' },
        { value: '[X]', label: 'Tournaments hosted' },
      ]}
      quote="The gaming platform he built handles real-time multiplayer, wallet systems and tournament brackets — all working smoothly. Before, we were duct-taping things together. Massive upgrade for us."
      initials="ST"
      name="Samuel T."
      role="Project Coordinator, Nakam Gaming"
    />

    <NextProject
      to="/work/sahid"
      number="04"
      title="Sahid"
      cta="Read case study"
      thumbBackground={SAHID_BACKGROUND}
      thumb={<PhoneFan screens={SAHID_SCREENS} radius={SAHID_PHONE_RADIUS} preset="card" />}
    />
  </CaseStudyLayout>
);

export default NakamCaseStudy;
