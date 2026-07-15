import { Tool } from "@/components/Tool";
import { Sections } from "@/components/Sections";
import { useSeo } from "@/lib/seo";

export function Home() {
  useSeo({
    title: "Promptsmith — Refine any prompt into a professional AI instruction",
    description:
      "A free, open-source tool that rewrites your rough prompt into a clean, structured, professional AI prompt without changing your meaning. No login, no cost.",
    canonical: "https://promptsmith-sandy.vercel.app/",
    keywords:
      "prompt refiner, prompt engineering tool, improve chatgpt prompt, rewrite prompt, professional ai prompt, free prompt optimizer",
  });
  return (
    <>
      <Tool />
      <Sections />
    </>
  );
}
