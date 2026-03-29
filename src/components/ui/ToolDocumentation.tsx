"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, HelpCircle, Lightbulb } from "lucide-react";
import { TiltCard } from "./TiltCard";

interface DocumentationData {
  overview: string;
  useCases: string[];
  faqs: { q: string, a: string }[];
  example: string;
}

interface ToolDocumentationProps {
  data: DocumentationData;
  color: string;
}

export const ToolDocumentation = ({ data, color }: ToolDocumentationProps) => {
  return (
    <div className="mt-20 sm:mt-32 space-y-20 sm:space-y-32 mb-20 sm:mb-32">
      {/* 01 • Intelligence Overview */}
      <section>
        <div className="flex items-center gap-4 mb-8 sm:mb-10">
           <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-white/10" />
           <div className="flex items-center gap-3">
               <span className="text-[10px] font-black text-white/40 tracking-[0.4em]">01</span>
               <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-white/70">Intelligence Overview</h2>
           </div>
           <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        </div>
        <TiltCard color={color} className="rounded-[2.5rem]">
          <div className="p-8 sm:p-12 relative overflow-hidden group">
             <p className="text-lg sm:text-2xl text-white/90 leading-relaxed font-light tracking-tight max-w-4xl relative z-10">
               {data.overview}
             </p>
          </div>
        </TiltCard>
      </section>

      {/* 02 • Strategic Use Cases */}
      <section>
        <div className="flex items-center gap-4 mb-8 sm:mb-10">
           <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-white/10" />
           <div className="flex items-center gap-3">
               <span className="text-[10px] font-black text-white/40 tracking-[0.4em]">02</span>
               <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-white/70">High-Signal Use Cases</h2>
           </div>
           <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {data.useCases.map((useCase, index) => (
             <motion.div 
               key={index}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: index * 0.1 }}
             >
               <TiltCard color={color} className="h-full rounded-[2rem]">
                 <div className="p-8 h-full flex flex-col justify-between group cursor-default">
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500">
                        <Lightbulb size={18} style={{ color }} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <span className="text-[9px] font-black text-white/10 group-hover:text-white/30 transition-colors">CASE_0{index + 1}</span>
                    </div>
                    <p className="text-sm sm:text-base font-medium text-white/60 leading-relaxed group-hover:text-white/80 transition-colors">{useCase}</p>
                 </div>
               </TiltCard>
             </motion.div>
           ))}
        </div>
      </section>

      {/* 03 • Interaction Protocols (FAQ) */}
      <section>
        <div className="flex items-center gap-4 mb-8 sm:mb-10">
           <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-white/10" />
           <div className="flex items-center gap-3">
               <span className="text-[10px] font-black text-white/40 tracking-[0.4em]">03</span>
               <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-white/70">Intelligence Protocols</h2>
           </div>
           <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
           {data.faqs.map((faq, index) => (
             <TiltCard key={index} color={color} className="rounded-[2rem]">
               <div className="p-8 group">
                  <div className="flex items-center gap-3 mb-4">
                    <HelpCircle size={14} style={{ color }} className="opacity-40" />
                    <h4 className="text-[11px] font-black text-white/80 uppercase tracking-widest">{faq.q}</h4>
                  </div>
                  <p className="text-sm text-white/40 leading-relaxed font-medium italic group-hover:text-white/60 transition-colors">&quot;{faq.a}&quot;</p>
               </div>
             </TiltCard>
           ))}
        </div>
      </section>

      {/* 04 • Execution Example */}
      <section>
        <div className="flex items-center gap-4 mb-8 sm:mb-10">
           <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-white/10" />
           <div className="flex items-center gap-3">
               <span className="text-[10px] font-black text-white/40 tracking-[0.4em]">04</span>
               <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-white/70">Execution Example</h2>
           </div>
           <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        </div>
        
        <TiltCard color={color} className="rounded-[2.5rem]">
          <div className="relative p-8 sm:p-12 overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity">
                <Shield size={120} style={{ color }} />
             </div>
             
             <div className="relative">
                <div className="flex items-center gap-2 mb-8">
                   <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
                   <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
                   <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/40" />
                   <span className="ml-4 text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">Sovereign Terminal v2.0</span>
                </div>
                <pre className="text-sm sm:text-base font-mono text-white/70 whitespace-pre-wrap leading-relaxed selection:bg-white/10 transition-colors group-hover:text-white">
                  {data.example}
                </pre>
             </div>
          </div>
        </TiltCard>
      </section>
    </div>
  );
};
