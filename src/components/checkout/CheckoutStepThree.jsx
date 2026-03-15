import { useState, useEffect } from "react";
import Container from "../layout/Container";

const API = "https://evaalasting.othniel-phantasy.com.ng/api/orders/create-order.php";

function Step({ number, label, active }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`grid h-7 w-7 place-items-center rounded-full text-[12px] font-extrabold ${
          active
            ? "bg-brand-600 text-white"
            : "border border-brand-600/25 bg-brand-600/5 text-brand-700"
        }`}
      >
        {number}
      </div>
      <span
        className={`text-[12px] font-semibold ${
          active ? "text-brand-700" : "text-muted"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function SuccessModal({ order, onClose }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-md bg-white p-8 text-center">
        <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-green-500 text-white grid place-items-center">
          ✓
        </div>

        <h2 className="text-xl font-bold text-ink">Order Placed Successfully</h2>

        <p className="mt-3 text-sm text-muted">
          Your order <b>#{order}</b> has been received.
        </p>

        <p className="mt-2 text-sm text-muted">
          Once our admin verifies your payment, your order will be processed and
          shipped.
        </p>

        <p className="mt-2 text-sm text-muted">
          A confirmation email has been sent to you.
        </p>

        <button
          onClick={onClose}
          className="mt-6 bg-brand-600 text-white px-6 py-2 rounded"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default function CheckoutStepThree() {
  const [cart, setCart] = useState([]);
  const [orderId, setOrderId] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [shipping, setShipping] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
  });

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const subtotal = cart.reduce((t, item) => t + item.price * item.qty, 0);
  const shippingFee = 5.99;
  const total = subtotal + shippingFee;

  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    if (!shipping.name || !shipping.email || !shipping.address) {
      alert("Please complete your shipping details.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shipping,
          items: cart,
          subtotal,
          shippingFee,
          total,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setOrderId(data.order_id);
        setShowSuccess(true);

        localStorage.removeItem("cart");
      } else {
        alert("Failed to place order");
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    }

    setLoading(false);
  };

  return (
    <>
      <section className="py-10">
        <Container className="max-w-6xl">

          <h1 className="text-3xl font-bold mb-6">Checkout</h1>

          <div className="flex gap-6 border-b pb-4">
            <Step number="1" label="Shipping" />
            <Step number="2" label="Payment" />
            <Step number="3" label="Review Order" active />
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mt-8">

            {/* LEFT */}
            <div>

              <h2 className="font-bold mb-3">Shipping Address</h2>

              <div className="grid gap-3">

                <input
                  name="name"
                  placeholder="Full Name"
                  onChange={handleChange}
                  className="border p-2 rounded"
                />

                <input
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  className="border p-2 rounded"
                />

                <input
                  name="phone"
                  placeholder="Phone"
                  onChange={handleChange}
                  className="border p-2 rounded"
                />

                <input
                  name="address"
                  placeholder="Address"
                  onChange={handleChange}
                  className="border p-2 rounded"
                />

                <input
                  name="city"
                  placeholder="City"
                  onChange={handleChange}
                  className="border p-2 rounded"
                />

                <input
                  name="state"
                  placeholder="State"
                  onChange={handleChange}
                  className="border p-2 rounded"
                />

                <input
                  name="country"
                  placeholder="Country"
                  onChange={handleChange}
                  className="border p-2 rounded"
                />

              </div>

              <p className="text-xs text-muted mt-4">
                Already have an account? <a href="/login" className="text-brand-600 font-bold">Sign in</a> for faster checkout.
              </p>

            </div>


            {/* RIGHT */}
            <div>

              <div className="border rounded-md p-4">

                <h3 className="font-bold mb-4">Order Summary</h3>

                {cart.map((item, i) => (
                  <div key={i} className="flex justify-between mb-3">
                    <span>
                      {item.name} × {item.qty}
                    </span>
                    <span>${item.price * item.qty}</span>
                  </div>
                ))}

                <hr />

                <div className="flex justify-between mt-3">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shippingFee}</span>
                </div>

                <div className="flex justify-between font-bold text-lg mt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <button
                  onClick={placeOrder}
                  disabled={loading}
                  className="mt-6 w-full bg-brand-600 text-white py-3 rounded"
                >
                  {loading ? "Placing Order..." : "Place Order"}
                </button>

              </div>

            </div>

          </div>
        </Container>
      </section>

      {showSuccess && (
        <SuccessModal order={orderId} onClose={() => setShowSuccess(false)} />
      )}
    </>
  );
}