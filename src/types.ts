export enum UserRole {
  ADMIN = "Admin",
  MANAGER = "Manager",
  MEMBER = "Member"
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  status: "Active" | "Inactive" | "Suspended";
  joinedAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error" | "ai";
  time: string;
  read: boolean;
}

export interface Activity {
  id: string;
  userId: string;
  userName: string;
  action: string;
  target: string;
  category: "system" | "automation" | "security" | "collab";
  timestamp: string;
}

export interface KanbanTask {
  id: string;
  title: string;
  description: string;
  column: "backlog" | "todo" | "in_progress" | "review" | "done";
  priority: "low" | "medium" | "high" | "critical";
  assignee: {
    name: string;
    avatar: string;
  };
  dueDate: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  category: "neural_mesh" | "core_sync" | "team" | "release";
  description: string;
}

export interface FileEntry {
  id: string;
  name: string;
  size: string;
  type: "document" | "image" | "model" | "log";
  updatedAt: string;
  url?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  author: string;
  authorTitle: string;
  authorAvatar: string;
  category: string;
  readTime: string;
}

export interface JobOpening {
  id: string;
  title: string;
  department: "engineering" | "product" | "research" | "growth";
  location: string;
  type: "Full-Time" | "Contract" | "RemoteOnly";
  salary: string;
  description: string;
}

export interface DocSection {
  id: string;
  title: string;
  content: string;
  category: "get_started" | "core_architecture" | "ai_agents" | "api_reference";
}

export interface Integration {
  id: string;
  name: string;
  description: string;
  category: "cloud" | "analytics" | "collaboration" | "security";
  connected: boolean;
  avatar: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "neural_ai";
  text: string;
  timestamp: string;
  tokensUsed?: number;
}
