"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Background3D } from "@/components/visuals/Background3D";
import { ToolCard } from "@/components/ui/ToolCard";
import { Footer } from "@/components/layout/Footer";
import { tools } from "@/constants/tools";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return tools;
    return tools.filter(tool => 
      tool.title.toLowerCase().includes(query) || 
      tool.category.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <main className="relative min-h-screen matte-grain">
      <Background3D />
      <Navbar onSearchChange={setSearchQuery} />
      
      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-8 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
               <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-night-emerald opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-night-emerald"></span>
              </span>
              <span className="text-[10px] font-black tracking-[0.25em] text-white uppercase">Sovereign Matte v2 Active</span>
            </div>
            
            <div className="relative inline-block mb-12 group">
              {/* Background Depth Glow */}
              <motion.div 
                animate={{ 
                  opacity: [0.15, 0.3, 0.15],
                  scale: [1, 1.15, 1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-x-[-100px] inset-y-[-50px] blur-[140px] bg-gradient-to-r from-night-indigo via-white/5 to-night-emerald -z-10" 
              />
              
              <h1 className="text-[clamp(40px,12vw,236px)] font-black tracking-[-0.08em] leading-[0.8] select-none relative">
                {/* Layer 1: Sharp High-Depth Shadow */}
                <span className="absolute inset-0 text-night-black translate-y-6 blur-[15px] opacity-80 group-hover:translate-x-3 transition-transform duration-700">NIGHT X</span>
                
                {/* Layer 2: Core Text (With Dynamic Colorful Effect) */}
                <span className="relative z-10 block text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
                  <span className="bg-gradient-to-r from-[#a855f7] via-[#0ea5e9] to-[#f43f5e] bg-[size:200%] bg-clip-text text-transparent animate-gradient-slow font-black">NIGHT</span>
                  <span className="ml-2 sm:ml-4 bg-gradient-to-br from-[#a855f7] via-[#0ea5e9] to-[#f43f5e] bg-clip-text text-transparent opacity-100 font-black">X</span>
                </span>

                {/* Layer 3: Optimized Light Sweep (No Blur) */}
                <motion.span 
                  initial={{ x: "-150%", opacity: 0 }}
                  animate={{ x: "150%", opacity: [0, 0.4, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                  className="absolute inset-0 z-20 block bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-30deg] pointer-events-none"
                />
              </h1>

              {/* Sovereign Floating Accent */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-20 px-3 py-1.5 bg-night-emerald shadow-[0_10px_30px_rgba(16,185,129,0.5)] rounded-full text-[10px] font-black tracking-[0.4em] text-night-black uppercase transform rotate-12 hidden md:block border-2 border-white/20"
              >
                Elite
              </motion.div>
            </div>
            
            <p className="max-w-3xl mx-auto text-white/80 text-sm sm:text-base md:text-xl font-medium leading-[1.6] mb-8 sm:mb-12 drop-shadow-md px-2 italic tracking-wide">
              Your sovereign command center. A lightning-fast, zero-data-footprint utility suite featuring image manipulation, typography tools, and developers&apos; utilities computed locally.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tools Grid Section */}
      <section className="pb-16 sm:pb-24 md:pb-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-12">
            <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <h2 className="text-[11px] sm:text-[12px] font-black uppercase tracking-[0.5em] sm:tracking-[1em] text-white/70 whitespace-nowrap">
              {searchQuery ? `Search Results (${filteredTools.length})` : "Executive Suite"}
            </h2>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>

          {filteredTools.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredTools.map((tool) => (
                  <motion.div 
                    key={tool.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="h-56 sm:h-64"
                  >
                    <ToolCard
                      id={tool.id}
                      title={tool.title}
                      description={tool.description}
                      icon={tool.icon}
                      color={tool.color}
                      category={tool.category}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <p className="text-white/20 font-black tracking-[0.3em] uppercase italic">No tools found for &quot;{searchQuery}&quot;</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
