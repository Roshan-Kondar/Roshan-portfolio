export interface Project {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  badge: string;
  description: string;
  role: string;
  ownership: string;
  stack: string[];
  externalUrl?: string;
  isCaseStudy: boolean;
  caseStudyDetails?: {
    challenge: string;
    approach: { step: string; detail: string }[];
    impactMetric: {
      before: string;
      after: string;
      summary: string;
    };
  };
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  isCurrent?: boolean;
  isEducation?: boolean;
  score?: string;
  description: string;
}

export interface SkillCategory {
  title: string;
  subtitle: string;
  primary: string[];
  secondary: string[];
}

export const PORTFOLIO_DATA = {
  name: "Roshan Deepak Kondar",
  shortName: "Roshan",
  headline: "Full Stack Developer",
  roleTitle: "Full Stack Developer",
  location: "Mumbai, India",
  company: "Jayster Corporate",
  companyRole: "Full Stack & Cloud Intern",
  copyrightYear: "2026",
  email: "roshankondar321@gmail.com",
  socials: {
    github: "https://github.com/Roshan-Kondar",
    linkedin: "https://www.linkedin.com/in/roshan-kondar-3200ab258",
    instagram: "",
    upwork: "",
  },
  watermarkCode: [
    "def build_rag():",
    "    embeddings = OpenAIEmbeddings()",
    "    vectorstore = Chroma.from_documents(docs, embeddings)",
    "    retriever = vectorstore.as_retriever(search_kwargs={'k': 4})",
    "    chain = RetrievalQA.from_chain_type(llm, retriever=retriever)",
    "    return chain.run(query)",
    "",
    "async def handle_agent_stream(prompt: str):",
    "    pipeline = AgentExecutor(agent=react_agent, tools=tools)",
    "    async for event in pipeline.astream_events(prompt):",
    "        yield event['data']",
    "",
    "const createMotionPipeline = (springConfig) => {",
    "    return useSpring(targetValue, springConfig);",
    "};",
  ],
  skills: [
    {
      title: "AI & Machine Learning",
      subtitle: "RAG Pipelines, Embeddings & Semantic Search, Evaluation",
      primary: [
        "Python",
        "LangChain",
        "LlamaIndex",
        "FastAPI",
        "PyTorch",
        "OpenAI API",
        "Hugging Face",
      ],
      secondary: [
        "RAG Pipelines",
        "Vector Databases",
        "ChromaDB",
        "Pinecone",
        "Semantic Search",
        "Prompt Engineering",
        "Model Fine-Tuning",
        "Transformers",
      ],
    },
    {
      title: "Languages & Frameworks",
      subtitle: "REST API Design, LLM Integration, Full-Stack Builds",
      primary: [
        "TypeScript",
        "Next.js",
        "React",
        "Node.js",
        "FastAPI",
        "Tailwind CSS",
      ],
      secondary: [
        "JavaScript (ES6+)",
        "RESTful APIs",
        "GraphQL",
        "HTML5 / Modern CSS",
        "Redux Toolkit",
        "Responsive Architecture",
        "WebSockets",
      ],
    },
    {
      title: "Tools, Databases & Cloud",
      subtitle: "Predictive Modeling, Data Processing, Deployment",
      primary: [
        "PostgreSQL",
        "Git & GitHub",
        "Docker",
        "Linux",
        "Pandas",
        "Vercel",
      ],
      secondary: [
        "MongoDB",
        "Redis",
        "AWS (S3/EC2)",
        "CI/CD Pipelines",
        "Supabase",
        "Prisma ORM",
        "Postman",
        "Scikit-learn",
      ],
    },
  ] as SkillCategory[],

  projects: [
    {
      id: "kaamdone",
      title: "KaamDone",
      subtitle: "Cloud Office Management SaaS · First Prize, Magic Bus NGO",
      tag: "Cloud SaaS",
      badge: "🥇 First Prize",
      description:
        "Led and built a full office management platform in 1 month with separate Admin and Employee portals — task manager, channels, AI HR, attendance, and voice service. Won First Prize at Magic Bus NGO (AWS Cloud Computing).",
      role: "Lead Full-Stack & Cloud Developer",
      ownership: "Hackathon Project · Team",
      stack: [
        "React",
        "AWS Amplify",
        "Cognito",
        "Node.js",
        "Elastic Beanstalk",
        "DynamoDB",
        "Route 53",
        "CloudFront",
        "CodePipeline",
        "EC2",
        "Docker",
        "LiveKit",
        "OpenRouter AI",
      ],
      isCaseStudy: true,
      caseStudyDetails: {
        challenge:
          "Build a full-featured cloud office management platform in one month for the Magic Bus NGO AWS Cloud Computing hackathon.",
        approach: [
          {
            step: "1. Architecture",
            detail:
              "Designed separate Admin and Employee portals with Cognito auth, React on AWS Amplify, and Node.js on Elastic Beanstalk with a Load Balancer.",
          },
          {
            step: "2. Database",
            detail:
              "Modelled 16 DynamoDB tables covering tasks, channels, attendance, roles, and HR data.",
          },
          {
            step: "3. AI & Voice",
            detail:
              "Integrated AI HR assistant via OpenRouter API. Separate voice service on EC2 + Docker + LiveKit (voice connection built by teammate).",
          },
          {
            step: "4. CI/CD & DNS",
            detail:
              "Set up CodePipeline for automated deployments; Route 53 + CloudFront for global distribution and CDN.",
          },
        ],
        impactMetric: {
          before: "No solution",
          after: "Full cloud SaaS in 1 month",
          summary:
            "Won First Prize at Magic Bus NGO, AWS Cloud Computing category",
        },
      },
    },
    {
      id: "kalastra",
      title: "Kalastra",
      subtitle: "Clothing E-Commerce · kalastrastyle.com (live)",
      tag: "E-Commerce",
      badge: "Live in Production",
      description:
        "Real e-commerce site for a local clothing brand, live and used in production. Built the full concept, UI/frontend and database. Teammate handled coupon logic and Razorpay payment integration.",
      role: "Frontend & Database Developer",
      ownership: "Team of 2 · 1 month",
      stack: [
        "React.js",
        "Express.js",
        "Supabase",
        "Amazon S3",
        "CloudFront",
        "Hostinger",
        "Razorpay",
      ],
      externalUrl: "https://kalastrastyle.com",
      isCaseStudy: false,
    },
    {
      id: "gaming-cafe",
      title: "Gaming Cafe Management",
      subtitle: "In live use at gaming cafes",
      tag: "Desktop App",
      badge: "In Live Use",
      description:
        "All-in-one software used by gaming cafes in real time to run the business and track revenue and growth. Built the concept, entire UI/frontend and database. Available to demonstrate live.",
      role: "Frontend & Database Developer",
      ownership: "Team of 2 · 3 months",
      stack: ["React", "Vite", "Node.js", "Firebase"],
      isCaseStudy: true,
      caseStudyDetails: {
        challenge:
          "Gaming cafes needed a single piece of software to manage sessions, pricing, and revenue tracking in real time — no such tool existed for them.",
        approach: [
          {
            step: "1. Concept & UI",
            detail:
              "Designed and built the full concept, UI, and frontend with React + Vite for a fast, real-time feel.",
          },
          {
            step: "2. Database",
            detail:
              "Used Firebase for real-time data sync across concurrent sessions and stations throughout the cafe.",
          },
          {
            step: "3. Collaboration",
            detail:
              "Teammate built the pricing calculator logic; I owned the concept, UI, and all database integration end-to-end.",
          },
        ],
        impactMetric: {
          before: "Manual pen & paper tracking",
          after: "Real-time digital management",
          summary: "Software is in active live use at gaming cafes",
        },
      },
    },
  ] as Project[],

  experience: [
    {
      id: "jayster",
      role: "Full Stack & Cloud Intern",
      company: "Jayster Corporate",
      location: "Remote",
      period: "Nov 2025 – Present",
      isCurrent: true,
      description:
        "Remote internship in full-stack development and cloud at an NSDC & MSME recognised company. Certificate issued Jan 2026.",
    },
    {
      id: "eargs",
      role: "Full Stack Web Developer / Cloud Intern",
      company: "Eargs Learning Solutions Pvt. Ltd.",
      location: "Remote",
      period: "Feb 2026 (122 hrs)",
      description:
        "Worked with React, TypeScript, Express.js, PostgreSQL, Docker; exposure to Microsoft server management and private cloud applications.",
    },
    {
      id: "aerozone",
      role: "Full Stack Developer Intern",
      company: "Aerozone",
      location: "Remote",
      period: "Completed Mar 2026",
      description:
        "Full-stack, UI/UX and API integration: built GSAP and Three.js web experiences, implemented React validation hooks, and set up GitHub Actions CI/CD pipelines.",
    },
    {
      id: "msc-cs",
      role: "M.Sc. Computer Science",
      company: "Kirti M. Doongursee College (Autonomous), Dadar, Mumbai",
      location: "Mumbai, India",
      period: "2026 – 2028 (pursuing)",
      isEducation: true,
      description: "Currently pursuing M.Sc. in Computer Science.",
    },
    {
      id: "bsc-cs",
      role: "B.Sc. Computer Science",
      company: "K.V. Pendharkar College (Autonomous), Dombivli (East)",
      location: "Maharashtra, India",
      period: "2023 – 2026",
      isEducation: true,
      score: "8.8 CGPA – First Class with Distinction",
      description: "Graduated with First Class with Distinction, 8.8 CGPA.",
    },
  ] as ExperienceItem[],
};
