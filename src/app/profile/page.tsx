"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, Activity, Cpu, HardDrive, Terminal, LogOut, 
  Settings, User as UserIcon, Mail, Calendar, ArrowLeft 
} from "lucide-react";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, storage, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "@/hooks/useAuth";
import { AuthForms } from "@/components/auth/AuthForms";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Background3D } from "@/components/visuals/Background3D";
import { TiltCard } from "@/components/ui/TiltCard";
import { ProtocolButton, ProfileDetail, StatCard } from "@/components/profile/ProfileComponents";

import { Check, X as XIcon, Pencil } from "lucide-react";
import Image from "next/image";
import { Variants } from "framer-motion";

export default function ProfilePage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  // Name Editing State
  const [isEditingName, setIsEditingName] = React.useState(false);
  const [newName, setNewName] = React.useState("");
  const [isSaving, setIsSaving] = React.useState(false);

  React.useEffect(() => {
    if (user?.displayName) {
      setNewName(user.displayName);
    }
  }, [user]);

  const handleSaveName = async () => {
    if (!newName.trim() || !auth.currentUser) return;
    setIsSaving(true);
    try {
      await updateProfile(auth.currentUser, { displayName: newName.trim() });
      setIsEditingName(false);
      window.location.reload();
    } catch (error) {
      console.error("Name update failed:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", damping: 25, stiffness: 200 }
    }
  };

  const displayName = user?.displayName || user?.email?.split("@")[0] || "Night X Agent";
  const avatarInitial = (user?.displayName?.[0] || user?.email?.[0] || "?").toUpperCase();
  const joinDate = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString()
    : "N/A";

  return (
    <main className="relative min-h-screen matte-grain flex flex-col">
      <Background3D />
      <Navbar />

      <div className="flex-1 container mx-auto px-4 pt-32 pb-20 relative z-10">
        <AnimatePresence mode="wait">
          {!loading && !user ? (
            /* ─── GUEST ACCESS (Login Form) ─── */
            <motion.div
              key="auth-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-md mx-auto"
            >
              <div className="bg-night-black/95 border border-white/[0.08] rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.9)] overflow-hidden">
                <div className="p-10 pb-0 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-night-indigo to-night-emerald p-[1px] mb-6">
                    <div className="w-full h-full rounded-[15px] bg-night-black flex items-center justify-center">
                      <Shield size={28} className="text-night-indigo" />
                    </div>
                  </div>
                  <h2 className="text-xl font-black text-white tracking-[0.3em] uppercase mb-2">Security Portal</h2>
                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em] mb-8">Identification Required for Authorized Access</p>
                </div>

                <div className="p-10 pt-0">
                  <AuthForms onSuccess={() => router.refresh()} />
                </div>

                <div className="px-10 py-6 border-t border-white/[0.04] text-center bg-white/[0.01]">
                  <span className="text-[10px] font-black text-white/10 uppercase tracking-[0.5em] italic">
                    Zero Data Footprint Protocol
                  </span>
                </div>
              </div>
            </motion.div>
          ) : (
            /* ─── AUTHORIZED PROFILE ─── */
            <motion.div
              key="profile-view"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-5xl mx-auto space-y-12"
            >
              {/* Header area with Back button */}
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => router.push('/')}
                    className="w-12 h-12 rounded-2xl glass-card border-white/10 flex items-center justify-center hover:bg-white/10 transition-all hover:scale-110 active:scale-95 text-white/40 hover:text-white"
                  >
                    <ArrowLeft size={24} />
                  </button>
                  <div>
                    <h1 className="text-3xl font-black text-white tracking-widest uppercase">Member Profile</h1>
                    <p className="text-[10px] font-black text-night-emerald uppercase tracking-[0.5em] flex items-center gap-2 mt-2">
                       <span className="w-2 h-2 rounded-full bg-night-emerald animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                       Authorized Agent Access • {user?.uid.slice(0, 8)}
                    </p>
                  </div>
                </div>
                
                {/* Visualizer inside Header for full page */}
                <div className="hidden md:flex gap-8 items-center bg-white/[0.03] backdrop-blur-xl border border-white/10 p-4 px-8 rounded-[2rem]">
                  <div className="text-right">
                     <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em] mb-1">Ecosystem integrity</p>
                     <p className="text-sm font-black text-night-emerald uppercase tracking-widest">99.9% SECURED</p>
                  </div>
                  <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: "99.9%" }} className="h-full bg-night-indigo" />
                  </div>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left: Identity Section */}
                <div className="lg:col-span-7">
                  <motion.div variants={itemVariants}>
                    <TiltCard color="#ffffff" className="p-10 sm:p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
                      <div className="absolute -top-10 -right-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-1000 rotate-12">
                        <Shield size={300} className="text-white" />
                      </div>

                      <div className="flex flex-col sm:flex-row items-center gap-10 mb-12 relative z-10 text-center sm:text-left">
                        <div className="relative group/avatar shrink-0">
                           <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-night-indigo via-sky-400 to-night-emerald p-[1px] shadow-[0_30px_70px_rgba(99,102,241,0.4)] overflow-hidden transition-all duration-700 group-hover/avatar:scale-105 group-hover/avatar:rotate-3 relative">
                              {user?.photoURL ? (
                                <Image 
                                  key={user.photoURL}
                                  src={user.photoURL} 
                                  alt="Avatar" 
                                  width={128}
                                  height={128}
                                  className="w-full h-full object-cover rounded-[2.35rem]" 
                                  unoptimized // Since it's from Firebase Storage/User provided
                                />
                              ) : null}
                              
                              <div className={`w-full h-full rounded-[2.35rem] bg-night-black flex items-center justify-center text-5xl font-black text-white ${user?.photoURL ? 'hidden' : 'flex'}`}>
                                {avatarInitial}
                              </div>
                           </div>
                           
                           {/* Avatar Upload Overlay (Always Available) */}
                            <label className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 group-hover/avatar:opacity-100 transition-all duration-300 cursor-pointer rounded-[2.5rem] backdrop-blur-sm z-20 border border-white/20">
                              <UserIcon size={32} className="text-white mb-2" />
                              <span className="text-[8px] font-black text-white uppercase tracking-[0.2em]">Update Identity</span>
                              <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (file && auth.currentUser) {
                                    try {
                                      const storageRef = ref(storage, `avatars/${auth.currentUser.uid}`);
                                      await uploadBytes(storageRef, file);
                                      const downloadURL = await getDownloadURL(storageRef);
                                      await updateProfile(auth.currentUser, { photoURL: downloadURL });
                                      await setDoc(doc(db, "users", auth.currentUser.uid), {
                                        photoURL: downloadURL,
                                        lastUpdated: new Date().toISOString()
                                      }, { merge: true });
                                      window.location.reload();
                                    } catch (error) {
                                      console.error("Avatar upload failed:", error);
                                    }
                                  }
                                }}
                              />
                            </label>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-4 justify-center sm:justify-start">
                             <AnimatePresence mode="wait">
                                {!isEditingName ? (
                                   <motion.div 
                                      key="display-name"
                                      className="flex items-center gap-4 group/name"
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      exit={{ opacity: 0, x: 10 }}
                                   >
                                      <h2 className="text-5xl font-black text-white tracking-widest uppercase">{displayName}</h2>
                                      <button 
                                         onClick={() => setIsEditingName(true)}
                                         className="p-2 opacity-0 group-hover/name:opacity-100 transition-opacity hover:bg-white/5 rounded-lg text-white/20 hover:text-white"
                                      >
                                         <Pencil size={18} />
                                      </button>
                                   </motion.div>
                                ) : (
                                   <motion.div 
                                      key="edit-name"
                                      className="flex items-center gap-3 w-full max-w-sm"
                                      initial={{ opacity: 0, scale: 0.95 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      exit={{ opacity: 0, scale: 0.95 }}
                                   >
                                      <input 
                                         autoFocus
                                         type="text"
                                         value={newName}
                                         onChange={(e) => setNewName(e.target.value)}
                                         className="bg-white/5 border border-night-indigo/30 rounded-xl px-6 py-3 text-2xl font-black text-white tracking-widest uppercase focus:outline-none focus:border-night-indigo shadow-[0_0_20px_rgba(99,102,241,0.2)] w-full"
                                         onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                                      />
                                      <button 
                                         disabled={isSaving}
                                         onClick={handleSaveName}
                                         className="p-3 bg-night-emerald/20 hover:bg-night-emerald/30 border border-night-emerald/50 rounded-xl text-night-emerald transition-all disabled:opacity-50"
                                      >
                                         {isSaving ? <Activity size={20} className="animate-spin" /> : <Check size={20} />}
                                      </button>
                                      <button 
                                         disabled={isSaving}
                                         onClick={() => { setIsEditingName(false); setNewName(displayName); }}
                                         className="p-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-xl text-red-500 transition-all disabled:opacity-50"
                                      >
                                         <XIcon size={20} />
                                      </button>
                                   </motion.div>
                                )}
                             </AnimatePresence>
                          </div>
                          
                          <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                             <div className="px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-xs font-black text-white/50 tracking-widest uppercase">
                                Verified Agent
                             </div>
                             <div className="px-4 py-2 rounded-xl bg-night-indigo/20 border border-night-indigo/30 text-[10px] font-black text-night-indigo tracking-[0.2em] uppercase">
                                LVL 4 Security
                             </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-8 pt-10 border-t border-white/10 relative z-10">
                        <ProfileDetail icon={<UserIcon size={20} />} label="Operator Identity" value={displayName} />
                        <ProfileDetail icon={<Mail size={20} />} label="Communication Port" value={user?.email || "ANONYMOUS"} />
                        <ProfileDetail icon={<Calendar size={20} />} label="First Authorization" value={joinDate} />
                      </div>
                    </TiltCard>
                  </motion.div>
                </div>

                {/* Right: Stats & System */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6 h-full content-start">
                    <StatCard icon={<Activity size={18} />} label="Signal Status" value="SYNCHRONIZED" color="emerald" />
                    <StatCard icon={<Cpu size={18} />} label="Core Compute" value="HIGH POLY" color="indigo" />
                    <StatCard icon={<HardDrive size={18} />} label="Storage Vault" value="ENCRYPTED" color="white" />
                    <StatCard icon={<Terminal size={18} />} label="CLI Access" value="REMOTE v2.1" color="white" />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                     <TiltCard color="#10b981" className="p-8 rounded-[2.5rem] bg-gradient-to-br from-night-emerald/10 to-transparent border-night-emerald/20">
                        <div className="flex items-center justify-between mb-4">
                           <div className="flex items-center gap-3">
                              <Shield size={20} className="text-night-emerald" />
                              <span className="text-sm font-black text-white uppercase tracking-widest">Protocol Threat Detection</span>
                           </div>
                           <span className="text-[10px] font-bold text-night-emerald/50 uppercase">0% Interference</span>
                        </div>
                        <p className="text-xs text-white/40 leading-relaxed italic">All local processes are being monitored for data leaks and unauthorized injections.</p>
                     </TiltCard>
                  </motion.div>
                </div>
              </div>

              {/* Bottom: Protocols & Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12">
                 <div className="lg:col-span-12">
                   <motion.div variants={itemVariants}>
                      <h3 className="text-[10px] font-black text-white/20 uppercase tracking-[0.6em] mb-8 flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-night-indigo" />
                        Peripheral Access Protocols
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <ProtocolButton icon={<Shield size={18} />} label="About Core" onClick={() => router.push('/about')} />
                        <ProtocolButton icon={<Shield size={18} />} label="Privacy Vault" onClick={() => router.push('/privacy')} />
                        <ProtocolButton icon={<Shield size={18} />} label="Legal Terms" onClick={() => router.push('/terms')} />
                        <ProtocolButton icon={<Shield size={18} />} label="Contact Hub" onClick={() => router.push('/contact')} />
                      </div>
                   </motion.div>
                 </div>

                 <div className="lg:col-span-12 flex flex-col md:flex-row gap-6">
                    <motion.div variants={itemVariants} className="flex-1">
                       <button className="w-full h-full py-8 px-10 rounded-[2.5rem] night-btn-gradient flex items-center justify-between group transition-all relative overflow-hidden">
                          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="flex items-center gap-6 relative z-10">
                            <Settings size={24} className="text-white/60 group-hover:text-white transition-colors" />
                            <div className="text-left">
                               <p className="text-lg font-black text-white uppercase tracking-wider">System Settings</p>
                               <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mt-1">Configure user interface & engine</p>
                            </div>
                          </div>
                       </button>
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="flex-1">
                       <button 
                         onClick={() => { signOut(); router.push('/'); }}
                         className="w-full h-full py-8 px-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 hover:border-red-500/50 hover:bg-red-500/5 transition-all group flex items-center justify-between"
                       >
                          <div className="flex items-center gap-6">
                            <LogOut size={24} className="text-white/40 group-hover:text-red-500 transition-colors" />
                            <div className="text-left">
                               <p className="text-lg font-black text-white/80 group-hover:text-white uppercase tracking-wider">Terminate Session</p>
                               <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mt-1">Clear all local caches & exit hub</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-black text-white/10 group-hover:text-white/30 uppercase tracking-[0.4em] rotate-90">SAFETY EXIT</span>
                       </button>
                    </motion.div>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </main>
  );
}
