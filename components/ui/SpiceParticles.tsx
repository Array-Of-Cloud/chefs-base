"use client";

import { useEffect, useState, type CSSProperties } from "react";

interface Particle {
  id: number;
  left: number;
  top: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
  sway: number;
  opacity: number;
  hideOnMobile: boolean;
}

type ParticleStyle = CSSProperties & { "--sway"?: string };

const COLORS = ["#C99A3E", "#1C1C1A", "rgba(201,154,62,0.3)"];
const PARTICLE_COUNT = 12;

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function SpiceParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        id: i,
        left: randomBetween(4, 96),
        top: randomBetween(4, 96),
        size: randomBetween(4, 10),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        duration: randomBetween(4, 9),
        delay: randomBetween(0, 5),
        sway: Math.random() > 0.5 ? 8 : -8,
        opacity: randomBetween(0.15, 0.5),
        // First 6 stay on mobile; the rest only show at md+ ("reduce to 6 on mobile").
        hideOnMobile: i >= 6,
      })),
    );
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className={`absolute rounded-full ${particle.hideOnMobile ? "hidden md:block" : ""}`}
          style={
            {
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              opacity: particle.opacity,
              animation: `spice-drift ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
              "--sway": `${particle.sway}px`,
            } as ParticleStyle
          }
        />
      ))}
    </div>
  );
}
