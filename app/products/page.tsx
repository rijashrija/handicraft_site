import { Suspense } from "react";
import { getProducts, getCategories } from "../lib/api";
import ProductsContent from "./ProductsContent";
import InquiryBanner from "../components/InquiryBanner";

// ── Server Component — fetches data then passes it to the client ───
export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

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

      <Suspense
        fallback={
          <div className="container py-16 text-center text-stone">
            <p className="font-sans text-[0.7rem] font-semibold tracking-[0.2em] uppercase">
              Loading pieces...
            </p>
          </div>
        }
      >
        <ProductsContent products={products} categories={categories} />
      </Suspense>

      <InquiryBanner />
    </>
  );
}
