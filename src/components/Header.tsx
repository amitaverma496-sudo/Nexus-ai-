import { Activity, Bell, Search, Sun, Moon, LogIn, LogOut, Settings, User } from "lucide-react";
import { UserRole } from "../types";

interface HeaderProps {
  theme: "dark" | "light";
  onToggleTheme: () => void;
  currentUser: any;
  onOpenSearch: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
  notificationsCount: number;
  onToggleNotifications: () => void;
  onLogout: () => void;
}

export default function Header({
  theme,
  onToggleTheme,
  currentUser,
  onOpenSearch,
  onNavigate,
  currentPage,
  notificationsCount,
  onToggleNotifications,
  onLogout,
}: HeaderProps) {
  return (
    <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-white/[0.04] backdrop-blur-xl z-30 shrink-0">
      {/* Brand Logo */}
      <div 
        className="flex items-center gap-3 cursor-pointer group" 
        onClick={() => onNavigate("home")}
        id="header-logo-container"
      >
        <div className="w-8 h-8 bg-gradient-to-tr from-[#00D1FF] to-[#BD00FF] rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(0,209,255,0.4)] group-hover:scale-105 transition-transform">
          <div className="w-3.5 h-3.5 bg-white rounded-sm rotate-45 animate-pulse"></div>
        </div>
        <span className="text-xl font-bold tracking-tighter text-white">
          NEURAL<span className="text-[#00D1FF]">OS</span>
        </span>
      </div>

      {/* Global Quick Search Header Input */}
      <div className="flex-1 max-w-sm mx-8 hidden md:block">
        <button 
          onClick={onOpenSearch}
          className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-1.5 flex items-center gap-3 text-left hover:bg-white/10 hover:border-white/20 transition-all text-white/40 text-xs"
          id="global-search-trigger"
        >
          <Search className="w-4 h-4 text-white/30" />
          <span className="italic">Search documentation, commands, files...</span>
          <div className="ml-auto flex gap-1">
            <span className="px-1.5 py-0.5 rounded border border-white/20 text-[9px] text-white/40 bg-white/5">⌘</span>
            <span className="px-1.5 py-0.5 rounded border border-white/20 text-[9px] text-white/40 bg-white/5">K</span>
          </div>
        </button>
      </div>

      {/* Control Actions & Status */}
      <div className="flex items-center gap-4 md:gap-6">
        {/* Latency */}
        <div className="text-right hidden sm:block">
          <p className="text-[10px] text-white/40 uppercase tracking-wider font-mono">System Latency</p>
          <div className="flex items-center gap-1.5 justify-end">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF41] animate-ping" />
            <span className="text-xs font-mono text-[#00FF41]">2.4ms</span>
          </div>
        </div>

        {/* Navigation Tabs (Quick responsive layout) */}
        <nav className="hidden lg:flex items-center gap-4 text-xs font-medium text-white/60">
          <button 
            onClick={() => onNavigate("features")} 
            className={`hover:text-white transition-colors ${currentPage === "features" ? "text-[#00D1FF]" : ""}`}
          >
            Features
          </button>
          <button 
            onClick={() => onNavigate("pricing")} 
            className={`hover:text-white transition-colors ${currentPage === "pricing" ? "text-[#00D1FF]" : ""}`}
          >
            Pricing
          </button>
          <button 
            onClick={() => onNavigate("docs")} 
            className={`hover:text-white transition-colors ${currentPage === "docs" ? "text-[#00D1FF]" : ""}`}
          >
            Docs
          </button>
          <button 
            onClick={() => onNavigate("blog")} 
            className={`hover:text-white transition-colors ${currentPage === "blog" ? "text-[#00D1FF]" : ""}`}
          >
            Blog
          </button>
        </nav>

        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          id="theme-toggler"
          title="Toggle UI Theme"
        >
          {theme === "dark" ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
        </button>

        {/* Notifications Icon with Counter */}
        <button
          onClick={onToggleNotifications}
          className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-colors relative cursor-pointer"
          id="notification-bell-btn"
        >
          <Bell className="w-4.5 h-4.5" />
          {notificationsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center animate-pulse">
              {notificationsCount}
            </span>
          )}
        </button>

        {/* User Account / Profile Navigation */}
        {currentUser ? (
          <div className="flex items-center gap-3">
            <div 
              onClick={() => onNavigate("profile")}
              className="w-9 h-9 rounded-full border-2 border-[#00D1FF] p-0.5 cursor-pointer hover:opacity-85 transition-opacity relative group"
            >
              {currentUser.avatar ? (
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#00D1FF] to-[#BD00FF] flex items-center justify-center font-bold text-xs text-white">
                  {currentUser.avatar}
                </div>
              ) : (
                <div className="w-full h-full rounded-full bg-zinc-800 flex items-center justify-center text-white/60">
                  <User className="w-4 h-4" />
                </div>
              )}
              {/* Tooltip for profile roles */}
              <span className="absolute top-12 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all bg-black/90 text-[10px] text-white/80 py-1 px-2 rounded border border-white/10 whitespace-nowrap z-50">
                {currentUser.name} ({currentUser.role})
              </span>
            </div>
            
            <button
              onClick={onLogout}
              className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
              title="Logout session"
              id="header-logout-btn"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate("login")}
              className="px-3.5 py-1.5 rounded-lg border border-white/10 text-xs text-white hover:bg-white/5 transition-colors cursor-pointer"
              id="header-login-trigger"
            >
              Sign In
            </button>
            <button
              onClick={() => onNavigate("signup")}
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#00D1FF] to-[#BD00FF] text-xs font-bold text-black shadow-[0_0_15px_rgba(0,209,255,0.3)] hover:brightness-110 hover:shadow-[0_0_20px_rgba(0,209,255,0.4)] transition-all cursor-pointer"
              id="header-signup-trigger"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
