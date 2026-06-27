import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import type { Artwork } from "@/data/artworks";

export function ArtworkTile({ artwork }: { artwork: Artwork }) {
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
    setIndex((i) => (i + dir + images.length) % images.length);
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
          {images.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={artwork.title}
              width={1024}
              height={1024}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out"
              style={{ opacity: i === index ? 1 : 0 }}
            />
          ))}
        </div>

        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={(e) => go(e, -1)}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 z-20 grid h-8 w-8 -translate-y-1/2 place-items-center bg-transparent text-[#777777] transition-colors hover:text-black sm:left-3"
            >
              <Chevron dir="left" />
            </button>
            <button
              type="button"
              onClick={(e) => go(e, 1)}
              aria-label="Next image"
              className="absolute right-2 top-1/2 z-20 grid h-8 w-8 -translate-y-1/2 place-items-center bg-transparent text-[#777777] transition-colors hover:text-black sm:right-3"
            >
              <Chevron dir="right" />
            </button>
          </>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <div className="font-display text-[14px] font-bold leading-[1.1] tracking-[-0.03em] text-black transition-colors group-hover:text-[#777777]">
          {artwork.title}
        </div>
        <span className="inline-flex items-center bg-[#F2F2F2] font-bold text-[10px] text-[#7F7F7F] tracking-[-0.03em] px-1 py-0.5 inline-block">
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
      {dir === "left" ? <path d="m15 6-6 6 6 6" /> : <path d="m9 6 6 6-6 6" />}
    </svg>
  );
}
