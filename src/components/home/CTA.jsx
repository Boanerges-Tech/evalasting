import Container from "../layout/Container";

export default function CTA() {
  return (
    <section className="py-14 sm:py-16">
      <Container>
        <div className="rounded-3xl bg-brand-600 text-white shadow-soft overflow-hidden relative">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,white,transparent_55%)]" />
          <div className="relative p-8 sm:p-10 lg:p-12">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                Ready to taste the difference?
              </h2>
              <p className="mt-3 text-sm sm:text-base text-white/90">
                Explore our menu, place an order, and enjoy premium meals delivered fast.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-ink hover:bg-white/90">
                  Order now
                </button>
                <button className="rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold hover:bg-white/10">
                  View menu
                </button>
              </div>

              <div className="mt-5 text-xs text-white/80">
                Delivery available • Fast support • Premium taste
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}