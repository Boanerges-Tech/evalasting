import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "../layout/Container";

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

function AddressCard({ name, email, phone, editable = true }) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[12px] font-extrabold text-ink">{name}</div>
          <div className="mt-2 space-y-1 text-[11px] leading-relaxed text-muted">
            <div>1234 Maple Street, Unit 15</div>
            <div>Los Angeles</div>
            <div>California, 90001</div>
            <div>United States</div>
            <div className="pt-2">{email}</div>
            <div>{phone}</div>
          </div>
        </div>

        {editable && (
          <button className="text-[11px] font-semibold text-brand-700 hover:underline">
            Edit
          </button>
        )}
      </div>
    </Card>
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
            Thank you for your order!
          </h3>

          <p className="mx-auto mt-4 max-w-[300px] text-[12px] leading-relaxed text-muted">
            Your order No. 20146 has been placed successfully.
            We’ve sent a confirmation to amanda@example.com
          </p>

          <div className="mt-6 grid gap-3">
            <Link
              to="/order-success"
              className="inline-flex items-center justify-center rounded-sm bg-brand-600 px-6 py-3 text-[12px] font-extrabold text-white shadow-soft hover:bg-brand-700 transition"
            >
              View Order
            </Link>

            <button
              type="button"
              onClick={onClose}
              className="text-[12px] font-semibold text-muted hover:text-ink transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutStepThree() {
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <>
      <section className="py-10 sm:py-14">
        <Container className="max-w-6xl">
          <div className="mx-auto max-w-5xl">
            <h1 className="text-[34px] font-extrabold tracking-tight text-ink sm:text-[40px]">
              Checkout
            </h1>

            {/* Steps */}
            <div className="mt-6 flex flex-wrap items-center gap-5 border-b border-line pb-5">
              <Step number="1" label="Shipping" />
              <Step number="2" label="Payment" />
              <Step number="3" label="Review Order" active />
            </div>

            {/* Main content */}
            <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
              {/* Left side */}
              <div className="space-y-5">
                <div>
                  <SectionTitle>Shipping Address</SectionTitle>
                  <AddressCard
                    name="Amanda Johnson"
                    email="amanda@example.com"
                    phone="(555) 123-4567"
                  />
                </div>

                <div>
                  <SectionTitle>Billing Address</SectionTitle>
                  <AddressCard
                    name="Amanda Johnson"
                    email="amanda@example.com"
                    phone="(555) 123-4567"
                  />
                </div>
              </div>

              {/* Right side */}
              <div>
                <Card>
                  <div className="border-b border-line px-4 py-3 text-[12px] font-extrabold text-ink">
                    Order summary
                  </div>

                  <div className="px-4 py-4">
                    {/* Product */}
                    <div className="flex items-start gap-3 border-b border-line pb-4">
                      <div className="h-16 w-16 overflow-hidden rounded-full bg-gray-100 ring-1 ring-line">
                        <img
                          src="/assets/products/truffle-fries.jpg"
                          alt="Natural looking Crispy Straight lace Wigs"
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="text-[12px] font-extrabold text-ink">
                          Natural looking Crispy Straight lace Wigs
                        </div>
                        <div className="mt-2 text-[11px] text-muted">
                          Quantity: 1
                        </div>
                      </div>

                      <div className="text-[12px] font-semibold text-ink">
                        $400.00
                      </div>
                    </div>

                    {/* Totals */}
                    <div className="mt-4 space-y-3 text-[12px]">
                      <div className="flex items-center justify-between">
                        <span className="text-muted">Subtotal</span>
                        <span className="font-semibold text-ink">$400.00</span>
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
                        <span className="font-extrabold text-brand-700">
                          $406.99
                        </span>
                      </div>
                    </div>

                    {/* Payment badges */}
                    <div className="mt-5 rounded-sm border border-line px-4 py-3">
                      <div className="text-center text-[10px] font-semibold text-muted">
                        Secured Payment
                      </div>

                      <div className="mt-3 flex items-center justify-center gap-3 text-[11px] font-bold text-ink">
                        <span className="rounded bg-blue-50 px-2 py-1 text-blue-700">
                          VISA
                        </span>
                        <span className="rounded bg-orange-50 px-2 py-1 text-orange-700">
                          MC
                        </span>
                        <span className="rounded bg-sky-50 px-2 py-1 text-sky-700">
                          AMEX
                        </span>
                        <span className="rounded bg-blue-50 px-2 py-1 text-blue-700">
                          PayPal
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Terms text */}
            <div className="mt-6 text-[11px] text-muted">
              By clicking "Place Order", you confirm you have read and agree to our{" "}
              <a href="#" className="font-semibold text-brand-700 hover:underline">
                Terms & Conditions
              </a>.
            </div>

            {/* Place order button */}
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={() => setShowSuccess(true)}
                className="inline-flex min-w-[220px] items-center justify-center rounded-sm bg-brand-600 px-6 py-3 text-[12px] font-extrabold text-white shadow-soft hover:bg-brand-700 transition"
              >
                Place Order
              </button>
            </div>
          </div>
        </Container>
      </section>

      {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}
    </>
  );
}