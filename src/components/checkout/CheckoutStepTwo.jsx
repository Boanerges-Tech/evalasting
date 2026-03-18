// src/components/checkout/CheckoutStepTwo.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "../layout/Container";
import { useCart } from "../../context/useCart";
import { useAuth } from "../../context/useAuth";

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

export default function CheckoutStepTwo() {
  const { cart, clearCart } = useCart();
  const { user, guestMode } = useAuth(); // user object if logged in
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const navigate = useNavigate();

  // fetch enabled payment methods
  useEffect(() => {
    async function fetchPaymentMethods() {
      try {
        const res = await fetch(
          "https://evaalasting.othniel-phantasy.com.ng/api/payments/payment-methods.php",
          { credentials: "include" }
        );
        const json = await res.json();
        if (json.ok && json.methods) {
          setPaymentMethods(json.methods);
          setSelectedMethod(json.methods[0]?.id || null);
        }
      } catch (err) {
        console.error("Failed to fetch payment methods", err);
      }
    }
    fetchPaymentMethods();
  }, []);

  // handle continue to review
const handleContinue = async () => {
    if (!user && !guestMode) {
      const proceed = window.confirm(
        "You are not logged in. Login/Signup or continue as guest?"
      );
      if (!proceed) return;
    }

    if (!selectedMethod) {
      alert("Please select a payment method");
      return;
    }

    try {
      const res = await fetch(
        "https://evaalasting.othniel-phantasy.com.ng/api/dashboard/orders.php",
        {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({
            userId: user?.id || null,
            guest: !user,
            items: cart.map((p) => ({
              productId: p.id,
              quantity: p.quantity,
            })),
            paymentMethod: selectedMethod,
          }),
        }
      );

      // Check if response is actually JSON before parsing
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        console.error("Non-JSON response:", text);
        throw new Error("Server returned non-JSON response");
      }

      const json = await res.json();
      
      if (json.ok) {
        clearCart();
        navigate("/checkout/review", { 
            state: { 
                orderId: json.orderId,
                orderNumber: json.orderNumber 
            } 
        });
      } else {
        alert(json.message || "Failed to save order");
      }
    } catch (err) {
      console.error("Order Save Error:", err);
      alert("Error saving order. Please check console for details.");
    }
  };

  // compute totals
  const subtotal = cart.reduce((acc, p) => acc + p.price * p.quantity, 0);
  const shipping = 5.99;
  const discount = 0;
  const total = subtotal + shipping - discount;

  return (
    <section className="py-10 sm:py-14">
      <Container className="max-w-6xl">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-[34px] font-extrabold tracking-tight text-ink sm:text-[40px]">
            Checkout
          </h1>

          {/* Steps */}
          <div className="mt-6 flex flex-wrap items-center gap-5 border-b border-line pb-5">
            <Step number="1" label="Shipping" />
            <Step number="2" label="Payment" active />
            <Step number="3" label="Review Order" />
          </div>

          {/* Main grid */}
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
            {/* Left */}
            <div className="space-y-5">
              <div>
                <SectionTitle>Payment Method</SectionTitle>
                <Card className="p-4">
                  {paymentMethods.length === 0 ? (
                    <p className="text-[12px] text-muted">No payment methods enabled</p>
                  ) : (
                    paymentMethods.map((m) => (
                      <label
                        key={m.id}
                        className="flex items-center gap-3 py-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          className="h-3.5 w-3.5 accent-brand-600"
                          value={m.id}
                          checked={selectedMethod === m.id}
                          onChange={() => setSelectedMethod(m.id)}
                        />
                        <span className="text-[12px] font-semibold">{m.name}</span>
                      </label>
                    ))
                  )}

                  <button
                    onClick={handleContinue}
                    className="mt-4 w-full rounded-sm bg-brand-600 px-5 py-3 text-[12px] font-extrabold text-white shadow-soft hover:bg-brand-700 transition"
                  >
                    Review Order
                  </button>
                </Card>
              </div>
            </div>

            {/* Right: Order summary */}
            <div>
              <Card>
                <div className="border-b border-line px-4 py-3 text-[12px] font-extrabold text-ink">
                  Order Summary
                </div>

                <div className="px-4 py-4 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-[12px] text-muted">Your cart is empty</p>
                  ) : (
                    <>
                      {cart.map((p) => (
                        <div key={p.id} className="flex items-start gap-3 border-b border-line pb-4">
                          <div className="h-16 w-16 overflow-hidden rounded-full bg-gray-100 ring-1 ring-line">
                            <img
                              src={p.img}
                              alt={p.name}
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="text-[12px] font-extrabold text-ink">{p.name}</div>
                            <div className="mt-2 text-[11px] text-muted">
                              Quantity: {p.quantity}
                            </div>
                          </div>
                          <div className="text-[12px] font-semibold text-ink">
                            ${(p.price * p.quantity).toFixed(2)}
                          </div>
                        </div>
                      ))}

                      {/* Totals */}
                      <div className="mt-4 space-y-3 text-[12px]">
                        <div className="flex items-center justify-between">
                          <span className="text-muted">Subtotal</span>
                          <span className="font-semibold text-ink">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted">Shipping</span>
                          <span className="font-semibold text-ink">${shipping.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted">Discount</span>
                          <span className="font-semibold text-ink">${discount.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between border-t border-line pt-3">
                          <span className="font-extrabold text-ink">Total</span>
                          <span className="font-extrabold text-brand-700">${total.toFixed(2)}</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}