# Promptsmith

A free, open-source tool that rewrites your rough prompt into a clean, professional AI instruction, **without changing what you meant.**

Paste anything you would type into ChatGPT, Claude or Gemini. Promptsmith finds the role, task and constraints hiding in your text, restructures them into clear labelled sections, tightens the wording, and hands back a polished prompt you can run for a better result. No login. No cost. Your prompts are never stored.

**Live:** https://promptsmith-sandy.vercel.app

## How it works

1. **Paste** your prompt. Rough, rambling, half-formed: it all works.
2. **Refine** using an open-weight model (via Groq) rewrites it using prompt-engineering best practices, preserving every instruction and adding nothing you didn't say.
3. **Copy** the professional version and run it.

## Stack

- Vite + React 18 + TypeScript + Tailwind CSS v3
- framer-motion, lucide-react
- A single Vercel serverless function (`api/refine.ts`) that holds the API key server-side and calls Groq. The key never reaches the browser.

## Run it yourself

```bash
npm install
cp .env.example .env      # add your free Groq key from console.groq.com/keys
npm run dev
```

The dev server mirrors the production `/api/refine` endpoint locally, so refining works end to end with `npm run dev`.

## Deploy

Deploys to Vercel as-is. Set two environment variables in the project:

- `GROQ_API_KEYS`: one or more Groq keys, comma-separated for rotation
- `GROQ_MODEL`: e.g. `openai/gpt-oss-120b`

## License

MIT. Use it, fork it, self-host it.
