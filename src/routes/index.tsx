import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site-layout";
import { ArtworkTile } from "@/components/artwork-tile";
import { artworks } from "@/data/artworks";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sonya Harris — Visual Diary" },
      {
        name: "description",
        content: "",
      },
      { property: "og:title", content: "Sonya Harris — Visual Diary" },
      {
        property: "og:description",
        content: "",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const LOAD_STEP = 9;
  const INITIAL_VISIBLE_COUNT = 9;
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  return (
    <SiteLayout>
      <section className="mt-6 px-4 pt-6 pb-10 sm:px-6 lg:px-7 w-full">
        <div>
          <h1 className="font-display text-[36px] font-semibold leading-[0.98] tracking-[-0.05em] text-foreground sm:text-[36px] lg:text-[36px]">
            Visual Diary
          </h1>
        </div>
      </section>

      <section className="px-4 w-full sm:px-6 lg:px-7">
        <div className="w-full">
          <div className="grid w-full grid-cols-2 justify-center gap-x-4 gap-y-12 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-16">
            {artworks.slice(0, visibleCount).map((a, i) => (
              <ArtworkTile key={a.slug} artwork={a} eager={i === 0} />
            ))}
          </div>

          {visibleCount < artworks.length && (
            <div className="mt-12 flex justify-center">
              <button
                type="button"
                onClick={() =>
  setVisibleCount((n) =>
    n + (window.innerWidth < 768 ? 10 : 12)
  )
}
                className="border-2 border-black bg-white px-5 py-2 text-[14px] font-bold uppercase tracking-[-0.03em] text-black transition-colors hover:bg-white"
                
              >
                Load more
              </button>
            </div>
          )}
        </div>
      </section>

      <AboutSection />
    </SiteLayout>
  );
}

function AboutSection() {
  return (
    <section id="about" className="scroll-mt-10 px-4 pt-24 sm:px-6 sm:pt-32 lg:px-7">
      <div className="w-full grid gap-12 md:grid-cols-2 md:gap-16">
        <div className="justify-self-end aspect-square bg-secondary md:max-h-[300px] md:max-w-[300px]" />
        <div>
          <p className="font-display text-[12px] font-semibold uppercase tracking-[-0.03em] text-foreground">
            About
          </p>
          <h2 className="mt-5 font-display text-[32px] font-semibold leading-[0.95] tracking-[-0.03em] text-foreground sm:text-[32px]">
            Hello, I'm Son.
          </h2>
          <p className="mt-5 text-[24px] tracking-[-0.03em] font-semibold leading-[1.25] text-muted-foreground">
            Welcome to my visual diary.
          </p>

          <dl className="mt-5 tracking-[-0.03em] divide-y divide-border border-t border-b border-border text-[12px] leading-[0px] font-semibold uppercase text-foreground">
            <Row>B Creative Industries</Row>
            <Row>B Mass Communication</Row>
            <Row>Cert IV Mental Health</Row>
            <Row>Cert III Visual Art (current)</Row>
          </dl>

          <p className="mt-5 font-display text-[14px] font-semibold tracking-[-0.03em] text-muted-foreground">
            Currently based in Brisbane / Magandjin
          </p>
          <div className="relative">
            <a
              href="mailto:sonyakateharris@gmail.com"
              aria-label="Contact"
              className="flex items-left justify-left mt-4 leading-none"
            >
              <svg
                className="block translate-y-[5px]"
                width="24"
                height="20"
                viewBox="0 0 24 24"
                fill="background"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="square"
                strokeLinejoin="miter"
              >
                <rect x="3" y="5" width="20" height="14" rx="0" />
                <path d="m3 7 9 6 9-6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="py-3.5 text-foreground">{children}</div>;
}
