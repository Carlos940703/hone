import { Reveal } from "./Reveal";
import { Testimonials } from "./Testimonials";

const REPO = "https://github.com/Carlos940703/hone";

const STEPS = [
  {
    verb: "Paste",
    title: "Drop in your prompt",
    body: "Whatever you would normally type into a chatbot. Rough, rambling, half-formed, full of typos. It all works.",
  },
  {
    verb: "Refine",
    title: "Hone rebuilds it",
    body: "It finds the role, the task and your constraints, then structures them into clear sections with sharper wording. Your meaning stays put.",
  },
  {
    verb: "Copy",
    title: "Run the sharper version",
    body: "Take the refined prompt straight to ChatGPT, Claude or Gemini. Same intent you started with, a noticeably better answer.",
  },
];

function HowItWorks() {
  return (
    <section id="how" className="border-t border-line">
      <div className="u-container py-20 sm:py-24">
        <div className="grid gap-12 md:grid-cols-[0.9fr_1.4fr] md:gap-16">
          <Reveal>
            <div className="md:sticky md:top-28">
              <h2 className="font-display text-[2.1rem] font-semibold leading-tight tracking-tighter sm:text-[2.6rem]">
                Three steps. No account.
              </h2>
              <p className="mt-4 max-w-sm text-pretty leading-relaxed text-muted">
                There is nothing to set up and nothing to learn. Hone does one thing and does it
                cleanly.
              </p>
            </div>
          </Reveal>

          <div className="divide-y divide-line border-t border-line">
            {STEPS.map((s, i) => (
              <Reveal key={s.verb} delay={i * 0.06}>
                <div className="flex items-baseline gap-6 py-7">
                  <span className="font-mono text-[0.8rem] uppercase tracking-widest text-accent">
                    {s.verb}
                  </span>
                  <div>
                    <h3 className="font-display text-[1.4rem] font-semibold tracking-tight">
                      {s.title}
                    </h3>
                    <p className="mt-2 max-w-md text-pretty leading-relaxed text-muted">{s.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="border-t border-line">
      <div className="u-container py-20 text-center sm:py-28">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-balance font-display text-[2.2rem] font-semibold leading-[1.08] tracking-tighter sm:text-[3rem]">
            Stop rewriting prompts by hand. <span className="text-accent">Hone the next one</span> in
            a second.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-pretty leading-relaxed text-muted">
            Paste it, refine it, copy it. Free, open source, and it never touches what you meant.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#refiner"
              className="btn-accent inline-flex items-center gap-2 rounded-lg px-6 py-3 text-[0.98rem] font-semibold"
            >
              Sharpen a prompt
            </a>
            <a
              href={REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex items-center gap-2 rounded-lg px-6 py-3 text-[0.98rem] font-semibold"
            >
              View the source
            </a>
          </div>
          <p className="mt-7 font-mono text-[0.76rem] text-muted">
            no login · no cost · prompts never stored
          </p>
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
