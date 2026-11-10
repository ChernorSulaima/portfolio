import React from 'react';
import Kicker from './ui/Kicker';
import { aboutFacts, skillGroups } from '../data/personalData';

const About: React.FC = () => (
  <section id="about" className="border-t border-line bg-surface">
    <div className="pf-container section-pad flex flex-wrap gap-x-20 gap-y-12">
      <div className="flex-[999_1_520px] min-w-0 flex flex-col gap-[22px]">
        <Kicker>About</Kicker>
        <h2 className="h2-section">I build products for the place I live in.</h2>
        <p className="m-0 text-[17px] text-muted">
          I’m a full-stack engineer in Freetown, Sierra Leone. The products I build start from problems I can see
          from here: a savings app for people whose money sits across mobile money, a bank and cash; a Qur’an
          memorisation app that links students to their Sheikh; and LearnMe, a learning platform where each academy
          runs under its own name and address.
        </p>
        <p className="m-0 text-[17px] text-muted">
          I work in TypeScript across the stack: React and Next.js on the web, React Native on mobile, PostgreSQL
          behind them. I care most about the parts users never see, like access rules that are proven by tests and
          records that survive a dropped connection.
        </p>
        <p className="m-0 text-[17px] text-muted">
          I also teach. At Altruistech Luminary Center I wrote a five-month AI and software development curriculum
          and review students’ code every week, which keeps my own explanations and architecture honest.
        </p>
        <dl className="mt-2 mb-0 grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-px bg-line border border-line rounded-[14px] overflow-hidden">
          {aboutFacts.map((fact) => (
            <div key={fact.label} className="px-5 py-[18px] bg-bg">
              <dt className="eyebrow">{fact.label}</dt>
              <dd className="mt-1 mb-0 ml-0 font-semibold">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="flex-[1_1_380px] flex flex-col gap-4">
        <div className="p-7 border border-line rounded-[18px] bg-bg flex flex-col gap-6">
          <div className="flex justify-between items-baseline">
            <h3 className="m-0 font-heading font-semibold text-[20px]">Skills</h3>
            <span className="eyebrow">By area</span>
          </div>
          {skillGroups.map((group, i) => (
            <div key={group.area} className={`flex flex-col gap-3 ${i > 0 ? 'pt-5 border-t border-line' : ''}`}>
              <span className="text-[14px] font-semibold">{group.area}</span>
              <ul className="m-0 p-0 list-none flex flex-wrap gap-1.5 font-mono text-[12px] font-medium">
                {group.items.map((item) => (
                  <li key={item} className="px-2.5 py-[5px] border border-line-2 rounded-lg">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="m-0 text-[14px] text-muted">
          Also: technical writing and curriculum design, AI tools and prompt engineering, agile delivery, and video
          editing for brands and community projects.
        </p>
      </div>
    </div>
  </section>
);

export default About;
