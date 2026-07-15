/**
 * The refiner engine — shared by the Vercel serverless function (api/refine.ts)
 * and the Vite dev middleware. It is SERVER-ONLY: it holds the Groq key and is
 * never imported by client code. Given a rough prompt, it returns a cleaned-up,
 * professionally structured version WITHOUT changing the meaning or intent.
 */

export type Target = "any" | "chatgpt" | "claude" | "gemini";

export type RefineInput = { prompt?: unknown; target?: unknown };
export type RefineConfig = { keys: string; model: string };
export type RefineResult = { refined: string; changes: string[] };

export const MAX_INPUT = 8000;

const TARGET_NOTE: Record<Target, string> = {
  any: "Keep it model-agnostic; use structure that works well across ChatGPT, Claude and Gemini.",
  chatgpt:
    "Lightly optimise for OpenAI GPT models: clear role, explicit steps, and a defined output format.",
  claude:
    "Lightly optimise for Anthropic Claude: a clear role, well-scoped task, and where the content is long, you may group reference material under a clearly labelled section.",
  gemini:
    "Lightly optimise for Google Gemini: direct instructions, explicit output format, and unambiguous constraints.",
};

function systemPrompt(target: Target): string {
  return `You are Hone, an expert prompt engineer. You take a user's rough, raw prompt and rewrite it into a clean, professional, well-structured prompt that will get a better result from an AI model.

ABSOLUTE RULE — DO NOT CHANGE THE MEANING:
- Preserve the user's exact intent, task, scope, facts, tone requests and constraints. Every instruction in the original must survive in the refined version.
- Do NOT add new requirements, new constraints, new examples, new facts, or new context that the user did not provide. Do NOT invent details, audiences, formats or specifics they didn't ask for.
- Do NOT answer or fulfil the prompt. Your only job is to REWRITE the prompt itself.
- If the original is vague, keep it faithfully vague. Preserve the user's own qualitative wording: never convert a vague quality into a specific number, limit or value. For example, keep "not too long" as "keep it brief" or "keep it concise"; do NOT turn it into "under 150 words". Keep "make it good" as a quality goal, not an invented rubric.
- You may only add a short bracketed placeholder like [specify X] when a slot is clearly implied and unfilled, and never invent the value.

WHAT YOU MAY DO (structure and clarity only):
- Reorganise the prompt into clear, logical sections with fitting headings ONLY where the content justifies them (for example: Role, Objective, Context, Requirements, Constraints, Output format). Do not force every heading onto a short prompt; a one-line ask should stay short and clean.
- Improve grammar, spelling, wording and vocabulary so it reads clearly and professionally.
- Apply prompt-engineering best practices that are already implied by the user's request: state the role/persona they implied, make the task explicit, turn a wall of text into readable structure, and make any output format they asked for explicit.
- Use clean formatting (short paragraphs, bullet lists, numbered steps) where it aids clarity. Write section headings as bold markdown labels (for example **Role**, **Task**, **Output format**) and separate sections with a blank line so the prompt is easy to read. Do not use giant H1 (#) headings for every line.

${TARGET_NOTE[target]}

Never use em dashes. Keep the refined prompt tight and free of filler.

Return ONLY valid JSON, no markdown fences, in exactly this shape:
{
  "refined": "the full rewritten prompt as a single string, using \\n for line breaks and markdown-style headings/lists",
  "changes": ["3 to 6 short phrases naming what you improved, e.g. 'Added an explicit Role and Objective', 'Structured the requirements as a checklist', 'Tightened wording and fixed grammar' — each describes a STRUCTURE or CLARITY change, never a change of meaning"]
}`;
}

function pickKey(keys: string): string {
  const list = keys
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);
  if (list.length === 0) throw new Error("The refiner is not configured (no API key).");
  return list[Math.floor(Math.random() * list.length)];
}

function extractJson(text: string): RefineResult {
  let raw = text.trim();
  // strip accidental code fences
  raw = raw.replace(/^```(?:json)?/i, "").replace(/```$/i, "").trim();
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start !== -1 && end !== -1) raw = raw.slice(start, end + 1);
  const parsed = JSON.parse(raw);
  const refined = typeof parsed.refined === "string" ? parsed.refined.trim() : "";
  const changes = Array.isArray(parsed.changes)
    ? parsed.changes.filter((c: unknown) => typeof c === "string").slice(0, 6)
    : [];
  if (!refined) throw new Error("empty result");
  return { refined, changes };
}

export async function refinePrompt(
  input: RefineInput,
  config: RefineConfig
): Promise<RefineResult> {
  const prompt = typeof input.prompt === "string" ? input.prompt.trim() : "";
  const target: Target = (["any", "chatgpt", "claude", "gemini"] as const).includes(
    input.target as Target
  )
    ? (input.target as Target)
    : "any";

  if (!prompt) throw new Error("Paste a prompt to refine.");
  if (prompt.length > MAX_INPUT)
    throw new Error(`That prompt is a bit long. Keep it under ${MAX_INPUT} characters.`);

  const model = config.model?.trim() || "openai/gpt-oss-120b";

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${pickKey(config.keys)}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.3,
      max_tokens: 4000,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt(target) },
        {
          role: "user",
          content: `Rewrite the following prompt. Remember: do not change its meaning, do not answer it, only clean it up and structure it professionally.\n\n---\n${prompt}\n---`,
        },
      ],
    }),
  });

  if (!res.ok) {
    const detail = (await res.text().catch(() => "")).slice(0, 200);
    if (res.status === 429) throw new Error("The refiner is busy right now. Try again in a moment.");
    console.warn("Groq error", res.status, detail);
    throw new Error("The refiner could not process that. Please try again.");
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const content = data.choices?.[0]?.message?.content || "";
  try {
    return extractJson(content);
  } catch {
    // Model returned prose instead of JSON — treat it as the refined prompt.
    if (content.trim()) return { refined: content.trim(), changes: [] };
    throw new Error("The refiner returned an empty result. Please try again.");
  }
}
