/** Hone — a pure wordmark, no icon. The name carries the brand. */
export function Wordmark({
  className = "",
  size = "text-[1.6rem]",
}: {
  className?: string;
  size?: string;
}) {
  return (
    <span
      className={`font-display font-semibold tracking-tighter text-ink ${size} ${className}`}
    >
      Hone
    </span>
  );
}
