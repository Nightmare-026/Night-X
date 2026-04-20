import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security",
  description: "Night X security overview — how we protect your data with TLS encryption, client-side processing, and transparent infrastructure disclosures.",
};

export default function SecurityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
