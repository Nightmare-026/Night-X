import { Metadata } from "next";

export const SEO_CONFIG: Metadata = {
  title: {
    default: "Night X | Elite Utility Hub",
    template: "%s | Night X"
  },
  description: "Night X is a free suite of 25+ powerful online tools — image compressor, QR builder, PDF converter, password generator, unit converter, and more. 100% browser-based, no signup required.",
  keywords: [
    "utility hub", "online tools", "developer tools", "image utilities", "video utilities", "night x", "free web tools",
    "password generator", "qr builder", "unit converter", "age calculator", "base64 master", "base converter", "cgpa calculator", 
    "case converter", "color palette", "discount calculator", "duplicate remover", "emi calculator", "image compressor", 
    "image converter", "image to pdf", "json prettier", "lorem ipsum", "markdown live", "pdf to image", "scientific calculator", 
    "text encryptor", "url coder", "video shrinker", "video to gif", "word counter", "web development tools", "free online utilities"
  ],
  authors: [{ name: "Night X Team" }],
  creator: "Night X",
  publisher: "Night X",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://night-x.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Night X | Elite Utility Hub",
    description: "Premium suite of 25+ high-performance online tools for productivity and development.",
    url: "https://night-x.vercel.app",
    siteName: "Night X",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-preview.png",
        width: 1200,
        height: 630,
        alt: "Night X Utility Hub Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Night X | Elite Utility Hub",
    description: "Access 25+ powerful web tools instantly — fast, free, and secure.",
    creator: "@nightx",
    images: ["/og-preview.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "googlecc74ad26c67f86dd", // Verified from googlecc74ad26c67f86dd.html
  },
  category: "technology",
};
