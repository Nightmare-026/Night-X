"use client";

import React, { useState } from "react";
import { Search, Grid, User, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NightXLogo } from "@/components/ui/NightXLogo";
import { Dashboard } from "@/components/ui/Dashboard";
import { useAuth } from "@/hooks/useAuth";

interface NavbarProps {
  onSearchChange?: (query: string) => void;
}

export const Navbar = ({ onSearchChange }: NavbarProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { user } = useAuth();

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchValue("");
      onSearchChange?.("");
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchValue(val);
    onSearchChange?.(val);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between pointer-events-none">
        {/* Logo Area */}
        <div className="pointer-events-auto">
          <NightXLogo />
        </div>

        {/* Floating Center Actions — hidden on mobile, shown on sm+ */}
        <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 items-center gap-1 p-1.5 rounded-2xl glass-card pointer-events-auto border-white/5 shadow-2xl overflow-hidden transition-all duration-500 ease-out"
             style={{ width: isSearchOpen ? "320px" : "auto" }}>
          
          <AnimatePresence mode="wait">
            {!isSearchOpen ? (
              <motion.div 
                key="nav-buttons"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-1"
              >
                <NavButton icon={<Grid size={18} />} label="Tools" active />
                <button 
                  onClick={handleSearchToggle}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all"
                >
                  <Search size={18} />
                  <span>Search</span>
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="search-input"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center w-full px-3 gap-3"
              >
                <Search size={18} className="text-night-indigo flex-shrink-0" />
                <input 
                  autoFocus
                  type="text"
                  placeholder="Find tools or categories..."
                  className="bg-transparent border-none outline-none text-white text-sm w-full placeholder:text-white/20 font-medium"
                  value={searchValue}
                  onChange={handleSearchChange}
                />
                <button 
                  onClick={handleSearchToggle}
                  className="p-1 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-4 pointer-events-auto group">
          {/* Mobile search button */}
          <button 
            onClick={handleSearchToggle}
            className="sm:hidden w-10 h-10 rounded-xl glass-card flex items-center justify-center hover:bg-white/5 transition-all"
          >
            {isSearchOpen ? <X size={18} className="text-white/60" /> : <Search size={18} className="text-white/60" />}
          </button>

          {/* User identity text — hidden on mobile */}
          <div className="hidden md:flex flex-col text-right cursor-default select-none">
            <span className="text-[9px] font-black uppercase text-white/30 tracking-[0.2em]">
              {user ? (user.displayName || user.email?.split("@")[0]) : "Guest Identity"}
            </span>
            <span className={`text-[10px] ${user ? "text-night-emerald" : "text-white/20"} font-black flex items-center justify-end gap-1 uppercase tracking-widest`}>
              <span className={`w-1.5 h-1.5 rounded-full ${user ? "bg-night-emerald animate-pulse" : "bg-white/20"}`} />
              {user ? "Authorized" : "Unauthorized"}
            </span>
          </div>

          {/* Profile button */}
          <button
            onClick={() => setIsDashboardOpen(true)}
            className="w-10 h-10 rounded-xl glass-card flex items-center justify-center hover:bg-white/5 transition-all active:scale-95 group-hover:border-night-indigo/30 shadow-[0_0_20px_rgba(99,102,241,0.1)] relative overflow-hidden"
          >
            {user ? (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-night-indigo to-night-emerald text-white font-black text-sm uppercase">
                {(user.displayName?.[0] || user.email?.[0] || "?").toUpperCase()}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ) : (
              <User size={20} className="text-white/80 group-hover:text-night-indigo transition-colors" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Search Bar — slides down below the nav on small screens */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-4 right-4 z-50 sm:hidden"
          >
            <div className="glass-card rounded-2xl border-white/5 p-3 flex items-center gap-3 shadow-2xl">
              <Search size={18} className="text-night-indigo flex-shrink-0" />
              <input 
                autoFocus
                type="text"
                placeholder="Find tools or categories..."
                className="bg-transparent border-none outline-none text-white text-sm w-full placeholder:text-white/20 font-medium"
                value={searchValue}
                onChange={handleSearchChange}
              />
              <button 
                onClick={handleSearchToggle}
                className="p-1 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-colors flex-shrink-0"
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Dashboard isOpen={isDashboardOpen} onClose={() => setIsDashboardOpen(false)} />
    </>
  );
};

const NavButton = ({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) => (
  <motion.button
    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-black uppercase tracking-wider transition-all ${
      active ? "bg-night-indigo/20 text-night-indigo shadow-inner border border-night-indigo/30" : "text-white/40 hover:text-white hover:bg-white/5"
    }`}
    whileTap={{ scale: 0.95 }}
  >
    {icon}
    <span className="hidden sm:inline">{label}</span>
  </motion.button>
);
