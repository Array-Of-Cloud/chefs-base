import type { SVGProps } from "react";

export function BadgeCheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2.5l2.34 1.4 2.72-.24 1.02 2.53 2.28 1.51-.7 2.66.7 2.66-2.28 1.51-1.02 2.53-2.72-.24L12 21.5l-2.34-1.4-2.72.24-1.02-2.53-2.28-1.51.7-2.66-.7-2.66 2.28-1.51 1.02-2.53 2.72.24L12 2.5Z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.5l2 2 4-4.5" />
    </svg>
  );
}
