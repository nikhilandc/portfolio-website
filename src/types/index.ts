import { Database } from './supabase';

export interface NavItem {
  name: string;
  href: string;
}

export interface Skill {
  name: string;
  level: number;
  category: 'technical' | 'soft' | 'tools';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoLink?: string;
  githubLink?: string;
  price?: number;
  purchaseLink?: string;
  features?: string[];
  documentation?: string;
  isSellable?: boolean;
}

export interface Hackathon {
  id: string;
  name: string;
  date: string;
  position: string;
  description: string;
  image?: string;
  projectLink?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

export interface SiteContent {
  hero: {
    title: string;
    subtitle: string;
    backgroundImage?: string;
  };
  about: {
    title: string;
    description: string;
    image?: string;
  };
  skills: Skill[];
  projects: Project[];
  hackathons: Hackathon[];
  education: Education[];
  resumeLink: string;
  contact: {
    email: string;
    phone?: string;
    linkedin?: string;
    github?: string;
  };
}

export type { Database };