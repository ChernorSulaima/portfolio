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
    company: 'Altruistech Luminary Center',
    role: 'Facilitator of AI & Software Development',
    period: 'Jul 2026 — Jan 2027',
    description: 'Leading the AI and Software Development module — designing curriculum, mentoring the next generation of engineers, and running workshops that bridge theory with real-world practice.',
    achievements: [
      'Authored a comprehensive 5-month curriculum covering AI foundations, prompt engineering, and full-stack development.',
      'Mentoring students through hands-on capstone projects — code reviews, architecture guidance, and career coaching.',
      'Organizing and facilitating live workshops, hackathons, and project presentations for the cohort.',
    ],
    type: 'contract',
  },
  {
    company: 'Sendme SL',
    role: 'Full Stack Developer / Software Engineer',
    period: '2025 — Present',
    description: 'Core engineering team member at a logistics and e-commerce startup — owning features across the full stack from database to deployment.',
    achievements: [
      'Building and shipping full-stack features across the logistics platform — order management, tracking, and vendor systems.',
      'Architecting scalable backend services with clean API design and responsive frontend interfaces.',
      'Collaborating cross-functionally to ship features that directly drive revenue and operational efficiency.',
    ],
    type: 'full-time',
  },
  {
    company: 'Freelance',
    role: 'Workflow Automation Engineer',
    period: '2025 — Present',
    description: 'Designing and deploying intelligent automation workflows with n8n — eliminating hours of manual work and connecting fragmented business systems.',
    achievements: [
      'Architected and deployed end-to-end automation workflows for client businesses using n8n.',
      'Integrated APIs across CRMs, payment processors, and communication platforms into seamless data pipelines.',
      'Cut manual operational overhead by 60%+ for multiple clients through intelligent process automation.',
    ],
    type: 'contract',
  },
  {
    company: 'Self-Employed',
    role: 'Freelance Software Engineer',
    period: '2024 — Present',
    description: 'Running an independent engineering practice — shipping production web applications for businesses across e-commerce, logistics, non-profits, and gaming.',
    achievements: [
      'Shipped 4+ production-grade applications for international and local clients — from MVP to deployment.',
      'Own the full SDLC end-to-end: scoping, architecture, development, testing, Vercel deployment, and handoff.',
      'Specialize in taking legacy or offline businesses and rebuilding them with modern digital-first workflows.',
    ],
    type: 'contract',
  },
  {
    company: 'Freelance',
    role: 'Video Editor & Content Producer',
    period: '2024 — Present',
    description: 'Editing and producing professional video content for organizations, brands, and community-driven campaigns — from social media clips to full event coverage.',
    achievements: [
      'Delivered broadcast-quality video content for organizations including Rotaract Club and community projects.',
      'Primary tool: CapCut — fluent in fast-turnaround edits, motion graphics, and social-first content.',
      'Growing proficiency in DaVinci Resolve and Adobe Premiere Pro for long-form and cinematic productions.',
    ],
    type: 'contract',
  },
  {
    company: 'KNS (Knowledge Network Solutions)',
    role: 'Frontend Developer (Intern)',
    period: '2024',
    description: 'Brought on to tackle security-critical frontend work at a cybersecurity firm — trusted with building internal tools and dashboards that handled sensitive operational data from day one.',
    achievements: [
      'Engineered Role-Based Access Control (RBAC) interfaces for internal security tools, ensuring strict permission boundaries across user tiers.',
      'Built real-time data visualization dashboards for threat monitoring — optimized for speed and clarity under high data throughput.',
      'Earned a full-time return offer upon conclusion. Declined to pursue university and freelance engineering.',
    ],
    type: 'internship',
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
    name: 'Ibrahim K.',
    role: 'Program Lead',
    company: 'Rotaract Freetown Sunset',
    quote: 'Honestly didn\'t expect the website to come out that clean. Chernor also cut together all our campaign videos — the guy just gets it done without you having to explain things twice. Total professional.',
    image: '',
    rating: 5,
  },
  {
    name: 'Aminata S.',
    role: 'Operations Manager',
    company: 'Sendme SL',
    quote: 'He built features on our platform and then set up n8n automations that handle stuff we used to do manually every morning. Saved us hours. Would work with him again easily.',
    image: '',
    rating: 5,
  },
  {
    name: 'David O.',
    role: 'Creative Director',
    company: 'Gloze Skincare',
    quote: 'We needed someone who could build a premium e-commerce experience that matched our brand. Chernor nailed it — the skin quiz, the product pages, everything feels luxury. Our conversion rate went up within the first week.',
    image: '',
    rating: 5,
  },
  {
    name: 'Mohamed B.',
    role: 'Founder & CEO',
    company: 'BMK Procurement',
    quote: 'Brought him on to build our procurement platform from scratch. He ended up designing the entire user flow and shipped it faster than we expected. The kind of person who sees what you actually need, not just what you asked for.',
    image: '',
    rating: 5,
  },
  {
    name: 'Fatmata J.',
    role: 'Managing Partner',
    company: 'FJ Legal Associates',
    quote: 'We needed a professional site that made us look credible. Chernor delivered exactly that — clean design, works on every device, and clients actually find us through it now. Worth every penny.',
    image: '',
    rating: 5,
  },
  {
    name: 'Samuel T.',
    role: 'Project Coordinator',
    company: 'Nakam Gaming',
    quote: 'The gaming platform he built handles real-time multiplayer, wallet systems, and tournament brackets — all working smoothly. Before, we were duct-taping things together. Massive upgrade for us.',
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
