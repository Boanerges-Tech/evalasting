import Container from "../layout/Container";

/**
 * Figma StatsBand target:
 * - Big centered number "80,005+"
 * - Small orange label under it: "MEALS SERVED FOR EVERYONE"
 * - 4 stats in one row with orange dot separators between items
 * - Floating small food circles around the big number (decor)
 *
 * Put decor images here (optional, but matches Figma best):
 * public/assets/stats/plate-1.jpg
 * public/assets/stats/plate-2.jpg
 * public/assets/stats/plate-3.jpg
 * public/assets/stats/plate-4.jpg
 */

export default function StatsBand() {
  const stats = [
    { k: "22K+", v: "Creative experience" },
    { k: "1000+", v: "Events created" },
    { k: "500K+", v: "Customer Reviews" },
    { k: "11+", v: "Years experience" },
  ];

  return (
    <section className="py-14 sm:py-16">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-white py-12 sm:py-14">
          {/* Decorative plates (hide on small screens) */}
          <img
            src="/assets/stats/plate-1.jpg"
            alt=""
            className="pointer-events-none hidden md:block absolute left-[10%] top-8 h-14 w-14 rounded-full object-cover shadow-soft2 ring-2 ring-white"
          />
          <img
            src="/assets/stats/plate-2.jpg"
            alt=""
            className="pointer-events-none hidden md:block absolute left-[4%] top-[48%] h-16 w-16 rounded-full object-cover shadow-soft2 ring-2 ring-white"
          />
          <img
            src="/assets/stats/plate-3.jpg"
            alt=""
            className="pointer-events-none hidden md:block absolute right-[10%] top-10 h-14 w-14 rounded-full object-cover shadow-soft2 ring-2 ring-white"
          />
          <img
            src="/assets/stats/plate-4.jpg"
            alt=""
            className="pointer-events-none hidden md:block absolute right-[4%] top-[44%] h-16 w-16 rounded-full object-cover shadow-soft2 ring-2 ring-white"
          />

          {/* Main count */}
          <div className="text-center">
            <div className="font-display text-[44px] leading-none sm:text-[64px] font-extrabold tracking-tight text-ink">
              80,005+
            </div>
            <div className="mt-3 text-[10px] font-extrabold tracking-[0.22em] text-brand-700">
              MEALS SERVED FOR EVERYONE
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-10 sm:mt-12">
            <div className="mx-auto max-w-4xl">
              <div className="grid grid-cols-2 gap-y-8 text-center sm:grid-cols-4 sm:gap-y-0">
                {stats.map((s, idx) => (
                  <div key={s.v} className="relative px-3">
                    {/* orange dot separator for desktop */}
                    {idx !== 0 && (
                      <span className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-brand-600" />
                    )}

                    <div className="text-[22px] sm:text-[24px] font-extrabold text-ink">
                      {s.k}
                    </div>
                    <div className="mt-1 text-[11.5px] text-muted">
                      {s.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}