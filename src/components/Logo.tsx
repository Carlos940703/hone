/** The Promptsmith mark: an ink block with an ember chevron — "refine forward".
 *  Typographic and craft-like, no AI sparkles. */
export function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="0" y="0" width="40" height="40" rx="11" fill="var(--ink)" />
      <path
        d="M13 12.5 L20.5 20 L13 27.5"
        stroke="var(--accent)"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 12.5 L29.5 20 L22 27.5"
        stroke="#fff"
        strokeOpacity="0.9"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={34} />
      <span className="font-display text-[1.42rem] font-semibold tracking-tighter text-ink">
        Promptsmith
      </span>
    </span>
  );
}
