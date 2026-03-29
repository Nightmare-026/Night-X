"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Lock, Scale, Copyright, ChevronLeft, AlertOctagon, Gavel } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Background3D } from "@/components/visuals/Background3D";

export default function TermsPage() {
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
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-night-indigo/10 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[400px] h-[400px] bg-sky-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

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
             <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-night-indigo/10 border border-night-indigo/20 mb-8 shadow-[0_0_30px_rgba(99,102,241,0.1)]">
              <Gavel size={14} className="text-night-indigo animate-pulse" />
              <span className="text-[10px] font-black tracking-[0.4em] text-white/80 uppercase">Service Protocol • v1.1.0</span>
            </div>
            <h1 className="text-[clamp(40px,8vw,85px)] font-black tracking-tighter text-white leading-[0.85] mb-10">
              SERVICE <br />
              <span className="bg-gradient-to-r from-night-indigo via-sky-400 to-night-emerald bg-clip-text text-transparent drop-shadow-[0_10px_30px_rgba(99,102,241,0.2)]">CHARTER</span>
            </h1>
            <p className="text-white/40 text-lg md:text-2xl font-medium max-w-2xl leading-relaxed italic">
              "Authority is derived from architectural integrity."
            </p>
          </motion.header>

          {/* Content Grid */}
          <div className="space-y-16 md:space-y-28">
            <motion.div variants={itemVariants}>
              <LegalSection 
                id="acceptance"
                icon={<Scale className="text-night-indigo" size={28} />}
                title="Acceptance of Protocol"
                content="By accessing or utilizing the Night X platform, you explicitly acknowledge that you have read, understood, and agree to be bound by this Service Protocol. This agreement constitutes a legally-binding contract between you and the principal architect, 'Nightmare'."
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <LegalSection 
                id="ownership"
                icon={<Copyright className="text-sky-400" size={28} />}
                title="Sovereign Intellectual Property"
                highlight="Exclusive Ownership"
                content="All source code, UI/UX designs, algorithms, branding, and assets on this Platform are the exclusive property of 'Nightmare'. These are protected by international copyright and trade secret laws. No license is granted for cloning or redistribution."
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <LegalSection 
                id="restrictions"
                icon={<AlertOctagon className="text-red-500" size={28} />}
                title="Operational Restrictions"
                content={(
                  <div className="space-y-8">
                    <p className="text-white/50">Unauthorized activities are strictly prohibited and monitored:</p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <RestrictionItem text="Source Code Extraction" />
                      <RestrictionItem text="Commercial Replication of UI" />
                      <RestrictionItem text="Reverse Engineering of Logic" />
                      <RestrictionItem text="Automated Scraping/Bots" />
                    </ul>
                    <p className="p-5 rounded-3xl bg-red-500/5 border border-red-500/10 text-red-400/60 text-sm italic mt-6 leading-relaxed">
                      "Violations will result in immediate termination of access and potential legal action under the governing jurisdiction."
                    </p>
                  </div>
                )}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <LegalSection 
                id="liability"
                icon={<Lock className="text-night-emerald" size={28} />}
                title="Disclaimer & Liability"
                highlight="Zero Warranty Architecture"
                content="Night X tools are provided 'AS IS'. Nightmare makes no warranties regarding the accuracy of calculations or processed data. Nightmare shall not be liable for any indirect, incidental, or consequential damages resulting from platform usage."
              />
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-12 py-16 border-y border-white/5">
                <MiniSection 
                  title="Acceptable Use"
                  text="Users must maintain session integrity and utilize tools for lawful purposes only. Any attempt to undermine security will be logged."
                />
                <MiniSection 
                  title="Jurisdiction"
                  text="Governed by the laws of India, specifically the courts selected by the platform owner."
                />
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white/[0.02] border border-white/5 p-12 md:p-16 rounded-[4rem] text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-night-indigo/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <p className="text-white/20 text-[10px] uppercase font-black tracking-[0.5em] mb-6">Protocol Version Execution</p>
              <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
                Nightmare reserves the right to modify this protocol at any time without prior notice. Continuous usage after changes constitutes acceptance.
              </p>
              <div className="mt-12 flex justify-center opacity-30 group-hover:opacity-60 transition-opacity">
                <Gavel size={48} className="text-white" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <Footer />
    </main>
  );
}

function LegalSection({ id, icon, title, highlight, content }: {
  id: string;
  icon: React.ReactNode;
  title: string;
  highlight?: string;
  content: React.ReactNode;
}) {
  return (
    <div id={id} className="group flex items-start gap-8">
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-[2rem] glass-card flex items-center justify-center shrink-0 border-white/5 shadow-2xl group-hover:border-night-indigo/20 group-hover:shadow-night-indigo/5 transition-all duration-500">
        {icon}
      </div>
      <div className="pt-3">
        {highlight && (
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-3 block">{highlight}</span>
        )}
        <h3 className="text-3xl md:text-4xl font-black text-white mb-8 uppercase tracking-tighter">{title}</h3>
        <div className="text-white/60 text-lg md:text-xl leading-relaxed font-medium">
           {typeof content === 'string' ? <p>{content}</p> : content}
        </div>
      </div>
    </div>
  );
}

function RestrictionItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all group/item">
      <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)] group-hover/item:scale-125 transition-transform" />
      <span className="text-sm font-black text-white/40 group-hover/item:text-white/60 uppercase tracking-widest leading-none">{text}</span>
    </li>
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
