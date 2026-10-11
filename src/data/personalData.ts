import type {
  Client,
  Fact,
  Job,
  Project,
  Service,
  SkillGroup,
  SocialLink,
  Testimonial,
} from '../types';

export const RESUME_URL = '/resume.pdf';
export const RESUME_FILENAME = 'ChernorJalloh_CV.pdf';
export const PROFILE_PHOTO = '/images/1760520818253.png';

export const contactInfo = {
  email: 'Chernorsulaimanjalloh2025@gmail.com',
  phoneDisplay: '+232 74 512 941',
  phoneHref: 'tel:+23274512941',
  location: 'Freetown, Sierra Leone',
};

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/ChernorSulaima', icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/chernor-sulaiman-jalloh-0a9854366', icon: 'linkedin' },
  { label: 'X (Twitter)', href: 'https://x.com/ThisisChizo', icon: 'twitter' },
  { label: 'Instagram', href: 'https://www.instagram.com/thisischizo', icon: 'instagram' },
];

export const heroFacts: Fact[] = [
  { label: 'Based in', value: 'Freetown, Sierra Leone' },
  { label: 'Education', value: 'Limkokwing University Sierra Leone' },
  { label: 'Specialism', value: 'React, TypeScript & Node.js' },
  { label: 'Availability', value: 'Flexible part-time' },
];

export const mobileHeroFacts: Fact[] = [
  { label: 'Based in', value: 'Freetown, SL' },
  { label: 'Currently', value: 'Altruistech' },
  { label: 'Education', value: 'Limkokwing University' },
  { label: 'Availability', value: 'Part-time' },
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
    period: '2025 — Present',
    badge: 'Contract',
    role: 'Workflow Automation Engineer',
    company: 'Freelance',
    description:
      'Designing and deploying intelligent automation workflows with n8n — cutting manual operational overhead by 60%+ for multiple clients.',
    achievements: [
      'Architected and deployed end-to-end automation workflows for client businesses using n8n.',
      'Integrated APIs across CRMs, payment processors and communication platforms into seamless data pipelines.',
      'Cut manual operational overhead by 60%+ for multiple clients through intelligent process automation.',
    ],
  },
  {
    period: '2024 — Present',
    badge: 'Contract',
    role: 'Freelance Software Engineer',
    company: 'Self-Employed',
    description:
      'Running an independent engineering practice — 4+ production applications shipped for businesses across e-commerce, logistics, non-profits and gaming.',
    achievements: [
      'Shipped 4+ production-grade applications for international and local clients — from MVP to deployment.',
      'Own the full SDLC end to end: scoping, architecture, development, testing, Vercel deployment and handoff.',
      'Specialise in rebuilding legacy or offline businesses with modern, digital-first workflows.',
    ],
  },
  {
    period: '2024 — Present',
    badge: 'Contract',
    role: 'Video Editor & Content Producer',
    company: 'Freelance',
    description:
      'Editing and producing video for organisations, brands and community campaigns — from social clips to full event coverage.',
    achievements: [
      'Delivered broadcast-quality video for organisations including Rotaract Club and community projects.',
      'Fluent in CapCut for fast-turnaround edits, motion graphics and social-first content.',
      'Growing proficiency in DaVinci Resolve and Adobe Premiere Pro for long-form productions.',
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
export const GLOZE_BACKGROUND =
  'radial-gradient(120% 100% at 0% 0%, #5A3324 0%, #2A1812 60%, #1C100C 100%)';

export const AIRPAY_SCREENS: [string, string, string] = [
  '/images/airpay-goal.png',
  '/images/airpay-home.png',
  '/images/airpay-insights.png',
];
export const SAHID_SCREENS: [string, string, string] = [
  '/images/sahid-quran-phone.png',
  '/images/sahid-student-phone.png',
  '/images/sahid-teacher-phone.png',
];
export const AIRPAY_PHONE_RADIUS = '14.7% / 6.9%';
export const SAHID_PHONE_RADIUS = '14.7% / 7.4%';

export const projects: Project[] = [
  {
    number: '01',
    title: 'Gloze Skincare',
    category: 'E-Commerce / Beauty',
    description:
      'An e-commerce platform for Gloze — a Korean skincare brand formulated specifically for melanin-rich skin tones.',
    challenge:
      'The brand needed a premium shopping experience that communicated trust and ingredient transparency.',
    solution:
      'A polished storefront with skin quiz, product catalog, rewards program and a luxury brand feel.',
    stack: 'React / TypeScript / Tailwind / E-Commerce',
    caseStudyPath: '/work/gloze-skincare',
    liveUrl: 'https://shopgloze.vercel.app',
    visual: {
      kind: 'browser',
      url: 'shopgloze.vercel.app',
      image: '/images/shopgloze.png',
      alt: 'Gloze Skincare homepage',
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
      'A daily safe-to-spend amount, savings goals with a pace line, Insights, shared family goals and a debt book both sides confirm.',
    stack: 'Expo / React Native / NestJS / PostgreSQL / TypeScript',
    caseStudyPath: '/work/airpay',
    githubUrl: 'https://github.com/ChernorSulaima/AirPay',
    status: 'In development · v0',
    visual: {
      kind: 'phones',
      brand: 'airpay',
      screens: AIRPAY_SCREENS,
      radius: AIRPAY_PHONE_RADIUS,
      background: AIRPAY_BACKGROUND,
      label: 'Three Airpay app screens shown on phones in 3D: a Rent savings goal, Home and Insights',
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
      'Today’s focus set by the Sheikh, an AI review queue for recitations, Review & Test, progress points and streaks, and a Mushaf that remembers where you stopped.',
    stack: 'Expo / React Native / Supabase / TypeScript',
    caseStudyPath: '/work/sahid',
    status: 'In development',
    visual: {
      kind: 'phones',
      brand: 'sahid',
      screens: SAHID_SCREENS,
      radius: SAHID_PHONE_RADIUS,
      background: SAHID_BACKGROUND,
      label: 'Three Sahid app screens shown on phones in 3D: the Quran reader, the student home and the teacher home',
    },
  },
];

export const aboutFacts: Fact[] = [
  { label: 'Residence', value: 'Sierra Leone' },
  { label: 'Freelance', value: 'Available, part-time' },
  { label: 'Languages', value: 'English, Krio, Fullah' },
  { label: 'Age', value: '24' },
];

export const skillGroups: SkillGroup[] = [
  { level: 'Expert', score: 3, items: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Node.js', 'CapCut'] },
  {
    level: 'Proficient',
    score: 2,
    items: ['Database design', 'n8n automation', 'Auth.js / Clerk', 'DaVinci Resolve', 'Premiere Pro'],
  },
  { level: 'Learning', score: 1, items: ['PostgreSQL', 'GraphQL', 'AWS'] },
];

export const services: Service[] = [
  {
    title: 'Full-Stack Development',
    description: 'End-to-end web applications with secure backends and dynamic frontends.',
    icon: 'code',
    items: ['React / Next.js apps', 'Secure API integration', 'Database management'],
  },
  {
    title: 'Complex UI/UX Implementation',
    description: 'Converting designs into pixel-perfect, interactive experiences.',
    icon: 'layout',
    items: ['Dashboard design', 'Mobile-first layouts', 'Advanced animations'],
  },
  {
    title: 'Performance Optimization',
    description: 'Making applications fast, accessible and SEO-friendly.',
    icon: 'zap',
    items: ['Core Web Vitals', 'Image optimization', 'Code splitting'],
  },
  {
    title: 'Workflow Automation',
    description: 'Automating repetitive tasks and building efficient business workflows with n8n.',
    icon: 'workflow',
    items: ['n8n automations', 'API integrations', 'Business process optimization'],
  },
  {
    title: 'Video Editing & Production',
    description: 'Professional video editing for organisations, brands and content creators.',
    icon: 'film',
    items: ['CapCut (fluent)', 'DaVinci Resolve (intermediate)', 'Premiere Pro (intermediate)'],
  },
];

export const testimonials: Testimonial[] = [
  {
    initials: 'IK',
    name: 'Ibrahim K.',
    role: 'Program Lead, Rotaract Freetown Sunset',
    quote:
      'Honestly didn’t expect the website to come out that clean. Chernor also cut together all our campaign videos — the guy just gets it done without you having to explain things twice.',
  },
  {
    initials: 'AS',
    name: 'Aminata S.',
    role: 'Operations Manager, Sendme SL',
    quote:
      'He built features on our platform and then set up n8n automations that handle stuff we used to do manually every morning. Saved us hours. Would work with him again easily.',
  },
  {
    initials: 'MB',
    name: 'Mohamed B.',
    role: 'Founder & CEO, BMK Procurement',
    quote:
      'Brought him on to build our procurement platform from scratch. He ended up designing the entire user flow and shipped it faster than we expected.',
  },
];
