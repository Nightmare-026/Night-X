"use client";

import React, { useState } from "react";
import { Copy, Check, ArrowDownUp, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export const URLCoder = () => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [isEncoding, setIsEncoding] = useState(true);
    const [copied, setCopied] = useState(false);

    const handleProcess = (val: string) => {
        setInput(val);
        try {
            if (isEncoding) {
                setOutput(encodeURIComponent(val));
            } else {
                setOutput(decodeURIComponent(val));
            }
        } catch {
            setOutput("Invalid URI sequence...");
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between p-2 bg-white/5 rounded-2xl border border-white/5">
                <button
                    onClick={() => { setIsEncoding(true); handleProcess(""); setOutput(""); }}
                    className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all relative overflow-hidden group ${isEncoding ? "night-btn-gradient text-white shadow-lg" : "text-white/20 hover:text-white"}`}
                >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative z-10">URL Encode</span>
                </button>
                <button
                    onClick={() => { setIsEncoding(false); handleProcess(""); setOutput(""); }}
                    className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all relative overflow-hidden group ${!isEncoding ? "night-btn-gradient text-white shadow-lg" : "text-white/20 hover:text-white"}`}
                >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative z-10">URL Decode</span>
                </button>
            </div>

            <div className="space-y-4">
                <div className="relative group">
                    <div className="absolute -top-3 left-6 px-3 bg-night-black border border-white/10 rounded-full z-10">
                        <span className="text-[10px] font-black uppercase tracking-tighter text-white/40">Raw Input</span>
                    </div>
                    <textarea
                        value={input}
                        onChange={(e) => handleProcess(e.target.value)}
                        placeholder={isEncoding ? "Enter raw URL or text..." : "Enter encoded URL component..."}
                        className="w-full h-40 bg-white/5 border border-white/10 rounded-[2rem] p-8 text-white focus:outline-none focus:border-night-indigo/50 transition-all font-mono text-sm resize-none custom-scrollbar"
                    />
                </div>

                <div className="flex justify-center">
                    <motion.div 
                        animate={{ rotate: isEncoding ? 0 : 180 }}
                        className="p-3 rounded-full bg-night-indigo/10 text-night-indigo border border-night-indigo/20"
                    >
                        <ArrowDownUp size={16} />
                    </motion.div>
                </div>

                <div className="relative group">
                    <div className="absolute -top-3 left-6 px-3 bg-night-black border border-white/10 rounded-full z-10 flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-tighter text-white/40">Sovereign Result</span>
                        {copied && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[8px] font-bold text-night-emerald">COPIED</motion.span>}
                    </div>
                    <div className="w-full h-40 bg-night-indigo/5 border border-night-indigo/20 rounded-[2rem] p-8 text-white/90 font-mono text-sm overflow-y-auto relative custom-scrollbar">
                        {output || (
                            <span className="text-white/20 italic tracking-tight">System results will appear here...</span>
                        )}
                        {output && (
                                <button
                                    onClick={copyToClipboard}
                                    className="absolute bottom-6 right-6 p-4 rounded-2xl night-btn-gradient text-white hover:brightness-110 transition-all shadow-xl relative overflow-hidden group"
                                >
                                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    {copied ? <Check size={16} className="relative z-10" /> : <Copy size={16} className="relative z-10" />}
                                </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="p-6 rounded-[2rem] bg-night-indigo/5 border border-night-indigo/10 flex items-center gap-4">
                <ShieldCheck size={18} className="text-night-indigo" />
                <p className="text-[10px] text-white/40 leading-relaxed font-medium">
                    &quot;Web-safe transformations completed entirely within the client runtime. No data packets leave this environment.&quot;
                </p>
            </div>
        </div>
    );
};
