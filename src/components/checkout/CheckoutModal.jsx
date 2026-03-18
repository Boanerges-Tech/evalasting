import { AnimatePresence } from "framer-motion";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { useCart } from "../../context/useCart";

const stripePromise = loadStripe("pk_test_your_stripe_public_key");

export default function CheckoutModal({ onClose }) {
  const { cart, clearCart } = useCart();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [shipping, setShipping] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const subtotal = cart.reduce(
    (t, item) => t + item.price * item.quantity,
    0
  );

  const shippingFee = 5.99;
  const total = subtotal + shippingFee;

  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  /* ================= PAYSTACK ================= */

  const payWithPaystack = () => {
    const handler = window.PaystackPop.setup({
      key: "pk_test_your_paystack_public_key",
      email: shipping.email,
      amount: total * 100,
      currency: "USD",

      callback: function (response) {
        placeOrder("paystack", response.reference);
      },

      onClose: function () {
        alert("Payment cancelled");
      },
    });

    handler.openIframe();
  };

  /* ================= STRIPE ================= */

  const payWithStripe = async () => {
    const stripe = await stripePromise;

    const res = await fetch(
      "https://evaalasting.othniel-phantasy.com.ng/api/payments/create-stripe-session.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart,
          total,
          email: shipping.email,
        }),
      }
    );

    const session = await res.json();

    await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  };

  /* ================= PLACE ORDER ================= */

  const placeOrder = async (method = "manual", reference = "") => {
    setLoading(true);

    try {
      const res = await fetch(
        "https://evaalasting.othniel-phantasy.com.ng/api/orders/create-order.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            shipping,
            paymentMethod: method,
            paymentReference: reference,

            items: cart.map((p) => ({
              productId: p.id,
              quantity: p.quantity,
            })),

            subtotal,
            shippingFee,
            total,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        clearCart();
        alert("Order placed successfully!");
        onClose();
      }
    } catch (err) {
      console.error(err);
      alert("Order failed");
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-[110] p-4">

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 80 }}
        transition={{ duration: 0.35 }}
        className="bg-white rounded-2xl w-full max-w-4xl shadow-xl overflow-hidden grid md:grid-cols-2"
      >

        {/* LEFT PANEL */}
        <div className="p-6 border-r border-gray-100">

          <div className="flex gap-4 mb-6">

            <span className={step === 1 ? "font-bold" : "text-gray-400"}>
              Shipping
            </span>

            <span className={step === 2 ? "font-bold" : "text-gray-400"}>
              Payment
            </span>

            <span className={step === 3 ? "font-bold" : "text-gray-400"}>
              Review
            </span>

          </div>

          <AnimatePresence mode="wait">

            {/* STEP 1 */}

            {step === 1 && (
              <motion.div
                key="shipping"
                initial={{ x: 80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -80, opacity: 0 }}
              >

                <input
                  name="name"
                  placeholder="Full Name"
                  onChange={handleChange}
                  className="border w-full p-2 rounded mb-3"
                />

                <input
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  className="border w-full p-2 rounded mb-3"
                />

                <input
                  name="phone"
                  placeholder="Phone"
                  onChange={handleChange}
                  className="border w-full p-2 rounded mb-3"
                />

                <input
                  name="address"
                  placeholder="Address"
                  onChange={handleChange}
                  className="border w-full p-2 rounded mb-4"
                />

                <button
                  onClick={() => setStep(2)}
                  className="bg-brand-600 text-white w-full py-3 rounded font-bold"
                >
                  Continue
                </button>

              </motion.div>
            )}

            {/* STEP 2 */}

            {step === 2 && (
              <motion.div
                key="payment"
                initial={{ x: 80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -80, opacity: 0 }}
              >

                <button
                  onClick={payWithPaystack}
                  className="w-full border p-3 rounded mb-3 hover:bg-gray-50"
                >
                  Pay with Paystack
                </button>

                <button
                  onClick={payWithStripe}
                  className="w-full border p-3 rounded mb-3 hover:bg-gray-50"
                >
                  Pay with Stripe
                </button>

                <button
                  onClick={() => setStep(3)}
                  className="text-sm text-gray-500 underline mt-2"
                >
                  Pay later / Cash on delivery
                </button>

              </motion.div>
            )}

            {/* STEP 3 */}

            {step === 3 && (
              <motion.div
                key="review"
                initial={{ x: 80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -80, opacity: 0 }}
              >

                <button
                  onClick={() => placeOrder()}
                  disabled={loading}
                  className="bg-brand-600 text-white w-full py-3 rounded font-bold"
                >
                  {loading ? "Processing..." : "Place Order"}
                </button>

              </motion.div>
            )}

          </AnimatePresence>

        </div>

        {/* RIGHT PANEL (ORDER SUMMARY) */}

        <div className="p-6 bg-gray-50">

          <h3 className="font-bold mb-4">Order Summary</h3>

          {cart.map((item) => (

            <div
              key={item.id}
              className="flex gap-3 mb-4 items-center"
            >

              <img
                src={item.img}
                className="h-14 w-14 rounded object-cover"
              />

              <div className="flex-1">

                <div className="text-sm font-semibold">
                  {item.name}
                </div>

                <div className="text-xs text-gray-500">
                  Qty: {item.quantity}
                </div>

              </div>

              <div className="text-sm font-bold">
                ${(item.price * item.quantity).toFixed(2)}
              </div>

            </div>

          ))}

          <hr className="my-4" />

          <div className="flex justify-between text-sm mb-2">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm mb-2">
            <span>Shipping</span>
            <span>${shippingFee}</span>
          </div>

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

        </div>

      </motion.div>

    </div>
  );
}