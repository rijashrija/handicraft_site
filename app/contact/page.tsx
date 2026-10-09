import { Suspense } from "react";
import ContactForm from "./ContactForm";
import defaultContactData from "../../data/contact.json";
import { getContact } from "../lib/api";

export default async function ContactPage() {
  let contactData = defaultContactData;
  try {
    const data = await getContact();
    if (data && data.heading) {
      contactData = data;
    }
  } catch (err) {
    console.warn("Using default contact data fallback due to API error:", err);
  }

  const { heading, subheading, intro, location, email, phone, phoneHref, socials } = contactData;

  return (
    <>
      <div className="h-[var(--spacing-nav)] bg-cream" />

      <section className="section bg-cream">
        <div className="container">
          <div className="text-center mb-16">
            <span className="block font-sans text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-gold mb-4">{subheading}</span>
            <h1 className="font-serif font-normal text-[clamp(2.5rem,5vw,4rem)] leading-[1.1]">
              {heading}
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-[clamp(3rem,8vw,6rem)] items-start">

            {/* Left: Form */}
            <div>
              <h2 className="font-serif text-3xl mb-8">Send us a Message</h2>
              <Suspense fallback={<div>Loading form...</div>}>
                <ContactForm />
              </Suspense>
            </div>

            {/* Right: Info */}
            <div className="bg-walnut text-cream p-8 sm:p-12 flex flex-col gap-10">
              <div>
                <h2 className="font-serif text-2xl text-gold-pale mb-6">Contact Information</h2>
                <p className="text-white/70 text-[0.95rem] leading-relaxed mb-8">
                  {intro}
                </p>
              </div>

              <div className="flex flex-col gap-6">
                <div>
                  <div className="text-[0.65rem] tracking-[0.1em] uppercase text-gold mb-1.5">Studio Location</div>
                  <p className="text-white/80 text-[0.95rem] leading-relaxed mb-2">
                    {location.street}<br />
                    {location.city}
                  </p>

                </div>

                <div>
                  <div className="text-[0.65rem] tracking-[0.1em] uppercase text-gold mb-1.5">Direct Contact</div>
                  <a href={`mailto:${email}`} className="block text-white/80 text-[0.95rem] hover:text-gold transition-colors mb-1.5">
                    {email}
                  </a>
                  <a href={phoneHref} className="block text-white/80 text-[0.95rem] hover:text-gold transition-colors">
                    {phone}
                  </a>
                </div>

                <div>
                  <div className="text-[0.65rem] tracking-[0.1em] uppercase text-gold mb-3">Social Media</div>
                  <div className="flex gap-4">
                    {socials.map((social) => (
                      <a key={social.label} href={social.href} className="text-[0.85rem] text-white/60 hover:text-gold transition-colors">
                        {social.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Embed */}
          <div className="mt-16 w-full h-[400px] rounded-lg overflow-hidden shadow-lg border border-gold/20 bg-walnut/5">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.796915860133!2d85.3298491!3d27.6715024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19f3a0d4dd23%3A0x4c891e8caeb91666!2sNepals%20Handicrafts!5e0!3m2!1sen!2sus!4v1791090040377!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Nepals Handicrafts Location Map"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
}
