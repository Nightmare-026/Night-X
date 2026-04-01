"use client";

import React from "react";
import { TiltCard } from "@/components/ui/TiltCard";

export const ProtocolButton = ({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) => (
  <TiltCard onClick={onClick} color="#a855f7" className="w-full py-4 px-5 rounded-2xl h-full cursor-pointer active:scale-95 hover:scale-[1.02] shadow-xl transition-transform duration-300">
    <div className="relative z-10 flex items-center justify-center sm:justify-start gap-4">
      <div className="text-white/60 group-hover:text-white transition-colors flex-shrink-0">
        {icon}
      </div>
      <span className="text-[10px] font-black text-white/80 group-hover:text-white tracking-[0.2em] uppercase transition-colors">{label}</span>
    </div>
  </TiltCard>
);

export const ProfileDetail = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex items-center justify-between gap-4 py-1">
    <div className="flex items-center gap-3 text-white/20 shrink-0">
      {icon}
      <span className="text-[10px] font-black uppercase tracking-[0.3em]">{label}</span>
    </div>
    <span className="text-xs font-black text-white/90 tracking-tight truncate text-right">{value}</span>
  </div>
);

export const StatCard = ({
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
    <div className="p-6 h-full group/stat cursor-default relative z-10">
      <div className={`mb-3 flex items-center justify-between ${color === "emerald" ? "text-night-emerald" : color === "indigo" ? "text-night-indigo" : "text-white/40"}`}>
        <div className="group-hover/stat:scale-110 transition-transform">{icon}</div>
        <div className={`w-1.5 h-1.5 rounded-full ${color === "emerald" ? "bg-night-emerald" : color === "indigo" ? "bg-night-indigo" : "bg-white/20"} shadow-[0_0_10px_currentColor]`} />
      </div>
      <div className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] mb-2">{label}</div>
      <div className="text-sm font-black text-white tracking-widest">{value}</div>
    </div>
  </TiltCard>
);
