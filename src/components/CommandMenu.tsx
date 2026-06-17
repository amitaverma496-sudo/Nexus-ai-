import { useEffect, useState } from "react";
import { Search, Compass, Terminal, FileText, Settings, X, CornerDownLeft } from "lucide-react";

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
  onSwitchRole: (role: string) => void;
}

export default function CommandMenu({ isOpen, onClose, onNavigate, onSwitchRole }: CommandMenuProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // handeled in parent, will trigger toggle
      }
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const items = [
    { id: "c1", name: "Go to Dashboard", icon: Terminal, category: "Navigation", action: () => { onNavigate("dashboard"); onClose(); } },
    { id: "c2", name: "Explore Platform Features", icon: Compass, category: "Navigation", action: () => { onNavigate("features"); onClose(); } },
    { id: "c3", name: "Check Real-time Settings", icon: Settings, category: "Navigation", action: () => { onNavigate("settings"); onClose(); } },
    { id: "c4", name: "Read API Reference Documentation", icon: FileText, category: "Resources", action: () => { onNavigate("docs"); onClose(); } },
    { id: "c5", name: "Switch Current Session to administrator", icon: ShieldAlert, category: "System", action: () => { onSwitchRole("Admin"); onClose(); } },
    { id: "c6", name: "Switch Current Session to Manager role", icon: UserCheck, category: "System", action: () => { onSwitchRole("Manager"); onClose(); } },
    { id: "c7", name: "Switch Current Session to Member role", icon: Users, category: "System", action: () => { onSwitchRole("Member"); onClose(); } },
    { id: "c8", name: "Read NeuralOS Company Blog Node", icon: BookOpen, category: "Resources", action: () => { onNavigate("blog"); onClose(); } }
  ];

  // Simple icon and role fallbacks so code doesn't crash on standard icons
  function ShieldAlert(p: any) { return <span className="text-red-400 font-mono text-xs">[!]</span>; }
  function UserCheck(p: any) { return <span className="text-indigo-400 font-mono text-xs">[M]</span>; }
  function Users(p: any) { return <span className="text-zinc-400 font-mono text-xs">[U]</span>; }
  function BookOpen(p: any) { return <span className="text-teal-400 font-mono text-xs">[B]</span>; }

  const filtered = items.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in" id="command-menu-overlay">
      <div className="w-full max-w-lg bg-[#020205] border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,209,255,0.15)] relative">
        {/* Glow point */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-[#00D1FF] to-transparent animate-pulse" />

        {/* Input Bar */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-white/40" />
          <input
            type="text"
            placeholder="Type a command or dynamic shortcut..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-white border-none focus:outline-none placeholder-white/30 text-sm"
            autoFocus
            id="command-menu-search-input"
          />
          <button 
            onClick={onClose}
            className="p-1 rounded bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List Content */}
        <div className="max-h-72 overflow-y-auto p-2 space-y-1 scrollbar-thin">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-white/40 text-xs italic">
              No matching commands or routing maps found.
            </div>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-white/5 border border-transparent hover:border-white/10 transition-all text-xs text-white/80 hover:text-white"
                  id={`command-item-${item.id}`}
                >
                  <span className="p-1.5 rounded bg-white/5 border border-white/5 text-[#00D1FF]">
                    <Icon className="w-3.5 h-3.5" />
                  </span>
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-[10px] text-white/30">{item.category}</p>
                  </div>
                  <span className="opacity-0 group-hover:opacity-100 p-1 rounded bg-white/5 text-[9px] text-[#00FF41]">
                    <CornerDownLeft className="w-3 h-3" />
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Shortcut Footer bar */}
        <div className="px-4 py-3 bg-white/[0.02] border-t border-white/5 flex items-center justify-between text-[10px] text-white/30 font-mono uppercase tracking-widest">
          <div className="flex items-center gap-3">
            <span>↑↓ to select</span>
            <span>↲ to execute</span>
          </div>
          <div>ESC to cancel</div>
        </div>
      </div>
    </div>
  );
}
