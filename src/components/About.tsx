import React from 'react';
import Kicker from './ui/Kicker';
import { aboutFacts, skillGroups } from '../data/personalData';

const About: React.FC = () => (
  <section id="about" className="border-t border-line bg-surface">
    <div className="pf-container section-pad flex flex-wrap gap-x-20 gap-y-12">
      <div className="flex-[999_1_520px] min-w-0 flex flex-col gap-[22px]">
        <Kicker>About</Kicker>
        <h2 className="h2-section">Engineer by craft, facilitator and creator by nature.</h2>
        <p className="m-0 text-[17px] text-muted">
          I’m a 24-year-old full-stack engineer based in Freetown, Sierra Leone. I specialise in React and
          TypeScript, and I care about the details — fast load times, clean architecture and interfaces that feel
          effortless.
        </p>
        <p className="m-0 text-[17px] text-muted">
          Alongside client work I build n8n automations, edit video for brands and community projects, and work
          part-time as a facilitator of AI and software development at Altruistech Luminary Center.
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
            <span className="eyebrow">By proficiency</span>
          </div>
          {skillGroups.map((group, i) => (
            <div key={group.level} className={`flex flex-col gap-3 ${i > 0 ? 'pt-5 border-t border-line' : ''}`}>
              <div className="flex justify-between items-center">
                <span className="text-[14px] font-semibold">{group.level}</span>
                <span role="img" aria-label={`${group.score} of 3`} className="flex gap-1">
                  {[0, 1, 2].map((bar) => (
                    <span
                      key={bar}
                      className={`w-[22px] h-1 rounded-sm ${bar < group.score ? 'bg-accent' : 'bg-line-2'}`}
                    />
                  ))}
                </span>
              </div>
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
          Also: Microsoft 365, Google Workspace administration, AI tools &amp; prompt engineering, technical
          documentation, agile project management.
        </p>
      </div>
    </div>
  </section>
);

export default About;
