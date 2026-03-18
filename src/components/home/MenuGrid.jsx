// src/components/home/MenuGrid.jsx
import { useEffect, useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { loadStripe } from "@stripe/stripe-js";
import Container from "../layout/Container";
import { useCart } from "../../context/useCart";

const stripePromise = loadStripe("pk_test_your_stripe_public_key");

function FilterPill({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={[
        "rounded-full px-4 py-2 text-[12px] font-extrabold transition",
        active
          ? "bg-brand-600 text-white shadow-soft"
          : "bg-white text-ink/70 ring-1 ring-line hover:text-ink hover:bg-gray-50",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

/* ================= PRODUCT MODAL ================= */
function ProductModal({ item, onClose, onBuyNow, setShowCheckout }) {
  const { addToCart } = useCart();

  const [qty, setQty] = useState(1);
  const [addons, setAddons] = useState([]);
  const [spice, setSpice] = useState(2);

  const addonOptions = [
    { name: "Egg", price: 5 },
    { name: "Salmon", price: 7 },
  ];

  const spiceLabels = ["Mild", "Low", "Medium", "Hot", "Extreme"];

  const toggleAddon = (addon) => {
    setAddons((prev) =>
      prev.includes(addon)
        ? prev.filter((a) => a !== addon)
        : [...prev, addon]
    );
  };

  const addonTotal = addons.reduce((acc, a) => acc + a.price, 0);
  const subtotal = item.price * qty + addonTotal * qty;
  const tax = 1.0;
  const total = subtotal + tax;

  const handleAddToCart = () => {
    addToCart({ ...item, quantity: qty, addons, spice });
    onClose();
  };

  const handleBuyNow = () => {
    addToCart({ ...item, quantity: qty, addons, spice });
    onClose();
    onBuyNow();
    setShowCheckout(true)
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-5xl rounded-2xl grid md:grid-cols-2 overflow-hidden">

        {/* LEFT */}
        <div className="bg-gray-50 flex items-center justify-center p-8">
          <img src={item.img} className="w-72 h-72 rounded-full shadow-lg" />
        </div>

        {/* RIGHT */}
        <div className="p-6 flex flex-col gap-4">

          <h2 className="text-xl font-bold">{item.name} Combo</h2>

          {/* PRICE BOX */}
          <div className="bg-gray-50 p-4 rounded-xl text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold mt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* QTY */}
          <div className="flex items-center gap-3">
            <button onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
            <span className="px-4 py-1 bg-pink-50 rounded font-bold">
              {qty}
            </span>
            <button onClick={() => setQty(qty + 1)}>+</button>
          </div>

          {/* BUY NOW */}
          <button
            onClick={handleBuyNow}
            className="bg-brand-600 text-white py-3 rounded-xl font-bold"
          >
            Buy Now • ${total.toFixed(2)}
          </button>

          {/* ADDONS */}
          <div>
            <h3 className="text-sm font-bold mb-2">Add Nutrients</h3>

            {addonOptions.map((opt, i) => (
              <div
                key={i}
                onClick={() => toggleAddon(opt)}
                className={`flex justify-between p-3 rounded-lg cursor-pointer mb-2 border ${
                  addons.includes(opt)
                    ? "bg-pink-50 border-pink-400"
                    : "bg-gray-50"
                }`}
              >
                <span>{opt.name}</span>
                <span>+${opt.price}</span>
              </div>
            ))}
          </div>

          {/* 🔥 PEPPER SLIDER */}
          <div>
            <h3 className="text-sm font-bold mb-2">
              Pepper Tolerance 🌶️ ({spiceLabels[spice - 1]})
            </h3>

            <div className="relative mt-4">
              {/* Track */}
              <div className="h-2 rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500" />

              {/* Steps */}
              <div className="absolute inset-0 flex justify-between items-center px-1">
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <div
                    key={lvl}
                    onClick={() => setSpice(lvl)}
                    className={`w-4 h-4 rounded-full cursor-pointer transition-all ${
                      spice >= lvl
                        ? "bg-white border-2 border-red-500 scale-110"
                        : "bg-white/50"
                    }`}
                  />
                ))}
              </div>

              {/* Indicator */}
              <div
                style={{ left: `${(spice - 1) * 25}%` }}
                className="absolute -top-2 w-6 h-6 bg-white border-2 border-red-500 rounded-full transition-all"
              />
            </div>
          </div>

          {/* ADD TO CART */}
          <button
            onClick={handleAddToCart}
            className="border border-brand-600 text-brand-600 py-3 rounded-xl font-bold"
          >
            Add to Cart
          </button>

          <button onClick={onClose} className="text-sm text-gray-400">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= CHECKOUT MODAL ================= */
function CheckoutModal({ onClose }) {
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

  const payWithStripe = async () => {
    const stripe = await stripePromise;

    const res = await fetch(
      "https://evaalasting.othniel-phantasy.com.ng/api/payments/create-stripe-session.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart, total, email: shipping.email }),
      }
    );

    const session = await res.json();

    await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  };

  const placeOrder = async (method = "manual", reference = "") => {
    setLoading(true);

    try {
      const res = await fetch(
        "https://evaalasting.othniel-phantasy.com.ng/api/orders/create-order.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },

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

      <div
        className="bg-white rounded-2xl w-full max-w-4xl shadow-xl overflow-hidden grid md:grid-cols-2"
      >

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

            {step === 1 && (
              <motion.div key="shipping"
                initial={{ x: 80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -80, opacity: 0 }}>

                <input name="name" placeholder="Full Name"
                  onChange={handleChange}
                  className="border w-full p-2 rounded mb-3"/>

                <input name="email" placeholder="Email"
                  onChange={handleChange}
                  className="border w-full p-2 rounded mb-3"/>

                <input name="phone" placeholder="Phone"
                  onChange={handleChange}
                  className="border w-full p-2 rounded mb-3"/>

                <input name="address" placeholder="Address"
                  onChange={handleChange}
                  className="border w-full p-2 rounded mb-4"/>

                <button
                  onClick={() => setStep(2)}
                  className="bg-brand-600 text-white w-full py-3 rounded font-bold"
                >
                  Continue
                </button>

              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="payment"
                initial={{ x: 80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -80, opacity: 0 }}>

                <button
                  onClick={payWithPaystack}
                  className="w-full border p-3 rounded mb-3 hover:bg-gray-50">
                  Pay with Paystack
                </button>

                <button
                  onClick={payWithStripe}
                  className="w-full border p-3 rounded mb-3 hover:bg-gray-50">
                  Pay with Stripe
                </button>

                <button
                  onClick={() => setStep(3)}
                  className="text-sm text-gray-500 underline mt-2">
                  Pay later / Cash on delivery
                </button>

              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="review"
                initial={{ x: 80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -80, opacity: 0 }}>

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

        <div className="p-6 bg-gray-50">

          <h3 className="font-bold mb-4">Order Summary</h3>

          {cart.map((item) => (

            <div key={item.id} className="flex gap-3 mb-4 items-center">

              <img src={item.img}
                className="h-14 w-14 rounded object-cover"/>

              <div className="flex-1">
                <div className="text-sm font-semibold">{item.name}</div>
                <div className="text-xs text-gray-500">
                  Qty: {item.quantity}
                </div>
              </div>

              <div className="text-sm font-bold">
                ${(item.price * item.quantity).toFixed(2)}
              </div>

            </div>
          ))}

          <hr className="my-4"/>

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

      </div>
    </div>
  );
}

/* ================= MENU CARD ================= */
function MenuCard({ item, onClick }) {
  return (
    <div onClick={() => onClick(item)} className="cursor-pointer">
      <div className="rounded-3xl overflow-hidden bg-white shadow-soft2">
        <img src={item.img} alt={item.name}
          className="h-[180px] w-full object-cover"/>
      </div>

      <div className="mt-2 flex justify-between">
        <span className="font-bold text-sm">{item.name}</span>
        <span className="text-sm font-bold">${item.price}</span>
      </div>
    </div>
  );
}

/* ================= MAIN ================= */
export default function MenuGrid() {
  const [active, setActive] = useState("All");
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);

  const { cart } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch(
        "https://evaalasting.othniel-phantasy.com.ng/api/products.php"
      );
      const json = await res.json();
      setItems(json.products || []);

      const cats = Array.from(
        new Set((json.products || []).map((p) => p.tag || "Other"))
      );
      setCategories(["All", ...cats]);
    }
    fetchProducts();
  }, []);

  const filtered = useMemo(() => {
    if (active === "All") return items;
    return items.filter((x) => x.tag === active);
  }, [active, items]);

  return (
    <section className="py-12">
      <Container>

        <div className="flex justify-center gap-2 mb-6">
          {categories.map((c) => (
            <FilterPill
              key={c}
              active={active === c}
              onClick={() => setActive(c)}
            >
              {c}
            </FilterPill>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <MenuCard
              key={item.id}
              item={item}
              onClick={setSelectedItem}
            />
          ))}
        </div>

      </Container>

      <div
        onClick={() => setShowCheckout(true)}
        className="fixed bottom-6 right-6 bg-brand-600 text-white h-14 w-14 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
      >
        🛒
        {cart.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-xs h-5 w-5 rounded-full flex items-center justify-center">
            {cart.length}
          </span>
        )}
      </div>

      {selectedItem && (
        <ProductModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          setShowCheckout={setShowCheckout}
        />
      )}

      {showCheckout && (
        <CheckoutModal onClose={() => setShowCheckout(false)} />
      )}
    </section>
  );
}