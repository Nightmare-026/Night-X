import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Understand how Night X collects, uses, and protects your personal data. We are committed to transparency and DPDP Act 2023 compliance.",
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
