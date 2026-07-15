import { Link } from "react-router-dom";
import { Github } from "lucide-react";
import { Wordmark } from "./Logo";

const REPO = "https://github.com/Carlos940703/hone";

const NAV = [
  { label: "How it works", href: "#how" },
  { label: "Reviews", href: "#reviews" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="u-container flex h-[70px] items-center justify-between">
        {/* wordmark nudged down a touch so it sits optically centred */}
        <Link to="/" className="translate-y-[2px]" aria-label="Hone home">
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-[0.95rem] font-medium text-muted transition-colors hover:text-ink"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <a
          href={REPO}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline inline-flex items-center gap-2 rounded-lg px-4 py-2 text-[0.9rem] font-semibold"
        >
          <Github size={16} strokeWidth={2} />
          <span className="hidden sm:inline">GitHub</span>
        </a>
      </div>
    </header>
  );
}
