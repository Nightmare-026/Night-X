"use client";

import React, { useState } from "react";
import { Type, Hash, AlignLeft, Clock, Copy, Check, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

export const WordCounter = () => {
    const [text, setText] = useState("");
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const paras = text.split("\n").filter(p => p.trim() !== "").length;
    const readTime = Math.ceil(words / 200); // Average 200 wpm
    const stats = { words, chars, paras, readTime };
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const metrics = [
        { icon: <Type size={16} />, label: "Words", value: stats.words, color: "text-night-indigo" },
        { icon: <Hash size={16} />, label: "Characters", value: stats.chars, color: "text-night-emerald" },
        { icon: <AlignLeft size={16} />, label: "Paragraphs", value: stats.paras, color: "text-amber-500" },
        { icon: <Clock size={16} />, label: "Read Time", value: `${stats.readTime}m`, color: "text-rose-500" },
    ];

    return (
        <div className="w-full max-w-3xl mx-auto space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {metrics.map((m, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass-card rounded-3xl p-6 border-white/5 bg-white/5 flex flex-col items-center justify-center text-center gap-2"
                    >
                        <div className={`${m.color} opacity-60 mb-1`}>{m.icon}</div>
                        <span className="text-2xl font-black text-white">{m.value}</span>
                        <span className="text-[8px] font-bold uppercase tracking-widest text-white/30">{m.label}</span>
                    </motion.div>
                ))}
            </div>

            <div className="relative group">
                <div className="absolute top-6 right-6 flex items-center gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                        onClick={copyToClipboard}
                        className="p-3 rounded-2xl night-btn-gradient text-white hover:brightness-110 transition-all flex items-center gap-2 relative overflow-hidden group shadow-xl"
                    >
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {copied ? <Check size={14} className="relative z-10" /> : <Copy size={14} className="relative z-10" />}
                        <span className="relative z-10 text-[10px] font-black uppercase tracking-widest">Copy Synthesis</span>
                    </button>
                    <button 
                        onClick={() => setText("")}
                        className="p-3 rounded-2xl bg-white/5 border border-white/10 text-rose-500 hover:bg-rose-500/10 transition-all shadow-xl"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter or paste your text for elite synthesis..."
                    className="w-full h-80 bg-white/5 border border-white/10 rounded-[2.5rem] p-10 text-white focus:outline-none focus:border-night-indigo/50 transition-all font-medium text-lg leading-relaxed placeholder:text-white/10 resize-none custom-scrollbar shadow-inner"
                />
            </div>

            <div className="p-6 rounded-[2rem] bg-night-indigo/5 border border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Operational Status: Monitoring</span>
                <div className="flex items-center gap-2 px-3 py-1 bg-night-indigo/10 border border-night-indigo/20 rounded-full">
                    <div className="w-1.5 h-1.5 rounded-full bg-night-indigo animate-pulse" />
                    <span className="text-[8px] font-bold text-night-indigo uppercase tracking-widest">Live Analysis Active</span>
                </div>
            </div>
        </div>
    );
};
