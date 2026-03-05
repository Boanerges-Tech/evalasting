import Container from "../layout/Container";

export default function Gallery() {
  return (
    <section id="gallery" className="py-14 sm:py-16">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-ink">
              Our food gallery
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted">
              A sneak peek of what we serve — beautiful and delicious.
            </p>
          </div>
          <button className="hidden sm:inline-flex rounded-xl border border-line px-5 py-2.5 text-sm font-semibold hover:bg-gray-50">
            View all
          </button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((x) => (
            <div
              key={x}
              className="overflow-hidden rounded-3xl border border-line bg-gray-100 shadow-soft2"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}