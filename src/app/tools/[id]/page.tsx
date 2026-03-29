"use client";

import React, { use } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Background3D } from "@/components/visuals/Background3D";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ImageCompressor } from "@/components/tools/ImageCompressor";
import { ImageConverter } from "@/components/tools/ImageConverter";
import { ImageToPDF } from "@/components/tools/ImageToPDF";
import { QRBuilder } from "@/components/tools/QRBuilder";
import { PasswordGenerator } from "@/components/tools/PasswordGenerator";
import { JSONPrettier } from "@/components/tools/JSONPrettier";
import { Base64Master } from "@/components/tools/Base64Master";
import { MarkdownLive } from "@/components/tools/MarkdownLive";
import { VideoShrinker } from "@/components/tools/VideoShrinker";
import { VideoToGIF } from "@/components/tools/VideoToGIF";
import { PDFToImage } from "@/components/tools/PDFToImage";
import { URLCoder } from "@/components/tools/URLCoder";
import { UnitConverter } from "@/components/tools/UnitConverter";
import { WordCounter } from "@/components/tools/WordCounter";
import { DuplicateRemover } from "@/components/tools/DuplicateRemover";
import { LoremIpsum } from "@/components/tools/LoremIpsum";
import { ColorPalette } from "@/components/tools/ColorPalette";
import { ScientificCalculator } from "@/components/tools/ScientificCalculator";
import { AgeCalculator } from "@/components/tools/AgeCalculator";
import { EMICalculator } from "@/components/tools/EMICalculator";
import { BaseConverter } from "@/components/tools/BaseConverter";
import { DiscountCalculator } from "@/components/tools/DiscountCalculator";
import { CGPACalculator } from "@/components/tools/CGPACalculator";
import { CaseConverter } from "@/components/tools/CaseConverter";
import { TextEncryptor } from "@/components/tools/TextEncryptor";

// Mapping of slugs to components and metadata
const toolsMap: Record<string, { title: string, description: string, color: string, component?: React.ReactNode }> = {
  "image-compressor": { 
    title: "Image Compressor", 
    description: "Lossless client-side image size reduction. Your data never leaves your browser.", 
    color: "#3b82f6",
    component: <ImageCompressor />
  },
  "format-converter": { 
    title: "Format Converter", 
    description: "Convert between JPG, PNG, WEBP, and more instantly.", 
    color: "#10b981",
    component: <ImageConverter />
  },
  "image-to-pdf": { 
    title: "Image to PDF", 
    description: "Convert multiple images to high-quality PDF documents with reordering.", 
    color: "#6366f1",
    component: <ImageToPDF />
  },
  "qr-builder": {
    title: "QR Builder",
    description: "Generate high-precision QR codes with real-time styling controls.",
    color: "#06b6d4",
    component: <QRBuilder />
  },
  "strong-password": {
    title: "Strong Password",
    description: "Ultra-secure client-side password synthesis with entropy visualization.",
    color: "#64748b",
    component: <PasswordGenerator />
  },
  "json-prettier": { 
    title: "JSON Prettier", 
    description: "Format and validate JSON data with elite aesthetics.", 
    color: "#eab308",
    component: <JSONPrettier />
  },
  "base64-master": {
    title: "Base64 Master",
    description: "Encode/Decode text and files with bidirectional synthesis.",
    color: "#f97316",
    component: <Base64Master />
  },
  "markdown-live": {
    title: "Markdown Live",
    description: "Real-time Markdown editor with sanitized document preview.",
    color: "#0ea5e9",
    component: <MarkdownLive />
  },
  "video-shrinker": {
    title: "Video Shrinker",
    description: "Compress video files while maintaining visual fidelity.",
    color: "#8b5cf6",
    component: <VideoShrinker />
  },
  "video-to-gif": {
    title: "Video to GIF",
    description: "Convert video clips into high-quality animated GIFs.",
    color: "#ec4899",
    component: <VideoToGIF />
  },
  "url-coder": {
    title: "URL Coder",
    description: "Encode and decode URL components safely.",
    color: "#14b8a6",
    component: <URLCoder />
  },
  "pdf-to-image": {
    title: "PDF to Image",
    description: "Extract high-resolution images from PDF pages.",
    color: "#f59e0b",
    component: <PDFToImage />
  },
  "unit-converter": {
    title: "Unit Converter",
    description: "Convert units of length, weight, temperature, and data.",
    color: "#84cc16",
    component: <UnitConverter />
  },
  "word-counter": {
    title: "Word Counter",
    description: "Analyze text for word, character, and paragraph counts.",
    color: "#a855f7",
    component: <WordCounter />
  },
  "duplicate-remover": {
    title: "Duplicate Remover",
    description: "Clean lists and remove duplicate entries with sorting.",
    color: "#fb923c",
    component: <DuplicateRemover />
  },
  "lorem-ipsum": {
    title: "Lorem Ipsum",
    description: "Generate placeholder text for design and development.",
    color: "#f43f5e",
    component: <LoremIpsum />
  },
  "color-palette": {
    title: "Color Palette", 
    description: "Generate and extract beautiful color palettes.", 
    color: "#ec4899",
    component: <ColorPalette />
  },
  "scientific-calculator": {
    title: "Scientific Calculator",
    description: "Advanced mathematical processing engine with scientific functions.",
    color: "#3b82f6",
    component: <ScientificCalculator />
  },
  "age-calculator": {
    title: "Age Calculator",
    description: "Precision synthesis of your biological duration and temporal status.",
    color: "#8b5cf6",
    component: <AgeCalculator />
  },
  "emi-calculator": {
    title: "EMI Calculator",
    description: "Loan interest, monthly installments, and payoff analysis.",
    color: "#d946ef",
    component: <EMICalculator />
  },
  "base-converter": {
    title: "Number Base Converter",
    description: "Bidirectional synthesis between Hex, Binary, Decimal, and Octal.",
    color: "#06b6d4",
    component: <BaseConverter />
  },
  "discount-calculator": {
    title: "Discount Calculator",
    description: "Analyze price savings, discounts, and tax protocols.",
    color: "#10b981",
    component: <DiscountCalculator />
  },
  "cgpa-calculator": {
    title: "CGPA Calculator",
    description: "Academic percentage to CGPA transformation system.",
    color: "#f43f5e",
    component: <CGPACalculator />
  },
  "case-converter": {
    title: "Case Converter",
    description: "Bulk text transformation (UPPER, lower, Title, Camel, Snake).",
    color: "#0ea5e9",
    component: <CaseConverter />
  },
  "text-encryptor": {
    title: "Text Encryptor/Decrypter",
    description: "Secure Base64, Hex, and Rot13 client-side encryption.",
    color: "#6366f1",
    component: <TextEncryptor />
  },
};

export default function ToolPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const tool = toolsMap[id];

  return (
    <main className="relative min-h-screen matte-grain">
      <Background3D />
      <Navbar />

      <div className="pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12 px-4 sm:px-6 max-w-5xl mx-auto">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 group mb-8 text-white/40 hover:text-white transition-colors">
          <div className="p-2 rounded-lg bg-white/5 border border-white/5 group-hover:bg-night-indigo/20 group-hover:border-night-indigo/30 transition-all">
            <ArrowLeft size={16} />
          </div>
          <span className="text-sm font-medium tracking-tight">Back to Hub</span>
        </Link>

        {/* Tool Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-night-indigo to-night-emerald" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Active Suite</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-black mb-3 sm:mb-4 tracking-tight">
            {tool?.title || id.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}
          </h1>
          <p className="text-white/40 max-w-2xl text-base sm:text-lg font-light leading-relaxed">
            {tool?.description || "High-performance processing engine at your fingertips."}
          </p>
        </div>

        {/* Tool Interaction Area */}
        <section className="glass-card rounded-2xl sm:rounded-[2.5rem] p-4 sm:p-8 md:p-12 min-h-[400px] sm:min-h-[500px] shadow-2xl relative border-white/5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-night-indigo/5 blur-[120px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
             {tool?.component || (
                <div className="p-20 border-2 border-dashed border-white/5 rounded-3xl w-full text-center">
                    <p className="text-white/20 font-bold italic tracking-widest uppercase">Engine Initializing...</p>
                    <p className="text-[10px] text-white/10 mt-2 tracking-[0.2em]">Sovereign Batch Update in Progress</p>
                </div>
             )}
          </div>
        </section>
      </div>
    </main>
  );
}
