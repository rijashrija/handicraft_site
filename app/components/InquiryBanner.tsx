import Link from "next/link";

interface InquiryBannerProps {
  heading?: string;
  subtext?: string;
  ctaLabel?: string;
  ctaHref?: string;
  variant?: "dark" | "gold";
}

export default function InquiryBanner({
  heading = "Interested in a Piece?",
  subtext =
    "We welcome bespoke commissions and international inquiries. Every piece can be crafted to your specifications.",
  ctaLabel = "Send an Inquiry",
  ctaHref = "/contact",
  variant = "dark",
}: InquiryBannerProps) {
  const isDark = variant === "dark";

  return (
    <section
      className={`py-12 sm:py-20 flex flex-col items-center text-center ${
        isDark ? "bg-walnut" : "bg-gold-pale border-y border-border"
      }`}
    >
      <div className="container flex flex-col items-center gap-3">
        <span
          className={`font-sans text-[0.7rem] font-semibold tracking-[0.2em] uppercase mb-2 ${
            isDark ? "text-gold" : "text-stone"
          }`}
        >
          Bespoke Orders Welcome
        </span>
        <h2
          className={`font-serif font-normal text-3xl sm:text-4xl lg:text-5xl max-w-2xl leading-tight ${
            isDark ? "text-cream" : "text-walnut"
          }`}
        >
          {heading}
        </h2>
        <p
          className={`max-w-lg text-[0.95rem] leading-relaxed ${
            isDark ? "text-cream/60" : "text-stone"
          }`}
        >
          {subtext}
        </p>
        <div className="mt-6">
          <Link
            href={ctaHref}
            className={`inline-flex items-center gap-2 px-9 py-3.5 font-sans text-[0.8rem] tracking-[0.12em] uppercase transition-colors duration-250 border ${
              isDark
                ? "bg-gold text-walnut font-bold border-gold hover:bg-gold-light hover:border-gold-light"
                : "bg-walnut text-gold-pale font-semibold border-walnut hover:bg-gold hover:border-gold hover:text-walnut"
            }`}
          >
            {ctaLabel}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
