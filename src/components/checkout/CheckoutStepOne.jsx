import Container from "../layout/Container";
import { Link } from "react-router-dom";


function Step({ number, label, active = false }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={[
          "grid h-7 w-7 place-items-center rounded-full text-[12px] font-extrabold",
          active
            ? "bg-brand-600 text-white"
            : "border border-brand-600/25 bg-brand-600/5 text-brand-700",
        ].join(" ")}
      >
        {number}
      </div>
      <span
        className={[
          "text-[12px] font-semibold",
          active ? "text-brand-700" : "text-muted",
        ].join(" ")}
      >
        {label}
      </span>
    </div>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-md border border-line bg-white ${className}`}>
      {children}
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <div className="mb-3 text-[13px] font-extrabold text-brand-700">
      {children}
    </div>
  );
}

function RadioRow({ label, eta, price, active = false }) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-3 py-3">
      <div className="flex items-start gap-3">
        <span
          className={[
            "mt-1 h-3.5 w-3.5 rounded-full border",
            active
              ? "border-brand-600 bg-brand-600 shadow-[inset_0_0_0_2px_white]"
              : "border-line bg-white",
          ].join(" ")}
        />
        <div>
          <div className="text-[12px] font-semibold text-ink">{label}</div>
          <div className="mt-1 text-[11px] text-muted">{eta}</div>
        </div>
      </div>

      <div className="text-[12px] font-semibold text-ink">{price}</div>
    </label>
  );
}

export default function CheckoutStepOne() {
  return (
    <section className="py-10 sm:py-14">
      <Container className="max-w-6xl">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-[34px] font-extrabold tracking-tight text-ink sm:text-[40px]">
            Checkout
          </h1>

          {/* Steps */}
          <div className="mt-6 flex flex-wrap items-center gap-5 border-b border-line pb-5">
            <Step number="1" label="Shipping" active />
            <Step number="2" label="Payment" />
            <Step number="3" label="Review Order" />
          </div>

          {/* Main grid */}
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
            {/* Left */}
            <div className="space-y-5">
              <div>
                <SectionTitle>Shipping Address</SectionTitle>

                <Card className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[12px] font-extrabold text-ink">
                        Amanda Johnson
                      </div>
                      <div className="mt-2 space-y-1 text-[11px] leading-relaxed text-muted">
                        <div>1234 Maple Street, Unit 15</div>
                        <div>Los Angeles</div>
                        <div>California, 90001</div>
                        <div>United States</div>
                        <div className="pt-2">amanda@example.com</div>
                        <div>(555) 123-4567</div>
                      </div>
                    </div>

                    <button className="text-[11px] font-semibold text-brand-700 hover:underline">
                      Change
                    </button>
                  </div>
                </Card>
              </div>

              <div>
                <SectionTitle>Shipping Methods</SectionTitle>

                <Card className="p-4">
                  <div className="divide-y divide-line">
                    <RadioRow
                      label="Standard Shipping"
                      eta="4–6 Business Days"
                      price="$5.99"
                      active
                    />
                    <RadioRow
                      label="Express Shipping"
                      eta="2–3 Business Days"
                      price="$9.99"
                    />
                  </div>

                  <Link
  to="/checkout/payment"
  className="mt-4 inline-flex w-full items-center justify-center rounded-sm bg-brand-600 px-5 py-3 text-[12px] font-extrabold text-white shadow-soft hover:bg-brand-700 transition"
>
  Continue to Payment
</Link>
                </Card>
              </div>
            </div>

            {/* Right */}
            <div>
              <Card>
                <div className="border-b border-line px-4 py-3 text-[12px] font-extrabold text-ink">
                  Order Summary
                </div>

                <div className="px-4 py-4">
                  {/* Product */}
                  <div className="flex items-start gap-3 border-b border-line pb-4">
                    <div className="h-16 w-16 overflow-hidden rounded-full bg-gray-100 ring-1 ring-line">
                      <img
                        src="/assets/products/truffle-fries.jpg"
                        alt="Truffle fries"
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="text-[12px] font-extrabold text-ink">
                        Truffle fries
                      </div>
                      <div className="mt-2 text-[11px] text-muted">
                        Quantity: 1
                      </div>
                    </div>

                    <div className="text-[12px] font-semibold text-ink">$42.99</div>
                  </div>

                  {/* Totals */}
                  <div className="mt-4 space-y-3 text-[12px]">
                    <div className="flex items-center justify-between">
                      <span className="text-muted">Subtotal</span>
                      <span className="font-semibold text-ink">$42.99</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-muted">Shipping</span>
                      <span className="font-semibold text-ink">$5.99</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-muted">Discount</span>
                      <span className="font-semibold text-ink">$0.00</span>
                    </div>

                    <div className="flex items-center justify-between border-t border-line pt-3">
                      <span className="font-extrabold text-ink">Total</span>
                      <span className="font-extrabold text-brand-700">$50.98</span>
                    </div>
                  </div>

                  {/* Payment badges */}
                  <div className="mt-5 rounded-sm border border-line px-4 py-3">
                    <div className="text-center text-[10px] font-semibold text-muted">
                      Secured Payment
                    </div>

                    <div className="mt-3 flex items-center justify-center gap-3 text-[11px] font-bold text-ink">
                      <span className="rounded bg-blue-50 px-2 py-1 text-blue-700">VISA</span>
                      <span className="rounded bg-orange-50 px-2 py-1 text-orange-700">MC</span>
                      <span className="rounded bg-sky-50 px-2 py-1 text-sky-700">AMEX</span>
                      <span className="rounded bg-blue-50 px-2 py-1 text-blue-700">PayPal</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}