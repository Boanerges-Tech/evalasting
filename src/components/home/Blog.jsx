import Container from "../layout/Container";

/**
 * Figma Blog target:
 * - Centered label (orange, spaced)
 * - Serif heading "Food stories and blogs"
 * - Small muted subtitle
 * - Orange pill button "Read more"
 * - Content row:
 *   Left: big featured card (image + small category pill + date + big title)
 *   Right: 3 stacked mini cards (small image left, text right) with category pill + title + date
 *
 * Put images here:
 * public/assets/blog/b1.jpg  (big featured)
 * public/assets/blog/b2.jpg
 * public/assets/blog/b3.jpg
 * public/assets/blog/b4.jpg
 */

const featured = {
  img: "/assets/blog/b1.jpg",
  tag: "Cooking",
  date: "May 8, 2025",
  title: "The silent hidden power\nof acid in every dish",
};

const sidePosts = [
  {
    img: "/assets/blog/b2.jpg",
    tag: "Cooking",
    date: "May 14, 2025",
    title: "From pan to plate:\ntiming is everything",
  },
  {
    img: "/assets/blog/b3.jpg",
    tag: "Insights",
    date: "May 18, 2025",
    title: "Cooking with color: what\nyour plate is missing",
  },
  {
    img: "/assets/blog/b4.jpg",
    tag: "Tips",
    date: "May 2, 2025",
    title: "The one knife skill that\nchanges everything",
  },
];

function TagPill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-brand-600 px-3 py-1 text-[10px] font-extrabold text-white shadow-soft">
      {children}
    </span>
  );
}

export default function Blog() {
  return (
    <section className="py-14 sm:py-16">
      <Container>
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-[10px] font-extrabold tracking-[0.22em] text-brand-700">
            FRESH TIPS &amp; UPDATES
          </div>

          <h2 className="mt-4 font-display text-[30px] leading-[1.12] sm:text-[42px] sm:leading-[1.12] font-extrabold tracking-tight text-ink">
            Food stories and blogs
          </h2>

          <p className="mt-3 text-[13px] sm:text-[14px] leading-relaxed text-muted max-w-[560px] mx-auto">
            Stay updated with the latest trends in dining,
            <br className="hidden sm:block" />
            food recipes, and exclusive news from Plataria
          </p>

          <div className="mt-6">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-2.5 text-[12px] font-extrabold text-white shadow-soft hover:bg-brand-700 transition"
            >
              Read more
            </a>
          </div>
        </div>

        {/* Layout */}
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.25fr_.75fr] lg:items-start">
          {/* Featured big card */}
          <a
            href="#"
            className="group overflow-hidden rounded-3xl bg-white shadow-soft2 ring-1 ring-line"
          >
            <div className="relative">
              <img
                src={featured.img}
                alt={featured.title}
                className="h-[240px] w-full object-cover sm:h-[300px] lg:h-[320px]"
                loading="lazy"
              />

              {/* tag pill */}
              <div className="absolute left-4 top-4">
                <TagPill>{featured.tag}</TagPill>
              </div>
            </div>

            <div className="px-5 py-5">
              <div className="text-[10px] font-semibold text-muted">
                {featured.date}
              </div>

              <div className="mt-2 font-display text-[20px] leading-[1.2] sm:text-[22px] sm:leading-[1.2] font-extrabold text-ink whitespace-pre-line group-hover:text-brand-700 transition">
                {featured.title}
              </div>
            </div>
          </a>

          {/* Right: 3 stacked mini cards */}
          <div className="grid gap-5">
            {sidePosts.map((p) => (
              <a
                key={p.title}
                href="#"
                className="group flex gap-4 rounded-3xl bg-white shadow-soft2 ring-1 ring-line p-4"
              >
                <div className="relative h-[88px] w-[110px] overflow-hidden rounded-2xl bg-gray-100 shrink-0">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="min-w-0">
                  <TagPill>{p.tag}</TagPill>

                  <div className="mt-2 text-[13px] font-extrabold leading-[1.25] text-ink whitespace-pre-line group-hover:text-brand-700 transition">
                    {p.title}
                  </div>

                  <div className="mt-2 text-[10px] font-semibold text-muted">
                    {p.date}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}