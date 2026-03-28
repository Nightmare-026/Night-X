"use client";

import React, { useState } from "react";
import { Copy, Check, PenTool } from "lucide-react";
import { motion } from "framer-motion";

const LOREM_TEXT = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio.",
    "Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.",
    "Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula.",
    "Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam.",
    "Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque."
];

export const LoremIpsum = () => {
    const [count, setCount] = useState(3);
    const [type, setType] = useState<"paragraphs" | "sentences">("paragraphs");
    const [output, setOutput] = useState("");
    const [copied, setCopied] = useState(false);

    const generate = () => {
        const result = [];
        for (let i = 0; i < count; i++) {
            const idx = i % LOREM_TEXT.length;
            result.push(LOREM_TEXT[idx]);
        }
        setOutput(result.join(type === "paragraphs" ? "\n\n" : " "));
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full max-w-2xl mx-auto space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                <div className="space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Synthesis Mode</span>
                    <div className="flex gap-2 p-2 bg-white/5 rounded-2xl border border-white/5">
                        <button
                            onClick={() => setType("paragraphs")}
                            className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all relative overflow-hidden group ${type === "paragraphs" ? "night-btn-gradient text-white shadow-lg" : "text-white/20 hover:text-white"}`}
                        >
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span className="relative z-10">Paragraphs</span>
                        </button>
                        <button
                            onClick={() => setType("sentences")}
                            className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all relative overflow-hidden group ${type === "sentences" ? "night-btn-gradient text-white shadow-lg" : "text-white/20 hover:text-white"}`}
                        >
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span className="relative z-10">Sentences</span>
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                     <span className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Quantity</span>
                     <div className="relative group">
                        <input
                            type="number"
                            min="1"
                            max="20"
                            value={count}
                            onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-xl font-black text-white focus:outline-none focus:border-night-indigo transition-all [appearance:textfield]"
                        />
                     </div>
                </div>
            </div>

            <button
                onClick={generate}
                className="w-full py-5 rounded-3xl night-btn-gradient text-white font-black tracking-[0.2em] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3 uppercase shadow-2xl relative overflow-hidden group"
            >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <PenTool size={18} className="relative z-10" />
                <span className="relative z-10">INITIALIZE GENERATOR</span>
            </button>

            {output && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative group">
                    <div className="absolute top-6 right-6 flex gap-2">
                        <button onClick={copyToClipboard} className="p-3 rounded-xl night-btn-gradient text-white hover:brightness-110 transition-all shadow-xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            {copied ? <Check size={16} className="relative z-10" /> : <Copy size={16} className="relative z-10" />}
                        </button>
                    </div>
                    <div className="w-full max-h-80 overflow-y-auto bg-night-indigo/5 border border-night-indigo/20 rounded-[2.5rem] p-8 text-white/90 font-mono text-sm leading-relaxed custom-scrollbar">
                         <div className="whitespace-pre-wrap">{output}</div>
                    </div>
                </motion.div>
            )}

            <div className="p-6 rounded-[2rem] bg-night-black/40 border border-white/5 flex items-center justify-center text-center">
                 <p className="text-[10px] italic text-white/20 tracking-wider">&quot;Classic placeholder synthesis for elite visual layout testing.&quot;</p>
            </div>
        </div>
    );
};
