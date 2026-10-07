"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isTransparent = isHome && !scrolled;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-[var(--spacing-nav)] flex items-center transition-all duration-300 ${
          isTransparent ? "bg-transparent" : "bg-cream shadow-[0_1px_0_var(--color-border)]"
        }`}
      >
        <div className="container flex items-center justify-between h-full">
          {/* Left nav links */}
          <div className="hidden md:flex gap-8 items-center flex-1">
            {[
              { href: "/", label: "Home" },
              { href: "/products", label: "Collection" },
              { href: "/gallery", label: "Gallery" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-sans text-xs font-medium tracking-[0.12em] uppercase relative pb-[2px] transition-colors duration-200 border-b ${
                  pathname === link.href
                    ? isTransparent
                      ? "opacity-100 border-gold-light"
                      : "opacity-100 border-gold"
                    : "opacity-70 border-transparent"
                } ${isTransparent ? "text-cream hover:opacity-100" : "text-walnut hover:text-gold"}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Center logo */}
          <Link
            href="/"
            className="flex-1 flex flex-col items-center text-center"
          >
            <span
              className={`font-serif text-2xl tracking-[0.06em] block transition-colors duration-300 ${
                isTransparent ? "text-gold-light" : "text-gold"
              }`}
            >
              Arya Silver Arts
            </span>
            <span
              className={`text-[0.6rem] tracking-[0.22em] uppercase font-sans ${
                isTransparent ? "text-white/50" : "text-stone"
              }`}
            >
              Est. 1987 · Patan, Nepal
            </span>
          </Link>

          {/* Right nav links */}
          <div className="hidden md:flex gap-8 items-center flex-1 justify-end">
            {[
              { href: "/about", label: "About" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-sans text-xs font-medium tracking-[0.12em] uppercase relative pb-[2px] transition-colors duration-200 border-b ${
                  pathname === link.href
                    ? isTransparent
                      ? "opacity-100 border-gold-light"
                      : "opacity-100 border-gold"
                    : "opacity-70 border-transparent"
                } ${isTransparent ? "text-cream hover:opacity-100" : "text-walnut hover:text-gold"}`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className={`font-sans text-[0.7rem] font-semibold tracking-[0.14em] uppercase px-5 py-2 border transition-all duration-200 ${
                isTransparent
                  ? "text-gold-light border-gold-light/60 hover:bg-white/10"
                  : "text-walnut border-border hover:border-gold hover:text-gold"
              }`}
            >
              Inquire
            </Link>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="md:hidden flex flex-col gap-[5px] p-2"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`block w-[22px] h-[1.5px] transition-all duration-200 ${
                  isTransparent ? "bg-cream" : "bg-walnut"
                } ${
                  menuOpen && i === 0
                    ? "translate-y-[6.5px] rotate-45"
                    : menuOpen && i === 2
                      ? "-translate-y-[6.5px] -rotate-45"
                      : menuOpen && i === 1
                        ? "scale-x-0 opacity-0"
                        : ""
                }`}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[49] bg-walnut flex flex-col items-center justify-center gap-10 transition-all duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {[
          { href: "/", label: "Home" },
          { href: "/products", label: "Collection" },
          { href: "/gallery", label: "Gallery" },
          { href: "/about", label: "About" },
          { href: "/contact", label: "Contact & Inquire" },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-serif text-3xl text-cream tracking-wide hover:text-gold transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </>
  );
}
