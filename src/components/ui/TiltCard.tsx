"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  color: string;
  className?: string;
  onClick?: () => void;
}

export const TiltCard = ({ children, color, className = "", onClick }: TiltCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
  }, []);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isTouchDevice) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX: isTouchDevice ? 0 : rotateX,
        rotateY: isTouchDevice ? 0 : rotateY,
        transformStyle: "preserve-3d",
        "--glow-color": color,
      } as React.CSSProperties}
      whileHover={isTouchDevice ? {} : { scale: 1.02 }}
      className={`group relative glass-card glow-border overflow-hidden rounded-[2rem] ${className}`}
    >
      {/* Glossy Overlay Reflection */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-500 overflow-hidden"
        style={{
          background: `linear-gradient(105deg, transparent 40%, white 50%, transparent 60%)`,
          backgroundSize: "200% 100%",
          animation: "shimmer 2s infinite"
        }}
      />
      
      {/* Content Container (Preserve-3D) */}
      <div className="relative z-10 w-full h-full" style={{ transform: "translateZ(0px)" }}>
        {children}
      </div>
    </motion.div>
  );
};
