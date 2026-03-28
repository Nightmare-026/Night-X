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

      <div className="max-w-7xl mx-auto pt-12 sm:pt-20 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12 sm:mb-20">
        {/* Brand Column */}
        <div className="space-y-4 sm:space-y-6 col-span-2 md:col-span-1">
          <NightXLogo size={32} />
          <p className="text-white/40 text-sm leading-relaxed max-w-xs">
            The sovereign utility ecosystem. High-performance, zero-maintenance, 100% client-side tools for the modern agent.
          </p>
          <div className="flex gap-4">
            <SocialLink icon={<Globe size={18} />} href="#" />
            <SocialLink icon={<Mail size={18} />} href="#" />
            <SocialLink icon={<Shield size={18} />} href="#" />
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4 sm:space-y-6">
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/80">Platform</h4>
          <ul className="space-y-4">
            <FooterLink label="Executive Hub" href="/" />
            <FooterLink label="Developer Tools" href="/#developer" />
            <FooterLink label="Media Engine" href="/#media" />
            <FooterLink label="Status Beta" href="#" />
          </ul>
        </div>

        {/* Legal */}
        <div className="space-y-4 sm:space-y-6">
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/80">Security</h4>
          <ul className="space-y-4">
            <FooterLink label="Privacy Protocol" href="#" />
            <FooterLink label="Terms of Service" href="#" />
            <FooterLink label="Zero Data Policy" href="#" />
            <FooterLink label="Edge Processing" href="#" />
          </ul>
        </div>

        {/* Status / Region */}
        <div className="space-y-4 sm:space-y-6">
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/80">Ecosystem</h4>
          <div className="p-4 rounded-2xl glass-card border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 rounded-full bg-night-emerald animate-pulse" />
              <span className="text-xs font-medium text-white/80 tracking-wide uppercase">Operational</span>
            </div>
            <div className="text-[10px] text-white/40 space-y-1">
              <p>Network: Sovereign Mesh</p>
              <p>Latence: 14ms (Local)</p>
              <p>Region: Global Edge</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-4 sm:gap-6 pt-8 sm:pt-12 border-t border-white/5">
        <div className="flex items-center gap-6 text-[10px] font-black tracking-[0.2em] text-white/20 uppercase">
          <span>© 2026 Night X Global</span>
          <span className="hidden md:block w-1 h-1 rounded-full bg-white/20" />
          <span className="hidden md:block italic">Engineered for the Elite</span>
        </div>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
          <Detail icon={<Shield size={12} />} text="End-to-End Encryption" />
          <Detail icon={<Zap size={12} />} text="Edge Compute" />
          <Detail icon={<Globe size={12} />} text="Zero Server Costs" />
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
