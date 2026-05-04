"use client";

import { useState } from "react";

export function AgentAvatar({
  name,
  src,
  size = 56,
  ringColor = "border-pink-200",
  bg = "bg-pink-100 text-pink-600",
}: {
  name: string;
  src?: string;
  size?: number;
  ringColor?: string;
  bg?: string;
}) {
  const [broken, setBroken] = useState(false);
  const showImg = src && !broken;
  const initial = name.charAt(0).toUpperCase();

  return (
    <div
      className={`relative shrink-0 rounded-full overflow-hidden border ${ringColor} shadow-sm`}
      style={{ width: size, height: size }}
    >
      {showImg ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={name}
          width={size}
          height={size}
          className="w-full h-full object-cover"
          onError={() => setBroken(true)}
        />
      ) : (
        <div className={`w-full h-full ${bg} flex items-center justify-center font-bold`}
          style={{ fontFamily: "var(--font-playfair)", fontSize: size * 0.5 }}>
          {initial}
        </div>
      )}
    </div>
  );
}
