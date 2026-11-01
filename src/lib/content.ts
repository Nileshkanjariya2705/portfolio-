export const person = {
  name: "Nilesh Kanjariya",
  email: "nileshkanjariya2705@gmail.com",
  phone: "+91 83209 82232",
  github: "https://github.com/Nileshkanjariya2705",
  linkedin: "https://linkedin.com/in/nilesh-kanjariya/",
  location: "Ahmedabad, India",
};

export type Project = {
  slug: string;
  name: string;
  label: string;
  category: string;
  summary: string;
  description: string;
  purpose: string;
  solution: string;
  contribution: string;
  features: string[];
  stack: string[];
  image?: string;
  imageAlt?: string;
  live?: string;
  theme: string;
  number: string;
};

export const projects: Project[] = [
  {
    slug: "brainros",
    name: "Brainros",
    label: "One platform. Every academic workflow.",
    category: "SAAS / EDTECH",
    number: "01",
    theme: "brainros",
    summary:
      "A multi-tenant platform bringing coaching institutes, examinations, and student performance together.",
    description:
      "Brainros is a B2B coaching and exam management platform that helps institutes manage academic operations, students, batches, examinations, billing, and performance in one place.",
    purpose:
      "Coaching institutes need connected tools for managing students, running examinations, and understanding academic performance without fragmented manual processes.",
    solution:
      "A multi-tenant SaaS application with institute-specific workflows, automated exam evaluation, performance reporting, subscriptions, and real-time exam progress.",
    contribution:
      "Full-stack development, database architecture, frontend development, backend APIs, authentication, payment integration, background processing, real-time functionality, and application testing.",
    features: [
      "Multi-tenant institute management",
      "Institute registration and authentication",
      "Student invitations and management",
      "Batch and class management",
      "Subject and chapter management",
      "Online examination scheduling",
      "Question paper management",
      "Automated examination evaluation",
      "Student ranking and performance analysis",
      "PDF report generation",
      "Institute billing and subscriptions",
      "Razorpay payment integration",
      "Redis and BullMQ background processing",
      "Real-time examination progress with Socket.IO",
      "Gemini AI-powered translation",
      "Role-based authentication and authorization",
    ],
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "Redux Toolkit",
      "TanStack Query",
      "NestJS",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "BullMQ",
      "Socket.IO",
      "Razorpay",
      "Twilio OTP",
      "Gemini API",
      "Jest",
      "Playwright",
      "k6",
    ],
    live: "https://brainros.com",
  },
  {
    slug: "property-platform",
    name: "Property & vacation rentals",
    label: "Less managing. More possibilities.",
    category: "PROPERTY / AUTOMATION",
    number: "02",
    theme: "property",
    summary:
      "A connected rental platform for bookings, property operations, smart devices, and owner payouts.",
    description:
      "A full-stack property management and vacation rental platform for the United States market, designed to help owners manage properties, amenities, availability, bookings, and smart devices.",
    purpose:
      "Rental operations involve coordinating availability, guest communications, device access, and payments across different services.",
    solution:
      "A connected property platform with booking coordination, configurable event-driven automation, smart lock and thermostat integrations, and rental payment workflows.",
    contribution:
      "Full-stack development, backend architecture, frontend implementation, database design, booking workflows, third-party integrations, payment processing, and automation development.",
    features: [
      "Property listing and management",
      "Property amenities management",
      "Booking and availability management",
      "Calendar-based booking coordination",
      "Event-driven automation workflows",
      "Configurable triggers and webhooks",
      "Automated email and SMS notifications",
      "Smart lock and thermostat integrations",
      "Seam IoT API integration",
      "Calendly API integration",
      "Rental payment processing",
      "Owner payouts",
      "Commission and revenue splitting",
      "Role-based access control",
    ],
    stack: [
      "React",
      "TypeScript",
      "Redux Toolkit",
      "Node.js",
      "Express",
      "NestJS",
      "PostgreSQL",
      "Prisma",
      "REST APIs",
      "Webhooks",
      "Razorpay",
      "Seam API",
      "Calendly API",
    ],
  },
  {
    slug: "procurement-platform",
    name: "S&S Procurement",
    label: "Better connections. Smarter procurement.",
    category: "B2B / MARKETPLACE",
    number: "03",
    theme: "procurement",
    summary:
      "A B2B marketplace connecting buyer requests with competitive supplier quotations.",
    description:
      "A B2B procurement and quotation marketplace where buyers create production requests for quotations and sellers submit competitive quotes through a centralized system.",
    purpose:
      "Buyers and sellers need a clear, centralized way to coordinate production requests, submit quotations, and compare competitive offers.",
    solution:
      "Role-specific buyer and seller workflows, RFQ management, quotation submissions, and real-time bid comparison backed by a relational database and secure APIs.",
    contribution:
      "Full-stack development, buyer and seller workflows, database design, backend APIs, authentication, authorization, and quotation comparison functionality.",
    features: [
      "Buyer and seller management",
      "RFQ creation and management",
      "Seller quotation submission",
      "Competitive quotation comparison",
      "Real-time bid comparison",
      "JWT authentication",
      "Role-based access control",
      "Relational database architecture",
    ],
    stack: [
      "React",
      "TypeScript",
      "Redux Toolkit",
      "TanStack Query",
      "NestJS",
      "Node.js",
      "PostgreSQL",
      "Sequelize",
      "REST APIs",
      "JWT",
      "RBAC",
    ],
  },
  {
    slug: "shred-himalayas",
    name: "Shred Himalayas",
    label: "Adventure starts with an experience.",
    category: "TRAVEL / WEB EXPERIENCE",
    number: "04",
    theme: "shred",
    summary:
      "A premium digital home for Himalayan adventures, curated experiences, and personalized trips.",
    description:
      "A travel and adventure website showcasing premium Himalayan experiences across Kashmir, from skiing and snowboarding to trekking, sightseeing, rentals, and transportation.",
    purpose:
      "Adventure travelers need an inviting way to explore experiences, understand available services, and plan a personalized Himalayan trip.",
    solution:
      "A responsive travel website with curated experience listings, tour packages, an image gallery, and contact and trip-planning sections.",
    contribution: "Website design and development.",
    features: [
      "Premium travel website",
      "Adventure experience listings",
      "Skiing and snowboarding experiences",
      "Himalayan trekking experiences",
      "Kashmir sightseeing",
      "Travel and tour packages",
      "Adventure equipment rentals",
      "Transportation services",
      "Image gallery",
      "About and team sections",
      "Contact and trip planning",
      "Responsive website experience",
    ],
    stack: ["Technology stack to be confirmed"],
    image: "/projects/shred-himalayas.webp",
    imageAlt: "Screenshot of the public Shred Himalayas website",
    live: "https://shredhimalayas.com",
  },
];

export const services = [
  {
    icon: "panels",
    title: "Custom web applications",
    description:
      "Purpose-built applications that turn complex business requirements into clear, intuitive experiences.",
    tags: "Web apps · Responsive interfaces",
  },
  {
    icon: "layers",
    title: "SaaS product development",
    description:
      "From your first product idea to multi-tenant platforms with subscriptions, billing, and role-based access.",
    tags: "Multi-tenancy · Subscriptions",
  },
  {
    icon: "terminal",
    title: "Full stack development",
    description:
      "Connected frontend and backend development, from database architecture to the final interaction.",
    tags: "Frontend · Backend · Databases",
  },
  {
    icon: "database",
    title: "Backend & API engineering",
    description:
      "Reliable systems, thoughtful data models, and secure APIs built to support your product as it grows.",
    tags: "NestJS · Node.js · PostgreSQL",
  },
  {
    icon: "store",
    title: "Marketplaces & booking",
    description:
      "Bring people and businesses together through procurement, rental, quotation, and booking platforms.",
    tags: "B2B platforms · Booking systems",
  },
  {
    icon: "sparkles",
    title: "AI & agentic workflows",
    description:
      "Practical AI features, multi-agent workflows, custom MCP servers, and plugins connected to real business needs.",
    tags: "Agentic AI · MCP · LLM integration",
  },
  {
    icon: "workflow",
    title: "Business automation",
    description:
      "Make everyday operations easier with event-driven workflows, background jobs, and notifications.",
    tags: "Webhooks · Queues · Workers",
  },
  {
    icon: "plug",
    title: "Third-party integrations",
    description:
      "Connect payments, OTP, scheduling, and smart devices into one dependable product experience.",
    tags: "Payments · IoT · External APIs",
  },
];

export const skillGroups = [
  {
    title: "Frontend",
    skills: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Redux Toolkit",
      "TanStack Query",
      "TanStack Table",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
    ],
  },
  {
    title: "Backend",
    skills: [
      "Node.js",
      "NestJS",
      "Express.js",
      "Spring Boot",
      "REST APIs",
      "Webhooks",
      "Java",
      "JavaScript",
    ],
  },
  {
    title: "Data & real-time",
    skills: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Prisma",
      "Sequelize",
      "Redis",
      "BullMQ",
      "RabbitMQ",
      "WebSockets",
      "Socket.IO",
    ],
  },
  {
    title: "AI & agents",
    skills: [
      "Agentic AI",
      "Multi-Agent Orchestration",
      "Sub-Agent Orchestration",
      "MCP Servers",
      "Custom AI Plugins",
      "Reusable Agent Skills",
      "Gemini API",
      "Prompt Engineering",
      "LLM Integration",
    ],
  },
  {
    title: "Security & integrations",
    skills: [
      "JWT",
      "RBAC",
      "Google OAuth2",
      "Session Authentication",
      "Razorpay",
      "Twilio OTP",
      "Seam IoT API",
      "Calendly API",
    ],
  },
  {
    title: "Testing & delivery",
    skills: ["Jest", "Playwright", "k6", "Docker", "Git", "GitHub", "Postman"],
  },
];

export const steps = [
  {
    title: "Understand the business",
    description:
      "We start with your idea, your users, and what success means for your business.",
  },
  {
    title: "Plan the right foundation",
    description:
      "Define the scope, architecture, data model, and milestones before development begins.",
  },
  {
    title: "Design & develop",
    description:
      "Build thoughtful interfaces and dependable backend systems with usability and security in mind.",
  },
  {
    title: "Connect & automate",
    description:
      "Bring payments, APIs, notifications, and background workflows into the experience.",
  },
  {
    title: "Test the details",
    description:
      "Check critical user journeys, API reliability, and application performance.",
  },
  {
    title: "Launch & keep improving",
    description:
      "Deploy, configure the production environment, and support the next stage of your product.",
  },
];
