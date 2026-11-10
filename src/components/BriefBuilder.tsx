import React, { useState } from 'react';
import Kicker from './ui/Kicker';
import Icon from './ui/Icon';
import { briefFeatures, briefProjectTypes, briefStages, briefTimelines } from '../data/personalData';
import { buildBriefMessage } from '../lib/brief';
import type { BriefOption } from '../types';

interface BriefBuilderProps {
  /** Called with the finished brief, ready to edit in the contact form. */
  onUseBrief: (message: string) => void;
}

const OPTION = 'border rounded-[14px] text-fg text-left cursor-pointer transition-colors';
const optionState = (on: boolean) => (on ? 'border-accent bg-accent-soft' : 'border-line-2 bg-surface hover:border-muted');
const labelOf = (options: BriefOption[], id: string) => options.find((o) => o.id === id)?.label ?? '';

const Step: React.FC<{ number: string; title: string; hint?: string; children: React.ReactNode }> = ({
  number,
  title,
  hint,
  children,
}) => (
  <fieldset className="m-0 p-0 border-0 min-w-0 flex flex-col gap-3.5">
    <legend className="p-0 mb-3.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <span className="font-mono text-[12px] font-bold text-accent-text">{number}</span>
      <span className="font-heading font-semibold text-[19px]">{title}</span>
      {hint && <span className="text-[13px] text-muted">{hint}</span>}
    </legend>
    {children}
  </fieldset>
);

/** Single-choice row of pills. */
const Choice: React.FC<{
  name: string;
  options: BriefOption[];
  value: string;
  onChange: (id: string) => void;
}> = ({ name, options, value, onChange }) => (
  <div className="flex flex-wrap gap-2.5">
    {options.map((option) => (
      <button
        key={option.id}
        type="button"
        aria-pressed={value === option.id}
        data-testid={`${name}-${option.id}`}
        onClick={() => onChange(option.id)}
        title={option.description}
        className={`${OPTION} ${optionState(value === option.id)} min-h-[44px] px-4 text-[14px] font-semibold`}
      >
        {option.label}
      </button>
    ))}
  </div>
);

/**
 * Project brief builder: a visitor picks what they want to build and gets a filled-in message
 * to send on WhatsApp. No prices: the brief starts the conversation, the quote comes after it.
 */
const BriefBuilder: React.FC<BriefBuilderProps> = ({ onUseBrief }) => {
  const [typeId, setTypeId] = useState('web-app');
  const [featureIds, setFeatureIds] = useState<string[]>([]);
  const [timelineId, setTimelineId] = useState('1-3');
  const [stageId, setStageId] = useState('idea');

  const toggleFeature = (id: string) =>
    setFeatureIds((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));

  const selection = {
    projectType: labelOf(briefProjectTypes, typeId),
    features: briefFeatures.filter((f) => featureIds.includes(f.id)).map((f) => f.label),
    timeline: labelOf(briefTimelines, timelineId),
    stage: labelOf(briefStages, stageId),
  };
  const message = buildBriefMessage(selection);

  const summary = [
    { label: 'Project', value: selection.projectType },
    { label: 'Needs', value: selection.features.length ? selection.features.join(', ') : 'To be discussed' },
    { label: 'Timeline', value: selection.timeline },
    { label: 'Where it is now', value: selection.stage },
  ];

  return (
    <section id="brief" className="border-t border-line">
      <div className="pf-container section-pad flex flex-col gap-12">
        <div className="flex flex-col gap-[18px] max-w-[660px]">
          <Kicker>Start a project</Kicker>
          <h2 className="h2-section">Tell me what you want to build.</h2>
          <p className="m-0 text-[17px] text-muted">
            Pick what fits and I’ll get a clear brief instead of a blank message. It takes a minute, and you can edit
            every word before it’s sent.
          </p>
        </div>

        <div className="flex flex-wrap items-start gap-x-12 gap-y-10">
          <div className="flex-[999_1_560px] min-w-0 flex flex-col gap-10">
            <Step number="01" title="What is it?">
              <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))] gap-3">
                {briefProjectTypes.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={typeId === option.id}
                    data-testid={`brief-type-${option.id}`}
                    onClick={() => setTypeId(option.id)}
                    className={`${OPTION} ${optionState(typeId === option.id)} p-4 flex flex-col gap-1`}
                  >
                    <span className="text-[15px] font-semibold">{option.label}</span>
                    <span className="text-[13px] leading-[1.5] text-muted">{option.description}</span>
                  </button>
                ))}
              </div>
            </Step>

            <Step number="02" title="What does it need?" hint="Pick any, or none">
              <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))] gap-3">
                {briefFeatures.map((option) => {
                  const on = featureIds.includes(option.id);
                  return (
                    <button
                      key={option.id}
                      type="button"
                      aria-pressed={on}
                      data-testid={`brief-feature-${option.id}`}
                      onClick={() => toggleFeature(option.id)}
                      className={`${OPTION} ${optionState(on)} p-4 flex items-start gap-3`}
                    >
                      <span
                        className={`flex-none grid place-items-center w-[22px] h-[22px] mt-px box-border rounded-md border-[1.5px] text-white ${
                          on ? 'border-accent bg-accent' : 'border-line-2 bg-transparent'
                        }`}
                      >
                        {on && <Icon name="check" size={14} strokeWidth={3} />}
                      </span>
                      <span className="flex flex-col gap-0.5">
                        <span className="text-[15px] font-semibold leading-[1.35]">{option.label}</span>
                        <span className="text-[13px] leading-[1.5] text-muted">{option.description}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </Step>

            <Step number="03" title="When do you need it?">
              <Choice name="brief-timeline" options={briefTimelines} value={timelineId} onChange={setTimelineId} />
            </Step>

            <Step number="04" title="Where is it now?">
              <Choice name="brief-stage" options={briefStages} value={stageId} onChange={setStageId} />
            </Step>
          </div>

          <aside
            aria-label="Your brief"
            className="flex-[1_1_340px] sm:sticky sm:top-[96px] p-7 border border-line-2 rounded-[20px] bg-surface shadow-[0_40px_80px_-50px_var(--shadow)] flex flex-col gap-5"
          >
            <div className="flex items-center gap-3">
              <span className="icon-tile">
                <Icon name="clipboard" size={20} />
              </span>
              <div className="flex flex-col leading-[1.35]">
                <span className="font-heading font-semibold text-[19px]">Your brief</span>
                <span className="text-[13px] text-muted">Updates as you choose</span>
              </div>
            </div>
            <dl data-testid="brief-summary" className="m-0 flex flex-col border-t border-line text-[15px]">
              {summary.map((row) => (
                <div key={row.label} className="py-3 border-b border-line">
                  <dt className="eyebrow">{row.label}</dt>
                  <dd className="mt-1 mb-0 ml-0 font-semibold leading-[1.45]">{row.value}</dd>
                </div>
              ))}
            </dl>
            <button
              type="button"
              data-testid="use-brief"
              onClick={() => onUseBrief(message)}
              className="btn-solid justify-center border-0 cursor-pointer hover:opacity-80"
            >
              Continue with this brief
              <Icon name="arrow-right" size={16} strokeWidth={2} />
            </button>
            <p className="m-0 text-[13px] text-muted">
              Next you add your name and any detail, then it opens in WhatsApp ready to send. No prices here: you get
              a quote after we’ve talked through the scope.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default BriefBuilder;
