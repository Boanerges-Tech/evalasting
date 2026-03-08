import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "../layout/Container";

function Field({ label, children }) {
  return (
    <div>
      <label className="mb-2 block text-[12px] font-extrabold text-ink">
        {label}
      </label>
      {children}
    </div>
  );
}

function Input(props) {
  return (
    <input
      {...props}
      className="h-11 w-full rounded-xl border border-line bg-white px-4 text-[13px] text-ink outline-none placeholder:text-muted focus:border-brand-600/40"
    />
  );
}

function Select(props) {
  return (
    <select
      {...props}
      className="h-11 w-full rounded-xl border border-line bg-white px-4 text-[13px] text-ink outline-none focus:border-brand-600/40"
    >
      {props.children}
    </select>
  );
}

function SuccessModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 px-4">
      <div className="w-full max-w-[460px] rounded-md bg-white shadow-[0_25px_80px_rgba(0,0,0,.25)]">
        <div className="px-8 py-8 text-center">
          {/* green check */}
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-green-100">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-green-500 text-white">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
          </div>

          <h3 className="mt-5 text-[24px] font-extrabold tracking-tight text-ink">
            Reservation confirmed!
          </h3>

          <p className="mx-auto mt-4 max-w-[310px] text-[12px] leading-relaxed text-muted">
            Your reservation request has been received successfully.
            We’ve sent a confirmation to your email address.
          </p>

          <div className="mt-6 grid gap-3">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-sm bg-brand-600 px-6 py-3 text-[12px] font-extrabold text-white shadow-soft hover:bg-brand-700 transition"
            >
              Back to Home
            </Link>

            <button
              type="button"
              onClick={onClose}
              className="text-[12px] font-semibold text-muted hover:text-ink transition"
            >
              Continue Browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReservationForm() {
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden py-12 sm:py-16">
        {/* soft blobs */}
        <div className="pointer-events-none absolute -left-44 top-16 h-[520px] w-[520px] rounded-full bg-brand-600/10 blur-3xl" />
        <div className="pointer-events-none absolute right-[-260px] top-24 h-[560px] w-[560px] rounded-full bg-amber-200/20 blur-3xl" />

        <Container>
          <div className="mx-auto max-w-6xl">
            {/* heading */}
            <div className="mx-auto max-w-3xl text-center">
              <div className="text-[10px] font-extrabold tracking-[0.22em] text-brand-700">
                RESERVE YOUR TABLE
              </div>

              <h1 className="mt-4 font-display text-[34px] leading-[1.1] sm:text-[56px] sm:leading-[1.02] font-extrabold tracking-tight text-ink">
                Book a memorable
                <br />
                dining experience
              </h1>

              <p className="mx-auto mt-4 max-w-[620px] text-[13px] leading-relaxed text-muted sm:text-[14px]">
                Reserve your table in a few clicks and enjoy a premium dining
                experience crafted with flavor, comfort, and care.
              </p>
            </div>

            {/* main grid */}
            <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
              {/* left form */}
              <div className="rounded-3xl bg-white p-6 shadow-soft2 ring-1 ring-line sm:p-8">
                <div className="text-[16px] font-extrabold text-ink">
                  Reservation Details
                </div>
                <p className="mt-2 text-[12px] leading-relaxed text-muted">
                  Fill in your details and we’ll confirm your reservation shortly.
                </p>

                <form
                  className="mt-6 grid gap-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setShowSuccess(true);
                  }}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Full Name">
                      <Input type="text" placeholder="Enter your full name" required />
                    </Field>

                    <Field label="Phone Number">
                      <Input type="tel" placeholder="Enter your phone number" required />
                    </Field>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Email Address">
                      <Input type="email" placeholder="Enter your email" required />
                    </Field>

                    <Field label="Number of Guests">
                      <Select defaultValue="" required>
                        <option value="" disabled>
                          Select guests
                        </option>
                        <option>1 Person</option>
                        <option>2 People</option>
                        <option>3 People</option>
                        <option>4 People</option>
                        <option>5 People</option>
                        <option>6+ People</option>
                      </Select>
                    </Field>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Date">
                      <Input type="date" required />
                    </Field>

                    <Field label="Time">
                      <Input type="time" required />
                    </Field>
                  </div>

                  <Field label="Special Request">
                    <textarea
                      rows="5"
                      placeholder="Any preferences, occasion, or special request..."
                      className="w-full rounded-xl border border-line bg-white px-4 py-3 text-[13px] text-ink outline-none placeholder:text-muted focus:border-brand-600/40"
                    />
                  </Field>

                  <button
                    type="submit"
                    className="mt-2 inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-[12px] font-extrabold text-white shadow-soft hover:bg-brand-700 transition"
                  >
                    Confirm Reservation
                  </button>
                </form>
              </div>

              {/* right side */}
              <div className="space-y-6">
                {/* image */}
                <div className="overflow-hidden rounded-3xl bg-gray-100 shadow-soft2 ring-1 ring-line">
                  <img
                    src="/assets/reservation/restaurant.jpg"
                    alt="Restaurant interior"
                    className="h-[240px] w-full object-cover sm:h-[300px] lg:h-[280px]"
                    loading="lazy"
                  />
                </div>

                {/* opening hours */}
                <div className="rounded-3xl bg-white p-6 shadow-soft2 ring-1 ring-line">
                  <div className="text-[15px] font-extrabold text-ink">
                    Opening Hours
                  </div>

                  <div className="mt-4 space-y-3 text-[12px]">
                    <div className="flex items-center justify-between">
                      <span className="text-muted">Monday</span>
                      <span className="font-semibold text-ink">Closed</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted">Tuesday</span>
                      <span className="font-semibold text-ink">11 AM - 10 PM</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted">Wednesday</span>
                      <span className="font-semibold text-ink">10 AM - 08 PM</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted">Thursday</span>
                      <span className="font-semibold text-ink">10 AM - 11 PM</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted">Friday</span>
                      <span className="font-semibold text-ink">11 AM - 11 PM</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted">Saturday</span>
                      <span className="font-semibold text-ink">11 AM - 10 PM</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted">Sunday</span>
                      <span className="font-semibold text-ink">12 PM - 9 PM</span>
                    </div>
                  </div>
                </div>

                {/* contact note */}
                <div className="rounded-3xl bg-brand-600 p-6 text-white shadow-soft">
                  <div className="text-[14px] font-extrabold">Need help booking?</div>
                  <p className="mt-2 text-[12px] leading-relaxed text-white/90">
                    Reach out to our team for large group bookings, special events,
                    or custom dining requests.
                  </p>

                  <div className="mt-4 space-y-2 text-[12px]">
                    <div>testing@gmail.com</div>
                    <div>+123 456 789</div>
                    <div>Los Angeles</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}
    </>
  );
}