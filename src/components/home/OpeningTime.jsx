import Container from "../layout/Container";

const hours = [
  { day: "Monday", time: "Closed" },
  { day: "Tuesday", time: "11 AM - 10 PM" },
  { day: "Wednesday", time: "10AM - 08PM" },
  { day: "Thursday", time: "10 AM - 11 PM" },
  { day: "Friday", time: "Closed" },
  { day: "Saturday", time: "11 AM - 10 PM" },
  { day: "Sunday", time: "12 AM - 9 PM" },
];

export default function OpeningTime() {
  return (
    <section className="py-14 sm:py-16">
      <Container>
        <div className="relative overflow-hidden rounded-3xl shadow-soft ring-1 ring-line bg-gray-100">
          {/* Background image */}
          <img
            src="/assets/opening/restaurant.jpg"
            alt="Restaurant interior"
            className="h-[260px] w-full object-cover sm:h-[360px] lg:h-[420px]"
            loading="lazy"
          />

          {/* Floating card */}
          <div className="absolute right-6 top-6 hidden sm:block">
            <div className="w-[280px] rounded-2xl bg-white/95 shadow-soft ring-1 ring-line backdrop-blur">
              <div className="px-5 pt-5 pb-3">
                <div className="text-[14px] font-extrabold text-ink">
                  Opening time:
                </div>
              </div>

              <div className="px-5 pb-4">
                <div className="divide-y divide-line">
                  {hours.map((h) => (
                    <div
                      key={h.day}
                      className="flex items-center justify-between py-2.5"
                    >
                      <div className="text-[11.5px] font-semibold text-ink/70">
                        {h.day}
                      </div>
                      <div
                        className={[
                          "text-[11.5px] font-semibold",
                          h.time.toLowerCase() === "closed"
                            ? "text-ink/45"
                            : "text-ink",
                        ].join(" ")}
                      >
                        {h.time}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="mt-4 w-full rounded-full bg-brand-600 py-2.5 text-[12px] font-extrabold text-white shadow-soft hover:bg-brand-700 transition"
                >
                  Book a table
                </button>
              </div>
            </div>
          </div>

          {/* Mobile card (below image) */}
          <div className="sm:hidden p-4">
            <div className="rounded-2xl bg-white shadow-soft ring-1 ring-line">
              <div className="px-5 pt-5 pb-3">
                <div className="text-[14px] font-extrabold text-ink">
                  Opening time:
                </div>
              </div>

              <div className="px-5 pb-5">
                <div className="divide-y divide-line">
                  {hours.map((h) => (
                    <div
                      key={h.day}
                      className="flex items-center justify-between py-2.5"
                    >
                      <div className="text-[11.5px] font-semibold text-ink/70">
                        {h.day}
                      </div>
                      <div
                        className={[
                          "text-[11.5px] font-semibold",
                          h.time.toLowerCase() === "closed"
                            ? "text-ink/45"
                            : "text-ink",
                        ].join(" ")}
                      >
                        {h.time}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="mt-4 w-full rounded-full bg-brand-600 py-2.5 text-[12px] font-extrabold text-white shadow-soft hover:bg-brand-700 transition"
                >
                  Book a table
                </button>
              </div>
            </div>
          </div>
          {/* end mobile card */}
        </div>
      </Container>
    </section>
  );
}