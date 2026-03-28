"use client";

import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Download, Copy, Check, Type, Maximize } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { downloadDataUrl } from "@/lib/downloadUtils";

export const QRBuilder = () => {
  const [text, setText] = useState("https://night-x.hub");
  const [size, setSize] = useState(256);
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const downloadQR = () => {
    const svg = document.getElementById("night-x-qr");
    if (!svg) return;
    
    setIsExporting(true);
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    img.onload = () => {
      canvas.width = size;
      canvas.height = size;
      ctx!.fillStyle = "white"; // Ensure white background for QR scanners
      ctx!.fillRect(0, 0, size, size);
      ctx?.drawImage(img, 0, 0, size, size);
      
      const pngFile = canvas.toDataURL("image/png");
      downloadDataUrl(pngFile, `Night-X-QR-${new Date().getTime()}.png`);
      
      setTimeout(() => setIsExporting(false), 800);
    };
    
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center pb-10">
      {/* Controls */}
      <div className="space-y-6">
        <div className="p-6 rounded-3xl glass-card border-white/5 space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <Type size={14} className="text-night-indigo" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Target Content</span>
          </div>
          <textarea
            value={text}
            onChange={(e) => { setText(e.target.value); setIsExporting(false); }}
            className="w-full h-32 bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-night-indigo/50 transition-colors resize-none"
            placeholder="Enter URL or text..."
          />
        </div>

        <div className="p-6 rounded-3xl glass-card border-white/5 space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <Maximize size={14} className="text-night-indigo" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Resolution</span>
          </div>
          <input
            type="range"
            min="128"
            max="1024"
            step="128"
            value={size}
            onChange={(e) => { setSize(Number(e.target.value)); setIsExporting(false); }}
            className="w-full accent-night-indigo cursor-pointer"
          />
          <div className="flex justify-between text-[9px] font-mono text-white/20 uppercase tracking-widest">
            <span>SD (128)</span>
            <span className="text-night-indigo font-black">{size}PX</span>
            <span>UHD (1024)</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
            <button
                onClick={copyToClipboard}
                className="w-full py-4 rounded-2xl bg-white/[0.03] border border-white/10 text-white/60 font-black text-[10px] uppercase tracking-widest hover:bg-white/5 hover:text-white transition-all flex items-center justify-center gap-2 group relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                {copied ? <Check size={14} className="text-night-indigo relative z-10" /> : <Copy size={14} className="relative z-10" />}
                <span className="relative z-10">{copied ? "Encoded to Clipboard" : "Copy Source URL"}</span>
            </button>
            <button
                onClick={downloadQR}
                disabled={isExporting}
                className="w-full py-5 rounded-3xl night-btn-gradient text-white font-black text-xs uppercase tracking-[0.2em] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-2xl shadow-night-indigo/20 relative overflow-hidden group"
            >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                {isExporting ? <Check size={16} className="relative z-10" /> : <Download size={16} className="relative z-10" />}
                <span className="relative z-10">{isExporting ? "EXPORTING..." : "GENERATE & DOWNLOAD PNG"}</span>
            </button>
        </div>
      </div>

      {/* Preview */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="aspect-square glass-card rounded-[3rem] p-8 flex items-center justify-center border-white/5 relative group"
      >
        <div className="absolute inset-0 bg-night-indigo/5 opacity-0 group-hover:opacity-100 transition-opacity blur-3xl pointer-events-none rounded-full" />
        <div className="p-6 bg-white rounded-3xl shadow-2xl relative z-10 overflow-hidden">
          <QRCodeSVG
            id="night-x-qr"
            value={text}
            size={size > 200 ? 200 : size}
            level="H"
            includeMargin={true}
          />
        </div>
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-night-black border border-white/5 text-[9px] font-black text-white/20 tracking-[0.4em] uppercase whitespace-nowrap">
            Dynamic Optical Preview
        </div>
      </motion.div>
    </div>
  );
};

