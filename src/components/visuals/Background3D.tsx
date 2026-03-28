"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const Background3D = () => {
  const [isMounted, setIsMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 100 };
  const sx = useSpring(mouseX, springConfig);
  const sy = useSpring(mouseY, springConfig);
  const sx2 = useSpring(mouseX, { damping: 30 });
  const sy2 = useSpring(mouseY, { damping: 30 });

  const [particles] = useState(() => 
    [...Array(20)].map(() => ({
      width: Math.random() * 40 + 10,
      height: Math.random() * 40 + 10,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 20 + 20,
      x: [0, Math.random() * 100 - 50, 0],
      y: [0, -Math.random() * 100 - 50, 0],
    }))
  );

  useEffect(() => {
    setTimeout(() => setIsMounted(true), 0);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-night-black">
      {/* Mesh Gradients */}
      <motion.div
        style={{ x: sx, y: sy }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-night-indigo/20 rounded-full blur-[120px]"
      />
      <motion.div
        style={{ x: sx2, y: sy2 }}
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-night-emerald/10 rounded-full blur-[150px]"
      />

      {/* Floating 3D Elements (CSS Particles) */}
      <div className="absolute inset-0 opacity-30">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-white/5 bg-gradient-to-br from-white/10 to-transparent shadow-2xl"
            style={{
              width: p.width,
              height: p.height,
              left: p.left,
              top: p.top,
            }}
            animate={{
              y: p.y,
              x: p.x,
              rotate: [0, 360],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Noise Texture Overaly (Restored with local filter class) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-matte-grain" />
    </div>
  );
};
