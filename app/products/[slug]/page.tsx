import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts, products } from "../../lib/products";
import ProductCard from "../../components/ProductCard";
import InquiryBanner from "../../components/InquiryBanner";
import InquiryButtons from "../../components/InquiryButtons";
import Link from 'next/link'
export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return { title: product.name, description: product.shortDesc };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const related = getRelatedProducts(slug, product.category, 20);

  const specs = [
    { key: "Material", val: product.material },
    ...(product.stones ? [{ key: "Stones", val: product.stones }] : []),
    ...(product.weight ? [{ key: "Weight", val: product.weight }] : []),
    ...(product.dimensions ? [{ key: "Dimensions", val: product.dimensions }] : []),
    { key: "Finish", val: product.finish },
  ];

  return (
    <>
      <div className="h-[var(--spacing-nav)]" />

      {/* Breadcrumb */}
      <div className="bg-cream border-b border-border py-3.5">
        <div className="container flex items-center gap-2.5 font-sans text-[0.72rem] tracking-[0.08em] text-stone">
          <Link href="/" className="hover:text-walnut transition-colors">Home</Link>
          <span className="text-border">›</span>
          <Link href="/products" className="hover:text-walnut transition-colors">Collection</Link>
          <span className="text-border">›</span>
          <span className="text-walnut">{product.name}</span>
        </div>
      </div>

      {/* Product hero */}
      <section className="bg-cream py-[clamp(2rem,5vw,5rem)]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(2rem,5vw,5rem)] items-start">

            {/* Image */}
            <div>
              <div className="relative aspect-[4/5] overflow-hidden bg-parchment">
                <Image src={product.image} alt={product.name} fill priority sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-3 mt-3">
                  {product.images.map((img, i) => (
                    <div key={i} className={`relative w-20 aspect-square overflow-hidden cursor-pointer ${i === 0 ? "border-2 border-gold" : "border border-border"}`}>
                      <Image src={img} alt={`view ${i + 1}`} fill sizes="80px" className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="pt-2">
              <span className="block font-sans text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-gold mb-3">{product.categoryLabel}</span>
              <h1 className="font-serif font-normal text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.1] mb-4">{product.name}</h1>
              <span className="block w-12 h-0.5 bg-gold mb-4" />
              <p className="text-[0.95rem] leading-relaxed text-walnut-mid mb-8">{product.shortDesc}</p>

              {/* Specs */}
              <div className="bg-parchment border border-border p-6 mb-8">
                <div className="font-sans text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-stone mb-4">Specifications</div>
                <div className="grid grid-cols-[auto_1fr] gap-y-3 gap-x-6">
                  {specs.map((row) => (
                    <div key={row.key} className="contents">
                      <span className="font-sans text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-stone pt-0.5">{row.key}</span>
                      <span className="text-[0.9rem] text-walnut">{row.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inquiry CTA */}
              <div className="bg-gold-pale border border-gold p-6 mb-6">
                <p className="text-[0.85rem] text-walnut-mid leading-relaxed mb-4">
                  Contact us on WhatsApp for a faster reply — or send a detailed inquiry via our form. We ship worldwide with full insurance.
                </p>
                <InquiryButtons
                  layout="stack"
                  variant="light"
                  waMessage={`Hi, I'm interested in *${product.name}*. Could you please share more details about pricing and availability?`}
                  formLabel="Send Inquiry Form"
                />
              </div>

              {/* Trust badges */}
              <div className="flex gap-6 flex-wrap">
                {["Worldwide Shipping", "Fully Insured", "Bespoke Orders", "Hallmarked Silver"].map((b) => (
                  <div key={b} className="flex items-center gap-2 font-sans text-[0.7rem] text-stone">
                    <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-gold" />
                    {b}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Related */}
      {related.length > 0 && (
        <section className="section bg-parchment border-t border-border">
          <div className="container">
            <div className="mb-10">
              <span className="block font-sans text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-gold mb-3">You May Also Like</span>
              <h2 className="font-serif font-normal text-[clamp(1.5rem,2.5vw,2rem)]">More from {product.categoryLabel}</h2>
            </div>
            <div className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory scrollbar-hide">
              {related.map((p) => (
                <div key={p.slug} className="snap-start shrink-0 w-[85vw] sm:w-[45vw] lg:w-[30vw]">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <InquiryBanner />
    </>
  );
}
