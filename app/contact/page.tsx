"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ContactForm() {
  const searchParams = useSearchParams();
  const productParam = searchParams.get("product") || "";
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    product: productParam,
    message: "",
  });
  
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => setSubmitted(true), 800);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (submitted) {
    return (
      <div className="text-center py-16 px-8 bg-parchment border border-border">
        <div className="w-16 h-16 rounded-full bg-gold text-walnut flex items-center justify-center mx-auto mb-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <h3 className="font-serif text-3xl mb-4">Inquiry Received</h3>
        <p className="text-walnut-mid">Thank you for reaching out. A member of our team will be in touch with you shortly to discuss your requirements.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="font-sans text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-stone">Full Name *</label>
          <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} placeholder="John Doe" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="font-sans text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-stone">Email Address *</label>
          <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} placeholder="john@example.com" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="font-sans text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-stone">Phone / WhatsApp</label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="country" className="font-sans text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-stone">Country</label>
          <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} placeholder="United States" />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="product" className="font-sans text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-stone">Product of Interest</label>
        <input type="text" id="product" name="product" value={formData.product} onChange={handleChange} placeholder="e.g. Shiva Nataraja Statue" />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="font-sans text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-stone">Your Message *</label>
        <textarea id="message" name="message" required rows={5} value={formData.message} onChange={handleChange} placeholder="Please provide details about your inquiry, customisation requests, or shipping questions..."></textarea>
      </div>

      <button
        type="submit"
        className="self-start inline-flex items-center gap-2 px-9 py-3.5 bg-walnut text-gold-pale font-sans text-[0.8rem] font-semibold tracking-[0.12em] uppercase border border-walnut hover:bg-gold hover:border-gold hover:text-walnut transition-colors duration-250"
      >
        Submit Inquiry
      </button>
    </form>
  );
}

export default function ContactPage() {
  return (
    <>
      <div className="h-[var(--spacing-nav)] bg-cream" />

      <section className="section bg-cream">
        <div className="container">
          <div className="text-center mb-16">
            <span className="block font-sans text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-gold mb-4">Get in Touch</span>
            <h1 className="font-serif font-normal text-[clamp(2.5rem,5vw,4rem)] leading-[1.1]">
              Bespoke Inquiries &<br />Custom Orders
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
                  We work with clients globally, offering insured shipping for all our handcrafted pieces. Reach out to discuss availability, pricing, or commissioned works.
                </p>
              </div>

              <div className="flex flex-col gap-6">
                <div>
                  <div className="text-[0.65rem] tracking-[0.1em] uppercase text-gold mb-1.5">Studio Location</div>
                  <p className="text-white/80 text-[0.95rem] leading-relaxed">
                    Mangalbazar, Patan<br />
                    Lalitpur, Nepal
                  </p>
                </div>
                
                <div>
                  <div className="text-[0.65rem] tracking-[0.1em] uppercase text-gold mb-1.5">Direct Contact</div>
                  <a href="mailto:info@aryasilverarts.com" className="block text-white/80 text-[0.95rem] hover:text-gold transition-colors mb-1.5">
                    info@aryasilverarts.com
                  </a>
                  <a href="tel:+9779801234567" className="block text-white/80 text-[0.95rem] hover:text-gold transition-colors">
                    +977 980 123 4567
                  </a>
                </div>

                <div>
                  <div className="text-[0.65rem] tracking-[0.1em] uppercase text-gold mb-3">Social Media</div>
                  <div className="flex gap-4">
                    {["Instagram", "Facebook", "WhatsApp"].map((social) => (
                      <a key={social} href="#" className="text-[0.85rem] text-white/60 hover:text-gold transition-colors">
                        {social}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </>
  );
}
