import Image from "next/image";
import InquiryBanner from "../components/InquiryBanner";

export default function AboutPage() {
  return (
    <>
      <div className="h-[var(--spacing-nav)] bg-cream" />

      {/* ── MISSION STATEMENT ──────────────────────────────────── */}
      <section className="section bg-cream">
        <div className="container text-center">
          <span className="block font-sans text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-gold mb-6 animate-fade-up">
            Our Mission
          </span>
          <h1 className="font-serif font-light text-[clamp(2rem,5vw,4.5rem)] leading-[1.15] max-w-[900px] mx-auto animate-fade-up delay-150ms">
            To preserve the ancient metalworking heritage of Patan, translating spiritual devotion into enduring silver treasures for the modern world.
          </h1>
        </div>
      </section>

      {/* ── ARTISAN STORY ──────────────────────────────────────── */}
      <section className="p-0 bg-parchment">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative min-h-[500px]">
            <Image
              src="/images/category-statues.jpg"
              alt="Artisan at work"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          
          {/* Content */}
          <div className="p-[clamp(3rem,6vw,6rem)] flex flex-col justify-center">
            <span className="block font-sans text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-stone mb-4">
              The Master Artisan
            </span>
            <h2 className="font-serif font-normal text-[clamp(1.75rem,3.5vw,2.75rem)] mb-6">
              Ram Prasad Sharma
            </h2>
            <span className="block w-12 h-0.5 bg-gold mb-6" />
            <p className="text-base leading-relaxed text-walnut-mid mb-6">
              Born into a family of traditional silversmiths in the heart of Patan, Ram Prasad Sharma began his apprenticeship at the age of twelve. Under the strict tutelage of his father, he learned the rigorous disciplines of repoussé and filigree — techniques that have defined Newari metalwork since the Licchavi period.
            </p>
            <p className="text-base leading-relaxed text-walnut-mid">
              Today, with over 35 years of experience, he is recognised as one of the few remaining master craftsmen capable of executing large-scale deity statues with absolute iconographic precision. His hands carry the knowledge of centuries, coaxing divine forms from cold metal with patience, reverence, and extraordinary skill.
            </p>
          </div>
        </div>
      </section>

      {/* ── CULTURAL VALUES ────────────────────────────────────── */}
      <section className="section bg-cream">
        <div className="container">
          <div className="text-center mb-16">
            <span className="block font-sans text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-stone mb-3">
              Our Philosophy
            </span>
            <h2 className="font-serif font-normal text-[clamp(1.75rem,3.5vw,2.75rem)]">
              Guided by Tradition
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Ancient Traditions",
                desc: "We do not compromise on technique. Every piece is crafted using the same hand-tools and methods employed by the artisans of the royal courts centuries ago. We believe the energy of the maker remains in the object.",
              },
              {
                title: "Precious Materials",
                desc: "We source only 92.5 sterling silver and 999 fine silver. Our gemstones — from Tibetan turquoise to deep lapis lazuli — are individually selected for their character, colour, and spiritual resonance.",
              },
              {
                title: "Handcrafted Excellence",
                desc: "In an era of mass production, we offer the luxury of time. A single deity statue may take months to complete. This dedication to excellence ensures each piece is a unique heirloom, built to last generations.",
              },
            ].map((value, i) => (
              <div key={i} className="text-center p-8 bg-parchment border border-border">
                <div className="w-10 h-10 rounded-full bg-gold text-walnut flex items-center justify-center font-serif text-xl mx-auto mb-6">
                  {i + 1}
                </div>
                <h3 className="font-serif font-medium text-2xl mb-4">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-walnut-mid">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDITORIAL APPROACH ─────────────────────────────────── */}
      <section className="section bg-walnut text-cream">
        <div className="container-narrow">
          <span className="block font-sans text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-gold mb-6">
            The Making Process
          </span>
          <h2 className="font-serif font-normal text-[clamp(2rem,4vw,3rem)] mb-12 text-gold-pale">
            From Silver Dust to Divine Form
          </h2>

          <div className="flex flex-col gap-10">
            {[
              { step: "01", title: "Conceptualisation & Wax Modelling", desc: "For complex deity figures, the process begins with a precise sketch following traditional iconographic proportions (talamana). A master model is then meticulously carved in beeswax, capturing every nuance of expression and posture." },
              { step: "02", title: "Casting & Repoussé", desc: "Depending on the piece, the silver is either cast using the ancient lost-wax method or hammered into shape using repoussé. Repoussé involves working the silver sheet from the reverse side to create relief designs — a technique demanding extraordinary spatial awareness." },
              { step: "03", title: "Chasing & Engraving", desc: "Once the basic form is established, the artisan uses fine steel tools to chase (refine from the front) and engrave intricate details: the folds of a robe, the pattern of a crown, the serene curve of an eye." },
              { step: "04", title: "Stone Setting & Gilding", desc: "Precious stones are set by hand. For select pieces, 24K gold is applied to specific areas (such as robes or faces) using traditional fire gilding or modern electroplating, creating a striking contrast with the silver." },
              { step: "05", title: "Polishing & Consecration", desc: "The final piece is polished to a high luster or treated to achieve an antique oxidised finish. In local tradition, the finished idol is then ready to be awakened through consecration rituals." },
            ].map((item, i) => (
              <div key={i} className="flex gap-6 border-b border-white/10 pb-10">
                <div className="font-serif text-3xl text-gold leading-none min-w-[40px]">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-cream mb-3">
                    {item.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed text-[0.95rem]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <InquiryBanner />
    </>
  );
}
