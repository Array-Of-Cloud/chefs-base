"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SpiceParticles } from "@/components/ui/SpiceParticles";
import { LaunchBurst } from "@/components/launch/LaunchBurst";

interface ComingSoonScreenProps {
  canLaunch: boolean;
  logoUrl?: string;
}

export function ComingSoonScreen({ canLaunch, logoUrl }: ComingSoonScreenProps) {
  const [phase, setPhase] = useState<"idle" | "revealing">("idle");
  const router = useRouter();

  async function handleLaunch() {
    if (!canLaunch || phase !== "idle") return;
    setPhase("revealing");

    try {
      await fetch("/api/launch", { method: "POST" });
    } catch {
      // The animation still plays either way — if this failed, the site
      // stays gated and the button (still visible to this device via the
      // bypass cookie) can simply be tried again.
    }

    setTimeout(() => {
      router.push("/");
    }, 4200);
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-primary px-6 text-center text-on-dark">
      <SpiceParticles />
      {phase === "revealing" && <LaunchBurst />}

      <div className="relative z-10 flex flex-col items-center gap-6">
        {phase === "revealing" && logoUrl ? (
          <Image
            src={logoUrl}
            alt="Chefs Base"
            width={220}
            height={220}
            className="opacity-0 [animation:logo-reveal_0.9s_ease-out_forwards] [animation-delay:0.6s]"
          />
        ) : (
          <span className="font-serif text-3xl italic text-on-dark">Chefs Base</span>
        )}

        <span className="font-sans text-sm uppercase tracking-[0.3em] text-accent">
          {phase === "idle" ? "Launching Soon" : "Now Live"}
        </span>
        <div className="h-px w-16 bg-accent" />

        {phase === "idle" && (
          <>
            <h1 className="max-w-xl font-serif text-4xl italic leading-tight text-on-dark sm:text-5xl">
              Something authentic is on its way.
            </h1>
            <p className="max-w-md font-sans text-on-dark/70">
              Crafted in Malabar, created for the world.
            </p>
          </>
        )}

        {phase === "revealing" && (
          <p className="max-w-md font-sans text-on-dark/70 opacity-0 [animation:fade-up_0.7s_ease-out_forwards] [animation-delay:1.2s]">
            Welcome to Chefs Base — taking you there now.
          </p>
        )}

        {canLaunch && phase === "idle" && (
          <button
            onClick={handleLaunch}
            className="mt-4 animate-pulse rounded-full border-2 border-accent px-10 py-4 font-sans text-sm uppercase tracking-[0.2em] text-accent transition-colors hover:bg-accent hover:text-on-light"
          >
            Launch the Website
          </button>
        )}
      </div>
    </main>
  );
}
