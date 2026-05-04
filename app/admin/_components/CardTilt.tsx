"use client";

import { useRef, useState } from "react";

export function CardTilt({
  children,
  className = "",
  max = 8,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const rx = -y * max;
    const ry = x * max;
    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.03) translateZ(20px)`;
  }

  function onEnter() {
    setHovered(true);
    const el = ref.current;
    if (el) {
      el.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1.03) translateZ(20px)";
    }
  }

  function onLeave() {
    setHovered(false);
    const el = ref.current;
    if (el) el.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1) translateZ(0)";
  }

  return (
    <div
      ref={ref}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`${className} ${hovered ? "shadow-[0_30px_80px_-15px_rgba(244,114,182,0.45)]" : ""}`}
      style={{
        transition: "transform 250ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 300ms ease-out",
        willChange: "transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
