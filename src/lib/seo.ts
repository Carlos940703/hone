import { useEffect } from "react";

type Seo = {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  jsonLd?: object;
};

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/** Per-route SEO for client-rendered pages. Restores the title on unmount. */
export function useSeo({ title, description, canonical, keywords, jsonLd }: Seo) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;
    setMeta("description", description);
    if (keywords) setMeta("keywords", keywords);
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const prevHref = link?.getAttribute("href") || null;
    if (canonical) {
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonical);
    }

    let script: HTMLScriptElement | null = null;
    if (jsonLd) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      document.title = prevTitle;
      if (canonical && link && prevHref) link.setAttribute("href", prevHref);
      if (script) script.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);
}
