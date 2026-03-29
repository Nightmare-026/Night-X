"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Scale, Copyright, ChevronLeft, AlertOctagon } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Background3D } from "@/components/visuals/Background3D";

export default function TermsPage() {
  return (
    <main className="relative min-h-screen matte-grain selection:bg-night-indigo/30 overflow-x-hidden">
      <Background3D />
      <Navbar />

      <div className="pt-32 pb-20 px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Back Navigation */}
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all mb-12 group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-widest">Return to Dashboard</span>
          </Link>

          {/* Header */}
          <header className="mb-16 md:mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
               <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-night-indigo/10 border border-night-indigo/20 mb-6">
                <Shield size={14} className="text-night-indigo" />
                <span className="text-[10px] font-black tracking-[0.3em] text-white uppercase">Legal Protocol • v1.0.2</span>
              </div>
              <h1 className="text-[clamp(40px,8vw,80px)] font-black tracking-tighter text-white leading-[0.9] mb-8">
                TERMS OF <br />
                <span className="bg-gradient-to-r from-night-indigo via-sky-400 to-night-emerald bg-clip-text text-transparent">SERVICE</span>
              </h1>
              <p className="text-white/40 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
                Legally-binding framework governing the usage, intellectual property, and security requirements of the Night X digital ecosystem.
              </p>
            </motion.div>
          </header>

          {/* Content Grid */}
          <div className="space-y-12 md:space-y-20">
            <LegalSection 
              id="acceptance"
              icon={<Scale className="text-night-indigo" />}
              title="Acceptance of Terms"
              content="By accessing or utilizing the Night X platform (hereinafter referred to as the 'Platform'), you explicitly acknowledge that you have read, understood, and agree to be bound by these Terms of Service. This agreement constitutes a legally-binding contract between you and the platform owner, known as 'Nightmare'."
            />

            <LegalSection 
              id="ownership"
              icon={<Copyright className="text-sky-400" />}
              title="Intellectual Property Rights"
              highlight="Sovereign Ownership"
              content="All original content, features, functionality, source code, UI/UX designs, algorithms, branding, and assets on this Platform are the exclusive property of 'Nightmare'. These are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws. Total ownership is retained by Nightmare."
            />

            <LegalSection 
              id="restrictions"
              icon={<AlertOctagon className="text-red-500" />}
              title="Critical Restrictions"
              content={(
                <div className="space-y-4">
                  <p className="text-red-400/80 font-bold uppercase tracking-widest text-[11px] mb-2">Unauthorized access or duplication is strictly prohibited:</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <RestrictionItem text="Source Code Extraction/Copying" />
                    <RestrictionItem text="Cloning or Replication of UI" />
                    <RestrictionItem text="Reverse Engineering of Logic" />
                    <RestrictionItem text="Commercial Redistribution" />
                    <RestrictionItem text="Automated Scraping/Crawling" />
                    <RestrictionItem text="Unauthorized API Integration" />
                  </ul>
                  <p className="p-4 rounded-2xl bg-red-500/5 border border-red-500/10 text-red-400/60 text-xs italic mt-4">
                    Violations of these restrictions will result in immediate termination of access and potential legal action under the governing jurisdiction.
                  </p>
                </div>
              )}
            />

            <LegalSection 
              id="liability"
              icon={<Lock className="text-night-emerald" />}
              title="Limitation of Liability"
              content="Night X is provided on an 'AS IS' and 'AS AVAILABLE' basis. To the maximum extent permitted by law, Nightmare shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, use, or other intangible losses resulting from your access to or use of the service."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12 border-y border-white/5">
                <MiniSection 
                  title="Acceptable Use"
                  text="Users must maintain session integrity and utilize tools for lawful purposes only. Any attempt to undermine platform security will be logged."
                />
                <MiniSection 
                  title="Jurisdiction"
                  text="These terms are governed and construed in accordance with the laws of India, without regard to its conflict of law provisions."
                />
            </div>

            <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[3rem] text-center">
              <p className="text-white/20 text-xs uppercase font-black tracking-[0.5em] mb-4">Final Protocol Execution</p>
              <p className="text-white/60 text-sm max-w-xl mx-auto leading-relaxed">
                Nightmare reserves the right to modify these terms at any time without prior notice. Continuous usage of the platform after changes constitutes acceptance of modified terms.
              </p>
              <div className="mt-8 flex justify-center opacity-30">
                <Shield size={40} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

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
    <motion.section 
      id={id}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="flex items-start gap-6">
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-[1.75rem] glass-card flex items-center justify-center shrink-0 border-white/5 shadow-2xl group-hover:border-white/10 transition-all">
          {icon}
        </div>
        <div className="pt-2">
          {highlight && (
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-2 block">{highlight}</span>
          )}
          <h3 className="text-2xl md:text-3xl font-black text-white mb-6 uppercase tracking-tight">{title}</h3>
          <div className="text-white/60 text-base md:text-lg leading-relaxed font-medium">
             {typeof content === 'string' ? <p>{content}</p> : content}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function RestrictionItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
      <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
      <span className="text-sm font-bold text-white/50 tracking-wide">{text}</span>
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
