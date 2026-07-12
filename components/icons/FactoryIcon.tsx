import type { SVGProps } from "react";

export function FactoryIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.5 20.5v-8l5.5 3.5v-3.5l5.5 3.5V9l6-3.5v15H3.5Z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 20.5h17" />
    </svg>
  );
}
