import React, { useState } from "react";
import { User, UserRole, Activity } from "../types";
import { Shield, ToggleLeft, ToggleRight, Trash2, EyeOff, AlertTriangle, Cpu, Terminal, Compass } from "lucide-react";

interface UserSettingAdminProps {
  currentPage: string;
  currentUser: User | null;
  users: User[];
  activities: Activity[];
  onUpdateUserRole: (id: string, role: UserRole) => void;
  onUpdateUserStatus: (id: string, status: User["status"]) => void;
  onNavigate: (page: string) => void;
  onSaveProfile: (updated: Partial<User>) => void;
}

export default function UserSettingAdmin({
  currentPage,
  currentUser,
  users,
  activities,
  onUpdateUserRole,
  onUpdateUserStatus,
  onNavigate,
  onSaveProfile,
}: UserSettingAdminProps) {
  switch (currentPage) {
    case "settings":
      return <SettingsView currentUser={currentUser} onSaveProfile={onSaveProfile} />;
    case "profile":
      return <ProfileView currentUser={currentUser} onSaveProfile={onSaveProfile} />;
    case "admin":
      return (
        <AdminPortal
          users={users}
          activities={activities}
          onUpdateUserRole={onUpdateUserRole}
          onUpdateUserStatus={onUpdateUserStatus}
        />
      );
    default:
      return <PageNotFound onNavigate={onNavigate} />;
  }
}

// -------------------------------------------------------------
// 1. SETTINGS VIEW
// -------------------------------------------------------------
function SettingsView({ currentUser, onSaveProfile }: { currentUser: User | null; onSaveProfile: (u: Partial<User>) => void }) {
  const [profileName, setProfileName] = useState(currentUser?.name || "");
  const [flags, setFlags] = useState({
    hmrLogs: true,
    localStateCompression: true,
    forceAIGeneration: false,
    strictSslChecks: true
  });
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser) {
      onSaveProfile({ name: profileName });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-8 relative z-10" id="settings-view-panel">
      <div className="border-b border-white/10 pb-4 mb-4">
        <h2 className="text-2xl font-light text-white tracking-tight">System Settings & Parameters</h2>
        <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1">Configure workspace clusters locally</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Profile adjustments card */}
        <form onSubmit={handleSave} className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white mb-2">My Persona profile</h3>
          <div>
            <label className="block text-[9px] font-mono text-zinc-500 uppercase mb-1.5">Clearing Account Name</label>
            <input
              type="text"
              required
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              className="w-full bg-black/60 border border-white/10 text-xs px-3 py-2.5 rounded-lg text-white"
            />
          </div>
          <div>
            <label className="block text-[9px] font-mono text-zinc-500 uppercase mb-1.5">SSO Credentials Email</label>
            <input
              type="text"
              disabled
              value={currentUser?.email || ""}
              className="w-full bg-white/5 border border-white/5 text-xs px-3 py-2.5 rounded-lg text-zinc-500 cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-[#00D1FF] text-black text-xs font-bold uppercase cursor-pointer"
          >
            {saved ? "Parameters Synced" : "Update Profile"}
          </button>
        </form>

        {/* Feature toggling */}
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white mb-2">Alpha Feature Flags</h3>
          <div className="space-y-3">
            {[
              { key: "hmrLogs", label: "Developer Hot Refresh Logs" },
              { key: "localStateCompression", label: "Compress Local Persist state" },
              { key: "forceAIGeneration", label: "Strict AI verification" },
              { key: "strictSslChecks", label: "Proxy TLS validation" }
            ].map((f) => (
              <div key={f.key} className="flex items-center justify-between">
                <span className="text-xs text-white/70">{f.label}</span>
                <button
                  onClick={() => setFlags({ ...flags, [f.key]: !flags[f.key as keyof typeof flags] })}
                  className="text-white hover:text-[#00D1FF] transition-colors cursor-pointer"
                >
                  {flags[f.key as keyof typeof flags] ? <ToggleRight className="w-6 h-6 text-[#00FF41]" /> : <ToggleLeft className="w-6 h-6 text-zinc-600" />}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 2. PROFILE VIEW
// -------------------------------------------------------------
function ProfileView({ currentUser, onSaveProfile }: { currentUser: User | null; onSaveProfile: (u: Partial<User>) => void }) {
  if (!currentUser) return <div className="p-10 text-center text-white/40">clearance not verified.</div>;

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 space-y-6 relative z-10" id="profile-view-panel">
      <div className="bg-gradient-to-tr from-[#BD00FF]/15 to-[#00D1FF]/15 border border-white/10 rounded-2xl p-8 text-center relative overflow-hidden backdrop-blur-xl">
        {/* Glow point */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D1FF]/15 blur-[45px] pointer-events-none" />

        <div className="w-20 h-20 bg-gradient-to-tr from-[#00D1FF] to-[#BD00FF] rounded-full mx-auto flex items-center justify-center font-extrabold text-2xl text-white mb-4 border-2 border-white/40">
          {currentUser.avatar}
        </div>

        <h2 className="text-2xl font-bold text-white">{currentUser.name}</h2>
        <p className="text-[10px] font-mono text-[#00FF41] uppercase tracking-widest mt-1">Permission Category: {currentUser.role}</p>

        <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/10 text-left text-[11px] font-mono">
          <div>
            <p className="text-zinc-500 uppercase tracking-wider">Email SSO link</p>
            <p className="text-white mt-1">{currentUser.email}</p>
          </div>
          <div>
            <p className="text-zinc-500 uppercase tracking-wider">Verification Clearance</p>
            <p className="text-[#00D1FF] mt-1">{currentUser.status.toUpperCase()} (LEVEL_4)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 3. ADMIN PORTAL (User Role / Suspensions / Moderations)
// -------------------------------------------------------------
function AdminPortal({
  users,
  activities,
  onUpdateUserRole,
  onUpdateUserStatus,
}: {
  users: User[];
  activities: Activity[];
  onUpdateUserRole: (id: string, role: UserRole) => void;
  onUpdateUserStatus: (id: string, status: User["status"]) => void;
}) {
  const [activeAdminSubTab, setActiveAdminSubTab] = useState<"users" | "logs">("users");

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-6 relative z-10" id="admin-view-panel">
      <div className="border-b border-white/10 pb-4 shrink-0 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-light text-white tracking-tight">System Administration Command Room</h2>
          <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1">Inspect cluster connections and clearance rules</p>
        </div>

        {/* Sub tab toggles */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveAdminSubTab("users")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer ${activeAdminSubTab === "users" ? "bg-white text-black" : "bg-white/5 border border-white/10 text-white/60 hover:text-white"}`}
          >
            Clearance Permissions
          </button>
          <button
            onClick={() => setActiveAdminSubTab("logs")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer ${activeAdminSubTab === "logs" ? "bg-white text-black" : "bg-white/5 border border-white/10 text-white/60 hover:text-white"}`}
          >
            Central System Logs
          </button>
        </div>
      </div>

      {activeAdminSubTab === "users" ? (
        <div className="bg-[#020205] border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/40 font-mono uppercase tracking-wider text-[10px]">
                  <th className="px-6 py-4">Operator Info</th>
                  <th className="px-6 py-4">Role Permission</th>
                  <th className="px-6 py-4">Clearance Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-white/[0.01]">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00D1FF] to-[#BD00FF] flex items-center justify-center font-bold text-xs text-white">
                          {u.avatar}
                        </div>
                        <div>
                          <p className="font-bold text-white">{u.name}</p>
                          <p className="text-[10px] text-zinc-500 font-mono">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={u.role}
                        onChange={(e) => onUpdateUserRole(u.id, e.target.value as UserRole)}
                        className="bg-black/60 border border-white/10 text-white text-xs p-1.5 rounded-lg focus:outline-none focus:border-[#00D1FF]"
                      >
                        <option value={UserRole.ADMIN}>Admin</option>
                        <option value={UserRole.MANAGER}>Manager</option>
                        <option value={UserRole.MEMBER}>Member</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded text-[9px] uppercase font-mono font-bold tracking-wider ${u.status === "Active" ? "bg-[#00FF41]/10 text-[#00FF41] border border-[#00FF41]/20" : u.status === "Suspended" ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-zinc-500/10 text-zinc-400"}`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {u.status === "Active" ? (
                          <button
                            onClick={() => onUpdateUserStatus(u.id, "Suspended")}
                            className="px-3 py-1 rounded bg-red-500/15 border border-red-500/25 text-red-400 hover:bg-red-500/25 transition-colors text-[10px] cursor-pointer"
                          >
                            Suspend clearing
                          </button>
                        ) : (
                          <button
                            onClick={() => onUpdateUserStatus(u.id, "Active")}
                            className="px-3 py-1 rounded bg-green-500/15 border border-green-500/25 text-green-400 hover:bg-green-500/25 transition-colors text-[10px] cursor-pointer"
                          >
                            Restore operator
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-[#020205] border border-white/10 rounded-2xl p-6 font-mono text-[11px] text-zinc-400 space-y-4 max-h-[500px] overflow-y-auto scrollbar-thin">
          <p className="text-[#00FF41] select-none">// Active telemetry trace lines initialized...</p>
          {activities.map((act) => (
            <div key={act.id} className="border-l border-zinc-700 pl-4 space-y-1">
              <span className="text-zinc-600 text-[9px]">{act.timestamp} • CATEGORY: {act.category.toUpperCase()}</span>
              <p className="text-white/80">{act.userName} executing action: <strong>{act.action}</strong> on targets: [{act.target}]</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// 4. THE 404 handler with recursive recovery options
// -------------------------------------------------------------
function PageNotFound({ onNavigate }: { onNavigate: (p: string) => void }) {
  return (
    <div className="max-w-xl mx-auto px-6 py-24 text-center space-y-8 relative z-10" id="notfound-handler">
      <AlertTriangle className="w-12 h-12 text-red-400 mx-auto animate-bounce" />
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold text-white tracking-tighter">OUT OF CLEARANCE (404)</h1>
        <p className="text-[11px] font-mono text-[#00D1FF] uppercase tracking-widest">Selected routing map path is invalid</p>
      </div>
      <p className="text-xs text-white/50 max-w-sm mx-auto leading-relaxed">
        The destination segment could not be resolved against our active clusters. Your local token credentials remain valid.
      </p>

      <div className="flex gap-3 justify-center">
        <button
          onClick={() => onNavigate("home")}
          className="px-4 py-2 bg-[#00D1FF] text-black text-xs font-bold uppercase rounded-lg shadow-[0_0_15px_rgba(30,209,255,0.25)] cursor-pointer"
        >
          Return to gateway
        </button>
        <button
          onClick={() => onNavigate("dashboard")}
          className="px-4 py-2 bg-white/5 border border-white/10 text-white text-xs font-medium uppercase rounded-lg hover:bg-white/10 transition-all cursor-pointer"
        >
          Active Workspace
        </button>
      </div>
    </div>
  );
}
