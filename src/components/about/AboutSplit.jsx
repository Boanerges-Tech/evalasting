import Container from "../layout/Container";

export default function AboutSplit() {
  return (
    <section className="py-14 sm:py-16">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* Left image */}
          <div className="overflow-hidden rounded-3xl bg-gray-100 shadow-soft2 ring-1 ring-line">
            <img
              src="/assets/about/passion.jpg"
              alt="Dining experience"
              className="h-[240px] w-full object-cover sm:h-[320px] lg:h-[300px]"
              loading="lazy"
            />
          </div>

          {/* Right content */}
          <div className="max-w-xl">
            <div className="text-[10px] font-extrabold tracking-[0.22em] text-brand-700">
              OUR JOURNEY OF PASSION
            </div>

            <h2 className="mt-4 font-display text-[28px] leading-[1.15] sm:text-[40px] sm:leading-[1.1] font-extrabold tracking-tight text-ink">
              Where flavor meets
              <br />
              passion on every plate
            </h2>

            <p className="mt-4 text-[13px] sm:text-[14px] leading-relaxed text-muted max-w-[520px]">
              Dining is not just a meal; it’s an experience. We’ve always been
              dedicated to combining global flavors with fresh ingredients.
            </p>

            {/* Orange mission card */}
            <div className="mt-6 rounded-2xl bg-brand-600 px-6 py-5 text-white shadow-soft">
              <div className="text-[12px] font-extrabold">Our Mission</div>
              <p className="mt-2 text-[12px] leading-relaxed text-white/90 max-w-[460px]">
                We believe in using perfectly imperfect fruits and vegetables to
                create our sauces and spreads.
              </p>
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
              Global Flavors
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
              Ambiance
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
              Passion
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