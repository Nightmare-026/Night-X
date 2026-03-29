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
import { ToolDocumentation } from "@/components/ui/ToolDocumentation";

// Mapping of slugs to components and metadata
const toolsMap: Record<string, { 
  title: string, 
  description: string, 
  color: string, 
  component?: React.ReactNode,
  documentation?: {
    overview: string,
    useCases: string[],
    faqs: { q: string, a: string }[],
    example: string
  }
}> = {
  "image-compressor": { 
    title: "Image Compressor", 
    description: "Lossless client-side image size reduction. Your data never leaves your browser.", 
    color: "#3b82f6",
    component: <ImageCompressor />,
    documentation: {
      overview: "The Night X Image Compressor is a sovereign-grade processing engine designed to reduce image payloads without compromising visual fidelity. Operating entirely within your browser's local sandbox, it leverages advanced compression algorithms to ensure your data stays private and secure.",
      useCases: ["Web Optimization: Reduce LCP and improve Core Web Vitals.", "Bandwidth Efficiency: Compress high-resolution assets for low-latency transmission.", "Archive Management: Optimize high-resolution asset libraries for efficient local storage."],
      faqs: [{ q: "Does my data ever leave the device?", a: "Negative. All processing is executed via local-first JS engines. No server-side transmission occurs." }, { q: "What is the maximum throughput?", a: "The engine supports up to 50MB single-asset processing, depending on your system's V8 memory allocation." }],
      example: "Target: raw_vision_report.png (8.5 MB)\nOperation: 80% Quality Threshold\nOutcome: optimized_vision_report.webp (1.2 MB) - 85% Optimization Achieved"
    }
  },
  "format-converter": { 
    title: "Format Converter", 
    description: "Convert between JPG, PNG, WEBP, and more instantly.", 
    color: "#10b981",
    component: <ImageConverter />,
    documentation: {
      overview: "A high-performance image transformation protocol supporting bidirectional conversion between industry-standard formats including WEBP, PNG, JPG, and AVIF. Optimized for modern edge delivery.",
      useCases: ["Legacy Support: Convert modern WEBP assets to high-compatibility JPG.", "Transparency Preservation: Transform raw images to PNG for high alpha-channel fidelity.", "Modern Delivery: Batch convert entire assets to WEBP for optimal edge delivery."],
      faqs: [{ q: "Is quality lost during conversion?", a: "Only if lossy formats like JPG are selected as the target. WEBP and PNG preservation is high-fidelity." }, { q: "Can I convert transparency?", a: "Yes, when converting to PNG or WEBP, all Alpha-channel data is maintained via secure local extraction." }],
      example: "Input: master_overlay.webp (Alpha enabled)\nCommand: Convert to PNG-24\nStatus: Transparency Preserved | Zero Artifacting detected."
    }
  },
  "image-to-pdf": { 
    title: "Image to PDF", 
    description: "Convert multiple images to high-quality PDF documents with reordering.", 
    color: "#6366f1",
    component: <ImageToPDF />,
    documentation: {
      overview: "Synthesize multiple visual assets into a unified, high-resolution PDF document. This tool handles layout, scaling, and file merging entirely within the client-side environment.",
      useCases: ["Document Digitization: Convert scanned JPG logs into a single investigative PDF.", "Portfolio Synthesis: Merge multiple design assets into a professional showcase document.", "Security Compliance: Consolidate evidence files into a secure, portable format."],
      faqs: [{ q: "Is there an image limit?", a: "The system supports up to 50 concurrent assets, restricted only by the local RAM buffer." }, { q: "Can I reorder pages?", a: "The interface provides real-time drag-and-drop sequencing before finalizing the PDF synthesis." }],
      example: "Source: 12x photos.jpg\nProtocol: Auto-scaling enabled\nFinal: investigation_report.pdf"
    }
  },
  "qr-builder": {
    title: "QR Builder",
    description: "Generate high-precision QR codes with real-time styling controls.",
    color: "#06b6d4",
    component: <QRBuilder />,
    documentation: {
      overview: "Generate high-precision QR codes with real-time styling and error-correction controls. Designed for secure URL and data sharing protocols.",
      useCases: ["Access Control: Generate dynamic QR keys for secure environment entry.", "Network Discovery: Share complex Wi-Fi credentials via high-density QR artifacts.", "Marketing Delivery: Redirect users to targeted edge endpoints with high-fidelity visual branding."],
      faqs: [{ q: "What is the error correction level?", a: "Levels L, M, Q, and H are supported, allowing for up to 30% data recovery in damaged environments." }, { q: "Are the codes permanent?", a: "Yes, once synthesized, the code is static and operational indefinitely without external dependency." }],
      example: "Data: https://night-x.ai/secure\nStyling: Emerald Gradient\nStatus: Generated | Level H Error Correction Active"
    }
  },
  "strong-password": {
    title: "Strong Password",
    description: "Ultra-secure client-side password synthesis with entropy visualization.",
    color: "#64748b",
    component: <PasswordGenerator />,
    documentation: {
      overview: "Ultra-secure client-side password synthesis engine. Uses cryptographically secure pseudorandom number generators (CSPRNG) to create entropy-rich keys.",
      useCases: ["Credential Hardening: Replace weak logins with high-entropy 32-character strings.", "System Access: Generate secure root passwords for remote server deployments.", "Key Generation: Synthesize seed phrases for decentralized authentication protocols."],
      faqs: [{ q: "Are passwords stored?", a: "Negative. The engine is stateless. Once you clear the interface, the data is purged from memory." }, { q: "How is entropy calculated?", a: "We analyze character variance and length to provide a real-time 'Shield Strength' visualization." }],
      example: "Length: 24 | Charset: Full\nResult: X9!pL$8kNmZ2#eR5@tW7*yU9\nStrength: Sovereign-Grade (128-bit entropy)"
    }
  },
  "json-prettier": { 
    title: "JSON Prettier", 
    description: "Format and validate JSON data with elite aesthetics.", 
    color: "#eab308",
    component: <JSONPrettier />,
    documentation: {
      overview: "High-fidelity JSON formatting and validation suite. Converts obfuscated data into readable, structured intelligence with real-time syntax verification.",
      useCases: ["Debugging: Prettify raw API responses for manual inspection.", "Config Audit: Format .json files to identify structural anomalies.", "Documentation: Prepare clean data snippets for internal engineering wikis."],
      faqs: [{ q: "Does it validate syntax?", a: "Yes, the engine detects trailing commas, missing quotes, or bracket mismatches." }, { q: "Can it handle large files?", a: "Optimized for up to 5MB payloads, maintaining 60FPS interaction during formatting." }],
      example: "Input: {'a':1,'b':2,'c':[1,2,3]}\nOutput: {\n  'a': 1,\n  'b': 2,\n  'c': [\n    1,\n    2,\n    3\n  ]\n}"
    }
  },
  "base64-master": {
    title: "Base64 Master",
    description: "Encode/Decode text and files with bidirectional synthesis.",
    color: "#f97316",
    component: <Base64Master />,
    documentation: {
      overview: "Bidirectional Base64 encoding and decoding protocol for text and binary assets. Essential for preparing data for secure transmission or embedding.",
      useCases: ["Asset Embedding: Convert UI icons into Base64 URI strings.", "Data Transmission: Encode binary logs into ASCII for safe transit.", "Security Obfuscation: Perform quick masking of sensitive strings."],
      faqs: [{ q: "Is Base64 encryption?", a: "Negative. It is an encoding protocol for data representation, not a security mechanism." }, { q: "Can I encode images?", a: "Yes, the master protocol supports full binary-to-string transformation for all file types." }],
      example: "Input: 'Access Denied'\nResult: QWNjZXNzIERlbmllZA==\nStatus: String-to-Base64 Conversion"
    }
  },
  "markdown-live": {
    title: "Markdown Live",
    description: "Real-time Markdown editor with sanitized document preview.",
    color: "#0ea5e9",
    component: <MarkdownLive />,
    documentation: {
      overview: "Real-time Markdown editor with sanitized document preview. Bridge the gap between raw syntax and professional visual documentation.",
      useCases: ["Technical Writing: Compose READMEs with immediate visual feedback.", "Content Strategy: Draft technical articles using high-fidelity styling.", "Note Synthesis: Capture architectural decisions in a structured format."],
      faqs: [{ q: "Is the preview secure?", a: "Yes, we use advanced DOM purification to prevent XSS during rendering." }, { q: "Can I export?", a: "The system supports clipboard extraction and local file persistence for finalized documents." }],
      example: "Input: # System Header\nResult: Rendered H1 and profession typography."
    }
  },
  "video-shrinker": {
    title: "Video Shrinker",
    description: "Compress video files while maintaining visual fidelity.",
    color: "#8b5cf6",
    component: <VideoShrinker />,
    documentation: {
      overview: "High-performance video payload reduction. Uses client-side FFmpeg-WASM to compress media files while maintaining a high signal-to-noise ratio.",
      useCases: ["Cloud Optimization: Reduce S3 storage costs by shrinking video logs.", "Messaging Efficiency: Compress high-res clips for instant sharing over mobile networks.", "Social Delivery: Optimize video assets for platform-specific bitrate requirements."],
      faqs: [{ q: "Does it use a server?", a: "Negative. This tool uses WebAssembly to run FFmpeg directly in your browser's execution context." }, { q: "Is audio quality affected?", a: "We prioritize visual compression while maintaining the original audio bitrate." }],
      example: "Source: log_demo.mp4 (45 MB)\nTarget: 720p Optimized\nOutput: log_demo_shrunk.mp4 (8.2 MB)"
    }
  },
  "video-to-gif": {
    title: "Video to GIF",
    description: "Convert video clips into high-quality animated GIFs.",
    color: "#ec4899",
    component: <VideoToGIF />,
    documentation: {
      overview: "Transform high-resolution video segments into optimized animated GIFs. Perfect for creating lightweight technical demonstrations or visual highlights.",
      useCases: ["Documentation Gifs: Create looping demonstrations of UI interactions.", "Social Communication: Convert bug reports into easily viewable animation snippets.", "Email Marketing: Embed lightweight animations into communication protocols."],
      faqs: [{ q: "Can I select frames?", a: "Yes, the interface allows for precise start and end-time selection from the source video." }, { q: "What about file size?", a: "The engine includes optimization layers to reduce color depth and frame count." }],
      example: "Input: interaction_final.mp4 (5s clip)\nOutput: interaction_final.gif (Optimized at 15FPS)"
    }
  },
  "url-coder": {
    title: "URL Coder",
    description: "Encode and decode URL components safely.",
    color: "#14b8a6",
    component: <URLCoder />,
    documentation: {
      overview: "Safe encoding and decoding of URL components. Ensures special characters and spaces are correctly handled for web-standard transmission.",
      useCases: ["API Integrity: Encode complex query parameters before sending GET requests.", "Data Sanitization: Decode 'percent-encoded' strings from logs.", "Deep Linking: Construct safe URL paths for complex state management."],
      faqs: [{ q: "Which standards are followed?", a: "The engine adheres strictly to RFC 3986 for URI Percent-Encoding." }, { q: "Are reserved characters safe?", a: "Yes, the protocol correctly identifies and encodes characters like &, +, and spaces." }],
      example: "Input: 'Secure? Hub=1&Data=Success!'\nEncoded: Secure%3F%20Hub%3D1%26Data%3DSuccess%21"
    }
  },
  "pdf-to-image": {
    title: "PDF to Image",
    description: "Extract high-resolution images from PDF pages.",
    color: "#f59e0b",
    component: <PDFToImage />,
    documentation: {
      overview: "High-resolution PDF page extraction. Converts complex document layers into lightweight, high-fidelity image formats.",
      useCases: ["Presentation Prep: Extract specific PDF slides as PNGs to include in visual briefs.", "Digital Archiving: Convert long PDF reports into high-resolution JPG archives.", "Preview Generation: Create thumbnail previews for large document libraries."],
      faqs: [{ q: "Is resolution limited?", a: "The engine supports high-DPI extraction, ensuring text remains sharp even at 2x zoom." }, { q: "Can I extract specific pages?", a: "Yes, the selective protocol allows for individual or batch page-to-image transformation." }],
      example: "Source: blueprint.pdf (Page 5)\nCommand: Extract as PNG @ 300DPI\nResult: blueprint_p5.png"
    }
  },
  "unit-converter": {
    title: "Unit Converter",
    description: "Convert units of length, weight, temperature, and data.",
    color: "#84cc16",
    component: <UnitConverter />,
    documentation: {
      overview: "Scientific-grade measurement transformation suite. Instantly convert values across length, mass, temperature, and digital storage categories.",
      useCases: ["Hardware Specs: Convert inches to mm for precision equipment planning.", "Global Collaboration: Translate Fahrenheit logs to Celsius for international teams.", "Data Analysis: Convert Terabytes to Petabytes for storage audits."],
      faqs: [{ q: "How accurate is progress?", a: "We use high-precision floating point math with up to 10 decimal places of accuracy." }, { q: "Are constants updated?", a: "Yes, all conversion factors follow the latest International System of Units (SI) standards." }],
      example: "Input: 1024 GB\nTarget: Terabytes\nResult: 1.0 TB (Digital Storage Binary Standard)"
    }
  },
  "word-counter": {
    title: "Word Counter",
    description: "Analyze text for word, character, and paragraph counts.",
    color: "#a855f7",
    component: <WordCounter />,
    documentation: {
      overview: "Deep text analysis protocol. Beyond simple counting, this tool provides character, word, sentence, and paragraph density metrics.",
      useCases: ["SEO Optimization: Ensure content meets keyword density and length requirements.", "Technical Specifications: Audit documentation for conciseness and structural balance.", "Social Engagement: Target specific character limits for micro-blogging platforms."],
      faqs: [{ q: "Are spaces included?", a: "The tool provides separate counts for characters with and without spaces for maximum granularity." }, { q: "What is sentence logic?", a: "We use advanced regex delimiters to identify sentence boundaries accurately." }],
      example: "Input: 'The Night X ecosystem is thriving.'\nAnalysis: 6 Words | 36 Characters | 1 Sentence"
    }
  },
  "duplicate-remover": {
    title: "Duplicate Remover",
    description: "Clean lists and remove duplicate entries with sorting.",
    color: "#fb923c",
    component: <DuplicateRemover />,
    documentation: {
      overview: "List sanitization and redundancy elimination engine. Clean bulk data collections by identifying and removing identical entries with high precision.",
      useCases: ["Lead Management: Clean email lists by removing duplicate contact entries.", "Log Analysis: Filter repetitive messages from technical logs for clearer auditing.", "Code Refactoring: Identify and remove duplicate CSS classes or Tailwind tokens."],
      faqs: [{ q: "Is case sensitivity supported?", a: "Yes, you can toggle between strict (case-sensitive) and relaxed filtering protocols." }, { q: "Does it preserve order?", a: "The interface provides an option to maintain the original sequence or sort result unique results." }],
      example: "Input: [A, B, A, C]\nOutput: [A, B, C]\nEfficiency: 25% Redundancy Purged"
    }
  },
  "lorem-ipsum": {
    title: "Lorem Ipsum",
    description: "Generate placeholder text for design and development.",
    color: "#f43f5e",
    component: <LoremIpsum />,
    documentation: {
      overview: "High-fidelity placeholder text generation. Synthesize classical Latin-inspired filler text for design prototyping and layout verification.",
      useCases: ["UI/UX Mockups: Fill layout blocks with realistic text density to test typography.", "Web Development: Populate database fields with 'dummy' data during local staging.", "Content Planning: Visualize page structures before final copy is synthesized."],
      faqs: [{ q: "Can I customize length?", a: "Yes, generate by word, paragraph, or sentence count to fit any design container." }, { q: "Is the text offensive?", a: "Negative. The generated text is based on standard 'Lorem Ipsum' traditions, which are nonsensical." }],
      example: "Command: 2 Paragraphs\nResult: 'Lorem ipsum dolor sit amet...'"
    }
  },
  "color-palette": {
    title: "Color Palette", 
    description: "Generate and extract beautiful color palettes.", 
    color: "#ec4899",
    component: <ColorPalette />,
    documentation: {
      overview: "Design-centric color extraction and palette synthesis engine. Extracts beautiful color harmonies from images or generates them via algorithm.",
      useCases: ["Brand Synthesis: Extract primary colors from a logo to build a unified design system.", "Interface Design: Generate 'Night X' compatible palettes using high-fidelity color math.", "Accessibility Check: Identify high-contrast color pairs for sovereign-grade UX."],
      faqs: [{ q: "Which formats are exported?", a: "The engine provides HEX, RGB, and HSL values for instant copying into your CSS or Figma." }, { q: "Can I save palettes?", a: "Currently, you can copy the entire palette array to your clipboard in a single execution." }],
      example: "Input: brand_logo.png\nExtracted: #4338ca (Indigo), #10b981 (Emerald)\nStatus: High-Fidelity Harmony Detected"
    }
  },
  "scientific-calculator": {
    title: "Scientific Calculator",
    description: "Advanced mathematical processing engine with scientific functions.",
    color: "#3b82f6",
    component: <ScientificCalculator />,
    documentation: {
      overview: "High-precision mathematical processing engine. Support for trigonometric, logarithmic, and exponential functions required for elite engineering tasks.",
      useCases: ["Physics Simulation: Calculate trajectories or force vectors using sine/cosine functions.", "Financial Modeling: Perform complex exponential growth or decay calculations.", "Statistical Analysis: Use logs and roots for high-level data transformation."],
      faqs: [{ q: "Does it support radians?", a: "Yes, you can toggle between Degree and Radian modes for all trigonometric operations." }, { q: "What is the precision limit?", a: "The engine utilizes the JS IEEE-754 standard for extreme precision in floating point math." }],
      example: "Operation: sin(45) * log(100)\nResult: 1.41421356..."
    }
  },
  "age-calculator": {
    title: "Age Calculator",
    description: "Precision synthesis of your biological duration and temporal status.",
    color: "#8b5cf6",
    component: <AgeCalculator />,
    documentation: {
      overview: "Precise biological duration synthesis. Calculate aging metrics across years, months, and days with high-fidelity temporal accuracy.",
      useCases: ["Personal Metrics: Track your exact age for biometric or health log archiving.", "Verification Protocols: Audit user age requirements during secure identity vetting.", "Event Planning: Calculate historical durations between two distinct timestamps."],
      faqs: [{ q: "Does it handle leap years?", a: "Yes, the temporal algorithm takes into account all Gregorian calendar nuances, including leap cycles." }, { q: "Is current time used?", a: "The tool defaults to the current system date but allows for arbitrary target date selection." }],
      example: "Birth: 1995-05-15\nToday: 2026-03-29\nResult: 30 Years, 10 Months, 14 Days"
    }
  },
  "emi-calculator": {
    title: "EMI Calculator",
    description: "Loan interest, monthly installments, and payoff analysis.",
    color: "#d946ef",
    component: <EMICalculator />,
    documentation: {
      overview: "Loan and interest analysis protocol. Calculate your Equated Monthly Installments (EMI) with high-fidelity amortization visualization.",
      useCases: ["Mortgage Planning: Determine the long-term cost of property acquisition.", "Equipment Financing: Audit monthly costs for hardware deployments.", "Self-Financing: Compare different interest rates and tenures to optimize financial health."],
      faqs: [{ q: "Can I adjust frequency?", a: "Standard EMI calculation is monthly, but the engine allows for varying tenures from 1 to 30 years." }, { q: "Does it show total interest?", a: "Yes, the calculation explicitly breaks down the principal vs the interest payload." }],
      example: "Principal: $5,000 | Rate: 10% | Tenure: 12m\nMonthly: $439.58 | Total Interest: $274.96"
    }
  },
  "base-converter": {
    title: "Number Base Converter",
    description: "Bidirectional synthesis between Hex, Binary, Decimal, and Octal.",
    color: "#06b6d4",
    component: <BaseConverter />,
    documentation: {
      overview: "High-speed numeral system transformation. Instantly convert values between binary, octal, decimal, and hexadecimal with absolute zero-error precision.",
      useCases: ["Network Protocol Debugging: Convert raw binary packets into human-readable hex logs.", "Development Workflows: Translate decimal color values or memory addresses into hexadecimal strings.", "Computer Science Education: Visualize the relationships between different base systems."],
      faqs: [{ q: "Which bases are supported?", a: "We support the four industry-standard bases: Binary (2), Octal (8), Decimal (10), and Hexadecimal (16)." }, { q: "Can it handle large numbers?", a: "The engine uses BigInt where appropriate to prevent overflow on extreme numerical strings." }],
      example: "Input: 255 (Decimal)\nHex: 0xFF | Binary: 11111111"
    }
  },
  "discount-calculator": {
    title: "Discount Calculator",
    description: "Analyze price savings, discounts, and tax protocols.",
    color: "#10b981",
    component: <DiscountCalculator />,
    documentation: {
      overview: "Strategic savings and tax analysis suite. Calculate final prices after applying multiple discount and tax layers with high-fidelity precision.",
      useCases: ["Procurement Audit: Verify the final cost of bulk hardware orders after promotional discounts.", "Retail Optimization: Calculate potential savings during high-volume sales events.", "Tax Preparation: Estimate the impact of regional sales taxes on diverse purchase categories."],
      faqs: [{ q: "Can I apply tax?", a: "Yes, the tool allows for a separate tax percentage to be applied to the discounted price." }, { q: "Does it support partial currencies?", a: "The engine rounds to two decimal places, conforming to standard global currency protocols." }],
      example: "Original: $1,200 | Discount: 20% | Tax: 5%\nFinal Price: $1,008.00 | Total Savings: $240.00"
    }
  },
  "cgpa-calculator": {
    title: "CGPA Calculator",
    description: "Academic percentage to CGPA transformation system.",
    color: "#f43f5e",
    component: <CGPACalculator />,
    documentation: {
      overview: "Academic performance transformation algorithm. Convert grade percentages or point systems into standard CGPA metrics for global institutional alignment.",
      useCases: ["Academic Verification: Audit GPA scores for global scholarship or job applications.", "Progress Monitoring: Track semester-over-semester growth in academic performance.", "Institutional Compliance: Standardize diverse marking systems into a unified point scale."],
      faqs: [{ q: "What is the standard scale?", a: "The tool defaults to the common 10.0 scale, but the formula is adaptable for other institutional benchmarks." }, { q: "Is percentage conversion accurate?", a: "We use standard university-grade linear mapping to ensure the most accurate conversion possible." }],
      example: "Percentage: 85%\nCalculated CGPA: 8.5 / 10.0"
    }
  },
  "case-converter": {
    title: "Case Converter",
    description: "Bulk text transformation (UPPER, lower, Title, Camel, Snake).",
    color: "#0ea5e9",
    component: <CaseConverter />,
    documentation: {
      overview: "Bulk text transformation engine. Instantly convert string casing styles to meet programming standards or visual requirements.",
      useCases: ["Dev Standardization: Convert text lists to camelCase or snake_case for codebase consistency.", "Content Formatting: Bulk transform headers to UPPERCASE or Title Case for visual hierarchy.", "Data Normalization: Clean user input by forcing all entries into lowercase."],
      faqs: [{ q: "Which cases are supported?", a: "UPPER, lower, Title, Sentence, camelCase, snake_case, and kebab-case are all supported." }, { q: "Are Special Characters affected?", a: "The engine smartly handles non-alphanumeric characters as delimiters for case splitting." }],
      example: "Input: 'night x hub'\nCamel: nightXHub | Snake: night_x_hub"
    }
  },
  "text-encryptor": {
    title: "Text Encryptor/Decrypter",
    description: "Secure Base64, Hex, and Rot13 client-side encryption.",
    color: "#6366f1",
    component: <TextEncryptor />,
    documentation: {
      overview: "Local-first text obfuscation and security suite. Perform rapid encryption and decryption using verified mathematical protocols entirely within your browser.",
      useCases: ["Secure Messaging: Mask sensitive secrets or passwords before sending over untrusted channels.", "Log Obfuscation: Protect PII (Personally Identifiable Information) in local testing logs.", "Educational Security: Explore basic encryption concepts like Rot13 and Base64 transformation."],
      faqs: [{ q: "Is this production-grade?", a: "This tool is intended for rapid obfuscation. For top-tier data storage, use audited hardware-level encryption." }, { q: "Where is the key stored?", a: "Nowhere. All operations are local and ephemeral. Once the session ends, the context is lost." }],
      example: "Text: 'SECRET_LOG'\nRot13: 'FRPERG_YBT'\nStatus: Successfully Masked via Local Protocol."
    }
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
        <Link href="/" className="inline-flex items-center gap-3 group mb-10 night-btn-gradient px-6 py-3 rounded-2xl border border-white/20 shadow-xl transition-all hover:scale-[1.02] active:scale-95">
          <ArrowLeft size={16} className="text-white/60 group-hover:text-white transition-colors" />
          <span className="text-xs font-black uppercase tracking-[0.2em] text-white/80 group-hover:text-white transition-colors">Back to Hub</span>
        </Link>

        {/* Tool Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-night-indigo to-night-emerald" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Active Suite</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-6xl heading-dynamic mb-3 sm:mb-4">
            {tool?.title || id.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}
          </h1>
          <p className="max-w-xl text-xs sm:text-sm md:text-base font-medium leading-relaxed text-white/40">
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

        {/* Intelligence Protocols (Documentation) */}
        {tool?.documentation && (
          <div className="mt-32 sm:mt-48">
            <div className="flex items-center gap-6 mb-20 sm:mb-32">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              <div className="flex flex-col items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/10 italic">Secure Briefing</span>
                <div className="w-1.5 h-1.5 rounded-full bg-night-indigo animate-pulse shadow-[0_0_10px_#4338ca]" />
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            </div>
            
            <ToolDocumentation 
              data={tool.documentation}
              color={tool.color}
            />
          </div>
        )}
      </div>
    </main>
  );
}
