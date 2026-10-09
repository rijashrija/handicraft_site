"use client";

import Image from "next/image";
import Link from "next/link";
import "./CategorySlider.css";

interface Category {
  slug: string;
  label: string;
  title: string;
  description: string;
  image: string;
}

interface CategorySliderProps {
  categories: Category[];
  title?: string;
  subtitle?: string;
}

export default function CategorySlider({
  categories,
  title = "Our Collections",
  subtitle = "Explore by Category",
}: CategorySliderProps) {
  if (!categories.length) return null;

  // Duplicate items to create a seamless infinite loop
  const items = [...categories, ...categories, ...categories];

  return (
    <section className="section bg-cream overflow-hidden">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="block font-sans text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-stone mb-3">
            {subtitle}
          </span>
          <h2 className="font-serif font-normal text-[clamp(1.75rem,3vw,2.75rem)]">
            {title}
          </h2>
          <span className="block w-12 h-0.5 bg-gold mx-auto mt-5" />
        </div>
      </div>

      {/* Full-width marquee track — intentionally outside .container */}
      <div className="category-marquee-wrapper">
        <div
          className="category-marquee-track"
          style={{ "--item-count": categories.length } as React.CSSProperties}
        >
          {items.map((cat, i) => (
            <Link
              key={`${cat.slug}-${i}`}
              href={`/products?category=${cat.slug}`}
              className="category-marquee-card group"
            >
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="380px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-walnut/85 to-walnut/10" />
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <span className="block font-sans text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-gold mb-2">
                    {cat.label}
                  </span>
                  <h3 className="font-serif font-normal text-xl text-cream mb-3 leading-tight">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-cream/65 leading-relaxed mb-4 line-clamp-2">
                    {cat.description}
                  </p>
                  <span className="inline-flex items-center gap-2 font-sans text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-gold-light">
                    Explore
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
