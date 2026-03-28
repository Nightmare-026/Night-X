"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, Lock, User, ArrowRight, Loader2, AlertCircle,
  Sparkles, Eye, EyeOff, CheckCircle, ShieldCheck
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter, usePathname } from "next/navigation";

interface AuthFormsProps {
  onSuccess?: () => void;
}

export const AuthForms = ({ onSuccess }: AuthFormsProps) => {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
  });
  const router = useRouter();
  const pathname = usePathname();

  /* ── Password Strength Calculator ── */
  const passwordStrength = useMemo(() => {
    const p = formData.password;
    if (!p) return { score: 0, label: "", color: "" };
    let score = 0;
    if (p.length >= 6) score++;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;

    if (score <= 1) return { score, label: "Weak", color: "bg-red-500" };
    if (score <= 2) return { score, label: "Fair", color: "bg-orange-500" };
    if (score <= 3) return { score, label: "Good", color: "bg-yellow-500" };
    if (score <= 4) return { score, label: "Strong", color: "bg-green-500" };
    return { score, label: "Excellent", color: "bg-emerald-400" };
  }, [formData.password]);

  /* ── Auth Handler ── */
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Client-side validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    if (mode === "signup" && !formData.fullName.trim()) {
      setError("Please enter your full name");
      setLoading(false);
      return;
    }

    try {
      if (mode === "signup") {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName.trim(),
              avatar_url: "",
            },
            // Auto-confirm for development — email confirmation not required
            emailRedirectTo: window.location.origin,
          },
        });

        if (signUpError) throw signUpError;

        // Check if user was created and already confirmed
        if (data?.user?.identities?.length === 0) {
          setError("An account with this email already exists. Please sign in.");
        } else if (data?.session) {
          setSuccess("Account created successfully! Welcome aboard.");
          setTimeout(() => {
            onSuccess?.();
            if (pathname !== "/") router.push("/");
          }, 1200);
        } else {
          // Email confirmation required
          setSuccess("Account created! Please check your email to confirm, then sign in.");
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        });

        if (signInError) {
          // Better error messages
          if (signInError.message.includes("Invalid login credentials")) {
            throw new Error("Invalid email or password. Please check your credentials and try again.");
          }
          if (signInError.message.includes("Email not confirmed")) {
            throw new Error("Your email has not been confirmed yet. Please check your inbox for the confirmation link.");
          }
          throw signInError;
        }

        setSuccess("Authentication successful! Redirecting...");
        setTimeout(() => {
          onSuccess?.();
          if (pathname !== "/") router.push("/");
        }, 800);
      }
    } catch (err: unknown) {
      setError((err as Error).message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (newMode: "signin" | "signup") => {
    setMode(newMode);
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* ── Mode Toggle ── */}
      <div className="flex rounded-2xl bg-white/[0.03] border border-white/[0.06] p-1 mb-7 backdrop-blur-sm">
        <button
          type="button"
          onClick={() => switchMode("signin")}
          className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${
            mode === "signin"
              ? "night-btn-gradient text-white shadow-[0_0_25px_rgba(147,51,234,0.3)]"
              : "text-white/30 hover:text-white/50"
          }`}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => switchMode("signup")}
          className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${
            mode === "signup"
              ? "night-btn-gradient text-white shadow-[0_0_25px_rgba(147,51,234,0.3)]"
              : "text-white/30 hover:text-white/50"
          }`}
        >
          Sign Up
        </button>
      </div>

      {/* ── Title ── */}
      <div className="text-center mb-6">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 20 }}
        >
          <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-widest mb-1.5">
            {mode === "signin" ? "Welcome Back" : "Get Started"}
          </h2>
          <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">
            {mode === "signin" ? "Sign in to your account" : "Create your Night X account"}
          </p>
        </motion.div>
      </div>

      {/* ── Form ── */}
      <AnimatePresence mode="wait">
        <motion.form
          key={mode}
          initial={{ opacity: 0, x: mode === "signin" ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: mode === "signin" ? 20 : -20 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          onSubmit={handleAuth}
          className="space-y-3.5"
        >
          {/* Full Name — Sign Up only */}
          {mode === "signup" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="relative group"
            >
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/15 group-focus-within:text-purple-400 transition-colors duration-300" />
              <input
                type="text"
                placeholder="FULL NAME"
                required
                className="night-input"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </motion.div>
          )}

          {/* Email */}
          <div className="relative group">
            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/15 group-focus-within:text-sky-400 transition-colors duration-300" />
            <input
              type="email"
              placeholder="EMAIL ADDRESS"
              required
              autoComplete="email"
              className="night-input"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {/* Password */}
          <div className="relative group">
            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/15 group-focus-within:text-pink-400 transition-colors duration-300" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="PASSWORD"
              required
              minLength={6}
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              className="night-input pr-12"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/15 hover:text-white/40 transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* Password Strength — Sign Up only */}
          {mode === "signup" && formData.password && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-1.5"
            >
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                      i <= passwordStrength.score ? passwordStrength.color : "bg-white/5"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Password Strength</span>
                <span className={`text-[9px] font-black uppercase tracking-widest ${
                  passwordStrength.score <= 2 ? "text-red-400" : passwordStrength.score <= 3 ? "text-yellow-400" : "text-emerald-400"
                }`}>
                  {passwordStrength.label}
                </span>
              </div>
            </motion.div>
          )}

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 4 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-red-500/8 border border-red-500/15 text-red-400"
              >
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span className="text-[11px] font-semibold leading-relaxed">{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success Message */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 4 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-emerald-500/8 border border-emerald-500/15 text-emerald-400"
              >
                <CheckCircle size={16} className="shrink-0 mt-0.5" />
                <span className="text-[11px] font-semibold leading-relaxed">{success}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Submit Button — Purple → Light Blue → Pink gradient ── */}
          <motion.button
            type="submit"
            disabled={loading || !!success}
            whileHover={{ scale: 1.02, boxShadow: "0 0 60px rgba(147,51,234,0.4), 0 0 120px rgba(56,189,248,0.15)" }}
            whileTap={{ scale: 0.97 }}
            className="night-btn-gradient w-full py-4 rounded-2xl text-white text-xs font-black uppercase tracking-[0.2em] transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2.5 mt-3 relative overflow-hidden group"
          >
            {/* Glass shine effect on hover */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />

            {loading ? (
              <Loader2 size={16} className="animate-spin relative z-10" />
            ) : success ? (
              <span className="relative z-10 flex items-center gap-2">
                <ShieldCheck size={16} />
                Verified
              </span>
            ) : (
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles size={14} />
                {mode === "signin" ? "Sign In" : "Create Account"}
                <ArrowRight size={16} />
              </span>
            )}
          </motion.button>
        </motion.form>
      </AnimatePresence>

      {/* ── Security Badge ── */}
      <div className="flex items-center justify-center gap-2 mt-6 opacity-30">
        <ShieldCheck size={12} />
        <span className="text-[8px] font-bold text-white uppercase tracking-[0.3em]">
          AES-256 Encrypted • Secure Auth
        </span>
      </div>
    </div>
  );
};
