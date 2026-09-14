export interface PersonalDetails {
  name: string;
  shortName: string;
  title: string;
  subtitle: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  objective: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  score: string;
  period: string;
  location: string;
  description: string;
}

export interface TechnicalSkills {
  languages: string[];
  frameworks: string[];
  databases: string[];
  tools: string[];
  aiTools: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  type: string;
  points: string[];
  technologies: string[];
}

export interface ProjectCaseStudy {
  problem: string;
  architecture: string[];
  features: string[];
}

export interface ProjectItem {
  number: string;
  name: string;
  tech: string[];
  period: string;
  category: string;
  description: string;
  metrics: string[];
  images: {
    col1: string[];
    col2: string;
  };
  link: string;
  liveLink?: string;
  swaggerLink?: string;
  githubLink?: string;
  caseStudy?: ProjectCaseStudy;
}

export interface CertificationItem {
  name: string;
  provider: string;
}
