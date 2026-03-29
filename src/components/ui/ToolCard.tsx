import React from "react";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { TiltCard } from "./TiltCard";

interface ToolCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  category: string;
}

export const ToolCard = ({ id, title, description, icon: Icon, color, category }: ToolCardProps) => {
  return (
    <Link href={`/tools/${id}`} className="block h-full no-underline">
      <TiltCard
        color={color}
        className="p-6 sm:p-8 flex flex-col justify-between h-full"
      >
        {/* 3D Visual Depth Elements */}
        <div style={{ transform: "translateZ(50px)" }} className="relative z-10 flex flex-col h-full">
          {/* Category Badge */}
          <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] mb-3 sm:mb-4 opacity-60 transition-opacity group-hover:opacity-100" style={{ color }}>
            {category}
          </span>

          {/* Icon & Title */}
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 rounded-xl bg-white/10 border border-white/10 shadow-2xl transition-transform group-hover:scale-110 group-hover:bg-white/20">
              <Icon size={24} className="sm:w-7 sm:h-7" style={{ color }} />
            </div>
          </div>

          <h3 className="text-lg sm:text-xl font-black text-white/95 mb-1 sm:mb-2 tracking-tight group-hover:text-white transition-colors uppercase">{title}</h3>
          <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-medium grow">{description}</p>
        </div>
      </TiltCard>
    </Link>
  );
};
