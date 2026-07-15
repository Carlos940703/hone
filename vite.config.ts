import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { refinePrompt } from "./api/_engine";

/**
 * Dev-only middleware that mirrors the Vercel serverless function at
 * /api/refine, so `npm run dev` exercises the real Groq call (keys read from
 * the local .env). In production Vercel serves api/refine.ts instead.
 */
function refineDevApi(env: Record<string, string>): Plugin {
  return {
    name: "refine-dev-api",
    configureServer(server) {
      server.middlewares.use("/api/refine", async (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: "Method not allowed" }));
          return;
        }
        let body = "";
        req.on("data", (c) => (body += c));
        req.on("end", async () => {
          try {
            const { prompt, target } = JSON.parse(body || "{}");
            const out = await refinePrompt(
              { prompt, target },
              { keys: env.GROQ_API_KEYS || "", model: env.GROQ_MODEL || "" }
            );
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(out));
          } catch (err) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: (err as Error).message }));
          }
        });
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), refineDevApi(env)],
    resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
    server: {
      host: true,
      port: process.env.PORT ? Number(process.env.PORT) : undefined,
    },
  };
});
