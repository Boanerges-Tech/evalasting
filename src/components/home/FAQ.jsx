import { useState } from "react";
import Container from "../layout/Container";

/**
 * Figma FAQ target:
 * - Centered orange label (small caps)
 * - Serif heading (2 lines)
 * - Single centered column list
 * - Each row: question left, small orange circular + button right
 * - First item expanded by default (shows answer text)
 * - Minimal separators (thin lines), no big cards
 */

const faqs = [
  {
    q: "How can I book a meal at Evaalasting Arms?",
    a: "Simply visit our booking page, choose your date, time, and number of guests, and we’ll confirm your reservation.",
  },
  {
    q: "Are there vegetarian options available on the menu?",
    a: "Yes — we offer vegetarian-friendly dishes. Use filters on the menu or ask our staff for recommendations.",
  },
  {
    q: "What makes your sauces special?",
    a: "We make our sauces in-house using fresh ingredients, balanced acidity, and slow-simmer techniques for depth.",
  },
  {
    q: "Who are the chefs at Plataria?",
    a: "Our kitchen is led by experienced chefs specializing in modern plating, local ingredients, and seasonal recipes.",
  },
  {
    q: "Can I request a special dish for an event?",
    a: "Absolutely. Share your needs and we’ll propose a custom menu based on guest count, preferences, and budget.",
  },
  {
    q: "Do you offer gluten-free options?",
    a: "Yes, we have gluten-free options and can adapt some dishes. Please tell us about any allergies before ordering.",
  },
];

function PlusButton({ open }) {
  return (
    <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-600 text-white shadow-soft">
      <span className="text-[14px] leading-none font-black">{open ? "–" : "+"}</span>
    </span>
  );
}

function Row({ q, a, open, onToggle }) {
  return (
    <div className="border-b border-line">
      <button
        type="button"
        onClick={onToggle}
        className="w-full py-5 flex items-center justify-between gap-6 text-left"
      >
        <div className="pr-2">
          <div className="text-[13px] sm:text-[14px] font-extrabold text-ink">
            {q}
          </div>
          {open && (
            <div className="mt-3 text-[12px] leading-relaxed text-muted max-w-[620px]">
              {a}
            </div>
          )}
        </div>

        <PlusButton open={open} />
      </button>
    </div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="py-14 sm:py-16">
      <Container>
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-[10px] font-extrabold tracking-[0.22em] text-brand-700">
            YOUR QUESTIONS, ANSWERED
          </div>

          <h2 className="mt-4 font-display text-[30px] leading-[1.12] sm:text-[42px] sm:leading-[1.12] font-extrabold tracking-tight text-ink">
            Answers to your most
            <br />
            common questions
          </h2>
        </div>

        {/* List */}
        <div className="mt-10 max-w-3xl mx-auto">
          {faqs.map((f, i) => (
            <Row
              key={f.q}
              q={f.q}
              a={f.a}
              open={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}