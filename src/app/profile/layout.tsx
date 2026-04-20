import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Account",
  description: "Manage your Night X account — view profile details, session info, and account settings.",
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
