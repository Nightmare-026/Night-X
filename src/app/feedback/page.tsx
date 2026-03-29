"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@/hooks/useAuth";
import { Background3D } from "@/components/visuals/Background3D";
import { TiltCard } from "@/components/ui/TiltCard";
import { Send, Star, CheckCircle, ArrowLeft, Activity } from "lucide-react";
import Link from "next/link";

export default function FeedbackPage() {
  const { user } = useAuth();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [rating, setRating] = React.useState(0);
  const [hoveredRating, setHoveredRating] = React.useState(0);
  const [message, setMessage] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [error, setError] = React.useState("");


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Operator Name Required");
      return;
    }
    if (!email.trim()) {
      setError("Communication Link Required");
      return;
    }
    if (rating === 0) {
      setError("Experience Delta Rating Required");
      return;
    }
    if (!message.trim()) {
      setError("Transmission Data Required");
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "feedbacks"), {
        uid: user?.uid || "anonymous",
        name: name.trim(),
        email: email.trim(),
        rating,
        message: message.trim(),
        timestamp: serverTimestamp(),
        platform: "web-v1",
      });
      setIsSuccess(true);
    } catch (error) {
      console.error("Transmission failed:", error);
      setError("System Overload: Transmission Failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-night-black text-white selection:bg-night-indigo selection:text-white relative overflow-hidden flex items-center justify-center p-6">
      <Background3D />
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-4xl bg-night-indigo/10 blur-[150px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-2xl relative z-10"
      >
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/30 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Abort to Command
        </Link>

        {/* Colorful Gradient Border Wrapper */}
        <div className="glow-border-gradient shadow-[0_0_50px_rgba(168,85,247,0.15)]">
          <TiltCard color="#ffffff" className="p-8 sm:p-12 relative overflow-hidden bg-night-black/95">
            {/* Form Header */}
            <div className="mb-12">
              <h1 className="text-4xl font-black tracking-tighter mb-4 text-white uppercase italic">
                SHARE FEEDBACK
              </h1>
              <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">
                Protocol Status: <span className="text-night-emerald">Active Deployment</span>
              </p>
            </div>

            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form 
                  key="feedback-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  {/* Identity Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-2">Operator Name</label>
                      <input
                        required
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        className="night-input-v2"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-2">Communication Link</label>
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="night-input-v2"
                      />
                    </div>
                  </div>

                  {/* Rating System */}
                  <div className="space-y-4 pt-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-2">Experience Delta</label>
                    <div className="flex gap-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                          className="transition-all duration-300 transform hover:scale-125 focus:outline-none"
                        >
                          <Star 
                            size={28} 
                            className={`
                              transition-all duration-300
                              ${(hoveredRating || rating) >= star 
                                ? "fill-night-indigo text-night-indigo drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]" 
                                : "text-white/10 fill-transparent"}
                            `}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message Box */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-2">Transmission Data</label>
                    <textarea
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Input encrypted insights..."
                      className="night-input-v2 h-32 resize-none pt-4"
                    />
                  </div>

                  {/* Error Message */}
                  <AnimatePresence>
                    {error && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-red-500 text-[10px] font-black uppercase tracking-[0.3em] text-center"
                      >
                        {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit Action */}
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="feedback-send-btn w-full py-5 disabled:opacity-50 disabled:cursor-not-allowed group transition-all"
                  >
                    <div className="flex items-center justify-center gap-3 relative z-10 font-black tracking-[0.4em] text-sm">
                      {isSubmitting ? (
                        <>
                          <Activity size={18} className="animate-spin" />
                          <span>SYNCHING...</span>
                        </>
                      ) : (
                        <>
                          <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          <span>SEND SIGNAL</span>
                        </>
                      )}
                    </div>
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success-message"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="flex justify-center mb-10">
                    <div className="w-20 h-20 rounded-3xl bg-night-emerald/10 border border-night-emerald/30 flex items-center justify-center text-night-emerald shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                      <CheckCircle size={40} className="animate-pulse" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-black tracking-tight mb-4 text-white uppercase italic">Signal Received</h2>
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.5em] mb-12">
                    Transmission Archival Complete
                  </p>
                  <Link href="/">
                    <button className="px-10 py-4 rounded-xl bg-white/[0.05] border border-white/10 hover:bg-white/10 transition-all font-black text-[10px] uppercase tracking-[0.4em] text-white/60 hover:text-white">
                      Back to Hub
                    </button>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </TiltCard>
        </div>
      </motion.div>
    </main>
  );
}
