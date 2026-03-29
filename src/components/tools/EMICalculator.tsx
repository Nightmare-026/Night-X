"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Wallet, Percent, Calendar, TrendingUp } from "lucide-react";

export const EMICalculator = () => {
    const [amount, setAmount] = useState(100000);
    const [rate, setRate] = useState(10);
    const [tenure, setTenure] = useState(12);
    
    const p = amount;
    const r = rate / (12 * 100);
    const n = tenure;
    
    const emi = Math.round(p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1));
    const totalPayable = Math.round(emi * n);
    const totalInterest = Math.round(totalPayable - p);

    return (
        <div className="w-full max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Input Controls */}
            <div className="space-y-8">
                <InputGroup 
                    label="Principal Credit"
                    value={amount}
                    min={1000}
                    max={10000000}
                    step={1000}
                    onChange={setAmount}
                    icon={<Wallet size={16} />}
                    unit="₹"
                />
                <InputGroup 
                    label="Annual Interest Rate"
                    value={rate}
                    min={1}
                    max={30}
                    step={0.1}
                    onChange={setRate}
                    icon={<Percent size={16} />}
                    unit="%"
                />
                <InputGroup 
                    label="Tenure Duration"
                    value={tenure}
                    min={1}
                    max={360}
                    step={1}
                    onChange={setTenure}
                    icon={<Calendar size={16} />}
                    unit="Mo"
                />
            </div>

            {/* Result Visualizer */}
            <div className="space-y-6">
                <div className="glass-card p-10 rounded-[3rem] bg-white/5 border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-night-indigo/10 blur-[100px] pointer-events-none" />
                    <div className="relative z-10 space-y-8">
                        <div>
                             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-3 flex items-center gap-2">
                                <TrendingUp size={10} /> Monthly Installment
                             </p>
                             <h2 className="text-6xl font-black text-white tracking-tighter">₹{emi.toLocaleString()}</h2>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/5">
                            <div>
                                <p className="text-[8px] font-black uppercase tracking-widest text-white/20 mb-1">Total Interest</p>
                                <p className="text-2xl font-black text-night-indigo/80 tracking-tight">₹{totalInterest.toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-[8px] font-black uppercase tracking-widest text-white/20 mb-1">Total Payoff</p>
                                <p className="text-2xl font-black text-night-emerald/80 tracking-tight">₹{totalPayable.toLocaleString()}</p>
                            </div>
                        </div>

                         <div className="p-6 rounded-[2rem] bg-night-indigo/5 border border-white/5 flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Amortization Logic</span>
                            <div className="flex items-center gap-2 px-3 py-1 bg-night-indigo/10 border border-night-indigo/20 rounded-full">
                                <div className="w-1.5 h-1.5 rounded-full bg-night-indigo animate-pulse" />
                                <span className="text-[8px] font-bold text-night-indigo uppercase tracking-widest">Live Engine</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface InputGroupProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (val: number) => void;
  icon: React.ReactNode;
  unit: string;
}

const InputGroup = ({ label, value, min, max, step, onChange, icon, unit }: InputGroupProps) => (
    <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white/40 group-hover:text-night-indigo transition-colors">
                    {icon}
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-white/60">{label}</span>
            </div>
            <div className="flex items-center gap-2">
                 <span className="text-lg font-black text-white">{value}</span>
                 <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{unit}</span>
            </div>
        </div>
        <div className="relative h-2 group">
            <input 
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="absolute inset-0 w-full h-2 bg-white/5 rounded-full appearance-none cursor-pointer accent-night-indigo transition-all hover:bg-white/10"
            />
        </div>
    </div>
);
