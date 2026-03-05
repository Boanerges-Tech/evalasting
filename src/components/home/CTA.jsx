import Container from "../layout/Container";

export default function CTA() {
  return (
    <section className="py-14 sm:py-16">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-brand-600 text-white shadow-soft">
          
          {/* Decorative shapes (left) */}
          <div className="pointer-events-none absolute left-10 top-10 hidden lg:block">
            <div className="h-28 w-28 rounded-2xl border border-white/20 rotate-12" />
            <div className="absolute left-10 top-10 h-28 w-28 rounded-2xl border border-white/20 -rotate-6" />
          </div>

          {/* Content */}
          <div className="relative grid items-center gap-10 px-8 py-12 sm:px-12 lg:grid-cols-[1fr_auto]">
            
            {/* Text */}
            <div className="max-w-xl">
              
              {/* Label */}
              <div className="text-[10px] font-extrabold tracking-[0.25em] text-white/80">
                RESERVE YOUR SPOT TODAY
              </div>

              {/* Heading */}
              <h2 className="mt-4 font-display text-[30px] leading-[1.15] sm:text-[42px] sm:leading-[1.1] font-extrabold">
                Ready to indulge in a
                <br />
                memorable meal?
              </h2>

              {/* Description */}
              <p className="mt-4 text-[13px] sm:text-[14px] text-white/85 leading-relaxed max-w-md">
                Reserve your table now and enjoy a delightful dining
                experience with exceptional flavors
              </p>

              {/* CTA row */}
              <div className="mt-6 flex items-center gap-4 flex-wrap">
                
                <button className="rounded-full bg-white px-6 py-2.5 text-[12px] font-extrabold text-ink shadow-soft hover:bg-white/90 transition">
                  Book a table
                </button>

                <div className="text-[12px] text-white/90 flex items-center gap-2">
                  <span className="font-semibold">4.8/5</span>
                  <span className="tracking-wide">★★★★★</span>
                </div>

              </div>
            </div>

            {/* Images */}
            <div className="relative hidden sm:block">
              
              <img
                src="/assets/cta/food1.jpg"
                alt="Food"
                className="h-[120px] w-[120px] object-cover rounded-2xl shadow-soft rotate-6"
              />

              <img
                src="/assets/cta/food2.jpg"
                alt="Food"
                className="absolute -top-8 left-20 h-[120px] w-[120px] object-cover rounded-2xl shadow-soft -rotate-6"
              />

            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}