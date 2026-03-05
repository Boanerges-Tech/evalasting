import Container from "../layout/Container";

const cats = [
  { label: "Main Course" },
  { label: "Dessert" },
  { label: "Appetizer" },
  { label: "Salad" },
];

export default function FeaturedRow() {
  return (
    <section className="pb-10">
      <Container>
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 place-items-center">
            {cats.map((c) => (
              <div key={c.label} className="text-center">
                <div className="relative">
                  <div className="h-28 w-28 sm:h-32 sm:w-32 rounded-full bg-white border border-line shadow-soft2 overflow-hidden grid place-items-center">
                    {/* Replace this div with <img src="..." /> later */}
                    <div className="h-full w-full bg-gradient-to-br from-gray-100 to-gray-200" />
                  </div>

                  {/* small decorative badge like figma dots */}
                  <div className="absolute -left-2 -top-2 h-6 w-6 rounded-full bg-brand-600/20 border border-brand-600/30" />
                </div>

                <div className="mt-3 text-sm font-extrabold text-ink">
                  {c.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}