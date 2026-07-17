import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Copy, RotateCcw, AlertCircle, ShieldCheck, Wand2 } from "lucide-react";
import { useRefine, type Target } from "@/lib/useRefine";

const MAX = 8000;

/** Render **bold** headings as bold (no literal asterisks); Copy still copies
 *  the raw markdown. Whitespace preserved by the pre-wrap container. */
function renderRefined(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((seg, i) => {
    if (seg.startsWith("**") && seg.endsWith("**") && seg.length > 4) {
      return (
        <strong key={i} className="font-semibold text-ink">
          {seg.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{seg}</span>;
  });
}

const TARGETS: { id: Target; label: string }[] = [
  { id: "any", label: "Any model" },
  { id: "chatgpt", label: "ChatGPT" },
  { id: "claude", label: "Claude" },
  { id: "gemini", label: "Gemini" },
];

const EXAMPLES: { label: string; text: string }[] = [
  {
    label: "Write a cold email",
    text: "write me a cold email to sell my web design service to local restaurants make it good and not too long",
  },
  {
    label: "Summarise a report",
    text: "summarize this report for my boss, pull out the important stuff and what we should do next",
  },
  {
    label: "Debug some code",
    text: "my react app keeps crashing when i submit the form help me figure out whats wrong",
  },
];

export function Tool() {
  const [text, setText] = useState("");
  const [target, setTarget] = useState<Target>("any");
  const [copied, setCopied] = useState(false);
  const { status, step, steps, result, error, refine, reset } = useRefine();
  const reduce = useReducedMotion();

  const busy = status === "working";
  const chars = text.length;
  const canRefine = chars > 0 && chars <= MAX && !busy;
  const doRefine = () => canRefine && refine(text, target);

  const copy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result.refined);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const startOver = () => {
    reset();
    setText("");
  };

  return (
    <section
      id="refiner"
      className="flex min-h-[100svh] flex-col justify-center pb-14 pt-[clamp(7rem,13vh,8.5rem)]"
    >
      <div className="u-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="u-label mb-5">Free · open source · no login</p>
          <h1 className="text-balance font-display text-[clamp(2.5rem,4.5vw+0.4rem,4rem)] font-bold leading-[1.02] tracking-tightest text-ink">
            Every prompt, <span className="text-beige">sharpened</span>.
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-pretty text-[1.05rem] leading-relaxed text-muted">
            Paste a rough prompt. Hone rewrites it into a clear, professional instruction, without
            changing what you meant.
          </p>
        </div>

        {/* the workbench */}
        <div className="u-card u-frame-shadow mx-auto mt-9 w-full max-w-3xl overflow-hidden">
          <div className="border-b border-line px-4 pt-4 sm:px-6">
            <div className="flex items-center justify-between py-3">
              <span className="u-label !text-[0.68rem]">Your prompt</span>
              <span className={`u-tabular text-[0.72rem] ${chars > MAX ? "text-neg" : "text-muted"}`}>
                {chars}/{MAX}
              </span>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if ((e.metaKey || e.ctrlKey) && e.key === "Enter") doRefine();
              }}
              placeholder="e.g. write a landing page headline for my ai note taking app for students, make it catchy and clear..."
              spellCheck={false}
              className="min-h-[150px] w-full resize-y bg-transparent pb-4 text-[0.95rem] leading-relaxed text-ink outline-none placeholder:text-muted/60"
            />
            {!text && (
              <div className="flex flex-wrap items-center gap-2 pb-4">
                <span className="text-[0.78rem] text-muted">Try:</span>
                {EXAMPLES.map((ex) => (
                  <button
                    key={ex.label}
                    onClick={() => setText(ex.text)}
                    className="btn-outline rounded-full px-3 py-1 text-[0.78rem] font-medium"
                  >
                    {ex.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex items-center gap-1 rounded-lg bg-surface-2 p-1">
              {TARGETS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTarget(t.id)}
                  className={`rounded-md px-3 py-1.5 text-[0.8rem] font-semibold transition-colors ${
                    target === t.id ? "bg-surface text-ink shadow-sm" : "text-muted hover:text-ink"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <button
              onClick={doRefine}
              disabled={!canRefine}
              className="btn-ink inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-[0.95rem] font-medium"
            >
              <Wand2 size={17} strokeWidth={2.2} />
              {busy ? "Refining..." : "Refine prompt"}
              {!busy && <ArrowRight size={16} strokeWidth={2.2} />}
            </button>
          </div>
        </div>

        <p className="mx-auto mt-4 text-center text-[0.85rem] text-muted">
          Free forever · no login · your prompts are never stored
        </p>

        {/* live step log + result */}
        <div className="mx-auto max-w-3xl">
          <AnimatePresence mode="wait">
            {busy && (
              <motion.div
                key="steps"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0.2 : 0.4 }}
                className="u-card mt-5 p-5 sm:p-6"
              >
                <ul className="space-y-2.5">
                  {steps.map((s, i) => {
                    const state = i < step ? "done" : i === step ? "active" : "wait";
                    return (
                      <li key={s} className="flex items-center gap-3">
                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[0.7rem] ${
                            state === "done"
                              ? "bg-pos-wash text-pos"
                              : state === "active"
                              ? "bg-accent-wash text-accent"
                              : "bg-surface-2 text-muted"
                          }`}
                        >
                          {state === "done" ? (
                            <Check size={12} strokeWidth={3} />
                          ) : (
                            <span className={state === "active" ? "smith-pulse" : ""}>•</span>
                          )}
                        </span>
                        <span className={`text-[0.9rem] ${state === "wait" ? "text-muted" : "text-ink"}`}>
                          {s}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="u-card mt-5 flex items-start gap-3 border-neg/25 p-5"
              >
                <AlertCircle size={19} className="mt-0.5 shrink-0 text-neg" />
                <div>
                  <p className="text-[0.95rem] font-semibold text-ink">Couldn't refine that</p>
                  <p className="mt-1 text-[0.9rem] text-muted">{error}</p>
                  <button
                    onClick={doRefine}
                    className="btn-outline mt-3 inline-flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-[0.85rem] font-semibold"
                  >
                    <RotateCcw size={14} /> Try again
                  </button>
                </div>
              </motion.div>
            )}

            {status === "done" && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduce ? 0.2 : 0.5 }}
                className="mt-5"
              >
                <div className="u-card u-frame-shadow overflow-hidden">
                  <div className="flex items-center justify-between border-b border-line bg-surface-2/50 px-5 py-3">
                    <span className="inline-flex items-center gap-2 u-label !text-[0.68rem] !text-ink">
                      <ShieldCheck size={14} className="text-pos" /> Refined prompt
                    </span>
                    <button
                      onClick={copy}
                      className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[0.8rem] font-semibold transition-colors ${
                        copied ? "text-pos" : "btn-outline"
                      }`}
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <div className="smith-out max-h-[60vh] overflow-y-auto px-5 py-5 sm:px-6">
                    {renderRefined(result.refined)}
                  </div>
                </div>

                {result.changes.length > 0 && (
                  <div className="u-card mt-4 p-5 sm:p-6">
                    <p className="u-label mb-3.5">What changed · meaning kept intact</p>
                    <ul className="grid gap-2.5 sm:grid-cols-2">
                      {result.changes.map((c, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-[0.9rem] text-ink">
                          <Check size={15} className="mt-0.5 shrink-0 text-accent" strokeWidth={2.6} />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    onClick={() => refine(text, target)}
                    className="btn-outline inline-flex items-center gap-2 rounded-xl px-4 py-2 text-[0.88rem] font-semibold"
                  >
                    <RotateCcw size={15} /> Refine again
                  </button>
                  <button
                    onClick={startOver}
                    className="btn-outline inline-flex items-center gap-2 rounded-xl px-4 py-2 text-[0.88rem] font-semibold"
                  >
                    New prompt
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
