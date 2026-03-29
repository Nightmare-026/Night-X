"use client";

import React, { useState } from "react";
import { Calendar, User, Clock, ArrowRight } from "lucide-react";
import { TiltCard } from "@/components/ui/TiltCard";

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
                            className="w-full py-6 rounded-[2rem] night-btn-gradient text-white flex items-center justify-center gap-4 font-black uppercase tracking-[0.4em] text-[11px] shadow-lg shadow-night-indigo/20 active:scale-95 transition-all border border-white/20"
                        >
                            Compute Age Synthesis <ArrowRight size={18} />
                        </button>
                    </div>
                </div>

                {/* Result Grid */}
                <div className="grid grid-cols-1 gap-6">
                    <MetricCard 
                        label="Solar Years"
                        value={age ? age.years : "--"}
                        icon={<Clock size={24} className="text-night-indigo" />}
                        color="rgba(147, 51, 234, 0.3)"
                    />
                     <MetricCard 
                        label="Lunar Months"
                        value={age ? age.months : "--"}
                        icon={<Calendar size={24} className="text-sky-400" />}
                        color="rgba(56, 189, 248, 0.3)"
                    />
                     <MetricCard 
                        label="Rotation Days"
                        value={age ? age.days : "--"}
                        icon={<User size={24} className="text-night-emerald" />}
                        color="rgba(16, 185, 129, 0.3)"
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

interface MetricCardProps {
    label: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
}

const MetricCard = ({ label, value, icon, color }: MetricCardProps) => (
    <TiltCard
        color={color}
        className="w-full"
    >
        <div className="p-8 flex flex-col items-center justify-center gap-4 text-center h-full min-h-[160px]">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-all duration-500">
                {icon}
            </div>
            <div>
                <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white/40 block mb-2">{label}</span>
                <h4 className="text-4xl font-black text-white tracking-tighter">{value}</h4>
            </div>
        </div>
    </TiltCard>
);
