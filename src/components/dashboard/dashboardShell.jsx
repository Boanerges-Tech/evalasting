import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { loadStripe } from "@stripe/stripe-js";
import { useAuth } from "../../context/useAuth";
import { useCart } from "../../context/useCart";

const API_BASE = "https://evaalasting.othniel-phantasy.com.ng/api";
const stripePromise = loadStripe("pk_test_your_stripe_public_key");

/* ================= SHARED UI COMPONENTS ================= */
function SidebarItem({ label, sublabel, active = false, to = "#", onClick }) {
  const baseClass = "flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition";
  const content = (
    <>
      <span className={["grid h-7 w-7 shrink-0 place-items-center rounded-md text-[10px]", active ? "bg-brand-600 text-white" : "bg-white/10 text-white/85"].join(" ")}>•</span>
      <span className="min-w-0">
        <span className={["block text-[12px] font-semibold", active ? "text-white" : "text-white/85"].join(" ")}>{label}</span>
        {sublabel && <span className="mt-0.5 block text-[10px] text-white/45">{sublabel}</span>}
      </span>
    </>
  );
  return to !== "#" ? (
    <Link to={to} onClick={onClick} className={[baseClass, active ? "bg-white/10" : "hover:bg-white/5"].join(" ")}>{content}</Link>
  ) : (
    <button type="button" onClick={onClick} className={[baseClass, active ? "bg-white/10" : "hover:bg-white/5"].join(" ")}>{content}</button>
  );
}

function MetricCard({ value, label, accent }) {
  return (
    <div className="rounded-2xl border border-[#ece7df] bg-white p-4">
      <div className={`text-[22px] font-extrabold ${accent}`}>{value}</div>
      <div className="mt-1 text-[11px] text-muted">{label}</div>
    </div>
  );
}

function ActionButton({ label, primary = false, to = "#", onClick }) {
  const cn = ["flex w-full items-center justify-between rounded-xl px-4 py-3 text-[12px] font-semibold transition", primary ? "bg-brand-600 text-white hover:bg-brand-700" : "border border-line bg-white text-ink hover:bg-gray-50"].join(" ");
  return to !== "#" ? <Link to={to} className={cn}><span>{label}</span><span>›</span></Link> : <button onClick={onClick} className={cn}><span>{label}</span><span>›</span></button>;
}

/* ================= PRODUCT MODAL (EXACT FROM MENUGRID) ================= */
function ProductModal({ item, onClose, setShowCheckout }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [addons, setAddons] = useState([]);
  const [spice, setSpice] = useState(2);
  const addonOptions = [{ name: "Egg", price: 5 }, { name: "Salmon", price: 7 }];
  const spiceLabels = ["Mild", "Low", "Medium", "Hot", "Extreme"];

  const toggleAddon = (addon) => {
    setAddons((prev) => prev.includes(addon) ? prev.filter((a) => a !== addon) : [...prev, addon]);
  };

  const addonTotal = addons.reduce((acc, a) => acc + a.price, 0);
  const total = (item.price * qty) + (addonTotal * qty) + 1.0;

  const handleBuyNow = () => {
    addToCart({ ...item, quantity: qty, addons, spice });
    onClose();
    setShowCheckout(true);
  };

  return (
    <div className="fixed inset-0 z-[150] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
        <div className="md:w-5/12 bg-gray-50 flex items-center justify-center p-6 relative">
          <img src={item.img} className="w-48 h-48 md:w-60 md:h-60 rounded-full object-cover shadow-xl border-4 border-white" />
        </div>
        <div className="md:w-7/12 p-6 overflow-y-auto flex flex-col">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold">{item.name}</h2>
            <button onClick={onClose} className="text-gray-400">✕</button>
          </div>
          <div className="space-y-5">
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-2xl">
              <div className="flex items-center gap-3">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-8 h-8 rounded-full bg-white shadow-sm border border-gray-100">-</button>
                <span className="font-bold text-brand-600">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="w-8 h-8 rounded-full bg-white shadow-sm border border-gray-100">+</button>
              </div>
              <div className="text-right"><p className="text-lg font-black text-ink">${total.toFixed(2)}</p></div>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase text-gray-400 mb-3">Toppings</h3>
              {addonOptions.map((opt, i) => (
                <div key={i} onClick={() => toggleAddon(opt)} className={`flex justify-between p-3 rounded-xl cursor-pointer border-2 mb-2 ${addons.includes(opt) ? "bg-brand-50 border-brand-500" : "bg-white border-gray-100"}`}>
                  <span className="text-sm font-semibold">{opt.name}</span>
                  <span className="text-xs">+$ {opt.price}</span>
                </div>
              ))}
            </div>
            <button onClick={handleBuyNow} className="w-full bg-brand-600 text-white py-4 rounded-xl font-bold shadow-lg">Checkout Now</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ================= CHECKOUT MODAL (WITH REMOVE FEATURE) ================= */
function CheckoutModal({ onClose, userEmail }) {
  const { cart, clearCart, removeFromCart } = useCart();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [shipping, setShipping] = useState({ name: "", email: userEmail || "", phone: "", address: "" });

  const subtotal = cart.reduce((t, item) => t + item.price * item.quantity, 0);
  const shippingFee = 5.99;
  const total = subtotal + shippingFee;

  const handleChange = (e) => setShipping({ ...shipping, [e.target.name]: e.target.value });

  const placeOrder = async (method = "manual", reference = "") => {
    if (cart.length === 0) return alert("Cart is empty");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/orders/create-order.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shipping, paymentMethod: method, paymentReference: reference, items: cart, subtotal, shippingFee, total }),
      });
      const data = await res.json();
      if (data.success) { clearCart(); alert("Order placed!"); onClose(); }
    } catch (err) { alert("Order failed"); }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[200] p-4">
      <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        <div className="p-8 border-r border-gray-100">
          <div className="flex gap-4 mb-6 text-xs uppercase font-bold tracking-widest">
            <span className={step === 1 ? "text-brand-600" : "text-gray-300"}>Shipping</span>
            <span className={step === 2 ? "text-brand-600" : "text-gray-300"}>Payment</span>
          </div>
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div key="s1" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                <input name="name" placeholder="Full Name" onChange={handleChange} className="border w-full p-3 rounded-xl mb-3"/>
                <input name="email" value={shipping.email} placeholder="Email" onChange={handleChange} className="border w-full p-3 rounded-xl mb-3"/>
                <input name="phone" placeholder="Phone" onChange={handleChange} className="border w-full p-3 rounded-xl mb-3"/>
                <textarea name="address" placeholder="Delivery Address" onChange={handleChange} className="border w-full p-3 rounded-xl mb-4 h-24"/>
                <button onClick={() => setStep(2)} className="bg-brand-600 text-white w-full py-4 rounded-xl font-bold">Continue to Payment</button>
              </motion.div>
            ) : (
              <motion.div key="s2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                <button onClick={() => placeOrder("cod")} className="w-full border-2 p-4 rounded-xl mb-3 font-bold hover:bg-gray-50 text-left flex justify-between">Cash on Delivery <span>›</span></button>
                <button onClick={() => alert("Stripe Integration")} className="w-full border-2 p-4 rounded-xl mb-3 font-bold hover:bg-gray-50 text-left flex justify-between">Pay with Card <span>›</span></button>
                <button onClick={() => setStep(1)} className="text-sm text-gray-400 mt-4 underline w-full text-center">Back to Shipping</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-8 bg-gray-50 max-h-[600px] overflow-y-auto">
          <h3 className="font-bold mb-6 flex justify-between items-center">Your Basket <button onClick={onClose} className="text-gray-400 font-normal text-sm">Close</button></h3>
          {cart.length === 0 ? <p className="text-muted text-sm">Your cart is empty.</p> : cart.map((item, idx) => (
            <div key={idx} className="flex gap-3 mb-4 items-center bg-white p-3 rounded-2xl shadow-sm relative group">
              <img src={item.img} className="h-14 w-14 rounded-xl object-cover" />
              <div className="flex-1">
                <p className="text-sm font-bold truncate">{item.name}</p>
                <p className="text-[10px] text-gray-400">Qty: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-brand-600">${(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => removeFromCart(item.id)} className="text-[10px] text-red-500 hover:underline">Remove</button>
              </div>
            </div>
          ))}
          <div className="mt-6 space-y-2 border-t pt-4 text-sm font-semibold">
            <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between text-brand-600"><span>Delivery</span><span>${shippingFee}</span></div>
            <div className="flex justify-between text-lg font-black pt-2 border-t"><span>Total</span><span>${total.toFixed(2)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= PRODUCT CARD ================= */
function ProductCard({ item, onAddSuccess, onOpenModal }) {
  const { addToCart } = useCart();
  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart({ ...item, quantity: 1, addons: [], spice: 2 });
    onAddSuccess(item.name);
  };

  return (
    <div onClick={() => onOpenModal(item)} className="group cursor-pointer relative overflow-hidden rounded-2xl border border-line bg-white shadow-soft2 transition hover:shadow-soft">
      <img src={item.img} alt={item.name} className="h-[130px] w-full object-cover transition-transform duration-500 group-hover:scale-110" />
      <button onClick={handleQuickAdd} className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-brand-600 text-white shadow-lg">+</button>
      <div className="p-4">
        <div className="text-[10px] font-semibold text-muted uppercase tracking-wider">{item.tag || "Combo"}</div>
        <div className="mt-1 text-[13px] font-extrabold text-ink truncate">{item.name}</div>
        <div className="mt-2 flex items-center justify-between text-[11px]">
          <span className="font-bold text-brand-700">${item.price}</span>
          <span className="font-semibold text-muted">★ 4.9</span>
        </div>
      </div>
    </div>
  );
}

/* ================= DASHBOARD SHELL ================= */
export default function DashboardShell() {
  const { logout } = useAuth();
  const { cart } = useCart();
  const [overview, setOverview] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (name) => { setToast(name); setTimeout(() => setToast(null), 4000); };

  async function loadDashboard() {
    try {
      const [oRes, pRes] = await Promise.all([
        fetch(`${API_BASE}/dashboard/overview.php`, { credentials: "include" }),
        fetch(`${API_BASE}/products.php`)
      ]);
      const oData = await oRes.json();
      const pData = await pRes.json();
      if (oRes.ok) setOverview(oData);
      if (pRes.ok) setItems(pData.products.slice(0, 3));
    } catch (e) { console.error(e); } finally { setLoading(false); }
  }

  useEffect(() => { loadDashboard(); }, []);

  const user = overview?.user;
  const stats = overview?.stats;

  return (
    <div className="mx-auto max-w-[1150px] px-4 sm:px-6 relative pb-20">
      
      {/* TOAST WITH SHORTCUT */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -50, opacity: 0 }} className="fixed top-6 right-6 left-6 md:left-auto z-[250] bg-white border-l-4 border-brand-600 rounded-xl shadow-2xl p-4 md:w-80 flex items-center justify-between">
            <div className="flex-1"><p className="text-[10px] font-bold text-brand-600 uppercase">Added!</p><p className="text-sm font-extrabold text-ink truncate">{toast}</p></div>
            <button onClick={() => setShowCheckout(true)} className="bg-brand-600 text-white text-[10px] px-3 py-2 rounded-lg font-bold ml-2">VIEW CART</button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-0 lg:grid-cols-[260px_1fr]">
        <aside className="hidden rounded-l-3xl bg-[#024f4a] px-5 py-6 text-white lg:block">
          <div className="text-[10px] uppercase tracking-[0.18em] text-white/55 mb-6">Account Hub</div>
          <div className="rounded-2xl bg-white/10 p-4 mb-6">
            <p className="font-extrabold truncate">{user?.name || "Member"}</p>
            <p className="text-[10px] opacity-60 truncate">{user?.email}</p>
          </div>
          <div className="space-y-2">
            <SidebarItem label="Overview" active to="/dashboard" />
            <SidebarItem label="My Orders" to="/orders" />
            <SidebarItem label="Addresses" to="/addresses" />
            <button onClick={logout} className="w-full text-left p-3 text-xs opacity-70 hover:opacity-100 mt-4">↩ Sign Out</button>
          </div>
        </aside>

        <section className="rounded-3xl bg-[#f7f2ea] px-5 py-6 sm:px-8 lg:rounded-l-none lg:rounded-r-3xl min-h-[85vh]">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xs font-bold text-muted uppercase tracking-widest">User Dashboard</h1>
            <div className="flex gap-3">
              <button onClick={() => setShowCheckout(true)} className="relative bg-white p-2 rounded-full shadow-sm hover:bg-gray-50 transition">
                🛒 {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-brand-600 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cart.length}</span>}
              </button>
              <div className="bg-[#024f4a] text-white text-xs px-3 py-2 rounded-full font-bold">{user?.name?.slice(0,2).toUpperCase() || "EA"}</div>
            </div>
          </div>

          <div className="bg-[#0e5e56] rounded-3xl p-6 text-white mb-6 shadow-soft">
            <h2 className="text-2xl font-black">Hello, {user?.name?.split(" ")[0] || "User"}!</h2>
            <div className="mt-4 inline-block bg-[#8d6e2c]/60 px-4 py-1.5 rounded-full text-[10px] font-bold">Recommended Meals are ready.</div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <MetricCard value={stats?.orders || 0} label="Orders" accent="text-brand-600" />
            <MetricCard value={stats?.reservations || 0} label="Bookings" accent="text-green-600" />
            <MetricCard value={stats?.addresses || 0} label="Places" accent="text-blue-600" />
          </div>

          <div className="mb-10">
            <h3 className="font-bold text-ink mb-4 text-sm">Quick Actions</h3>
            <div className="grid gap-3 md:grid-cols-3">
               <ActionButton label="View Shopping Basket" onClick={() => setShowCheckout(true)} />
               <ActionButton label="Explore Menu" primary to="/menu" />
               <ActionButton label="Order History" to="/orders" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4 border-b border-line pb-2">
              <h3 className="font-bold text-ink">Recommended This Week</h3>
              <Link to="/menu" className="text-[11px] text-brand-600 font-bold hover:underline">See full menu</Link>
            </div>
            {loading ? <div className="p-10 text-center text-muted animate-pulse">Fetching recommendations...</div> : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {items.map(i => <ProductCard key={i.id} item={i} onAddSuccess={showToast} onOpenModal={setSelectedItem} />)}
              </div>
            )}
          </div>
        </section>
      </div>

      <AnimatePresence>
        {selectedItem && <ProductModal item={selectedItem} onClose={() => setSelectedItem(null)} setShowCheckout={setShowCheckout} />}
      </AnimatePresence>

      {showCheckout && <CheckoutModal onClose={() => setShowCheckout(false)} userEmail={user?.email} />}
      
      <button onClick={() => setShowCheckout(true)} className="fixed bottom-6 right-6 z-[100] bg-brand-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all">
         <span className="text-xl">🛒</span>
         {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] w-5 h-5 rounded-full border-2 border-white flex items-center justify-center font-bold animate-pulse">{cart.length}</span>}
      </button>

    </div>
  );
}