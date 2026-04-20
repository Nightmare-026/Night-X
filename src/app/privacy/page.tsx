"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Shield, Lock, EyeOff, UserCheck, ChevronLeft, Database } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Background3D } from "@/components/visuals/Background3D";

export default function PrivacyPage() {
  const containerVariants: Variants = {
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
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        type: "spring",
        damping: 25,
        stiffness: 120
      } 
    }
  };

  return (
    <main className="relative min-h-screen matte-grain selection:bg-night-indigo/30 overflow-x-hidden bg-night-black">
      <Background3D />
      <Navbar />

      {/* Extreme Aura Decoration */}
      <div className="fixed top-0 right-1/4 w-[500px] h-[500px] bg-night-emerald/10 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-1/4 w-[400px] h-[400px] bg-night-indigo/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="pt-32 pb-20 px-4 sm:px-6 relative z-10"
      >
        <div className="max-w-4xl mx-auto">
          {/* Back Navigation */}
           <motion.div variants={itemVariants}>
            <Link 
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/[0.03] border border-white/10 text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all mb-12 group shadow-2xl backdrop-blur-md"
            >
              <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Return to Dashboard</span>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header variants={itemVariants} className="mb-16 md:mb-24">
             <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-night-emerald/10 border border-night-emerald/20 mb-8 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
              <Shield size={14} className="text-night-emerald animate-pulse" />
              <span className="text-[10px] font-black tracking-[0.4em] text-white/80 uppercase">Privacy Protocol • v1.1.0</span>
            </div>
            <h1 className="text-[clamp(40px,8vw,85px)] font-black tracking-tighter text-white leading-[0.85] mb-10">
              DATA <br />
              <span className="bg-gradient-to-r from-night-emerald via-teal-400 to-night-indigo bg-clip-text text-transparent drop-shadow-[0_10px_30px_rgba(16,185,129,0.2)]">PROTECTION</span>
            </h1>
            <p className="text-white/40 text-lg md:text-2xl font-medium max-w-2xl leading-relaxed italic">
              "Privacy is not a feature, it's a foundational technical constraint."
            </p>
          </motion.header>

          {/* Content Grid */}
          <div className="space-y-16 md:space-y-28">
            <motion.div variants={itemVariants}>
              <Section 
                id="philosophy"
                icon={<EyeOff className="text-night-emerald" size={28} />}
                title="Our Privacy Philosophy"
                content="Night X is built with privacy as a core design principle. We minimize data collection by running most tool processing entirely in your browser. We do not monetize your identity, and we do not track tool-usage activity."
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Section 
                id="collection"
                icon={<Database className="text-night-indigo" size={28} />}
                title="Data Acquisition"
                content={(
                  <div className="space-y-8">
                    <p className="text-white/50">We classify our data interaction into two specific tiers to ensure maximum transparency:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <DataCard 
                        tier="Tier I"
                        label="Identity Data"
                        desc="Emails and basic profile info via Firebase/Google Auth for account sync."
                      />
                      <DataCard 
                        tier="Tier II"
                        label="Telemetry"
                        desc="Anonymous metadata used to monitor system performance and detect anomalies."
                      />
                    </div>
                  </div>
                )}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Section 
                id="security"
                icon={<Lock className="text-amber-400" size={28} />}
                title="Security Architecture"
                content="We implement AES-256 encryption at rest and TLS for data in transit. Your private files processed through our 'Media Hub' never leave your browser window—they are processed entirely at the edge."
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Section 
                id="rights"
                icon={<UserCheck className="text-sky-400" size={28} />}
                title="Your Sovereign Rights"
                content="Under the Digital Personal Data Protection Act 2023 (DPDP Act) and the IT Act, 2000 (India), you retain the right to access, rectify, or request deletion of your personal data. Submit data requests via our Contact page."
              />
            </motion.div>

            {/* Disclaimer Mini Sections */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-12 py-16 border-y border-white/5">
                <MiniSection 
                  title="Third-Party Nodes"
                  text="We use Firebase and Vercel for infrastructure. They are restricted from using your metadata for their independent purposes."
                />
                <MiniSection 
                  title="Zero Selling Policy"
                  text="We do not sell, rent, or trade your personal information to third parties under any circumstances."
                />
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white/[0.02] border border-white/5 p-12 md:p-16 rounded-[4rem] text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-night-emerald/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <p className="text-white/20 text-[10px] uppercase font-black tracking-[0.5em] mb-6">Privacy Watch Protocol</p>
              <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
                Nightmare reserves the right to modify this protocol to reflect architectural changes. Agents will be notified of any material updates via the dashboard.
              </p>
              <div className="mt-12 flex justify-center opacity-30 group-hover:opacity-60 transition-opacity">
                <Lock size={48} className="text-white" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <Footer />
    </main>
  );
}

function Section({ id, icon, title, content }: {
  id: string;
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}) {
  return (
    <div id={id} className="group flex items-start gap-8">
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-[2rem] glass-card flex items-center justify-center shrink-0 border-white/5 shadow-2xl group-hover:border-night-emerald/20 group-hover:shadow-night-emerald/5 transition-all duration-500">
        {icon}
      </div>
      <div className="pt-3">
        <h3 className="text-3xl md:text-4xl font-black text-white mb-8 uppercase tracking-tighter">{title}</h3>
        <div className="text-white/60 text-lg md:text-xl leading-relaxed font-medium">
           {typeof content === 'string' ? <p>{content}</p> : content}
        </div>
      </div>
    </div>
  );
}

function DataCard({ tier, label, desc }: { tier: string, label: string, desc: string }) {
  return (
    <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 group hover:border-white/10 hover:bg-white/[0.04] transition-all">
      <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-3 block">{tier}</span>
      <h4 className="text-base font-black text-white/80 uppercase mb-3 tracking-tight">{label}</h4>
      <p className="text-[13px] text-white/40 leading-relaxed font-medium">{desc}</p>
    </div>
  );
}

function MiniSection({ title, text }: { title: string, text: string }) {
  return (
    <div className="space-y-3">
      <h4 className="text-xs font-black text-white/80 uppercase tracking-widest">{title}</h4>
      <p className="text-sm text-white/40 leading-relaxed font-medium">{text}</p>
    </div>
  );
}
