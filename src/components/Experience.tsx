import React, { useCallback, useEffect, useRef, useState } from 'react';
import Kicker from './ui/Kicker';
import Icon from './ui/Icon';
import { RESUME_FILENAME, RESUME_URL, jobs } from '../data/personalData';

// Timeline geometry (px): the rail starts 39px below the list top and ends 24px above its bottom.
const RAIL_TOP = 39;
const RAIL_INSET = 63;

const Experience: React.FC = () => {
  const trackRef = useRef<HTMLOListElement>(null);
  const [progress, setProgress] = useState({ ratio: 0, active: 0 });
  const [expanded, setExpanded] = useState(0);

  // The glowing ball follows the middle of the viewport down the rail; every role it passes lights up.
  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const scroller = document.scrollingElement || document.documentElement;
    let ratio = 0;
    let active = 0;
    if (scroller.scrollHeight > vh + 20) {
      const rect = track.getBoundingClientRect();
      const span = Math.max(1, rect.height - RAIL_INSET);
      ratio = Math.min(1, Math.max(0, (vh * 0.5 - rect.top - RAIL_TOP) / span));
      const ballY = rect.top + RAIL_TOP + ratio * span;
      track.querySelectorAll('[data-xp-item]').forEach((el, i) => {
        if (el.getBoundingClientRect().top + 30 <= ballY) active = i;
      });
    }
    ratio = Math.round(ratio * 1000) / 1000;
    setProgress((prev) => (prev.ratio === ratio && prev.active === active ? prev : { ratio, active }));
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        measure();
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    measure();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [measure]);

  // Expanding a card changes the rail length, so re-measure after it renders.
  useEffect(() => {
    measure();
  }, [expanded, measure]);

  return (
    <section id="experience">
      <div className="pf-container section-pad flex flex-wrap gap-x-[72px] gap-y-12">
        <div className="flex-[1_1_300px] flex flex-col gap-[18px]">
          <Kicker>Career</Kicker>
          <h2 className="h2-section">Work experience</h2>
          <p className="m-0 text-[17px] text-muted">
            A journey through roles that shaped my engineering craft — from cybersecurity internships to leading AI
            education.
          </p>
          <a href={RESUME_URL} download={RESUME_FILENAME} className="link-accent mt-2 self-start">
            Download full resume
            <Icon name="arrow-up-right" size={16} strokeWidth={2} />
          </a>
        </div>

        <ol
          ref={trackRef}
          className="flex-[999_1_640px] min-w-0 relative m-0 pl-10 list-none flex flex-col gap-4"
        >
          <span aria-hidden="true" className="absolute left-2 top-[39px] bottom-6 w-0.5 rounded-sm bg-line">
            <span
              className="absolute left-0 top-0 w-0.5 rounded-sm bg-accent transition-[height] [transition-duration:120ms] ease-linear"
              style={{ height: `${progress.ratio * 100}%` }}
            />
          </span>

          {jobs.map((job, i) => {
            const isActive = i === progress.active;
            const reached = i <= progress.active;
            const isOpen = expanded === i;
            return (
              <li key={`${job.role}-${job.period}`} data-xp-item="true" className="relative">
                <span
                  aria-hidden="true"
                  className={`absolute -left-10 top-[30px] w-[18px] h-[18px] box-border rounded-full border-2 transition-colors [transition-duration:250ms] ${
                    reached ? 'bg-accent border-accent' : 'bg-bg border-line-2'
                  }`}
                />
                <article
                  className={`px-7 py-6 border rounded-2xl bg-surface transition-[border-color,box-shadow] duration-300 ${
                    isActive ? 'border-accent shadow-[0_30px_60px_-40px_rgba(59,130,246,0.6)]' : 'border-line'
                  }`}
                >
                  <div className="flex flex-wrap justify-between items-center gap-2.5">
                    <span className="font-mono text-[12px] font-bold tracking-[0.08em] uppercase text-muted">
                      {job.period}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-[3px] rounded-full border font-mono text-[11px] font-bold tracking-[0.08em] uppercase ${
                        job.current
                          ? 'bg-accent-soft border-transparent text-accent-text'
                          : 'bg-transparent border-line-2 text-muted'
                      }`}
                    >
                      {job.badge}
                    </span>
                  </div>
                  <h3 className="mt-3 mb-0.5 font-heading font-semibold text-[22px] leading-[1.25] tracking-[-0.015em]">
                    {job.role}
                  </h3>
                  <p className="m-0 text-[15px] font-semibold text-accent-text">{job.company}</p>
                  <p className="mt-2.5 mb-0 text-[15px] text-muted">{job.description}</p>
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="mt-2.5 inline-flex items-center gap-2 min-h-[44px] p-0 border-0 bg-transparent text-muted font-mono text-[11px] font-bold tracking-[0.12em] uppercase cursor-pointer"
                  >
                    {isOpen ? 'Hide achievements' : 'Key achievements'}
                    <Icon
                      name="chevron-down"
                      size={14}
                      strokeWidth={2}
                      className="transition-transform duration-200"
                      style={{ transform: `rotate(${isOpen ? 180 : 0}deg)` }}
                    />
                  </button>
                  {isOpen && (
                    <ul className="mt-1 mb-0 pt-4 border-t border-line list-none pl-0 flex flex-col gap-2.5 text-[15px]">
                      {job.achievements.map((text) => (
                        <li key={text} className="flex gap-3">
                          <span className="flex-none w-[5px] h-[5px] mt-2.5 rounded-full bg-accent" />
                          <span>{text}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              </li>
            );
          })}

          <span
            aria-hidden="true"
            className="absolute left-[9px] w-[18px] h-[18px] box-border -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent border-[3px] border-bg transition-[top] [transition-duration:120ms] ease-linear"
            style={{
              top: `calc(${RAIL_TOP}px + (100% - ${RAIL_INSET}px) * ${progress.ratio})`,
              boxShadow: '0 0 0 4px var(--accent-soft), 0 0 22px rgba(59, 130, 246, 0.75)',
            }}
          />
        </ol>
      </div>
    </section>
  );
};

export default Experience;
