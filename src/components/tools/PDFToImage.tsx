/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { Download, ImageIcon, FileText, Check } from "lucide-react";
import { motion } from "framer-motion";

// Configuration for pdf.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

export const PDFToImage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setImages([]);
      setProgress(0);
    }
  };

  const convertPDF = async () => {
    if (!file) return;

    try {
      setIsProcessing(true);
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const totalPages = pdf.numPages;
      const extractedImages: string[] = [];

      for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 }); // 2x scale for high res
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context!, viewport, canvas }).promise;
        extractedImages.push(canvas.toDataURL("image/png"));
        setProgress(Math.round((i / totalPages) * 100));
      }

      setImages(extractedImages);
      setIsProcessing(false);
    } catch (err) {
      console.error("PDF Synthesis Fault:", err);
      setIsProcessing(false);
    }
  };

  const downloadAll = () => {
    images.forEach((dataUrl, index) => {
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `Night-X-PDF-Page-${index + 1}.png`;
      link.click();
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      {!file ? (
        <motion.label
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-white/5 rounded-[2.5rem] cursor-pointer hover:bg-white/5 hover:border-night-indigo/30 transition-all group"
        >
          <FileText className="text-night-indigo w-12 h-12 mb-4 group-hover:rotate-12 transition-transform" />
          <p className="mb-2 text-sm text-white/50 font-bold tracking-tight uppercase">Select PDF for Synthesis</p>
          <p className="text-[10px] text-white/10 tracking-[0.2em] uppercase italic">Browser-Side Extraction • 300 DPI Rendering</p>
          <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf" />
        </motion.label>
      ) : (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl glass-card border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-night-indigo/10 flex items-center justify-center text-night-indigo">
                <FileText size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-white/90 truncate max-w-[200px]">{file.name}</p>
                <p className="text-[10px] uppercase font-bold text-white/20">{(file.size / 1024).toFixed(1)} KB PDF</p>
              </div>
            </div>
            <button onClick={() => setFile(null)} className="text-[10px] font-black uppercase text-rose-500/50 hover:text-rose-500 transition-colors">Abort</button>
          </div>

          {isProcessing && (
             <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/30">
                    <span>Processing Pages...</span>
                    <span className="text-night-indigo">{progress}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                        className="h-full bg-night-indigo"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                    />
                </div>
             </div>
          )}

          {images.length === 0 && !isProcessing && (
            <button
                onClick={convertPDF}
                className="w-full py-5 rounded-3xl night-btn-gradient text-white font-black tracking-[0.2em] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3 uppercase shadow-2xl relative overflow-hidden group"
            >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <ImageIcon size={18} className="relative z-10" />
                <span className="relative z-10">INITIALIZE PAGE EXTRACTION</span>
            </button>
          )}

          {images.length > 0 && (
             <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
                <div className="p-6 rounded-3xl bg-night-emerald/5 border border-night-emerald/20 flex items-center justify-between">
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-night-emerald opacity-60">Synthesis Complete</span>
                        <p className="text-lg font-bold text-white">{images.length} Pages Extracted</p>
                    </div>
                    <Check size={28} className="text-night-emerald" />
                </div>

                <div className="grid grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {images.map((dataUrl, idx) => (
                        <div key={idx} className="relative group rounded-2xl overflow-hidden bg-black/40 border-white/5 border p-2">
                             <img src={dataUrl} alt={`Page ${idx + 1}`} className="w-full rounded-2xl border border-white/10 shadow-lg object-cover bg-white" />
                             <div className="absolute inset-0 bg-night-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                 <span className="text-[10px] font-bold text-white uppercase tracking-widest">Page {idx + 1}</span>
                             </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={downloadAll}
                    className="w-full py-5 rounded-3xl night-btn-gradient text-white font-black tracking-[0.2em] hover:brightness-110 transition-all flex items-center justify-center gap-3 uppercase shadow-2xl relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Download size={20} className="relative z-10" />
                    <span className="relative z-10">DOWNLOAD ALL AS MASTER PNG</span>
                </button>
             </motion.div>
          )}
        </div>
      )}
    </div>
  );
};
