"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Unlock, Copy, Check, Trash2 } from "lucide-react";

export const TextEncryptor = () => {
    const [input, setInput] = useState("");
    const [method, setMethod] = useState<"base64" | "hex" | "rot13">("base64");
    const [copied, setCopied] = useState(false);

    const rot13 = (str: string) => {
        return str.replace(/[a-zA-Z]/g, (c: string) => {
            const charCode = c.charCodeAt(0);
            const base = charCode <= 90 ? 65 : 97;
            return String.fromCharCode(((charCode - base + 13) % 26) + base);
        });
    };

    const process = (text: string, mode: "encrypt" | "decrypt") => {
        try {
            if (method === "base64") {
                return mode === "encrypt" ? btoa(text) : atob(text);
            } else if (method === "hex") {
                if (mode === "encrypt") {
                    return Array.from(text).map(c => c.charCodeAt(0).toString(16).padStart(2, "0")).join("");
                } else {
                    return text.match(/.{1,2}/g)?.map(byte => String.fromCharCode(parseInt(byte, 16))).join("") || "";
                }
            } else {
                return rot13(text);
            }
        } catch (e) {
            return "Error: Invalid Input for Decryption";
        }
    };

    const [output, setOutput] = useState("");

    const handleAction = (mode: "encrypt" | "decrypt") => {
        setOutput(process(input, mode));
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8">
            <div className="flex flex-wrap gap-4 justify-center">
                {["base64", "hex", "rot13"].map((m) => (
                    <button
                        key={m}
                        onClick={() => setMethod(m as any)}
                        className={`px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all border ${
                            method === m 
                            ? "bg-night-indigo/20 border-night-indigo text-white" 
                            : "bg-white/5 border-white/5 text-white/40 hover:bg-white/10"
                        }`}
                    >
                        {m} Synthesis
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Input Buffer</span>
                        <button onClick={() => setInput("")} className="text-white/20 hover:text-rose-500 transition-colors">
                            <Trash2 size={12} />
                        </button>
                    </div>
                    <textarea 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter text to process..."
                        className="w-full h-64 bg-white/5 border border-white/10 rounded-[2.5rem] p-8 text-white focus:outline-none focus:border-night-indigo/50 transition-all placeholder:text-white/10 resize-none font-mono text-lg custom-scrollbar"
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between px-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Output Synthesis</span>
                        <button onClick={copyToClipboard} className="text-white/20 hover:text-night-emerald transition-colors">
                            {copied ? <Check size={12} /> : <Copy size={12} />}
                        </button>
                    </div>
                    <div className="w-full h-64 bg-night-indigo/5 border border-white/10 rounded-[2.5rem] p-8 text-white/80 font-mono text-lg overflow-y-auto custom-scrollbar break-all shadow-inner">
                        {output || "Awaiting processing..."}
                    </div>
                </div>
            </div>

            <div className="flex justify-center gap-4">
                <button 
                    onClick={() => handleAction("encrypt")}
                    className="px-10 py-5 rounded-[2rem] night-btn-gradient text-white flex items-center gap-3 font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all"
                >
                    <Lock size={16} /> Encrypt Synthesis
                </button>
                <button 
                    onClick={() => handleAction("decrypt")}
                    className="px-10 py-5 rounded-[2rem] bg-white/5 border border-white/10 text-white flex items-center gap-3 font-black uppercase tracking-widest text-xs hover:bg-white/10 active:scale-95 transition-all"
                >
                    <Unlock size={16} /> Decrypt Synthesis
                </button>
            </div>

            <div className="p-6 rounded-[2.5rem] bg-night-indigo/5 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Shield size={16} className="text-night-indigo" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/20 leading-none">Client-Side Isolation Active</span>
                </div>
            </div>
        </div>
    );
};
