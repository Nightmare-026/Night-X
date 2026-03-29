"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Mail, MessageSquare, Send, Globe, ChevronLeft, ShieldCheck, Clock } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Background3D } from "@/components/visuals/Background3D";

import { TiltCard } from "@/components/ui/TiltCard";

export default function ContactPage() {
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
    <main className="relative min-h-screen matte-grain selection:bg-night-indigo/30 overflow-x-hidden bg-night-black text-white">
      <Background3D />
      <Navbar />

      {/* Extreme Aura Decoration */}
      <div className="fixed top-0 right-1/4 w-[500px] h-[500px] bg-sky-500/10 blur-[150px] rounded-full pointer-events-none -z-10" />
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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/[0.03] border border-white/10 text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all mb-12 group shadow-2xl backdrop-blur-md no-underline"
            >
              <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Return to Dashboard</span>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header variants={itemVariants} className="mb-16 md:mb-24">
             <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-night-indigo/10 border border-night-indigo/20 mb-8 shadow-[0_0_30px_rgba(99,102,241,0.1)]">
              <MessageSquare size={14} className="text-night-indigo animate-pulse" />
              <span className="text-[10px] font-black tracking-[0.4em] text-white/80 uppercase">Liaison Protocol • v1.1.0</span>
            </div>
            <h1 className="text-[clamp(40px,8vw,85px)] font-black tracking-tighter text-white leading-[0.85] mb-10">
              PRINCIPAL <br />
              <span className="bg-gradient-to-r from-night-indigo via-sky-400 to-night-emerald bg-clip-text text-transparent drop-shadow-[0_10px_30px_rgba(99,102,241,0.2)]">COMMUNICATION</span>
            </h1>
            <p className="text-white/40 text-lg md:text-2xl font-medium max-w-2xl leading-relaxed italic">
              "Architecture thrives on high-signal correspondence."
            </p>
          </motion.header>

          {/* Channel Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
            <motion.div variants={itemVariants}>
              <TiltCard
                color="#4338ca"
                className="p-10 rounded-[4rem] group flex flex-col justify-between min-h-[440px]"
              >
                <div style={{ transform: "translateZ(60px)" }}>
                  <div className="w-16 h-16 rounded-[1.5rem] bg-night-indigo/10 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500 shadow-2xl border border-night-indigo/20 group-hover:bg-night-indigo/20">
                    <Mail size={28} className="text-night-indigo" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-6 uppercase tracking-tighter">Official Inbox</h3>
                  <p className="text-white/40 text-base mb-10 leading-relaxed font-medium">
                    Preferred channel for support, legal notices, and detailed architectural feedback.
                  </p>
                </div>
                <div style={{ transform: "translateZ(80px)" }}>
                  <a 
                    href="mailto:ganeshsharma7114@gmail.com"
                    className="inline-flex items-center gap-4 px-8 py-4 rounded-[1.25rem] bg-night-indigo text-white font-black text-[11px] uppercase tracking-[0.3em] shadow-[0_20px_40px_rgba(99,102,241,0.3)] hover:scale-105 hover:shadow-[0_25px_50px_rgba(99,102,241,0.4)] transition-all active:scale-95 no-underline"
                  >
                    Launch Protocol <Send size={16} />
                  </a>
                  <p className="mt-8 text-[12px] font-black text-white/20 uppercase tracking-[0.4em]">
                    ganeshsharma7114@gmail.com
                  </p>
                </div>
              </TiltCard>
            </motion.div>

            <motion.div variants={itemVariants}>
              <TiltCard
                color="#10b981"
                className="p-10 rounded-[4rem] group flex flex-col justify-between min-h-[440px]"
              >
                <div style={{ transform: "translateZ(60px)" }}>
                  <div className="w-16 h-16 rounded-[1.5rem] bg-emerald-400/10 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500 shadow-2xl border border-emerald-400/20 group-hover:bg-emerald-400/20">
                    <Globe size={28} className="text-emerald-400" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-6 uppercase tracking-tighter">Global Ecosystem</h3>
                  <p className="text-white/40 text-base mb-10 leading-relaxed font-medium">
                    Explore our open digital infrastructure and sovereign source control protocols.
                  </p>
                </div>
                <div style={{ transform: "translateZ(80px)" }}>
                  <a 
                    href="https://github.com/Nightmare-026/Night-X"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-4 px-8 py-4 rounded-[1.25rem] bg-white/5 border border-white/10 text-white font-black text-[11px] uppercase tracking-[0.3em] hover:bg-white/10 hover:border-white/20 transition-all active:scale-95 no-underline"
                  >
                    View Repository <Globe size={16} />
                  </a>
                  <p className="mt-8 text-[12px] font-black text-white/20 uppercase tracking-[0.4em]">
                    Nightmare-026 / Night-X
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          </div>

          {/* Protocols Section */}
          <motion.div variants={itemVariants} className="space-y-12 md:space-y-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-16 border-t border-white/5">
                <ProtocolSection 
                  icon={<Clock size={20} className="text-night-indigo" />}
                  title="Response Window"
                  text="Legitimate inquiries are processed within 24–72 hours. Security-critical reports are prioritized immediately."
                />
                <ProtocolSection 
                  icon={<ShieldCheck size={20} className="text-night-emerald" />}
                  title="Professional Scope"
                  text="We disregard spam, marketing solicitations, and abusive correspondence to maintain a high-signal environment."
                />
            </div>
          </motion.div>
        </div>
      </motion.div>

      <Footer />
    </main>
  );
}

function ProtocolSection({ icon, title, text }: { icon: React.ReactNode, title: string, text: string }) {
  return (
    <TiltCard 
      color="#10b981"
      className="space-y-6 p-8 rounded-[3rem]"
    >
      <div style={{ transform: "translateZ(30px)" }}>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-white/[0.03] flex items-center justify-center border border-white/5">
            {icon}
          </div>
          <h4 className="text-xs font-black text-white/90 uppercase tracking-[0.3em]">{title}</h4>
        </div>
        <p className="text-base text-white/40 leading-relaxed font-medium">{text}</p>
      </div>
    </TiltCard>
  );
}
