"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

export function SanityImage({ className = "", onLoad, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent [animation-delay:-0.3s]" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent [animation-delay:-0.15s]" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          </div>
        </div>
      )}
      <Image
        {...props}
        className={`${className} transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={(event) => {
          setLoaded(true);
          onLoad?.(event);
        }}
      />
    </>
  );
}
