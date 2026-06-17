import React, { useState, useRef, useEffect } from "react";
import { 
  User, UserRole, Notification, Activity, KanbanTask, CalendarEvent, FileEntry, ChatMessage 
} from "../types";
import { 
  Play, Plus, Trash2, Calendar as CalIcon, MessageSquare, Briefcase, FileCode, CheckSquare, Sparkles, 
  Send, BarChart2, Shield, UploadCloud, RefreshCw, Layers, Sliders, Users, ExternalLink, Settings, Download
} from "lucide-react";

interface DashboardViewProps {
  currentUser: User;
  users: User[];
  notifications: Notification[];
  activities: Activity[];
  kanbanTasks: KanbanTask[];
  calendarEvents: CalendarEvent[];
  files: FileEntry[];

  onAddKanbanTask: (task: KanbanTask) => void;
  onUpdateKanbanTask: (id: string, col: KanbanTask["column"]) => void;
  onAddEvent: (ev: CalendarEvent) => void;
  onDeleteEvent: (id: string) => void;
  onAddFile: (file: FileEntry) => void;
  onAddNotification: (notif: Notification) => void;
  onAddActivity: (act: Activity) => void;
}

export default function DashboardView({
  currentUser,
  users,
  notifications,
  activities,
  kanbanTasks,
  calendarEvents,
  files,
  onAddKanbanTask,
  onUpdateKanbanTask,
  onAddEvent,
  onDeleteEvent,
  onAddFile,
  onAddNotification,
  onAddActivity,
}: DashboardViewProps) {
  const [dashTab, setDashTab] = useState<"analytics" | "ai_agents" | "collab" | "kanban" | "calendar" | "files">("analytics");

  // Local Chat / AI Content Creator state
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { id: "1", sender: "neural_ai", text: `Active clearance verified for developer email: ${currentUser.email}. How shall I optimize your workspace cognition grid today?`, timestamp: "08:14" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [generating, setGenerating] = useState(false);

  // Content creator state
  const [promptInput, setPromptInput] = useState("");
  const [createdContent, setCreatedContent] = useState("");
  const [preset, setPreset] = useState<"blog" | "copilot">("copilot");

  // AI Workflow Automation state
  const [workflowNodes, setWorkflowNodes] = useState([
    { id: "wn_1", label: "Read User Query", type: "trigger", icon: MessageSquare, active: true },
    { id: "wn_2", label: "Check Clearance Token Rules", type: "validation", icon: Shield, active: true },
    { id: "wn_3", label: "Execute Gemini Vector Search", type: "process", icon: Sparkles, active: true },
    { id: "wn_4", label: "Store Result in Spanner Cache", type: "output", icon: Layers, active: false }
  ]);

  // Calendar quick creation
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventCat, setNewEventCat] = useState<CalendarEvent["category"]>("neural_mesh");

  // Kanban quick creation
  const [newKanTaskTitle, setNewKanTaskTitle] = useState("");
  const [newKanPriority, setNewKanPriority] = useState<KanbanTask["priority"]>("high");

  // File Manager Upload (Drag-and-Drop + Click states)
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // -------------------------------------------------------------
  // AI CALL handlers connecting to the real node REST APIs we set up
  // -------------------------------------------------------------
  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: "user",
      text: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory(prev => [...prev, userMsg]);
    setChatInput("");
    setGenerating(true);

    try {
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...chatHistory, userMsg],
          systemInstruction: "You are NeuralAI, the premium automated engine. Provide highly technical, professional, structured answers strictly for development use inside NeuralOS."
        })
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setChatHistory(prev => [...prev, {
        id: Math.random().toString(),
        sender: "neural_ai",
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        tokensUsed: data.tokensUsed || 140
      }]);

      onAddNotification({
        id: "notif_chat_" + Math.random(),
        title: "Gemini Sync Completed",
        message: `Processed prompt correctly. Latency optimized successfully.`,
        type: "ai",
        time: "Just now",
        read: false
      });
    } catch (err: any) {
      setChatHistory(prev => [...prev, {
        id: Math.random().toString(),
        sender: "neural_ai",
        text: `Engine Offline Warning: ${err.message || "Failed to contact Gemini cluster."}`,
        timestamp: "Now"
      }]);
    } finally {
      setGenerating(false);
    }
  };

  const handleGenerateContent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim()) return;
    setGenerating(true);

    try {
      const resp = await fetch("/api/gemini/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: promptInput, preset })
      });
      const data = await resp.json();
      setCreatedContent(data.result || "Generation finished with empty outcomes.");
    } catch (err: any) {
      setCreatedContent(`Error during generation: ${err.message}`);
    } finally {
      setGenerating(false);
    }
  };

  // -------------------------------------------------------------
  // File Upload Handlers (Real simulated files uploads)
  // -------------------------------------------------------------
  const handleUploadFileSim = async (name: string, sizeBytes: number, type: string) => {
    try {
      const resp = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: name,
          size: `${(sizeBytes / 1024).toFixed(1)} KB`,
          type
        })
      });
      const data = await resp.json();
      if (data.success) {
        onAddFile(data.file);
        onAddActivity({
          id: "act_" + Math.random(),
          userId: currentUser.id,
          userName: currentUser.name,
          action: "Uploaded system workspace file",
          target: name,
          category: "system",
          timestamp: new Date().toISOString()
        });
        onAddNotification({
          id: "notif_" + Math.random(),
          title: "File Vault Sync",
          message: `${name} has been processed inside container folders.`,
          type: "success",
          time: "Just now",
          read: false
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const fileObj = e.dataTransfer.files[0];
      const category = fileObj.type.includes("image") ? "image" : fileObj.name.endsWith(".json") || fileObj.name.endsWith(".yaml") ? "document" : "log";
      handleUploadFileSim(fileObj.name, fileObj.size, category);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleFileSelectClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileObj = e.target.files[0];
      const category = fileObj.type.includes("image") ? "image" : "document";
      handleUploadFileSim(fileObj.name, fileObj.size, category);
    }
  };

  // Quick Action triggers
  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;
    const newEv: CalendarEvent = {
      id: "ev_" + Math.random(),
      title: newEventTitle,
      start: new Date().toISOString().slice(0, 16),
      end: new Date(Date.now() + 3600000).toISOString().slice(0, 16),
      category: newEventCat,
      description: "Custom user scheduled network log."
    };
    onAddEvent(newEv);
    setNewEventTitle("");
    onAddActivity({
      id: "act_" + Math.random(),
      userId: currentUser.id,
      userName: currentUser.name,
      action: "Scheduled team calendar event",
      target: newEventTitle,
      category: "collab",
      timestamp: new Date().toISOString()
    });
  };

  const handleCreateKanban = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKanTaskTitle.trim()) return;
    const task: KanbanTask = {
      id: "k_" + Math.random(),
      title: newKanTaskTitle,
      description: "Simulated rapid verification checklist.",
      column: "todo",
      priority: newKanPriority,
      assignee: { name: currentUser.name, avatar: currentUser.avatar },
      dueDate: new Date(Date.now() + 86400000 * 3).toISOString().split("T")[0]
    };
    onAddKanbanTask(task);
    setNewKanTaskTitle("");
    onAddActivity({
      id: "act_" + Math.random(),
      userId: currentUser.id,
      userName: currentUser.name,
      action: "Created Kanban task pipeline",
      target: newKanTaskTitle,
      category: "collab",
      timestamp: new Date().toISOString()
    });
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden max-w-7xl mx-auto w-full" id="dashboard-main-frame">
      {/* Real-time Workspace Banner */}
      <div className="p-6 border-b border-white/10 shrink-0 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light text-white tracking-tight">
            Clearance Hub: <span className="font-extrabold">{currentUser.name}</span>
          </h1>
          <p className="text-[11px] font-mono text-[#00D1FF] uppercase tracking-widest mt-1">
            Permission Layer: <span className="text-[#00FF41]">{currentUser.role}</span> • NODE_STATUS_ACTIVE
          </p>
        </div>

        {/* Dashboard top navigational tabs */}
        <div className="flex flex-wrap gap-2 text-xs">
          {[
            { id: "analytics", label: "Analytics Feed", icon: BarChart2 },
            { id: "ai_agents", label: "AI & Workflow", icon: Sparkles },
            { id: "kanban", label: "Kanban Grid", icon: CheckSquare },
            { id: "calendar", label: "Sync Calendar", icon: CalIcon },
            { id: "files", label: "Vault Files", icon: UploadCloud },
            { id: "collab", label: "Operator Hub", icon: Users },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setDashTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer ${dashTab === tab.id ? "bg-[#00D1FF]/10 text-[#00D1FF] border border-[#00D1FF]/30" : "bg-white/5 border border-white/10 text-white/50 hover:text-white"}`}
                id={`dash-tab-btn-${tab.id}`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Primary Dashboard Content Area */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
        {/* -------------------------------------------------------------
            TAB A: REAL-TIME ANALYTICS FEED
            ------------------------------------------------------------- */}
        {dashTab === "analytics" && (
          <div className="space-y-6" id="dashboard-analytics-view">
            {/* Row 1: Summary bento highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
                <span className="text-white/40 text-[10px] tracking-widest uppercase font-mono">Simulated ARR Balance</span>
                <p className="text-4xl font-black text-white tracking-tight mt-2">$4,821,402</p>
                <span className="text-[10px] text-[#00FF41] font-mono font-bold mt-2 inline-flex items-center gap-1">▲ +23% monthly speed</span>
              </div>
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
                <span className="text-white/40 text-[10px] tracking-widest uppercase font-mono">Gemini Token Quota</span>
                <p className="text-4xl font-black text-white tracking-tight mt-2">102.4M</p>
                <span className="text-[10px] text-zinc-500 font-mono mt-2">99.8% prompt safety validation success</span>
              </div>
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
                <span className="text-white/40 text-[10px] tracking-widest uppercase font-mono">Synchronized Devices</span>
                <p className="text-4xl font-black text-white tracking-tight mt-2">8,291</p>
                <span className="text-[10px] text-[#00D1FF] font-mono mt-2">All edge clusters fully operational</span>
              </div>
            </div>

            {/* Row 2: Graph visualization + System Activities */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Custom SVG dynamic chart */}
              <div className="lg:col-span-2 bg-[#020205] border border-white/10 rounded-2xl p-6 relative">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-md font-bold text-white">Interactive Processing Velocity</h3>
                    <p className="text-[11px] text-white/35">Aggregated token execution loops on EMEA pipelines</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="bg-[#00D1FF]/10 text-[#00D1FF] px-2 py-0.5 rounded text-[10px] font-mono">SYNCED</span>
                  </div>
                </div>

                {/* Vector visualization */}
                <div className="h-64 relative w-full flex items-end justify-between px-2 pt-6">
                  {/* Grid lines */}
                  <div className="absolute inset-x-0 top-1/4 h-[0.5px] bg-white/5" />
                  <div className="absolute inset-x-0 top-2/4 h-[0.5px] bg-white/5" />
                  <div className="absolute inset-x-0 top-3/4 h-[0.5px] bg-white/5" />

                  {/* SVG Line representation overlay */}
                  <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <path
                      d="M 0 80 Q 20 40 40 65 T 80 20 T 100 45 L 100 100 L 0 100 Z"
                      fill="url(#flowChartGrad)"
                      opacity="0.15"
                    />
                    <path
                      d="M 0 80 Q 20 40 40 65 T 80 20 T 100 45"
                      fill="none"
                      stroke="#00D1FF"
                      strokeWidth="1.5"
                    />
                    <defs>
                      <linearGradient id="flowChartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00D1FF" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Core indicators */}
                  <div className="text-[9px] text-[#00FF41] absolute top-10 left-[40%] font-mono animate-pulse uppercase tracking-wider">▲ VELOCITY_SPIKE: 2.4ms latency</div>
                </div>

                <div className="flex justify-between text-[10px] font-mono text-white/30 mt-4 border-t border-white/5 pt-3">
                  <span>08:00 UTC</span>
                  <span>08:05 UTC</span>
                  <span>08:10 UTC</span>
                  <span>08:15 UTC (LIVE)</span>
                </div>
              </div>

              {/* Activity feeds */}
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white mb-4">System Activity Feed</h3>
                  <div className="space-y-4 max-h-64 overflow-y-auto scrollbar-thin">
                    {activities.map((act) => (
                      <div key={act.id} className="text-xs space-y-1 p-2 rounded hover:bg-white/5 transition-all">
                        <p className="text-white/80 font-semibold">{act.action}</p>
                        <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                          <span>Target: {act.target.substring(0, 20)}</span>
                          <span>{act.userName}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => {
                    onAddActivity({
                      id: "act_" + Math.random(),
                      userId: currentUser.id,
                      userName: currentUser.name,
                      action: "Dumped active operational logs",
                      target: "Main Spanner cluster",
                      category: "system",
                      timestamp: new Date().toISOString()
                    });
                  }}
                  className="w-full py-2 bg-white/5 hover:bg-white/10 text-white text-[10px] border border-white/10 rounded-lg uppercase tracking-wider font-mono font-bold cursor-pointer"
                >
                  Force Pipeline Audit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB B: AI ASSISTANT CHAT & WORKFLOW automation builder
            ------------------------------------------------------------- */}
        {dashTab === "ai_agents" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" id="dashboard-ai-agents-view">
            {/* Left Column: True Server-Side Interactive Chatbot */}
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 flex flex-col justify-between h-[520px]">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4 select-none">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded bg-[#00D1FF]/10 text-[#00D1FF]"><Sparkles className="w-4 h-4" /></span>
                  <p className="text-sm font-bold text-white">Central NeuralAI Assistant</p>
                </div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase">gemini-3.5-flash online</span>
              </div>

              {/* Messages Frame */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-2 scrollbar-thin">
                {chatHistory.map((m) => (
                  <div key={m.id} className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}>
                    <div className={`p-3 rounded-2xl max-w-sm text-xs leading-relaxed ${m.sender === "user" ? "bg-[#00D1FF] text-black font-semibold rounded-br-none shadow-[0_0_15px_rgba(30,209,255,0.15)]" : "bg-white/5 border border-white/10 text-white/95 rounded-bl-none"}`}>
                      {m.text}
                    </div>
                    <span className="text-[9px] text-zinc-500 font-mono mt-1 px-1">
                      {m.sender === "user" ? "You" : "NEURAL_AI"} • {m.timestamp}
                    </span>
                  </div>
                ))}

                {generating && (
                  <div className="text-left animate-pulse text-[10px] text-[#00D1FF] font-mono">
                    ✦ Routing request through secure server proxies...
                  </div>
                )}
              </div>

              {/* Chat Input form */}
              <form onSubmit={handleSendChat} className="flex gap-2 relative">
                <input
                  type="text"
                  placeholder="Optimize Zurich clusters..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  disabled={generating}
                  className="flex-1 bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#00D1FF] transition-all"
                  id="dashboard-chat-input-element"
                />
                <button
                  type="submit"
                  disabled={generating}
                  className="px-4 bg-[#00D1FF] text-black rounded-xl hover:brightness-110 transition-colors cursor-pointer flex items-center justify-center shadow-[0_0_15px_rgba(30,209,255,0.25)]"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Right Column: AI CoPilot writer & visual workflows */}
            <div className="space-y-6">
              {/* AI generator form */}
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-white">Enterprise Prompt Copilot</h3>
                <form onSubmit={handleGenerateContent} className="space-y-3">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setPreset("copilot")}
                      className={`flex-1 py-1.5 rounded text-[10px] font-mono uppercase tracking-widest ${preset === "copilot" ? "bg-[#BD00FF]/25 border border-[#BD00FF]/50 text-[#BD00FF]" : "bg-white/5 text-zinc-400"}`}
                    >
                      YAML Script
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreset("blog")}
                      className={`flex-1 py-1.5 rounded text-[10px] font-mono uppercase tracking-widest ${preset === "blog" ? "bg-[#BD00FF]/25 border border-[#BD00FF]/50 text-[#BD00FF]" : "bg-white/5 text-zinc-400"}`}
                    >
                      Précis Copy
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="E.g., Write a microservice gateway pipeline config"
                    value={promptInput}
                    onChange={(e) => setPromptInput(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 bg-gradient-to-r from-[#00D1FF] to-[#BD00FF] text-black font-bold text-xs uppercase cursor-pointer tracking-wider rounded-lg"
                  >
                    Draft via Gemini
                  </button>
                </form>

                {createdContent && (
                  <div className="bg-black/60 p-4 border border-white/10 rounded-xl max-h-40 overflow-y-auto font-mono text-[11px] text-zinc-400 whitespace-pre-wrap select-all">
                    {createdContent}
                  </div>
                )}
              </div>

              {/* Dynamic workflow Node visual loops */}
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                <h3 className="text-sm font-bold text-white mb-4">Workflow Pipeline Builder</h3>
                <div className="space-y-3">
                  {workflowNodes.map((n, idx) => {
                    const NIcon = n.icon;
                    return (
                      <div key={n.id} className="flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl border ${n.active ? "bg-[#00FF41]/10 border-[#00FF41]/30 text-[#00FF41]" : "bg-white/5 border-white/10 text-zinc-500"}`}>
                          <NIcon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-white font-medium">{n.label}</p>
                          <p className="text-[9px] font-mono text-zinc-500 uppercase">{n.type}</p>
                        </div>
                        <button
                          onClick={() => {
                            setWorkflowNodes(prev => prev.map(wn => wn.id === n.id ? { ...wn, active: !wn.active } : wn));
                          }}
                          className={`text-[9px] uppercase font-mono px-2 py-1 rounded cursor-pointer ${n.active ? "bg-[#00FF41]/20 text-[#00FF41]" : "bg-white/5 text-zinc-500"}`}
                        >
                          {n.active ? "ACTIVE" : "BYPASSED"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB C: KANBAN GRID WITH TASK MANIPULATIONS
            ------------------------------------------------------------- */}
        {dashTab === "kanban" && (
          <div className="space-y-6" id="dashboard-kanban-view">
            {/* Task Quick Creator */}
            <form onSubmit={handleCreateKanban} className="bg-white/[0.02] border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-3">
              <input
                type="text"
                required
                value={newKanTaskTitle}
                onChange={(e) => setNewKanTaskTitle(e.target.value)}
                placeholder="Check Zurich EMEA latency parameters..."
                className="flex-1 bg-black/60 border border-white/10 text-xs px-3 py-2 rounded-lg text-white placeholder-white/30 w-full"
              />
              <div className="flex items-center gap-2">
                <select
                  value={newKanPriority}
                  onChange={(e) => setNewKanPriority(e.target.value as any)}
                  className="bg-black/60 border border-white/10 text-xs text-white px-2 py-2 rounded-lg"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                  <option value="critical">Critical</option>
                </select>
                <button type="submit" className="px-4 py-2 bg-[#00D1FF] text-black font-bold text-xs uppercase rounded-lg tracking-wider cursor-pointer">
                  Add Pipeline Task
                </button>
              </div>
            </form>

            {/* Kanban Columns */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {(["todo", "in_progress", "review", "done"] as KanbanTask["column"][]).map((col) => {
                const columnTasks = kanbanTasks.filter((t) => t.column === col);
                return (
                  <div key={col} className="bg-[#020205] border border-white/10 rounded-2xl p-4 flex flex-col justify-between min-h-[350px]">
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4 select-none">
                        <span className="text-xs font-bold text-white tracking-wide uppercase font-mono">{col.replace("_", " ")}</span>
                        <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-[#00D1FF] font-mono">{columnTasks.length}</span>
                      </div>

                      <div className="space-y-3">
                        {columnTasks.map((t) => (
                          <div key={t.id} className="bg-white/[0.02] border border-white/5 hover:border-white/20 p-3.5 rounded-xl transition-all space-y-3">
                            <span className={`px-2 py-0.5 rounded text-[8px] tracking-widest font-mono uppercase font-bold ${t.priority === "critical" ? "bg-red-500/10 text-red-400 border border-red-500/20" : t.priority === "high" ? "bg-orange-500/10 text-orange-400 border border-orange-500/20" : "bg-zinc-500/10 text-zinc-400"}`}>
                              {t.priority}
                            </span>
                            <h4 className="text-xs font-semibold text-white leading-snug">{t.title}</h4>
                            
                            {/* Column switcher controls */}
                            <div className="flex justify-between items-center pt-2 border-t border-white/5 mt-2">
                              <span className="text-[9px] font-mono text-zinc-500">To:</span>
                              <div className="flex gap-1">
                                {col !== "todo" && (
                                  <button
                                    onClick={() => onUpdateKanbanTask(t.id, col === "in_progress" ? "todo" : col === "review" ? "in_progress" : "review")}
                                    className="p-1 hover:bg-white/5 text-zinc-400 hover:text-white rounded text-[9px] font-mono cursor-pointer"
                                  >
                                    ◀
                                  </button>
                                )}
                                {col !== "done" && (
                                  <button
                                    onClick={() => onUpdateKanbanTask(t.id, col === "todo" ? "in_progress" : col === "in_progress" ? "review" : "done")}
                                    className="p-1 hover:bg-white/5 text-[#00D1FF] rounded text-[9px] font-mono cursor-pointer"
                                  >
                                    ▶
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB D: SYNC CALENDAR
            ------------------------------------------------------------- */}
        {dashTab === "calendar" && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8" id="dashboard-calendar-view">
            {/* Quick Event Scheduler */}
            <aside className="bg-white/[0.01] border border-white/10 rounded-2xl p-5 space-y-4 h-fit">
              <h3 className="text-sm font-bold text-white">Schedule Sync Node</h3>
              <form onSubmit={handleCreateEvent} className="space-y-3">
                <div>
                  <label className="text-[9px] font-mono text-zinc-500 uppercase block mb-1">Session Protocol Name</label>
                  <input
                    type="text"
                    required
                    value={newEventTitle}
                    onChange={(e) => setNewEventTitle(e.target.value)}
                    placeholder="QA Verification Session"
                    className="w-full bg-black/60 border border-white/10 rounded-lg text-xs p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-mono text-[#00D1FF] uppercase block mb-1">Grid Category</label>
                  <select
                    value={newEventCat}
                    onChange={(e) => setNewEventCat(e.target.value as any)}
                    className="w-full bg-black/60 border border-white/10 text-xs text-white p-2 rounded-lg"
                  >
                    <option value="neural_mesh">Neural Mesh Sync</option>
                    <option value="core_sync">Weekly Core Update</option>
                    <option value="team">Team Allocation</option>
                  </select>
                </div>
                <button type="submit" className="w-full py-2 bg-gradient-to-r from-[#00D1FF] to-[#BD00FF] text-black font-extrabold text-xs uppercase rounded-lg cursor-pointer">
                  Reserve Slot
                </button>
              </form>
            </aside>

            {/* Calendar display representation */}
            <div className="lg:col-span-3 bg-[#020205] border border-white/10 rounded-2xl p-6">
              <div className="flex justify-between items-center border-b border-white/15 pb-4 mb-6 select-none">
                <h3 className="text-md font-bold text-white">System Sync Schedules</h3>
                <span className="text-[10px] font-mono text-zinc-500 uppercase">ACTIVE TIME ZONE: UTC -07:00</span>
              </div>

              {/* Day slots list */}
              <div className="space-y-4">
                {calendarEvents.map((ev) => (
                  <div key={ev.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all">
                    <div className="space-y-1">
                      <span className={`px-2.5 py-0.5 rounded text-[8px] tracking-widest font-mono uppercase font-black ${ev.category === "neural_mesh" ? "bg-[#00D1FF]/10 text-[#00D1FF] border border-[#00D1FF]/20" : "bg-[#BD00FF]/10 text-[#BD00FF]"}`}>
                        {ev.category.replace("_", " ")}
                      </span>
                      <h4 className="text-xs font-bold text-white">{ev.title}</h4>
                      <p className="text-[10px] text-zinc-500 font-mono">{new Date(ev.start).toLocaleString()} — {new Date(ev.end).toLocaleTimeString()}</p>
                    </div>

                    <button
                      onClick={() => onDeleteEvent(ev.id)}
                      className="p-1.5 rounded-lg bg-red-500/15 border border-red-500/20 text-red-400 hover:bg-red-500/25 transition-colors cursor-pointer self-start sm:self-center"
                      title="Deallocate schedule node"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB E: FILES VAULT MANAGER with Drag-and-Drop files upload
            ------------------------------------------------------------- */}
        {dashTab === "files" && (
          <div className="space-y-6" id="dashboard-files-view">
            {/* Drag and Drop Zone Container */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={handleFileSelectClick}
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer relative ${dragOver ? "border-[#00D1FF] bg-[#00D1FF]/5" : "border-white/10 bg-white/[0.01] hover:bg-white/[0.03]"}`}
              id="dashboard-drag-drop-zone"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileInputChange}
                className="hidden"
                id="hidden-file-picker"
              />
              <UploadCloud className="w-10 h-10 text-white/50 mx-auto mb-4 animate-bounce" />
              <h3 className="text-sm font-bold text-white mb-1">Drag system manifests or logs here</h3>
              <p className="text-[10px] text-zinc-500 uppercase font-mono">Or click to inspect browser folder directories</p>
            </div>

            {/* File List Vault Table */}
            <div className="bg-[#020205] border border-white/10 rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10 select-none">
                <h3 className="text-xs font-bold text-white tracking-widest uppercase font-mono">Cloud Vault Folders</h3>
              </div>
              <div className="divide-y divide-white/5">
                {files.map((f) => (
                  <div key={f.id} className="px-6 py-3.5 flex items-center justify-between text-xs hover:bg-white/[0.01]">
                    <div className="flex items-center gap-3">
                      <span className="p-2 rounded-lg bg-white/5 border border-white/5 text-[#00D1FF]">
                        <FileCode className="w-4 h-4" />
                      </span>
                      <div>
                        <p className="font-semibold text-white">{f.name}</p>
                        <p className="text-[9px] text-zinc-500 font-mono tracking-wider">{f.size} • {f.updatedAt}</p>
                      </div>
                    </div>
                    
                    {/* Simulated download buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          onAddNotification({
                            id: Math.random().toString(),
                            title: "Downloading Package",
                            message: `Fetching secure link parameters for ${f.name}.`,
                            type: "info",
                            time: "Now",
                            read: false
                          });
                        }}
                        className="p-1.5 rounded bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                        title="Download locally"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB F: TEAM COLLABORATION OPERATOR HUB
            ------------------------------------------------------------- */}
        {dashTab === "collab" && (
          <div className="space-y-6" id="dashboard-collab-view">
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6 border-b border-white/15 pb-4">
                <div>
                  <h3 className="text-sm font-bold text-white">Authorized Network Operators</h3>
                  <p className="text-[10px] text-zinc-500 uppercase mt-1">Enterprise credentials authenticated via Google / GitHub SSO</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {users.map((u) => (
                  <div key={u.id} className="bg-black/40 border border-white/5 hover:border-white/15 transition-all rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#00D1FF] to-[#BD00FF] flex items-center justify-center font-bold text-xs text-white">
                        {u.avatar}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">{u.name}</p>
                        <p className="text-[10px] text-zinc-500 font-mono">{u.email}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className={`px-2.5 py-0.5 rounded text-[8px] tracking-widest font-mono uppercase font-bold ${u.role === UserRole.ADMIN ? "bg-[#00D1FF]/10 text-[#00D1FF]" : "bg-zinc-500/10 text-zinc-400"}`}>
                        {u.role}
                      </span>
                      <p className="text-[9px] text-[#00FF41] mt-1 font-mono tracking-widest">{u.status.toUpperCase()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
