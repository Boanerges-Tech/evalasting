import Container from "../layout/Container";

/**
 * Figma HowToOrder target:
 * - Left: small orange label, big serif headline (2 lines)
 * - Below: 5-star row + short testimonial + avatar + name
 * - Right: 3 steps list with (01)(02)(03) orange numbers + titles + muted text
 * - Clean whitespace (no cards / borders)
 *
 * Put avatar image here (optional):
 * public/assets/testimonials/sarah.jpg  -> /assets/testimonials/sarah.jpg
 */

const steps = [
  {
    n: "(01)",
    title: "Select your date & time",
    text:
      "Choose the date that works best for your dining experience and let us know when you'll be joining us",
  },
  {
    n: "(02)",
    title: "Confirm your reservation",
    text:
      "Provide your name, contact info, and number of guests to help us prepare for your arrival and everything",
  },
  {
    n: "(03)",
    title: "Confirmation & preparation",
    text:
      "Review all your details carefully and confirm your booking with us for a seamless top dining experience",
  },
];

function Stars() {
  return (
    <div className="flex items-center gap-1 text-brand-600">
      {"★★★★★".split("").map((s, i) => (
        <span key={i} className="text-[14px] leading-none">
          {s}
        </span>
      ))}
    </div>
  );
}

export default function HowToOrder() {
  return (
    <section className="py-14 sm:py-16">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          {/* LEFT */}
          <div>
            <div className="text-[10px] font-extrabold tracking-[0.22em] text-brand-700">
              SIMPLE RESERVATION PROCESS
            </div>

            <h2 className="mt-4 font-display text-[32px] leading-[1.12] sm:text-[44px] sm:leading-[1.12] font-extrabold tracking-tight text-ink">
              Make your Order
              <br />
              with just a few clicks
            </h2>

            <div className="mt-8">
              <Stars />
              <p className="mt-4 text-[13px] sm:text-[14px] leading-relaxed text-muted max-w-[520px]">
                An unforgettable dining experience! The food was amazing, &amp;
                the service was crazy
              </p>

              <div className="mt-5 flex items-center gap-3">
                <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200 ring-1 ring-line">
                  <img
                    src="/assets/testimonials/sarah.jpg"
                    alt="Sarah Johnson"
                    className="h-full w-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      // fallback if image not present
                      e.currentTarget.style.display = "none";
                      e.currentTarget.parentElement.style.background =
                        "linear-gradient(135deg,#e5e7eb,#f3f4f6)";
                    }}
                  />
                </div>
                <div className="text-[13px] font-extrabold text-ink">
                  Sarah Johnson
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-10">
            {steps.map((s) => (
              <div key={s.n} className="grid grid-cols-[52px_1fr] gap-4">
                <div className="text-brand-600 text-[12px] font-extrabold">
                  {s.n}
                </div>

                <div>
                  <div className="text-[14px] font-extrabold text-ink">
                    {s.title}
                  </div>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-muted max-w-[520px]">
                    {s.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}