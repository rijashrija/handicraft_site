"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "../components/ProductCard";

type Category = { slug: string; label: string };
type Product = { slug: string; name: string; category: { slug: string; label: string } | null; category_label: string; image: string; featured: boolean };

export default function ProductsContent({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const searchParams = useSearchParams();
  const [active, setActive] = useState(searchParams.get("category") || "all");

  useEffect(() => {
    setActive(searchParams.get("category") || "all");
  }, [searchParams]);

  const filtered =
    active === "all"
      ? products
      : products.filter((p) => p.category?.slug?.toLowerCase() === active.toLowerCase());

  const activeLabel = categories.find((c) => c.slug === active)?.label ?? "";

  return (
    <>
      {/* Filter pills */}
      <div className="bg-cream border-b border-border sticky top-[var(--spacing-nav)] z-40">
        <div className="container flex gap-2 overflow-x-auto py-5 scrollbar-hide">
          <button
            id="filter-all"
            onClick={() => setActive("all")}
            className={`shrink-0 px-5 py-2 font-sans text-[0.7rem] font-semibold tracking-[0.12em] uppercase border transition-all duration-200 whitespace-nowrap ${active === "all"
              ? "bg-walnut text-gold-pale border-walnut"
              : "bg-transparent text-stone border-border hover:border-walnut hover:text-walnut"
              }`}
          >
            All Pieces
          </button>

          {categories.map((cat) => (
            <button
              key={cat.slug}
              id={`filter-${cat.slug}`}
              onClick={() => setActive(cat.slug)}
              className={`shrink-0 px-5 py-2 font-sans text-[0.7rem] font-semibold tracking-[0.12em] uppercase border transition-all duration-200 whitespace-nowrap ${active === cat.slug
                ? "bg-walnut text-gold-pale border-walnut"
                : "bg-transparent text-stone border-border hover:border-walnut hover:text-walnut"
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product grid */}
      <section className="section bg-cream">
        <div className="container">
          <p className="font-sans text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-stone mb-10">
            {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
            {active !== "all" && ` in ${activeLabel}`}
          </p>

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-stone">
              <p>No pieces found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 gap-y-12">
              {filtered.map((product) => (
                <ProductCard key={product.slug} product={product as any} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
