"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "../components/ProductCard";

type Category = { slug: string; label: string };
type Product = {
  slug: string;
  name: string;
  category: { slug: string; label: string } | null;
  category_label: string;
  image: string;
  featured: boolean;
  material?: string;
  stones?: string;
};

/* ── Main content ──────────────────────────────── */
export default function ProductsContent({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const searchParams = useSearchParams();
  const [active, setActive] = useState(
    searchParams.get("category") || "all"
  );
  const [visibleCount, setVisibleCount] = useState(12);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActive(searchParams.get("category") || "all");
    setVisibleCount(12);
  }, [searchParams]);

  const filtered =
    active === "all"
      ? products
      : products.filter(
          (p) =>
            p.category?.slug?.toLowerCase() === active.toLowerCase()
        );

  /* Infinite scroll */
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          visibleCount < filtered.length
        ) {
          setVisibleCount((prev) => prev + 12);
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [visibleCount, filtered.length]);

  const activeLabel =
    categories.find((c) => c.slug === active)?.label ?? "";

  return (
    <>
      {/* ── FILTER TABS ─────────────────────────── */}
      <section className="bg-cream border-b border-border sticky top-[var(--spacing-nav)] z-40">
        <div className="container flex overflow-x-auto scrollbar-hide">
          {/* All Pieces tab */}
          <button
            id="filter-all"
            onClick={() => { setActive("all"); setVisibleCount(12); }}
            className={`font-sans text-[0.7rem] font-semibold tracking-[0.15em] uppercase px-6 py-4 border-none border-b-2 bg-transparent cursor-pointer transition-colors duration-200 whitespace-nowrap ${
              active === "all"
                ? "border-gold text-gold"
                : "border-transparent text-stone hover:text-walnut"
            }`}
          >
            All Pieces
          </button>

          {categories.map((cat) => (
            <button
              key={cat.slug}
              id={`filter-${cat.slug}`}
              onClick={() => { setActive(cat.slug); setVisibleCount(12); }}
              className={`font-sans text-[0.7rem] font-semibold tracking-[0.15em] uppercase px-6 py-4 border-none border-b-2 bg-transparent cursor-pointer transition-colors duration-200 whitespace-nowrap ${
                active === cat.slug
                  ? "border-gold text-gold"
                  : "border-transparent text-stone hover:text-walnut"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* ── PRODUCT GRID ────────────────────────── */}
      <section className="bg-cream py-[clamp(3rem,6vw,5rem)] pb-[clamp(4rem,8vw,7rem)] min-h-[60vh]">
        <div className="container">
          {/* Count label */}
          <p className="font-sans text-[0.7rem] font-semibold tracking-[0.18em] uppercase text-stone mb-10">
            {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
            {active !== "all" && activeLabel ? ` in ${activeLabel}` : ""}
          </p>

          {filtered.length === 0 ? (
            <div className="text-center py-20 font-serif text-2xl italic text-stone">
              No pieces found in this category.
            </div>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(clamp(220px,22vw,300px),1fr))] gap-[clamp(1.5rem,3vw,2.5rem)] gap-y-[clamp(2.5rem,5vw,4rem)]">
              {filtered.slice(0, visibleCount).map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          )}

          {/* Infinite scroll spinner */}
          {visibleCount < filtered.length && (
            <>
              <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
              <div className="flex justify-center py-12 pb-4">
                <div className="w-9 h-9 border-2 border-border border-t-gold rounded-full animate-[spin_0.8s_linear_infinite]" />
              </div>
            </>
          )}

          {/* Sentinel for IntersectionObserver */}
          <div ref={sentinelRef} className="h-px" />

          {/* Footer row */}
          {filtered.length > 0 && (
            <div className="mt-[clamp(3rem,5vw,5rem)] border-t border-border pt-10 flex flex-wrap justify-between items-center gap-4">
              <p className="font-sans text-sm text-stone">
                Showing {Math.min(visibleCount, filtered.length)} of{" "}
                {filtered.length} pieces
                {visibleCount >= filtered.length ? " — all loaded" : ""}
              </p>
              <a
                href="/contact"
                className="font-sans text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-walnut border border-border px-6 py-2.5 no-underline transition-colors duration-200 hover:border-gold hover:text-gold"
              >
                Inquire About a Piece →
              </a>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
