import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";

type Item = { text: string; image: string; name: string; role: string };

// Illustrative testimonials — placeholders to swap for real quotes.
const TESTIMONIALS: Item[] = [
  {
    text: "I stopped rewriting my prompts five times. I paste the rough version, hone it, and the answer is just there.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    name: "Maya Ellison",
    role: "Product Designer",
  },
  {
    text: "It kept exactly what I meant and made it read like something I would actually send. Weirdly satisfying.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Devin Tran",
    role: "Software Engineer",
  },
  {
    text: "I use ChatGPT all day for client work. Hone makes my prompts sound like I know what I am doing.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Priya Raman",
    role: "Freelance Copywriter",
  },
  {
    text: "The 'what changed' list is the part I did not know I needed. I can see it never touched my intent.",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    name: "Marcus Vela",
    role: "Founder",
  },
  {
    text: "Sent it to my whole team. Nobody has to learn prompt engineering now.",
    image: "https://randomuser.me/api/portraits/women/24.jpg",
    name: "Elena Fischer",
    role: "Marketing Lead",
  },
  {
    text: "Free, no login, and it just works. Refreshing.",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
    name: "Sam Okoro",
    role: "Student",
  },
  {
    text: "Turned my messy two-line ask into a clean brief. The output quality jumped noticeably.",
    image: "https://randomuser.me/api/portraits/women/90.jpg",
    name: "Sara Lindqvist",
    role: "Data Analyst",
  },
  {
    text: "It is the first prompt tool that did not rewrite my idea into something I never asked for.",
    image: "https://randomuser.me/api/portraits/men/14.jpg",
    name: "Noah Berg",
    role: "Indie Hacker",
  },
  {
    text: "I write worse prompts at 1am. Hone fixes them so I do not have to think.",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    name: "Grace Huang",
    role: "Researcher",
  },
];

function Column({ items, duration, className }: { items: Item[]; duration: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div className={className}>
      <motion.div
        animate={reduce ? undefined : { translateY: "-50%" }}
        transition={{ duration, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        className="flex flex-col gap-5 pb-5"
      >
        {[0, 1].map((dup) => (
          <React.Fragment key={dup}>
            {items.map((t, i) => (
              <figure
                key={`${dup}-${i}`}
                className="w-full max-w-xs rounded-[var(--radius)] border border-line bg-surface p-6"
              >
                <blockquote className="text-[0.95rem] leading-[1.55] text-ink text-pretty">
                  “{t.text}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <img
                    src={t.image}
                    alt={t.name}
                    width={40}
                    height={40}
                    loading="lazy"
                    className="size-10 shrink-0 rounded-full object-cover ring-1 ring-line"
                  />
                  <div className="leading-tight">
                    <div className="text-[0.875rem] font-semibold text-ink">{t.name}</div>
                    <div className="text-[0.78rem] text-muted">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}

export function Testimonials() {
  const c1 = TESTIMONIALS.slice(0, 3);
  const c2 = TESTIMONIALS.slice(3, 6);
  const c3 = TESTIMONIALS.slice(6, 9);

  return (
    <section id="testimonials" className="py-[clamp(5rem,12vw,10rem)]">
      <div className="u-container">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-[clamp(2rem,4.4vw,3rem)] font-bold leading-[1.06] tracking-tighter text-ink text-balance">
              Loved by people who prompt <span className="text-beige">all day</span>.
            </h2>
          </div>
        </Reveal>

        <div className="mx-auto mt-14 flex max-h-[40rem] justify-center gap-5 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_16%,#000_84%,transparent)]">
          <Column items={c1} duration={30} />
          <Column items={c2} duration={38} className="hidden md:block" />
          <Column items={c3} duration={26} className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
}
