"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface ToolCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  category: string;
}

export const ToolCard = ({ id, title, description, icon: Icon, color, category }: ToolCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
  }, []);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isTouchDevice) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Link href={`/tools/${id}`} className="block h-full no-underline">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: isTouchDevice ? 0 : rotateX,
          rotateY: isTouchDevice ? 0 : rotateY,
          transformStyle: "preserve-3d",
          "--glow-color": color,
        } as React.CSSProperties}
        whileHover={isTouchDevice ? {} : { scale: 1.02 }}
        className="group relative h-full glass-card glow-border p-4 sm:p-6 flex flex-col justify-between flex-shrink-0 cursor-pointer rounded-2xl"
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

          <h3 className="text-lg sm:text-xl font-black text-white mb-1 sm:mb-2 tracking-tight group-hover:text-white transition-colors uppercase">{title}</h3>
          <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-medium grow">{description}</p>
        </div>

        {/* Glossy Overlay Reflection */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-500 overflow-hidden"
          style={{
            background: `linear-gradient(105deg, transparent 40%, white 50%, transparent 60%)`,
            backgroundSize: "200% 100%",
            animation: "shimmer 2s infinite"
          }}
        />
      </motion.div>
    </Link>
  );
};
