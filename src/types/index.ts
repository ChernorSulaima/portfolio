export interface Skill {
  name: string;
  percentage: number;
}

export interface ExtraSkill {
  name: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface PersonalInfo {
  age: number;
  residence: string;
  freelanceStatus: string;
  address: string;
}

export interface Language {
  name: string;
  percentage: number;
}

export interface Service {
  title: string;
  description: string;
  icon: string;
  items: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
  type: 'internship' | 'contract' | 'full-time';
}

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  repoUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  role?: string;
  problem?: string; // For Case Studies
  solution?: string; // For Case Studies
  keyFeatures?: string[]; // List of specific features
}