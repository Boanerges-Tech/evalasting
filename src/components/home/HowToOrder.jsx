import Container from "../layout/Container";

function Step({ n, title, text }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-soft2">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-brand-600 text-white grid place-items-center font-black">
          {n}
        </div>
        <div className="font-extrabold text-ink">{title}</div>
      </div>
      <div className="mt-2 text-sm text-muted">{text}</div>
    </div>
  );
}

export default function HowToOrder() {
  return (
    <section className="py-14 sm:py-16">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          {/* Steps */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-ink">
              How to order
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted">
              Quick steps. Smooth process. Your meal arrives fast.
            </p>

            <div className="mt-7 grid gap-3">
              <Step n="1" title="Choose your meal" text="Browse our menu and select what you love." />
              <Step n="2" title="Add details" text="Pick quantity, extras, and delivery location." />
              <Step n="3" title="Checkout" text="Pay securely and confirm your order." />
              <Step n="4" title="Enjoy!" text="We cook and deliver — you relax and enjoy." />
            </div>
          </div>

          {/* Reservation / Order card */}
          <div className="relative overflow-hidden rounded-3xl border border-line bg-gray-100 shadow-soft">
            <div className="aspect-[16/10] bg-gradient-to-br from-gray-100 to-gray-200" />

            <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6 rounded-3xl border border-line bg-white/95 p-5 sm:p-6 shadow-soft">
              <div className="font-black text-ink text-lg">Reserve a table / Quick order</div>
              <p className="mt-1 text-sm text-muted">
                Fill in and we’ll reach out instantly.
              </p>

              <form className="mt-4 grid gap-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    className="h-11 rounded-xl border border-line px-4 text-sm outline-none focus:border-brand-400"
                    placeholder="Full name"
                  />
                  <input
                    className="h-11 rounded-xl border border-line px-4 text-sm outline-none focus:border-brand-400"
                    placeholder="Phone"
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    className="h-11 rounded-xl border border-line px-4 text-sm outline-none focus:border-brand-400"
                    placeholder="Date"
                  />
                  <input
                    className="h-11 rounded-xl border border-line px-4 text-sm outline-none focus:border-brand-400"
                    placeholder="Time"
                  />
                </div>

                <button
                  type="button"
                  className="mt-1 h-11 rounded-xl bg-brand-600 px-5 text-sm font-semibold text-white hover:bg-brand-700 shadow-soft"
                >
                  Submit
                </button>

                <div className="text-xs text-muted">
                  By submitting, you agree we can contact you about your request.
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}