import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Night X — a privacy-first, browser-based utility hub built with client-side processing, premium UI, and modular tool architecture.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
