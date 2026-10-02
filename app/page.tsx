import Image from "next/image";
import Link from "next/link";
import { getProducts, getHome, getCategories } from "./lib/api";
import ProductSlider from "./components/ProductSlider";
import InquiryBanner from "./components/InquiryBanner";
import defaultHomeData from "../data/home.json";

export default async function HomePage() {
  let featured: any[] = [];
  let homeData: any = defaultHomeData;
  let categories: any[] = [];

  try {
    const [featuredRes, homeRes, categoriesRes] = await Promise.all([
      getProducts(undefined, true),
      getHome(),
      getCategories(),
    ]);
    featured = featuredRes ?? [];
    if (homeRes && homeRes.hero) homeData = homeRes;
    categories = categoriesRes ?? [];
  } catch (err) {
    console.warn("Using fallback data — backend unreachable:", err);
  }

  const { hero, heritage, process } = homeData;

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative h-[100svh] min-h-[600px] flex items-end overflow-hidden">
        {/* Background image */}
        <Image
          src={hero.backgroundImage}
          alt="Exquisite silver handicrafts display"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-walnut/90 via-walnut/50 to-walnut/15" />

        {/* Content */}
        <div className="container relative pb-[clamp(3rem,8vh,6rem)] pt-[var(--spacing-nav)]">
          <span className="block font-sans text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-gold mb-5 animate-fade-up">
            {hero.tagline}
          </span>
          <h1 className="font-serif font-light text-[clamp(3rem,7vw,6.5rem)] text-cream max-w-[800px] leading-[1.05] tracking-[-0.02em] mb-6 animate-fade-up delay-150ms">
            {hero.heading1}
            <br />
            <em className="text-gold-light">{hero.heading2}</em>
          </h1>
          <p className="text-cream/70 max-w-[480px] text-[1.05rem] leading-[1.75] mb-10 animate-fade-up delay-300ms">
            {hero.body}
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-up delay-450ms">
            <Link
              href={hero.ctaPrimary.href}
              className="inline-flex items-center gap-2 px-9 py-3.5 bg-gold text-walnut font-sans text-[0.8rem] font-bold tracking-[0.12em] uppercase border border-gold hover:bg-gold-light hover:border-gold-light transition-colors duration-250"
            >
              {hero.ctaPrimary.label}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href={hero.ctaSecondary.href}
              className="inline-flex items-center gap-2 px-9 py-3.5 bg-transparent text-cream font-sans text-[0.8rem] font-semibold tracking-[0.12em] uppercase border border-white/50 hover:bg-white/10 hover:border-gold-light hover:text-gold-light transition-colors duration-250"
            >
              {hero.ctaSecondary.label}
            </Link>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 right-[clamp(1.25rem,4vw,3rem)] flex flex-col items-center gap-2 animate-fade-up delay-600ms">
          <span className="text-[0.6rem] tracking-[0.2em] text-white/35 [writing-mode:vertical-rl]">
            SCROLL
          </span>
          <div className="w-[1px] h-12 bg-white/20" />
        </div>
      </section>

      {/* ── CATEGORY CARDS ───────────────────────────────────── */}
      <section className="section bg-cream">
        <div className="container">
          <div className="text-center mb-12">
            <span className="block font-sans text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-stone mb-3">
              Explore by Category
            </span>
            <h2 className="font-serif font-normal text-[clamp(1.75rem,3vw,2.75rem)]">
              Our Collections
            </h2>
            <span className="block w-12 h-0.5 bg-gold mx-auto mt-5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5">
            {categories.map((cat: any) => (
              <Link
                key={cat.slug}
                href={`/products?category=${cat.slug}`}
                className="group block overflow-hidden"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-walnut/85 to-walnut/10" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <span className="block font-sans text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-gold mb-2">
                      {cat.label}
                    </span>
                    <h3 className="font-serif font-normal text-2xl text-cream mb-3 leading-tight">
                      {cat.title}
                    </h3>
                    <p className="text-sm text-cream/65 leading-relaxed mb-5">
                      {cat.description}
                    </p>
                    <span className="font-sans text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-gold-light">
                      Explore →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS SLIDER ───────────────────────────── */}
      <ProductSlider products={featured} title="Featured Pieces" subtitle="Curated Selection" />

      {/* ── HERITAGE SECTION ─────────────────────────────────── */}
      <section className="section bg-cream">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(2rem,6vw,6rem)] items-center">
            {/* Image side */}
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={heritage.image}
                  alt={heritage.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              {/* Decorative offset frame */}
              <div className="absolute top-6 -left-6 right-6 -bottom-6 border border-border -z-10" />
            </div>

            {/* Text side */}
            <div>
              <span className="block font-sans text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-stone mb-4">
                {heritage.eyebrow}
              </span>
              <h2 className="font-serif font-normal text-[clamp(2rem,3.5vw,3rem)] leading-[1.1] mb-6">
                {heritage.heading1}
                <br />
                <em className="text-gold">{heritage.heading2}</em>
              </h2>
              <span className="block w-12 h-0.5 bg-gold mb-6" />
              <p className="text-[0.95rem] mb-6">{heritage.body1}</p>
              <p className="text-[0.95rem] mb-8">{heritage.body2}</p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
                {heritage.stats.map((stat: { num: string; label: string }) => (
                  <div key={stat.label}>
                    <div className="font-serif font-normal text-3xl text-gold leading-none">
                      {stat.num}
                    </div>
                    <div className="font-sans text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-stone mt-1.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href={heritage.cta.href}
                className="inline-flex items-center gap-2 px-9 py-3.5 bg-walnut text-gold-pale font-sans text-[0.8rem] font-semibold tracking-[0.12em] uppercase border border-walnut hover:bg-gold hover:border-gold hover:text-walnut transition-colors duration-250 mt-10"
              >
                {heritage.cta.label}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS STRIP ────────────────────────────────────── */}
      <section className="section-sm bg-walnut overflow-hidden">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-white/5">
            {process.map((step: { num: string; title: string; desc: string }) => (
              <div
                key={step.num}
                className="p-10 border-r border-b border-white/5"
              >
                <div className="font-serif font-light text-4xl text-gold/25 leading-none mb-4">
                  {step.num}
                </div>
                <h4 className="font-serif font-medium text-lg text-cream mb-3">
                  {step.title}
                </h4>
                <p className="text-sm text-white/45 leading-relaxed m-0">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INQUIRY CTA ──────────────────────────────────────── */}
      <InquiryBanner />
    </>
  );
}
