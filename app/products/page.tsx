"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { products, categoryLabels, type ProductCategory } from "../lib/products";
import ProductCard from "../components/ProductCard";
import InquiryBanner from "../components/InquiryBanner";

const ALL_CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: "all", label: "All Pieces" },
  { value: "silver-idols", label: "Silver Idols" },
  { value: "necklaces", label: "Necklaces" },
  { value: "artifacts", label: "Cultural Artifacts" },
  { value: "gemstone", label: "Gemstone Pieces" },
];

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const initialCat = (searchParams.get("category") as ProductCategory) || "all";
  const [active, setActive] = useState<ProductCategory>(initialCat);

  const filtered =
    active === "all"
      ? products
      : products.filter((p) => p.category === active);

  useEffect(() => {
    const cat = (searchParams.get("category") as ProductCategory) || "all";
    setActive(cat);
  }, [searchParams]);

  return (
    <>
      {/* Page header */}
      <section className="bg-walnut pt-[calc(var(--spacing-nav)+4rem)] pb-16">
        <div className="container text-center">
          <span className="block font-sans text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-gold mb-4">
            Handcrafted in Patan, Nepal
          </span>
          <h1 className="font-serif font-normal text-[clamp(2.5rem,5vw,4rem)] text-cream leading-[1.1]">
            The Collection
          </h1>
          <div className="w-12 h-0.5 bg-gold mx-auto mt-6" />
        </div>
      </section>

      {/* Filter pills */}
      <div className="bg-cream border-b border-border sticky top-[var(--spacing-nav)] z-40">
        <div className="container flex gap-2 overflow-x-auto py-5 scrollbar-hide">
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              id={`filter-${cat.value}`}
              onClick={() => setActive(cat.value)}
              className={`shrink-0 px-5 py-2 font-sans text-[0.7rem] font-semibold tracking-[0.12em] uppercase border transition-all duration-200 whitespace-nowrap ${
                active === cat.value
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
            {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}{" "}
            {active !== "all" && `in ${categoryLabels[active as Exclude<ProductCategory, "all">]}`}
          </p>

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-stone">
              <p>No pieces found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 gap-y-12">
              {filtered.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <InquiryBanner variant="gold" />
    </>
  );
}
