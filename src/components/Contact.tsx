import React, { useEffect, useRef, useState } from 'react';
import Kicker from './ui/Kicker';
import Icon from './ui/Icon';
import { WHATSAPP_PHONE } from '../data/pricingData';
import { contactInfo } from '../data/personalData';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface ContactProps {
  initialMessage?: string;
  quoteKey?: number;
}

const FIELD = 'border rounded-xl bg-surface text-fg text-[15px] font-[inherit]';

const Contact: React.FC<ContactProps> = ({ initialMessage = '', quoteKey = 0 }) => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: initialMessage });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const messageRef = useRef<HTMLTextAreaElement>(null);

  // A quote request from the pricing calculator prefills (and focuses) the message.
  useEffect(() => {
    if (quoteKey > 0 && initialMessage) {
      setFormData((prev) => ({ ...prev, message: initialMessage }));
      window.requestAnimationFrame(() => messageRef.current?.focus({ preventScroll: true }));
    }
  }, [quoteKey, initialMessage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const next: Partial<FormData> = {};
    if (!formData.name.trim()) next.name = 'Name is required';
    if (!formData.email.trim()) {
      next.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      next.email = 'Enter a valid email';
    }
    if (!formData.message.trim()) next.message = 'Message is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const text = [
      `Name: ${formData.name.trim()}`,
      `Email: ${formData.email.trim()}`,
      '',
      formData.message.trim(),
    ].join('\n');
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  const fieldBorder = (field: keyof FormData) => (errors[field] ? 'border-danger' : 'border-line-2');

  const details = [
    { icon: 'mail' as const, label: 'Email', value: contactInfo.email, href: `mailto:${contactInfo.email}` },
    { icon: 'phone' as const, label: 'Phone / WhatsApp', value: contactInfo.phoneDisplay, href: contactInfo.phoneHref },
    { icon: 'map-pin' as const, label: 'Location', value: contactInfo.location },
  ];

  return (
    <section id="contact" className="border-t border-line bg-surface">
      <div className="pf-container section-pad flex flex-wrap gap-x-20 gap-y-12">
        <div className="flex-[1_1_360px] flex flex-col gap-[22px]">
          <Kicker>Contact</Kicker>
          <h2 className="h2-section">Let’s build something great together.</h2>
          <p className="m-0 text-[17px] text-muted">
            Have a project in mind or just want to say hello? Send a message and I’ll get back to you with next steps.
          </p>
          <ul className="mt-3 mb-0 p-0 list-none border-t border-line">
            {details.map((d) => {
              const body = (
                <>
                  <span className="icon-tile">
                    <Icon name={d.icon} />
                  </span>
                  <span className="flex flex-col min-w-0 leading-[1.4]">
                    <span className="eyebrow">{d.label}</span>
                    <span className="text-[15px] font-semibold [overflow-wrap:anywhere]">{d.value}</span>
                  </span>
                </>
              );
              return (
                <li key={d.label} className="border-b border-line">
                  {d.href ? (
                    <a href={d.href} className="flex items-center gap-4 py-[18px]">
                      {body}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 py-[18px]">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <form
          aria-label="Contact form"
          onSubmit={handleSubmit}
          noValidate
          className="flex-[999_1_520px] min-w-0 m-0 p-[clamp(24px,3vw,40px)] border border-line-2 rounded-[20px] bg-bg shadow-[0_40px_80px_-50px_var(--shadow)] flex flex-col gap-5"
        >
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-name" className="text-[14px] font-semibold">
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder="John Doe"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'contact-name-error' : undefined}
                className={`${FIELD} ${fieldBorder('name')} min-h-[48px] px-3.5`}
              />
              {errors.name && (
                <p id="contact-name-error" className="m-0 text-[13px] text-danger">
                  {errors.name}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-email" className="text-[14px] font-semibold">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="john@example.com"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'contact-email-error' : undefined}
                className={`${FIELD} ${fieldBorder('email')} min-h-[48px] px-3.5`}
              />
              {errors.email && (
                <p id="contact-email-error" className="m-0 text-[13px] text-danger">
                  {errors.email}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-message" className="text-[14px] font-semibold">
              Message
            </label>
            <textarea
              id="contact-message"
              ref={messageRef}
              name="message"
              rows={6}
              placeholder="Tell me about your project, timeline and budget…"
              value={formData.message}
              onChange={handleChange}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'contact-message-error' : undefined}
              data-testid="contact-message"
              className={`${FIELD} ${fieldBorder('message')} px-3.5 py-3 resize-y`}
            />
            {errors.message && (
              <p id="contact-message-error" className="m-0 text-[13px] text-danger">
                {errors.message}
              </p>
            )}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="text-[13px] text-muted">Opens WhatsApp with your message ready to send.</span>
            <button type="submit" data-testid="contact-submit" className="btn-solid border-0 cursor-pointer hover:opacity-80">
              Send message
              <Icon name="send" size={16} strokeWidth={2} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
