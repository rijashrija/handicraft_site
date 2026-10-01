"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ContactForm() {
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
