"use client";

/* eslint-disable @next/next/no-img-element */
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, Activity, HardDrive, Cpu, Terminal, LogOut, Settings, User as UserIcon, Mail, Calendar } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { AuthForms } from "@/components/auth/AuthForms";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface DashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Dashboard = ({ isOpen, onClose }: DashboardProps) => {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-night-black/70 backdrop-blur-xl z-[100] cursor-pointer"
          />

          {!loading && !user ? (
            /* ─── AUTH MODAL: Centered on screen ─── */
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 22, stiffness: 260 }}
              className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6 pointer-events-none"
            >
              <div className="relative w-full max-w-sm pointer-events-auto">
                {/* Glow effect behind modal */}
                <div className="absolute -inset-8 bg-gradient-to-br from-night-indigo/20 via-transparent to-night-emerald/20 blur-3xl rounded-full -z-10" />

                {/* Modal card */}
                <div className="bg-night-black/95 border border-white/[0.06] rounded-3xl shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 pb-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-night-indigo to-night-emerald p-[1px]">
                        <div className="w-full h-full rounded-xl bg-night-black flex items-center justify-center">
                          <Shield size={18} className="text-night-indigo" />
                        </div>
                      </div>
                      <div>
                        <h2 className="text-sm font-black text-white tracking-widest uppercase">Night X ID</h2>
                        <p className="text-[9px] font-bold text-night-emerald uppercase tracking-[0.3em]">Guest • Unauthorized</p>
                      </div>
                    </div>
                    <button
                      onClick={onClose}
                      className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center hover:bg-white/[0.08] transition-colors"
                    >
                      <X size={16} className="text-white/40" />
                    </button>
                  </div>

                  {/* Auth Form */}
                  <div className="p-6 pt-4">
                    <AuthForms onSuccess={onClose} />
                  </div>

                  {/* Footer */}
                  <div className="px-6 py-4 border-t border-white/[0.04] text-center">
                    <span className="text-[8px] font-black text-white/10 uppercase tracking-[0.4em] italic">Zero Data Footprint Architecture</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* ─── PROFILE SIDEBAR: Right panel when user is logged in ─── */
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full sm:max-w-md bg-night-black/95 border-l border-white/5 z-[101] flex flex-col shadow-2xl matte-grain overflow-hidden"
            >
              {/* Scrollable Content Area */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8 md:mb-12">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl glass-card flex items-center justify-center border-night-indigo/30 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                      <Shield size={20} className="text-night-indigo sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-black text-white tracking-widest uppercase">Night X ID</h2>
                      <p className="text-[9px] sm:text-[10px] font-bold text-night-emerald uppercase tracking-[0.3em]">
                        {loading ? "Verifying..." : `Agent ${user?.id.slice(0, 4)} • Authorized`}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-10 h-10 rounded-xl glass-card flex items-center justify-center hover:bg-white/5 transition-colors"
                  >
                    <X size={20} className="text-white/40" />
                  </button>
                </div>

                {loading ? (
                  <div className="flex items-center justify-center h-64">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-8 h-8 border-2 border-night-indigo border-t-transparent rounded-full"
                    />
                  </div>
                ) : user && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6 sm:space-y-8"
                  >
                    {/* Identity Card */}
                    <div className="p-6 sm:p-8 rounded-[2rem] glass-card border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Shield size={100} className="text-white sm:w-[120px] sm:h-[120px]" />
                      </div>

                      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-6 sm:mb-8 text-center sm:text-left">
                        <div className="relative group/avatar">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-night-indigo to-night-emerald p-[1px] shadow-[0_10px_40px_rgba(99,102,241,0.3)] overflow-hidden">
                            {user.user_metadata?.avatar_url ? (
                              <img src={user.user_metadata.avatar_url} alt="Avatar" className="w-full h-full object-cover rounded-[23px]" />
                            ) : (
                              <div className="w-full h-full rounded-[23px] bg-night-black flex items-center justify-center text-2xl sm:text-3xl font-black text-white">
                                {user.user_metadata?.full_name?.[0] || user.email?.[0].toUpperCase()}
                              </div>
                            )}
                          </div>
                          <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover/avatar:opacity-100 transition-opacity cursor-pointer rounded-3xl">
                            <UserIcon size={20} className="text-white" />
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = async () => {
                                    await supabase.auth.updateUser({
                                      data: { avatar_url: reader.result }
                                    });
                                    window.location.reload();
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </label>
                        </div>
                        <div>
                          <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">{user.user_metadata?.full_name || "Anonymous Agent"}</h3>
                          <p className="text-xs font-medium text-white/40">{user.email}</p>
                        </div>
                      </div>

                      <div className="space-y-3 sm:space-y-4 pt-4 sm:pt-6 border-t border-white/5">
                        <ProfileDetail icon={<UserIcon size={14} />} label="Access Name" value={user.user_metadata?.full_name || "N/A"} />
                        <ProfileDetail icon={<Mail size={14} />} label="Identity Email" value={user.email!} />
                        <ProfileDetail icon={<Calendar size={14} />} label="Issued Date" value={new Date(user.created_at).toLocaleDateString()} />
                      </div>
                    </div>

                    {/* Performance Grid */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <StatCard icon={<Activity size={16} />} label="Status" value="Verified" color="emerald" />
                      <StatCard icon={<Cpu size={16} />} label="Security" value="AES-256" color="indigo" />
                      <StatCard icon={<HardDrive size={16} />} label="Vault" value="Encrypted" color="white" />
                      <StatCard icon={<Terminal size={16} />} label="Session" value="Active" color="white" />
                    </div>

                    {/* System Actions */}
                    <div className="space-y-3 pt-4">
                      <button className="w-full py-3 sm:py-4 px-4 sm:px-6 rounded-2xl glass-card border-white/5 flex items-center justify-between group hover:border-night-indigo/30 transition-all">
                        <div className="flex items-center gap-3">
                          <Settings size={18} className="text-white/40 group-hover:text-night-indigo" />
                          <span className="text-xs sm:text-sm font-bold text-white/60 tracking-wide">System Configuration</span>
                        </div>
                        <span className="text-[9px] sm:text-[10px] font-black text-white/20 uppercase">Modify</span>
                      </button>
                      <button 
                        onClick={() => {
                          onClose();
                          router.push('/terms');
                        }}
                        className="w-full py-3 sm:py-4 px-4 sm:px-6 rounded-2xl glass-card border-white/5 flex items-center justify-between group hover:border-white/20 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <Shield size={18} className="text-white/40 group-hover:text-white" />
                          <span className="text-xs sm:text-sm font-bold text-white/60 tracking-wide">Terms & Conditions</span>
                        </div>
                        <span className="text-[9px] sm:text-[10px] font-black text-white/20 uppercase">View</span>
                      </button>
                      <button
                        onClick={() => {
                          signOut();
                          onClose();
                        }}
                        className="w-full py-3 sm:py-4 px-4 sm:px-6 rounded-2xl glass-card border-white/5 flex items-center justify-between group hover:border-red-500/30 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <LogOut size={18} className="text-white/40 group-hover:text-red-500" />
                          <span className="text-xs sm:text-sm font-bold text-white/60 tracking-wide">Terminate Session</span>
                        </div>
                        <span className="text-[9px] sm:text-[10px] font-black text-white/20 uppercase">Logout</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Footer Tag */}
              <div className="p-4 sm:p-8 text-center border-t border-white/5 bg-night-black/60 backdrop-blur-md">
                <span className="text-[8px] sm:text-[9px] font-black text-white/10 uppercase tracking-[0.3em] sm:tracking-[0.5em] italic">Zero Data Footprint Architecture</span>
              </div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

const ProfileDetail = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="flex items-center justify-between gap-2">
    <div className="flex items-center gap-2 sm:gap-3 text-white/20 shrink-0">
      {icon}
      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">{label}</span>
    </div>
    <span className="text-[11px] sm:text-xs font-black text-white/80 tracking-wide truncate text-right">{value}</span>
  </div>
);

const StatCard = ({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string, color: string }) => (
  <div className="p-3 sm:p-4 rounded-2xl sm:rounded-3xl glass-card border-white/5 bg-white/[0.01]">
    <div className={`mb-2 ${color === 'emerald' ? 'text-night-emerald' : color === 'indigo' ? 'text-night-indigo' : 'text-white/40'}`}>
      {icon}
    </div>
    <div className="text-[8px] sm:text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">{label}</div>
    <div className="text-xs sm:text-sm font-black text-white/90">{value}</div>
  </div>
);
