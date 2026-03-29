"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, User, Clock, ArrowRight } from "lucide-react";

export const AgeCalculator = () => {
    const [dob, setDob] = useState("");
    const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);

    const calculateAge = () => {
        if (!dob) return;
        
        const birthDate = new Date(dob);
        const today = new Date();
        
        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
        let days = today.getDate() - birthDate.getDate();

        if (days < 0) {
            months--;
            const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += lastMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        setAge({ years, months, days });
    };

    return (
        <div className="w-full max-w-2xl mx-auto space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Input Card */}
                <div className="glass-card p-8 rounded-[2.5rem] bg-white/5 border border-white/5 shadow-2xl relative group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-night-indigo/10 blur-[60px] pointer-events-none" />
                    <div className="space-y-6 relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-night-indigo/10 border border-night-indigo/20 mb-4">
                            <User size={12} className="text-night-indigo" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Bio Metric Entry</span>
                        </div>
                        <h3 className="text-2xl font-black text-white tracking-tight">Select Date of Birth</h3>
                        <div className="relative">
                            <input 
                                type="date"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-night-indigo/50 transition-all font-medium [color-scheme:dark]"
                            />
                        </div>
                        <button 
                            onClick={calculateAge}
                            className="w-full py-4 rounded-[1.5rem] night-btn-gradient text-white flex items-center justify-center gap-3 font-black uppercase tracking-widest text-[10px] shadow-lg shadow-night-indigo/20 active:scale-95 transition-all"
                        >
                            Compute Age Synthesis <ArrowRight size={16} />
                        </button>
                    </div>
                </div>

                {/* Result Grid */}
                <div className="grid grid-cols-1 gap-4">
                    <MetricCard 
                        label="Solar Years"
                        value={age ? age.years : "--"}
                        icon={<Clock className="text-night-indigo" />}
                        delay={0}
                    />
                     <MetricCard 
                        label="Lunar Months"
                        value={age ? age.months : "--"}
                        icon={<Calendar className="text-sky-400" />}
                        delay={0.1}
                    />
                     <MetricCard 
                        label="Rotation Days"
                        value={age ? age.days : "--"}
                        icon={<User className="text-night-emerald" />}
                        delay={0.2}
                    />
                </div>
            </div>

            <div className="p-6 rounded-[2.5rem] bg-night-indigo/5 border border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Temporal Displacement Matrix</span>
                <div className="flex items-center gap-2 px-3 py-1 bg-night-indigo/10 border border-night-indigo/20 rounded-full">
                    <div className="w-1.5 h-1.5 rounded-full bg-night-indigo animate-pulse" />
                    <span className="text-[8px] font-bold text-night-indigo uppercase tracking-widest">Live Sync Active</span>
                </div>
            </div>
        </div>
    );
};

const MetricCard = ({ label, value, icon, delay }: any) => (
    <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay }}
        className="glass-card p-6 rounded-[2rem] bg-white/5 border border-white/5 flex items-center justify-between group hover:border-white/10 transition-all"
    >
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <div>
                <p className="text-[8px] font-black uppercase tracking-[0.3em] text-white/20 mb-1">{label}</p>
                <h4 className="text-3xl font-black text-white tracking-tighter">{value}</h4>
            </div>
        </div>
    </motion.div>
);
