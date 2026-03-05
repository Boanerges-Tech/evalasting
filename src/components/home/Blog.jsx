import Container from "../layout/Container";

const posts = [
  { title: "How we keep flavors consistent", date: "Mar 2026" },
  { title: "Best meals for busy days", date: "Mar 2026" },
  { title: "Fresh ingredients: what it means", date: "Feb 2026" },
];

export default function Blog() {
  return (
    <section className="py-14 sm:py-16">
      <Container>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          {/* Feature image */}
          <div className="relative overflow-hidden rounded-3xl border border-line bg-gray-100 shadow-soft2">
            <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200" />
            <div className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-ink shadow-soft2">
              Stories & tips
            </div>
          </div>

          {/* Posts */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-ink">
              From our kitchen to your feed
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted">
              Short reads on food, taste, and what makes our meals special.
            </p>

            <div className="mt-7 grid gap-3">
              {posts.map((p) => (
                <a
                  key={p.title}
                  href="#"
                  className="group rounded-2xl border border-line bg-white p-5 shadow-soft2 hover:shadow-soft transition"
                >
                  <div className="text-xs text-muted">{p.date}</div>
                  <div className="mt-1 font-extrabold text-ink group-hover:text-brand-700 transition">
                    {p.title}
                  </div>
                  <div className="mt-2 text-sm text-muted">
                    Read more →
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}