"use client";

import React, { useState } from "react";
import { VideoEngine } from "@/lib/VideoEngine";
import { fetchFile } from "@ffmpeg/util";
import { Download, RefreshCw, Video, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export const VideoToGIF = () => {
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

    const convertToGIF = async () => {
        if (!file) return;
        setError(null);

        try {
            setIsProcessing(true);
            setStatus("Initializing FFmpeg Core...");
            const ffmpeg = await VideoEngine.getInstance();
            
            ffmpeg.on("progress", ({ progress }) => {
                setProgress(Math.round(progress * 100));
            });

            setStatus("Decoding video streams...");
            await ffmpeg.writeFile("input.mp4", await fetchFile(file));

            setStatus("Synthesizing Palette & Frames...");
            await ffmpeg.exec([
                "-i", "input.mp4", 
                "-t", "5", 
                "-vf", "fps=10,scale=480:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse", 
                "output.gif"
            ]);

            setStatus("Extracting Master GIF...");
            const data = await ffmpeg.readFile("output.gif");
            const url = URL.createObjectURL(new Blob([data as unknown as BlobPart], { type: "image/gif" }));
            
            setOutputUrl(url);
            setIsProcessing(false);
            setStatus("Success.");
        } catch (err: unknown) {
            console.error(err);
            VideoEngine.reset();
            setError("Synthesis Error: " + (err as Error).message);
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
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-white/5 rounded-[2.5rem] cursor-pointer hover:bg-white/5 hover:border-night-indigo/30 transition-all group px-8 text-center"
                >
                    <Video className="text-night-indigo w-12 h-12 mb-4 group-hover:rotate-[360deg] transition-transform duration-1000" />
                    <p className="mb-2 text-sm text-white/50 font-bold tracking-tight uppercase">Upload Clip for GIF Synthesis</p>
                    <p className="text-[10px] text-white/10 tracking-[0.2em] uppercase italic">Browser-Side Frame Extraction (Max 5s Preview)</p>
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
                                 <p className="text-[10px] uppercase font-bold text-white/20">Source ready.</p>
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
                                onClick={convertToGIF}
                                disabled={isProcessing}
                                className="w-full py-5 rounded-3xl night-btn-gradient text-white font-black tracking-[0.2em] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3 uppercase shadow-2xl disabled:opacity-50 relative overflow-hidden group"
                            >
                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                {isProcessing ? <RefreshCw className="animate-spin relative z-10" /> : <Video size={18} className="relative z-10" />}
                                <span className="relative z-10">{isProcessing ? "SYNTHESIZING GIF..." : "INITIALIZE GENERATION"}</span>
                            </button>
                         </>
                    ) : (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
                             <div className="glass-card rounded-[2rem] overflow-hidden p-4 border-white/5 flex items-center justify-center bg-night-black/40">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={outputUrl} alt="GIF Result" className="max-w-full rounded-xl shadow-2xl" />
                             </div>
                             <a
                                href={outputUrl}
                                download={`Night-X-${file.name.split('.')[0]}.gif`}
                                className="w-full py-5 rounded-3xl night-btn-gradient text-white font-black tracking-[0.2em] hover:brightness-110 transition-all flex items-center justify-center gap-3 uppercase shadow-2xl relative overflow-hidden group"
                            >
                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <Download size={20} className="relative z-10" />
                                <span className="relative z-10">DOWNLOAD MASTER GIF</span>
                            </a>
                        </motion.div>
                    )}

                    <div className="p-6 rounded-[2rem] bg-rose-500/5 border border-rose-500/10 flex items-start gap-4">
                        <AlertTriangle size={16} className="text-rose-500 mt-1 shrink-0" />
                        <p className="text-[10px] text-white/40 leading-relaxed font-medium">
                            &quot;No limits. 100% sovereign operation directly on your device. We never see your files.&quot;
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};
