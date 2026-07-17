import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { Wordmark } from "./Logo";

const REPO = "https://github.com/Carlos940703/hone";

const LINKS = [
  { label: "How it works", href: "#how" },
  { label: "Testimonials", href: "#testimonials" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-[clamp(0.75rem,3vw,1.5rem)] pt-[clamp(0.6rem,1.4vw,1rem)]">
      <nav
        className={cn(
          "relative z-50 mx-auto flex h-[3.6rem] max-w-[74rem] items-center justify-between gap-6 rounded-[1.25rem] border border-line bg-surface px-[clamp(1rem,2vw,1.5rem)] transition-shadow duration-300",
          scrolled
            ? "shadow-[0_16px_40px_-18px_rgba(21,22,26,0.34)]"
            : "shadow-[0_10px_28px_-18px_rgba(21,22,26,0.2)]"
        )}
      >
        <Link to="/" className="relative z-10 shrink-0" aria-label="Hone home">
          <Wordmark size="text-[1.55rem]" />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[0.95rem] text-muted transition-colors duration-150 hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={REPO}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ink inline-flex h-10 items-center gap-2 rounded-xl px-5 text-[0.95rem] font-medium"
        >
          <Github size={16} strokeWidth={2} />
          <span className="hidden sm:inline">Star on GitHub</span>
          <span className="sm:hidden">GitHub</span>
        </a>
      </nav>
    </header>
  );
}
