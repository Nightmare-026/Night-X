"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Shield, Lock, Eye, Server, ChevronLeft, AlertTriangle, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Background3D } from "@/components/visuals/Background3D";

export default function SecurityPage() {
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

      {/* Aura Decoration */}
      <div className="fixed top-0 right-1/4 w-[500px] h-[500px] bg-amber-500/5 blur-[150px] rounded-full pointer-events-none -z-10" />
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
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-8 shadow-[0_0_30px_rgba(245,158,11,0.1)]">
              <Shield size={14} className="text-amber-400 animate-pulse" />
              <span className="text-[10px] font-black tracking-[0.4em] text-white/80 uppercase">Security Overview • 2026</span>
            </div>
            <h1 className="text-[clamp(40px,8vw,85px)] font-black tracking-tighter text-white leading-[0.85] mb-10">
              SECURITY &amp; <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent drop-shadow-[0_10px_30px_rgba(245,158,11,0.2)]">TRUST</span>
            </h1>
            <p className="text-white/40 text-lg md:text-2xl font-medium max-w-2xl leading-relaxed italic">
              &quot;Security is not a feature — it is the architecture.&quot;
            </p>
          </motion.header>

          {/* Content */}
          <div className="space-y-16 md:space-y-28">

            {/* How We Process Data */}
            <motion.div variants={itemVariants}>
              <Section
                id="processing"
                icon={<Eye className="text-amber-400" size={28} />}
                title="How We Process Your Data"
                content="Most Night X tools — image converters, text utilities, code formatters — run entirely in your browser using client-side JavaScript and WebAssembly (WASM). Your files and inputs are never uploaded to our servers for these operations. Only Firebase Authentication handles your account credentials, using Google's secure OAuth infrastructure."
              />
            </motion.div>

            {/* Infrastructure */}
            <motion.div variants={itemVariants}>
              <Section
                id="infrastructure"
                icon={<Server className="text-night-indigo" size={28} />}
                title="Our Infrastructure"
                content={
                  <div className="space-y-6">
                    <p className="text-white/50">Night X is hosted on industry-leading cloud infrastructure:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <InfraCard
                        name="Firebase"
                        role="Authentication & Storage"
                        desc="Google Firebase handles sign-in via OAuth 2.0. We do not store passwords. Session tokens are managed by Firebase SDK."
                      />
                      <InfraCard
                        name="Vercel"
                        role="Hosting & Edge Delivery"
                        desc="Night X is deployed on Vercel with automatic HTTPS, HTTP/2, and global edge caching for optimal performance."
                      />
                    </div>
                  </div>
                }
              />
            </motion.div>

            {/* Transport Security */}
            <motion.div variants={itemVariants}>
              <Section
                id="transport"
                icon={<Lock className="text-night-emerald" size={28} />}
                title="Transport Security"
                content={
                  <div className="space-y-6">
                    <p className="text-white/50">All communication between your browser and Night X servers is encrypted:</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { label: "TLS 1.2 / 1.3", detail: "All HTTP traffic encrypted in transit" },
                        { label: "HTTPS Only", detail: "HTTP requests redirected to HTTPS automatically" },
                        { label: "HSTS Enabled", detail: "Browser enforces secure connections always" },
                      ].map((item) => (
                        <div key={item.label} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-night-emerald/20 transition-all">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle size={14} className="text-night-emerald" />
                            <span className="text-xs font-black text-white/80 uppercase tracking-wider">{item.label}</span>
                          </div>
                          <p className="text-[12px] text-white/40 leading-relaxed">{item.detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                }
              />
            </motion.div>

            {/* Honest Limitations */}
            <motion.div variants={itemVariants}>
              <Section
                id="limitations"
                icon={<AlertTriangle className="text-red-400" size={28} />}
                title="Honest Limitations"
                content={
                  <div className="space-y-5">
                    <p className="text-white/50">In the interest of full transparency, we disclose the following:</p>
                    <div className="space-y-3">
                      {[
                        "We do not offer end-to-end encryption for stored account data — Firebase manages this at their infrastructure level.",
                        "Anonymous telemetry may be collected to monitor platform stability and detect errors.",
                        "We do not perform independent security audits — we rely on Firebase and Vercel's SOC 2 compliance.",
                        "Tools that use the Storage module (if enabled) temporarily transfer files to Firebase Storage. These are deleted after processing.",
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-red-500/[0.03] border border-red-500/10">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500/60 mt-2 shrink-0" />
                          <p className="text-[13px] text-white/40 leading-relaxed">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                }
              />
            </motion.div>

            {/* Report a Vulnerability */}
            <motion.div variants={itemVariants} className="bg-white/[0.02] border border-white/5 p-12 md:p-16 rounded-[4rem] text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <p className="text-white/20 text-[10px] uppercase font-black tracking-[0.5em] mb-6">Responsible Disclosure</p>
              <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
                Found a security vulnerability? Please report it responsibly via our{" "}
                <Link href="/contact" className="text-amber-400 hover:text-amber-300 underline underline-offset-4 transition-colors">
                  Contact page
                </Link>{" "}
                instead of publicly disclosing it. We will acknowledge and address valid reports promptly.
              </p>
              <div className="mt-12 flex justify-center opacity-30 group-hover:opacity-60 transition-opacity">
                <Shield size={48} className="text-white" />
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
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-[2rem] glass-card flex items-center justify-center shrink-0 border-white/5 shadow-2xl group-hover:border-amber-500/20 group-hover:shadow-amber-500/5 transition-all duration-500">
        {icon}
      </div>
      <div className="pt-3">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-8 uppercase tracking-tighter">{title}</h2>
        <div className="text-white/60 text-lg md:text-xl leading-relaxed font-medium">
          {typeof content === "string" ? <p>{content}</p> : content}
        </div>
      </div>
    </div>
  );
}

function InfraCard({ name, role, desc }: { name: string; role: string; desc: string }) {
  return (
    <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all">
      <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-3 block">{role}</span>
      <h3 className="text-base font-black text-white/80 uppercase mb-3 tracking-tight">{name}</h3>
      <p className="text-[13px] text-white/40 leading-relaxed font-medium">{desc}</p>
    </div>
  );
}
