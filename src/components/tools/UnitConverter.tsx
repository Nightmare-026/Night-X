"use client";

import React, { useState, useEffect } from "react";
import { Scale, Ruler, Thermometer, Database, ArrowRightLeft, FileText, Download, Check } from "lucide-react";
import { CustomDropdown } from "@/components/ui/CustomDropdown";
import { downloadBlob } from "@/lib/downloadUtils";
import { TiltCard } from "@/components/ui/TiltCard";
import { motion, AnimatePresence } from "framer-motion";

const units = {
  length: {
    meter: 1,
    kilometer: 0.001,
    centimeter: 100,
    millimeter: 1000,
    mile: 0.000621371,
    yard: 1.09361,
    foot: 3.28084,
    inch: 39.3701,
  },
  weight: {
    kilogram: 1,
    gram: 1000,
    milligram: 1000000,
    pound: 2.20462,
    ounce: 35.274,
  },
  data: {
    byte: 1,
    kilobyte: 1/1024,
    megabyte: 1/(1024**2),
    gigabyte: 1/(1024**3),
    terabyte: 1/(1024**4),
  }
};

type Category = "length" | "weight" | "data" | "temp";

export const UnitConverter = () => {
  const [category, setCategory] = useState<Category>("length");
  const [input, setInput] = useState("1");
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");
  const [output, setOutput] = useState("");
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    const list = category === "temp" ? ["Celsius", "Fahrenheit", "Kelvin"] : Object.keys(units[category as keyof typeof units]);
    setFromUnit(list[0]);
    setToUnit(list[1]);
    setShowReport(false);
    // Note: The conversion will follow on user input or state change through the second effect
  }, [category]);

  const resultValue = React.useMemo(() => {
    const val = parseFloat(input);
    if (isNaN(val)) return "...";

    if (category === "temp") {
        let celsius = val;
        if (fromUnit === "Fahrenheit") celsius = (val - 32) * 5/9;
        if (fromUnit === "Kelvin") celsius = val - 273.15;

        let result = celsius;
        if (toUnit === "Fahrenheit") result = (celsius * 9/5) + 32;
        if (toUnit === "Kelvin") result = celsius + 273.15;
        
        return result.toFixed(4).replace(/\.?0+$/, "");
    }

    const catUnits = units[category as keyof typeof units] as Record<string, number>;
    if (!catUnits || !catUnits[fromUnit] || !catUnits[toUnit]) return "...";
    
    const baseVal = val / catUnits[fromUnit];
    const result = baseVal * catUnits[toUnit];
    return result.toFixed(6).replace(/\.?0+$/, "");
  }, [category, input, fromUnit, toUnit]);

  useEffect(() => {
    setOutput(resultValue);
  }, [resultValue]);

  const handleDownloadReport = () => {
    const reportText = `NIGHT X UNIT CONVERSION REPORT\n` +
                       `----------------------------------\n` +
                       `Category: ${category.toUpperCase()}\n` +
                       `Operation: ${input} ${fromUnit} -> ${output} ${toUnit}\n` +
                       `Timestamp: ${new Date().toLocaleString()}\n` +
                       `----------------------------------\n` +
                       `Secure Client-Side Synthesis Complete.`;
    
    const blob = new Blob([reportText], { type: "text/plain" });
    downloadBlob(blob, `Night-X-Unit-Report-${new Date().getTime()}.txt`);
  };

  const categories = [
    { id: "length", icon: <Ruler size={16} />, label: "Length" },
    { id: "weight", icon: <Scale size={16} />, label: "Weight" },
    { id: "data", icon: <Database size={16} />, label: "Data" },
    { id: "temp", icon: <Thermometer size={16} />, label: "Temp" },
  ];

  const unitList = category === "temp" ? ["Celsius", "Fahrenheit", "Kelvin"] : Object.keys(units[category as keyof typeof units]);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8 pb-12">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <TiltCard
            key={cat.id}
            color={category === cat.id ? "rgba(147, 51, 234, 0.4)" : "rgba(255, 255, 255, 0.05)"}
            onClick={() => setCategory(cat.id as Category)}
            className="cursor-pointer"
          >
            <div className={`p-6 flex flex-col items-center justify-center gap-3 h-full transition-all ${category === cat.id ? "text-white" : "text-white/20"}`}>
                <div className={category === cat.id ? "animate-pulse" : ""}>
                    {cat.icon}
                </div>
                <span className="text-[11px] font-black uppercase tracking-[0.4em] text-center">{cat.label}</span>
            </div>
          </TiltCard>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
        <div className="space-y-4">
             <div className="relative group">
                <input
                    type="number"
                    value={input}
                    onChange={(e) => { setInput(e.target.value); setShowReport(false); }}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-3xl p-6 text-2xl font-black text-white focus:outline-none focus:border-night-indigo transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="0"
                />
             </div>
             <CustomDropdown 
                options={unitList} 
                value={fromUnit} 
                onChange={(v) => { setFromUnit(v); setShowReport(false); }} 
                label="Source Unit"
             />
        </div>

        <div className="flex justify-center md:pt-12">
             <button 
                onClick={() => { const tmp = fromUnit; setFromUnit(toUnit); setToUnit(tmp); setShowReport(false); }}
                className="p-4 rounded-full night-btn-gradient text-white hover:brightness-110 transition-all shadow-xl shadow-night-indigo/20 relative overflow-hidden group"
             >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <ArrowRightLeft size={18} className="relative z-10" />
             </button>
        </div>

        <div className="space-y-4">
            <motion.div 
                key={output}
                initial={{ opacity: 0.8, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-full bg-night-indigo/5 border border-night-indigo/10 rounded-[1.5rem] p-6 h-[80px] flex items-center shadow-inner"
            >
                 <p className="text-2xl font-black text-night-indigo truncate">{output}</p>
            </motion.div>
            <CustomDropdown 
                options={unitList} 
                value={toUnit} 
                onChange={(v) => { setToUnit(v); setShowReport(false); }} 
                label="Target Unit"
             />
        </div>
      </div>

      <div className="pt-4">
        {!showReport ? (
            <button
                onClick={() => setShowReport(true)}
                className="w-full py-6 rounded-[2rem] night-btn-gradient text-white font-black tracking-[0.4em] text-[11px] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-4 uppercase shadow-2xl relative overflow-hidden group border border-white/20"
            >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Scale size={20} className="relative z-10" />
                <span className="relative z-10">INITIALIZE CONVERSION engine</span>
            </button>
        ) : (
            <AnimatePresence>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    <div className="p-6 rounded-3xl bg-night-indigo/5 border border-night-indigo/20 flex items-center justify-between border-dashed">
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-night-indigo opacity-60 flex items-center gap-2">
                                <Check size={12} />
                                Calculation Finalized
                            </span>
                            <p className="text-lg font-bold text-white">Precision Match Confirmed</p>
                        </div>
                        <FileText className="text-night-indigo/40" size={32} />
                    </div>
                    <button
                        onClick={handleDownloadReport}
                        className="w-full py-6 rounded-[2rem] night-btn-gradient text-white font-black tracking-[0.4em] text-[11px] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-4 uppercase shadow-2xl relative overflow-hidden group border border-white/20"
                    >
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Download size={20} className="relative z-10" />
                        <span className="relative z-10">DOWNLOAD CALCULATION REPORT (.txt)</span>
                    </button>
                    <button 
                        onClick={() => setShowReport(false)}
                        className="w-full text-center text-[10px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-white transition-colors"
                    >
                        Reset Engine
                    </button>
                </motion.div>
            </AnimatePresence>
        )}
      </div>
    </div>
  );
};

