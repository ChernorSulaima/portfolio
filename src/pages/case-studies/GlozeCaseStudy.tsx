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
import BrowserBar from '../../components/ui/BrowserBar';
import PhoneFan from '../../components/ui/PhoneFan';
import { AIRPAY_BACKGROUND, AIRPAY_PHONE_RADIUS, AIRPAY_SCREENS } from '../../data/personalData';

const GlozeCaseStudy: React.FC = () => (
  <CaseStudyLayout title="Gloze Skincare">
    <CaseHero
      dotted
      number="01"
      title="Gloze Skincare"
      intro="An e-commerce platform for a Korean skincare brand formulated specifically for melanin-rich skin tones — built to feel as considered as the product."
      meta={[
        { label: 'Role', value: 'Full Stack Developer' },
        { label: 'Category', value: 'E-Commerce / Beauty' },
        { label: 'Stack', value: 'React, TypeScript, Tailwind' },
        { label: 'Live site', value: <LiveLink href="https://shopgloze.vercel.app" label="shopgloze.vercel.app" /> },
      ]}
    />

    <section className="pf-container">
      <figure className="m-0 border border-line-2 rounded-[18px] overflow-hidden bg-surface shadow-[0_60px_120px_-60px_var(--shadow)]">
        <BrowserBar url="shopgloze.vercel.app" size="lg" />
        <img
          src="/images/shopgloze.png"
          alt="Gloze Skincare homepage with the skin quiz call to action"
          className="block w-full aspect-[16/10] object-cover object-top"
        />
      </figure>
    </section>

    <ChallengeSolution
      challenge={{
        title: 'Trust has to show up before the first purchase.',
        body: 'The brand needed a premium shopping experience that communicated trust and ingredient transparency to customers used to products that weren’t made for them.',
      }}
      solution={{
        title: 'A storefront with a luxury brand feel.',
        body: 'A polished e-commerce storefront with a skin quiz, product catalog and rewards program — mobile-first, fast and built in React and TypeScript.',
      }}
    />

    <FeatureGrid
      kicker="Key features"
      minWidth={300}
      features={[
        {
          icon: 'check-square',
          title: 'Skin quiz',
          body: 'A short quiz on the homepage that guides shoppers to a routine made for their skin.',
        },
        {
          icon: 'grid',
          title: 'Product catalog',
          body: 'Ingredient-forward product pages and category browsing designed around transparency.',
        },
        { icon: 'gift', title: 'Glow Rewards', body: 'Points on every purchase to keep customers coming back.' },
      ]}
    />

    <Outcome
      stats={[
        { value: '[X%]', label: 'Conversion change after launch' },
        { value: '[X]', label: 'Products in the catalog' },
        { value: '[X]', label: 'Skin quizzes completed' },
      ]}
      quote="We needed someone who could build a premium e-commerce experience that matched our brand. Chernor nailed it — the skin quiz, the product pages, everything feels luxury."
      initials="DO"
      name="David O."
      role="Creative Director, Gloze Skincare"
    />

    <NextProject
      to="/work/airpay"
      number="02"
      title="Airpay"
      cta="View project"
      thumbBackground={AIRPAY_BACKGROUND}
      thumb={<PhoneFan screens={AIRPAY_SCREENS} radius={AIRPAY_PHONE_RADIUS} preset="card" />}
    />
  </CaseStudyLayout>
);

export default GlozeCaseStudy;
