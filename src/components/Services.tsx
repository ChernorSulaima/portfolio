import React from 'react';
import Kicker from './ui/Kicker';
import Icon from './ui/Icon';
import { services } from '../data/personalData';

const Services: React.FC = () => (
  <section id="services" className="border-t border-line">
    <div className="pf-container section-pad flex flex-col gap-12">
      <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-5">
        <div className="flex flex-col gap-[18px] max-w-[620px]">
          <Kicker>Services</Kicker>
          <h2 className="h2-section">How I can help</h2>
          <p className="m-0 text-[17px] text-muted">
            From the first line of code to the launch video — one partner for the whole build.
          </p>
        </div>
        <a href="#pricing" className="link-accent">
          Estimate your project
          <Icon name="arrow-right" size={16} strokeWidth={2} />
        </a>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-px bg-line border border-line rounded-[20px] overflow-hidden">
        {services.map((service) => (
          <div key={service.title} className="p-8 bg-bg flex flex-col gap-3.5">
            <span className="icon-tile">
              <Icon name={service.icon} size={20} />
            </span>
            <h3 className="mt-2 mb-0 font-heading font-semibold text-[21px] tracking-[-0.01em]">{service.title}</h3>
            <p className="m-0 text-[15px] text-muted">{service.description}</p>
            <ul className="mt-1.5 mb-0 pt-4 border-t border-line list-none pl-0 flex flex-col gap-2 font-mono text-[12px] font-medium">
              {service.items.map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <span className="w-[5px] h-[5px] rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="p-8 bg-surface flex flex-col gap-3.5">
          <span className="grid place-items-center w-11 h-11 rounded-xl bg-accent text-white">
            <Icon name="calculator" size={20} />
          </span>
          <h3 className="mt-2 mb-0 font-heading font-semibold text-[21px] tracking-[-0.01em]">
            Not sure where to start?
          </h3>
          <p className="m-0 text-[15px] text-muted">
            Use the pricing calculator to get a provisional starting price before we talk.
          </p>
          <a href="#pricing" className="btn-solid mt-auto self-start !min-h-[44px] !px-[18px] !text-[14px] !gap-2">
            Open calculator
            <Icon name="arrow-right" size={16} strokeWidth={2} />
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default Services;
