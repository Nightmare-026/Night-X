"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, Lock, User, ArrowRight, Loader2, AlertCircle,
  Sparkles, Eye, EyeOff, CheckCircle, ShieldCheck,
} from "lucide-react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  AuthError,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, googleProvider } from "@/lib/firebase";

interface AuthFormsProps {
  onSuccess?: () => void;
}

// Map Firebase error codes to user-friendly messages
const getFirebaseErrorMessage = (code: string): string => {
  const errorMap: Record<string, string> = {
    "auth/email-already-in-use": "An account with this email already exists. Please sign in.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/weak-password": "Password must be at least 6 characters.",
    "auth/user-not-found": "No account found with this email. Please sign up first.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/invalid-credential": "Invalid email or password. Please check your credentials.",
    "auth/too-many-requests": "Too many failed attempts. Please wait and try again.",
    "auth/network-request-failed": "Network error. Please check your internet connection.",
    "auth/popup-closed-by-user": "Google sign-in was cancelled.",
    "auth/cancelled-popup-request": "Sign-in cancelled.",
    "auth/popup-blocked": "Popup was blocked by the browser. Please allow popups for this site.",
  };
  return errorMap[code] || "An unexpected error occurred. Please try again.";
};

// Persist user data to Firestore (safe to call on every login — uses setDoc with merge)
const persistUserToFirestore = async (
  uid: string,
  displayName: string | null,
  email: string | null,
  isNewUser = false
) => {
  const userRef = doc(db, "users", uid);
  const snap = await getDoc(userRef);

  if (!snap.exists() || isNewUser) {
    await setDoc(
      userRef,
      {
        uid,
        displayName: displayName || email?.split("@")[0] || "Night X Agent",
        email,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        provider: isNewUser ? "email" : snap.data()?.provider || "email",
      },
      { merge: true }
    );
  }
};

export const AuthForms = ({ onSuccess }: AuthFormsProps) => {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
  });

  /* ── Password Strength ── */
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

  /* ── Email/Password Auth Handler ── */
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    if (mode === "signup" && !formData.fullName.trim()) {
      setError("Please enter your full name.");
      setLoading(false);
      return;
    }

    try {
      if (mode === "signup") {
        const credential = await createUserWithEmailAndPassword(
          auth,
          formData.email.trim().toLowerCase(),
          formData.password
        );

        // Set display name on the Firebase Auth profile
        await updateProfile(credential.user, {
          displayName: formData.fullName.trim(),
        });

        // Persist to Firestore
        await persistUserToFirestore(
          credential.user.uid,
          formData.fullName.trim(),
          credential.user.email,
          true
        );

        setSuccess("Account created successfully! Welcome to Night X.");
        setTimeout(() => { onSuccess?.(); }, 1200);
      } else {
        await signInWithEmailAndPassword(
          auth,
          formData.email.trim().toLowerCase(),
          formData.password
        );
        setSuccess("Authentication successful! Redirecting...");
        setTimeout(() => { onSuccess?.(); }, 800);
      }
    } catch (err: unknown) {
      const authError = err as AuthError;
      setError(getFirebaseErrorMessage(authError.code));
    } finally {
      setLoading(false);
    }
  };

  /* ── Google Sign-In Handler ── */
  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { user } = result;
      const isNewUser = (user.metadata.creationTime === user.metadata.lastSignInTime);

      // Always persist/merge user data on Google login
      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          provider: "google",
          updatedAt: serverTimestamp(),
          ...(isNewUser && { createdAt: serverTimestamp() }),
        },
        { merge: true }
      );

      setSuccess("Google authentication successful! Welcome aboard.");
      setTimeout(() => { onSuccess?.(); }, 800);
    } catch (err: unknown) {
      const authError = err as AuthError;
      setError(getFirebaseErrorMessage(authError.code));
    } finally {
      setGoogleLoading(false);
    }
  };

  const switchMode = (newMode: "signin" | "signup") => {
    setMode(newMode);
    setError(null);
    setSuccess(null);
  };

  const isProcessing = loading || googleLoading;

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* ── Mode Toggle ── */}
      <div className="flex rounded-[1.25rem] bg-white/[0.03] border border-white/[0.06] p-1 mb-7 backdrop-blur-sm">
        <button
          type="button"
          onClick={() => switchMode("signin")}
          disabled={isProcessing}
          className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 disabled:opacity-50 ${
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
          disabled={isProcessing}
          className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 disabled:opacity-50 ${
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

      {/* ── Google Sign-In Button ── */}
      <motion.button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isProcessing}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="night-btn-gradient w-full flex items-center justify-center gap-3 py-3.5 rounded-[1.25rem] mb-4 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden group border border-white/20"
      >
        {googleLoading ? (
          <Loader2 size={18} className="animate-spin text-white/70" />
        ) : (
          <>
            {/* Google G Icon */}
            <div className="bg-white/90 p-1 rounded-lg flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34 6.2 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z" />
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 19 12 24 12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34 6.2 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
                <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.3 35.3 26.8 36 24 36c-5.2 0-9.7-3.3-11.3-8H5.9C9.3 36.9 16.1 44 24 44z" />
                <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C41 35.6 44 30.2 44 24c0-1.3-.1-2.6-.4-3.9z" />
              </svg>
            </div>
            <span className="text-[11px] font-black text-white uppercase tracking-[0.15em]">
              Continue with Google
            </span>
          </>
        )}
      </motion.button>

      {/* ── Divider ── */}
      <div className="flex items-center gap-3 mb-4">
        <div className="h-px flex-1 bg-white/[0.06]" />
        <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">or</span>
        <div className="h-px flex-1 bg-white/[0.06]" />
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

          {/* ── Submit Button ── */}
          <motion.button
            type="submit"
            disabled={isProcessing || !!success}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="night-btn-gradient w-full py-4 rounded-[1.25rem] text-white text-xs font-black uppercase tracking-[0.2em] transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2.5 mt-3 relative overflow-hidden group"
          >
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
          Firebase Auth • AES-256 Encrypted
        </span>
      </div>
    </div>
  );
};
