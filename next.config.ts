import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Apply COEP/COOP ONLY to tool pages that use FFmpeg WASM (which requires SharedArrayBuffer)
        // These headers must NOT be applied globally because they break Firebase Auth popup flows.
        source: "/tools/:path*",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
