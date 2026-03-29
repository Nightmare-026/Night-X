"use client";

import React, { useState, useMemo } from "react";
import { BadgePercent, ShoppingCart, Wallet, Tag } from "lucide-react";

export const DiscountCalculator = () => {
    const [price, setPrice] = useState<number>(1000);
    const [discount, setDiscount] = useState<number>(20);
    const [tax, setTax] = useState<number>(0);
    
    const { finalPrice, savings } = useMemo(() => {
        const discAmount = price * (discount / 100);
        const priceAfterDisc = price - discAmount;
        const taxAmount = priceAfterDisc * (tax / 100);
        
        return {
            finalPrice: Math.round((priceAfterDisc + taxAmount) * 100) / 100,
            savings: Math.round(discAmount * 100) / 100
        };
    }, [price, discount, tax]);

    return (
        <div className="w-full max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Input Controls */}
            <div className="space-y-8">
                <InputGroup 
                    label="Original Value"
                    value={price}
                    onChange={setPrice}
                    icon={<ShoppingCart size={16} className="text-night-indigo" />}
                    unit="₹"
                    placeholder="Enter price..."
                />
                <InputGroup 
                    label="Discount Synthesis"
                    value={discount}
                    onChange={setDiscount}
                    icon={<BadgePercent size={16} className="text-sky-400" />}
                    unit="%"
                    placeholder="Enter discount..."
                />
                 <InputGroup 
                    label="Tax Protocol"
                    value={tax}
                    onChange={setTax}
                    icon={<Tag size={16} className="text-amber-500" />}
                    unit="%"
                    placeholder="Enter tax..."
                />
            </div>

            {/* Result Visualizer */}
            <div className="space-y-6">
                <div className="glass-card p-10 rounded-[3rem] bg-white/5 border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-night-indigo/10 blur-[100px] pointer-events-none" />
                    <div className="relative z-10 space-y-8">
                        <div>
                             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-3 flex items-center gap-2">
                                <Wallet size={10} /> Final Settlement
                             </p>
                             <h2 className="text-6xl font-black text-white tracking-tighter">₹{finalPrice.toLocaleString()}</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-4 pt-8 border-t border-white/5">
                            <div className="flex items-center justify-between p-4 rounded-2xl bg-night-emerald/5 border border-night-emerald/10">
                                <p className="text-[8px] font-black uppercase tracking-widest text-white/20">Total Savings Synthesis</p>
                                <p className="text-2xl font-black text-night-emerald tracking-tight">₹{savings.toLocaleString()}</p>
                            </div>
                        </div>

                         <div className="p-6 rounded-[2rem] bg-night-indigo/5 border border-white/5 flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Price Analysis Engine</span>
                            <div className="flex items-center gap-2 px-3 py-1 bg-night-indigo/10 border border-night-indigo/20 rounded-full">
                                <div className="w-1.5 h-1.5 rounded-full bg-night-indigo animate-pulse" />
                                <span className="text-[8px] font-bold text-night-indigo uppercase tracking-widest">Active Scan</span>
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
  onChange: (val: number) => void;
  icon: React.ReactNode;
  unit: string;
  placeholder: string;
}

const InputGroup = ({ label, value, onChange, icon, unit, placeholder }: InputGroupProps) => (
    <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white/40">
                    {icon}
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-white/60">{label}</span>
            </div>
        </div>
        <div className="relative">
            <input 
                type="number"
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                placeholder={placeholder}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white font-black text-2xl focus:outline-none focus:border-night-indigo/50 transition-all placeholder:text-white/10"
            />
            <div className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-white/20 uppercase tracking-widest border border-white/5 px-3 py-1 rounded-full">
                {unit}
            </div>
        </div>
    </div>
);
