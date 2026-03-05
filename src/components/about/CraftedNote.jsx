import Container from "../layout/Container";

/**
 * Figma section:
 * - Small orange label centered (all caps, spaced)
 * - Centered paragraph under it
 * - Lots of whitespace above/below
 */

export default function CraftedNote() {
  return (
    <section className="py-14 sm:py-16">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-[10px] font-extrabold tracking-[0.22em] text-brand-700">
            CRAFTED WITH CARE AND FRESHNESS
          </div>

          <p className="mt-4 text-[13px] sm:text-[14px] leading-relaxed text-ink/75">
            Our sauces and spreads are made from fresh, imperfect fruits and vegetables
            that are often overlooked. Nutritious, flavorful, and ready to enhance your table
          </p>
        </div>
      </Container>
    </section>
  );
}