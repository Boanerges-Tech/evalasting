import Container from "../layout/Container";

export default function StatsBand() {
  const stats = [
    { k: "80,005+", v: "Happy customers" },
    { k: "1,200+", v: "Daily orders" },
    { k: "4.9/5", v: "Average rating" },
    { k: "25min", v: "Avg. delivery" },
  ];

  return (
    <section className="py-10">
      <Container>
        <div className="rounded-3xl border border-line bg-white shadow-soft p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.v} className="rounded-2xl bg-gray-50/60 border border-line p-5">
                <div className="text-2xl sm:text-3xl font-black tracking-tight text-ink">
                  {s.k}
                </div>
                <div className="mt-1 text-sm text-muted">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}