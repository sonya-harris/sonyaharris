import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { ArtworkTile } from "@/components/artwork-tile";
import { artworks } from "@/data/artworks";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sonya Harris — Visual Diary" },
      {
        name: "description",
        content:
          "",
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
  return (
    <SiteLayout>
      <section className="mt-6 px-4 pt-6 pb-10 sm:px-6 sm:pt-12 sm:pb-12 lg:px-6 lg:pt-16 lg:pb-10">
        <div className="mx-auto max-w-[1600px]">
          <h1 className="font-display text-[36px] font-bold leading-[0.98] tracking-[-0.05em] text-black sm:text-[36px] lg:text-[36px]">
            Visual Diary
          </h1>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-7">
        <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-16">
          {artworks.map((a) => (
            <ArtworkTile key={a.slug} artwork={a} />
          ))}
        </div>
      </section>

      <AboutSection />
    </SiteLayout>
  );
}

function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-10 px-4 pt-24 sm:px-6 sm:pt-32 lg:px-7"
    >
      <div className="mx-auto grid max-w-[1600px] gap-12 md:grid-cols-2 md:gap-16">
        <div className="justify-self-end aspect-[1/1] bg-secondary md:aspect-[1/1] md:max-h-[300 px] md:max-w-[300px]" />
        <div>
          <p className="font-display text-[12px] font-bold uppercase tracking-[-0.03em] text-[#000000]">
            About
          </p>
          <h2 className="mt-5 font-display text-[32px] font-bold leading-[0.95] tracking-[-0.03em] text-black sm:text-[32px]">
            Hello, I'm Son.
          </h2>
          <p className="mt-5 text-[24px] tracking-[-0.03em] font-bold leading-[1.25] text-[#777777]">
            Welcome to my visual diary.
          </p>

          <dl className="mt-5 tracking-[-0.03em] divide-y divide-border border-t border-b border-border text-[12px] leading-[0px] font-bold uppercase text-black">
            <Row>B Creative Industries</Row>
            <Row>B Mass Communication</Row>
            <Row>Cert IV Mental Health</Row>
            <Row>Cert III Visual Art (current)</Row>
          </dl>

          <p className="mt-5 font-display text-[14px] font-bold  tracking-[-0.03em] text-[#000000]">
           
    Currently based in Brisbane / Magandjin
          </p>
          <div className="relative">
            <a
              href="mailto:sonyakateharris@gmail.com"
              aria-label="Contact"
              className="flex items-LEFT justify-left mt-4 leading-none"
            >
              <svg
                className="block translate-y-[5px]"
                width="24"
                height="20"
                viewBox="0 0 24 24"
                fill="white"
                stroke="black"
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
