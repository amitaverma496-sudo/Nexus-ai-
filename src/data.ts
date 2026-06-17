import { User, UserRole, Notification, Activity, KanbanTask, CalendarEvent, FileEntry, BlogPost, JobOpening, DocSection, Integration } from "./types";

export const FAQ_DATA = [
  {
    v: "q1",
    q: "What is NeuralOS and how does it differ from traditional cloud operating systems?",
    a: "NeuralOS is a specialized, distributed enterprise cognition engine. Traditional operating systems manage hardware; NeuralOS compiles, executes, and orchestrates large-scale autonomous agent graphs, workflow models, and multi-tenant security layers smoothly over existing virtualization layers."
  },
  {
    v: "q2",
    q: "How does the built-in Gemini workflow automation builder operate?",
    a: "Our visual graph interface allows you to sequence prompts, schema transformations, and vector memory synchronization. These run natively as compiled pipeline networks with strict validation constraints on the Express/Node service."
  },
  {
    v: "q3",
    q: "Can I connect my private database clusters to NeuralOS?",
    a: "Absolutely. With our secure VPC integrations, you can route structured outputs into isolated Postgres, Cloud SQL, Spanner, or NoSQL databases leveraging pre-negotiated OAuth scopes or encrypted direct connections."
  },
  {
    v: "q4",
    q: "How does role-based security manage prompt poisoning or data leaks?",
    a: "Each agent node functions inside strict execution sandboxes. NeuralOS implements inline prompt filters, strict API schema validations, and role-based ACL token restrictions across Admin, Manager, and Member layers to prevent data egress."
  },
  {
    v: "q5",
    q: "Is there local offline caching support?",
    a: "Yes. All operational state, user profiles, Kanban tasks, and system preferences are persisted securely inside standard clientside LocalStorage and synchronize incrementally upon detecting internet coverage."
  }
];

export const INTEGRATIONS: Integration[] = [
  {
    id: "gcp",
    name: "Google Cloud Platform",
    description: "Orchestrate direct Cloud Run, Spanner, and Firestore allocations.",
    category: "cloud",
    connected: true,
    avatar: "G"
  },
  {
    id: "slack",
    name: "Slack Grid",
    description: "Broadcast workspace telemetry cards and trigger interactive agent prompts.",
    category: "collaboration",
    connected: true,
    avatar: "S"
  },
  {
    id: "github",
    name: "GitHub Enterprise",
    description: "Pull repository contexts and parse issues straight into agent sprints.",
    category: "collaboration",
    connected: false,
    avatar: "H"
  },
  {
    id: "datadog",
    name: "Datadog Diagnostics",
    description: "Relay sub-second token latencies and inference performance limits.",
    category: "analytics",
    connected: false,
    avatar: "D"
  },
  {
    id: "supabase",
    name: "Supabase DB",
    description: "Map real-time pgvector queries into your active Neural workspaces.",
    category: "security",
    connected: true,
    avatar: "V"
  },
  {
    id: "notion",
    name: "Notion Workspace",
    description: "Automate technical documentation sync directly from company journals.",
    category: "collaboration",
    connected: false,
    avatar: "N"
  }
];

export const JOB_OPENINGS: JobOpening[] = [
  {
    id: "j1",
    title: "AIs-to-AIs Network Infrastructure Engineer",
    department: "engineering",
    location: "San Francisco, CA / Remote",
    type: "Full-Time",
    salary: "$180,000 - $240,000 + Equity",
    description: "Optimize high-throughput, latency-sensitive agent-to-agent mesh protocols and distributed websocket broker servers."
  },
  {
    id: "j2",
    title: "Human-Agent Symbiosis Frontend Architect",
    department: "product",
    location: "New York, NY / Hybrid",
    type: "Full-Time",
    salary: "$165,000 - $210,000",
    description: "Build breathtaking, sub-millisecond, visual operating environments using React 19, custom canvas loops, and WebGL state engines."
  },
  {
    id: "j3",
    title: "Linguistic Compiler & Parser Researcher",
    department: "research",
    location: "Zurich, CH / Remote Available",
    type: "Full-Time",
    salary: "CHF 190,000 - 250,000",
    description: "Develop formal compilers that map structural diagrams directly down into deterministic LLM system specifications."
  },
  {
    id: "j4",
    title: "Global Enterprise Growth Advocate",
    department: "growth",
    location: "Tokyo, JP",
    type: "Full-Time",
    salary: "¥16,000,000",
    description: "Accelerate global expansion by assisting fortune 500 partners through full-stack AI transformation sprints."
  }
];

export const DOC_SECTIONS: DocSection[] = [
  {
    id: "doc1",
    title: "What is NeuralOS?",
    category: "get_started",
    content: "NeuralOS is a premium enterprise-grade solution that transforms standard computing pipelines into dynamic, AI-orchestrated networks. By combining a server-side high-fidelity Express hub with advanced caching, secure local sandboxing, and high-frequency real-time event managers, NeuralOS solves the complexity of scaling cognitive systems. You get custom graphical boards, analytics feeds, and workflow pipelines ready in seconds and configured via professional dashboards."
  },
  {
    id: "doc2",
    title: "Core Architecture Diagram",
    category: "core_architecture",
    content: "The system runs on a classic full-stack architecture. The user interface compiles on React 19 with Vite, bundling stylesheets via Tailwind elements to keep performance high. Backend services utilize Express to secure precious Gemini API token signatures. Our websocket server supports streaming tokens directly back to the active client frame. High-performance caching layers read and store local states to sustain user settings, documents, and logs seamlessly."
  },
  {
    id: "doc3",
    title: "Managing Autonomous Agents",
    category: "ai_agents",
    content: "Each autonomous agent runs in an isolated context loop called a Cognition Space. Agents can write script fragments, trigger integrations (Datadog, Slack, GitHub), call search tools, and organize database columns automatically. You can allocate a specialized system profile or prompt directly from the active Admin Portal to change agent task scopes on the fly."
  },
  {
    id: "doc4",
    title: "API Endpoint Reference",
    category: "api_reference",
    content: "### NeuralOS REST API\n\n- `POST /api/gemini/chat` passes chat objects securely using our system instructions to ensure answers remain helpful for developers.\n- `POST /api/gemini/generate` performs rapid copywriting schema transformations on structured layout parameters.\n- All request headers require explicit authentication authorization bearers mapped dynamically in the Auth component views."
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "b1",
    slug: "rearchitecting-microservices-into-agents",
    title: "Rearchitecting Microservices into Decentralized Agent Networks",
    excerpt: "Why the monolithic microservices API patterns of the 2010s are failing visual LLM workflows, and how agent grids reduce latency.",
    category: "System Engineering",
    publishedAt: "June 12, 2026",
    author: "Serena Thorne",
    authorTitle: "VP of Engineering at NeuralOS",
    authorAvatar: "ST",
    content: "Traditional microservice paradigms are heavily optimized for static tabular schemas. However, cognitive systems require heavy multi-modal parsing, high-frequency context-window expansion, and non-linear task graph scheduling. Mappings that used to take dozens of separate microservices are now compressed into a single dynamic Cognition Space running in server containers. In this detailed analysis, we demonstrate how we achieved an 82% reduction in message traffic and increased average prompt validation speed significantly.",
    readTime: "7 min read"
  },
  {
    id: "b2",
    slug: "securing-enterprise-llm-sandboxes",
    title: "Empirical Security: Designing Robust LLM Prompt Sandboxes",
    excerpt: "A rigorous look at threat vectors in LLM-driven operating dashboards, role bypass mitigations, and cross-site script preventions.",
    category: "Security",
    publishedAt: "May 28, 2026",
    author: "Dominic Vance",
    authorTitle: "Lead Security Architect",
    authorAvatar: "DV",
    content: "Integrating Generative AI models into client interfaces exposes applications to diverse threats: input prompt hijacking, indirect data leaks, and code execution attacks. To safeguard operations, our core network introduces automated sanitation pipelines before requests are proxied server-side. Combined with rigid Role-Based Access Controls (RBAC) stored clientside and checked upon every API request, NeuralOS completely isolates admin interfaces from potential poisoning.",
    readTime: "12 min read"
  },
  {
    id: "b3",
    slug: "visualizing-complex-agentic-graphs-performance",
    title: "Ultra-Performance Rendering of Dynamic Agent Graphs in React 19",
    excerpt: "How we render recursive visual nodes with thousands of concurrent rendering events on the screen under 60fps budget lines.",
    category: "Frontend Web",
    publishedAt: "April 15, 2026",
    author: "Luna Vance",
    authorTitle: "Principal Frontend Engineer",
    authorAvatar: "LV",
    content: "Rendering state-driven canvases in React becomes slow during heavy DOM tree manipulation. By structuring our layouts inside lightweight SVGs, stripping out deep render loops, memoizing critical visual metrics, and running lightweight CSS grids, we can drive rich data visualizations without exhausting browser resources. Here are the precise math equations and requestAnimationFrame setups used.",
    readTime: "9 min read"
  }
];

export const TESTIMONIALS = [
  {
    name: "Alexander Mercer",
    title: "Principal Architect, CloudScale Inc",
    text: "NeuralOS is the paradigm shift we've waited for. It replaced our complex custom LangChain deployment with a secure, incredibly polished workspace that simply worked out-of-the-box. The performance and visuals are unmatched.",
    avatar: "AM"
  },
  {
    name: "Dr. Clara Sheng",
    title: "Director of Cognitive Systems, AI21 Research",
    text: "We integrated NeuralOS across four analytics projects. The speed with which we can deploy interactive Kanban pipelines mapped to server-driven Gemini schemas has saved our engineering team thousands of hours. The design is breathtaking.",
    avatar: "CS"
  },
  {
    name: "Marcus Vance",
    title: "Founder & CTO, HyperVecta",
    text: "Light/Dark state controls, local persistent caches, and top-tier user roles are standard in NeuralOS. For any tech organization looking to expose highly functional dashboards to their clients, this is the gold standard.",
    avatar: "MV"
  }
];

export const TRUST_BADGES = [
  "Microsoft Cloud Partner", "Intel Enterprise Approved", "Stripe Verified Engine", "SOC2 Type II Certified", "IEEE Intelligent Systems Node"
];

export const INITIAL_USERS: User[] = [
  { id: "u1", name: "Amit Verma", email: "amitaverma496@gmail.com", avatar: "AV", role: UserRole.ADMIN, status: "Active", joinedAt: "2026-06-01" },
  { id: "u2", name: "Sarah Connor", email: "connor.s@neuralos.net", avatar: "SC", role: UserRole.MANAGER, status: "Active", joinedAt: "2026-05-12" },
  { id: "u3", name: "David Peterson", email: "pete.david@scale.io", avatar: "DP", role: UserRole.MEMBER, status: "Active", joinedAt: "2026-06-11" },
  { id: "u4", name: "John Doe", email: "j.doe@sandbox.co", avatar: "JD", role: UserRole.MEMBER, status: "Inactive", joinedAt: "2026-02-14" },
  { id: "u5", name: "Elena Rostova", email: "rostov.e@kgb.com", avatar: "ER", role: UserRole.ADMIN, status: "Suspended", joinedAt: "2026-04-01" }
];

export const INITIAL_KANBAN: KanbanTask[] = [
  { id: "k1", title: "Scale WebSocket Gateway Layers", description: "Increase max connection sizes from 10k to 50k channels utilizing local clusters.", column: "in_progress", priority: "critical", assignee: { name: "Amit Verma", avatar: "AV" }, dueDate: "2026-06-25" },
  { id: "k2", title: "Standardize Custom Prompt Checkers", description: "Audit prompt injections and sanitize outputs before sending request strings.", column: "todo", priority: "high", assignee: { name: "Sarah Connor", avatar: "SC" }, dueDate: "2026-07-02" },
  { id: "k3", title: "Vercel Direct Egress Connectors", description: "Map out local schema pipelines straight to NextJS templates.", column: "backlog", priority: "low", assignee: { name: "David Peterson", avatar: "DP" }, dueDate: "2026-08-11" },
  { id: "k4", title: "Compile Build System Extensions", description: "Inject local dynamic bundle compression rules during script generations.", column: "review", priority: "medium", assignee: { name: "John Doe", avatar: "JD" }, dueDate: "2026-06-20" },
  { id: "k5", title: "Light & Dark Mode Integration", description: "Implement high-fidelity tailwind structures with immediate local storage bindings.", column: "done", priority: "high", assignee: { name: "Amit Verma", avatar: "AV" }, dueDate: "2026-06-15" }
];

export const INITIAL_EVENTS: CalendarEvent[] = [
  { id: "e1", title: "Neural Mesh Sync Session", start: "2026-06-17T10:00:00", end: "2026-06-17T11:30:00", category: "neural_mesh", description: "Analyze performance loops across model nodes." },
  { id: "e2", title: "Weekly Core Compilation Update", start: "2026-06-19T14:00:00", end: "2026-06-19T15:00:00", category: "core_sync", description: "Assemble release logs and verify standard permissions." },
  { id: "e3", title: "Team Strategy Alignment", start: "2026-06-22T09:00:00", end: "2026-06-22T10:30:00", category: "team", description: "Examine customer conversion limits and product showcase cards." }
];

export const INITIAL_FILES: FileEntry[] = [
  { id: "f1", name: "neural_layer_structure.bin", size: "142.4 MB", type: "model", updatedAt: "2026-06-16 09:22" },
  { id: "f2", name: "workflow_blueprint.yaml", size: "42 KB", type: "document", updatedAt: "2026-06-17 07:11" },
  { id: "f3", name: "enterprise_audit_log_q2.json", size: "1.2 MB", type: "log", updatedAt: "2026-06-15 17:42" },
  { id: "f4", name: "hero_particle_vector.png", size: "2.4 MB", type: "image", updatedAt: "2026-06-10 11:00" }
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  { id: "n1", title: "AI Sync Completed", message: "Successfully executed neural layout sync with 99.8% precision.", type: "ai", time: "10 mins ago", read: false },
  { id: "n2", title: "System Login Event", message: "New admin session authorized from IP 192.168.1.101.", type: "info", time: "1 hour ago", read: false },
  { id: "n3", title: "Deployment Active", message: "Vercel integration connector booted successfully.", type: "success", time: "4 hours ago", read: true },
  { id: "n4", title: "Critical Latency Warning", message: "Node-4 in Zurich reporting pipeline saturation (Latency > 420ms).", type: "warning", time: "1 day ago", read: true }
];

export const INITIAL_ACTIVITIES: Activity[] = [
  { id: "a1", userId: "u1", userName: "Amit Verma", action: "Authorized new user integration", target: "GCP VPC Connection", category: "security", timestamp: "2026-06-17T07:14:00" },
  { id: "a2", userId: "u2", userName: "Sarah Connor", action: "Updated task column to 'Review'", target: "Build Compiler Task", category: "collab", timestamp: "2026-06-17T06:55:00" },
  { id: "a3", userId: "u3", userName: "David Peterson", action: "Uploaded file to Grid Vault", target: "neural_layer_structure.bin", category: "system", timestamp: "2026-06-16T18:42:00" },
  { id: "a4", userId: "u1", userName: "Amit Verma", action: "Created system workflow automation", target: "Gemini Content Generator Grid", category: "automation", timestamp: "2026-06-16T15:22:00" }
];
