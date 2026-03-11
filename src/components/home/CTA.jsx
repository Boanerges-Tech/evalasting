import { Link } from "react-router-dom";
import Container from "../layout/Container";

export default function CTA() {
  return (
    <section className="py-14 sm:py-16">
      <Container>
        <div className="relative overflow-hidden rounded-[28px] bg-[#0b4f49] text-white shadow-soft">
          {/* Left image stack */}
          <div className="pointer-events-none absolute left-3 top-4 hidden sm:block md:left-6 md:top-5 lg:left-10 lg:top-6">
            <img
              src="/assets/cta/food1.jpg"
              alt=""
              className="absolute left-0 top-0 h-[58px] w-[58px] rounded-2xl object-cover shadow-soft -rotate-[8deg] md:h-[72px] md:w-[72px] lg:h-[74px] lg:w-[74px]"
            />
            <img
              src="/assets/cta/food2.jpg"
              alt=""
              className="absolute left-7 top-6 h-[102px] w-[102px] rounded-[22px] object-cover shadow-soft rotate-[2deg] md:left-8 md:top-7 md:h-[118px] md:w-[118px] lg:left-9 lg:top-8 lg:h-[128px] lg:w-[128px]"
            />
          </div>

          {/* Right image stack */}
          <div className="pointer-events-none absolute right-3 top-4 hidden sm:block md:right-6 md:top-5 lg:right-10 lg:top-6">
            <img
              src="/assets/cta/food3.jpg"
              alt=""
              className="absolute right-0 top-0 h-[58px] w-[58px] rounded-2xl object-cover shadow-soft rotate-[7deg] md:h-[72px] md:w-[72px] lg:h-[74px] lg:w-[74px]"
            />
            <img
              src="/assets/cta/food4.jpg"
              alt=""
              className="absolute right-7 top-6 h-[102px] w-[102px] rounded-[22px] object-cover shadow-soft -rotate-[4deg] md:right-8 md:top-7 md:h-[118px] md:w-[118px] lg:right-9 lg:top-8 lg:h-[128px] lg:w-[128px]"
            />
          </div>

          {/* Mobile top mini images */}
          <div className="pointer-events-none absolute left-4 top-4 sm:hidden">
            <img
              src="/assets/cta/food1.jpg"
              alt=""
              className="absolute left-0 top-0 h-12 w-12 rounded-xl object-cover shadow-soft -rotate-6"
            />
            <img
              src="/assets/cta/food2.jpg"
              alt=""
              className="absolute left-5 top-4 h-16 w-16 rounded-2xl object-cover shadow-soft rotate-2"
            />
          </div>

          <div className="pointer-events-none absolute right-4 top-4 sm:hidden">
            <img
              src="/assets/cta/food3.jpg"
              alt=""
              className="absolute right-0 top-0 h-12 w-12 rounded-xl object-cover shadow-soft rotate-6"
            />
            <img
              src="/assets/cta/food4.jpg"
              alt=""
              className="absolute right-5 top-4 h-16 w-16 rounded-2xl object-cover shadow-soft -rotate-3"
            />
          </div>

          {/* Main content */}
          <div className="relative mx-auto max-w-[560px] px-5 py-20 text-center sm:px-16 sm:py-14 md:py-16 lg:py-12">
            <div className="text-[9px] font-extrabold tracking-[0.24em] text-white/80 sm:text-[10px]">
              RESERVE YOUR SPOT TODAY
            </div>

            <h2 className="mt-3 font-display text-[34px] leading-[1.06] font-extrabold tracking-tight text-white sm:text-[42px] md:text-[50px] lg:text-[54px]">
              Ready to indulge in a
              <br />
              memorable meal?
            </h2>

            <p className="mx-auto mt-4 max-w-[360px] text-[12px] leading-relaxed text-white/85 sm:text-[13px]">
              Reserve your table now and enjoy a delightful
              dining experience with exceptional flavors
            </p>

            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                to="/reservations"
                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-[11px] font-extrabold text-ink shadow-soft transition hover:bg-white/90"
              >
                Book a table
              </Link>

              <div className="flex items-center gap-3 text-[11px] text-white">
                <span className="font-semibold text-white/95">(4.9/5)</span>
                <span className="tracking-[0.14em] text-white">★★★★★</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}