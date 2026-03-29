"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Globe, Shield, Zap, Target, User as Architect, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Background3D } from "@/components/visuals/Background3D";

export default function AboutPage() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
      <div className="fixed bottom-0 right-1/4 w-[400px] h-[400px] bg-night-emerald/5 blur-[120px] rounded-full pointer-events-none -z-10" />

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
              <Target size={14} className="text-night-indigo animate-pulse" />
              <span className="text-[10px] font-black tracking-[0.4em] text-white/80 uppercase">The Manifesto • v1.1.0</span>
            </div>
            <h1 className="text-[clamp(40px,8vw,85px)] font-black tracking-tighter text-white leading-[0.85] mb-10">
              THE SOVEREIGN <br />
              <span className="bg-gradient-to-r from-night-indigo via-sky-400 to-night-emerald bg-clip-text text-transparent drop-shadow-[0_10px_30px_rgba(99,102,241,0.2)]">ECOSYSTEM</span>
            </h1>
            <p className="text-white/40 text-lg md:text-2xl font-medium max-w-2xl leading-relaxed italic">
              "In an era of surveillance, sovereignty is a technical choice."
            </p>
          </motion.header>

          {/* Pillars Section */}
          <div className="space-y-16 md:space-y-28">
            <motion.div variants={itemVariants}>
              <Section 
                id="genesis"
                icon={<Globe className="text-night-indigo" size={28} />}
                title="The Genesis"
                content="Night X was architected by 'Nightmare' as a response to the clutter and surveillance of the modern web. We believe your tools should look like premium software, run at the edge of your network, and honor your boundaries implicitly."
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Section 
                id="pillars"
                icon={<Zap className="text-sky-400" size={28} />}
                title="Our Technical Pillars"
                content={(
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
                    <PillarItem 
                      title="Privacy First" 
                      desc="Zero Data Footprint architecture ensures your inputs never leave your session."
                      icon={<Shield size={20} className="text-night-emerald" />}
                    />
                    <PillarItem 
                      title="Edge Performance" 
                      desc="Client-side processing offloads compute to your hardware for zero-latency execution."
                      icon={<Zap size={20} className="text-amber-400" />}
                    />
                    <PillarItem 
                      title="Elite UI/UX" 
                      desc="Matte-v2 design system for a distraction-free, professional focus environment."
                      icon={<Globe size={20} className="text-indigo-400" />}
                    />
                    <PillarItem 
                      title="Sovereign Tools" 
                      desc="Modular utilities covering Media, Development, and Executive calculations."
                      icon={<Target size={20} className="text-sky-400" />}
                    />
                  </div>
                )}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Section 
                id="architect"
                icon={<Architect className="text-night-emerald" size={28} />}
                title="Meet the Architect"
                highlight="Lead System Designer"
                content="Night X is designed and maintained by 'Nightmare'—a principal engineer focused on the intersection of privacy-centric infrastructure and cutting-edge product design. Every pixel and line of logic is vetted for performance and security."
              />
            </motion.div>

            {/* Bottom Status */}
            <motion.div variants={itemVariants} className="bg-white/[0.02] border border-white/5 p-12 md:p-16 rounded-[4rem] text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-night-indigo/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <p className="text-white/20 text-[10px] uppercase font-black tracking-[0.5em] mb-6">Official Deployment Pipeline</p>
              <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
                Launched on March 29, 2026, Night X committed to a roadmap of zero server dependency and 100% agent empowerment. This is only the beginning.
              </p>
              <div className="mt-12 flex justify-center opacity-30 group-hover:opacity-60 transition-opacity">
                <Globe size={48} className="text-white animate-spin-slow" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <Footer />
    </main>
  );
}

function Section({ id, icon, title, highlight, content }: {
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

function PillarItem({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) {
  return (
    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 group hover:border-white/10 transition-all">
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <h4 className="text-xs font-black text-white/80 uppercase tracking-widest">{title}</h4>
      </div>
      <p className="text-[11px] text-white/40 leading-relaxed font-medium">{desc}</p>
    </div>
  );
}
