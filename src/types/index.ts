import type { IconName } from '../components/ui/Icon';

export interface SocialLink {
  label: string;
  href: string;
  icon: IconName;
}

export interface Fact {
  label: string;
  value: string;
}

export interface Client {
  name: string;
  /** Shorter name used on phones. */
  shortName?: string;
}

export interface Job {
  period: string;
  badge: string;
  current?: boolean;
  role: string;
  company: string;
  description: string;
  achievements: string[];
}

export type ProjectVisual =
  | {
      kind: 'browser';
      url: string;
      image: string;
      alt: string;
    }
  | {
      kind: 'phones';
      brand: 'airpay' | 'sahid';
      /** Left, centre and right screens. */
      screens: [string, string, string];
      /** Phone corner radius (horizontal / vertical) for the screenshot's aspect ratio. */
      radius: string;
      background: string;
      label: string;
    };

export interface Project {
  number: string;
  title: string;
  category: string;
  description: string;
  mobileDescription: string;
  challenge: string;
  solution: string;
  stack: string;
  mobileStack: string;
  caseStudyPath: string;
  liveUrl?: string;
  githubUrl?: string;
  status?: string;
  visual: ProjectVisual;
}

export interface Service {
  title: string;
  description: string;
  icon: IconName;
  items: string[];
}

export interface SkillGroup {
  level: string;
  /** Filled bars out of 3. */
  score: number;
  items: string[];
}

export interface Testimonial {
  initials: string;
  name: string;
  role: string;
  quote: string;
}

export interface PricingOption {
  id: string;
  label: string;
  description: string;
  basePrice: number;
}

export interface PricingAddOn {
  id: string;
  label: string;
  description: string;
  /** List price; individual add-ons must be ≤ 150. Bundle uses discounted package price. */
  price: number;
  /** When true, selecting this replaces all other add-ons (everything package). */
  isBundle?: boolean;
}

export interface TimelineOption {
  id: string;
  label: string;
  description: string;
  multiplier: number;
}

export interface QuoteSummary {
  projectTypeId: string;
  projectTypeLabel: string;
  addOnIds: string[];
  addOnLabels: string[];
  timelineId: string;
  timelineLabel: string;
  subtotal: number;
  total: number;
  currency: string;
  formattedTotal: string;
}
