import { ClipboardPaste, Wand2, Copy } from "lucide-react";
import { Reveal } from "./Reveal";
import { Testimonials } from "./Testimonials";
import { Button } from "./ui/Button";

const REPO = "https://github.com/Carlos940703/hone";

const STEPS = [
  {
    Icon: ClipboardPaste,
    title: "Paste your prompt",
    body: "Rough, rambling, half-formed, full of typos. Whatever you would normally type into a chatbot. It all works.",
  },
  {
    Icon: Wand2,
    title: "Hone rebuilds it",
    body: "It finds the role, the task and your constraints, then structures them into clean sections with sharper wording. Your meaning stays put.",
  },
  {
    Icon: Copy,
    title: "Run the sharper version",
    body: "Take the refined prompt straight to ChatGPT, Claude or Gemini. Same intent you started with, a noticeably better answer.",
  },
];

function HowItWorks() {
  return (
    <section id="how" className="border-t border-line bg-surface-2 py-[clamp(5rem,12vw,9rem)]">
      <div className="u-container">
        <Reveal>
          <h2 className="max-w-2xl font-display text-[clamp(2rem,4.4vw,3rem)] font-bold leading-[1.06] tracking-tighter text-ink text-balance">
            Three steps. <span className="text-beige">No account.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="group">
                <span className="grid size-12 place-items-center rounded-xl bg-beige-wash text-accent transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:scale-105">
                  <s.Icon className="size-[1.4rem]" strokeWidth={2} />
                </span>
                <h3 className="mt-5 text-[1.125rem] font-semibold tracking-tight text-ink">{s.title}</h3>
                <p className="mt-2 text-[0.975rem] leading-[1.55] text-muted text-pretty">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="border-t border-line py-[clamp(5rem,12vw,10rem)]">
      <div className="u-container">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.04] tracking-tightest text-ink text-balance">
              Stop rewriting prompts by hand. <span className="text-beige">Hone the next one</span> in
              a second.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[clamp(1.0625rem,0.5vw+0.95rem,1.3rem)] leading-[1.6] text-muted text-pretty">
              Paste it, refine it, copy it. Free, open source, and it never touches what you meant.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Button as="a" href="#refiner" withArrow>
                Sharpen a prompt
              </Button>
              <Button as="a" href={REPO} variant="outline">
                View the source
              </Button>
            </div>
            <p className="u-tabular mt-6 text-[0.75rem] text-muted">
              No login · no cost · prompts never stored
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Sections() {
  return (
    <>
      <HowItWorks />
      <Testimonials />
      <CTA />
    </>
  );
}
