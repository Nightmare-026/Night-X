"use client";

/* eslint-disable @next/next/no-img-element */
import React from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  X, Shield, Activity, HardDrive, Cpu, Terminal, LogOut,
  Settings, User as UserIcon, Mail, Calendar,
} from "lucide-react";
import { updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import { AuthForms } from "@/components/auth/AuthForms";
import { useRouter } from "next/navigation";
import { TiltCard } from "./TiltCard";

interface DashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Dashboard = ({ isOpen, onClose }: DashboardProps) => {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 10 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 300,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      y: 10,
      transition: {
        duration: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200
      }
    }
  };

  const displayName = user?.displayName || user?.email?.split("@")[0] || "Night X Agent";
  const avatarInitial = (user?.displayName?.[0] || user?.email?.[0] || "?").toUpperCase();
  const joinDate = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString()
    : "N/A";

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
            className="fixed inset-0 bg-night-black/80 backdrop-blur-2xl z-[100] cursor-pointer"
          />

          {!loading && !user ? (
            /* ─── AUTH MODAL ─── */
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6"
            >
              <div className="relative w-full max-w-sm">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -inset-16 bg-night-indigo/20 blur-[100px] rounded-full -z-10" />
                <div className="bg-night-black/95 border border-white/[0.08] rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.9)] overflow-hidden">
                  <div className="flex items-center justify-between p-7 pb-0">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-night-indigo to-night-emerald p-[1px] shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                        <div className="w-full h-full rounded-[15px] bg-night-black flex items-center justify-center">
                          <Shield size={20} className="text-night-indigo" />
                        </div>
                      </div>
                      <div>
                        <h2 className="text-xs font-black text-white tracking-[0.3em] uppercase">Security Portal</h2>
                        <p className="text-[9px] font-bold text-white/30 uppercase tracking-[0.4em]">Identity Verification Required</p>
                      </div>
                    </div>
                    <button
                      onClick={onClose}
                      className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center hover:bg-white/[0.1] transition-all"
                    >
                      <X size={18} className="text-white/40" />
                    </button>
                  </div>

                  <div className="p-7 pt-6">
                    <AuthForms onSuccess={onClose} />
                  </div>

                  <div className="px-7 py-5 border-t border-white/[0.04] text-center bg-white/[0.01]">
                    <span className="text-[9px] font-black text-white/10 uppercase tracking-[0.5em] italic">
                      Zero Data Footprint
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* ─── PROFILE MODAL ─── */
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 h-full w-full sm:h-[90vh] sm:w-[90vw] md:max-w-4xl bg-night-black/95 sm:rounded-[2.5rem] sm:border border-white/[0.08] z-[101] flex flex-col shadow-[0_50px_100px_rgba(0,0,0,0.8)] matte-grain overflow-hidden"
            >
              <div className="flex-1 overflow-y-auto p-8 sm:p-10">
                {/* Header */}
                <motion.div variants={itemVariants} className="flex items-center justify-between mb-12 sm:mb-16">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl glass-card flex items-center justify-center border-night-indigo/40 shadow-[0_0_30px_rgba(99,102,241,0.25)] relative group/logo">
                      <div className="absolute inset-0 bg-night-indigo/20 blur-xl opacity-0 group-hover/logo:opacity-100 transition-opacity" />
                      <Shield size={24} className="text-night-indigo relative z-10" />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-white tracking-widest uppercase">Operator ID</h2>
                      <p className="text-[10px] font-black text-night-emerald uppercase tracking-[0.4em] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-night-emerald animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                        {loading ? "Syncing..." : `Session Active • ${user?.uid.slice(0, 8)}`}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-11 h-11 rounded-xl glass-card border-white/10 flex items-center justify-center hover:bg-white/10 transition-all hover:scale-110 active:scale-90"
                  >
                    <X size={22} className="text-white/40" />
                  </button>
                </motion.div>

                {loading ? (
                  <div className="flex items-center justify-center h-64">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-10 h-10 border-2 border-night-indigo border-t-transparent rounded-full"
                    />
                  </div>
                ) : user && (
                  <div className="space-y-10 sm:space-y-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                      {/* Left Column: Identity & Access */}
                      <div className="lg:col-span-7 space-y-10">
                        <motion.div variants={itemVariants} className="p-8 sm:p-10 rounded-[3rem] glass-card border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent relative overflow-hidden group shadow-2xl">
                          <div className="absolute -top-10 -right-10 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-1000 rotate-12 pointer-events-none">
                            <Shield size={220} className="text-white" />
                          </div>

                          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 mb-10 text-center sm:text-left">
                            <div className="relative group/avatar shrink-0 z-10">
                              <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-night-indigo via-sky-400 to-night-emerald p-[1px] shadow-[0_20px_50px_rgba(99,102,241,0.3)] overflow-hidden transition-transform duration-500 group-hover/avatar:scale-105 group-hover/avatar:rotate-2 relative">
                                {user.photoURL ? (
                                  <img src={user.photoURL} alt="Avatar" className="w-full h-full object-cover rounded-[1.85rem]" />
                                ) : (
                                  <div className="w-full h-full rounded-[1.85rem] bg-night-black flex items-center justify-center text-4xl font-black text-white selection:bg-transparent relative">
                                    <span className="relative z-10">{avatarInitial}</span>
                                  </div>
                                )}
                              </div>

                              {user.providerData?.[0]?.providerId !== "google.com" && (
                                <label className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover/avatar:opacity-100 transition-opacity cursor-pointer rounded-[2rem] backdrop-blur-sm z-20">
                                  <UserIcon size={24} className="text-white" />
                                  <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={async (e) => {
                                      const file = e.target.files?.[0];
                                      if (file && auth.currentUser) {
                                        const reader = new FileReader();
                                        reader.onloadend = async () => {
                                          await updateProfile(auth.currentUser!, {
                                            photoURL: reader.result as string,
                                          });
                                          window.location.reload();
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }}
                                  />
                                </label>
                              )}
                            </div>
                            <div className="flex-1 min-w-0 w-full">
                              <h3 className="text-2xl font-black text-white tracking-tight mb-2 truncate max-w-full">{displayName}</h3>
                              <div className="px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 flex max-w-full overflow-hidden w-fit mx-auto sm:mx-0">
                                <p className="text-[10px] sm:text-xs font-black text-white/40 uppercase tracking-widest truncate break-all">{user.email}</p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4 pt-8 border-t border-white/10">
                            <ProfileDetail icon={<UserIcon size={14} />} label="Operator" value={displayName} />
                            <ProfileDetail icon={<Mail size={14} />} label="Network ID" value={user.email || "ANONYMOUS"} />
                            <ProfileDetail icon={<Calendar size={14} />} label="Authorized On" value={joinDate} />
                          </div>
                        </motion.div>
                      </div>

                      {/* Right Column: System Performance */}
                      <div className="lg:col-span-5 h-full">
                        <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-1 gap-4 h-full content-start">
                          <StatCard icon={<Activity size={16} />} label="Signal" value="Synchronized" color="emerald" />
                          <StatCard icon={<Cpu size={16} />} label="Core" value="High Poly" color="indigo" />
                          <StatCard icon={<HardDrive size={16} />} label="Storage" value="Vault Locked" color="white" />
                          <StatCard icon={<Terminal size={16} />} label="Access" value="Level 4" color="white" />
                        </motion.div>
                      </div>
                    </div>

                    {/* System Actions */}
                    <div className="space-y-10 pt-4">
                      <motion.div variants={itemVariants}>
                        <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-6 flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-white/20" />
                          Sub-Ecosystem Protocols
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          <ProtocolButton icon={<Shield size={16} />} label="About" onClick={() => { onClose(); router.push("/about"); }} />
                          <ProtocolButton icon={<Shield size={16} />} label="Privacy" onClick={() => { onClose(); router.push("/privacy"); }} />
                          <ProtocolButton icon={<Shield size={16} />} label="Terms" onClick={() => { onClose(); router.push("/terms"); }} />
                          <ProtocolButton icon={<Shield size={16} />} label="Contact" onClick={() => { onClose(); router.push("/contact"); }} />
                        </div>
                      </motion.div>

                      <motion.div variants={itemVariants} className="space-y-4">
                        <button className="w-full py-5 px-7 rounded-[1.5rem] night-btn-gradient flex items-center justify-between group transition-all">
                          <div className="flex items-center gap-4">
                            <Settings size={20} className="text-white/60 group-hover:text-white transition-colors" />
                            <span className="text-sm font-black text-white/90 uppercase tracking-wider transition-colors">Advanced Settings</span>
                          </div>
                          <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-white transition-colors shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                        </button>
                        <button
                          onClick={() => { signOut(); onClose(); }}
                          className="w-full py-5 px-7 rounded-[1.5rem] night-btn-gradient flex items-center justify-between group transition-all"
                        >
                          <div className="flex items-center gap-4">
                            <LogOut size={20} className="text-white/60 group-hover:text-white transition-colors" />
                            <span className="text-sm font-black text-white/90 uppercase tracking-wider transition-colors">Terminate Session</span>
                          </div>
                          <span className="text-[10px] font-black text-white/40 uppercase tracking-widest group-hover:text-white/60 transition-colors">Safety Exit</span>
                        </button>
                      </motion.div>
                    </div>
                  </div>
                )}
              </div>

              {/* Integrity Visualizer */}
              <motion.div variants={itemVariants} className="p-8 sm:p-10 border-t border-white/10 bg-white/[0.02] backdrop-blur-3xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] italic">Ecosystem Integrity</span>
                  <span className="text-[10px] font-black text-night-emerald uppercase tracking-widest">99.9% Secured</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "99.9%" }}
                    transition={{ duration: 2, ease: "circOut", delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-night-indigo via-sky-400 to-night-emerald shadow-[0_0_15px_rgba(99,102,241,0.5)]" 
                  />
                </div>
                <p className="mt-4 text-[8px] font-black text-white/5 uppercase tracking-[0.6em] text-center">Zero Data Footprint Architecture</p>
              </motion.div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

const ProtocolButton = ({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="w-full py-4 px-5 rounded-2xl night-btn-gradient flex items-center gap-4 group transition-all hover:scale-[1.02] active:scale-95 shadow-xl"
  >
    <div className="text-white/60 group-hover:text-white transition-colors flex-shrink-0">
      {icon}
    </div>
    <span className="text-[10px] font-black text-white/80 group-hover:text-white tracking-[0.2em] uppercase transition-colors">{label}</span>
  </button>
);

const ProfileDetail = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex items-center justify-between gap-4 py-1">
    <div className="flex items-center gap-3 text-white/20 shrink-0">
      {icon}
      <span className="text-[10px] font-black uppercase tracking-[0.3em]">{label}</span>
    </div>
    <span className="text-xs font-black text-white/90 tracking-tight truncate text-right">{value}</span>
  </div>
);

const StatCard = ({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) => (
  <TiltCard color={color === "emerald" ? "#10b981" : color === "indigo" ? "#4338ca" : "#ffffff"} className="rounded-[2rem]">
    <div className="p-6 h-full group/stat cursor-default">
      <div className={`mb-3 flex items-center justify-between ${color === "emerald" ? "text-night-emerald" : color === "indigo" ? "text-night-indigo" : "text-white/40"}`}>
        <div className="group-hover/stat:scale-110 transition-transform">{icon}</div>
        <div className={`w-1.5 h-1.5 rounded-full ${color === "emerald" ? "bg-night-emerald" : color === "indigo" ? "bg-night-indigo" : "bg-white/20"} shadow-[0_0_10px_currentColor]`} />
      </div>
      <div className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] mb-2">{label}</div>
      <div className="text-sm font-black text-white tracking-widest">{value}</div>
    </div>
  </TiltCard>
);
