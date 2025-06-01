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