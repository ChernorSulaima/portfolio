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
      /** Screenshot name under /images/apps (see lib/shots.ts). */
      image: string;
      alt: string;
    }
  | {
      kind: 'phones';
      brand: 'airpay' | 'sahid';
      /** Left, centre and right screens, as screenshot names under /images/apps. */
      screens: [string, string, string];
      background: string;
      label: string;
    };

export interface Project {
  number: string;
  title: string;
  category: string;
  description: string;
  challenge: string;
  solution: string;
  stack: string;
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
  area: string;
  items: string[];
}

export interface Testimonial {
  initials: string;
  name: string;
  role: string;
  quote: string;
}

export interface BriefOption {
  id: string;
  label: string;
  description: string;
}

/** What a visitor picked in the project brief builder. */
export interface BriefSelection {
  projectType: string;
  features: string[];
  timeline: string;
  stage: string;
}
