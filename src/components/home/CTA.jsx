import Container from "../layout/Container";

export default function CTA() {
  return (
    <section className="py-14 sm:py-16">
      <Container>
        <div className="relative overflow-hidden rounded-[0px] bg-brand-600 text-white shadow-soft">
          {/* Left food images */}
          <div className="pointer-events-none absolute left-4 top-5 block">
            <img
              src="/assets/cta/food1.jpg"
              alt=""
              className="absolute left-0 top-0 h-[52px] w-[52px] rounded-xl object-cover shadow-soft -rotate-6 sm:h-[68px] sm:w-[68px]"
            />
            <img
              src="/assets/cta/food2.jpg"
              alt=""
              className="absolute left-6 top-6 h-[70px] w-[70px] rounded-xl object-cover shadow-soft rotate-[2deg] sm:left-8 sm:top-7 sm:h-[88px] sm:w-[88px]"
            />
          </div>

          {/* Right food images */}
          <div className="pointer-events-none absolute right-4 top-5 block">
            <img
              src="/assets/cta/food3.jpg"
              alt=""
              className="absolute right-0 top-0 h-[52px] w-[52px] rounded-xl object-cover shadow-soft rotate-[6deg] sm:h-[68px] sm:w-[68px]"
            />
            <img
              src="/assets/cta/food4.jpg"
              alt=""
              className="absolute right-6 top-6 h-[70px] w-[70px] rounded-xl object-cover shadow-soft -rotate-[4deg] sm:right-8 sm:top-7 sm:h-[88px] sm:w-[88px]"
            />
          </div>

          {/* Center content */}
          <div className="relative mx-auto max-w-3xl px-6 py-10 text-center sm:px-10 sm:py-12">
            <div className="text-[9px] font-extrabold tracking-[0.24em] text-white/85">
              RESERVE YOUR SPOT TODAY
            </div>

            <h2 className="mt-3 font-display text-[30px] leading-[1.1] sm:text-[52px] sm:leading-[1.02] font-extrabold tracking-tight">
              Ready to indulge in a
              <br />
              memorable meal?
            </h2>

            <p className="mx-auto mt-4 max-w-[360px] text-[12px] leading-relaxed text-white/90 sm:text-[13px]">
              Reserve your table now and enjoy a delightful
              dining experience with exceptional flavors
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <button className="rounded-full bg-white px-5 py-2.5 text-[11px] font-extrabold text-ink shadow-soft hover:bg-white/90 transition">
                Book a table
              </button>

              <div className="flex items-center gap-2 text-[11px] text-white/95">
                <span className="font-semibold">4.8/5</span>
                <span className="tracking-[0.12em]">★★★★★</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}