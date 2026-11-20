export interface TechSkill {
  id: string;
  name: string;
  category: "ai" | "fullstack" | "cloud";
  proficiency: "Expert" | "Production" | "Advanced" | "Daily Driver";
  experience: string;
  description: string;
  projects?: { id: string; name: string }[];
  inverted?: boolean;
  featured?: boolean;
}

export interface SpecimenColumn {
  id: "ai" | "fullstack" | "cloud";
  number: string;
  title: string;
  subtitle: string;
  note: string;
  skills: TechSkill[];
}

export const TECH_SPECIMENS: SpecimenColumn[] = [
  {
    id: "ai",
    number: "01",
    title: "AI / ML",
    subtitle: "Intelligence & Neural Systems",
    note: "Foundation models, fine-tuning, retrieval, agent orchestration.",
    skills: [
      {
        id: "pytorch",
        name: "PyTorch",
        category: "ai",
        proficiency: "Advanced",
        experience: "2+ yrs",
        description:
          "Deep learning tensor computation, neural network prototyping, and custom embedding extraction pipelines.",
        inverted: true,
        featured: true,
      },
      {
        id: "huggingface",
        name: "Hugging Face",
        category: "ai",
        proficiency: "Production",
        experience: "2+ yrs",
        description:
          "Transformer models, tokenizers, open-weight LLM fine-tuning, and offline inference setups.",
        inverted: false,
        featured: true,
      },
      {
        id: "langchain",
        name: "LangChain",
        category: "ai",
        proficiency: "Expert",
        experience: "Production",
        description:
          "Multi-agent orchestration, structured output generation, dynamic tool calling, and enterprise RAG workflows.",
        projects: [
          { id: "workflow-automation", name: "Workflow Automation" },
        ],
        inverted: false,
        featured: true,
      },
      {
        id: "llamaindex",
        name: "LlamaIndex",
        category: "ai",
        proficiency: "Production",
        experience: "Production",
        description:
          "Hierarchical data indexing, hybrid dense/sparse retrieval, and context augmentation for enterprise documents.",
        inverted: false,
        featured: true,
      },
      {
        id: "vllm",
        name: "vLLM",
        category: "ai",
        proficiency: "Advanced",
        experience: "1+ yr",
        description:
          "High-throughput LLM serving using PagedAttention, continuous batching, and low-latency token streaming.",
        inverted: true,
        featured: false,
      },
      {
        id: "ollama",
        name: "Ollama",
        category: "ai",
        proficiency: "Production",
        experience: "Daily Driver",
        description:
          "Local quantized model inference (Llama 3, DeepSeek, Mistral) for privacy-first prototyping and zero-leakage development.",
        inverted: false,
        featured: false,
      },
      {
        id: "chromadb",
        name: "ChromaDB",
        category: "ai",
        proficiency: "Production",
        experience: "Production",
        description:
          "Lightweight vector embedding storage, metadata filtering, and semantic candidate retrieval in AI search applications.",
        projects: [
          { id: "resumelens", name: "ResumeLens" },
        ],
        inverted: false,
        featured: true,
      },
      {
        id: "qdrant",
        name: "Qdrant",
        category: "ai",
        proficiency: "Advanced",
        experience: "1+ yr",
        description:
          "Production-grade vector database with fast hybrid search, payload indexing, and high-dimensional clustering.",
        inverted: false,
        featured: false,
      },
      {
        id: "openai-api",
        name: "OpenAI API",
        category: "ai",
        proficiency: "Expert",
        experience: "Daily Driver",
        description:
          "GPT-4o, custom tool calling, structured JSON outputs, streaming completions, and vector embeddings.",
        projects: [
          { id: "smartops", name: "SmartOps" },
        ],
        inverted: true,
        featured: true,
      },
      {
        id: "anthropic-api",
        name: "Anthropic API",
        category: "ai",
        proficiency: "Production",
        experience: "Daily Driver",
        description:
          "Claude 3.5 Sonnet integrations for multi-modal reasoning, complex code generation, and prompt caching pipelines.",
        inverted: false,
        featured: false,
      },
      {
        id: "fastapi",
        name: "FastAPI",
        category: "ai",
        proficiency: "Expert",
        experience: "Daily Driver",
        description:
          "High-performance asynchronous Python REST backends, streaming WebSockets, and Pydantic validation for AI services.",
        projects: [
          { id: "workflow-automation", name: "Workflow Automation" },
          { id: "smartops", name: "SmartOps" },
          { id: "resumelens", name: "ResumeLens" },
        ],
        inverted: false,
        featured: true,
      },
      {
        id: "python",
        name: "Python",
        category: "ai",
        proficiency: "Expert",
        experience: "Core Language",
        description:
          "Primary language for AI engineering, asynchronous services, scientific data processing, and enterprise automation.",
        projects: [
          { id: "workflow-automation", name: "Workflow Automation" },
          { id: "smartops", name: "SmartOps" },
          { id: "resumelens", name: "ResumeLens" },
          { id: "cris", name: "CRIS" },
        ],
        inverted: false,
        featured: true,
      },
    ],
  },
  {
    id: "fullstack",
    number: "02",
    title: "Full-Stack",
    subtitle: "Architecture & Client-Server",
    note: "Type-safe APIs, reactive UIs, real-time sync, component systems.",
    skills: [
      {
        id: "typescript",
        name: "TypeScript",
        category: "fullstack",
        proficiency: "Expert",
        experience: "Daily Driver",
        description:
          "Strict type system contracts, generic abstractions, and end-to-end type safety from server actions to client components.",
        projects: [
          { id: "smartops", name: "SmartOps" },
        ],
        inverted: true,
        featured: true,
      },
      {
        id: "nextjs",
        name: "Next.js 15",
        category: "fullstack",
        proficiency: "Expert",
        experience: "Daily Driver",
        description:
          "App Router, React Server Components (RSC), server actions, dynamic routing, and edge API route optimization.",
        projects: [
          { id: "smartops", name: "SmartOps" },
        ],
        inverted: false,
        featured: true,
      },
      {
        id: "react",
        name: "React 19",
        category: "fullstack",
        proficiency: "Expert",
        experience: "Daily Driver",
        description:
          "Composable component trees, reactive state primitives, custom hooks, and concurrent rendering features.",
        projects: [
          { id: "workflow-automation", name: "Workflow Automation" },
          { id: "resumelens", name: "ResumeLens" },
        ],
        inverted: false,
        featured: true,
      },
      {
        id: "nodejs",
        name: "Node.js",
        category: "fullstack",
        proficiency: "Production",
        experience: "3+ yrs",
        description:
          "Asynchronous runtime for building high-speed microservices, streaming endpoints, and dev tooling.",
        inverted: false,
        featured: true,
      },
      {
        id: "tailwindcss",
        name: "Tailwind CSS",
        category: "fullstack",
        proficiency: "Expert",
        experience: "Daily Driver",
        description:
          "Design system tokenization, dark/light themes, bespoke micro-interactions, and responsive layout craftsmanship.",
        projects: [
          { id: "smartops", name: "SmartOps" },
        ],
        inverted: true,
        featured: true,
      },
      {
        id: "graphql",
        name: "GraphQL",
        category: "fullstack",
        proficiency: "Production",
        experience: "2+ yrs",
        description:
          "Schema-first query definitions, Apollo client caching, and precise relational data overfetching prevention.",
        inverted: false,
        featured: false,
      },
      {
        id: "rest-apis",
        name: "REST APIs",
        category: "fullstack",
        proficiency: "Expert",
        experience: "Daily Driver",
        description:
          "Scalable OpenAPI contracts, semantic HTTP status codes, structured JSON error handling, and secure auth headers.",
        projects: [
          { id: "workflow-automation", name: "Workflow Automation" },
        ],
        inverted: false,
        featured: true,
      },
      {
        id: "websockets",
        name: "WebSockets",
        category: "fullstack",
        proficiency: "Production",
        experience: "2+ yrs",
        description:
          "Bidirectional real-time message streams for live AI token streaming, agent status pulses, and reactive UI sync.",
        inverted: false,
        featured: false,
      },
      {
        id: "postgresql",
        name: "PostgreSQL",
        category: "fullstack",
        proficiency: "Expert",
        experience: "Daily Driver",
        description:
          "Relational schema design, complex JOINs, ACID transactions, and pgvector extension for high-performance embeddings.",
        projects: [
          { id: "workflow-automation", name: "Workflow Automation" },
          { id: "smartops", name: "SmartOps" },
        ],
        inverted: true,
        featured: true,
      },
      {
        id: "prisma",
        name: "Prisma",
        category: "fullstack",
        proficiency: "Production",
        experience: "2+ yrs",
        description:
          "Type-safe ORM with automated migration management, relation modeling, and declarative schema syncing.",
        inverted: false,
        featured: false,
      },
      {
        id: "redis",
        name: "Redis",
        category: "fullstack",
        proficiency: "Production",
        experience: "2+ yrs",
        description:
          "In-memory caching layer, rate limiter token buckets, session storage, and Pub/Sub message broker.",
        inverted: false,
        featured: true,
      },
      {
        id: "shadcn",
        name: "shadcn/ui",
        category: "fullstack",
        proficiency: "Expert",
        experience: "Daily Driver",
        description:
          "Accessible, headless Radix primitives styled with modern Tailwind CSS for sleek editorial interfaces.",
        inverted: false,
        featured: true,
      },
    ],
  },
  {
    id: "cloud",
    number: "03",
    title: "Cloud & Infra",
    subtitle: "DevOps & Production Scale",
    note: "Containerization, CI/CD, orchestration, observable architectures.",
    skills: [
      {
        id: "docker",
        name: "Docker",
        category: "cloud",
        proficiency: "Expert",
        experience: "Daily Driver",
        description:
          "Multi-stage Dockerfiles, image size reduction, reproducible container environments, and microservice orchestration.",
        projects: [
          { id: "workflow-automation", name: "Workflow Automation" },
          { id: "cris", name: "CRIS" },
        ],
        inverted: true,
        featured: true,
      },
      {
        id: "kubernetes",
        name: "Kubernetes",
        category: "cloud",
        proficiency: "Advanced",
        experience: "1+ yr",
        description:
          "Declarative workload manifests, pod scaling, configmaps/secrets, and ingress routing.",
        inverted: false,
        featured: false,
      },
      {
        id: "aws",
        name: "AWS",
        category: "cloud",
        proficiency: "Production",
        experience: "2+ yrs",
        description:
          "EC2 instances, S3 storage buckets, IAM least-privilege security roles, and CloudWatch metrics.",
        inverted: false,
        featured: true,
      },
      {
        id: "gcp",
        name: "GCP",
        category: "cloud",
        proficiency: "Production",
        experience: "2+ yrs",
        description:
          "Google Cloud Platform services, Cloud Run serverless container hosting, and Vertex AI model endpoints.",
        inverted: false,
        featured: false,
      },
      {
        id: "linux",
        name: "Linux",
        category: "cloud",
        proficiency: "Expert",
        experience: "Daily Driver",
        description:
          "Ubuntu/Debian environment configuration, Bash shell scripting, process management, and secure SSH tunnels.",
        inverted: true,
        featured: true,
      },
      {
        id: "git",
        name: "Git",
        category: "cloud",
        proficiency: "Expert",
        experience: "Daily Driver",
        description:
          "Version control, atomic commits, branch workflows, interactive rebase, and code review governance.",
        inverted: false,
        featured: true,
      },
      {
        id: "github-actions",
        name: "GitHub Actions",
        category: "cloud",
        proficiency: "Production",
        experience: "2+ yrs",
        description:
          "Continuous integration and delivery pipelines, automated unit test suites, linting, and automated preview deploys.",
        inverted: false,
        featured: true,
      },
      {
        id: "celery",
        name: "Celery",
        category: "cloud",
        proficiency: "Expert",
        experience: "Production",
        description:
          "Asynchronous distributed task queue for heavy batch background jobs, document parsing, and scheduled tasks.",
        projects: [
          { id: "workflow-automation", name: "Workflow Automation" },
        ],
        inverted: false,
        featured: true,
      },
      {
        id: "nginx",
        name: "Nginx",
        category: "cloud",
        proficiency: "Production",
        experience: "2+ yrs",
        description:
          "Reverse proxy routing, SSL/TLS certificate termination, gzip compression, and rate-limiting load balancing.",
        inverted: true,
        featured: false,
      },
      {
        id: "supabase",
        name: "Supabase",
        category: "cloud",
        proficiency: "Production",
        experience: "2+ yrs",
        description:
          "Managed serverless PostgreSQL, Row Level Security (RLS), instant OAuth authentication, and edge functions.",
        inverted: false,
        featured: true,
      },
      {
        id: "vercel",
        name: "Vercel",
        category: "cloud",
        proficiency: "Expert",
        experience: "Daily Driver",
        description:
          "Edge network deployments, instant zero-config preview environments, and global CDN asset distribution.",
        inverted: false,
        featured: true,
      },
      {
        id: "cloudflare",
        name: "Cloudflare",
        category: "cloud",
        proficiency: "Production",
        experience: "2+ yrs",
        description:
          "Global DNS management, edge workers, SSL enforcement, and DDoS traffic protection.",
        inverted: false,
        featured: false,
      },
    ],
  },
];
