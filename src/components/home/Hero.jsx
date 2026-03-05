import Container from "../layout/Container";

const categories = [
  { label: "Main Course", img: "/assets/hero/main-course.jpg" },
  { label: "Dessert", img: "/assets/hero/dessert.jpg" },
  { label: "Appetizer", img: "/assets/hero/appetizer.jpg" },
  { label: "Salad", img: "/assets/hero/salad.jpg" },
];

function CatCircle({ label, img }) {
  return (
    <div className="text-center">
      <div className="relative mx-auto h-[84px] w-[84px] sm:h-[96px] sm:w-[96px] lg:h-[110px] lg:w-[110px]">
        <div className="h-full w-full overflow-hidden rounded-full bg-white shadow-soft2 ring-1 ring-line">
          {img ? (
            <img
              src={img}
              alt={label}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-gray-100 to-gray-200" />
          )}
        </div>

        {/* small decorative dot like Figma */}
        <div className="absolute -left-2 -top-2 h-6 w-6 rounded-full bg-brand-600/20 ring-1 ring-brand-600/30" />
      </div>

      <div className="mt-2 text-[13px] font-extrabold text-ink">{label}</div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Figma-ish soft background */}
      <div className="pointer-events-none absolute -left-44 top-16 h-[520px] w-[520px] rounded-full bg-brand-600/10 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-40 -translate-x-1/2 h-[420px] w-[420px] rounded-full bg-amber-200/25 blur-3xl" />

      <Container>
        <div className="pt-10 sm:pt-14 pb-10 sm:pb-12">
          <div className="mx-auto max-w-3xl text-center">
            {/* label */}
            <div className="inline-flex items-center justify-center rounded-full bg-brand-600/15 px-6 py-2 text-[12px] font-extrabold tracking-wide text-brand-700">
              TASTY FOOD
            </div>

            {/* headline */}
            <h1 className="mt-6 font-display text-[32px] leading-[1.05] sm:text-[50px] sm:leading-[1.05] font-extrabold tracking-tight text-ink">
              Where every meal is a chef
              <br />
              masterpiece
            </h1>

            {/* subtext */}
            <p className="mt-4 text-[14px] sm:text-[15px] text-muted max-w-[520px] mx-auto leading-relaxed">
              Fresh ingredients, premium taste, and quick delivery — discover
              dishes that feel restaurant-quality every day.
            </p>

            {/* CTAs (side-by-side like Figma; wraps on tiny screens) */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#menu"
                className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-soft hover:bg-brand-700 transition"
              >
                Order Now
              </a>

              <a
                href="#"
                className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white shadow-soft hover:bg-ink/90 transition"
              >
                Reservation
              </a>
            </div>
          </div>

          {/* category circles */}
          <div className="mt-8 sm:mt-10 mx-auto max-w-4xl">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10 place-items-center">
              {categories.map((c) => (
                <CatCircle key={c.label} {...c} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}