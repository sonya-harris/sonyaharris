type AssetModule = string | { url?: string };

const rawAssetModules = import.meta.glob("/src/assets/*", {
  eager: true,
  import: "default",
}) as Record<string, AssetModule>;

function isImageAssetPath(assetPath: string) {
  return /\.(jpe?g|png|webp|svg)$/i.test(assetPath);
}

function isAssetPointerPath(assetPath: string) {
  return /\.(jpe?g|png|webp|svg)\.asset\.json$/i.test(assetPath);
}

function getAssetUrl(assetModule: AssetModule) {
  return typeof assetModule === "string" ? assetModule : assetModule.url;
}

function getComparableAssetPath(assetPath: string) {
  return assetPath.replace(/\.asset\.json$/i, "");
}

const assetModules = Object.fromEntries(
  Object.entries(rawAssetModules).flatMap(([assetPath, assetModule]) => {
    if (!isImageAssetPath(assetPath) && !isAssetPointerPath(assetPath)) return [];

    const assetUrl = getAssetUrl(assetModule);
    if (!assetUrl) return [];

    return [[getComparableAssetPath(assetPath), assetUrl]];
  }),
) as Record<string, string>;

// The logo is imported separately in the layout component and is not part of the artwork list.

export type Artwork = {
  slug: string;
  title: string;
  medium: string;
  category: string;
  year: number | string;
  dimensions: string;
  description: string;
  tags: string[];
  featuredImage: string;
  gallery: string[];
};

function createArtwork(
  props: Partial<Artwork> & Pick<Artwork, "slug" | "title" | "featuredImage">,
): Artwork {
  const resolvedTags = props.tags?.length ? props.tags : props.medium ? [props.medium] : [];
  const resolvedMedium = props.medium || resolvedTags.join(", ");

  return {
    category: "",
    year: "",
    dimensions: "",
    description: "",
    gallery: [props.featuredImage],
    ...props,
    medium: resolvedMedium,
    tags: resolvedTags,
  };
}

function toArtworkTitle(assetPath: string) {
  const fileName = assetPath.split("/").pop() ?? assetPath;
  return fileName
    .replace(/\.[^/.]+$/, "")
    .replace(/[_-]+/g, " ")
    .trim();
}

function toSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function normalizeAssetName(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/\.[^/.]+$/, "")
    .replace(/\s+\((copy|duplicate|1|2|3)\)$/i, "")
    .replace(/\s+copy$/i, "")
    .replace(/[-_]+/g, " ");
}

function normalizeUnicode(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function resolveAsset(...assetNames: string[]) {
  const assetLookup = Object.fromEntries(
    Object.entries(assetModules).map(([assetPath, assetUrl]) => {
      const fileName = assetPath.split("/").pop() ?? "";
      return [normalizeUnicode(fileName), assetUrl];
    }),
  ) as Record<string, string>;

  const fallbackLookup = new Map<string, string>();
  for (const [fileName, assetUrl] of Object.entries(assetLookup)) {
    fallbackLookup.set(normalizeUnicode(normalizeAssetName(fileName)), assetUrl);
  }

  for (const assetName of assetNames) {
    const normalizedName = normalizeUnicode(assetName);
    const resolved = assetLookup[normalizedName];
    if (resolved) return resolved;

    const fallback = fallbackLookup.get(normalizeUnicode(normalizeAssetName(assetName)));
    if (fallback) return fallback;
  }

  return undefined;
}

const mediumBySlug: Record<string, { medium: string; tags: string[] }> = {
  "sunflower-theory": { medium: "Colour pencil", tags: ["Colour pencil"] },
  lineage: { medium: "Colour pencil", tags: ["Colour pencil"] },
  "egoic-lotus": { medium: "Colour pencil", tags: ["Colour pencil"] },
  serotonin: { medium: "Colour pencil", tags: ["Colour pencil"] },
  jigsaw: {
    medium: "Colour pencil / Graphite pencil / Watercolour paint / Fineliner",
    tags: ["Watercolour paint", "Colour pencil", "Graphite pencil", "Fineliner"],
  },
  harleycat: { medium: "Graphite pencil", tags: ["Graphite pencil"] },
  conch: { medium: "Graphite pencil", tags: ["Graphite pencil"] },
  "champs-elysees": { medium: "Graphite pencil", tags: ["Graphite pencil"] },
  "fka-twigs": { medium: "Graphite pencil", tags: ["Graphite pencil"] },
  "the-grand-budapest-hotel": { medium: "Graphite pencil", tags: ["Graphite pencil"] },
  "sezane-cups": { medium: "Graphite pencil", tags: ["Graphite pencil"] },
  "limoges-porcelain": { medium: "Graphite pencil", tags: ["Graphite pencil"] },
  "abbey-road": { medium: "Graphite pencil", tags: ["Graphite pencil"] },
  "in-flux": { medium: "Stoneware clay", tags: ["Stoneware clay"] },
  sheer: { medium: "Cyanotype", tags: ["Cyanotype"] },
  bougainvillea: { medium: "Cyanotype", tags: ["Cyanotype"] },
  "brown-snake": { medium: "Cyanotype", tags: ["Cyanotype"] },
  embrace: { medium: "Photogram", tags: ["Photogram"] },
  crown: { medium: "Photogram", tags: ["Photogram"] },
  boxes: { medium: "Graphite pencil", tags: ["Graphite pencil"] },
  calendar: { medium: "Colour pencil", tags: ["Colour pencil"] },
  grid: { medium: "Graphite pencil", tags: ["Graphite pencil"] },
};

function getArtworkMeta(slug: string) {
  return mediumBySlug[slug] ?? { medium: "", tags: [] };
}

const homepageOrder = [
  "sunflower-theory",
  "lineage",
  "egoic-lotus",
  "serotonin",
  "jigsaw",
  "harleycat",
  "conch",
  "champs-elysees",
  "fka-twigs",
  "the-grand-budapest-hotel",
  "sezane-cups",
  "limoges-porcelain",
  "abbey-road",
  "in-flux",
  "sheer",
  "bougainvillea",
  "brown-snake",
  "embrace",
  "crown",
  "boxes",
  "calendar",
  "depth",
];

const groupedArtworkConfigs = [
  {
    slug: "in-flux",
    title: "In Flux",
    assets: ["In Flux A.PNG", "In Flux B.jpg"],
    description: "A stoneware clay study exploring form in transition.",
  },
  {
    slug: "jigsaw",
    title: "Jigsaw",
    assets: [
      "Jigsaw_Colour pencil.jpg",
      "Jigsaw_Graphite.jpg",
      "Jigsaw_Fineliner.jpg",
      "Jigsaw_Watercolour.jpg",
      "Jigsaw_Outline.jpg",
    ],
    description:
      "A multi-layered portrait rendered across colour pencil, graphite, fineliner, and watercolour.",
  },
  {
    slug: "sunflower-theory",
    title: "Sunflower Theory",
    assets: ["Sunflower Theory.jpg"],
    description: "A colour pencil study of a sunflower.",
  },
];

const singleArtworkConfigs = Object.keys(assetModules)
  .filter((assetPath) => {
    const fileName = (assetPath.split("/").pop() ?? "").toLowerCase();
    return !["sh.png", "sh.PNG", "sh-png", "sh-png.png"].includes(fileName);
  })
  .map((assetPath) => ({
    assetPath,
    title: toArtworkTitle(assetPath),
  }))
  .filter(({ assetPath }) => {
    return !groupedArtworkConfigs.some((config) =>
      config.assets.some((assetName) => assetPath.endsWith(assetName)),
    );
  });

// To add a new artwork, drop the image into src/assets and it will appear automatically.
export const artworks: Artwork[] = [
  ...groupedArtworkConfigs.map((config) => {
    const images = config.assets
      .map((assetName) => resolveAsset(assetName))
      .filter((src): src is string => Boolean(src));

    const meta = getArtworkMeta(config.slug);
    return createArtwork({
      slug: config.slug,
      title: config.title,
      medium: meta.medium,
      tags: meta.tags,
      description: config.description,
      featuredImage: images[0] ?? "",
      gallery: images,
    });
  }),
  ...singleArtworkConfigs
    .map(({ assetPath, title }) => {
      const slug = toSlug(title);
      const meta = getArtworkMeta(slug);
      const src = assetModules[assetPath];
      if (!src) return null;
      return createArtwork({
        slug,
        title,
        medium: meta.medium,
        tags: meta.tags,
        featuredImage: src,
        gallery: [src],
      });
    })
    .filter((a): a is Artwork => Boolean(a)),
].sort((a, b) => {
  const aIndex = homepageOrder.indexOf(a.slug);
  const bIndex = homepageOrder.indexOf(b.slug);

  if (aIndex === -1 && bIndex === -1) {
    return a.title.localeCompare(b.title);
  }
  if (aIndex === -1) {
    return 1;
  }
  if (bIndex === -1) {
    return -1;
  }
  return aIndex - bIndex;
});

export const getArtwork = (slug: string) => artworks.find((a) => a.slug === slug);

export const getRelated = (slug: string, count = 3) =>
  artworks.filter((a) => a.slug !== slug).slice(0, count);
