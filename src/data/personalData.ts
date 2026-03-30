import { Experience, ExtraSkill, Language, PersonalInfo, Project, Service, Skill, SocialLink, Testimonial } from '../types';

export const personalInfo: PersonalInfo = {
  age: 24,
  residence: 'Sierra Leone',
  freelanceStatus: 'Available (Flexible Part-Time)',
  address: 'Freetown, Sierra Leone',
};

export const languages: Language[] = [
  { name: 'English', percentage: 95 },
  { name: 'Krio', percentage: 100 },
  { name: 'Fullah', percentage: 100 },
];

export const skills: Skill[] = [
  { name: 'React', percentage: 90 },
  { name: 'TypeScript', percentage: 85 },
  { name: 'Node.js', percentage: 80 },
  { name: 'Tailwind CSS', percentage: 95 },
  { name: 'Next.js', percentage: 80 },
  { name: 'Database Design', percentage: 75 },
  { name: 'n8n / Workflow Automation', percentage: 70 },
  { name: 'Video Editing (CapCut)', percentage: 90 },
  { name: 'Video Editing (DaVinci / Premiere Pro)', percentage: 60 },
  { name: 'PostgreSQL', percentage: 20 },
  { name: 'GraphQL', percentage: 30 },
  { name: 'AWS Services', percentage: 25 },
];

export const extraSkills: ExtraSkill[] = [
  { name: 'Microsoft 365 Suite' },
  { name: 'Google Workspace Administration' },
  { name: 'AI Tools & Prompt Engineering' },
  { name: 'Authentication (Auth.js/Clerk)' },
  { name: 'Workflow Automation (n8n)' },
  { name: 'Video Production & Editing' },
  { name: 'Effective Communication' },
  { name: 'Strategic Problem Solving' },
  { name: 'Agile Project Management' },
  { name: 'Technical Documentation' },
];

export const socialLinks: SocialLink[] = [
  { platform: 'GitHub', url: 'https://github.com/ChernorSulaima', icon: 'Github' },
  { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/chernor-sulaiman-jalloh-0a9854366', icon: 'Linkedin' },
  { platform: 'Twitter', url: 'https://x.com/ThisisChizo', icon: 'Twitter' },
  { platform: 'Instagram', url: 'https://www.instagram.com/thisischizo', icon: 'Instagram' },
];

export const services: Service[] = [
  {
    title: 'Full-Stack Development',
    description: 'End-to-end web applications with secure backends and dynamic frontends.',
    icon: 'Code2',
    items: ['React/Next.js Apps', 'Secure API Integration', 'Database Management'],
  },
  {
    title: 'Complex UI/UX Implementation',
    description: 'Converting designs into pixel-perfect, interactive experiences.',
    icon: 'Layout',
    items: ['Dashboard Design', 'Mobile-First Layouts', 'Advanced Animations'],
  },
  {
    title: 'Performance Optimization',
    description: 'Making applications fast, accessible, and SEO-friendly.',
    icon: 'Zap',
    items: ['Core Web Vitals', 'Image Optimization', 'Code Splitting'],
  },
  {
    title: 'Video Editing & Production',
    description: 'Professional video editing for organizations, brands, and content creators.',
    icon: 'Film',
    items: ['CapCut (Fluent)', 'DaVinci Resolve (Intermediate)', 'Premiere Pro (Intermediate)'],
  },
  {
    title: 'Workflow Automation',
    description: 'Automating repetitive tasks and building efficient business workflows with n8n.',
    icon: 'Workflow',
    items: ['n8n Automations', 'API Integrations', 'Business Process Optimization'],
  },
];

export const experience: Experience[] = [
  {
    company: 'KNS (Knowledge Network Solutions)',
    role: 'Frontend Developer (Intern)',
    period: '2024',
    description: 'Entrusted with developing secure internal tools and dashboards. Successfully implemented strict security protocols in frontend architecture.',
    achievements: [
      'Developed Role-Based Access Control (RBAC) interfaces for internal security tools.',
      'Optimized data visualization components for real-time threat monitoring.',
      'Received full-time employment offer upon conclusion (Declined to pursue university studies/freelance).',
    ],
    type: 'internship',
  },
  {
    company: 'Self-Employed',
    role: 'Freelance Software Engineer',
    period: '2024 — Present',
    description: 'Delivering high-impact web solutions for diverse clients, focusing on performance and scalability.',
    achievements: [
      'Built and deployed 4 production-grade applications for international and local clients.',
      'Managed full SDLC from requirements gathering to Vercel deployment.',
      'Specialized in migrating legacy businesses to modern digital workflows.',
    ],
    type: 'contract',
  },
  {
    company: 'Freelance',
    role: 'Video Editor',
    period: '2024 — Present',
    description: 'Producing professional video content for organizations and brands using industry-standard editing tools.',
    achievements: [
      'Delivered polished video content for organizations and community projects.',
      'Fluent in CapCut for fast-turnaround edits and social media content.',
      'Intermediate proficiency in DaVinci Resolve and Adobe Premiere Pro for advanced productions.',
    ],
    type: 'contract',
  },
  {
    company: 'Freelance',
    role: 'Automation Specialist',
    period: '2025 — Present',
    description: 'Building workflow automations using n8n to streamline business operations and eliminate repetitive manual tasks.',
    achievements: [
      'Designed and deployed automated workflows using n8n for client businesses.',
      'Integrated APIs across platforms to create seamless data pipelines.',
      'Reduced manual operational overhead for clients through intelligent automation.',
    ],
    type: 'contract',
  },
  {
    company: 'Sendme SL',
    role: 'Full Stack Developer / Software Engineer',
    period: '2025 — Present',
    description: 'Building and maintaining the core platform for a logistics and e-commerce company, handling both frontend and backend systems.',
    achievements: [
      'Developing full-stack features for the logistics and e-commerce platform.',
      'Architecting scalable backend services and intuitive frontend interfaces.',
      'Collaborating with the team to ship features that drive business growth.',
    ],
    type: 'full-time',
  },
];

export const projects: Project[] = [
  {
    id: 1,
    title: 'BMK Procurement',
    category: 'Logistics / E-Commerce',
    role: 'Full Stack Developer',
    description: 'A procurement platform for BMK — helping teams across Sierra Leone secure essential supplies from office essentials to specialized sourcing.',
    problem: 'Businesses struggled with slow procurement processes and unreliable supply chains.',
    solution: 'Built a fast, reliable procurement platform with supply categories, request workflows, and a professional brand that builds trust.',
    image: '/images/bmk.png',
    technologies: ['React', 'TypeScript', 'Tailwind', 'Responsive Design'],
    featured: true,
    keyFeatures: ['Supply Request System', 'Category Management', 'Fast Response Workflow'],
    liveUrl: 'https://bmkprocurement.vercel.app',
  },
  {
    id: 2,
    title: 'Gloze Skincare',
    category: 'E-Commerce / Beauty',
    role: 'Full Stack Developer',
    description: 'An e-commerce platform for Gloze — a Korean skincare brand formulated specifically for melanin-rich skin tones.',
    problem: 'The brand needed a premium shopping experience that communicated trust and ingredient transparency.',
    solution: 'Delivered a polished e-commerce storefront with skin quiz, product catalog, rewards program, and a luxury brand feel.',
    image: '/images/shopgloze.png',
    technologies: ['React', 'TypeScript', 'Tailwind', 'E-Commerce'],
    featured: true,
    keyFeatures: ['Skin Quiz', 'Product Catalog', 'Rewards Program'],
    liveUrl: 'https://shopgloze.vercel.app',
  },
  {
    id: 3,
    title: 'Nakam Gaming Platform',
    category: 'Gaming / Fintech',
    role: 'Full Stack Developer',
    description: 'A real-time gaming platform where players can compete in dice duels, coin flips, and tournaments — with wallet integration and live game lobbies.',
    problem: 'Users wanted a fair, transparent gaming experience with real-time multiplayer and secure transactions.',
    solution: 'Built a full-featured gaming platform with live lobbies, multiple game modes, leaderboards, wallet system, and tournament management.',
    image: '/images/rollbet.png',
    technologies: ['React', 'TypeScript', 'Tailwind', 'Real-time', 'WebSockets'],
    featured: true,
    keyFeatures: ['Real-time Multiplayer', 'Wallet System', 'Tournament Mode'],
    liveUrl: 'https://rollbet-arena.vercel.app',
  },
  {
    id: 4,
    title: 'Rotaract Club of Freetown Sunset',
    category: 'Non-Profit / Community',
    role: 'Lead Developer',
    description: 'A comprehensive platform for the Rotaract Club of Freetown Sunset — a youth-focused community service organization under Rotary International.',
    problem: 'The club lacked a digital presence to showcase their 50+ community projects and engage 150+ active members.',
    solution: 'Built a modern, content-managed platform with Sanity CMS, featuring event listings, membership programs, donation capabilities, and an impact gallery.',
    image: '/images/rotaract.png',
    technologies: ['Next.js', 'TypeScript', 'Sanity CMS', 'Tailwind'],
    featured: true,
    keyFeatures: ['CMS-Powered Content', 'Donation System', 'Event Management'],
    liveUrl: 'https://rotroract.vercel.app',
  },
];

export const testimonials: Testimonial[] = [
  {
    name: 'Client Name',
    role: 'Program Lead',
    company: 'Community Org',
    quote: 'Honestly didn\'t expect the website to come out that clean. Chernor also cut together all our campaign videos — the guy just gets it done without you having to explain things twice.',
    image: '',
    rating: 5,
  },
  {
    name: 'Client Name',
    role: 'Operations',
    company: 'Logistics Startup',
    quote: 'He built features on our platform and then set up n8n automations that handle stuff we used to do manually every morning. Saved us hours. Would work with him again easily.',
    image: '',
    rating: 5,
  },
  {
    name: 'Client Name',
    role: 'Creative Lead',
    company: 'Media Team',
    quote: 'We needed someone who could edit video AND build the site to host it. Chernor did both in the same week. DaVinci edits came out sharp and the landing page converted well. No drama.',
    image: '',
    rating: 4,
  },
  {
    name: 'Client Name',
    role: 'Founder',
    company: 'E-Commerce',
    quote: 'Brought him on to fix our storefront and he ended up automating our whole order flow with n8n too. The kind of person who sees what you actually need, not just what you asked for.',
    image: '',
    rating: 5,
  },
  {
    name: 'Client Name',
    role: 'Director',
    company: 'Law Firm',
    quote: 'We needed a professional site that made us look credible. Chernor delivered exactly that — clean design, works on every device, clients actually find us through it now.',
    image: '',
    rating: 5,
  },
  {
    name: 'Client Name',
    role: 'Project Manager',
    company: 'Sports Org',
    quote: 'The league platform he built handles all our standings and player stats automatically now. Before that we were updating spreadsheets by hand. Massive upgrade for us.',
    image: '',
    rating: 5,
  },
];

export const bioInfo = {
  name: 'Chernor S. Jalloh',
  title: 'Software Engineer',
  description: 'Software Engineer building secure, high-performance web apps. Specialized in React, TypeScript, and modern digital experiences.',
  socialLinks,
  profileImage: '/images/1760520818253.png',
  projects: projects,
  experience: experience,
};
