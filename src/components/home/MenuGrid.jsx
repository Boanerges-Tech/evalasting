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
function ProductModal({ item, onClose, setShowCheckout }) {
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
    setShowCheckout(true);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
      >
        <div className="md:w-5/12 bg-gray-50 flex items-center justify-center p-6 relative">
          <button 
            onClick={onClose} 
            className="md:hidden absolute top-4 right-4 bg-white/80 rounded-full p-2 shadow-sm text-gray-500"
          >
            ✕
          </button>
          <img 
            src={item.img} 
            alt={item.name}
            className="w-48 h-48 md:w-60 md:h-60 rounded-full object-cover shadow-xl border-4 border-white" 
          />
        </div>

        <div className="md:w-7/12 p-6 overflow-y-auto custom-scrollbar flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-xl font-bold text-ink">{item.name}</h2>
              <p className="text-xs text-gray-500">Premium Selection Combo</p>
            </div>
            <button 
              onClick={onClose} 
              className="hidden md:block text-gray-300 hover:text-gray-600 transition"
            >
              ✕
            </button>
          </div>

          <div className="space-y-5">
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-2xl">
              <div className="flex items-center gap-4">
                <button 
                   onClick={() => setQty(Math.max(1, qty - 1))}
                   className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm border border-gray-100 hover:bg-gray-100"
                >-</button>
                <span className="font-bold text-brand-600">{qty}</span>
                <button 
                   onClick={() => setQty(qty + 1)}
                   className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm border border-gray-100 hover:bg-gray-100"
                >+</button>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">Total Amount</p>
                <p className="text-lg font-black text-ink">${total.toFixed(2)}</p>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Add Extra Toppings</h3>
              <div className="grid grid-cols-1 gap-2">
                {addonOptions.map((opt, i) => (
                  <div
                    key={i}
                    onClick={() => toggleAddon(opt)}
                    className={`flex justify-between items-center p-3 rounded-xl cursor-pointer transition-all border-2 ${
                      addons.includes(opt)
                        ? "bg-brand-50 border-brand-500 text-brand-700"
                        : "bg-white border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    <span className="text-sm font-semibold">{opt.name}</span>
                    <span className="text-xs opacity-70">+${opt.price}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                Spice Level: <span className="text-brand-600 ml-1">{spiceLabels[spice - 1]} 🌶️</span>
              </h3>
              <div className="px-2 pt-4 pb-2">
                <div className="relative h-1.5 rounded-full bg-gray-100">
                  <div 
                    className="absolute h-full rounded-full bg-gradient-to-r from-green-400 via-brand-500 to-red-600" 
                    style={{ width: `${(spice - 1) * 25}%` }}
                  />
                  <div className="absolute inset-0 flex justify-between items-center -top-[3px]">
                    {[1, 2, 3, 4, 5].map((lvl) => (
                      <div
                        key={lvl}
                        onClick={() => setSpice(lvl)}
                        className={`w-3 h-3 rounded-full cursor-pointer transition-transform hover:scale-150 ${
                          spice >= lvl ? "bg-brand-600 shadow-md" : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={handleBuyNow}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-brand-200 transition-all active:scale-[0.98]"
              >
                Checkout Now
              </button>
              <button
                onClick={handleAddToCart}
                className="w-full border-2 border-brand-100 text-brand-600 py-3 rounded-xl font-bold hover:bg-brand-50 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ================= CHECKOUT MODAL ================= */
function CheckoutModal({ onClose }) {
  const { cart, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // 1. Get logged in user from localStorage (Common pattern)
  const loggedInUser = JSON.parse(localStorage.getItem("user") || "null");

  // 2. Prefill shipping state with user data if it exists
  const [shipping, setShipping] = useState({
    name: loggedInUser?.name || "",
    email: loggedInUser?.email || "",
    phone: loggedInUser?.phone || "",
    address: loggedInUser?.address || "",
    city: loggedInUser?.city || "",
    state: loggedInUser?.state || "",
    country: loggedInUser?.country || "Nigeria",
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
      amount: Math.round(total * 100),
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
    await stripe.redirectToCheckout({ sessionId: session.id });
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
          userId: loggedInUser?.id || null,
          shipping,
          paymentMethod: method,
          paymentReference: reference,
          items: cart.map((p) => ({
            id: p.id,
            name: p.name,
            price: p.price,
            quantity: p.quantity,
          })),
          subtotal,
          shippingFee,
          total,
        }),
      }
    );

    // Check if the server actually returned a 200 OK
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Server responded with ${res.status}: ${errorText}`);
    }

    const data = await res.json();

    if (data.success) {
      clearCart();
      alert("Order placed successfully! Order ID: " + data.order_id);
      onClose();
      // Optional: Redirect to a success page
      // window.location.href = "/order-success?id=" + data.order_id;
    } else {
      alert("Order Error: " + (data.error || "Unknown error"));
    }
  } catch (err) {
    console.error("Order process error:", err);
    alert("System Error: " + err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-[110] p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl shadow-xl overflow-hidden grid md:grid-cols-2 max-h-[90vh]">
        <div className="p-6 border-r border-gray-100 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
             <h2 className="text-xl font-bold">Checkout</h2>
             <button onClick={onClose} className="text-gray-400 hover:text-ink">✕</button>
          </div>
          
          <div className="flex gap-4 mb-6 text-xs uppercase tracking-widest">
            <span className={step === 1 ? "font-bold text-brand-600 border-b-2 border-brand-600" : "text-gray-400"}>Shipping</span>
            <span className={step === 2 ? "font-bold text-brand-600 border-b-2 border-brand-600" : "text-gray-400"}>Payment</span>
            <span className={step === 3 ? "font-bold text-brand-600 border-b-2 border-brand-600" : "text-gray-400"}>Review</span>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="shipping" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>
                <div className="space-y-3">
                  <input name="name" value={shipping.name} placeholder="Full Name" onChange={handleChange} className="border w-full p-2.5 rounded-xl outline-brand-500"/>
                  <input name="email" value={shipping.email} placeholder="Email" onChange={handleChange} className="border w-full p-2.5 rounded-xl outline-brand-500"/>
                  <input name="phone" value={shipping.phone} placeholder="Phone Number" onChange={handleChange} className="border w-full p-2.5 rounded-xl outline-brand-500"/>
                  <input name="address" value={shipping.address} placeholder="Address" onChange={handleChange} className="border w-full p-2.5 rounded-xl outline-brand-500"/>
                  <div className="grid grid-cols-2 gap-2">
                    <input name="city" value={shipping.city} placeholder="City" onChange={handleChange} className="border w-full p-2.5 rounded-xl outline-brand-500"/>
                    <input name="state" value={shipping.state} placeholder="State" onChange={handleChange} className="border w-full p-2.5 rounded-xl outline-brand-500"/>
                  </div>
                </div>
                <button onClick={() => setStep(2)} className="bg-brand-600 text-white w-full py-3.5 rounded-xl font-bold mt-6 shadow-lg shadow-brand-100">
                  Continue to Payment
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="payment" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                <div className="space-y-3">
                  <button onClick={payWithPaystack} className="w-full border-2 border-gray-100 p-4 rounded-xl flex items-center justify-between hover:border-brand-500 transition-all group">
                    <span className="font-bold group-hover:text-brand-600">Pay with Paystack</span>
                    <span>💳</span>
                  </button>
                  <button onClick={payWithStripe} className="w-full border-2 border-gray-100 p-4 rounded-xl flex items-center justify-between hover:border-brand-500 transition-all group">
                    <span className="font-bold group-hover:text-brand-600">Pay with Stripe</span>
                    <span>🌍</span>
                  </button>
                  <button onClick={() => setStep(3)} className="w-full py-3 text-gray-400 font-medium hover:text-brand-600">
                    Skip for Cash on Delivery
                  </button>
                </div>
                <button onClick={() => setStep(1)} className="w-full mt-4 text-sm text-gray-400">Back to Shipping</button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="review" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                <div className="bg-brand-50 p-4 rounded-2xl mb-6">
                  <p className="text-sm font-bold text-brand-800">Delivery to:</p>
                  <p className="text-sm text-brand-700">{shipping.name}</p>
                  <p className="text-xs text-brand-600">{shipping.address}, {shipping.city}</p>
                </div>
                <button onClick={() => placeOrder()} disabled={loading} className="bg-brand-600 text-white w-full py-4 rounded-2xl font-bold shadow-xl">
                  {loading ? "Finalizing Order..." : `Confirm Order - $${total.toFixed(2)}`}
                </button>
                <button onClick={() => setStep(2)} className="w-full mt-4 text-sm text-gray-400">Back to Payment</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-6 bg-gray-50 overflow-y-auto">
          <h3 className="font-bold mb-4 flex items-center justify-between">
            Summary <span>({cart.length} items)</span>
          </h3>
          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-3 items-center">
                <img src={item.img} className="h-12 w-12 rounded-xl object-cover shadow-sm"/>
                <div className="flex-1 text-sm">
                  <p className="font-bold text-ink">{item.name}</p>
                  <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                </div>
                <p className="font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <hr className="my-6 border-gray-200"/>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span className="font-semibold">${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Delivery</span><span className="font-semibold">${shippingFee}</span></div>
            <div className="flex justify-between text-lg font-black text-brand-600 pt-2 border-t border-dashed border-gray-300">
              <span>Grand Total</span><span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= MENU CARD ================= */
function MenuCard({ item, onClick }) {
  return (
    <div onClick={() => onClick(item)} className="cursor-pointer group">
      <div className="rounded-3xl overflow-hidden bg-white shadow-soft2 aspect-square">
        <img src={item.img} alt={item.name}
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"/>
      </div>
      <div className="mt-3 flex justify-between px-2">
        <span className="font-bold text-sm text-ink">{item.name}</span>
        <span className="text-sm font-bold text-brand-600">${item.price}</span>
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
      try {
        const res = await fetch("https://evaalasting.othniel-phantasy.com.ng/api/products.php");
        const json = await res.json();
        setItems(json.products || []);
        const cats = Array.from(new Set((json.products || []).map((p) => p.tag || "Other")));
        setCategories(["All", ...cats]);
      } catch (e) { console.error("Fetch products failed", e); }
    }
    fetchProducts();
  }, []);

  const filtered = useMemo(() => {
    if (active === "All") return items;
    return items.filter((x) => x.tag === active);
  }, [active, items]);

  return (
    <section className="py-12 bg-gray-50/50 min-h-screen">
      <Container>
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {categories.map((c) => (
            <FilterPill key={c} active={active === c} onClick={() => setActive(c)}>{c}</FilterPill>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {filtered.map((item) => (
            <MenuCard key={item.id} item={item} onClick={setSelectedItem} />
          ))}
        </div>
      </Container>

      <div
        onClick={() => setShowCheckout(true)}
        className="fixed bottom-8 right-8 bg-brand-600 text-white h-16 w-16 rounded-2xl flex items-center justify-center shadow-2xl shadow-brand-300 cursor-pointer z-[90] hover:rotate-12 transition-all active:scale-90"
      >
        <span className="text-2xl">🛒</span>
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-[11px] h-6 w-6 rounded-full flex items-center justify-center font-black border-2 border-white">
            {cart.length}
          </span>
        )}
      </div>

      <AnimatePresence>
        {selectedItem && (
          <ProductModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
            setShowCheckout={setShowCheckout}
          />
        )}
      </AnimatePresence>

      {showCheckout && (
        <CheckoutModal onClose={() => setShowCheckout(false)} />
      )}
    </section>
  );
}