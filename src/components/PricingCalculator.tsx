import React, { useState } from 'react';
import Kicker from './ui/Kicker';
import Icon from './ui/Icon';
import type { QuoteSummary } from '../types';
import {
  BUNDLE_DISCOUNT_PERCENT,
  PRICING_CURRENCY,
  PRICING_DISCLAIMER,
  buildQuoteMessage,
  calculateQuoteTotal,
  formatPrice,
  fullFeatureBundle,
  individualAddOns,
  projectTypes,
  timelineOptions,
} from '../data/pricingData';

interface PricingCalculatorProps {
  onRequestQuote: (summary: QuoteSummary, message: string) => void;
}

const STEP_LABEL = 'eyebrow';
const OPTION = 'border rounded-[14px] text-fg text-left cursor-pointer';
const optionState = (on: boolean) => (on ? 'border-accent bg-accent-soft' : 'border-line-2 bg-surface');

const Checkbox: React.FC<{ on: boolean }> = ({ on }) => (
  <span
    className={`flex-none grid place-items-center w-[22px] h-[22px] box-border rounded-md border-[1.5px] text-white ${
      on ? 'border-accent bg-accent' : 'border-line-2 bg-transparent'
    }`}
  >
    {on && <Icon name="check" size={14} strokeWidth={3} />}
  </span>
);

const PricingCalculator: React.FC<PricingCalculatorProps> = ({ onRequestQuote }) => {
  const [projectTypeId, setProjectTypeId] = useState('web-app');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(['auth']);
  const [bundle, setBundle] = useState(false);
  const [timelineId, setTimelineId] = useState(timelineOptions[0].id);

  const projectType = projectTypes.find((p) => p.id === projectTypeId) ?? projectTypes[0];
  const timeline = timelineOptions.find((t) => t.id === timelineId) ?? timelineOptions[0];
  const rush = timeline.multiplier !== 1;
  // The bundle includes every add-on at a discount, so it replaces any individual picks.
  const activeAddOns = bundle
    ? [fullFeatureBundle]
    : individualAddOns.filter((a) => selectedAddOns.includes(a.id));
  const addOnTotal = activeAddOns.reduce((sum, a) => sum + a.price, 0);
  const { subtotal, total } = calculateQuoteTotal(
    projectType.basePrice,
    activeAddOns.map((a) => a.price),
    timeline.multiplier
  );
  const formattedTotal = formatPrice(total);

  const toggleAddOn = (id: string) =>
    setSelectedAddOns((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]));

  const handleRequestQuote = () => {
    const summary: QuoteSummary = {
      projectTypeId: projectType.id,
      projectTypeLabel: projectType.label,
      addOnIds: activeAddOns.map((a) => a.id),
      addOnLabels: activeAddOns.map((a) => a.label),
      timelineId: timeline.id,
      timelineLabel: timeline.label,
      subtotal,
      total,
      currency: PRICING_CURRENCY,
      formattedTotal,
    };
    onRequestQuote(
      summary,
      buildQuoteMessage({
        projectTypeLabel: summary.projectTypeLabel,
        addOnLabels: summary.addOnLabels,
        timelineLabel: summary.timelineLabel,
        formattedTotal: summary.formattedTotal,
      })
    );
  };

  return (
    <section id="pricing" className="border-t border-line">
      <div className="pf-container section-pad flex flex-col gap-12">
        <div className="flex flex-col gap-[18px] max-w-[620px]">
          <Kicker>Pricing</Kicker>
          <h2 className="h2-section">Estimate your project</h2>
          <p className="m-0 text-[17px] text-muted">
            Choose a project type, add the features you need and see a provisional starting price.
          </p>
        </div>

        <div className="flex flex-wrap items-start gap-8">
          <div className="flex-[999_1_560px] min-w-0 flex flex-col gap-9">
            <div className="flex flex-col gap-3.5">
              <span className={STEP_LABEL}>01 — Project type</span>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-3">
                {projectTypes.map((type) => {
                  const on = type.id === projectType.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setProjectTypeId(type.id)}
                      aria-pressed={on}
                      data-testid={`project-type-${type.id}`}
                      className={`${OPTION} ${optionState(on)} flex flex-col items-start gap-1.5 px-5 py-[18px]`}
                    >
                      <span className="flex w-full justify-between items-baseline gap-3">
                        <span className="font-heading text-[18px] font-semibold">{type.label}</span>
                        <span className="font-mono text-[13px] font-bold text-accent-text">
                          {formatPrice(type.basePrice)}
                        </span>
                      </span>
                      <span className="text-[14px] leading-[1.5] text-muted">{type.description}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-3.5">
              <span className={STEP_LABEL}>02 — Add-ons</span>
              <button
                type="button"
                onClick={() => setBundle((on) => !on)}
                aria-pressed={bundle}
                data-testid={`addon-${fullFeatureBundle.id}`}
                className={`${OPTION} ${optionState(bundle)} flex items-center gap-4 px-5 py-[18px]`}
              >
                <Checkbox on={bundle} />
                <span className="flex-1 flex flex-col">
                  <span className="flex items-center gap-2.5 font-semibold">
                    {fullFeatureBundle.label}
                    <span className="px-2 py-0.5 rounded-full bg-accent-soft text-accent-text font-mono text-[11px] font-bold">
                      {BUNDLE_DISCOUNT_PERCENT}% OFF
                    </span>
                  </span>
                  <span className="text-[14px] text-muted">Auth, payments, admin dashboard and SEO together.</span>
                </span>
                <span className="font-mono text-[13px] font-bold">+{formatPrice(fullFeatureBundle.price)}</span>
              </button>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-3">
                {individualAddOns.map((addon) => {
                  const on = bundle || selectedAddOns.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddOn(addon.id)}
                      disabled={bundle}
                      aria-pressed={on}
                      data-testid={`addon-${addon.id}`}
                      className={`${OPTION} ${optionState(on)} flex items-center gap-3.5 px-[18px] py-4 disabled:cursor-default`}
                    >
                      <Checkbox on={on} />
                      <span className="flex-1 text-[15px] font-semibold">{addon.label}</span>
                      <span className="font-mono text-[12px] font-bold text-muted">
                        {bundle ? 'Included' : `+${formatPrice(addon.price)}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-3.5">
              <span className={STEP_LABEL}>03 — Timeline</span>
              <div
                role="group"
                aria-label="Timeline"
                className="inline-flex self-start gap-1 p-1 border border-line-2 rounded-xl bg-surface"
              >
                {timelineOptions.map((option) => {
                  const on = option.id === timeline.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setTimelineId(option.id)}
                      aria-pressed={on}
                      data-testid={`timeline-${option.id}`}
                      className={`min-h-[44px] px-5 border-0 rounded-[9px] text-[14px] font-semibold cursor-pointer ${
                        on ? 'bg-fg text-bg' : 'bg-transparent text-muted'
                      }`}
                    >
                      {option.multiplier === 1 ? option.label : `${option.label} · ×${option.multiplier}`}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <aside
            aria-label="Estimate summary"
            className="flex-[1_1_340px] sticky top-24 p-7 border border-line-2 rounded-[20px] bg-surface shadow-[0_40px_80px_-50px_var(--shadow)] flex flex-col gap-5"
          >
            <span className="eyebrow">Estimated starting price</span>
            <span
              data-testid="summary-total"
              aria-live="polite"
              className="font-heading text-[56px] font-bold leading-none tracking-[-0.03em]"
            >
              {formattedTotal}
            </span>
            <dl className="m-0 flex flex-col gap-2.5 pt-[18px] border-t border-line text-[14px]">
              <div className="flex justify-between gap-3">
                <dt className="text-muted">{projectType.label}</dt>
                <dd data-testid="summary-base" className="m-0 font-mono font-medium">
                  {formatPrice(projectType.basePrice)}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted">Add-ons</dt>
                <dd data-testid="summary-addons" className="m-0 font-mono font-medium">
                  {formatPrice(addOnTotal)}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted">Timeline</dt>
                <dd className="m-0 font-mono font-medium">
                  {rush ? `${timeline.label} ×${timeline.multiplier}` : `${timeline.label} ×1`}
                </dd>
              </div>
            </dl>
            <button
              type="button"
              onClick={handleRequestQuote}
              data-testid="request-quote"
              className="flex justify-center items-center gap-2 min-h-[52px] rounded-xl border-0 bg-accent text-white font-semibold text-[15px] cursor-pointer hover:opacity-80"
            >
              Request this quote
              <Icon name="arrow-right" size={16} strokeWidth={2} />
            </button>
            <p className="m-0 text-[12px] leading-[1.6] text-muted">{PRICING_DISCLAIMER}</p>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default PricingCalculator;
