import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site-layout";
import { getArtwork } from "@/data/artworks";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const artwork = getArtwork(params.slug);
    if (!artwork) throw notFound();
    return { artwork };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.artwork.title} — Sonya Harris` },
          { name: "description", content: loaderData.artwork.description },
          {
            property: "og:title",
            content: `${loaderData.artwork.title} — Sonya Harris`,
          },
          { property: "og:description", content: loaderData.artwork.description },
          { property: "og:image", content: loaderData.artwork.featuredImage },
          { property: "og:type", content: "article" },
        ]
      : [],
  }),
  component: ProjectPage,
  errorComponent: ({ error }) => (
    <SiteLayout>
      <div className="px-6 py-20 text-center text-sm text-muted-foreground">
        {error.message}
      </div>
    </SiteLayout>
  ),
  notFoundComponent: () => (
    <SiteLayout>
      <div className="px-6 py-20 text-center">
        <p className="text-sm text-muted-foreground">Project not found.</p>
        <Link to="/" className="mt-4 inline-block text-sm underline">
          ← Back
        </Link>
      </div>
    </SiteLayout>
  ),
});

function ProjectPage() {
  const { artwork } = Route.useLoaderData();
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <SiteLayout>
      <article className="mt-6 px-4 sm:px-6 lg:px-7">
        <div className="mx-auto grid max-w-[1400px] gap-12 pt-6 sm:pt-8 md:grid-cols-[280px_minmax(0,1fr)] md:gap-16 lg:grid-cols-[320px_minmax(0,1fr)]">
          {/* Meta column */}
          <aside className="md:sticky md:top-10 md:self-start">
            <h1 className="font-display text-[36px] font-bold leading-[1] tracking-[-0.055em] text-black sm:text-[36px]">
              {artwork.title}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2">
              {artwork.category ? (
                <p className="text-[11px] font-bold leading-[1.2]  font-normal leading-[1.2] inline-flex items-center bg-[#F2F2F2] font-bold text-[10px] text-[#7F7F7F] tracking-[-0.03em] px-1 py-0.5 inline-block">
                  {artwork.category}
                </p>
              ) : null}
              {artwork.tags?.length || artwork.medium ? (
                <span className="text-[11px] font-bold leading-[1.2] inline-flex items-center bg-[#F2F2F2] font-bold text-[10px] text-[#7F7F7F] tracking-[-0.03em] px-1 py-0.5 inline-block">
                  {artwork.tags?.join(", ") || artwork.medium}
                </span>
              ) : null}
            </div>

            {artwork.description ? (
              <p className="mt-8 max-w-sm text-[13px] font-bold leading-[1.1] text-black sm:text-[14px]">
                {artwork.description}
              </p>
            ) : null}

            <Link
              to="/"
              className="mt-10 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[-0.03em] text-black transition-colors hover:text-[#777777]"
            >
              <span aria-hidden>←</span> Back
            </Link>
          </aside>

          {/* Gallery */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
            {artwork.gallery.map((src: string) => (
              <button
                key={src}
                type="button"
                onClick={() => setLightbox(src)}
                className="block aspect-square overflow-hidden bg-secondary"
              >
                <img
                  src={src}
                  alt={artwork.title}
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.01]"
                />
              </button>
            ))}
          </div>
        </div>

      </article>

      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-6 fade-in"
        >
          <img
            src={lightbox}
            alt={artwork.title}
            className="max-h-full max-w-full object-contain"
          />
          <button
            type="button"
            aria-label="Close"
            onClick={() => setLightbox(null)}
            className="absolute right-6 top-6 text-sm tracking-wide text-muted-foreground hover:text-foreground"
          >
            Close
          </button>
        </div>
      )}
    </SiteLayout>
  );
}
