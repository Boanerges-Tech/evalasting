import Container from "../layout/Container";

/**
 * Menu page hero (matches screenshot):
 * - Centered small label
 * - Big serif title
 * - Two image tiles
 * - Right small info card with dot bullets
 */

export default function MenuHero() {
  return (
    <section className="relative overflow-hidden pt-10 sm:pt-14 pb-10">
      {/* soft blobs */}
      <div className="pointer-events-none absolute -left-44 top-16 h-[520px] w-[520px] rounded-full bg-brand-600/10 blur-3xl" />
      <div className="pointer-events-none absolute right-[-260px] top-24 h-[560px] w-[560px] rounded-full bg-amber-200/20 blur-3xl" />

      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-[10px] font-extrabold tracking-[0.22em] text-brand-700">
            OUR MENU
          </div>

          <h1 className="mt-4 font-display text-[34px] leading-[1.1] sm:text-[56px] sm:leading-[1.02] font-extrabold tracking-tight text-ink">
            Explore our menu
            <br />
            of delicious dishes
          </h1>
        </div>

        {/* Images + Info */}
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
          {/* Left: 2 images */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="overflow-hidden rounded-3xl bg-gray-100 shadow-soft2 ring-1 ring-line">
              <img
                src="/assets/menu/hero1.jpg"
                alt="Menu preview"
                className="h-[210px] w-full object-cover sm:h-[240px]"
                loading="lazy"
              />
            </div>

            <div className="overflow-hidden rounded-3xl bg-gray-100 shadow-soft2 ring-1 ring-line">
              <img
                src="/assets/menu/hero2.jpg"
                alt="Menu preview"
                className="h-[210px] w-full object-cover sm:h-[240px]"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right: info card */}
          <div className="lg:pl-6">
            <div className="w-full lg:w-[280px] rounded-3xl bg-white shadow-soft2 ring-1 ring-line p-6">
              <div className="text-[12px] font-extrabold text-ink">
                We craft with freshness
              </div>
              <p className="mt-2 text-[12px] leading-relaxed text-muted">
                Our meals are prepared daily with clean ingredients and balanced flavors.
              </p>

              <div className="mt-5 grid gap-3">
                <div className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-brand-600" />
                  <div className="text-[12px] text-ink/80">Fresh ingredients</div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-brand-600" />
                  <div className="text-[12px] text-ink/80">Premium taste</div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-brand-600" />
                  <div className="text-[12px] text-ink/80">Quick delivery</div>
                </div>
              </div>

              <a
                href="#menu"
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-brand-600 px-6 py-2.5 text-[12px] font-extrabold text-white shadow-soft hover:bg-brand-700 transition"
              >
                View dishes
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}