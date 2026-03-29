"use client";

import React, { useState, useMemo } from "react";
import { GraduationCap, Stars } from "lucide-react";
import { TiltCard } from "@/components/ui/TiltCard";

export const CGPACalculator = () => {
    const [percent, setPercent] = useState<number>(75);
    
    const cgpa = useMemo(() => {
        // Standard formula Percentage / 9.5
        const val = percent / 9.5;
        return Math.min(10, Math.max(0, Math.round(val * 100) / 100));
    }, [percent]);

    return (
        <div className="w-full max-w-2xl mx-auto space-y-12">
            <div className="glass-card p-10 rounded-[3rem] bg-white/5 border border-white/5 shadow-2xl relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-night-indigo/10 blur-[100px] pointer-events-none" />
                <div className="relative z-10 space-y-10">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-night-indigo/10 border border-night-indigo/20 text-night-indigo">
                            <GraduationCap size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Academic Synthesis</p>
                            <h2 className="text-3xl font-black text-white tracking-tight">GPA Transformation</h2>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between px-2">
                             <span className="text-xs font-black uppercase tracking-widest text-white/40">Percentage Input</span>
                             <div className="flex items-center gap-2">
                                <span className="text-2xl font-black text-white">{percent}%</span>
                             </div>
                        </div>
                        <input 
                            type="range"
                            min="0"
                            max="100"
                            step="0.1"
                            value={percent}
                            onChange={(e) => setPercent(Number(e.target.value))}
                            className="w-full h-2 bg-white/5 rounded-full appearance-none cursor-pointer accent-night-indigo"
                        />
                         <input 
                            type="number"
                            value={percent}
                            onChange={(e) => setPercent(Number(e.target.value))}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-black text-xl focus:outline-none focus:border-night-indigo/50 transition-all placeholder:text-white/10"
                        />
                    </div>

                    <div className="pt-10 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <TiltCard
                            color="rgba(147, 51, 234, 0.4)"
                            className="w-full"
                        >
                            <div className="p-8 flex flex-col items-center justify-center gap-4 text-center h-full">
                                <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white/40 block">Resulting CGPA</span>
                                <div className="flex items-center gap-4">
                                    <h3 className="text-6xl font-black text-white tracking-tighter">{cgpa.toFixed(2)}</h3>
                                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500">
                                        <Stars size={24} />
                                    </div>
                                </div>
                            </div>
                        </TiltCard>

                        <div className="p-8 rounded-[2rem] bg-night-indigo/5 border border-night-indigo/20 flex flex-col items-center justify-center text-center gap-2 border-dashed">
                            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white/40 leading-none">Standard Matrix</span>
                            <p className="text-lg font-black text-white uppercase tracking-widest leading-none">Divided by 9.5</p>
                            <div className="w-1.5 h-1.5 rounded-full bg-night-indigo animate-pulse mt-2" />
                        </div>
                    </div>
                </div>
            </div>

            <p className="text-center text-white/20 text-[10px] font-black uppercase tracking-[0.5em]">Academic Precision Protocol v1.02</p>
        </div>
    );
};
