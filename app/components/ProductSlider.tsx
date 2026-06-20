"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "../lib/products";

interface ProductSliderProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

export default function ProductSlider({
  products,
  title = "Featured Pieces",
  subtitle = "Curated Selection",
}: ProductSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === "left" ? -clientWidth / 2 : clientWidth / 2;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="section bg-parchment overflow-hidden">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between mb-12 gap-4">
          <div>
            <span className="block font-sans text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-stone mb-3">
              {subtitle}
            </span>
            <h2 className="font-serif font-normal text-[clamp(1.75rem,3vw,2.75rem)] max-w-[400px]">
              {title}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className={`w-12 h-12 rounded-full border border-border bg-cream flex items-center justify-center text-walnut transition-all duration-200 ${
                  canScrollLeft ? "cursor-pointer opacity-100 hover:bg-gold-pale hover:border-gold" : "cursor-not-allowed opacity-50"
                }`}
                aria-label="Previous items"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className={`w-12 h-12 rounded-full border border-border bg-cream flex items-center justify-center text-walnut transition-all duration-200 ${
                  canScrollRight ? "cursor-pointer opacity-100 hover:bg-gold-pale hover:border-gold" : "cursor-not-allowed opacity-50"
                }`}
                aria-label="Next items"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Slider Track */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 -mr-[50vw] pr-[50vw]"
        >
          {products.map((product) => (
            <div
              key={product.slug}
              className="min-w-[280px] max-w-[320px] shrink-0 snap-start"
            >
              <Link
                href={`/products/${product.slug}`}
                className="group block h-full"
              >
                <article>
                  <div className="relative w-full aspect-[4/5] overflow-hidden bg-parchment mb-5">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-walnut/40 flex items-center justify-center opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                      <span className="font-sans text-[0.7rem] font-semibold tracking-[0.18em] uppercase text-gold-light px-6 py-2.5 border border-gold transform translate-y-2.5 transition-transform duration-400 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:translate-y-0">
                        View Details
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="block font-sans text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-gold mb-1.5">
                      {product.categoryLabel}
                    </span>
                    <h3 className="font-serif text-xl font-medium text-walnut mb-1.5 leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-sm text-stone leading-relaxed m-0">
                      {product.material}
                    </p>
                  </div>
                </article>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
