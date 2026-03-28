"use client";

import React, { useState } from "react";
import { FileText, Download, X, Plus, Check, Loader2 } from "lucide-react";
import { jsPDF } from "jspdf";
import { motion, AnimatePresence } from "framer-motion";
import { downloadBlob } from "@/lib/downloadUtils";

export const ImageToPDF = () => {
  const [imageList, setImageList] = useState<{ id: string, file: File, preview: string }[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedBlob, setGeneratedBlob] = useState<Blob | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newImages = files.map(file => ({
        id: Math.random().toString(36).substring(2, 9),
        file,
        preview: URL.createObjectURL(file)
      }));
      setImageList(prev => [...prev, ...newImages]);
      setGeneratedBlob(null);
    }
  };

  const removeImage = (id: string, preview: string) => {
    setImageList(prev => prev.filter(img => img.id !== id));
    URL.revokeObjectURL(preview);
    setGeneratedBlob(null);
  };

  const generatePDF = async () => {
    if (imageList.length === 0) return;
    setIsGenerating(true);

    const pdf = new jsPDF();
    
    for (let i = 0; i < imageList.length; i++) {
      const img = imageList[i];
      const dataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(img.file);
      });

      if (i > 0) pdf.addPage();
      
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(dataUrl, "JPEG", 0, 0, pdfWidth, pdfHeight);
    }

    const blob = pdf.output("blob");
    setGeneratedBlob(blob);
    setIsGenerating(false);
  };

  const handleDownload = () => {
    if (!generatedBlob) return;
    downloadBlob(generatedBlob, `Night-X-Compiled-${new Date().getTime()}.pdf`);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {imageList.map((img, index) => (
          <motion.div
            layout
            key={img.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-[3/4] relative rounded-3xl overflow-hidden glass-card border-white/5 group shadow-lg bg-black/20"
          >
            <img
              src={img.preview}
              alt="preview"
              className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500 p-2 rounded-[2rem]"
            />
            <button
              onClick={() => removeImage(img.id, img.preview)}
              className="absolute top-3 right-3 p-2 rounded-xl bg-night-black/60 text-white hover:bg-rose-500 transition-all backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 shadow-xl"
            >
              <X size={14} />
            </button>
            <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-lg border border-white/5 text-[9px] font-mono text-white/40 truncate">
                PAGE {index + 1} • {img.file.name}
            </div>
          </motion.div>
        ))}
        
        <label className="aspect-[3/4] rounded-3xl border-2 border-dashed border-white/5 hover:border-night-indigo/30 hover:bg-white/5 transition-all cursor-pointer flex flex-col items-center justify-center group shadow-inner">
          <div className="p-4 rounded-2xl bg-night-indigo/10 group-hover:scale-110 transition-transform shadow-lg shadow-night-indigo/5">
            <Plus className="text-night-indigo" size={24} />
          </div>
          <span className="mt-3 text-[10px] font-black uppercase tracking-widest text-white/20">Append Data</span>
          <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" multiple />
        </label>
      </div>

      {imageList.length > 0 && (
        <div className="space-y-4">
            {!generatedBlob ? (
                <button
                    onClick={generatePDF}
                    disabled={isGenerating}
                    className="w-full py-5 rounded-3xl night-btn-gradient text-white font-black tracking-[0.2em] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3 uppercase shadow-xl relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {isGenerating ? <Loader2 className="animate-spin relative z-10" size={20} /> : <FileText className="relative z-10" size={20} />}
                    <span className="relative z-10">{isGenerating ? "Compiling Master PDF..." : "Synthesize PDF Document"}</span>
                </button>
            ) : (
                <AnimatePresence>
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                        <div className="p-6 rounded-3xl bg-night-indigo/5 border border-white/5 flex items-center justify-between shadow-inner">
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-night-indigo opacity-60">Synthesis Complete</span>
                                <p className="text-lg font-bold text-white">Master Document Ready</p>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-night-indigo/20 flex items-center justify-center text-night-indigo shadow-lg shadow-night-indigo/10 border border-night-indigo/20">
                                <Check size={24} />
                            </div>
                        </div>
                        <button
                            onClick={handleDownload}
                            className="w-full py-5 rounded-3xl night-btn-gradient text-white font-black tracking-[0.2em] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3 uppercase shadow-2xl relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <Download size={20} className="relative z-10" />
                            <span className="relative z-10">Download Master PDF</span>
                        </button>
                        <button 
                            onClick={() => { setImageList([]); setGeneratedBlob(null); }} 
                            className="w-full text-center text-[10px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-white transition-colors py-2"
                        >
                            Clear Workspace
                        </button>
                    </motion.div>
                </AnimatePresence>
            )}
        </div>
      )}

      {imageList.length === 0 && (
        <div className="text-center py-20 glass-card rounded-[3rem] border-white/5">
            <div className="inline-flex p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 mb-6">
                <FileText size={40} className="text-white/10" />
            </div>
            <p className="text-sm text-white/30 font-bold uppercase tracking-[0.3em]">Workspace Null • Sequence Offline</p>
            <p className="text-[10px] text-white/10 mt-2 uppercase tracking-widest">Awaiting primary data input</p>
        </div>
      )}
    </div>
  );
};
