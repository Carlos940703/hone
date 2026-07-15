import { Link } from "react-router-dom";
import { Github, Star } from "lucide-react";
import { Logo } from "./Logo";

const REPO = "https://github.com/Carlos940703/promptsmith";

const NAV = [
  { label: "The refiner", href: "#refiner" },
  { label: "How it works", href: "#how" },
  { label: "Principles", href: "#principles" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="u-container flex h-[70px] items-center justify-between">
        {/* logo nudged down a touch so it sits optically centred, not top-stuck */}
        <Link to="/" className="translate-y-[2px]" aria-label="Promptsmith home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-[0.92rem] font-medium text-muted transition-colors hover:text-ink"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <a
          href={REPO}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-[0.9rem] font-semibold"
        >
          <Github size={16} strokeWidth={2} />
          <span className="hidden sm:inline">Star on GitHub</span>
          <span className="sm:hidden">GitHub</span>
          <Star size={13} className="hidden text-accent sm:inline" fill="var(--accent)" />
        </a>
      </div>
    </header>
  );
}
