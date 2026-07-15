import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";

type Quote = { text: string; name: string; role: string; accent?: boolean };

// Illustrative reviews — placeholders to swap for real user quotes.
const QUOTES: Quote[] = [
  { text: "I stopped rewriting my prompts five times. I paste the rough version, hone it, and the answer is just there.", name: "Maya R.", role: "Product Designer", accent: true },
  { text: "It kept exactly what I meant and made it read like something I would actually send. Weirdly satisfying.", name: "Devin T.", role: "Software Engineer" },
  { text: "I use ChatGPT all day for client work. Hone makes my prompts sound like I know what I am doing.", name: "Priya S.", role: "Freelance Copywriter" },
  { text: "The 'what changed' list is the part I did not know I needed. I can see it never touched my intent.", name: "Marcus L.", role: "Founder" },
  { text: "Sent it to my whole team. Nobody has to learn prompt engineering now.", name: "Elena K.", role: "Marketing Lead", accent: true },
  { text: "Free, no login, and it just works. Refreshing.", name: "Sam O.", role: "Student" },
  { text: "Turned my messy two-line ask into a clean brief. The output quality jumped noticeably.", name: "Tomas V.", role: "Data Analyst" },
  { text: "I write worse prompts at 1am. Hone fixes them so I do not have to think.", name: "Grace H.", role: "Researcher" },
  { text: "It is the first prompt tool that did not rewrite my idea into something I never asked for.", name: "Noah B.", role: "Indie Hacker", accent: true },
];

function initials(name: string) {
  return name.replace(/[^A-Za-z ]/g, "").split(" ").map((p) => p[0]).slice(0, 2).join("");
}

function Card({ q }: { q: Quote }) {
  return (
    <figure className="u-card w-full p-6">
      <blockquote className="text-[0.96rem] leading-relaxed text-ink">{q.text}</blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-full text-[0.78rem] font-semibold ${
            q.accent ? "bg-accent-wash text-accent" : "bg-surface-2 text-ink"
          }`}
        >
          {initials(q.name)}
        </span>
        <span className="leading-tight">
          <span className="block text-[0.9rem] font-semibold text-ink">{q.name}</span>
          <span className="block text-[0.82rem] text-muted">{q.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

function Column({ items, duration }: { items: Quote[]; duration: number }) {
  const reduce = useReducedMotion();
  return (
    <div className="relative h-full">
      <motion.div
        className="flex flex-col gap-5"
        animate={reduce ? undefined : { y: ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear", repeatType: "loop" }}
      >
        {[...items, ...items].map((q, i) => (
          <Card key={i} q={q} />
        ))}
      </motion.div>
    </div>
  );
}

export function Testimonials() {
  const cols = [QUOTES.slice(0, 3), QUOTES.slice(3, 6), QUOTES.slice(6, 9)];
  const speeds = [30, 38, 34];
  const mask =
    "linear-gradient(180deg, transparent, #000 14%, #000 86%, transparent)";

  return (
    <section id="reviews" className="border-t border-line bg-surface-2/40">
      <div className="u-container py-20 sm:py-24">
        <Reveal>
          <div className="max-w-2xl">
            <h2 className="text-balance font-display text-[2.1rem] font-semibold leading-tight tracking-tighter sm:text-[2.6rem]">
              Loved by people who prompt all day.
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted">
              Developers, writers, marketers and students who would rather paste once than rewrite
              five times.
            </p>
          </div>
        </Reveal>

        <div
          className="relative mt-12 grid h-[460px] grid-cols-1 gap-5 overflow-hidden sm:grid-cols-2 lg:grid-cols-3"
          style={{ maskImage: mask, WebkitMaskImage: mask }}
        >
          {cols.map((items, i) => (
            <div key={i} className={i === 2 ? "hidden lg:block" : i === 1 ? "hidden sm:block" : ""}>
              <Column items={items} duration={speeds[i]} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
