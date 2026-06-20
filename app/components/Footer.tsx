import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-walnut text-cream pt-20 pb-10">
      <div className="container">
        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand */}
          <div className="col-span-1">
            <div className="font-serif text-3xl text-gold-light mb-2">
              Arya Silver Arts
            </div>
            <div className="text-[0.65rem] tracking-[0.2em] uppercase text-white/35 mb-6">
              Est. 1987 · Patan, Nepal
            </div>
            <p className="text-sm leading-relaxed text-white/55 max-w-[260px]">
              Handcrafting precious silver treasures for over three decades, 
              rooted in the ancient metalworking traditions of Patan's Durbar Square.
            </p>
            {/* Gold rule */}
            <div className="w-10 h-[1px] bg-gold mt-6" />
          </div>

          {/* Quick Links */}
          <div>
            <div className="font-sans text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-gold mb-5">
              Navigate
            </div>
            <div className="flex flex-col gap-3">
              {[
                { href: "/", label: "Home" },
                { href: "/products", label: "Collection" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact & Inquire" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/55 text-sm hover:text-gold-light transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Collections */}
          <div>
            <div className="font-sans text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-gold mb-5">
              Collections
            </div>
            <div className="flex flex-col gap-3">
              {[
                { href: "/products?category=silver-idols", label: "Silver Idols" },
                { href: "/products?category=necklaces", label: "Necklaces" },
                { href: "/products?category=artifacts", label: "Cultural Artifacts" },
                { href: "/products?category=gemstone", label: "Gemstone Pieces" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/55 text-sm hover:text-gold-light transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="font-sans text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-gold mb-5">
              Contact
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <div className="text-[0.65rem] tracking-[0.1em] uppercase text-white/35 mb-1">Location</div>
                <p className="text-white/60 text-sm leading-relaxed">
                  Mangalbazar, Patan<br />
                  Lalitpur, Nepal
                </p>
              </div>
              <div>
                <div className="text-[0.65rem] tracking-[0.1em] uppercase text-white/35 mb-1">Email</div>
                <a
                  href="mailto:info@aryasilverarts.com"
                  className="text-gold-light text-sm hover:underline"
                >
                  info@aryasilverarts.com
                </a>
              </div>
              <div>
                <div className="text-[0.65rem] tracking-[0.1em] uppercase text-white/35 mb-1">Phone / WhatsApp</div>
                <a
                  href="tel:+9779801234567"
                  className="text-white/60 text-sm hover:text-gold-light transition-colors"
                >
                  +977 980 123 4567
                </a>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex gap-4 mt-6">
              {[
                { label: "Instagram", href: "#", icon: "IG" },
                { label: "Facebook", href: "#", icon: "FB" },
                { label: "WhatsApp", href: "#", icon: "WA" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  title={s.label}
                  className="w-8 h-8 border border-white/20 flex items-center justify-center text-[0.55rem] font-bold tracking-[0.05em] text-white/50 hover:border-gold hover:text-gold transition-colors duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 gap-4 text-center sm:text-left">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Arya Silver Arts. All rights reserved.
          </p>
          <p className="text-[0.7rem] text-white/25 tracking-[0.08em]">
            Handcrafted in Patan, Nepal
          </p>
        </div>
      </div>
    </footer>
  );
}
