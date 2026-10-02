"use client";

// ─────────────────────────────────────────────────────────────────
// STEP 1: Import Zod
//
// Zod is a "schema validation" library. Think of a schema as a
// rulebook: it describes the exact shape and rules your data must
// follow. If any rule is broken, Zod gives you a clear error message.
//
// We import `z` — it's the main object. Everything in Zod starts
// with `z.something(...)`.
// ─────────────────────────────────────────────────────────────────
import { z } from "zod";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

// ─────────────────────────────────────────────────────────────────
// STEP 2: Define the Schema
//
// `z.object({...})` creates a schema for an object (our form data).
// Inside, each key maps to a Zod type + chain of rules.
//
// Common Zod types:
//   z.string()          → must be a string
//   z.string().email()  → must be a valid email format
//   z.string().min(2)   → string with at least 2 characters
//   z.string().optional() → the field is not required (can be empty)
//
// `.min(n, "message")` → if the rule fails, show this error message
// ─────────────────────────────────────────────────────────────────
const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Full name must be at least 2 characters"),  // required, min 2 chars

  email: z
    .string()
    .email("Please enter a valid email address"),         // must match email format

  phone: z
    .string()
    .optional()                                           // optional field
    .or(z.literal("")),                                   // allow empty string too

  country: z
    .string()
    .optional()
    .or(z.literal("")),                                   // optional

  product: z
    .string()
    .optional()
    .or(z.literal("")),                                   // optional

  message: z
    .string()
    .min(10, "Message must be at least 10 characters"),  // required, min 10 chars
});

// ─────────────────────────────────────────────────────────────────
// STEP 3: Extract the TypeScript type FROM the schema
//
// Normally you'd write a type manually:
//   type FormData = { name: string; email: string; ... }
//
// With Zod, you can generate this automatically using `z.infer<>`.
// This guarantees your type and your validation rules are ALWAYS
// in sync — change one, the other updates automatically.
// ─────────────────────────────────────────────────────────────────
type ContactFormData = z.infer<typeof contactSchema>;

// ─────────────────────────────────────────────────────────────────
// STEP 4: Define the errors state shape
//
// `Partial<>` means every key is optional — we only show errors
// for fields that have actually been touched/failed.
//
// Record<string, string | undefined> means:
//   { fieldName: "error message" | undefined }
// ─────────────────────────────────────────────────────────────────
type FormErrors = Partial<Record<keyof ContactFormData, string>>;

export default function ContactForm() {
  const searchParams = useSearchParams();
  const productParam = searchParams.get("product") || "";

  // ─────────────────────────────────────────────────────────────
  // STEP 5: State — formData, errors, and submitted
  //
  // - formData: the current values of all fields
  // - errors:   an object holding per-field error messages
  //             e.g. { name: "Must be at least 2 characters" }
  // - submitted: controls whether to show the success screen
  // ─────────────────────────────────────────────────────────────
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    country: "",
    product: productParam,
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  // ─────────────────────────────────────────────────────────────
  // STEP 6: handleChange — validate a single field as the user types
  //
  // We use `contactSchema.shape[fieldName]` to get just one field's
  // validator (e.g. just the `email` rule), then call `.safeParse()`
  // on the new value.
  //
  // `safeParse()` never throws — it returns:
  //   { success: true,  data: validValue }    → valid
  //   { success: false, error: ZodError }     → invalid
  //
  // We use this to show/clear errors in real-time as the user types.
  // ─────────────────────────────────────────────────────────────
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Update the form data first
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate just this one field using the schema's shape
    const fieldSchema = contactSchema.shape[name as keyof ContactFormData];
    const result = fieldSchema.safeParse(value);

    if (result.success) {
      // Clear the error for this field (it's now valid)
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    } else {
      // Show the first error message for this field
      setErrors((prev) => ({
        ...prev,
        [name]: result.error.errors[0].message,
      }));
    }
  };

  // ─────────────────────────────────────────────────────────────
  // STEP 7: handleSubmit — validate ALL fields at once on submit
  //
  // `contactSchema.safeParse(formData)` checks the entire object
  // against all rules at once.
  //
  // If invalid, `error.flatten()` gives us a clean object:
  //   { fieldErrors: { name: ["..."], email: ["..."] } }
  //
  // We extract the first message for each field and store them
  // in our `errors` state, which then renders under each input.
  // ─────────────────────────────────────────────────────────────
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = contactSchema.safeParse(formData);

    if (!result.success) {
      // Flatten turns the Zod error into { fieldErrors: { name: [...] } }
      const fieldErrors = result.error.flatten().fieldErrors;

      // Pick only the first error per field
      const firstErrors: FormErrors = {};
      for (const key in fieldErrors) {
        const k = key as keyof ContactFormData;
        firstErrors[k] = fieldErrors[k]?.[0];
      }
      setErrors(firstErrors);
      return; // Stop — don't submit if invalid
    }

    // All valid! Clear errors and submit
    setErrors({});
    setTimeout(() => setSubmitted(true), 800);
  };

  // ─── Success screen ─────────────────────────────────────────
  if (submitted) {
    return (
      <div className="text-center py-16 px-8 bg-parchment border border-border">
        <div className="w-16 h-16 rounded-full bg-gold text-walnut flex items-center justify-center mx-auto mb-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h3 className="font-serif text-3xl mb-4">Inquiry Received</h3>
        <p className="text-walnut-mid">Thank you for reaching out. A member of our team will be in touch with you shortly to discuss your requirements.</p>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // STEP 8: Render — show error messages below each field
  //
  // `errors.name` will be a string (the error) or undefined (no error).
  // We render it only when it exists using: {errors.name && <p>...</p>}
  // ─────────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8" noValidate>
      {/* noValidate disables the browser's built-in validation popup
          so Zod's validation (our custom messages) takes over */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* ── Name ── */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="font-sans text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-stone">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className={errors.name ? "border-red-400 focus:ring-red-300" : ""}
          />
          {/* Show error only when it exists */}
          {errors.name && (
            <p className="text-red-500 text-[0.75rem] mt-0.5">{errors.name}</p>
          )}
        </div>

        {/* ── Email ── */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="font-sans text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-stone">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className={errors.email ? "border-red-400 focus:ring-red-300" : ""}
          />
          {errors.email && (
            <p className="text-red-500 text-[0.75rem] mt-0.5">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* ── Phone ── */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="font-sans text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-stone">
            Phone / WhatsApp
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
          />
          {errors.phone && (
            <p className="text-red-500 text-[0.75rem] mt-0.5">{errors.phone}</p>
          )}
        </div>

        {/* ── Country ── */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="country" className="font-sans text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-stone">
            Country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="United States"
          />
        </div>
      </div>

      {/* ── Product ── */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="product" className="font-sans text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-stone">
          Product of Interest
        </label>
        <input
          type="text"
          id="product"
          name="product"
          value={formData.product}
          onChange={handleChange}
          placeholder="e.g. Shiva Nataraja Statue"
        />
      </div>

      {/* ── Message ── */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="font-sans text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-stone">
          Your Message *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Please provide details about your inquiry, customisation requests, or shipping questions..."
          className={errors.message ? "border-red-400 focus:ring-red-300" : ""}
        ></textarea>
        {errors.message && (
          <p className="text-red-500 text-[0.75rem] mt-0.5">{errors.message}</p>
        )}
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
