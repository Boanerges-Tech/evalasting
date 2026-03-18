import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../../context/useAuth";

const API_BASE = "https://evaalasting.othniel-phantasy.com.ng/api";

/* ================= SIDEBAR COMPONENTS ================= */
function SidebarItem({ label, sublabel, active = false, to = "#", onClick }) {
  const base = "flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition";
  const content = (
    <>
      <span className={["grid h-7 w-7 shrink-0 place-items-center rounded-md text-[10px]", active ? "bg-brand-600 text-white" : "bg-white/10 text-white/85"].join(" ")}>◫</span>
      <span className="min-w-0">
        <span className={["block text-[12px] font-semibold", active ? "text-white" : "text-white/85"].join(" ")}>{label}</span>
        {sublabel && <span className="mt-0.5 block text-[10px] text-white/45">{sublabel}</span>}
      </span>
    </>
  );

  return to !== "#" ? (
    <Link to={to} onClick={onClick} className={[base, active ? "bg-white/10" : "hover:bg-white/5"].join(" ")}>{content}</Link>
  ) : (
    <button onClick={onClick} className={[base, active ? "bg-white/10" : "hover:bg-white/5"].join(" ")}>{content}</button>
  );
}

function SidebarContent({ user, logout, onItemClick }) {
  return (
    <>
      <div className="text-[10px] uppercase tracking-[0.18em] text-white/45">Account Hub</div>
      <div className="mt-4 text-[24px] font-semibold text-white">Evaalasting Arm</div>
      <div className="mt-5 flex items-center gap-3 rounded-2xl bg-white/5 p-3">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-brand-600 text-[11px] font-extrabold text-white">
          {user?.name?.slice(0, 2).toUpperCase() || "EA"}
        </div>
        <div>
          <div className="text-[12px] font-semibold text-white">{user?.name || "Guest User"}</div>
          <div className="text-[10px] text-white/45">{user?.email || "Member"}</div>
        </div>
      </div>
      <div className="mt-8 space-y-1.5">
        <SidebarItem label="Overview" sublabel="Your dashboard" to="/dashboard" onClick={onItemClick} />
        <SidebarItem label="My Orders" sublabel="Order history" to="/orders" active onClick={onItemClick} />
        <SidebarItem label="Addresses" sublabel="Delivery addresses" to="/addresses" onClick={onItemClick} />
        <SidebarItem label="Support" sublabel="Get help" to="/support" onClick={onItemClick} />
      </div>
      <div className="mt-8 border-t border-white/10 pt-5">
        <button onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left hover:bg-white/5">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-white/10 text-[10px] text-white/85">↩</span>
          <span className="text-[12px] font-semibold text-white/85">Sign Out</span>
        </button>
      </div>
    </>
  );
}

/* ================= ORDER DETAIL MODAL ================= */
function OrderDetailModal({ order, onClose }) {
  const printRef = useRef();

  const handlePrint = () => {
    if (!printRef.current) return;
    const content = printRef.current.innerHTML;
    const win = window.open("", "", "height=700,width=900");
    win.document.write(`
      <html>
        <head>
          <title>Order Receipt - ${order.order_number}</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>@media print { .no-print { display: none; } }</style>
        </head>
        <body class="p-10">
          <div class="max-w-2xl mx-auto">${content}</div>
          <script>setTimeout(() => { window.print(); window.close(); }, 500);</script>
        </body>
      </html>
    `);
    win.document.close();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-lg font-bold">Order Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-ink text-xl">✕</button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-6" ref={printRef}>
          <div className="mb-6 flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-600">Receipt For</p>
              <h3 className="text-xl font-black text-ink">#{order.order_number}</h3>
              <p className="text-xs text-muted">{new Date(order.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
            <div className="text-right">
              <span className="rounded-full bg-brand-50 px-3 py-1 text-[10px] font-bold text-brand-700 uppercase">{order.status}</span>
            </div>
          </div>

          <div className="mb-8 space-y-4">
            <h4 className="text-[11px] font-bold uppercase text-gray-400 border-b pb-2">Order Items</h4>
            {order.items && order.items.length > 0 ? (
              order.items.map((item, i) => (
                <div key={i} className="flex justify-between border-b border-dashed border-gray-100 pb-3 text-sm">
                  <div>
                    <p className="font-bold text-ink">{item.name || 'Product Item'}</p>
                    <p className="text-[10px] text-muted">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-ink">${(parseFloat(item.price || 0) * parseInt(item.quantity || 1)).toFixed(2)}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-muted italic">Order summary details processed.</p>
            )}
          </div>

          <div className="rounded-2xl bg-gray-50 p-5 text-sm space-y-2">
            <div className="flex justify-between text-muted"><span>Subtotal</span><span>${order.subtotal || order.total_amount}</span></div>
            <div className="flex justify-between text-brand-600 font-medium"><span>Shipping Fee</span><span>${order.shipping_fee || "5.99"}</span></div>
            <div className="flex justify-between border-t border-gray-200 pt-3 font-black text-lg text-ink"><span>Total Paid</span><span>${order.total_amount}</span></div>
          </div>
          
          <div className="mt-8 text-[10px] text-gray-300 uppercase tracking-widest text-center border-t pt-4">
            Evaalasting Arm • Quality and Excellence
          </div>
        </div>

        <div className="flex gap-3 bg-gray-50 p-4 border-t">
          <button onClick={handlePrint} className="flex-1 rounded-xl bg-brand-600 py-3.5 text-sm font-bold text-white shadow-lg hover:bg-brand-700 transition-colors">
            Print Receipt
          </button>
          <button onClick={onClose} className="flex-1 rounded-xl border border-gray-200 bg-white py-3.5 text-sm font-bold text-ink hover:bg-gray-100 transition-colors">
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* ================= MAIN ORDERS PAGE ================= */
export default function OrdersShell() {
  const { logout } = useAuth();
  const [overview, setOverview] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  async function loadData() {
    setLoading(true);
    try {
      const [oRes, ordRes] = await Promise.all([
        fetch(`${API_BASE}/dashboard/overview.php`, { credentials: "include" }),
        fetch(`${API_BASE}/dashboard/orders.php?status=${activeFilter}`, { credentials: "include" })
      ]);
      const oData = await oRes.json();
      const ordData = await ordRes.json();
      
      if (oRes.ok) setOverview(oData);
      if (ordRes.ok) setOrders(ordData.orders || []);
    } catch (err) { 
      console.error("Fetch error:", err); 
    } finally { 
      setLoading(false); 
    }
  }

  useEffect(() => { 
    loadData(); 
  }, [activeFilter]);

  const user = overview?.user;

  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-6 min-h-screen">
      <div className="grid gap-0 lg:grid-cols-[280px_1fr]">
        {/* Desktop Sidebar */}
        <aside className="hidden rounded-l-3xl bg-[#024f4a] px-5 py-6 text-white lg:block">
          <SidebarContent user={user} logout={logout} />
        </aside>

        {/* Mobile Nav */}
        <div className="lg:hidden mb-4">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="w-full flex justify-between items-center bg-[#024f4a] p-4 rounded-2xl text-white shadow-lg">
            <span className="font-bold text-sm">Account Menu</span>
            <span className="text-xl">{mobileMenuOpen ? "✕" : "☰"}</span>
          </button>
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }} 
                animate={{ height: "auto", opacity: 1 }} 
                exit={{ height: 0, opacity: 0 }}
                className="mt-2 rounded-2xl bg-[#024f4a] p-4 text-white overflow-hidden"
              >
                <SidebarContent user={user} logout={logout} onItemClick={() => setMobileMenuOpen(false)} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Main Section */}
        <section className="rounded-3xl bg-[#f7f4ee] px-5 py-6 lg:rounded-l-none lg:rounded-r-3xl min-h-[85vh] shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-[32px] font-black text-ink leading-tight">My Orders</h1>
              <p className="text-[11px] font-bold text-muted uppercase tracking-wider">{orders.length} Deliveries Found</p>
            </div>
            <div className="bg-brand-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md">
              {user?.name?.slice(0, 1) || "E"}
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {["all", "delivered", "processing", "pending"].map(f => (
              <button 
                key={f} 
                onClick={() => setActiveFilter(f)} 
                className={`px-5 py-2 rounded-full text-[11px] font-bold capitalize whitespace-nowrap transition-all ${activeFilter === f ? "bg-brand-600 text-white shadow-lg" : "bg-white text-muted border border-[#ece7df] hover:bg-gray-50"}`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {loading ? (
              <div className="p-12 text-center text-muted animate-pulse font-bold text-sm uppercase tracking-widest">Updating History...</div>
            ) : orders.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-300">
                <div className="text-4xl mb-4">🛍️</div>
                <p className="text-ink font-bold">No orders found</p>
                <p className="text-muted text-xs mt-1">Try a different filter or explore the menu.</p>
                <Link to="/menu" className="mt-6 inline-block bg-brand-600 text-white px-6 py-2.5 rounded-full font-bold text-xs shadow-md">Browse Menu</Link>
              </div>
            ) : (
              orders.map(order => (
                <div key={order.id} className="bg-white rounded-2xl p-4 border border-[#ece7df] shadow-soft2 transition-all hover:border-brand-200 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-xl shadow-inner">📦</div>
                    <div>
                      <h4 className="font-black text-ink text-sm">Order #{order.order_number}</h4>
                      <p className="text-[10px] text-muted font-semibold uppercase">{new Date(order.created_at).toLocaleDateString()} • {order.item_count || 1} items</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block border-r pr-6 border-gray-100">
                      <p className="font-black text-ink text-sm">${order.total_amount}</p>
                      <span className={`text-[9px] font-black uppercase tracking-tighter ${order.status === 'delivered' ? 'text-green-600' : 'text-brand-600'}`}>{order.status}</span>
                    </div>
                    <button 
                      onClick={() => setSelectedOrder(order)} 
                      className="bg-[#024f4a] text-white text-[10px] font-bold px-5 py-2.5 rounded-xl hover:bg-brand-600 transition-colors shadow-md"
                    >
                      Details
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {/* Modal is outside the grid for proper layering */}
      <AnimatePresence>
        {selectedOrder && (
          <OrderDetailModal 
            order={selectedOrder} 
            onClose={() => setSelectedOrder(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}