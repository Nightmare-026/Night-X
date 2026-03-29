"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Delete, Trash2, Equal } from "lucide-react";

export const ScientificCalculator = () => {
  const [display, setDisplay] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const buttons = [
    { label: "sin", type: "func", action: () => addToDisplay("sin(") },
    { label: "cos", type: "func", action: () => addToDisplay("cos(") },
    { label: "tan", type: "func", action: () => addToDisplay("tan(") },
    { label: "log", type: "func", action: () => addToDisplay("log(") },
    { label: "ln", type: "func", action: () => addToDisplay("ln(") },
    { label: "√", type: "func", action: () => addToDisplay("sqrt(") },
    { label: "π", type: "const", action: () => addToDisplay("PI") },
    { label: "e", type: "const", action: () => addToDisplay("E") },
    { label: "^", type: "op", action: () => addToDisplay("**") },
    { label: "(", type: "op", action: () => addToDisplay("(") },
    { label: ")", type: "op", action: () => addToDisplay(")") },
    { label: "/", type: "op", action: () => addToDisplay("/") },
    { label: "7", type: "num", action: () => addToDisplay("7") },
    { label: "8", type: "num", action: () => addToDisplay("8") },
    { label: "9", type: "num", action: () => addToDisplay("9") },
    { label: "*", type: "op", action: () => addToDisplay("*") },
    { label: "4", type: "num", action: () => addToDisplay("4") },
    { label: "5", type: "num", action: () => addToDisplay("5") },
    { label: "6", type: "num", action: () => addToDisplay("6") },
    { label: "-", type: "op", action: () => addToDisplay("-") },
    { label: "1", type: "num", action: () => addToDisplay("1") },
    { label: "2", type: "num", action: () => addToDisplay("2") },
    { label: "3", type: "num", action: () => addToDisplay("3") },
    { label: "+", type: "op", action: () => addToDisplay("+") },
    { label: "C", type: "clear", action: () => { setDisplay(""); setResult(null); } },
    { label: "0", type: "num", action: () => addToDisplay("0") },
    { label: ".", type: "num", action: () => addToDisplay(".") },
  ];

  const addToDisplay = (val: string) => {
    setDisplay(prev => prev + val);
    setResult(null);
  };

  const handleBackspace = () => {
    setDisplay(prev => prev.slice(0, -1));
  };

  const calculate = () => {
    try {
      // Create a safer evaluation environment
      const prepStr = display
        .replace(/sin/g, "Math.sin")
        .replace(/cos/g, "Math.cos")
        .replace(/tan/g, "Math.tan")
        .replace(/log/g, "Math.log10")
        .replace(/ln/g, "Math.log")
        .replace(/sqrt/g, "Math.sqrt")
        .replace(/PI/g, "Math.PI")
        .replace(/E/g, "Math.E");
      
      const evalResult = eval(prepStr);
      setResult(evalResult.toString());
    } catch (err) {
      setResult("Error");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Display Card */}
      <div className="glass-card p-8 rounded-[2.5rem] bg-white/5 border-white/5 shadow-2xl overflow-hidden relative group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-night-indigo/10 blur-[60px] pointer-events-none" />
        <div className="text-right space-y-2 relative z-10">
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-4 flex items-center justify-end gap-2">
            <Calculator size={10} /> Calculation Buffer
          </div>
          <div className="h-8 text-white/40 text-sm font-medium tracking-tight overflow-x-auto custom-scrollbar no-scrollbar">
            {display || "0"}
          </div>
          <div className={`text-4xl sm:text-5xl font-black tracking-tighter transition-all duration-300 ${result === "Error" ? "text-rose-500" : "text-white"}`}>
            {result !== null ? result : display.split(/[+\-*/]/).pop() || "0"}
          </div>
        </div>
      </div>

      {/* Button Grid */}
      <div className="grid grid-cols-4 gap-3 bg-white/5 p-4 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-2xl">
        {buttons.map((btn, idx) => (
          <button
            key={idx}
            onClick={btn.action}
            className={`h-14 rounded-2xl flex items-center justify-center font-bold text-sm transition-all active:scale-95 ${
              btn.type === "op" ? "bg-night-indigo/20 text-night-indigo hover:bg-night-indigo/30" :
              btn.type === "func" ? "bg-white/5 text-white/60 hover:text-white hover:bg-white/10" :
              btn.type === "const" ? "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20" :
              btn.type === "clear" ? "bg-rose-500/10 text-rose-500 hover:bg-rose-500/20" :
              "bg-white/5 text-white/80 hover:bg-white/10"
            }`}
          >
            {btn.label}
          </button>
        ))}
        <button 
          onClick={handleBackspace}
          className="h-14 rounded-2xl bg-white/5 text-white/40 flex items-center justify-center hover:bg-white/10 transition-all active:scale-95"
        >
          <Delete size={18} />
        </button>
        <button 
          onClick={calculate}
          className="h-14 rounded-2xl col-span-2 night-btn-gradient text-white flex items-center justify-center gap-2 font-black uppercase tracking-widest text-[10px] shadow-lg shadow-night-indigo/20 active:scale-95"
        >
          <Equal size={16} /> Compute
        </button>
      </div>

      {/* Info Card */}
      <div className="p-6 rounded-[2rem] bg-night-indigo/5 border border-white/5 flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Floating Point Precision</span>
          <div className="flex items-center gap-2 px-3 py-1 bg-night-indigo/10 border border-night-indigo/20 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-night-indigo animate-pulse" />
              <span className="text-[8px] font-bold text-night-indigo uppercase tracking-widest">Active Engine</span>
          </div>
      </div>
    </div>
  );
};
