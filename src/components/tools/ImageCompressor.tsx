"use client";

import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import { Upload, Download, Loader2, Image as ImageIcon, Check, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { downloadBlob } from "@/lib/downloadUtils";

export const ImageCompressor = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionProgress, setCompressionProgress] = useState(0);
  const [options, setOptions] = useState({
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setCompressedFile(null);
    }
  };

  const handleCompress = async () => {
    if (!selectedFile) return;

    setIsCompressing(true);
    setCompressionProgress(0);

    try {
      const compressedBlob = await imageCompression(selectedFile, {
        ...options,
        onProgress: (p) => setCompressionProgress(p),
      });
      
      const file = new File([compressedBlob], selectedFile.name, {
        type: compressedBlob.type,
      });

      setCompressedFile(file);
    } catch (error) {
      console.error("Compression failed:", error);
    } finally {
      setIsCompressing(false);
    }
  };

  const downloadFile = () => {
    if (!compressedFile) return;
    downloadBlob(compressedFile, `Night-X-Compressed-${compressedFile.name}`);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      {/* Upload Zone */}
      {!selectedFile ? (
        <motion.label
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-white/5 rounded-3xl cursor-pointer hover:bg-white/5 hover:border-night-indigo/30 transition-all group"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <div className="p-4 rounded-2xl bg-night-indigo/10 mb-4 group-hover:scale-110 transition-transform">
              <Upload className="text-night-indigo w-8 h-8" />
            </div>
            <p className="mb-2 text-sm text-white/50">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-white/30 tracking-tight">PNG, JPG, WEBP (Max 20MB)</p>
          </div>
          <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
        </motion.label>
      ) : (
        <div className="space-y-6">
          {/* File Preview Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 rounded-2xl glass-card flex items-center justify-between border-white/5"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center">
                <ImageIcon className="text-white/40" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-white/90 truncate max-w-[200px]">{selectedFile.name}</p>
                <p className="text-xs text-white/30">{formatSize(selectedFile.size)}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedFile(null)}
              className="text-white/20 hover:text-rose-500 transition-colors text-xs font-bold uppercase tracking-widest"
            >
              Remove
            </button>
          </motion.div>

          {/* Options Slider */}
          <div className="p-6 rounded-2xl glass-card border-white/5 space-y-4">
             <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-white/60 tracking-wider">Target Size (MB)</span>
                <span className="text-night-emerald font-mono font-bold">{options.maxSizeMB} MB</span>
             </div>
             <input 
                type="range" min="0.1" max="5" step="0.1" 
                value={options.maxSizeMB}
                onChange={(e) => setOptions({ ...options, maxSizeMB: parseFloat(e.target.value) })}
                className="w-full accent-night-indigo h-2 bg-white/5 rounded-lg appearance-none cursor-pointer"
             />
          </div>

          {/* Action Button */}
          {!compressedFile ? (
            <button
              disabled={isCompressing}
              onClick={handleCompress}
              className="w-full py-5 rounded-3xl night-btn-gradient text-white font-black tracking-[0.2em] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3 uppercase shadow-xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              {isCompressing ? (
                <>
                  <Loader2 className="animate-spin relative z-10" size={20} />
                  <span className="relative z-10">Compressing {compressionProgress}%</span>
                </>
              ) : (
                <>
                  <div className="p-1 rounded-lg bg-white/10 relative z-10">
                    <ImageIcon size={14} />
                  </div>
                  <span className="relative z-10 text-xs">START COMPRESSION</span>
                </>
              )}
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="p-6 rounded-3xl bg-night-emerald/5 border border-night-emerald/20 flex items-center justify-between">
                <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-night-emerald opacity-60">Engine Verdict</span>
                    <p className="text-lg font-bold text-white">Reduced to {formatSize(compressedFile.size)}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-night-emerald/20 flex items-center justify-center text-night-emerald shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                    <Check size={24} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={() => { setCompressedFile(null); setSelectedFile(null); }}
                    className="py-5 rounded-3xl bg-white/5 border border-white/10 text-white font-black tracking-[0.2em] hover:bg-white/10 active:scale-[0.98] transition-all flex items-center justify-center gap-3 uppercase relative overflow-hidden group"
                >
                    <RefreshCw size={18} />
                    <span className="text-[10px]">NEW IMAGE</span>
                </button>
                <button
                    onClick={downloadFile}
                    className="py-5 rounded-3xl night-btn-gradient text-white font-black tracking-[0.2em] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3 uppercase shadow-2xl relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Download size={20} className="relative z-10" />
                    <span className="relative z-10">DOWNLOAD</span>
                </button>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};
