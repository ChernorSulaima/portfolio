import React from 'react';
import Kicker from './ui/Kicker';
import Icon from './ui/Icon';
import { testimonials } from '../data/personalData';

const Testimonials: React.FC = () => (
  <section id="testimonials" className="border-t border-line bg-surface">
    <div className="pf-container section-pad flex flex-col gap-12">
      <div className="flex flex-col gap-[18px] max-w-[620px]">
        <Kicker>Testimonials</Kicker>
        <h2 className="h2-section">What clients say</h2>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-5">
        {testimonials.map((t) => (
          <figure key={t.name} className="m-0 p-8 border border-line rounded-[18px] bg-bg flex flex-col gap-6">
            <Icon name="quote" size={28} strokeWidth={1.6} stroke="var(--accent)" />
            <blockquote className="m-0 flex-1 text-[16px] leading-[1.7]">{t.quote}</blockquote>
            <figcaption className="flex items-center gap-3 pt-5 border-t border-line">
              <span
                aria-hidden="true"
                className="grid place-items-center w-10 h-10 rounded-full bg-accent-soft text-accent-text text-[13px] font-bold"
              >
                {t.initials}
              </span>
              <span className="flex flex-col leading-[1.35]">
                <span className="text-[15px] font-semibold">{t.name}</span>
                <span className="text-[13px] text-muted">{t.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
