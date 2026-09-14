import {
  PersonalDetails,
  EducationItem,
  TechnicalSkills,
  ExperienceItem,
  ProjectItem,
  CertificationItem,
} from '@/types/portfolio';

export const personalDetails: PersonalDetails = {
  name: "REETESH PRAJAPATI",
  shortName: "REETESH",
  title: "Full-Stack Developer",
  subtitle: "Java | Spring Boot | React.js",
  location: "Indore, Madhya Pradesh, India",
  phone: "+91-7240954668",
  email: "reeteshprajapati16@gmail.com",
  linkedin: "https://www.linkedin.com/in/reetesh-prajapati-3ba513280/",
  github: "https://github.com/reeteshprajapati",
  objective:
    "Motivated and self-driven full-stack developer with hands-on experience building web applications using Java, Spring Boot, and React.js. Adept at delivering clean, maintainable code and collaborating with cross-functional teams. Seeking an opportunity to leverage technical skills and grow professionally in a challenging software development role.",
};

export const education: EducationItem[] = [
  {
    institution: "Rajiv Gandhi Proudyogiki Vishwavidyalay",
    degree: "B.Tech",
    score: "CGPA: 8.0",
    period: "10/2022 – 06/2026",
    location: "Bhopal, MP",
    description:
      "Bachelor of Technology with focus on Computer Science, Software Engineering principles, Data Structures, and Database Management.",
  },
  {
    institution: "Emmanuel High Secondary School",
    degree: "12th – PCM",
    score: "Percentage: 69%",
    period: "07/2021 – 03/2022",
    location: "Sagar, MP",
    description: "Higher Secondary Education in Physics, Chemistry, and Mathematics.",
  },
];

export const technicalSkills: TechnicalSkills = {
  languages: ["Java", "Python", "JavaScript", "HTML", "CSS"],
  frameworks: ["React.js", "React 19", "Spring Boot 3", "Tailwind CSS v4", "Collections Framework"],
  databases: ["SQL", "MySQL", "PostgreSQL", "H2 Database"],
  tools: ["VS Code", "IntelliJ IDEA", "Git", "GitHub", "Docker", "WebRTC", "Kafka", "Vercel", "Render", "Swagger UI"],
  aiTools: ["Groq LLM / AI API", "Lovable AI", "Cursor AI", "Bolt AI"],
};

export const experiences: ExperienceItem[] = [
  {
    role: "SDE Intern",
    company: "VidyaGxp Pvt Ltd",
    period: "07/2026 – Present",
    type: "Indore – On-site",
    points: [
      "Currently exploring and contributing to real-time software projects, gaining hands-on experience with modern web development practices and industry workflows.",
      "Collaborating with the development team to understand API integration, Git workflows, debugging, and code maintenance in real-world applications.",
      "Actively learning project requirements, development standards, and best practices while contributing to ongoing feature development and issue resolution.",
    ],
    technologies: ["React.js", "Java", "Spring Boot", "Git Workflow", "REST APIs"],
  },
  {
    role: "Front-End Developer Intern",
    company: "UDM Techno Solution",
    period: "03/2026 – 06/2026",
    type: "Indore – On-site",
    points: [
      "Built and deployed 3+ client-facing web interfaces using React.js and TailwindCSS, improving page load efficiency by 20% through component optimization.",
      "Integrated 5+ REST APIs with backend developers to deliver seamless data flow and resolve UI-related bugs across multiple projects.",
      "Maintained and enhanced existing client-side features, contributing to a 15% reduction in reported UI issues over the internship period.",
    ],
    technologies: ["React.js", "TailwindCSS", "REST APIs", "Component Optimization"],
  },
  {
    role: "Java Developer Intern",
    company: "Learning Education Hub",
    period: "08/2025 – 10/2025",
    type: "Bhopal – On-site",
    points: [
      "Developed 2+ dynamic web applications using Java Servlets for backend processing, handling form submissions and session management.",
      "Designed structured database schemas and executed CRUD operations in MySQL, managing data for over 500+ records across projects.",
      "Created accessible, cross-browser-compatible web pages using HTML and CSS, ensuring consistent rendering across major browsers.",
    ],
    technologies: ["Java Servlets", "MySQL", "CRUD", "HTML5/CSS3", "JSP"],
  },
];

export const projects: ProjectItem[] = [
  {
    number: "01",
    name: "FastConnect (DevCommunity) — AI Matchmaking & Web3 Bounty Platform",
    tech: ["React 19", "Vite", "Tailwind CSS v4", "WebRTC", "Framer Motion", "Kafka", "gRPC", "Envoy", "PostgreSQL"],
    period: "03/2026",
    category: "React & Web3",
    description:
      "Enterprise-grade developer social collaboration platform engineered for real-time AI matchmaking, WebRTC peer-to-peer pair programming rooms, open-source project discovery, and Web3/fiat bounty escrow.",
    metrics: [
      "AI-Powered Developer Matchmaking analyzing skills, tech stacks, time zones & collaboration goals",
      "WebRTC Peer-to-Peer Pair Rooms for ultra-low latency interactive code & audio/video streams",
      "React 19 & Vite SPA architecture with React.lazy() route splitting optimizing initial TTFB",
      "Distributed microservices design (Envoy Gateway, Kafka Event Streaming, Polyglot Persistence)",
    ],
    images: {
      col1: [
        "/fastconnect.jpg",
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
      ],
      col2: "/fastconnect.jpg",
    },
    link: "https://github.com/reeteshprajapati",
    githubLink: "https://github.com/reeteshprajapati",
    caseStudy: {
      problem:
        "Global developers face friction discovering compatible co-founders/pair programmers, lack real-time collaborative coding environments, and need trusted escrow systems for Web3 bounties.",
      architecture: [
        "Distributed Microservices Mesh: Zero-trust Istio microservices architecture with Envoy API Gateway, SPIFFE/SPIRE mTLS authentication, and gRPC/REST transcoding.",
        "Polyglot Persistence Layer: Multi-database strategy leveraging PostgreSQL for identity, Neo4j/Postgres Graph for social connections, CockroachDB for financial ledgers, and Redis 7 clusters for L2 caching.",
        "Lazy-Loaded Pipeline: Route & component level code-splitting in App.jsx using React.lazy() and Suspense to lower initial bundle size and page render times.",
      ],
      features: [
        "AI Developer Matchmaking Engine: Intelligent similarity matching algorithm analyzing skill sets and time zones",
        "WebRTC Pair Programming Rooms: Real-time collaborative audio/video & interactive code sessions",
        "Web3 & Fiat Bounty Escrow: Smart contract escrow engine for open-source bounties & milestone rewards",
        "Global Developer Graph & Communities: Rich user profiles, skill tags, project showcases & interactive feeds",
      ],
    },
  },
  {
    number: "02",
    name: "CampusGuard — Real-Time Campus Safety & Emergency Platform",
    tech: ["Spring Boot 3", "Java 17", "React 18", "Groq AI", "Tailwind CSS v4", "MySQL", "Docker", "JWT", "Swagger"],
    period: "03/2026",
    category: "Spring Boot & React",
    description:
      "An enterprise-grade, full-stack campus emergency management platform built with Spring Boot, React, and Groq AI, featuring real-time incident dispatching, geolocation tagging, and automated threat triage.",
    metrics: [
      "Groq AI Triage Engine for automated emergency risk scoring & immediate safety protocols",
      "SOS Dispatch & 5-second polling architecture (usePolling) without WebSocket overhead",
      "Strict lifecycle state machine (REPORTED ➔ RESOLVED ➔ CLOSED) with immutable audit logs",
      "Containerized microservices with Docker & deployed live across Vercel (Frontend) & Render (Backend)",
    ],
    images: {
      col1: [
        "/campusguard.jpg",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
      ],
      col2: "/campusguard.jpg",
    },
    link: "https://campussecuritysystem.vercel.app/",
    liveLink: "https://campussecuritysystem.vercel.app/",
    swaggerLink: "https://campusemergencysystem-2.onrender.com/swagger-ui.html",
    githubLink: "https://github.com/reeteshprajapati",
    caseStudy: {
      problem:
        "On university campuses, delayed emergency reporting and lack of centralized incident visibility can compromise student safety and slow down security response times.",
      architecture: [
        "Resilient Polling vs. WebSockets: Implemented a controlled polling architecture (usePolling hook polling /api/incidents/active every 5 seconds) with automatic lifecycle cleanup and error retry logic.",
        "Groq AI Triage: Built an automated AI endpoint /api/ai/analyze that receives raw emergency descriptions and outputs risk severity, potential hazards, and recommended officer response strategies.",
        "Strict Auditability: Created a dual-audit data model (IncidentHistory tracking status changes + AuditLog tracking user actions) ensuring compliance for institutional security audits.",
      ],
      features: [
        "Student SOS Portal: One-Tap Emergency Broadcast with Geolocation API, Live Status Tracker, 24/7 AI Safety Chatbot",
        "Security Command Center: Live-Updating Grid, State Machine Workflow, Incident History & Audit Timeline",
        "Executive Admin Dashboard: Recharts Data Visualizations, User & Department RBAC CRUD, Security Audit Logging",
      ],
    },
  },
  {
    number: "03",
    name: "Weather Web Application",
    tech: ["Java", "Servlet", "JSP", "OpenWeather API", "Gson"],
    period: "01/2026",
    category: "Full Stack Java",
    description:
      "Built a dynamic weather web application using Java Servlets and JSP, integrating OpenWeather API to display real-time weather data for 200+ global cities.",
    metrics: [
      "200+ Global Cities real-time weather tracking",
      "40% reduction in manual data-handling code using Gson JSON parsing",
      "Optimized API response processing speed",
    ],
    images: {
      col1: [
        "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=1200&q=80",
        "https://images.unsplash.com/photo-1504386106331-3e4e71712b38?w=1200&q=80",
      ],
      col2: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=1200&q=80",
    },
    link: "https://github.com/reeteshprajapati",
  },
  {
    number: "04",
    name: "Employee Admin Dashboard",
    tech: ["Java", "Spring Boot", "MySQL", "REST API", "React.js"],
    period: "11/2025",
    category: "Spring Boot & React",
    description:
      "Developed a full-featured Employee Admin System with Spring Boot, implementing 5 core CRUD operations to manage employee records seamlessly.",
    metrics: [
      "5 Core CRUD operations for employee lifecycle",
      "30% reduction in manual data entry time",
      "Secure REST API architecture & MySQL integration",
    ],
    images: {
      col1: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&q=80",
      ],
      col2: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=80",
    },
    link: "https://github.com/reeteshprajapati",
  },
  {
    number: "05",
    name: "Air Flight Reservation System",
    tech: ["Core Java", "OOP", "JDBC", "MySQL"],
    period: "11/2025",
    category: "Backend Java",
    description:
      "Designed and implemented a backend reservation system using Core Java, OOP principles, JDBC, and MySQL, supporting 3+ booking workflows.",
    metrics: [
      "3+ Booking workflows with real-time validations",
      "Robust OOP architecture & secure JDBC connection",
      "Normalized MySQL database schema for flight schedules",
    ],
    images: {
      col1: [
        "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80",
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&q=80",
      ],
      col2: "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1200&q=80",
    },
    link: "https://github.com/reeteshprajapati",
  },
];

export const certifications: CertificationItem[] = [
  { name: "Java Certification", provider: "Comprehensive Java Standard Edition" },
  { name: "TCS iON Career Edge", provider: "Young Professional Program" },
  { name: "Web Development", provider: "Full Stack Web Technologies" },
  { name: "Frontend Development", provider: "React.js & Modern CSS" },
];
