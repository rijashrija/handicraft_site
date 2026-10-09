import InquiryButtons from "./InquiryButtons";

interface InquiryBannerProps {
  heading?: string;
  subtext?: string;
  variant?: "dark" | "gold";
  waMessage?: string;
}

export default function InquiryBanner({
  heading = "Interested in a Piece?",
  subtext =
    "We welcome bespoke commissions and international inquiries. Every piece can be crafted to your specifications.",
  variant = "dark",
  waMessage,
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
          <InquiryButtons
            variant={isDark ? "dark" : "light"}
            waMessage={waMessage}
            formLabel="Send an Inquiry"
          />
        </div>
      </div>
    </section>
  );
}
