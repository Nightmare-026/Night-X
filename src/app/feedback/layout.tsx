import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feedback",
  description: "Share feedback, report bugs, or suggest new features for Night X. Your input helps us improve the platform.",
};

export default function FeedbackLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
