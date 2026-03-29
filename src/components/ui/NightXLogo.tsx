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

                {/* High-Fidelity NX Monogram Reconstruction */}
                <div className="relative z-10 w-full h-full p-1">
                    <svg
                        viewBox="0 0 100 100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]"
                    >
                        {/* The Interlocking Base Structure */}
                        <motion.path
                            variants={{
                                initial: { pathLength: 0.7, opacity: 0.6 },
                                hover: { pathLength: 1, opacity: 1 }
                            }}
                            transition={{ duration: 1.2, ease: "easeInOut" }}
                            d="M18 80L28 20L52 65L78 18M52 65L82 82"
                            stroke="#22d3ee"
                            strokeWidth="12"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        
                        {/* The Left-Side Contrast Overlay (N-Base) */}
                        <motion.path
                            variants={{
                                initial: { opacity: 0.4 },
                                hover: { opacity: 0.9 }
                            }}
                            d="M18 80L28 20L52 65"
                            stroke="#0f172a"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="drop-shadow-[0_0_8px_rgba(34,211,238,0.2)]"
                        />

                        {/* Refinement Glow Stroke */}
                        <motion.path
                            variants={{
                                initial: { opacity: 0 },
                                hover: { opacity: 1 }
                            }}
                            d="M52 65L78 18M52 65L82 82"
                            stroke="#fff"
                            strokeWidth="2"
                            strokeLinecap="round"
                            className="opacity-40"
                        />
                    </svg>
                </div>

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
                <span className="text-base font-black tracking-[0.25em] text-white uppercase group-hover:text-night-emerald transition-all leading-none duration-500">
                    <span className="relative inline-block">
                        <span className="relative z-10 bg-gradient-to-r from-night-indigo via-night-emerald to-white bg-[size:200%] bg-clip-text text-transparent group-hover:animate-gradient-x transition-opacity">NIGHT</span>
                        <span className="absolute inset-0 blur-[4px] bg-night-indigo/30 group-hover:bg-night-emerald/40 transition-colors duration-500 -z-10" />
                    </span>
                    <span className="ml-1 text-night-indigo group-hover:text-white drop-shadow-[0_0_12px_rgba(99,102,241,0.7)]">X</span>
                </span>
                <span className="text-[8px] font-black tracking-[0.6em] text-white/60 uppercase group-hover:text-white/100 transition-all duration-700">
                    Sovereign Hub
                </span>
            </div>
        </motion.div>
    );
};
