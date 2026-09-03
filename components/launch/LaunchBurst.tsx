"use client";

import { useMemo, type CSSProperties } from "react";

type BurstStyle = CSSProperties & { "--bx"?: string; "--by"?: string };

const COLORS = ["#C99A3E", "#F7EDD8", "rgba(201,154,62,0.6)"];
const PARTICLE_COUNT = 28;

// One-shot burst, computed once per mount (not looping like the ambient
// SpiceParticles) — each particle flies outward from center at a random
// angle/distance and fades out.
export function LaunchBurst() {
  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => {
        const angle = (Math.PI * 2 * i) / PARTICLE_COUNT + Math.random() * 0.4;
        const distance = 140 + Math.random() * 220;
        return {
          id: i,
          bx: Math.cos(angle) * distance,
          by: Math.sin(angle) * distance,
          size: 4 + Math.random() * 8,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          delay: Math.random() * 0.25,
          duration: 1 + Math.random() * 0.6,
        };
      }),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center overflow-hidden">
      <div className="absolute h-6 w-6 rounded-full bg-on-dark [animation:burst-flash_0.8s_ease-out_forwards]" />
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="absolute rounded-full"
          style={
            {
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              animation: `burst-particle ${particle.duration}s ease-out ${particle.delay}s forwards`,
              "--bx": `${particle.bx}px`,
              "--by": `${particle.by}px`,
            } as BurstStyle
          }
        />
      ))}
    </div>
  );
}
