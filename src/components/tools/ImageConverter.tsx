"use client";

import React, { useState, useRef } from "react";
import { Upload, Download, RefreshCw, Image as ImageIcon, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { downloadDataUrl } from "@/lib/downloadUtils";
import { CustomDropdown } from "@/components/ui/CustomDropdown";

const formats = [
  { label: "PNG (Lossless)", value: "image/png" },
  { label: "JPEG (Standard)", value: "image/jpeg" },
  { label: "WEBP (Modern)", value: "image/webp" },
];

export const ImageConverter = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [targetType, setTargetType] = useState("image/png");
  const [isConverting, setIsConverting] = useState(false);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setConvertedUrl(null);
    }
  };

  const handleConvert = () => {
    if (!selectedFile || !canvasRef.current) return;

    setIsConverting(true);
    const img = new Image();
    img.src = URL.createObjectURL(selectedFile);

    img.onload = () => {
      const canvas = canvasRef.current!;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0);

      const convertedDataUrl = canvas.toDataURL(targetType);
      setConvertedUrl(convertedDataUrl);
      setIsConverting(false);
      URL.revokeObjectURL(img.src);
    };
  };

  const downloadConverted = () => {
    if (!convertedUrl || !selectedFile) return;
    const extension = targetType.split("/")[1];
    const baseName = selectedFile.name.split(".")[0];
    downloadDataUrl(convertedUrl, `Night-X-Converted-${baseName}.${extension}`);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      <canvas ref={canvasRef} className="hidden" />

      {!selectedFile ? (
        <motion.label
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-white/5 rounded-[2.5rem] cursor-pointer hover:bg-white/5 hover:border-night-indigo/30 transition-all group shadow-inner"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <div className="p-4 rounded-2xl bg-night-indigo/10 mb-4 group-hover:rotate-12 transition-transform shadow-lg shadow-night-indigo/5">
              <Upload className="text-night-indigo w-8 h-8" />
            </div>
            <p className="mb-2 text-sm text-white/50 font-bold tracking-tight uppercase">Drop Image to Initialize</p>
            <p className="text-[10px] text-white/20 tracking-[0.2em] uppercase">Private • Secure • Local</p>
          </div>
          <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
        </motion.label>
      ) : (
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-3xl glass-card flex items-center justify-between border-white/5"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-night-indigo/10 flex items-center justify-center">
                <ImageIcon className="text-night-indigo" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-white/90 truncate max-w-[200px]">{selectedFile.name}</p>
                <p className="text-[10px] uppercase font-bold tracking-widest text-white/20">{selectedFile.type}</p>
              </div>
            </div>
            <button 
                onClick={() => { setSelectedFile(null); setConvertedUrl(null); }} 
                className="text-white/20 hover:text-rose-500 text-[10px] font-black uppercase tracking-widest transition-colors px-4 py-2 rounded-lg hover:bg-rose-500/5"
            >
                Abort
            </button>
          </motion.div>

          <div className="p-6 rounded-3xl glass-card border-white/5 space-y-4">
            <CustomDropdown 
                options={formats} 
                value={targetType} 
                onChange={(v) => { setTargetType(v); setConvertedUrl(null); }} 
                label="Target Conversion Format"
            />
          </div>

          {!convertedUrl ? (
            <button
              onClick={handleConvert}
              disabled={isConverting}
              className="w-full py-5 rounded-3xl night-btn-gradient text-white font-black tracking-[0.2em] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3 uppercase shadow-xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <RefreshCw className={isConverting ? "animate-spin relative z-10" : "relative z-10"} size={20} />
              <span className="relative z-10 uppercase">{isConverting ? "Synthesizing Image..." : "Initialize conversion"}</span>
            </button>
          ) : (
            <AnimatePresence>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
                    <div className="p-6 rounded-3xl bg-night-indigo/5 border border-night-indigo/20 flex items-center justify-between">
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-night-indigo opacity-60">Synthesis Complete</span>
                            <p className="text-lg font-bold text-white">Conversion Ready</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-night-indigo/20 flex items-center justify-center text-night-indigo shadow-lg shadow-night-indigo/10">
                            <Check size={24} />
                        </div>
                    </div>
          <div className="grid grid-cols-2 gap-4">
              <button 
                  onClick={() => { setConvertedUrl(null); setSelectedFile(null); }} 
                  className="py-5 rounded-3xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 text-[10px] font-black uppercase tracking-widest transition-all"
              >
                  New Image
              </button>
              <button
                  onClick={downloadConverted}
                  className="py-5 rounded-3xl night-btn-gradient text-white font-black tracking-[0.2em] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3 uppercase shadow-2xl relative overflow-hidden group"
              >
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Download size={20} className="relative z-10" />
                  <span className="relative z-10 uppercase font-black text-[10px]">Save File</span>
              </button>
          </div>
                </motion.div>
            </AnimatePresence>
          )}
        </div>
      )}
    </div>
  );
};

