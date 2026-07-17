import { Link } from "react-router-dom";
import { Github } from "lucide-react";
import { Wordmark } from "./Logo";

const REPO = "https://github.com/Carlos940703/hone";

const COLS: { title: string; links: { label: string; to: string; ext?: boolean }[] }[] = [
  {
    title: "Tool",
    links: [
      { label: "Sharpen a prompt", to: "/#refiner" },
      { label: "How it works", to: "/#how" },
      { label: "Testimonials", to: "/#testimonials" },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "Source on GitHub", to: REPO, ext: true },
      { label: "Report an issue", to: `${REPO}/issues`, ext: true },
      { label: "MIT license", to: `${REPO}/blob/main/LICENSE`, ext: true },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", to: "/privacy" },
      { label: "Terms", to: "/terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="u-container py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_2fr]">
          <div>
            <Wordmark size="text-[1.35rem]" />
            <p className="mt-4 max-w-sm text-[0.95rem] leading-relaxed text-muted">
              A free, open-source tool that rewrites rough prompts into clean, professional
              instructions. Your meaning stays. The clarity improves.
            </p>
            <p className="mt-4 text-[0.8rem] font-medium text-muted">
              Free forever. No account. Prompts are never stored.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLS.map((col) => (
              <div key={col.title}>
                <div className="u-label mb-3.5">{col.title}</div>
                <ul className="space-y-2.5">
                  {col.links.map((l) =>
                    l.ext ? (
                      <li key={l.label}>
                        <a
                          href={l.to}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[0.92rem] text-muted transition-colors hover:text-ink"
                        >
                          {l.label}
                        </a>
                      </li>
                    ) : (
                      <li key={l.label}>
                        <Link
                          to={l.to}
                          className="text-[0.92rem] text-muted transition-colors hover:text-ink"
                        >
                          {l.label}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="text-[0.82rem] text-muted">
            © {new Date().getFullYear()} Hone. Open source under the MIT license.
          </p>
          <div className="flex items-center gap-4">
            <span className="u-tabular text-[0.74rem] text-muted">built for better prompts</span>
            <a
              href={REPO}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-muted transition-colors hover:text-ink"
            >
              <Github size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
