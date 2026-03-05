import Container from "../layout/Container";

/**
 * Figma About Hero (tight):
 * - Small label
 * - Big serif title
 * - View Menu button
 * - 4 smaller tiles in one row (desktop), centered, controlled width
 * - Bottom caption + paragraph clearly BELOW tiles (no overlap)
 *
 * Images:
 * public/assets/about/hero1.jpg
 * public/assets/about/hero2.jpg
 * public/assets/about/hero3.jpg
 * public/assets/about/hero4.jpg
 */

const heroImages = [
  { src: "/assets/about/hero1.jpg", alt: "Chef serving" },
  { src: "/assets/about/hero2.jpg", alt: "Waiter" },
  { src: "/assets/about/hero3.jpg", alt: "Chef portrait" },
  { src: "/assets/about/hero4.jpg", alt: "Friends dining" },
];

function Tile({ src, alt }) {
  return (
    <div className="overflow-hidden rounded-3xl bg-gray-100 shadow-soft2 ring-1 ring-line">
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        loading="lazy"
      />
    </div>
  );
}

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden pt-10 sm:pt-14 pb-14 sm:pb-16">
      {/* soft background blobs like Figma (very subtle) */}
      <div className="pointer-events-none absolute -left-44 top-16 h-[520px] w-[520px] rounded-full bg-brand-600/10 blur-3xl" />
      <div className="pointer-events-none absolute right-[-260px] top-24 h-[560px] w-[560px] rounded-full bg-amber-200/20 blur-3xl" />

      <Container>
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-[10px] font-extrabold tracking-[0.22em] text-brand-700">
            WHAT WE STAND FOR
          </div>

          <h1 className="mt-4 font-display text-[34px] leading-[1.10] sm:text-[56px] sm:leading-[1.02] font-extrabold tracking-tight text-ink">
            Discover the passion
            <br />
            behind our restaurant
          </h1>

          <div className="mt-6">
            <a
              href="#menu"
              className="inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-2.5 text-[12px] font-extrabold text-white shadow-soft hover:bg-brand-700 transition"
            >
              View Menu
            </a>
          </div>
        </div>

        {/* 4 image tiles row (tight like Figma) */}
        <div className="mt-10 sm:mt-12">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {heroImages.map((img) => (
                <div
                  key={img.src}
                  className="h-[180px] sm:h-[190px] lg:h-[165px]"
                >
                  <Tile {...img} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom caption + paragraph (MUST be clearly separated) */}
        <div className="mt-14 sm:mt-16 text-center max-w-2xl mx-auto">
          

          
        </div>
      </Container>
    </section>
  );
}