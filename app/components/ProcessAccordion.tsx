"use client";

import { useState } from "react";

interface ProcessStep {
  step: string;
  title: string;
  desc: string;
}

export default function ProcessAccordion({ steps }: { steps: ProcessStep[] }) {
  const [open, setOpen] = useState<number>(0);

  return (
    <div className="flex flex-col divide-y divide-white/10">
      {steps.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="w-full flex items-center gap-6 py-6 text-left group"
              aria-expanded={isOpen}
            >
              {/* Step number */}
              <span
                className={`font-serif text-2xl leading-none min-w-[44px] transition-colors duration-300 ${
                  isOpen ? "text-gold" : "text-white/25"
                }`}
              >
                {item.step}
              </span>

              {/* Title */}
              <span
                className={`flex-1 font-serif text-lg transition-colors duration-300 ${
                  isOpen ? "text-cream" : "text-white/60"
                }`}
              >
                {item.title}
              </span>

              {/* Chevron */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className={`shrink-0 transition-all duration-300 ${
                  isOpen ? "text-gold rotate-180" : "text-white/30 rotate-0"
                }`}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {/* Collapsible body */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="pl-[68px] pb-7 text-white/60 leading-relaxed text-[0.9rem] pr-4">
                {item.desc}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}