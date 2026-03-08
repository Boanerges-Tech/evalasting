import Container from "../layout/Container";
import { Link } from "react-router-dom";


/**
 * Figma Product Listing Page hero:
 * - Left: big circular product image
 * - Right: product name, description, price, orange button
 * - Under hero: 2 text blocks (ingredients + savory cravings)
 */

export default function ProductListingHero({ product }) {
  return (
    <section className="relative overflow-hidden pt-10 sm:pt-14 pb-10">
      {/* soft background blobs */}
      <div className="pointer-events-none absolute -left-44 top-16 h-[520px] w-[520px] rounded-full bg-brand-600/10 blur-3xl" />
      <div className="pointer-events-none absolute right-[-260px] top-24 h-[560px] w-[560px] rounded-full bg-amber-200/20 blur-3xl" />

      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* Left: circle image */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative h-[260px] w-[260px] sm:h-[320px] sm:w-[320px] rounded-full overflow-hidden bg-gray-100 shadow-soft2 ring-1 ring-line">
              <img
                src={product.img}
                alt={product.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right: text */}
          <div className="max-w-xl">
            <h1 className="font-display text-[32px] leading-[1.12] sm:text-[48px] sm:leading-[1.05] font-extrabold tracking-tight text-ink">
              {product.name}
            </h1>

            <p className="mt-4 text-[13px] sm:text-[14px] leading-relaxed text-muted max-w-[520px]">
              {product.desc}
            </p>

            <div className="mt-6 flex items-center gap-4">
              <div className="text-[14px] font-extrabold text-ink">{product.price}</div>

              <Link
  to="/checkout"
  className="rounded-full bg-brand-600 px-6 py-2.5 text-[12px] font-extrabold text-white shadow-soft hover:bg-brand-700 transition"
>
  Add to cart
</Link>
            </div>
          </div>
        </div>

        {/* Under hero: bullet blocks */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {product.bullets?.map((b) => (
            <div key={b.title}>
              <div className="text-[12px] font-extrabold text-ink">{b.title}</div>
              <p className="mt-2 text-[12.5px] leading-relaxed text-muted max-w-[520px]">
                {b.text}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}