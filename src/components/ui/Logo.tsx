"use client";

import React from "react";
import { motion } from "framer-motion";

export const Logo = () => {
  return (
    <div className="relative flex items-center gap-3 select-none group">
      {/* 3D Glass Symbol */}
      <motion.div
        className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-night-indigo to-night-emerald p-[1px] shadow-lg shadow-night-indigo/20 overflow-hidden"
        whileHover={{ scale: 1.05, rotate: 5 }}
      >
        <div className="absolute inset-0 bg-white/10 backdrop-blur-md" />
        <span className="relative text-white font-black text-xl italic tracking-tighter">N</span>
        {/* Glow Sparkle */}
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-white/20 rotate-45 blur-xl group-hover:translate-x-full transition-transform duration-700" />
      </motion.div>

      {/* Glass-Text Name */}
      <div className="relative flex flex-col leading-none">
        <h1 className="text-2xl font-black tracking-widest uppercase flex items-baseline">
          <span className="night-gradient-text drop-shadow-[0_0_10px_rgba(67,56,202,0.5)]">NIGHT</span>
          <span className="relative ml-1 text-white/90">
            X
            {/* 3D Shadow Layer */}
            <span className="absolute left-[1px] top-[1px] -z-10 text-night-indigo/40 select-none">X</span>
          </span>
        </h1>
        <span className="text-[10px] tracking-[0.3em] font-medium text-white/40 uppercase ml-1">Elite Utility Hub</span>
      </div>

      {/* Bottom Reflection */}
      <div className="absolute -bottom-1 left-12 w-16 h-[2px] bg-gradient-to-r from-night-indigo/0 via-night-emerald/40 to-night-emerald/0" />
    </div>
  );
};
