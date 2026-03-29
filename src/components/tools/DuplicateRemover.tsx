"use client";

import React, { useState } from "react";
import { Filter, Copy, Check, ListChecks, Download } from "lucide-react";
import { motion } from "framer-motion";
import { TiltCard } from "@/components/ui/TiltCard";
import { downloadBlob } from "@/lib/downloadUtils";

export const DuplicateRemover = () => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [isSorted, setIsSorted] = useState(false);
    const [copied, setCopied] = useState(false);

    const processText = () => {
        const lines = input.split("\n").map(l => l.trim()).filter(l => l !== "");
        const unique = Array.from(new Set(lines));
        if (isSorted) unique.sort();
        setOutput(unique.join("\n"));
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const downloadResults = () => {
        const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
        downloadBlob(blob, "Night-X-Unique-Collection.txt");
    };

    return (
        <div className="w-full max-w-2xl mx-auto space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TiltCard
                    color={isSorted ? "rgba(16, 185, 129, 0.3)" : "rgba(255, 255, 255, 0.05)"}
                    onClick={() => setIsSorted(!isSorted)}
                    className="cursor-pointer"
                >
                    <div className={`p-6 flex flex-col items-center justify-center gap-3 h-full transition-all ${isSorted ? "text-night-emerald" : "text-white/20"}`}>
                        <Filter size={18} className={isSorted ? "animate-pulse" : ""} />
                        <span className="text-[11px] font-black uppercase tracking-[0.4em] text-center">Auto Sort Collection</span>
                    </div>
                </TiltCard>
            </div>

            <div className="space-y-4">
                <div className="relative group">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter your list (one item per line)..."
                        className="w-full h-56 bg-white/5 border border-white/10 rounded-[2rem] p-8 text-white focus:outline-none focus:border-night-indigo/30 transition-all font-mono text-sm resize-none custom-scrollbar"
                    />
                </div>

                <button
                    onClick={processText}
                    className="w-full py-6 rounded-[2rem] night-btn-gradient text-white font-black tracking-[0.4em] text-[11px] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-4 uppercase shadow-2xl relative overflow-hidden group border border-white/20"
                >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <ListChecks size={20} className="relative z-10" />
                    <span className="relative z-10">SYNTHESIZE UNIQUE COLLECTION</span>
                </button>

                {output && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative group">
                        <div className="absolute top-6 right-6 flex gap-2">
                            <button 
                                onClick={downloadResults}
                                className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all relative overflow-hidden group"
                            >
                                <Download size={16} />
                            </button>
                            <button 
                                onClick={copyToClipboard} 
                                className="p-3 rounded-xl night-btn-gradient text-white hover:brightness-110 transition-all shadow-xl relative overflow-hidden group"
                            >
                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                {copied ? <Check size={16} className="relative z-10" /> : <Copy size={16} className="relative z-10" />}
                            </button>
                        </div>
                        <div className="w-full max-h-56 overflow-y-auto bg-black/40 border border-white/10 rounded-[2rem] p-8 text-night-emerald font-mono text-sm custom-scrollbar">
                            <pre className="whitespace-pre-wrap">{output}</pre>
                        </div>
                    </motion.div>
                )}
            </div>

            <div className="p-6 rounded-[2rem] border border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Operational Batch: v2.0</span>
                <p className="text-[10px] text-white/40 font-medium">Results are processed locally in real-time.</p>
            </div>
        </div>
    );
};
