"use client";

import React, { useState } from "react";
import { Search, Grid, User, X } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { NightXLogo } from "@/components/ui/NightXLogo";
import { useAuth } from "@/hooks/useAuth";
import { useRouter, usePathname } from "next/navigation";

interface NavbarProps {
  onSearchChange?: (query: string) => void;
}

export const Navbar = ({ onSearchChange }: NavbarProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const navVariants: Variants = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200,
        delay: 0.2
      }
    }
  };

  return (
    <>
      <motion.nav 
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className={`fixed top-0 left-0 w-full z-50 px-4 sm:px-8 py-4 sm:py-6 flex items-center justify-between transition-all duration-500 ${
          isScrolled ? "bg-night-black/40 backdrop-blur-xl border-b border-white/[0.05] py-3 sm:py-4" : "bg-transparent"
        }`}
      >
        {/* Logo Area */}
        <div className="flex-shrink-0">
          <NightXLogo />
        </div>

        {/* Floating Center Actions - Hidden on very small screens, visible from sm up */}
        <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 items-center gap-2 p-1.5 rounded-2xl glass-card border-white/10 shadow-2xl transition-all duration-700 ease-out hover:border-white/20"
             style={{ width: isSearchOpen ? "380px" : "auto" }}>
          
          <AnimatePresence mode="wait">
            {!isSearchOpen ? (
              <motion.div 
                key="nav-buttons"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex items-center gap-1"
              >
                <NavButton icon={<Grid size={18} />} label="Ecosystem" active />
                <button 
                  onClick={handleSearchToggle}
                  className="flex items-center gap-3 px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white hover:bg-white/5 transition-all group"
                >
                  <Search size={18} className="group-hover:text-night-indigo transition-colors" />
                  <span className="hidden md:inline">Protocol Search</span>
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="search-input"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center w-full px-4 gap-4"
              >
                <Search size={18} className="text-night-indigo flex-shrink-0 animate-pulse" />
                <input 
                  autoFocus
                  type="text"
                  placeholder="Search tools and utilities..."
                  className="bg-transparent border-none outline-none text-white text-[11px] font-black uppercase tracking-widest w-full placeholder:text-white/10"
                  value={searchValue}
                  onChange={handleSearchChange}
                />
                <button 
                  onClick={handleSearchToggle}
                  className="p-1.5 hover:bg-white/10 rounded-lg text-white/20 hover:text-white transition-all"
                >
                  <X size={18} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-6 group">
          {/* Mobile buttons group */}
          <div className="flex sm:hidden items-center gap-2 mr-1">
             <button 
              className="w-10 h-10 rounded-xl glass-card border-white/10 flex items-center justify-center night-btn-gradient text-white shadow-lg"
              title="Ecosystem"
            >
              <Grid size={18} />
            </button>
            <button 
              onClick={handleSearchToggle}
              className="w-10 h-10 rounded-xl glass-card border-white/10 flex items-center justify-center hover:bg-white/10 transition-all active:scale-95"
            >
              {isSearchOpen ? <X size={20} className="text-white/60" /> : <Search size={20} className="text-white/60" />}
            </button>
          </div>

          {/* User identity text */}
          <div className="hidden lg:flex flex-col text-right cursor-default select-none group/identity">
            <span className="text-[11px] font-black uppercase text-white/40 tracking-[0.45em] group-hover/identity:text-white/80 transition-colors">
              {user ? (user.displayName || user.email?.split("@")[0]) : ""}
            </span>
            <span className={`text-[11px] ${user ? "text-night-emerald" : "text-white/20"} font-black flex items-center justify-end gap-2 uppercase tracking-[0.55em]`}>
              <span className={`w-2 h-2 rounded-full ${user ? "bg-night-emerald animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.7)]" : "bg-white/20"}`} />
              {user ? "Authorized" : "Sign In"}
            </span>
          </div>

          <button
            onClick={() => router.push("/profile")}
            className={`w-11 h-11 rounded-2xl glass-card border-white/10 flex items-center justify-center hover:bg-white/5 transition-all active:scale-95 group-hover:border-night-indigo/40 shadow-2xl relative overflow-hidden ${
              pathname === "/profile" ? "border-night-indigo/60 bg-white/5" : ""
            }`}
          >
            {user ? (
              <div className="w-full h-full flex items-center justify-center night-btn-gradient text-white font-black text-xs uppercase relative group/av">
                {(user.displayName?.[0] || user.email?.[0] || "?").toUpperCase()}
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/av:opacity-100 transition-opacity" />
              </div>
            ) : (
              <User size={22} className="text-white/60 group-hover:text-night-indigo transition-colors" />
            )}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-4 right-4 z-[60] sm:hidden"
          >
            <div className="glass-card rounded-2xl border-white/10 p-4 flex items-center gap-4 shadow-[0_30px_60px_rgba(0,0,0,0.5)] bg-night-black/90 backdrop-blur-2xl">
              <Search size={20} className="text-night-indigo flex-shrink-0 animate-pulse" />
              <input 
                autoFocus
                type="text"
                placeholder="Search tools..."
                className="bg-transparent border-none outline-none text-white text-xs font-black uppercase tracking-widest w-full placeholder:text-white/10"
                value={searchValue}
                onChange={handleSearchChange}
              />
              <button 
                onClick={handleSearchToggle}
                className="p-1.5 hover:bg-white/10 rounded-lg text-white/20 hover:text-white transition-all flex-shrink-0"
              >
                <X size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


    </>
  );
};

const NavButton = ({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) => (
  <motion.button
    className={`flex items-center gap-3 px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] transition-all ${
      active ? "night-btn-gradient border border-white/20 shadow-xl" : "text-white/40 hover:text-white hover:bg-white/5"
    }`}
    whileTap={{ scale: 0.95 }}
  >
    <div className={active ? "animate-pulse" : ""}>{icon}</div>
    <span className="hidden md:inline">{label}</span>
  </motion.button>
);
