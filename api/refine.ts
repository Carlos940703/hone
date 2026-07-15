/**
 * POST /api/refine — Vercel serverless endpoint. Holds the Groq key server-side
 * (the repo is public, so the key never ships to the browser) and applies a
 * best-effort per-IP rate limit to keep this free tool from being abused.
 */
import { refinePrompt } from "./_engine";

// Best-effort in-memory limiter. Serverless instances are ephemeral and may
// scale out, so this deters casual abuse rather than guaranteeing a hard cap.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 12;
const hits = new Map<string, number[]>();

function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // crude memory guard
  return recent.length > MAX_PER_WINDOW;
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const ip =
    (req.headers["x-forwarded-for"]?.split(",")[0] || "").trim() ||
    req.socket?.remoteAddress ||
    "unknown";
  if (limited(ip)) {
    res.status(429).json({ error: "You are refining very fast. Give it a few seconds." });
    return;
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    const out = await refinePrompt(
      { prompt: body.prompt, target: body.target },
      { keys: process.env.GROQ_API_KEYS || "", model: process.env.GROQ_MODEL || "" }
    );
    res.status(200).json(out);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message || "Something went wrong." });
  }
}
