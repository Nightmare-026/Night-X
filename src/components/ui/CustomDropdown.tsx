"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface CustomDropdownProps {
  options: string[] | Option[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}

export const CustomDropdown = ({ options, value, onChange, label, className }: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const formattedOptions = options.map((opt) => 
    typeof opt === "string" ? { label: opt, value: opt } : opt
  );

  const selectedOption = formattedOptions.find((opt) => opt.value === value) || formattedOptions[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {label && <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2 ml-1">{label}</p>}
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-white/80 hover:bg-white/5 transition-all outline-none focus:border-night-indigo/50"
      >
        <span>{selectedOption?.label}</span>
        <ChevronDown 
          size={14} 
          className={`text-white/20 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 5, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="absolute z-[100] w-full mt-1 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl overflow-hidden glass-card backdrop-blur-2xl"
          >
            <div className="max-h-60 overflow-y-auto no-scrollbar py-1">
              {formattedOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.15em] transition-colors ${
                    value === opt.value 
                      ? "bg-night-indigo/20 text-white" 
                      : "text-white/60 hover:bg-white/[0.05] hover:text-white"
                  }`}
                >
                  <span>{opt.label}</span>
                  {value === opt.value && <Check size={12} />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
