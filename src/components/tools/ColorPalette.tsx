"use client";

import React, { useState, useEffect } from "react";
import { Copy, Check, RefreshCw, Palette } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const generateColor = () => {
    return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
};

export const ColorPalette = () => {
    const [colors, setColors] = useState<string[]>([]);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const generatePalette = React.useCallback(() => {
        setColors(Array(5).fill(0).map(generateColor));
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => generatePalette(), 0);
        return () => clearTimeout(timeout);
    }, [generatePalette]);

    const copyColor = (hex: string, idx: number) => {
        navigator.clipboard.writeText(hex);
        setCopiedIndex(idx);
        setTimeout(() => setCopiedIndex(null), 1500);
    };

    return (
        <div className="w-full max-w-2xl mx-auto space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 h-[400px]">
                <AnimatePresence mode="popLayout">
                    {colors.map((color, idx) => (
                        <motion.div
                            key={color + idx}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="group relative flex flex-col h-full rounded-3xl overflow-hidden glass-card border-white/5 shadow-2xl"
                        >
                            <div 
                                style={{ backgroundColor: color }}
                                className="flex-1 w-full transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="p-4 bg-night-black flex flex-col items-center gap-2">
                                <span className="text-[10px] font-black font-mono tracking-widest text-white/40">{color}</span>
                                <button
                                    onClick={() => copyColor(color, idx)}
                                    className="p-3 rounded-xl night-btn-gradient text-white hover:brightness-110 transition-all active:scale-95 relative overflow-hidden group"
                                >
                                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    {copiedIndex === idx ? <Check size={14} className="relative z-10 text-night-emerald" /> : <Copy size={14} className="relative z-10" />}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <div className="flex gap-4">
                <button
                    onClick={generatePalette}
                    className="flex-1 py-5 rounded-3xl night-btn-gradient text-white font-black tracking-[0.2em] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3 uppercase shadow-2xl relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <RefreshCw size={18} className="relative z-10" />
                    <span className="relative z-10">SYNTHESIZE NEW PALETTE</span>
                </button>
            </div>

            <div className="p-6 rounded-[2rem] border border-white/5 bg-night-indigo/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Palette size={16} className="text-night-indigo" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Random Synthesis Active</span>
                </div>
                <p className="text-[10px] text-white/20 italic tracking-tight font-medium">&quot;Color tokens optimized for modern UI architectures.&quot;</p>
            </div>
        </div>
    );
};
