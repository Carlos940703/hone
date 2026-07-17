import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "outline" | "ghost";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  withArrow?: boolean;
  as?: "button" | "a";
  href?: string;
}

/* Flat buttons — always black/white. Hover darkens fill or border. */
const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-xl text-[0.9375rem] font-medium leading-none transition-[background-color,border-color,color,transform] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg active:translate-y-px disabled:pointer-events-none disabled:opacity-50 px-6 h-12";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-white hover:bg-[#2a2b31]",
  outline: "border border-line bg-transparent text-ink hover:border-ink/40 hover:bg-surface",
  ghost: "text-ink hover:bg-surface-2",
};

export function Button({
  variant = "primary",
  withArrow = false,
  className,
  children,
  as = "button",
  href,
  ...props
}: ButtonProps) {
  const content = (
    <>
      <span>{children}</span>
      {withArrow && (
        <ArrowRight
          className="size-4 transition-transform duration-150 ease-out group-hover/btn:translate-x-0.5"
          strokeWidth={2}
        />
      )}
    </>
  );
  if (as === "a") {
    return (
      <a href={href} className={cn(base, variants[variant], className)}>
        {content}
      </a>
    );
  }
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {content}
    </button>
  );
}
