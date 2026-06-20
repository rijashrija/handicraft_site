import Image from "next/image";
import Link from "next/link";
import type { Product } from "../lib/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block"
    >
      <article>
        {/* Image wrapper */}
        <div className="relative w-full aspect-[4/5] overflow-hidden bg-parchment mb-5">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-walnut/55 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="font-sans text-[0.7rem] font-semibold tracking-[0.18em] uppercase text-gold-light px-6 py-2.5 border border-gold transform translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
              View Details
            </span>
          </div>
        </div>

        {/* Info */}
        <div>
          <span className="block font-sans text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-gold mb-1.5">
            {product.categoryLabel}
          </span>
          <h3 className="font-serif text-xl font-medium text-walnut mb-1.5 leading-snug">
            {product.name}
          </h3>
          <p className="text-sm text-stone leading-relaxed">
            {product.material}
            {product.stones ? ` · ${product.stones}` : ""}
          </p>
        </div>
      </article>
    </Link>
  );
}
