import Container from "../layout/Container";

const reviews = [
  { name: "Amaka", text: "The food tastes premium, delivery was fast. Loved it." },
  { name: "Chinedu", text: "Portion was solid and it arrived hot. 10/10." },
  { name: "Peace", text: "The presentation is clean. It feels like a restaurant." },
];

export default function Testimonials() {
  return (
    <section id="reviews" className="py-14 sm:py-16">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-ink">
            What our customers say
          </h2>
          <p className="mt-2 text-sm sm:text-base text-muted">
            Real stories from people who order and come back again.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <article key={r.name} className="rounded-3xl border border-line bg-white p-6 shadow-soft2">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-2xl bg-brand-600/10 border border-brand-600/20 grid place-items-center font-black text-brand-700">
                  {r.name[0]}
                </div>
                <div>
                  <div className="font-extrabold text-ink">{r.name}</div>
                  <div className="text-xs text-muted">Verified customer</div>
                </div>
              </div>

              <p className="mt-4 text-sm text-ink/80 leading-relaxed">
                “{r.text}”
              </p>

              <div className="mt-4 text-xs text-muted">★★★★★</div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}