import Image from "next/image";
import InquiryBanner from "../components/InquiryBanner";
import ProcessAccordion from "../components/ProcessAccordion";
import defaultAboutData from "../../data/about.json";
import { getAbout } from '../lib/api'

export default async function AboutPage() {
  let aboutData: any = defaultAboutData;
  try {
    const data = await getAbout();
    if (data && data.mission) {
      aboutData = data;
      // Handle Django flat structure for artisan
      if (!aboutData.artisan && aboutData.artisan_name) {
        aboutData.artisan = {
          name: aboutData.artisan_name,
          image: aboutData.artisan_image,
          bio1: aboutData.artisan_bio1,
          bio2: aboutData.artisan_bio2,
        };
      }
    }
  } catch (err) {
    console.warn("Using fallback about data:", err);
  }
  const { mission, artisan, values, process, process_image, process_caption_label, process_caption_desc } = aboutData;

  return (
    <>
      <div className="h-[var(--spacing-nav)] bg-cream" />

      {/* ── MISSION STATEMENT ──────────────────────────────────── */}
      <section className="relative section overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/hero-bg.jpg"
          alt="Artisan workshop background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Dark overlay for legibility */}
        <div className="absolute inset-0 bg-walnut/65" />

        {/* Content */}
        <div className="relative z-10 container text-center">
          <span className="block font-sans text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-gold mb-6 animate-fade-up">
            Our Mission
          </span>
          <h1 className="font-serif font-light text-[clamp(2rem,5vw,4.5rem)] leading-[1.15] max-w-[900px] mx-auto animate-fade-up delay-150ms text-cream">
            {mission}
          </h1>
        </div>
      </section>

      {/* ── ARTISAN STORY ──────────────────────────────────────── */}
      <section className="p-0 bg-parchment">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative min-h-[500px]">
            <Image
              src={artisan.image}
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
              {artisan.name}
            </h2>
            <span className="block w-12 h-0.5 bg-gold mb-6" />
            <p className="text-base leading-relaxed text-walnut-mid mb-6">
              {artisan.bio1}
            </p>
            <p className="text-base leading-relaxed text-walnut-mid">
              {artisan.bio2}
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
            {values.map((value: { title: string; desc: string }, i: number) => (
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

      {/* ── MAKING PROCESS ─────────────────────────────────── */}
      <section className="section bg-walnut text-cream">
        <div className="container">
          {/* Section header */}
          <div className="mb-12">
            <span className="block font-sans text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-gold mb-4">
              The Making Process
            </span>
            <h2 className="font-serif font-normal text-[clamp(2rem,4vw,3rem)] text-gold-pale">
              From Silver Dust to Divine Form
            </h2>
          </div>

          {/* Two-column: accordion left · image right */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-[clamp(3rem,6vw,6rem)] items-start">

            {/* LEFT — accordion */}
            <ProcessAccordion steps={process} />

            {/* RIGHT — sticky image */}
            <div className="lg:sticky lg:top-[calc(var(--spacing-nav)+2rem)]">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={process_image || "/images/category-statues.jpg"}
                  alt={process_caption_desc || "Master artisan at work"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover"
                />
                {/* subtle dark overlay */}
                <div className="absolute inset-0 bg-walnut/25" />
                {/* caption strip */}
                <div className="absolute bottom-0 left-0 right-0 px-7 py-5 bg-walnut/70 backdrop-blur-sm">
                  <p className="font-sans text-[0.65rem] font-semibold tracking-[0.15em] uppercase text-gold">
                    {process_caption_label || "Patan Workshop"}
                  </p>
                  <p className="font-serif text-sm text-cream/80 mt-1">
                    {process_caption_desc || "Master artisan shaping silver by hand using traditional repoussé tools"}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <InquiryBanner variant="gold" />
    </>
  );
}
