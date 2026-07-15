import { Reveal } from "./Reveal";
import { Lock, GitBranch, Zap } from "lucide-react";

const STEPS = [
  {
    verb: "Paste",
    title: "Drop in your prompt",
    body: "Whatever you would normally type into a chatbot. Rough, rambling, half-formed, full of typos. All of it is fine.",
  },
  {
    verb: "Refine",
    title: "Promptsmith rebuilds it",
    body: "It finds the role, the task and your constraints, then structures them into clean, labelled sections with sharper wording.",
  },
  {
    verb: "Copy",
    title: "Run the polished version",
    body: "Take the refined prompt straight to ChatGPT, Claude or Gemini. Same intent you started with, a noticeably better answer.",
  },
];

const PRINCIPLES = [
  {
    term: "A clear role",
    body: "Names the persona your request already implied, so the model answers from the right point of view.",
  },
  {
    term: "One explicit objective",
    body: "States the single job to be done up front, instead of burying it inside a paragraph.",
  },
  {
    term: "Only your context",
    body: "Keeps the facts and details you gave. It never invents audiences, numbers or requirements you did not write.",
  },
  {
    term: "Named constraints",
    body: "Pulls out length, tone and must-nots you mentioned and lists them where the model will actually respect them.",
  },
  {
    term: "A defined output format",
    body: "Makes the shape you asked for explicit, whether that is a list, a table, an email or plain prose.",
  },
  {
    term: "Your meaning, untouched",
    body: "Every instruction survives the rewrite. Structure and clarity change. The intent does not.",
  },
];

const TRUST = [
  { icon: Lock, title: "Nothing is stored", body: "Prompts are refined and returned. They are not logged, saved or used for training." },
  { icon: GitBranch, title: "Fully open source", body: "The whole tool, including the refiner, is on GitHub under the MIT license. Read it or self-host it." },
  { icon: Zap, title: "Free, no account", body: "No sign up, no credit card, no usage wall. Open the page and refine." },
];

export function Sections() {
  return (
    <>
      {/* HOW IT WORKS — editorial rows, no numbered boxes */}
      <section id="how" className="border-t border-line">
        <div className="u-container py-20 sm:py-24">
          <div className="grid gap-12 md:grid-cols-[0.9fr_1.4fr] md:gap-16">
            <Reveal>
              <div className="md:sticky md:top-28">
                <h2 className="font-display text-[2.1rem] font-semibold leading-tight tracking-tighter sm:text-[2.6rem]">
                  Three steps. No account.
                </h2>
                <p className="mt-4 max-w-sm text-pretty leading-relaxed text-muted">
                  There is no dashboard to learn and nothing to configure. Promptsmith does one thing
                  and does it cleanly.
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

      {/* PRINCIPLES — definition rows */}
      <section id="principles" className="border-t border-line bg-surface-2/40">
        <div className="u-container py-20 sm:py-24">
          <Reveal>
            <div className="max-w-2xl">
              <p className="u-label mb-4 text-accent">What good prompting looks like</p>
              <h2 className="text-balance font-display text-[2.1rem] font-semibold leading-tight tracking-tighter sm:text-[2.6rem]">
                The rules it applies to every prompt.
              </h2>
              <p className="mt-4 text-pretty leading-relaxed text-muted">
                These are the prompt-engineering fundamentals professionals reach for. Promptsmith
                applies the ones your request calls for, and skips the ones it does not.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-x-14 gap-y-0 border-t border-line sm:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.term} delay={(i % 2) * 0.06}>
                <div className="border-b border-line py-6">
                  <h3 className="font-display text-[1.25rem] font-semibold tracking-tight">
                    {p.term}
                  </h3>
                  <p className="mt-1.5 text-pretty leading-relaxed text-muted">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="border-t border-line">
        <div className="u-container py-16 sm:py-20">
          <div className="grid gap-8 sm:grid-cols-3">
            {TRUST.map((t, i) => (
              <Reveal key={t.title} delay={i * 0.06}>
                <div className="flex flex-col gap-3">
                  <t.icon size={22} className="text-accent" strokeWidth={1.8} />
                  <h3 className="font-display text-[1.2rem] font-semibold tracking-tight">
                    {t.title}
                  </h3>
                  <p className="text-pretty leading-relaxed text-muted">{t.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA — HireCheck style: one headline, subtext, buttons, mono trust line */}
      <section className="border-t border-line">
        <div className="u-container py-20 text-center sm:py-28">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-balance font-display text-[2.2rem] font-semibold leading-[1.08] tracking-tighter sm:text-[3rem]">
              Stop rewriting prompts by hand.{" "}
              <span className="text-accent">Refine the next one</span> in a second.
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-pretty leading-relaxed text-muted">
              Paste it, refine it, copy it. Free, open source, and it never touches what you meant.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#refiner"
                className="btn-accent inline-flex items-center gap-2 rounded-lg px-6 py-3 text-[0.98rem] font-semibold"
              >
                Refine a prompt
              </a>
              <a
                href="https://github.com/Carlos940703/promptsmith"
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
    </>
  );
}
