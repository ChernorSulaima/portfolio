import { Experience, ExtraSkill, Language, PersonalInfo, Project, Service, Skill, SocialLink } from '../types';

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
  { name: 'PostgreSQL', percentage: 20 },
  { name: 'GraphQL', percentage: 30 },
  { name: 'AWS Services', percentage: 25 },
];

export const extraSkills: ExtraSkill[] = [
  { name: 'Microsoft 365 Suite' },
  { name: 'Google Workspace Administration' },
  { name: 'AI Tools & Prompt Engineering' },
  { name: 'Authentication (Auth.js/Clerk)' },
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
];

export const experience: Experience[] = [
  {
    company: 'KNS (Knowledge Network Solutions)',
    role: 'Frontend Developer (Intern)',
    period: 'Internship',
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
    period: 'Present',
    description: 'Delivering high-impact web solutions for diverse clients, focusing on performance and scalability.',
    achievements: [
      'Built and deployed 4 production-grade applications for international and local clients.',
      'Managed full SDLC from requirements gathering to Vercel deployment.',
      'Specialized in migrating legacy businesses to modern digital workflows.',
    ],
    type: 'contract',
  },
];

export const projects: Project[] = [
  {
    id: 1,
    title: 'SLFA Official League Hub',
    category: 'Sports Tech',
    role: 'Lead Developer',
    description: 'A dynamic platform for the Sierra Leone Football Association, automation league tables, match results, and player profiles.',
    problem: 'Manual data entry for league stats was error-prone and slow.',
    solution: 'Engineered a custom CMS that auto-calculates standings and generates SEO-friendly player pages in real-time.',
    image: '/images/slfa.png',
    technologies: ['React', 'TypeScript', 'Tailwind', 'Real-time Data'],
    featured: true,
    keyFeatures: ['Automated Standings', 'Player Profiles', 'Match Management'],
    liveUrl: 'https://slfa.vercel.app',
  },
  {
    id: 2,
    title: 'Intercontinental Agents',
    category: 'Corporate',
    role: 'Full Stack Developer',
    description: 'A professional digital presence for a global agency, featuring service showcases and contact workflows.',
    problem: 'The agency needed a modern, trustworthy web identity to attract international partners.',
    solution: 'Delivered a high-performance, accessible website with seamless navigation and strong brand aesthetics.',
    image: '/images/intercontinental.png',
    technologies: ['React', 'Framer Motion', 'Responsive Design'],
    featured: true,
    keyFeatures: ['Global Brand Identity', 'Service Catalog', 'Contact Integration'],
    liveUrl: 'https://intercontinentalagents.vercel.app/',
  },
];

export const bioInfo = {
  name: 'Chernor S. Jalloh',
  title: 'Software Engineer', // Updated tagline
  description: 'Software Engineer building secure, high-performance web apps. Specialized in React, TypeScript, and modern digital experiences.',
  socialLinks,
  profileImage: '/images/Chernor_1MB_HighQuality.jpg',
  projects: projects, // Linking the projects
  experience: experience, // Linking the experience
};