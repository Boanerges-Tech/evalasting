import Container from "../layout/Container";

/**
 * Figma Gallery target:
 * - Small orange label (all caps, letter spaced) centered
 * - Serif title centered
 * - Small muted subtitle centered
 * - Orange pill button "View All Images" centered
 * - 4 images in a row (desktop), rounded corners, subtle shadow
 *
 * Put images here:
 * public/assets/gallery/g1.jpg
 * public/assets/gallery/g2.jpg
 * public/assets/gallery/g3.jpg
 * public/assets/gallery/g4.jpg
 */

const images = [
  { src: "/assets/gallery/g1.jpg", alt: "Chef serving dish" },
  { src: "/assets/gallery/g2.jpg", alt: "Friends dining" },
  { src: "/assets/gallery/g3.jpg", alt: "Restaurant ambiance" },
  { src: "/assets/gallery/g4.jpg", alt: "Outdoor dining table" },
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

export default function Gallery() {
  return (
    <section id="gallery" className="py-14 sm:py-16">
      <Container>
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-[10px] font-extrabold tracking-[0.22em] text-brand-700">
            CAPTURED WITH CARE
          </div>

          <h2 className="mt-4 font-display text-[30px] leading-[1.12] sm:text-[42px] sm:leading-[1.12] font-extrabold tracking-tight text-ink">
            Glimpse of our creation
          </h2>

          <p className="mt-3 text-[13px] sm:text-[14px] leading-relaxed text-muted max-w-[520px] mx-auto">
            Take a look at our beautifully crafted memories
            <br className="hidden sm:block" />
            that showcase the passion and dedication
          </p>

          <div className="mt-6">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-2.5 text-[12px] font-extrabold text-white shadow-soft hover:bg-brand-700 transition"
            >
              View All Images
            </a>
          </div>
        </div>

        {/* Images row */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {/* Slightly taller 1st image like Figma */}
          <div className="lg:translate-y-2">
            <Tile {...images[0]} />
          </div>

          <Tile {...images[1]} />
          <Tile {...images[2]} />

          <div className="lg:translate-y-2">
            <Tile {...images[3]} />
          </div>
        </div>
      </Container>
    </section>
  );
}