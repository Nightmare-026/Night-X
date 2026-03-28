import React from "react";
import { Shield, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Background3D } from "@/components/visuals/Background3D";

export default function TermsPage() {
  return (
    <div className="min-h-screen font-sans text-white/80 selection:bg-night-indigo/30 selection:text-white relative overflow-hidden bg-night-black">
      <div className="fixed inset-0 z-0">
        <Background3D />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 sm:py-24">
        {/* Header */}
        <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white mb-12 transition-colors group">
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-black uppercase tracking-widest">Return to Hub</span>
        </Link>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl glass-card flex items-center justify-center border-night-indigo/30 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
            <Shield size={24} className="text-night-indigo" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tighter">Legal Framework</h1>
            <p className="text-xs sm:text-sm font-bold text-night-emerald uppercase tracking-[0.3em] mt-2">Terms & Conditions</p>
          </div>
        </div>

        {/* Content */}
        <div className="glass-card rounded-[2rem] p-8 sm:p-12 space-y-12 backdrop-blur-2xl border-white/5 relative overflow-hidden">
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-night-indigo/5 to-transparent blur-[100px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />

          <section className="relative z-10">
            <p className="text-sm leading-relaxed text-white/60 mb-8">
              Welcome to Night X. These Terms and Conditions outline the rules and regulations for the use of the Night X Utility Hub platform. 
              By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use Night X if you do not accept all of the terms and conditions stated on this page.
            </p>
          </section>

          <section className="relative z-10 space-y-4">
            <h2 className="text-xl font-black text-white tracking-wide flex items-center gap-3">
              <span className="text-night-indigo">01.</span> Zero Data Footprint & Privacy
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-white/50 pl-8 border-l border-white/5">
              <p>
                Night X operates on a strict &quot;Zero Data Footprint Architecture.&quot; This means that the majority of our tools compute entirely on your local device (client-side) using modern browser APIs.
              </p>
              <p>
                Files uploaded for conversion, compression, or modification are inherently processed in the temporary memory of your local machine. They are never transmitted, stored, or analyzed on Night X servers unless explicitly stated by a cloud-reliant tool.
              </p>
            </div>
          </section>

          <section className="relative z-10 space-y-4">
            <h2 className="text-xl font-black text-white tracking-wide flex items-center gap-3">
              <span className="text-night-indigo">02.</span> Account & Authentication
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-white/50 pl-8 border-l border-white/5">
              <p>
                To utilize specific secure features of the hub, an account may be required. By registering for a Night X ID, you agree to provide current, complete, and accurate information.
              </p>
              <p>
                You are entirely responsible for maintaining the confidentiality of your credentials. Any activities that occur beneath your Night X ID are your sole responsibility. Night X utilizes advanced cryptographic standards (e.g., Supabase, AES-256) to secure your credential strings.
              </p>
            </div>
          </section>

          <section className="relative z-10 space-y-4">
            <h2 className="text-xl font-black text-white tracking-wide flex items-center gap-3">
              <span className="text-night-indigo">03.</span> Tool Usage & Liability
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-white/50 pl-8 border-l border-white/5">
              <p>
                All utilities on Night X are provided &quot;as is,&quot; without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and non-infringement.
              </p>
              <p>
                Under no event shall the authors or copyright holders be liable for any claim, damages, or other liability, whether in an action of contract, tort, or otherwise, arising from, out of, or in connection with the software or the use or other dealings in the software.
              </p>
            </div>
          </section>

          <section className="relative z-10 space-y-4">
            <h2 className="text-xl font-black text-white tracking-wide flex items-center gap-3">
              <span className="text-night-indigo">04.</span> Open Source & Deployment
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-white/50 pl-8 border-l border-white/5">
              <p>
                Night X is designed as a modular, deployable architecture. If you clone, fork, or deploy this software using third-party services like GitHub or Vercel, you are responsible for ensuring that all environment variables and backend linkages (e.g., Supabase parameters) are correctly configured.
              </p>
              <p>
                Provided proper configuration, all tools, client-side scripts, and authentication modules will function natively on any modern global deployment edge.
              </p>
            </div>
          </section>

          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
            <span>Last Updated: Model Authorization</span>
            <span>Version: Night X Core</span>
          </div>
        </div>
      </div>
    </div>
  );
}
