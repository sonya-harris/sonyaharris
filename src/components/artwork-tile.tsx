import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import type { Artwork } from "@/data/artworks";

export function ArtworkTile({ artwork, eager = false }: { artwork: Artwork; eager?: boolean }) {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const images = [
    artwork.featuredImage,
    ...artwork.gallery.filter((src) => src !== artwork.featuredImage),
  ];
  const hasMultiple = images.length > 1;
  const label = artwork.tags?.join(", ") || artwork.medium || artwork.category;

  const openArtwork = () => {
    navigate({ to: "/projects/$slug", params: { slug: artwork.slug } });
  };

  const go = (e: React.MouseEvent, dir: number) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((i) => {
      const next = (i + dir + images.length) % images.length;
      // Preload the next image to keep the opacity/transition feel snappy.
      if (!eager) {
        const img = new Image();
        img.decoding = "async";
        img.loading = "eager";
        img.fetchPriority = "low";
        img.src = images[next];
      }
      return next;
    });
  };

  return (
    <div
      className="group cursor-pointer"
      onClick={openArtwork}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openArtwork();
        }
      }}
    >
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <div className="absolute inset-0">
          {/* Mount only the currently visible image to reduce JS/network work (preload on demand below). */}
          <img
            src={images[index]}
            alt={artwork.title}
            width={1024}
            height={1024}
            loading={eager ? "eager" : "lazy"}
            fetchPriority={eager ? "high" : undefined}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out"
          />
          {/* Keep opacity transition behavior by swapping src only; when index changes we load on demand. */}
        </div>

        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={(e) => go(e, -1)}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 z-20 grid h-8 w-8 -translate-y-1/2 place-items-center bg-transparent text-muted-foreground transition-colors hover:text-foreground sm:left-3"
            >
              <Chevron dir="left" />
            </button>
            <button
              type="button"
              onClick={(e) => go(e, 1)}
              aria-label="Next image"
              className="absolute right-2 top-1/2 z-20 grid h-8 w-8 -translate-y-1/2 place-items-center bg-transparent text-muted-foreground transition-colors hover:text-foreground sm:right-3"
            >
              <Chevron dir="right" />
            </button>
          </>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <div className="font-display text-[14px] font-semibold leading-[1.1] tracking-[-0.03em] text-foreground transition-colors group-hover:text-muted-foreground">
          {artwork.title}
        </div>
        <span className="inline-flex items-center bg-secondary font-semibold text-[10px] text-muted-foreground tracking-[-0.03em] px-1 py-0.5">
          {label}
        </span>
      </div>
    </div>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {dir === "center" ? <path d="m15 6-6 6 6 6" /> : <path d="m9 6 6 6-6 6" />}
    </svg>
  );
}
