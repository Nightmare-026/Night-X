"use client";

import React, { useState } from "react";
import { Hash, Binary, RefreshCw, Layers } from "lucide-react";

export const BaseConverter = () => {
    const [values, setValues] = useState({
        decimal: "",
        binary: "",
        hex: "",
        octal: ""
    });

    const updateFromDecimal = (val: string) => {
        if (val === "") {
            setValues({ decimal: "", binary: "", hex: "", octal: "" });
            return;
        }
        const num = parseInt(val, 10);
        if (isNaN(num)) return;

        setValues({
            decimal: val,
            binary: num.toString(2),
            hex: num.toString(16).toUpperCase(),
            octal: num.toString(8)
        });
    };

    const updateFromBinary = (val: string) => {
        if (!/^[01]*$/.test(val)) return;
        if (val === "") {
            setValues({ decimal: "", binary: "", hex: "", octal: "" });
            return;
        }
        const num = parseInt(val, 2);
        setValues({
            decimal: num.toString(10),
            binary: val,
            hex: num.toString(16).toUpperCase(),
            octal: num.toString(8)
        });
    };

    const updateFromHex = (val: string) => {
        if (!/^[0-9A-Fa-f]*$/.test(val)) return;
        if (val === "") {
            setValues({ decimal: "", binary: "", hex: "", octal: "" });
            return;
        }
        const num = parseInt(val, 16);
        setValues({
            decimal: num.toString(10),
            binary: num.toString(2),
            hex: val.toUpperCase(),
            octal: num.toString(8)
        });
    };

    const updateFromOctal = (val: string) => {
        if (!/^[0-7]*$/.test(val)) return;
        if (val === "") {
            setValues({ decimal: "", binary: "", hex: "", octal: "" });
            return;
        }
        const num = parseInt(val, 8);
        setValues({
            decimal: num.toString(10),
            binary: num.toString(2),
            hex: num.toString(16).toUpperCase(),
            octal: val
        });
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <BaseInput 
                    label="Decimal System"
                    value={values.decimal}
                    onChange={updateFromDecimal}
                    placeholder="Enter decimal (Base 10)"
                    icon={<Hash size={16} className="text-night-indigo" />}
                    base="10"
                />
                <BaseInput 
                    label="Binary Code"
                    value={values.binary}
                    onChange={updateFromBinary}
                    placeholder="Enter binary (Base 2)"
                    icon={<Binary size={16} className="text-sky-400" />}
                    base="2"
                />
                <BaseInput 
                    label="Hexadecimal"
                    value={values.hex}
                    onChange={updateFromHex}
                    placeholder="Enter hex (Base 16)"
                    icon={<Layers size={16} className="text-amber-500" />}
                    base="16"
                />
                <BaseInput 
                    label="Octal System"
                    value={values.octal}
                    onChange={updateFromOctal}
                    placeholder="Enter octal (Base 8)"
                    icon={<RefreshCw size={16} className="text-night-emerald" />}
                    base="8"
                />
            </div>

            <div className="p-8 rounded-[3rem] bg-white/[0.02] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 group overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-night-indigo/10 blur-[60px] pointer-events-none" />
                <div className="space-y-1 relative z-10 text-center md:text-left">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Conversion Logic Overview</p>
                    <p className="text-white/60 text-sm font-medium">Real-time bidirectional numeral synthesis active.</p>
                </div>
                <div className="flex items-center gap-3 px-6 py-2 bg-night-indigo/10 border border-night-indigo/20 rounded-full relative z-10 animate-pulse">
                    <div className="w-2 h-2 rounded-full bg-night-indigo" />
                    <span className="text-[10px] font-black text-white/80 uppercase tracking-widest leading-none">Matrix Sync Active</span>
                </div>
            </div>
        </div>
    );
};

interface BaseInputProps {
    label: string;
    value: string;
    onChange: (val: string) => void;
    placeholder: string;
    icon: React.ReactNode;
    base: string;
}

const BaseInput = ({ label, value, onChange, placeholder, icon, base }: BaseInputProps) => (
    <div className="glass-card p-8 rounded-[2.5rem] bg-white/5 border border-white/5 shadow-2xl relative group">
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                        {icon}
                    </div>
                    <span className="text-sm font-medium text-white/40 tracking-wider uppercase">
                        {label}
                    </span>
                </div>
                <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold text-white/30 tracking-[0.2em] uppercase">
                    {base}
                </div>
            </div>

            <input
                type="text"
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-transparent border-none p-0 text-3xl font-light text-white placeholder:text-white/10 focus:ring-0 selection:bg-white/20"
            />
        </div>
    </div>
);
