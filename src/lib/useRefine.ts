import { useCallback, useRef, useState } from "react";

export type Target = "any" | "chatgpt" | "claude" | "gemini";
export type RefineResult = { refined: string; changes: string[] };
export type Status = "idle" | "working" | "done" | "error";

/** The live step log — describes the real phases of one refine pass. Shown
 *  while the request is in flight so the work reads as deliberate, not a spinner. */
const STEPS = [
  "Reading your prompt and locking its intent",
  "Identifying the role, task and any constraints",
  "Structuring it into clean, labelled sections",
  "Tightening wording, grammar and vocabulary",
  "Formatting the final professional prompt",
];

export function useRefine() {
  const [status, setStatus] = useState<Status>("idle");
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<RefineResult | null>(null);
  const [error, setError] = useState("");
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  const refine = useCallback(async (prompt: string, target: Target) => {
    clearTimers();
    setStatus("working");
    setStep(0);
    setError("");
    setResult(null);

    // Advance the step log while the model works (caps before the last step so
    // it never claims to be finished before the response actually lands).
    STEPS.forEach((_, i) => {
      if (i === 0) return;
      const t = window.setTimeout(() => setStep((s) => Math.min(s + 1, STEPS.length - 2)), i * 850);
      timers.current.push(t);
    });

    try {
      const res = await fetch("/api/refine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, target }),
      });
      const data = await res.json();
      clearTimers();
      if (!res.ok) throw new Error(data?.error || "The refiner could not process that.");
      setStep(STEPS.length - 1);
      setResult({ refined: data.refined, changes: data.changes || [] });
      setStatus("done");
    } catch (e) {
      clearTimers();
      setError((e as Error).message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  }, []);

  const reset = useCallback(() => {
    clearTimers();
    setStatus("idle");
    setResult(null);
    setError("");
    setStep(0);
  }, []);

  return { status, step, steps: STEPS, result, error, refine, reset };
}
