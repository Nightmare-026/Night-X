"use client";

import React from "react";
import { motion } from "framer-motion";

export const NightXLogo = ({ size = 40 }: { size?: number }) => {
    return (
        <motion.div 
            initial="initial"
            whileHover="hover"
            className="flex items-center gap-3 group cursor-pointer"
        >
            <div className="relative" style={{ width: size, height: size }}>
                {/* Background Aura Bloom */}
                <motion.div 
                    variants={{
                        initial: { opacity: 0, scale: 0.8 },
                        hover: { opacity: 0.4, scale: 1.5 }
                    }}
                    className="absolute inset-0 bg-night-indigo blur-2xl rounded-full"
                />

                {/* The Interlocking NX Core */}
                <svg
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="relative z-10 w-full h-full drop-shadow-[0_0_20px_rgba(79,70,229,0.5)]"
                >
                    {/* Shadow Layer (Parallax effect) */}
                    <motion.path
                        variants={{
                            initial: { x: 0, y: 0 },
                            hover: { x: 2, y: 2 }
                        }}
                        d="M20 20L50 50L80 20M20 80L50 50L80 80"
                        stroke="#000"
                        strokeWidth="12"
                        strokeLinecap="round"
                        className="opacity-20"
                    />

                    {/* Main Path: The "N" flow */}
                    <motion.path
                        variants={{
                            initial: { pathLength: 0.8, opacity: 0.7 },
                            hover: { pathLength: 1, opacity: 1 }
                        }}
                        d="M20 80V20L50 50L80 20V80"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                    />

                    {/* Accent Path: The "X" Cross */}
                    <motion.path
                        variants={{
                            initial: { scale: 0.9, opacity: 0.5 },
                            hover: { scale: 1.1, opacity: 1 }
                        }}
                        d="M35 35L65 65M65 35L35 65"
                        stroke="url(#logic-gradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        className="drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]"
                    />

                    <defs>
                        <linearGradient id="logic-gradient" x1="0" y1="0" x2="100" y2="100">
                            <stop offset="0%" stopColor="#6366f1" />
                            <stop offset="100%" stopColor="#10b981" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Refractive Glass Overlay */}
                <motion.div 
                    variants={{
                        initial: { opacity: 0, backdropFilter: "blur(0px)" },
                        hover: { opacity: 1, backdropFilter: "blur(4px)" }
                    }}
                    className="absolute inset-0 z-20 rounded-xl bg-white/5 border border-white/10 overflow-hidden pointer-events-none"
                >
                    <div className="absolute top-[-100%] right-[-100%] w-[200%] h-[200%] bg-gradient-to-br from-white/20 via-transparent to-transparent rotate-45 animate-pulse" />
                </motion.div>
            </div>

            {/* Typography Overhaul */}
            <div className="flex flex-col -gap-1">
                <span className="text-sm font-black tracking-[0.2em] text-white uppercase group-hover:text-night-emerald transition-all leading-none duration-500">
                    <span className="relative inline-block">
                        <span className="relative z-10 bg-gradient-to-r from-night-indigo via-night-emerald to-white bg-[size:200%] bg-clip-text text-transparent group-hover:animate-gradient-x transition-opacity">NIGHT</span>
                        <span className="absolute inset-0 blur-[4px] bg-night-indigo/30 group-hover:bg-night-emerald/30 transition-colors duration-500 -z-10" />
                    </span>
                    <span className="ml-1 text-night-indigo group-hover:text-white drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]">X</span>
                </span>
                <span className="text-[7px] font-black tracking-[0.5em] text-white/50 uppercase group-hover:text-white/80 transition-all duration-700">
                    Sovereign Hub
                </span>
            </div>
        </motion.div>
    );
};
