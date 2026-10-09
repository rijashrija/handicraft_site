import Link from "next/link";

const WA_NUMBER = "9845510022";
const WA_DEFAULT_MSG = "Hi, I'd like to inquire about your handcrafted silver pieces.";

interface InquiryButtonsProps {
  /** Pre-filled WhatsApp message */
  waMessage?: string;
  /** Layout: 'row' (side-by-side) or 'stack' (full-width column) */
  layout?: "row" | "stack";
  /** Style variant to match surrounding context */
  variant?: "light" | "dark";
  /** Label for the form inquiry button */
  formLabel?: string;
}

export default function InquiryButtons({
  waMessage = WA_DEFAULT_MSG,
  layout = "row",
  variant = "light",
  formLabel = "Send an Inquiry",
}: InquiryButtonsProps) {
  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMessage)}`;
  const isStack = layout === "stack";
  const isDark = variant === "dark";

  return (
    <div
      className={`flex gap-3 ${
        isStack ? "flex-col w-full" : "flex-wrap items-center"
      }`}
    >
      {/* WhatsApp button — always green */}
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        title="Quick reply via WhatsApp"
        className={`inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#25D366] text-white font-sans text-[0.78rem] font-semibold tracking-[0.12em] uppercase border border-[#25D366] hover:bg-[#1ebe5d] hover:border-[#1ebe5d] transition-colors duration-200 ${
          isStack ? "w-full" : ""
        }`}
      >
        {/* WhatsApp SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          fill="currentColor"
          viewBox="0 0 16 16"
          aria-hidden="true"
        >
          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
        </svg>
        WhatsApp
        <span className="hidden sm:inline opacity-75 text-[0.65rem] normal-case tracking-normal font-normal">
          — faster reply
        </span>
      </a>

      {/* Inquiry form button */}
      <Link
        href="/contact"
        className={`inline-flex items-center justify-center gap-2 px-7 py-3.5 font-sans text-[0.78rem] font-semibold tracking-[0.12em] uppercase border transition-colors duration-200 ${
          isStack ? "w-full" : ""
        } ${
          isDark
            ? "bg-transparent text-cream border-white/40 hover:border-gold-light hover:text-gold-light"
            : "bg-transparent text-walnut border-border hover:border-gold hover:text-gold"
        }`}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        {formLabel}
      </Link>
    </div>
  );
}
