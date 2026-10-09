"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Lightbox, { GalleryImage } from "../components/Lightbox";
import InquiryButtons from "../components/InquiryButtons";

/* ── Types ─────────────────────────────────────── */
interface GalleryItem {
  id: number;
  title: string;
  caption: string;
  image: string;
  category: string;
  sort_order: number;
}

/* ── API helpers (client-side, no Next.js cache) ── */
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const PAGE_SIZE = 12;

async function fetchGallery(page: number, category: string) {
  const params = new URLSearchParams({
    page: String(page),
    page_size: String(PAGE_SIZE),
  });
  if (category !== "All") params.append("category", category);
  const res = await fetch(`${API_URL}/api/v1/gallery?${params}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Gallery fetch failed");
  return res.json() as Promise<{
    items: GalleryItem[];
    total: number;
    has_next: boolean;
  }>;
}

async function fetchCategories(): Promise<string[]> {
  const res = await fetch(`${API_URL}/api/v1/gallery/categories`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
}

function toGalleryImage(item: GalleryItem): GalleryImage {
  return { src: item.image, alt: item.title, caption: item.caption };
}

/* ── Page ───────────────────────────────────────── */
export default function GalleryPage() {
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  /* Load category tabs from DB once */
  useEffect(() => {
    fetchCategories().then((cats) => setCategories(["All", ...cats]));
  }, []);

  /* Reload from page 1 whenever category changes */
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setImages([]);
    setPage(1);
    fetchGallery(1, activeCategory)
      .then((data) => {
        if (cancelled) return;
        setImages(data.items);
        setHasNext(data.has_next);
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [activeCategory]);

  /* Infinite scroll via IntersectionObserver */
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasNext &&
          !loadingMore &&
          !loading
        ) {
          const nextPage = page + 1;
          setLoadingMore(true);
          fetchGallery(nextPage, activeCategory)
            .then((data) => {
              setImages((prev) => [...prev, ...data.items]);
              setHasNext(data.has_next);
              setPage(nextPage);
            })
            .catch(() => {})
            .finally(() => setLoadingMore(false));
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasNext, loadingMore, loading, page, activeCategory]);

  /* Lightbox */
  const lightboxImages = images.map(toGalleryImage);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + images.length) % images.length
    );
  }, [images.length]);
  const nextImage = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i + 1) % images.length
    );
  }, [images.length]);

  return (
    <>
      {/* ── HERO ─────────────────────────────────── */}
      <section
        className="relative overflow-hidden text-center"
        style={{
          paddingTop: "calc(var(--spacing-nav) + clamp(3rem, 6vw, 5rem))",
          paddingBottom: "clamp(3rem, 6vw, 5rem)",
          background: "linear-gradient(160deg, #1C1208 0%, #3A2810 60%, #1C1208 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg,transparent,transparent 79px,rgba(184,148,42,0.04) 80px)",
          }}
        />
        <div className="container relative">
          <span className="block font-sans text-[0.7rem] font-semibold tracking-[0.22em] uppercase text-gold mb-4">
            Visual Archive
          </span>
          <h1 className="font-serif font-light text-[clamp(2.5rem,6vw,5rem)] text-cream tracking-[-0.02em] leading-[1.08] mb-5">
            Our{" "}
            <em className="text-gold-light not-italic italic">Gallery</em>
          </h1>
          <span className="block w-12 h-px bg-gold mx-auto mb-6" />
          <p className="font-sans text-[clamp(0.9rem,1.5vw,1.05rem)] text-white/50 max-w-[520px] mx-auto leading-[1.8]">
            A curated look into our handcrafted silver pieces — deity statues,
            gemstone jewellery, and ceremonial artifacts from the heart of Patan.
          </p>
        </div>
      </section>

      {/* ── FILTER TABS ───────────────────────────── */}
      <section className="bg-cream border-b border-border sticky top-[var(--spacing-nav)] z-40">
        <div className="container flex overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`gallery-filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => setActiveCategory(cat)}
              className={`font-sans text-[0.7rem] font-semibold tracking-[0.15em] uppercase px-6 py-4 border-none border-b-2 bg-transparent cursor-pointer transition-colors duration-200 whitespace-nowrap ${
                activeCategory === cat
                  ? "border-gold text-gold"
                  : "border-transparent text-stone hover:text-walnut"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ── GRID ──────────────────────────────────── */}
      <section className="bg-cream py-[clamp(3rem,6vw,5rem)] pb-[clamp(4rem,8vw,7rem)] min-h-[60vh]">
        <div className="container">

          {/* Skeleton loader */}
          {loading && (
            <>
              <style>{`
                @keyframes shimmer {
                  0%   { background-position: 200% 0; }
                  100% { background-position: -200% 0; }
                }
              `}</style>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(clamp(240px,28vw,360px),1fr))] gap-0.5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-[4/3]"
                    style={{
                      background:
                        "linear-gradient(90deg,#e8dfc8 25%,#f0e9d8 50%,#e8dfc8 75%)",
                      backgroundSize: "200% 100%",
                      animation: "shimmer 1.4s infinite",
                    }}
                  />
                ))}
              </div>
            </>
          )}

          {/* Empty state */}
          {!loading && images.length === 0 && (
            <div className="text-center py-20 font-serif text-2xl italic text-stone">
              No images in this category yet.
            </div>
          )}

          {/* Image grid */}
          {!loading && images.length > 0 && (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(clamp(240px,28vw,360px),1fr))] gap-0.5">
              {images.map((img, idx) => (
                <GalleryCard
                  key={img.id}
                  img={img}
                  idx={idx}
                  onClick={() => setLightboxIndex(idx)}
                />
              ))}
            </div>
          )}

          {/* Infinite scroll spinner */}
          {loadingMore && (
            <>
              <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
              <div className="flex justify-center py-12 pb-4">
                <div className="w-9 h-9 border-2 border-border border-t-gold rounded-full animate-[spin_0.8s_linear_infinite]" />
              </div>
            </>
          )}

          {/* Sentinel element watched by IntersectionObserver */}
          <div ref={sentinelRef} className="h-px" />

          {/* Footer meta row */}
          {!loading && images.length > 0 && (
            <div className="mt-[clamp(3rem,5vw,5rem)] border-t border-border pt-10 flex flex-wrap justify-between items-center gap-4">
              <p className="font-sans text-sm text-stone">
                Showing {images.length} piece{images.length !== 1 ? "s" : ""}
                {!hasNext ? " — all loaded" : ""}
              </p>
              <InquiryButtons
                formLabel="Inquire About a Piece"
                waMessage="Hi, I'd like to inquire about one of your gallery pieces."
              />
            </div>
          )}
        </div>
      </section>

      {/* ── LIGHTBOX ──────────────────────────────── */}
      {lightboxIndex !== null && (
        <Lightbox
          images={lightboxImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </>
  );
}

/* ── Gallery Card ─────────────────────────────── */
function GalleryCard({
  img,
  idx,
  onClick,
}: {
  img: GalleryItem;
  idx: number;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      id={`gallery-image-${idx}`}
      onClick={onClick}
      aria-label={`View ${img.title}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative w-full aspect-[4/3] overflow-hidden cursor-pointer border-none p-0 bg-walnut block"
    >
      <Image
        src={img.image}
        alt={img.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-all duration-600 ease-out"
        style={{
          transform: hovered ? "scale(1.07)" : "scale(1)",
          opacity: hovered ? 0.72 : 1,
        }}
      />

      {/* Hover overlay */}
      <div
        className={`absolute inset-0 flex flex-col justify-end p-6 text-left transition-opacity duration-350 ease-out ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "linear-gradient(to top,rgba(28,18,8,0.9) 0%,rgba(28,18,8,0.1) 55%,transparent 100%)",
        }}
      >
        <p className="font-serif text-[1.05rem] italic text-gold-light leading-[1.3] mb-1">
          {img.title}
        </p>
        <span className="font-sans text-[0.65rem] tracking-[0.15em] uppercase text-white/45">
          Click to enlarge
        </span>
      </div>

      {/* Zoom icon */}
      <div
        className={`absolute top-4 right-4 w-9 h-9 rounded-full bg-walnut/65 border border-gold/45 flex items-center justify-center text-gold transition-opacity duration-300 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35M11 8v6M8 11h6" />
        </svg>
      </div>
    </button>
  );
}
