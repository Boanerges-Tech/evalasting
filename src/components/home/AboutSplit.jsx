import Container from "../layout/Container";

export default function AboutSplit() {
  return (
    <section id="about" className="py-12 sm:py-16">
      <Container>
        {/* Top split: image left, content right */}
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          {/* Image card */}
          {/* Image card */}
<div className="relative overflow-hidden rounded-3xl shadow-soft ring-1 ring-line lg:max-w-[520px]">
  <img
    src="/assets/about/dining.jpg"
    alt="Dining experience"
    className="aspect-[4/3] w-full object-cover"
    loading="lazy"
  />
</div>

          {/* Copy */}
          <div>
            <div className="inline-flex items-center gap-2 text-[12px] font-extrabold text-ink/70">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-600" />
              <span className="tracking-wide">Best Dining Experience</span>
            </div>

            <h2 className="mt-3 font-display text-[28px] leading-[1.15] sm:text-[34px] sm:leading-[1.15] font-extrabold tracking-tight text-ink">
              Best dining experience
              <br className="hidden sm:block" />
              with every dish
            </h2>

            <p className="mt-3 text-[14px] sm:text-[15px] leading-relaxed text-muted max-w-[520px]">
              We believe dining is more than just a meal; it’s an experience.
              Our dishes create dishes that combine the freshest ingredients.
            </p>

            {/* Orange card */}
            <div className="mt-6 inline-flex items-center gap-4 rounded-2xl bg-brand-600 px-5 py-4 text-white shadow-soft">
              {/* tiny icon / avatar */}
              <div className="h-11 w-11 rounded-xl bg-white/15 ring-1 ring-white/20 grid place-items-center overflow-hidden">
                {/* Replace with logo image if you have one */}
                <span className="font-black">EA</span>
              </div>

              <div className="leading-tight">
                <div className="text-[12px] font-extrabold opacity-95">
                  Evaalasting Arm
                </div>
                <div className="text-[12px] font-semibold opacity-90">
                  Restaurant
                </div>
              </div>

              <div className="ml-2">
                <div className="text-[11px] font-extrabold opacity-95">★★★★★</div>
                <div className="text-[11px] opacity-90">5.0 rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: 01 / 02 / 03 */}
        <div className="mt-10 sm:mt-12 grid gap-8 sm:grid-cols-3 text-center">
          <div>
            <div className="font-display text-[22px] sm:text-[24px] font-extrabold text-ink">
              01
            </div>
            <div className="mt-2 font-extrabold text-[13px] text-ink">
              Authentic Flavors
            </div>
            <p className="mt-2 text-[12.5px] leading-relaxed text-muted max-w-[240px] mx-auto">
              We take pride in offering an array of dishes made with love &amp;
              quality.
            </p>
          </div>

          <div>
            <div className="font-display text-[22px] sm:text-[24px] font-extrabold text-ink">
              02
            </div>
            <div className="mt-2 font-extrabold text-[13px] text-ink">
              Cozy Ambiance
            </div>
            <p className="mt-2 text-[12.5px] leading-relaxed text-muted max-w-[240px] mx-auto">
              Our restaurant provides the perfect setting to enjoy your food.
            </p>
          </div>

          <div>
            <div className="font-display text-[22px] sm:text-[24px] font-extrabold text-ink">
              03
            </div>
            <div className="mt-2 font-extrabold text-[13px] text-ink">
              Exceptional Service
            </div>
            <p className="mt-2 text-[12.5px] leading-relaxed text-muted max-w-[240px] mx-auto">
              Our team is dedicated to making your dining experience smooth.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}