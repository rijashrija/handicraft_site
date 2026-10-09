import Link from "next/link";
import { getContact, getCategories, getNavlinks } from "../lib/api";
import defaultContactData from "../../data/contact.json";

export default async function Footer() {
  let contact = defaultContactData;
  let categories: any[] = [];
  
  try {
    const data = await getContact();
    if (data && data.email) {
      contact = data;
    }
  } catch (err) {
    // fallback to static JSON
    contact = {
      heading: "Bespoke Inquiries and Custom Orders",
      subheading: "Get in Touch",
      intro: "We work with clients globally, offering insured shipping for all our handcrafted pieces. Reach out to discuss availability, pricing, or commissioned works.",
      location: {
        street: "Bholdhoka, Lalitpur",
        city: "Patan, Nepal"
      },
      email: "lbajracharya2019@gmail.com",
      phone: "+977 9843644982",
      phoneHref: "tel:+9779845510022",
      socials: [
        { label: "Instagram", href: "https://www.instagram.com/nepals_handicrafts/" },
        { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61590620619068" },
        { label: "WhatsApp", href: "#" }
      ]
    };
  }

  try {
    const catData = await getCategories();
    if (Array.isArray(catData)) {
      categories = catData;
    }
  } catch (err) {
    // fallback if categories fail to load
    categories = [
      { slug: "silver-idols", label: "Silver Idols" },
      { slug: "necklaces", label: "Necklaces" },
      { slug: "artifacts", label: "Cultural Artifacts" },
      { slug: "gemstone", label: "Gemstone Pieces" }
    ];
  }

  let navlinks: { href: string; label: string }[] = [];
  try {
    const navData = await getNavlinks();
    if (Array.isArray(navData)) {
      navlinks = navData;
    }
  } catch (err) {
    // fallback if navlinks fail to load
    navlinks = [
      { href: "/", label: "Home" },
      { href: "/products", label: "Collection" },
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact & Inquire" },
    ];
  }

  const { location, email, phone, phoneHref, socials } = contact;

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
              {navlinks.map((link) => (
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
              {categories.filter(c => c.is_visible !== false).slice(0, 4).map((category) => (
                <Link
                  key={category.slug}
                  href={`/products?category=${category.slug}`}
                  className="text-white/55 text-sm hover:text-gold-light transition-colors duration-200 capitalize"
                >
                  {category.label}
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
                  {location?.street}<br />
                  {location?.city}
                </p>
              </div>
              <div>
                <div className="text-[0.65rem] tracking-[0.1em] uppercase text-white/35 mb-1">Email</div>
                <a
                  href={`mailto:${email}`}
                  className="text-gold-light text-sm hover:underline"
                >
                  {email}
                </a>
              </div>
              <div>
                <div className="text-[0.65rem] tracking-[0.1em] uppercase text-white/35 mb-1">Phone / WhatsApp</div>
                <a
                  href={phoneHref || `tel:${phone}`}
                  className="text-white/60 text-sm hover:text-gold-light transition-colors"
                >
                  {phone}
                </a>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex gap-4 mt-6">
              {socials?.map((s: { label: string; href: string }) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  title={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 border border-white/20 flex items-center justify-center text-[0.55rem] font-bold tracking-[0.05em] text-white/50 hover:border-gold hover:text-gold transition-colors duration-200"
                >
                  {s.label.slice(0, 2).toUpperCase()}
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
