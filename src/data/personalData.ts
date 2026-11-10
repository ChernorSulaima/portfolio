import type {
  BriefOption,
  Client,
  Fact,
  Job,
  Project,
  Service,
  SkillGroup,
  SocialLink,
  Testimonial,
} from '../types';

export const RESUME_URL = '/Chernor-Sulaiman-Jalloh-CV.pdf';
export const RESUME_FILENAME = 'Chernor-Sulaiman-Jalloh-CV.pdf';
export const PORTRAIT = {
  src: '/images/portrait-640.webp',
  srcSet: '/images/portrait-640.webp 640w, /images/portrait-1024.webp 1024w',
};

/** Canonical production URL on Vercel. */
export const SITE_URL = 'https://portfolio-two-amber-40.vercel.app';

/** Phone for WhatsApp links: digits only, country code included. */
export const WHATSAPP_PHONE = '23234564931';

export const contactInfo = {
  email: 'chernorsulaimanjalloh2025@gmail.com',
  phoneDisplay: '+232 34 564 931',
  phoneHref: `tel:+${WHATSAPP_PHONE}`,
  location: 'Freetown, Sierra Leone',
};

export const AVAILABILITY = 'Open to remote and contract roles';

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/ChernorSulaima', icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/chernor-sulaiman-jalloh-0a9854366', icon: 'linkedin' },
  { label: 'X', href: 'https://x.com/ThisisChizo', icon: 'x' },
  { label: 'Instagram', href: 'https://www.instagram.com/thisischizo', icon: 'instagram' },
];

export const heroFacts: Fact[] = [
  { label: 'Based in', value: 'Freetown, Sierra Leone' },
  { label: 'Education', value: 'Limkokwing University Sierra Leone' },
  { label: 'Focus', value: 'TypeScript, React, React Native' },
  { label: 'Availability', value: 'Remote and contract roles' },
];

/** Shown under the portrait in the hero. */
export const portraitFacts: Fact[] = [
  { label: 'Currently', value: 'Altruistech Luminary Center' },
  { label: 'Building', value: 'LearnMe, Airpay, Sahid' },
];

export const mobileHeroFacts: Fact[] = [
  { label: 'Based in', value: 'Freetown, SL' },
  { label: 'Time zone', value: 'GMT' },
  { label: 'Focus', value: 'TypeScript, React' },
  { label: 'Education', value: 'Limkokwing University' },
];

export const clients: Client[] = [
  { name: 'Altruistech' },
  { name: 'Sendme SL' },
  { name: 'BMK Procurement' },
  { name: 'Gloze Skincare' },
  { name: 'Rotaract Freetown Sunset', shortName: 'Rotaract' },
  { name: 'KNS' },
];

export const jobs: Job[] = [
  {
    period: 'Jul 2026 — Jan 2027',
    badge: 'Current · Part-time',
    current: true,
    role: 'Facilitator of AI & Software Development',
    company: 'Altruistech Luminary Center',
    description:
      'Leading the AI and Software Development module — designing curriculum, mentoring the next generation of engineers, and running workshops that bridge theory with real-world practice.',
    achievements: [
      'Authored a comprehensive 5-month curriculum covering AI foundations, prompt engineering and full-stack development.',
      'Mentoring students through hands-on capstone projects — code reviews, architecture guidance and career coaching.',
      'Organising and facilitating live workshops, hackathons and project presentations for the cohort.',
    ],
  },
  {
    period: '2025 — 2026',
    badge: 'Full-time',
    role: 'Full Stack Developer / Software Engineer',
    company: 'Sendme SL',
    description:
      'Core engineering team member at a logistics and e-commerce startup — owning features across the full stack from database to deployment.',
    achievements: [
      'Built and shipped full-stack features across the logistics platform — order management, tracking and vendor systems.',
      'Architected scalable backend services with clean API design and responsive frontend interfaces.',
      'Collaborated cross-functionally to ship features that drove revenue and operational efficiency.',
    ],
  },
  {
    period: '2024 — Present',
    badge: 'Contract',
    role: 'Independent Software Engineer',
    company: 'Self-employed',
    description:
      'An independent practice building products for clients and my own: web and mobile apps across e-commerce, logistics, non-profits and gaming, plus workflow automation for client operations.',
    achievements: [
      'Shipped 4+ production applications for international and local clients, from first scope to deployment and handoff.',
      'Designing and building my own products end to end: LearnMe (multi-tenant learning platform), Airpay (savings app) and Sahid (Qur’an classroom app).',
      'Built n8n automations that join CRMs, payment processors and messaging tools, cutting manual operational work by 60%+ for several clients.',
    ],
  },
  {
    period: '2024',
    badge: 'Internship — offer extended',
    role: 'Frontend Developer (Intern)',
    company: 'KNS (Knowledge Network Solutions)',
    description:
      'Security-critical frontend work at a cybersecurity firm — RBAC interfaces and real-time threat-monitoring dashboards from day one.',
    achievements: [
      'Engineered role-based access control (RBAC) interfaces for internal security tools.',
      'Built real-time data visualisation dashboards for threat monitoring, optimised for speed and clarity.',
      'Earned a full-time return offer at the end of the internship.',
    ],
  },
];

export const AIRPAY_BACKGROUND =
  'radial-gradient(120% 90% at 50% 100%, #1B4D38 0%, #0F2A20 55%, #0B2019 100%)';
export const SAHID_BACKGROUND =
  'radial-gradient(120% 90% at 50% 100%, #7A4E33 0%, #3B2519 55%, #23160F 100%)';
export const NAKAM_BACKGROUND =
  'radial-gradient(120% 100% at 100% 0%, #5A161C 0%, #22100F 55%, #140A0B 100%)';
export const LEARNME_BACKGROUND =
  'radial-gradient(120% 100% at 0% 0%, #5B2A3F 0%, #2A1420 60%, #190C13 100%)';

/** Screenshot names under /images/apps. Each one is captured from the running app at iPhone resolution. */
export const AIRPAY_SCREENS: [string, string, string] = ['airpay-goal', 'airpay-home', 'airpay-insights'];
export const SAHID_SCREENS: [string, string, string] = ['sahid-quran', 'sahid-student-home', 'sahid-teacher-home'];

export const LEARNME_URL = 'https://learnme-nine.vercel.app';

export const projects: Project[] = [
  {
    number: '01',
    title: 'LearnMe',
    category: 'EdTech / Multi-tenant SaaS',
    description:
      'A learning platform where academies, training businesses and coaches run their own branded school: courses, classes and live sessions under their own name and address.',
    challenge:
      'Every academy shares one app and one database, so one school must never be able to see or change another school’s learners, courses or marks.',
    solution:
      'The address a request arrives on decides the academy, row-level security guards every table, and 600+ database tests prove one academy cannot reach another.',
    stack: 'Next.js 16 / React 19 / Supabase / PostgreSQL / Tailwind',
    caseStudyPath: '/work/learnme',
    liveUrl: LEARNME_URL,
    status: 'In development',
    visual: {
      kind: 'browser',
      url: 'learnme-nine.vercel.app',
      image: 'learnme-courses',
      alt: 'LearnMe academy console: the course list of Maya Design School, grouped into programmes',
    },
  },
  {
    number: '02',
    title: 'Airpay',
    category: 'Fintech / Mobile App',
    description:
      'A savings and money-management app for Sierra Leone, built for salaried workers whose money is split across mobile money, a bank account and cash.',
    challenge:
      'People want to know one thing each day: how much can I safely spend today, and am I still on track to save?',
    solution:
      'A daily safe-to-spend amount, savings goals with a pace line, a jar of good days and Insights, on a record that syncs when the phone is back online.',
    stack: 'Expo / React Native / NestJS / PostgreSQL / TypeScript',
    caseStudyPath: '/work/airpay',
    githubUrl: 'https://github.com/ChernorSulaima/AirPay',
    status: 'In development · v0',
    visual: {
      kind: 'phones',
      brand: 'airpay',
      screens: AIRPAY_SCREENS,
      background: AIRPAY_BACKGROUND,
      label: 'Three Airpay screens on iPhones: a Rent savings goal, Home and Insights',
    },
  },
  {
    number: '03',
    title: 'Nakam Gaming Platform',
    category: 'Gaming / Fintech',
    description:
      'A real-time gaming platform for dice duels, coin flips and tournaments — with wallet integration and live game lobbies.',
    challenge:
      'Players wanted a fair, transparent experience with real-time multiplayer and secure transactions.',
    solution:
      'Live lobbies, multiple game modes, leaderboards, a wallet system and tournament management.',
    stack: 'React / TypeScript / Tailwind / WebSockets',
    caseStudyPath: '/work/nakam-gaming',
    liveUrl: 'https://rollbet-arena.vercel.app',
    visual: {
      kind: 'browser',
      url: 'rollbet-arena.vercel.app',
      image: '/images/rollbet.png',
      alt: 'Nakam gaming platform lobby',
    },
  },
  {
    number: '04',
    title: 'Sahid',
    category: 'EdTech / Mobile App',
    description:
      'Memorise with your Sheikh — a Qur’an memorisation and classroom app that connects students, teachers, teaching assistants and parents.',
    challenge:
      'Hifz classes need one place where the teacher assigns and reviews lessons, students practise, and parents follow progress.',
    solution:
      'Today’s focus set by the Sheikh, a review queue for recitations, Review & Test, progress points and streaks, and a Mushaf that remembers where you stopped.',
    stack: 'Expo / React Native / Supabase / TypeScript',
    caseStudyPath: '/work/sahid',
    status: 'In development',
    visual: {
      kind: 'phones',
      brand: 'sahid',
      screens: SAHID_SCREENS,
      background: SAHID_BACKGROUND,
      label: 'Three Sahid screens on iPhones: the Quran tab, the student home and the teacher home',
    },
  },
];

export const aboutFacts: Fact[] = [
  { label: 'Based in', value: 'Freetown, Sierra Leone' },
  { label: 'Working hours', value: 'GMT, overlaps Europe and US East' },
  { label: 'Languages', value: 'English, Krio, Fullah' },
  { label: 'Open to', value: 'Remote and contract roles' },
];

export const skillGroups: SkillGroup[] = [
  { area: 'Web', items: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Vite'] },
  { area: 'Mobile', items: ['React Native', 'Expo', 'Expo Router', 'Offline sync'] },
  { area: 'Backend and data', items: ['Node.js', 'NestJS', 'PostgreSQL', 'Supabase', 'Drizzle ORM', 'REST / OpenAPI'] },
  { area: 'Quality and delivery', items: ['Playwright', 'Vitest / Jest', 'GitHub Actions', 'Vercel', 'EAS Build', 'n8n'] },
];

export const services: Service[] = [
  {
    title: 'Full-stack web products',
    description: 'Web applications from the database schema to the interface, with access rules tested rather than assumed.',
    icon: 'code',
    items: ['React and Next.js', 'PostgreSQL and Supabase', 'Auth, roles and row-level security'],
  },
  {
    title: 'Mobile apps',
    description: 'One codebase for iOS and Android that keeps working when the connection drops.',
    icon: 'smartphone',
    items: ['React Native and Expo', 'Offline-first records', 'Cloud builds with EAS'],
  },
  {
    title: 'Interface engineering',
    description: 'Designs turned into fast, accessible interfaces that hold up on small screens and slow networks.',
    icon: 'layout',
    items: ['Design systems and tokens', 'Dashboards and data views', 'Core Web Vitals'],
  },
  {
    title: 'Workflow automation',
    description: 'Repetitive operations work moved into automations that run on their own.',
    icon: 'workflow',
    items: ['n8n workflows', 'API integrations', 'CRM, payments and messaging'],
  },
];

export const testimonials: Testimonial[] = [
  {
    initials: 'IB',
    name: 'Ibrahim K. Barrie',
    role: 'Program Lead, Rotaract Freetown Sunset',
    quote:
      'Honestly didn’t expect the website to come out that clean. Chernor also cut together all our campaign videos — the guy just gets it done without you having to explain things twice.',
  },
  {
    initials: 'AK',
    name: 'Aminata S. Koroma',
    role: 'Operations Manager, Sendme SL',
    quote:
      'He built features on our platform and then set up n8n automations that handle stuff we used to do manually every morning. Saved us hours. Would work with him again easily.',
  },
  {
    initials: 'MJ',
    name: 'Mohamed B. Jalloh',
    role: 'Founder & CEO, BMK Procurement',
    quote:
      'Brought him on to build our procurement platform from scratch. He ended up designing the entire user flow and shipped it faster than we expected.',
  },
];

/** Options for the project brief builder. No prices: the brief starts a conversation. */
export const briefProjectTypes: BriefOption[] = [
  { id: 'website', label: 'Website', description: 'A marketing site or landing page that explains and converts.' },
  { id: 'web-app', label: 'Web app', description: 'A product people sign in to: dashboards, portals, internal tools.' },
  { id: 'mobile-app', label: 'Mobile app', description: 'An iOS and Android app from one codebase.' },
  { id: 'store', label: 'Online store', description: 'A catalogue, cart and checkout, with the admin to run it.' },
  { id: 'automation', label: 'Automation', description: 'Manual work between tools, turned into a workflow.' },
  { id: 'unsure', label: 'Not sure yet', description: 'You know the problem; we work out the shape together.' },
];

export const briefFeatures: BriefOption[] = [
  { id: 'accounts', label: 'Accounts and sign-in', description: 'Sign-up, log in and roles.' },
  { id: 'payments', label: 'Payments', description: 'Cards or mobile money.' },
  { id: 'admin', label: 'Admin dashboard', description: 'Manage content, users and orders.' },
  { id: 'messaging', label: 'Messaging or notifications', description: 'Email, SMS, WhatsApp or push.' },
  { id: 'offline', label: 'Works offline', description: 'Keeps going on a poor connection.' },
  { id: 'ai', label: 'AI features', description: 'Assistants, search or automatic review.' },
  { id: 'integrations', label: 'Integrations', description: 'Connect the tools you already use.' },
  { id: 'design', label: 'Design from scratch', description: 'No designs yet: I design it too.' },
];

export const briefTimelines: BriefOption[] = [
  { id: 'asap', label: 'As soon as possible', description: 'There is a date to hit.' },
  { id: '1-3', label: '1 to 3 months', description: 'A focused build.' },
  { id: '3+', label: '3 months or more', description: 'A larger product, in stages.' },
  { id: 'flexible', label: 'Flexible', description: 'Quality first, no fixed date.' },
];

export const briefStages: BriefOption[] = [
  { id: 'idea', label: 'Just an idea', description: 'Nothing written down yet.' },
  { id: 'designs', label: 'Designs or a spec', description: 'There is something to build from.' },
  { id: 'existing', label: 'Existing product', description: 'It needs fixing, extending or rebuilding.' },
];
