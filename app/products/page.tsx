import { Suspense } from "react";
import { getProducts, getCategories } from "../lib/api";
import ProductsContent from "./ProductsContent";
import InquiryBanner from "../components/InquiryBanner";

export const metadata = {
  title: "The Collection",
  description:
    "Browse our full collection of handcrafted silver deity statues, gemstone necklaces, and ceremonial artifacts from Patan, Nepal.",
};

export default async function ProductsPage() {
  let products: any[] = [];
  let categories: any[] = [];

  try {
    const [productsRes, categoriesRes] = await Promise.all([
      getProducts(),
      getCategories(),
    ]);
    products = productsRes ?? [];
    categories = categoriesRes ?? [];
  } catch (err) {
    console.warn("Using empty fallback — backend unreachable:", err);
  }

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
        {/* Decorative grid lines */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg,transparent,transparent 79px,rgba(184,148,42,0.04) 80px)",
          }}
        />

        <div className="container relative">
          <span className="block font-sans text-[0.7rem] font-semibold tracking-[0.22em] uppercase text-gold mb-4">
            Handcrafted in Patan, Nepal
          </span>
          <h1 className="font-serif font-light text-[clamp(2.5rem,6vw,5rem)] text-cream tracking-[-0.02em] leading-[1.08] mb-5">
            The{" "}
            <em className="text-gold-light not-italic italic">Collection</em>
          </h1>
          <span className="block w-12 h-px bg-gold mx-auto mb-6" />
          <p className="font-sans text-[clamp(0.9rem,1.5vw,1.05rem)] text-white/50 max-w-[520px] mx-auto leading-[1.8]">
            Sterling silver deity statues, gemstone necklaces, and ceremonial
            artifacts — each piece shaped by generations of Newari craftsmanship.
          </p>
        </div>
      </section>

      <Suspense
        fallback={
          <div className="flex justify-center py-24 font-sans text-[0.7rem] tracking-[0.18em] uppercase text-stone">
            Loading pieces…
          </div>
        }
      >
        <ProductsContent products={products} categories={categories} />
      </Suspense>

      <InquiryBanner />
    </>
  );
}
