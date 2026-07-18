import React, { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Calculator, Check, RotateCcw, ArrowRight } from 'lucide-react';
import type { QuoteSummary } from '../types';
import {
  BUNDLE_DISCOUNT_PERCENT,
  PRICING_CURRENCY,
  PRICING_DISCLAIMER,
  buildQuoteMessage,
  calculateQuoteTotal,
  formatPrice,
  nextAddOnSelection,
  pricingAddOns,
  projectTypes,
  timelineOptions,
} from '../data/pricingData';

interface PricingCalculatorProps {
  onRequestQuote: (summary: QuoteSummary, message: string) => void;
}

const PricingCalculator: React.FC<PricingCalculatorProps> = ({ onRequestQuote }) => {
  const prefersReducedMotion = useReducedMotion();
  const [projectTypeId, setProjectTypeId] = useState(projectTypes[0].id);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [timelineId, setTimelineId] = useState(timelineOptions[0].id);

  const projectType = projectTypes.find((p) => p.id === projectTypeId) ?? projectTypes[0];
  const timeline = timelineOptions.find((t) => t.id === timelineId) ?? timelineOptions[0];
  const activeAddOns = pricingAddOns.filter((a) => selectedAddOns.includes(a.id));

  const { subtotal, total } = useMemo(
    () =>
      calculateQuoteTotal(
        projectType.basePrice,
        activeAddOns.map((a) => a.price),
        timeline.multiplier
      ),
    [projectType.basePrice, activeAddOns, timeline.multiplier]
  );

  const formattedTotal = formatPrice(total);

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) => nextAddOnSelection(prev, id));
  };

  const handleReset = () => {
    setProjectTypeId(projectTypes[0].id);
    setSelectedAddOns([]);
    setTimelineId(timelineOptions[0].id);
  };

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

  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-80px' },
        transition: { duration: 0.6 },
      };

  return (
    <section id="pricing" className="py-16 sm:py-20 md:py-32 bg-background border-t border-border">
      <div className="container px-4 mx-auto max-w-6xl">
        <motion.div className="text-center mb-10 sm:mb-16 space-y-3 sm:space-y-4" {...motionProps}>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-mono uppercase tracking-wider text-muted-foreground">
            <Calculator className="h-3.5 w-3.5" />
            Interactive estimate
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground font-heading tracking-tight">
            PRICING CALCULATOR
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-sans leading-relaxed">
            Configure your project type, add-ons, and timeline to get a starting estimate — then request a detailed quote.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <motion.div className="lg:col-span-2 space-y-6 sm:space-y-8" {...motionProps}>
            {/* Project type */}
            <fieldset>
              <legend className="text-xs font-bold font-mono uppercase tracking-wider text-muted-foreground mb-3">
                Project type
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="radiogroup" aria-label="Project type">
                {projectTypes.map((option) => {
                  const selected = option.id === projectTypeId;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      data-testid={`project-type-${option.id}`}
                      onClick={() => setProjectTypeId(option.id)}
                      className={`text-left rounded-xl border p-4 sm:p-5 transition-all min-h-[44px] ${
                        selected
                          ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                          : 'border-border bg-card hover:border-primary/40'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-bold font-heading text-foreground">{option.label}</p>
                          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                            {option.description}
                          </p>
                        </div>
                        {selected && (
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            <Check className="h-3.5 w-3.5" aria-hidden />
                          </span>
                        )}
                      </div>
                      <p className="mt-3 text-sm font-mono font-bold text-foreground">
                        from {formatPrice(option.basePrice)}
                      </p>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* Add-ons */}
            <fieldset>
              <legend className="text-xs font-bold font-mono uppercase tracking-wider text-muted-foreground mb-3">
                Add-on features
              </legend>
              <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                Pick à la carte options (each ≤ $150) or save {BUNDLE_DISCOUNT_PERCENT}% with the Full Feature Bundle.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pricingAddOns.map((addon) => {
                  const selected = selectedAddOns.includes(addon.id);
                  const listPrice = addon.isBundle
                    ? Math.round(addon.price / (1 - BUNDLE_DISCOUNT_PERCENT / 100))
                    : null;
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      aria-pressed={selected}
                      data-testid={`addon-${addon.id}`}
                      onClick={() => toggleAddOn(addon.id)}
                      className={`text-left rounded-xl border p-4 sm:p-5 transition-all min-h-[44px] ${
                        addon.isBundle ? 'sm:col-span-2' : ''
                      } ${
                        selected
                          ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                          : 'border-border bg-card hover:border-primary/40'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-bold font-heading text-foreground">{addon.label}</p>
                            {addon.isBundle && (
                              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-primary">
                                {BUNDLE_DISCOUNT_PERCENT}% off
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                            {addon.description}
                          </p>
                        </div>
                        {selected && (
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            <Check className="h-3.5 w-3.5" aria-hidden />
                          </span>
                        )}
                      </div>
                      <p className="mt-3 text-sm font-mono font-bold text-foreground">
                        {listPrice !== null && (
                          <span className="mr-2 text-muted-foreground line-through font-medium">
                            {formatPrice(listPrice)}
                          </span>
                        )}
                        + {formatPrice(addon.price)}
                      </p>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* Timeline */}
            <fieldset>
              <legend className="text-xs font-bold font-mono uppercase tracking-wider text-muted-foreground mb-3">
                Timeline
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="radiogroup" aria-label="Timeline">
                {timelineOptions.map((option) => {
                  const selected = option.id === timelineId;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      data-testid={`timeline-${option.id}`}
                      onClick={() => setTimelineId(option.id)}
                      className={`text-left rounded-xl border p-4 sm:p-5 transition-all min-h-[44px] ${
                        selected
                          ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                          : 'border-border bg-card hover:border-primary/40'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-bold font-heading text-foreground">{option.label}</p>
                          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                            {option.description}
                          </p>
                        </div>
                        {selected && (
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            <Check className="h-3.5 w-3.5" aria-hidden />
                          </span>
                        )}
                      </div>
                      <p className="mt-3 text-sm font-mono font-bold text-foreground">
                        {option.multiplier === 1 ? 'Base rate' : `×${option.multiplier}`}
                      </p>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </motion.div>

          {/* Summary panel */}
          <motion.aside
            className="lg:sticky lg:top-24 h-fit rounded-xl border border-border bg-card p-5 sm:p-6 shadow-sm"
            {...motionProps}
          >
            <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-muted-foreground mb-4">
              Estimate summary
            </h3>

            <dl className="space-y-3 text-sm font-sans">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Base</dt>
                <dd className="font-mono font-bold text-foreground" data-testid="summary-base">
                  {formatPrice(projectType.basePrice)}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Add-ons</dt>
                <dd className="font-mono font-bold text-foreground" data-testid="summary-addons">
                  {formatPrice(activeAddOns.reduce((sum, a) => sum + a.price, 0))}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Timeline</dt>
                <dd className="font-mono font-bold text-foreground">{timeline.label}</dd>
              </div>
              <div className="border-t border-border pt-3 flex justify-between gap-4 items-baseline">
                <dt className="font-bold text-foreground">Estimated total</dt>
                <dd
                  className="text-2xl font-extrabold font-heading text-primary"
                  data-testid="summary-total"
                >
                  {formattedTotal}
                </dd>
              </div>
            </dl>

            <p className="mt-4 text-xs text-muted-foreground leading-relaxed">{PRICING_DISCLAIMER}</p>

            <div className="mt-6 flex flex-col gap-3">
              <button
                type="button"
                data-testid="request-quote"
                onClick={handleRequestQuote}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-foreground text-background py-3.5 px-4 font-bold uppercase tracking-wide text-sm min-h-[44px] hover:opacity-90 transition-opacity"
              >
                Get Detailed Quote
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
              <button
                type="button"
                data-testid="reset-quote"
                onClick={handleReset}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background py-3 px-4 font-bold uppercase tracking-wide text-xs text-muted-foreground min-h-[44px] hover:text-foreground hover:border-primary/40 transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden />
                Reset
              </button>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};

export default PricingCalculator;
