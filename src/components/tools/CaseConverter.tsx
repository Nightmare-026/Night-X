"use client";

import React, { useState } from "react";
import { Copy, Check, Trash2 } from "lucide-react";
import { TiltCard } from "@/components/ui/TiltCard";

export const CaseConverter = () => {
    const [text, setText] = useState("");
    const [copied, setCopied] = useState(false);

    const toTitleCase = (str: string) => {
        return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const toSentenceCase = (str: string) => {
        return str.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase());
    };

    const toCamelCase = (str: string) => {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
    };

    const toSnakeCase = (str: string) => {
        return str.toLowerCase().replace(/\s+/g, '_');
    };

    const transformations = [
        { label: "UPPERCASE", action: () => setText(text.toUpperCase()) },
        { label: "lowercase", action: () => setText(text.toLowerCase()) },
        { label: "Title Case", action: () => setText(toTitleCase(text)) },
        { label: "Sentence Case", action: () => setText(toSentenceCase(text)) },
        { label: "camelCase", action: () => setText(toCamelCase(text)) },
        { label: "snake_case", action: () => setText(toSnakeCase(text)) },
    ];

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8">
            <div className="relative group">
                <div className="absolute top-6 right-6 flex items-center gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                        onClick={copyToClipboard}
                        className="p-3 rounded-2xl night-btn-gradient text-white hover:brightness-110 transition-all flex items-center gap-2 relative overflow-hidden group shadow-xl"
                    >
                         {copied ? <Check size={14} className="relative z-10" /> : <Copy size={14} className="relative z-10" />}
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
                    placeholder="Enter text to transform..."
                    className="w-full h-80 bg-white/5 border border-white/10 rounded-[2rem] p-10 text-white focus:outline-none focus:border-night-indigo/50 transition-all font-medium text-lg leading-relaxed placeholder:text-white/10 resize-none custom-scrollbar shadow-inner"
                />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {transformations.map((t, idx) => (
                    <TiltCard
                        key={idx}
                        color="rgba(147, 51, 234, 0.4)"
                        onClick={t.action}
                        className="cursor-pointer"
                    >
                        <div className="p-8 flex flex-col items-center justify-center gap-4 h-full min-h-[140px]">
                            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white/40 group-hover:text-white transition-colors text-center leading-relaxed">
                                {t.label}
                            </span>
                            <div className="w-8 h-[2px] bg-white/10 group-hover:bg-night-indigo/50 transition-colors" />
                        </div>
                    </TiltCard>
                ))}
            </div>

            <div className="p-6 rounded-[2rem] bg-night-indigo/5 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-night-indigo animate-pulse" />
                    <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white/30 leading-none">String Manipulation Engine Active</span>
                </div>
            </div>
        </div>
    );
};
