"use client";

import React, { useState } from "react";
import { Copy, RefreshCw, Trash2, Check, AlertCircle, Maximize2, Minimize2 } from "lucide-react";
import { motion } from "framer-motion";

export const JSONPrettier = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const formatJSON = (spaces: number = 2) => {
    try {
      if (!jsonInput.trim()) return;
      const parsed = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(parsed, null, spaces));
      setError(null);
    } catch (err: unknown) {
      setError((err as Error).message);
    }
  };

  const minifyJSON = () => {
    try {
      if (!jsonInput.trim()) return;
      const parsed = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(parsed));
      setError(null);
    } catch (err: unknown) {
      setError((err as Error).message);
    }
  };

  const clearInput = () => {
    setJsonInput("");
    setError(null);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonInput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full h-full flex flex-col gap-6">
      {/* Top Banner / Error */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Developer Engine</span>
            {error && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-rose-500 text-[10px] font-mono">
                    <AlertCircle size={12} />
                    <span>{error}</span>
                </motion.div>
            )}
        </div>
        <div className="flex gap-4">
            <button onClick={clearInput} className="text-white/20 hover:text-rose-500 transition-colors flex items-center gap-1 uppercase font-black text-[10px] tracking-widest">
                <Trash2 size={12} />
                Clear
            </button>
        </div>
      </div>

      {/* Editor Area */}
      <div className="relative flex-1 group min-h-[400px]">
        <div className="absolute -inset-0.5 bg-gradient-to-br from-white/5 to-white/0 rounded-[2.5rem] pointer-events-none" />
        <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            className="w-full h-full bg-night-black/40 border border-white/5 rounded-[2.5rem] p-8 font-mono text-sm text-white/80 outline-none focus:border-night-indigo/30 transition-all resize-none shadow-inner"
            placeholder='{ "night-x": "Paste JSON here..." }'
            spellCheck={false}
        />
        
        {/* Floating Controls */}
        <div className="absolute top-6 right-6 flex flex-col gap-3">
             <button
                onClick={copyToClipboard}
                title="Copy Content"
                className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-night-emerald hover:bg-night-emerald/10 transition-all"
            >
                {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={() => formatJSON(2)}
          className="py-4 rounded-2xl night-btn-gradient text-white font-black text-[10px] uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xl shadow-night-indigo/10 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Maximize2 size={14} className="relative z-10" />
          <span className="relative z-10">Prettify (2s)</span>
        </button>
        <button
          onClick={() => formatJSON(4)}
          className="py-4 rounded-2xl bg-white/5 border border-white/10 text-white/60 font-black text-[10px] uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-2"
        >
          Prettify (4s)
        </button>
        <button
          onClick={minifyJSON}
          className="py-4 rounded-2xl bg-white/5 border border-white/10 text-white/60 font-black text-[10px] uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-2"
        >
          <Minimize2 size={14} />
          Minify
        </button>
        <button
          onClick={() => formatJSON(2)}
          className="py-4 rounded-2xl bg-white/5 border border-white/10 text-night-emerald font-black text-[10px] uppercase tracking-widest hover:bg-night-emerald/10 transition-all flex items-center justify-center gap-2"
        >
          <RefreshCw size={14} />
          Revalidate
        </button>
      </div>

      {/* Context Note */}
      <div className="text-center">
         <p className="text-[10px] font-bold tracking-[0.4em] text-white/10 uppercase">Sovereign Validation • Offline Syntax Engine</p>
      </div>
    </div>
  );
};
