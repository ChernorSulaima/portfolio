import React from 'react';
import { clients } from '../data/personalData';

interface ClientsProps {
  compact?: boolean;
}

const Clients: React.FC<ClientsProps> = ({ compact = false }) =>
  compact ? (
    <section
      aria-label="Teams I have worked with"
      className="mt-10 px-5 py-6 border-y border-line bg-surface flex flex-col gap-3.5"
    >
      <span className="eyebrow !text-[10px]">Trusted by teams at</span>
      <ul className="m-0 p-0 list-none flex flex-wrap gap-x-[22px] gap-y-2 font-heading font-semibold text-[16px] text-muted">
        {clients.map((client) => (
          <li key={client.name}>{client.shortName ?? client.name}</li>
        ))}
      </ul>
    </section>
  ) : (
    <section aria-label="Teams I have worked with" className="border-y border-line bg-surface">
      <div className="pf-container py-7 flex flex-wrap items-center gap-x-12 gap-y-4">
        <span className="eyebrow">Trusted by teams at</span>
        <ul className="flex-1 m-0 p-0 list-none flex flex-wrap justify-between gap-x-9 gap-y-3 font-heading font-semibold text-[19px] tracking-[-0.01em] text-muted">
          {clients.map((client) => (
            <li key={client.name}>{client.name}</li>
          ))}
        </ul>
      </div>
    </section>
  );

export default Clients;
