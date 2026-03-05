import Container from "../layout/Container";

/**
 * Figma Testimonials target:
 * - Small orange label (all caps) centered
 * - Serif heading: "Customer reviews that speak for themselves"
 * - Grid of slim rounded cards (more columns on desktop)
 * - Each card: date (top-right), star row (top-left), short review, author at bottom-left
 * - Some cards look "faded" in the screenshot (optional: we can vary opacity)
 */

const reviews = [
  {
    name: "Aisha Rahman",
    date: "19/01/2025",
    stars: 4,
    text:
      "Plataria our go-to place for cozy vibe and flavorful meals. Highly unforgettable.",
    faded: true,
  },
  {
    name: "Ravi Shah",
    date: "27/02/2025",
    stars: 5,
    text:
      "From the first bite to the last sip, everything is crafted with care. Plataria never disappoints.",
  },
  {
    name: "Sarah Mendez",
    date: "12/03/2025",
    stars: 5,
    text:
      "Every visit to Plataria feels like a special occasion. The presentation and taste are truly unmatched.",
  },
  {
    name: "Alish",
    date: "12/03/2025",
    stars: 4,
    text:
      "We’ve made this spot. Their service is very reliable.",
    faded: true,
  },
  {
    name: "Luca Romano",
    date: "05/12/2024",
    stars: 4,
    text:
      "Plataria apart is the warm, inviting vibe. The service is memorable and the food is amazing.",
    faded: true,
  },
  {
    name: "Emily Chen",
    date: "27/11/2024",
    stars: 5,
    text:
      "Fresh ingredients, warm staff, and bold flavors—Plataria checks every box for a perfect meal.",
  },
  {
    name: "Nina Patel",
    date: "05/11/2024",
    stars: 5,
    text:
      "Plataria delivers a perfect balance of flavor and atmosphere. It’s become our favorite dining spot.",
  },
  {
    name: "Luca",
    date: "05/11/2024",
    stars: 4,
    text:
      "What sets Plataria apart is the passion in every dish. It’s just a gem.",
    faded: true,
  },
];

function Stars({ n }) {
  const full = Math.max(0, Math.min(5, n));
  return (
    <div className="flex items-center gap-1 text-brand-600">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={[
            "text-[12px] leading-none",
            i < full ? "opacity-100" : "opacity-25",
          ].join(" ")}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function ReviewCard({ r }) {
  return (
    <article
      className={[
        "rounded-2xl bg-white ring-1 ring-line shadow-soft2 px-5 py-5",
        r.faded ? "opacity-40" : "opacity-100",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <Stars n={r.stars} />
        <div className="text-[10px] font-semibold text-muted">{r.date}</div>
      </div>

      <p className="mt-4 text-[12px] leading-relaxed text-ink/80">
        {r.text}
      </p>

      <div className="mt-6 text-[11px] font-extrabold text-ink">
        {r.name}
      </div>
    </article>
  );
}

export default function Testimonials() {
  return (
    <section id="reviews" className="py-14 sm:py-16">
      <Container>
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-[10px] font-extrabold tracking-[0.22em] text-brand-700">
            REAL EXPERIENCE, REAL SATISFACTION
          </div>

          <h2 className="mt-4 font-display text-[30px] leading-[1.12] sm:text-[42px] sm:leading-[1.12] font-extrabold tracking-tight text-ink">
            Customer reviews that
            <br />
            speak for themselves
          </h2>
        </div>

        {/* Grid */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((r, idx) => (
            <ReviewCard key={`${r.name}-${idx}`} r={r} />
          ))}
        </div>
      </Container>
    </section>
  );
}