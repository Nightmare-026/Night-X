"use client";

import React, { useState, useEffect } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { FileCode, Eye, Edit3, Download, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const MarkdownLive = () => {
    const [markdown, setMarkdown] = useState("# Night X Markdown\n\n- Elite UI\n- **Client Side**\n- *Safe*\n\n```js\nconsole.log('Night X Active');\n```");
    const [html, setHtml] = useState("");
    const [tab, setTab] = useState<"edit" | "preview">("edit");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const parseMarkdown = async () => {
             const rawHtml = await marked.parse(markdown);
             // Strict DOMPurify configuration to block suspicious interactions
             setHtml(DOMPurify.sanitize(rawHtml, {
                 ALLOWED_TAGS: [
                     'b', 'i', 'em', 'strong', 'a', 'p', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 
                     'code', 'pre', 'blockquote', 'hr', 'br', 'span', 'img'
                 ],
                 ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'target'],
                 FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form', 'input', 'button', 'textarea'],
                 FORBID_ATTR: ['onerror', 'onclick', 'onload', 'onmouseover', 'style'],
                 USE_PROFILES: { html: true }
             }));
        };
        parseMarkdown();
    }, [markdown]);

    const copyMarkdown = () => {
        navigator.clipboard.writeText(markdown);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const downloadMD = () => {
        const blob = new Blob([markdown], { type: "text/markdown" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Night-X-Draft.md";
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="w-full h-full flex flex-col gap-6">
            {/* Header Controls */}
            <div className="flex items-center justify-between px-2">
                <div className="flex p-1 bg-white/5 border border-white/5 rounded-2xl">
                    <button
                        onClick={() => setTab("edit")}
                        className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 relative overflow-hidden group ${
                            tab === "edit" ? "night-btn-gradient text-white shadow-lg" : "text-white/20 hover:text-white"
                        }`}
                    >
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Edit3 size={12} className="relative z-10" />
                        <span className="relative z-10">Editor</span>
                    </button>
                    <button
                        onClick={() => setTab("preview")}
                        className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 relative overflow-hidden group ${
                            tab === "preview" ? "night-btn-gradient text-white shadow-lg" : "text-white/20 hover:text-white"
                        }`}
                    >
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Eye size={12} className="relative z-10" />
                        <span className="relative z-10">Preview</span>
                    </button>
                </div>
                <div className="flex gap-3">
                    <button onClick={copyMarkdown} className="p-3 rounded-xl bg-white/5 text-white/40 hover:text-white transition-all">
                        {copied ? <Check size={16} className="text-night-emerald" /> : <Copy size={16} />}
                    </button>
                    <button onClick={downloadMD} className="p-3 rounded-xl night-btn-gradient text-white hover:brightness-110 transition-all shadow-lg relative overflow-hidden group">
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Download size={16} className="relative z-10" />
                    </button>
                </div>
            </div>

            {/* Workplace */}
            <div className="relative flex-1 group min-h-[450px]">
                <AnimatePresence mode="wait">
                    {tab === "edit" ? (
                        <motion.div
                            key="editor"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            className="h-full"
                        >
                            <textarea
                                value={markdown}
                                onChange={(e) => setMarkdown(e.target.value)}
                                className="w-full h-full bg-night-black/40 border border-white/5 rounded-[2.5rem] p-8 font-mono text-sm text-white/70 outline-none focus:border-night-indigo/30 transition-all resize-none shadow-inner leading-relaxed"
                                placeholder="# Start writing..."
                                spellCheck={false}
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="preview"
                            initial={{ opacity: 0, scale: 1.02 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            className="h-full p-8 bg-white/5 border border-white/5 rounded-[2.5rem] overflow-y-auto"
                        >
                            <div 
                                className="prose prose-invert prose-emerald max-w-none text-white/50"
                                dangerouslySetInnerHTML={{ __html: html }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Footer Status */}
            <div className="flex justify-between items-center text-[9px] font-black tracking-[0.4em] text-white/10 uppercase">
                 <span>Sanitized Engine v1.0</span>
                 <div className="flex items-center gap-1 text-night-emerald">
                     <FileCode size={10} />
                     <span>LIVE RENDER ACTIVE</span>
                 </div>
            </div>
        </div>
    );
};
