"use client";

import React from "react";
import { NightXLogo } from "@/components/ui/NightXLogo";
import { Globe, Mail, Shield, Zap } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="relative mt-12 sm:mt-20 pb-8 sm:pb-12 px-4 sm:px-6 border-t border-white/5 bg-night-black/50 backdrop-blur-3xl overflow-hidden">
      {/* Decorative Aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-night-indigo/30 to-transparent" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-night-indigo/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto pt-16 sm:pt-24 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16 mb-16 sm:mb-24 relative z-10">
        {/* Command: Brand Group */}
        <div className="space-y-6 col-span-2 lg:col-span-1 text-center lg:text-left">
          <NightXLogo size={36} />
          <p className="text-white/40 text-[11px] font-medium leading-relaxed max-w-xs mx-auto lg:mx-0 tracking-wide">
            A premium suite of 25+ online tools — image, developer, and text utilities, processed locally in your browser.
          </p>
          <div className="flex justify-center lg:justify-start gap-4 pt-2">
            <SocialLink icon={<Globe size={16} />} href="#" />
            <SocialLink icon={<Mail size={16} />} href="#" />
            <SocialLink icon={<Shield size={16} />} href="#" />
          </div>
        </div>

        {/* Systems: Core Access */}
        <div className="space-y-6">
          <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 border-l-2 border-night-indigo pl-4">Navigation</h4>
          <ul className="space-y-3 pl-5">
            <FooterLink label="Utility Hub" href="/" />
            <FooterLink label="My Profile" href="/profile" />
            <FooterLink label="Feedback" href="/feedback" />
            <FooterLink label="Contact" href="/contact" />
          </ul>
        </div>

        {/* Protocols: Legal & Privacy */}
        <div className="space-y-6">
          <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 border-l-2 border-night-emerald pl-4">Legal</h4>
          <ul className="space-y-3 pl-5">
            <FooterLink label="Privacy Policy" href="/privacy" />
            <FooterLink label="Terms of Service" href="/terms" />
            <FooterLink label="About" href="/about" />
            <FooterLink label="Security Audit" href="/security" />
          </ul>
        </div>

        {/* Support: Feedback & Ops */}
        <div className="space-y-6">
          <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 border-l-2 border-red-500/50 pl-4">Support Hub</h4>
          <div className="pl-5 space-y-4">
             <Link 
               href="/feedback" 
               className="group flex items-center gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-night-indigo/50 hover:bg-night-indigo/5 transition-all duration-500"
             >
                <div className="w-8 h-8 rounded-lg bg-night-indigo/10 flex items-center justify-center text-night-indigo group-hover:scale-110 transition-transform">
                  <Zap size={14} className="fill-current animate-pulse" />
                </div>
                <div>
                   <p className="text-[10px] font-black text-white uppercase tracking-widest">Share Feedback</p>
                   <p className="text-[8px] font-bold text-white/30 uppercase mt-0.5">Report bugs or suggest</p>
                </div>
             </Link>

             <div className="p-4 rounded-2xl border border-white/[0.02] bg-white/[0.01]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-night-emerald shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  <span className="text-[9px] font-black text-white/60 uppercase tracking-widest">Global Status: OK</span>
                </div>
                <p className="text-[8px] font-bold text-white/20 uppercase tracking-tighter">All Systems Operational</p>
             </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Details */}
      <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-4 opacity-40 hover:opacity-100 transition-opacity duration-700">
        <div className="flex items-center gap-6 text-[9px] font-black tracking-[0.3em] text-white/50 uppercase">
          <span>© 2026 Night X Sovereign Hub</span>
          <span className="hidden md:block w-1 h-1 rounded-full bg-white/20" />
          <span className="italic">Your privacy-first utility hub.</span>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
          <Detail icon={<Shield size={10} />} text="TLS In Transit" />
          <Detail icon={<Zap size={10} />} text="Edge Optimized" />
          <Detail icon={<Globe size={10} />} text="Client-Side Processing" />
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ label, href }: { label: string, href: string }) => (
  <li>
    <Link href={href} className="text-sm text-white/40 hover:text-white transition-colors duration-300">
      {label}
    </Link>
  </li>
);

const SocialLink = ({ icon, href }: { icon: React.ReactNode, href: string }) => (
  <Link href={href} className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all duration-300">
    {icon}
  </Link>
);

const Detail = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
  <div className="flex items-center gap-2 text-[9px] font-bold text-white/20 uppercase tracking-widest leading-none">
    {icon}
    <span>{text}</span>
  </div>
);
