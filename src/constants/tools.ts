import { 
  FileImage, 
  ImageIcon, 
  FileText, 
  Layers, 
  Video, 
  Wind, 
  QrCode, 
  Lock, 
  Code, 
  Terminal, 
  FileCode, 
  Link2, 
  ArrowLeftRight, 
  Type, 
  Minimize2, 
  Hash, 
  Palette,
  Calculator,
  Calendar,
  Wallet,
  Binary,
  BadgePercent,
  GraduationCap,
  Shield,
  LucideIcon
} from "lucide-react";

export interface Tool {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  category: string;
}

export const tools: Tool[] = [
  { id: "age-calculator", title: "Age Calculator", description: "Precision synthesis of your biological duration.", icon: Calendar, color: "#8b5cf6", category: "Utility" },
  { id: "base64-master", title: "Base64 Master", description: "Encode and decode binary for the web.", icon: Terminal, color: "#f97316", category: "Developer" },
  { id: "case-converter", title: "Case Converter", description: "Bulk text transformation and normalization.", icon: Type, color: "#0ea5e9", category: "Text" },
  { id: "cgpa-calculator", title: "CGPA Calculator", description: "Academic percentage to CGPA transformation.", icon: GraduationCap, color: "#f43f5e", category: "Academic" },
  { id: "color-palette", title: "Color Palette", description: "Generate aesthetic UI color schemes.", icon: Palette, color: "#ec4899", category: "Creative" },
  { id: "discount-calculator", title: "Discount Calculator", description: "Analyze price savings and tax protocols.", icon: BadgePercent, color: "#10b981", category: "Finance" },
  { id: "duplicate-remover", title: "Duplicate Remover", description: "Clean lists and remove redundant lines.", icon: Minimize2, color: "#9ca3af", category: "Text" },
  { id: "emi-calculator", title: "EMI Calculator", description: "Loan interest and monthly payoff analysis.", icon: Wallet, color: "#d946ef", category: "Finance" },
  { id: "format-converter", title: "Format Converter", description: "Shift between JPG, PNG, WEBP instantly.", icon: ImageIcon, color: "#10b981", category: "Visuals" },
  { id: "image-compressor", title: "Image Compressor", description: "Lossless client-side image size reduction.", icon: FileImage, color: "#3b82f6", category: "Visuals" },
  { id: "image-to-pdf", title: "Image to PDF", description: "Merge multiple images into a clean PDF.", icon: FileText, color: "#6366f1", category: "Documents" },
  { id: "json-prettier", title: "JSON Prettier", description: "Format, validate, and clean JSON data.", icon: Code, color: "#eab308", category: "Developer" },
  { id: "lorem-ipsum", title: "Lorem Ipsum", description: "Professional placeholder text generator.", icon: Hash, color: "#71717a", category: "Text" },
  { id: "markdown-live", title: "Markdown Live", description: "Real-time MD editor with sleek preview.", icon: FileCode, color: "#0ea5e9", category: "Developer" },
  { id: "base-converter", title: "Number Base Converter", description: "Bidirectional Hex/Bin/Dec/Oct synthesis.", icon: Binary, color: "#06b6d4", category: "Developer" },
  { id: "pdf-to-image", title: "PDF to Image", description: "Extract high-res pages from any PDF.", icon: Layers, color: "#f43f5e", category: "Documents" },
  { id: "qr-builder", title: "QR Builder", description: "Modern, customizable QR code generator.", icon: QrCode, color: "#06b6d4", category: "Utility" },
  { id: "scientific-calculator", title: "Scientific Calculator", description: "Advanced mathematical processing engine.", icon: Calculator, color: "#3b82f6", category: "Math" },
  { id: "strong-password", title: "Strong Password", description: "Generate ultra-secure, random keys.", icon: Lock, color: "#64748b", category: "Security" },
  { id: "text-encryptor", title: "Text Encryptor/Decrypter", description: "Secure Base64/Hex/Rot13 client encryption.", icon: Shield, color: "#6366f1", category: "Security" },
  { id: "unit-converter", title: "Unit Converter", description: "Mass, Length, Temp - all in one place.", icon: ArrowLeftRight, color: "#d946ef", category: "Utility" },
  { id: "url-coder", title: "URL Encode/Decode", description: "Safe URL formatting for developers.", icon: Link2, color: "#84cc16", category: "Developer" },
  { id: "video-shrinker", title: "Video Shrinker", description: "FFmpeg-powered browser-side video compression.", icon: Video, color: "#f59e0b", category: "Media" },
  { id: "video-to-gif", title: "Video to GIF", description: "Convert moments into high-quality GIFs.", icon: Wind, color: "#8b5cf6", category: "Media" },
  { id: "word-counter", title: "Word Counter", description: "Detailed stats for your text content.", icon: Type, color: "#ef4444", category: "Text" },
];
