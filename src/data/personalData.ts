import { ExtraSkill, Language, PersonalInfo, Service, Skill, SocialLink } from '../types';

export const personalInfo: PersonalInfo = {
  age: 24,
  residence: 'Sierra Leone',
  freelanceStatus: 'Available',
  address: 'Freetown, Sierra Leone',
};

export const languages: Language[] = [
  { name: 'English', percentage: 100 },
  { name: 'Spanish', percentage: 80 },
  { name: 'French', percentage: 60 },
];

export const skills: Skill[] = [
  { name: 'HTML', percentage: 95 },
  { name: 'CSS', percentage: 90 },
  { name: 'JavaScript', percentage: 85 },
  { name: 'React', percentage: 80 },
  { name: 'TypeScript', percentage: 75 },
  { name: 'Node.js', percentage: 70 },
];

export const extraSkills: ExtraSkill[] = [
  { name: 'Bootstrap, Tailwind CSS' },
  { name: 'Sass, Less' },
  { name: 'Webpack, Vite' },
  { name: 'Git, GitHub' },
];

export const socialLinks: SocialLink[] = [
  { platform: 'GitHub', url: 'https://github.com/ChernorSulaima', icon: 'Github' },
  { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/chernor-sulaiman-jalloh-0a9854366?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', icon: 'Linkedin' },
  { platform: 'Twitter', url: 'https://x.com/ThisisChizo?t=rf7QoOkMek_U4hqFSIp_Lg&s=09', icon: 'Twitter' },
  { platform: 'Instagram', url: 'https://www.instagram.com/thisischizo?igsh=MTN6amYzcDllZWR1eA==', icon: 'Instagram' },
];

export const services: Service[] = [
  {
    title: 'Web Development',
    description: 'Building modern, responsive websites and web applications',
    icon: 'Code2',
    items: ['Frontend Development', 'Responsive Design', 'Web Applications'],
  },
  {
    title: 'UI/UX Design',
    description: 'Creating intuitive user interfaces and experiences',
    icon: 'Layout',
    items: ['Mobile App Design', 'Website Design', 'Prototyping'],
  },
  {
    title: 'App Development',
    description: 'Developing cross-platform mobile applications',
    icon: 'Smartphone',
    items: ['React Native', 'iOS & Android', 'App Maintenance'],
  },
  {
    title: 'Content Creation',
    description: 'Creating engaging digital content for your brand',
    icon: 'FileText',
    items: ['Technical Writing', 'Documentation', 'Blog Posts'],
  },
];

export const bioInfo = {
  name: 'Chernor S. Jalloh',
  title: 'Software Engineer',
  description: 'I design and develop experiences that make people\'s lives simpler through Web and Mobile apps. I work with TypeScript, React, and other modern libraries and frameworks.',
};