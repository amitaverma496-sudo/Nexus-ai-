import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Particles from "./components/Particles";
import CommandMenu from "./components/CommandMenu";
import PublicPages from "./components/PublicPages";
import DashboardView from "./components/DashboardView";
import UserSettingAdmin from "./components/UserSettingAdmin";
import { 
  User, UserRole, Notification, Activity, KanbanTask, CalendarEvent, FileEntry 
} from "./types";
import { 
  INITIAL_USERS, INITIAL_KANBAN, INITIAL_EVENTS, INITIAL_FILES, 
  INITIAL_NOTIFICATIONS, INITIAL_ACTIVITIES 
} from "./data";
import { 
  Bell, Check, Info, ShieldAlert, Cpu, Layers, Terminal, Compass, X, Settings as SettingsIcon, Shield 
} from "lucide-react";

export default function App() {
  // Loading & Persisted Theme States
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [currentPage, setCurrentPage] = useState<string>("home");

  // Core Data State Engine
  const [currentUser, setCurrentUser] = useState<User | null>(INITIAL_USERS[0]); // Amit Verma Admin as default for instant premium dashboard preview
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const [activities, setActivities] = useState<Activity[]>(INITIAL_ACTIVITIES);
  const [kanbanTasks, setKanbanTasks] = useState<KanbanTask[]>(INITIAL_KANBAN);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(INITIAL_EVENTS);
  const [files, setFiles] = useState<FileEntry[]>(INITIAL_FILES);

  // Modal / Sidebar UI states
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [toasts, setToasts] = useState<{ id: string; msg: string; type: "info" | "success" | "error" }[]>([]);

  // 1. Initial boot-up simulation sequence (Futuristic loading micro-interactions)
  useEffect(() => {
    // Persistent theme checks
    const savedTheme = localStorage.getItem("neuralos-theme") as "dark" | "light" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }

    // Persisted datasets
    try {
      const pTasks = localStorage.getItem("neuralos-tasks");
      const pEvents = localStorage.getItem("neuralos-events");
      const pFiles = localStorage.getItem("neuralos-files");
      if (pTasks) setKanbanTasks(JSON.parse(pTasks));
      if (pEvents) setCalendarEvents(JSON.parse(pEvents));
      if (pFiles) setFiles(JSON.parse(pFiles));
    } catch (err) {
      console.error("Local persistence restoration bypassed:", err);
    }

    const timer = setTimeout(() => {
      setLoading(false);
      showToast("Cognition engine converged. Secure Local persistence online.", "success");
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  // Save to localStorage helpers
  const saveTasks = (tasks: KanbanTask[]) => {
    setKanbanTasks(tasks);
    localStorage.setItem("neuralos-tasks", JSON.stringify(tasks));
  };

  const saveEvents = (events: CalendarEvent[]) => {
    setCalendarEvents(events);
    localStorage.setItem("neuralos-events", JSON.stringify(events));
  };

  const saveFiles = (newFiles: FileEntry[]) => {
    setFiles(newFiles);
    localStorage.setItem("neuralos-files", JSON.stringify(newFiles));
  };

  // Toast manager
  const showToast = (msg: string, type: "info" | "success" | "error" = "info") => {
    const id = "toast_" + Math.random();
    setToasts((prev) => [...prev, { id, msg, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Theme switcher persistence
  const handleToggleTheme = () => {
    const target = theme === "dark" ? "light" : "dark";
    setTheme(target);
    localStorage.setItem("neuralos-theme", target);
    showToast(`UI switched to ${target === "dark" ? "Immersive Cosmic Dark" : "Daylight High Contrast Mode"}`, "info");
  };

  // Auth logins hooks
  const handleLoginMock = (email: string) => {
    const matched = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (matched) {
      if (matched.status === "Suspended") {
        showToast("Your clearance is suspended. Please contact solutions manager.", "error");
        return;
      }
      setCurrentUser(matched);
      showToast(`Welcome back, ${matched.name}. Active workspace sync initiated.`, "success");
    } else {
      // Create new member user profile
      const name = email.split("@")[0].toUpperCase();
      const newUser: User = {
        id: "u_" + Math.random(),
        name,
        email,
        avatar: name.substring(0, 2),
        role: UserRole.MEMBER,
        status: "Active",
        joinedAt: new Date().toISOString().split("T")[0]
      };
      setUsers((prev) => [...prev, newUser]);
      setCurrentUser(newUser);
      showToast(`Profile authorized and logged in successfully. Welcome to NeuralOS!`, "success");
    }
    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage("home");
    showToast("Session security token closed successfully.", "info");
  };

  const handleUpdateUserRole = (id: string, role: UserRole) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
    if (currentUser?.id === id) {
      setCurrentUser((prev) => prev ? { ...prev, role } : null);
    }
    showToast(`Operator role classification updated.`, "success");
  };

  const handleUpdateUserStatus = (id: string, status: User["status"]) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status } : u)));
    showToast(`Operator clearance status changed to ${status}`, "info");
  };

  // Notification handlers
  const handleAddNotification = (notif: Notification) => {
    setNotifications((prev) => [notif, ...prev]);
  };

  const handleAddActivity = (act: Activity) => {
    setActivities((prev) => [act, ...prev]);
  };

  // App routing and command handlers
  const handleNavigate = (page: string) => {
    if ((page === "dashboard" || page === "settings" || page === "profile" || page === "admin") && !currentUser) {
      setCurrentPage("login");
      showToast("Please authenticate profile clearance to enter secure space.", "info");
    } else {
      setCurrentPage(page);
    }
  };

  const handleSwitchRoleViaCommand = (roleName: string) => {
    if (currentUser) {
      handleUpdateUserRole(currentUser.id, roleName as UserRole);
    } else {
      showToast("Cannot switch roles without an authenticated profile active.", "error");
    }
  };

  const handleDismissNotif = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Keyboard shortcut listener for Command Menu (⌘K)
  useEffect(() => {
    const handleGlobalShortcuts = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleGlobalShortcuts);
    return () => window.removeEventListener("keydown", handleGlobalShortcuts);
  }, []);

  // -------------------------------------------------------------
  // PRIMARY LOADING ANIMATION
  // -------------------------------------------------------------
  if (loading) {
    return (
      <div 
        className="fixed inset-0 bg-[#020205] text-white flex flex-col items-center justify-center p-6 font-mono z-50 select-none"
        id="neuralos-matrix-spinner"
      >
        <div className="space-y-6 text-center max-w-sm">
          {/* Animated SVG logo spinning */}
          <div className="w-16 h-16 bg-gradient-to-tr from-[#00D1FF] to-[#BD00FF] rounded-2xl flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(0,209,255,0.4)] animate-spin-slow">
            <div className="w-8 h-8 bg-black rounded-lg rotate-45 animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <p className="text-xl font-bold tracking-widest text-[#00D1FF] uppercase">NEURALOS ENGINE</p>
            <p className="text-xs text-white/40 uppercase animate-pulse">Initializing unified cognition buffers...</p>
          </div>
          {/* Dynamic loading text lines simulating matrix trace */}
          <div className="bg-white/[0.02] border border-white/10 p-3.5 rounded-xl text-left text-[9px] text-[#00FF41]/75 space-y-1">
            <p>✓ local secure context: ready</p>
            <p>✓ socket protocol: ok (2.4ms)</p>
            <p className="animate-pulse">✦ converging gemini neural weights...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`h-screen w-screen flex flex-col overflow-hidden text-white transition-colors duration-150 relative bg-[#020205] ${theme === "light" ? "bg-[#f5f5f7]! text-[#1d1d1f]!" : "bg-[#020205] text-[#e0e0e0]"}`}>
      
      {/* Background Particles canvas */}
      <Particles theme={theme} />

      {/* Floating Alert Toast Messages list overlays */}
      <div className="fixed top-20 right-6 z-50 space-y-2 max-w-sm pointer-events-none" id="toasts-grid-overlay">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto p-4 rounded-xl border flex items-center gap-3 shadow-[0_4px_30px_rgba(0,0,0,0.4)] animate-slide-in ${
              t.type === "success" 
                ? "bg-[#00FF41]/15 border-[#00FF41]/30 text-[#00FF41]" 
                : t.type === "error" 
                ? "bg-red-500/15 border-red-500/30 text-red-400" 
                : "bg-white/10 border-white/15 text-white"
            }`}
          >
            {t.type === "success" ? <Check className="w-4 h-4 shrink-0" /> : <Info className="w-4 h-4 shrink-0" />}
            <span className="text-xs font-semibold leading-relaxed">{t.msg}</span>
          </div>
        ))}
      </div>

      {/* Main Integrated Client Header Bar */}
      <Header
        theme={theme}
        onToggleTheme={handleToggleTheme}
        currentUser={currentUser}
        onOpenSearch={() => setSearchOpen(true)}
        onNavigate={handleNavigate}
        currentPage={currentPage}
        notificationsCount={notifications.filter(n => !n.read).length}
        onToggleNotifications={() => setNotificationsOpen(!notificationsOpen)}
        onLogout={handleLogout}
      />

      {/* Slide-out notifications tray overlay */}
      {notificationsOpen && (
        <div className="absolute right-6 top-18 w-80 bg-[#020205] border border-white/10 rounded-2xl p-4 shadow-[0_0_40px_rgba(0,209,255,0.1)] z-40 animate-fade-in text-xs flex flex-col justify-between" id="notifications-menu-frame">
          <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
            <span className="font-bold text-white uppercase tracking-wider font-mono text-[10px]">Command Alerts</span>
            <button 
              onClick={() => {
                setNotifications(prev => prev.map(n => ({...n, read: true})));
                showToast("All notifications dismissed", "info");
              }}
              className="text-[#00D1FF] text-[9px] uppercase font-bold cursor-pointer"
            >
              Clear Feed
            </button>
          </div>
          
          <div className="space-y-3 max-h-60 overflow-y-auto scrollbar-thin mb-2">
            {notifications.length === 0 ? (
              <p className="text-center text-white/30 italic py-6">All alerts read.</p>
            ) : (
                notifications.map((n) => (
                  <div key={n.id} className="p-2 bg-white/5 border border-white/5 rounded-lg flex justify-between gap-3 relative">
                    <div>
                      <p className="font-bold text-white">{n.title}</p>
                      <p className="text-white/55 text-[10px] mt-0.5 leading-normal">{n.message}</p>
                      <span className="text-zinc-600 text-[9px] font-mono block mt-1">{n.time}</span>
                    </div>
                    <button 
                      onClick={() => handleDismissNotif(n.id)}
                      className="text-zinc-500 hover:text-white cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
            )}
          </div>
        </div>
      )}

      {/* Global Interactive Command shortcuts hub Overlay (⌘K) */}
      <CommandMenu
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={handleNavigate}
        onSwitchRole={handleSwitchRoleViaCommand}
      />

      {/* Primary Dispatch Router Container Grid View */}
      <main className="flex-1 overflow-y-auto relative z-10 flex flex-col">
        {(() => {
          // Dashboard entry point
          if (currentPage === "dashboard" && currentUser) {
            return (
              <DashboardView
                currentUser={currentUser}
                users={users}
                notifications={notifications}
                activities={activities}
                kanbanTasks={kanbanTasks}
                calendarEvents={calendarEvents}
                files={files}
                onAddKanbanTask={(task) => saveTasks([task, ...kanbanTasks])}
                onUpdateKanbanTask={(id, col) => {
                  saveTasks(kanbanTasks.map((t) => (t.id === id ? { ...t, column: col } : t)));
                }}
                onAddEvent={(ev) => saveEvents([ev, ...calendarEvents])}
                onDeleteEvent={(id) => saveEvents(calendarEvents.filter((e) => e.id !== id))}
                onAddFile={(fl) => saveFiles([fl, ...files])}
                onAddNotification={handleAddNotification}
                onAddActivity={handleAddActivity}
              />
            );
          }

          // Settings, Profiles & Admin panel dispatcher
          if (currentPage === "settings" || currentPage === "profile" || currentPage === "admin") {
            return (
              <UserSettingAdmin
                currentPage={currentPage}
                currentUser={currentUser}
                users={users}
                activities={activities}
                onUpdateUserRole={handleUpdateUserRole}
                onUpdateUserStatus={handleUpdateUserStatus}
                onNavigate={handleNavigate}
                onSaveProfile={(up) => {
                  if (currentUser) {
                    const updated = { ...currentUser, ...up };
                    setCurrentUser(updated);
                    setUsers((prev) => prev.map((u) => (u.id === currentUser.id ? updated : u)));
                    showToast("Account statistics updated", "success");
                  }
                }}
              />
            );
          }

          // Standard Landing & Public Resources pages (About, Pricing, Features, Careers, Contact, SSO Logins)
          return (
            <div className="flex-1">
              <PublicPages
                currentPage={currentPage}
                onNavigate={handleNavigate}
                onJoinBeta={() => {
                  showToast("Clearance level upgraded instantly. Log in to start.", "success");
                  handleNavigate("login");
                }}
                onLoginMock={handleLoginMock}
              />
              <Footer onNavigate={handleNavigate} currentPage={currentPage} />
            </div>
          );
        })()}
      </main>

      {/* Floating System Bar details footer */}
      <footer className="h-10 border-t border-white/10 px-6 flex items-center justify-between text-[9px] uppercase tracking-widest text-white/40 bg-[#010103] shrink-0 z-20 select-none">
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5 font-bold text-[#00FF41]"><span className="w-1.5 h-1.5 bg-[#00FF41] rounded-full"></span>Mesh Stable</div>
          <div className="hidden sm:block">Uptime: 99.9999%</div>
        </div>
        <div className="flex gap-4">
          <span>Region: global-east-1</span>
          <span className="text-white/60">NeuralOS © 2026</span>
        </div>
      </footer>
    </div>
  );
}
