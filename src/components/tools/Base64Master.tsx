/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { Copy, Check, ArrowDownUp, FileCode, Upload, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

export const Base64Master = () => {
    const [mode, setMode] = useState<"text" | "file">("text");
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [isEncoding, setIsEncoding] = useState(true);
    const [copied, setCopied] = useState(false);
    const [filePreview, setFilePreview] = useState<string | null>(null);

    const handleTextProcess = (val: string) => {
        setInput(val);
        try {
            if (isEncoding) {
                setOutput(btoa(val));
            } else {
                setOutput(atob(val));
            }
        } catch {
            setOutput("Invalid input for processing...");
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const base64 = event.target?.result as string;
            setOutput(base64);
            if (file.type.startsWith("image/")) {
                setFilePreview(base64);
            } else {
                setFilePreview(null);
            }
        };
        reader.readAsDataURL(file);
    };

    const toggleMode = () => {
        setIsEncoding(!isEncoding);
        const temp = input;
        setInput(output);
        setOutput(temp);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            {/* Tabs */}
            <div className="flex p-1 bg-white/5 border border-white/5 rounded-2xl w-fit mx-auto mb-8">
                <button
                    onClick={() => setMode("text")}
                    className={`px-8 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        mode === "text" ? "night-btn-gradient text-white shadow-lg" : "text-white/20 hover:text-white"
                    }`}
                >
                    Text Engine
                </button>
                <button
                    onClick={() => setMode("file")}
                    className={`px-8 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        mode === "file" ? "night-btn-gradient text-white shadow-lg" : "text-white/20 hover:text-white"
                    }`}
                >
                    File Synthesis
                </button>
            </div>

            {mode === "text" ? (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                        <div className="space-y-2">
                             <span className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-4">{isEncoding ? "Source" : "Base64"}</span>
                             <textarea
                                value={input}
                                onChange={(e) => handleTextProcess(e.target.value)}
                                className="w-full h-48 bg-white/5 border border-white/10 rounded-3xl p-6 text-sm text-white/80 outline-none focus:border-night-indigo/30 transition-all resize-none"
                                placeholder={isEncoding ? "Enter normal text..." : "Enter Base64 string..."}
                             />
                        </div>

                        <div className="flex md:flex-col justify-center gap-4 py-2">
                            <button onClick={toggleMode} className="p-4 rounded-full bg-night-indigo/10 border border-night-indigo/20 text-night-indigo hover:rotate-180 transition-transform duration-500">
                                <ArrowDownUp size={20} />
                            </button>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/10 text-center">Engine Shift</span>
                        </div>

                        <div className="space-y-2">
                             <span className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-4">{isEncoding ? "Base64" : "Normal"}</span>
                             <div className="relative group h-48">
                                <textarea
                                    readOnly
                                    value={output}
                                    className="w-full h-full bg-night-black/40 border border-white/5 rounded-3xl p-6 text-sm text-night-emerald outline-none transition-all resize-none shadow-inner"
                                />
                                <button
                                    onClick={copyToClipboard}
                                    className="absolute top-4 right-4 p-3 rounded-xl bg-white/5 border border-white/10 text-white/30 hover:text-night-emerald transition-all"
                                >
                                    {copied ? <Check size={16} /> : <Copy size={16} />}
                                </button>
                             </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    <motion.label
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-white/5 rounded-[2.5rem] cursor-pointer hover:bg-white/5 hover:border-night-indigo/30 transition-all group overflow-hidden"
                    >
                        {!output ? (
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="text-night-indigo w-10 h-10 mb-4 group-hover:-translate-y-2 transition-transform" />
                                <p className="mb-2 text-sm text-white/50 font-bold tracking-tight uppercase">Upload File to Synthesis</p>
                                <p className="text-[10px] text-white/10 tracking-[0.2em] uppercase italic">Browser-Level Conversion Only</p>
                            </div>
                        ) : (
                            <div className="relative w-full h-full flex items-center justify-center p-8">
                                {filePreview ? (
                                    <img src={output} alt="Decoded visualization" className="max-w-full max-h-64 object-contain mx-auto rounded-xl shadow-2xl block" />
                                ) : (
                                    <div className="flex flex-col items-center gap-4">
                                         <FileCode size={48} className="text-night-indigo" />
                                         <p className="text-[10px] font-bold text-white/20 tracking-widest uppercase">Binary Encoded</p>
                                    </div>
                                )}
                            </div>
                        )}
                        <input type="file" className="hidden" onChange={handleFileUpload} />
                    </motion.label>

                    {output && (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={copyToClipboard}
                                    className="py-4 rounded-2xl night-btn-gradient text-white font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-2 relative overflow-hidden group"
                                >
                                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    {copied ? <Check size={16} className="relative z-10" /> : <Copy size={16} className="relative z-10" />}
                                    <span className="relative z-10">Copy Data URI</span>
                                </button>
                                <button
                                    onClick={() => { setOutput(""); setFilePreview(null); }}
                                    className="py-4 rounded-2xl bg-white/5 border border-white/10 text-rose-500 font-black text-xs uppercase tracking-widest hover:bg-rose-500/10 transition-all flex items-center justify-center gap-2"
                                >
                                    <Trash2 size={16} />
                                    Purge
                                </button>
                            </div>
                            <div className="p-6 rounded-3xl bg-night-black/40 border border-white/5 max-h-32 overflow-y-auto font-mono text-[10px] text-white/30 break-all leading-relaxed">
                                {output}
                            </div>
                        </motion.div>
                    )}
                </div>
            )}

            <div className="text-center pt-4">
                 <p className="text-[9px] font-black tracking-[0.4em] text-white/10 uppercase">Sovereign Encryption • No Server Interaction</p>
            </div>
        </div>
    );
};
