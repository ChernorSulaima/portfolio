import React from 'react';
import Kicker from './ui/Kicker';
import Icon from './ui/Icon';
import Link from './ui/Link';
import ProjectVisual from './ProjectVisual';
import { projects } from '../data/personalData';

const Projects: React.FC = () => (
  <section id="projects" className="border-t border-line">
    <div className="pf-container section-pad">
      <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-5 mb-6">
        <div className="flex flex-col gap-[18px] max-w-[620px]">
          <Kicker>Portfolio</Kicker>
          <h2 className="h2-section">Selected works</h2>
          <p className="m-0 text-[17px] text-muted">
            Real-world applications built for real businesses — from procurement platforms to gaming arenas.
          </p>
        </div>
        <span className="font-mono text-[12px] font-bold tracking-[0.08em] uppercase text-muted">
          04 featured · 07+ under NDA
        </span>
      </div>

      {projects.map((project, i) => (
        <article
          key={project.number}
          className={`flex flex-wrap items-center gap-x-16 gap-y-10 py-14 border-t border-line ${
            i % 2 === 1 ? 'flex-row-reverse' : ''
          }`}
        >
          <ProjectVisual project={project} className="flex-[999_1_560px] min-w-0" />

          <div className="flex-[1_1_360px] flex flex-col gap-[18px]">
            <div className="flex items-center gap-3 font-mono text-[12px] font-bold tracking-[0.14em] uppercase">
              <span className="text-accent-text">{project.number}</span>
              <span className="w-6 h-px bg-line-2" />
              <span className="text-muted">{project.category}</span>
            </div>
            <h3 className="m-0 font-heading font-semibold text-[36px] leading-[1.1] tracking-[-0.025em]">
              {project.title}
            </h3>
            <p className="m-0 text-[16px] text-muted">{project.description}</p>
            <dl className="m-0 flex flex-col text-[15px]">
              <div className="py-3.5 border-t border-line">
                <dt className="eyebrow">Challenge</dt>
                <dd className="mt-1 mb-0 ml-0">{project.challenge}</dd>
              </div>
              <div className="py-3.5 border-y border-line">
                <dt className="eyebrow">Solution</dt>
                <dd className="mt-1 mb-0 ml-0">{project.solution}</dd>
              </div>
            </dl>
            <p className="m-0 font-mono text-[12px] text-muted">{project.stack}</p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <Link to={project.caseStudyPath} className="link-accent">
                Read case study
                <Icon name="arrow-right" size={16} strokeWidth={2} />
              </Link>
              {project.status && (
                <span className="status-pill">
                  <span className="w-[7px] h-[7px] rounded-full bg-[#22C55E]" />
                  {project.status}
                </span>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} className="inline-flex items-center gap-1.5 min-h-[44px] text-[15px] font-semibold">
                  Visit live site
                  <Icon name="arrow-up-right" size={16} strokeWidth={2} />
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} className="inline-flex items-center gap-1.5 min-h-[44px] text-[15px] font-semibold">
                  GitHub
                  <Icon name="arrow-up-right" size={16} strokeWidth={2} />
                </a>
              )}
            </div>
          </div>
        </article>
      ))}

      <div className="flex flex-wrap items-center gap-x-7 gap-y-5 px-8 py-7 border border-line rounded-2xl bg-surface">
        <span className="icon-tile !w-12 !h-12">
          <Icon name="lock" size={20} />
        </span>
        <div className="flex-[1_1_400px]">
          <h3 className="m-0 font-heading font-semibold text-[19px]">7+ more projects under NDA</h3>
          <p className="mt-0.5 mb-0 text-[15px] text-muted">
            SaaS platforms, internal dashboards and enterprise tools built for clients that can’t be shown publicly.
          </p>
        </div>
        <a
          href="#contact"
          className="inline-flex items-center min-h-[44px] px-[18px] rounded-xl border border-line-2 text-[14px] font-semibold"
        >
          Ask about them
        </a>
      </div>
    </div>
  </section>
);

export default Projects;
