import { useState } from "react";
import Container from "../layout/Container";

const faqs = [
  { q: "How long does delivery take?", a: "Typically 20–45 minutes depending on location and traffic." },
  { q: "Can I schedule an order?", a: "Yes. You can place an order and specify a delivery time." },
  { q: "Do you accept cash on delivery?", a: "We support card/bank transfer. Cash on delivery depends on location." },
  { q: "Can I customize my meal?", a: "Yes. Extras and preferences can be added during checkout." },
];

function Item({ q, a, open, onToggle }) {
  return (
    <div className="rounded-2xl border border-line bg-white shadow-soft2 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full text-left px-5 py-4 flex items-center justify-between gap-4"
      >
        <span className="font-extrabold text-ink">{q}</span>
        <span className="h-8 w-8 rounded-xl border border-line grid place-items-center text-ink/70">
          {open ? "–" : "+"}
        </span>
      </button>
      {open && <div className="px-5 pb-5 text-sm text-muted leading-relaxed">{a}</div>}
    </div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="py-14 sm:py-16">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-ink">
            Frequently asked questions
          </h2>
          <p className="mt-2 text-sm sm:text-base text-muted">
            Everything you need to know before you order.
          </p>
        </div>

        <div className="mt-10 grid gap-3 max-w-3xl mx-auto">
          {faqs.map((f, i) => (
            <Item
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