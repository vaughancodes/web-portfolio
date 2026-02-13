export interface Profile {
  name: string;
  role: string;
  location: string;
  bio: string;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface Project {
  name: string;
  description: string;
  tech: string[];
  url: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  details: string;
}

export interface ContactInfo {
  label: string;
  value: string;
  icon: string;
}

export const profile: Profile = {
  name: "Daniel Vaughan",
  role: "Senior Software Engineer",
  location: "West Lafayette, IN",
  bio: `Senior software engineer specializing in backend infrastructure, cloud-native systems, and developer tooling. I build RESTful APIs, design scalable infrastructure on AWS, and containerize everything with Kubernetes and Docker. Skilled at translating complex technical workflows for non-technical audiences and collaborating across teams to ship reliable, maintainable software.`,
};

export const asciiBanner = [
  ` ____              _      _  __     __                 _`,
  `|  _ \\  __ _ _ __ (_) ___| | \\ \\   / /_ _ _   _  __ _| |__   __ _ _ __`,
  `| | | |/ _\` | '_ \\| |/ _ \\ |  \\ \\ / / _\` | | | |/ _\` | '_ \\ / _\` | '_ \\`,
  `| |_| | (_| | | | | |  __/ |   \\ V / (_| | |_| | (_| | | | | (_| | | | |`,
  `|____/ \\__,_|_| |_|_|\\___|_|    \\_/ \\__,_|\\__,_|\\__, |_| |_|\\__,_|_| |_|`,
  `                                                 |___/`,
];

export const danielBanner = [
  ` ____              _      _`,
  `|  _ \\  __ _ _ __ (_) ___| |`,
  `| | | |/ _\` | '_ \\| |/ _ \\ |`,
  `| |_| | (_| | | | | |  __/ |`,
  `|____/ \\__,_|_| |_|_|\\___|_|`,
];

export const vaughanBanner = [
  `__     __                 _`,
  `\\ \\   / /_ _ _   _  __ _| |__   __ _ _ __`,
  ` \\ \\ / / _\` | | | |/ _\` | '_ \\ / _\` | '_ \\`,
  `  \\ V / (_| | |_| | (_| | | | | (_| | | | |`,
  `   \\_/ \\__,_|\\__,_|\\__, |_| |_|\\__,_|_| |_|`,
  `                    |___/`,
];

export const bannerColors = [
  "#F87171",
  "#DC2626",
  "#B91C1C",
  "#DC2626",
  "#F87171",
  "#FCA5A5",
];

export const experiences: Experience[] = [
  {
    title: "Senior Software Engineer",
    company: "Inari Agriculture",
    period: "Jun 2021 — Present",
    description:
      "Backend infrastructure, API development, and cloud platform engineering.",
    highlights: [
      "Develops RESTful APIs utilizing Flask, SQLAlchemy, PostgreSQL, Celery, and Redis for streamlined computational jobs and data access",
      "Containerizes API servers and Celery workers for deployment on Kubernetes (EKS) with Helm",
      "Utilizes AWS services (RDS, EKS, ECR, S3) to increase service scalability and availability",
      "Develops CI/CD workflows with CircleCI for quick turnaround during development",
      "Designs CLI tools and API endpoints using Argo for job orchestration on Kubernetes",
      "Architects per-account infrastructure using Terraform for state management and separation of sensitive data",
      "Worked with external consultants on IaC modules for cross-region and cross-account data redundancy",
    ],
  },
  {
    title: "Senior Analyst & Developer",
    company: "RSA AFCC (Dell-EMC subsidiary)",
    period: "Jan 2019 — May 2021",
    description: "Internal tooling and international anti-fraud operations.",
    highlights: [
      "Developed web-based internal tools for quality assurance with full SQL database connectivity and email reports",
      "Worked as part of an international team, contacting CERTs and hosting providers worldwide to meet client needs",
    ],
  },
  {
    title: "Senior Capstone Project — Minecraft",
    company: "Mojang Studios",
    period: "Aug 2020 — Dec 2020",
    description: "Collaborated with Mojang on Minecraft's save system.",
    highlights: [
      "Researched plausible updates to Minecraft's save system for more efficient data access and resilience against data loss",
      "Began implementations of save system updates in C++ for utilization in further development",
    ],
  },
];

export const projects: Project[] = [
  {
    name: "Triarb Detector",
    description:
      "Tool for detecting triangular arbitrage opportunities across multiple crypto exchanges.",
    tech: ["Python", "ccxt", "NetworkX"],
    url: "github.com/vaughancodes/triarb-detector",
  },
  {
    name: "Do I Own It?",
    description:
      "Web application for tracking owned physical media.",
    tech: ["Python", "Flask", "SQLAlchemy", "PostgreSQL"],
    url: "github.com/vaughancodes/do-i-own-it",
  },
  {
    name: "Suipi",
    description:
      "Web-based, mobile/desktop compatible implementation of the Samoan card game, Suipi.",
    tech: ["Python", "Flask", "SQLAlchemy", "PostgreSQL"],
    url: "github.com/vaughancodes/Suipi",
  },
  {
    name: "SSH Portfolio",
    description:
      "A terminal-based portfolio served over SSH, built with Go and the Charm ecosystem.",
    tech: ["Go", "Wish", "Bubble Tea", "Lip Gloss"],
    url: "github.com/vaughancodes/ssh-portfolio",
  },
  {
    name: "Web Portfolio",
    description:
      "This very site! A React-based terminal-themed portfolio inspired by the SSH version.",
    tech: ["React", "TypeScript", "Vite"],
    url: "github.com/vaughancodes/web-portfolio",
  },
  {
    name: "Arduino UNO CW Keyer",
    description:
      "Sketches and diagrams for utilizing an Arduino UNO (or compatibles) as a CW keyer.",
    tech: ["C++", "Arduino"],
    url: "github.com/vaughancodes/arduino-uno-cw-keyer",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    skills: ["Python", "C/C++", "SQL", "Bash"],
  },
  {
    category: "Cloud & Infrastructure",
    skills: [
      "AWS (EC2, EKS, RDS, ECR, S3)",
      "Kubernetes",
      "Docker",
      "Terraform",
      "Helm",
    ],
  },
  {
    category: "Tools & Platforms",
    skills: ["Argo", "CircleCI", "Sysdig", "ELK", "Git"],
  },
  {
    category: "Frameworks & Libraries",
    skills: ["Flask", "SQLAlchemy", "Celery", "Redis", "PostgreSQL"],
  },
  {
    category: "Soft Skills",
    skills: [
      "Technical Communication",
      "Stakeholder Collaboration",
      "Cross-team Coordination",
    ],
  },
];

export const education: Education[] = [
  {
    degree: "B.S. Computer Science",
    institution: "Purdue University, West Lafayette, IN",
    period: "May 2021",
    details: "Focus in Software Engineering and Security.",
  },
];

export const contacts: ContactInfo[] = [
  { label: "Email", value: "daniel@vaughan.codes", icon: "✉" },
  { label: "Phone", value: "(336) 380-3600", icon: "☎" },
  { label: "Office", value: "(765) 201-4560", icon: "☏" },
  { label: "Portfolio", value: "vaughan.codes", icon: "⌂" },
  { label: "GitHub", value: "github.com/vaughancodes", icon: "◆" },
  { label: "LinkedIn", value: "linkedin.com/in/vaughancodes", icon: "∞" },
  { label: "Location", value: "West Lafayette, IN", icon: "◉" },
];

export const tabs = [
  "About",
  "Experience",
  "Projects",
  "Education",
  "Skills",
  "Contact",
] as const;

export type TabName = (typeof tabs)[number];

export function urlFor(label: string, value: string): string | null {
  switch (label) {
    case "Email":
      return `mailto:${value}`;
    case "Phone":
    case "Office":
      return `tel:${value.replace(/[^+\d]/g, "")}`;
    case "GitHub":
    case "LinkedIn":
      return `https://${value}`;
    default:
      return null;
  }
}
