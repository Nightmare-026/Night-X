"use client";

import React, { useState } from "react";
import { VideoEngine } from "@/lib/VideoEngine";
import { fetchFile } from "@ffmpeg/util";
import { Upload, Download, RefreshCw, Video, Check, Info } from "lucide-react";
import { motion } from "framer-motion";

export const VideoShrinker = () => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setOutputUrl(null);
      setProgress(0);
    }
  };

  const shrinkVideo = async () => {
    if (!file) return;
    setError(null);

    try {
      setIsProcessing(true);
      setStatus("Initializing Master FFmpeg Engine...");
      
      const ffmpeg = await VideoEngine.getInstance();
      
      ffmpeg.on("progress", ({ progress }) => {
        setProgress(Math.round(progress * 100));
      });

      setStatus("Transferring binary data...");
      await ffmpeg.writeFile("input.mp4", await fetchFile(file));

      setStatus("Executing Sovereign Compression...");
      await ffmpeg.exec(["-i", "input.mp4", "-vcodec", "libx264", "-crf", "30", "output.mp4"]);

      setStatus("Retrieving resulting synthesis...");
      const data = await ffmpeg.readFile("output.mp4");
      const url = URL.createObjectURL(new Blob([data as unknown as BlobPart], { type: "video/mp4" }));
      
      setOutputUrl(url);
      setIsProcessing(false);
      setStatus("Success.");
    } catch (err: unknown) {
      console.error(err);
      VideoEngine.reset(); // Allow retry on next attempt
      setError("Compression failed: " + (err as Error).message);
      setStatus("");
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      {!file ? (
        <motion.label
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-white/5 rounded-[2.5rem] cursor-pointer hover:bg-white/5 hover:border-night-indigo/30 transition-all group"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-8">
            <Upload className="text-night-indigo w-12 h-12 mb-4 group-hover:-translate-y-2 transition-transform" />
            <p className="mb-2 text-sm text-white/50 font-bold tracking-tight uppercase">Upload Video for Synthesis</p>
            <p className="text-[10px] text-white/10 tracking-[0.2em] uppercase italic">Browser-Level Compression (No Server Logs)</p>
          </div>
          <input type="file" className="hidden" onChange={handleFileChange} accept="video/*" />
        </motion.label>
      ) : (
        <div className="space-y-6">
            <div className="p-6 rounded-3xl glass-card border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-night-indigo/10 flex items-center justify-center text-night-indigo">
                        <Video size={20} />
                    </div>
                    <div>
                         <p className="text-sm font-bold text-white/90 truncate max-w-[200px]">{file.name}</p>
                         <p className="text-[10px] uppercase font-bold text-white/20">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                </div>
                <button onClick={() => setFile(null)} className="text-[10px] font-black uppercase text-rose-500/50 hover:text-rose-500 transition-colors">Abort</button>
            </div>

            {isProcessing && (
                <div className="space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/30">
                        <span>{status}</span>
                        <span className="text-night-indigo">{progress}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                            className="h-full bg-night-indigo shadow-lg shadow-night-indigo/20"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            )}

            {!outputUrl ? (
                <>
                    {error && (
                        <div className="p-4 rounded-2xl bg-red-500/8 border border-red-500/15 text-red-400 text-[11px] font-semibold flex items-center gap-2">
                             <span>⚠</span>
                             <span>{error}</span>
                        </div>
                    )}
                    <button
                        onClick={shrinkVideo}
                        disabled={isProcessing}
                        className="w-full py-5 rounded-3xl night-btn-gradient text-white font-black tracking-[0.2em] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3 uppercase shadow-2xl disabled:opacity-50 relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {isProcessing ? <RefreshCw className="animate-spin relative z-10" /> : <Video size={18} className="relative z-10" />}
                        <span className="relative z-10">{isProcessing ? "PROCESSING ENGINE..." : "INITIALIZE OPTIMIZATION"}</span>
                    </button>
                </>
            ) : (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
                    <div className="p-6 rounded-3xl bg-night-emerald/5 border border-night-emerald/20 flex items-center justify-between">
                         <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-night-emerald opacity-60">Synthesis Complete</span>
                            <p className="text-lg font-bold text-white">Video Optimized</p>
                         </div>
                         <Check size={28} className="text-night-emerald" />
                    </div>
                    <a
                        href={outputUrl}
                        download={`Night-X-Compressed-${file.name}`}
                        className="w-full py-5 rounded-3xl night-btn-gradient text-white font-black tracking-[0.2em] hover:brightness-110 transition-all flex items-center justify-center gap-3 uppercase shadow-2xl relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Download size={20} className="relative z-10" />
                        <span className="relative z-10">DOWNLOAD AS MASTER MP4</span>
                    </a>
                </motion.div>
            )}

            <div className="p-6 rounded-[2rem] bg-amber-500/5 border border-amber-500/10 flex items-start gap-4">
                <Info size={16} className="text-amber-500 mt-1 shrink-0" />
                <p className="text-[10px] text-white/40 leading-relaxed font-medium">
                    &quot;Video processing is computationally expensive. Ensure your device is plugged in for larger files. All operations occur in memory.&quot;
                </p>
            </div>
        </div>
      )}
    </div>
  );
};
