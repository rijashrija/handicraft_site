import Image from "next/image";
import Link from "next/link";
import type { Product } from "../lib/products";

interface ProductCardProps {
  product: any; // Using any or a unified type since Django/FastAPI schemas differ slightly (e.g. categoryLabel vs category_label)
}

export default function ProductCard({ product }: ProductCardProps) {
  // Support both property names
  const catLabel = product.category_label || product.categoryLabel || product.category?.label || "";

  return (
    <Link href={`/products/${product.slug}`} className="group block no-underline">
      <article>
        {/* Image block */}
        <div className="relative w-full aspect-[4/5] overflow-hidden bg-walnut">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-all duration-700 ease-out transform group-hover:scale-105 group-hover:opacity-75"
          />

          {/* Dark gradient overlay on hover */}
          <div
            className="absolute inset-0 flex flex-col justify-end p-6 transition-opacity duration-500 ease-out opacity-0 group-hover:opacity-100"
            style={{
              background:
                "linear-gradient(to top, rgba(28,18,8,0.92) 0%, rgba(28,18,8,0.15) 55%, transparent 100%)",
            }}
          >
            <span className="font-sans text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-gold-light inline-flex items-center gap-1.5 border border-gold-light/50 px-4 py-1.5 mb-0.5 w-fit transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              View Details
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </div>

          {/* Featured badge */}
          {product.featured && (
            <div className="absolute top-4 left-4 font-sans text-[0.6rem] font-semibold tracking-[0.18em] uppercase text-walnut bg-gold-light px-2.5 py-1">
              Featured
            </div>
          )}
        </div>

        {/* Text info below card */}
        <div className="pt-4">
          <span className="block font-sans text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-gold mb-1.5">
            {catLabel}
          </span>
          <h3 className="font-serif text-[clamp(1.1rem,1.5vw,1.3rem)] font-medium text-walnut leading-[1.25] mb-1.5">
            {product.name}
          </h3>
          {(product.material || product.stones) && (
            <p className="font-sans text-sm text-stone">
              {product.material}
              {product.stones ? ` · ${product.stones}` : ""}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
}
