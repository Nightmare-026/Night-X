"use client";

import React, { useState, useMemo } from "react";
import { GraduationCap, Stars } from "lucide-react";

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

                    <div className="pt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-8">
                        <div className="text-center sm:text-left">
                            <p className="text-[8px] font-black uppercase tracking-widest text-white/20 mb-2">Resulting CGPA</p>
                            <div className="flex items-center gap-3">
                                <h3 className="text-6xl font-black text-white tracking-tighter">{cgpa.toFixed(2)}</h3>
                                <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500">
                                    <Stars size={20} />
                                </div>
                            </div>
                        </div>

                        <div className="p-6 rounded-[2rem] bg-night-indigo/10 border border-night-indigo/20 animate-pulse">
                            <p className="text-[8px] font-black uppercase tracking-[0.3em] text-white/40 mb-1 leading-none">Standard Matrix</p>
                            <p className="text-[10px] font-bold text-white uppercase tracking-widest leading-none">Divided by 9.5</p>
                        </div>
                    </div>
                </div>
            </div>

            <p className="text-center text-white/20 text-[10px] font-black uppercase tracking-[0.5em]">Academic Precision Protocol v1.02</p>
        </div>
    );
};
