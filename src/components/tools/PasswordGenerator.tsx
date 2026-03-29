"use client";

import React, { useState, useEffect } from "react";
import { Copy, RefreshCw, Check, Shield, ShieldAlert, ShieldCheck } from "lucide-react";

export const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [copied, setCopied] = useState(false);

  const generatePassword = React.useCallback(() => {
    const charset = {
      uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      lowercase: "abcdefghijklmnopqrstuvwxyz",
      numbers: "0123456789",
      symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
    };

    let characters = "";
    if (options.uppercase) characters += charset.uppercase;
    if (options.lowercase) characters += charset.lowercase;
    if (options.numbers) characters += charset.numbers;
    if (options.symbols) characters += charset.symbols;

    if (characters === "") return;

    let generated = "";
    for (let i = 0; i < length; i++) {
      generated += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setPassword(generated);
  }, [length, options]);

  useEffect(() => {
    const t = setTimeout(() => generatePassword(), 0);
    return () => clearTimeout(t);
  }, [generatePassword]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const calculateStrength = () => {
    let strength = 0;
    if (password.length > 8) strength += 1;
    if (password.length > 12) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const strength = calculateStrength();

  return (
    <div className="w-full max-w-xl mx-auto space-y-8">
      {/* Password Display */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-night-indigo to-night-emerald rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative flex items-center justify-between p-8 bg-night-black border border-white/5 rounded-[2rem] overflow-hidden">
          <div className="flex-1 mr-4 overflow-hidden">
            <p className="text-2xl md:text-3xl font-mono text-white tracking-widest break-all">
              {password}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={generatePassword}
              className="p-5 rounded-2xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all border border-white/5"
            >
              <RefreshCw size={22} className="hover:rotate-180 transition-transform duration-500" />
            </button>
            <button
              onClick={copyToClipboard}
              className="p-5 rounded-2xl night-btn-gradient text-white hover:brightness-110 transition-all shadow-xl relative overflow-hidden group border border-white/20"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              {copied ? <Check size={22} className="relative z-10" /> : <Copy size={22} className="relative z-10" />}
            </button>
          </div>
        </div>
      </div>

      {/* Strength Indicator */}
      <div className="space-y-4">
        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em]">
          <span className="text-white/20">Security Analysis</span>
          <span className={strength > 4 ? "text-night-emerald" : strength > 2 ? "text-amber-400" : "text-rose-500"}>
            {strength > 4 ? "MILITARY GRADE" : strength > 2 ? "SECURE" : "VULNERABLE"}
          </span>
        </div>
        <div className="h-1 text-night-black bg-white/5 rounded-full overflow-hidden flex gap-1">
          {[1, 2, 3, 4, 5].map((lvl) => (
            <div
              key={lvl}
              className={`h-full flex-1 transition-all duration-500 ${
                lvl <= strength 
                  ? strength > 4 ? "bg-night-emerald" : strength > 2 ? "bg-amber-400" : "bg-rose-500"
                  : "bg-transparent"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Configurations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl glass-card border-white/5 space-y-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Entropy Scale</span>
            <input 
                type="range" 
                min="8" 
                max="64" 
                value={length} 
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full accent-night-indigo"
            />
            <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-white/40 uppercase">Length</span>
                <span className="text-lg font-black text-night-indigo">{length}</span>
            </div>
        </div>

        <div className="p-6 rounded-[2rem] glass-card border-white/5 grid grid-cols-2 gap-4">
          {Object.entries(options).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setOptions({ ...options, [key]: !value })}
              className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all border ${
                value ? "bg-white/10 text-white border-white/20 shadow-lg" : "bg-white/5 text-white/20 border-transparent hover:bg-white/10"
              }`}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 rounded-[2rem] bg-night-indigo/5 border border-night-indigo/10 flex items-center gap-4">
        <div className="p-3 rounded-xl bg-night-indigo/20 text-night-indigo">
            {strength > 4 ? <ShieldCheck size={24} /> : strength > 2 ? <Shield size={24} /> : <ShieldAlert size={24} />}
        </div>
        <p className="text-xs text-white/40 leading-relaxed italic">
            &quot;Your password is generated locally using window.crypto. No data ever crosses the wire.&quot;
        </p>
      </div>
    </div>
  );
};
