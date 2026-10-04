import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts, products } from "../../lib/products";
import ProductCard from "../../components/ProductCard";
import InquiryBanner from "../../components/InquiryBanner";
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
                  Contact us directly on WhatsApp for pricing, availability, and bespoke customisation. We ship worldwide with full insurance.
                </p>
                <a
                  href={`https://wa.me/9845510022?text=${encodeURIComponent(`Hi, I'm interested in *${product.name}*. Could you please share more details about pricing and availability?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex justify-center items-center gap-2 px-9 py-3.5 bg-[#25D366] text-white font-sans text-[0.8rem] font-semibold tracking-[0.12em] uppercase border border-[#25D366] hover:bg-[#1ebe5d] hover:border-[#1ebe5d] transition-colors duration-250"
                >
                  {/* WhatsApp icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                  </svg>
                  Inquire on WhatsApp
                </a>
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
