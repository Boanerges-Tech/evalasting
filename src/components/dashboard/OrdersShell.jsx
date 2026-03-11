import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

const API_BASE = "https://evaalasting.othniel-phantasy.com.ng/api";

function SidebarItem({ label, sublabel, active = false, to = "#", onClick }) {
  const base =
    "flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition";

  const content = (
    <>
      <span
        className={[
          "grid h-7 w-7 shrink-0 place-items-center rounded-md text-[10px]",
          active ? "bg-brand-600 text-white" : "bg-white/10 text-white/85",
        ].join(" ")}
      >
        ◫
      </span>

      <span className="min-w-0">
        <span
          className={[
            "block text-[12px] font-semibold",
            active ? "text-white" : "text-white/85",
          ].join(" ")}
        >
          {label}
        </span>
        {sublabel ? (
          <span className="mt-0.5 block text-[10px] text-white/45">
            {sublabel}
          </span>
        ) : null}
      </span>
    </>
  );

  if (to && to !== "#") {
    return (
      <Link
        to={to}
        onClick={onClick}
        className={[
          base,
          active
            ? "bg-white/10"
            : "hover:bg-white/5",
        ].join(" ")}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={[
        base,
        active
          ? "bg-white/10"
          : "hover:bg-white/5",
      ].join(" ")}
    >
      {content}
    </button>
  );
}

function SidebarContent({ user, logout, onItemClick }) {
  return (
    <>
      <div className="text-[10px] uppercase tracking-[0.18em] text-white/45">
        Account Hub
      </div>

      <div className="mt-4 text-[24px] font-semibold text-white">
        Evaalasting Arm
      </div>

      <div className="mt-5 flex items-center gap-3 rounded-2xl bg-white/5 p-3">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-brand-600 text-[11px] font-extrabold text-white">
          {user?.initials || "SA"}
        </div>
        <div>
          <div className="text-[12px] font-semibold text-white">
            {user?.name || "Samuel Adebayo"}
          </div>
          <div className="text-[10px] text-white/45">
            Family Care Plan
          </div>
        </div>
      </div>

      <div className="mt-8 text-[10px] uppercase tracking-[0.18em] text-white/35">
        Menu
      </div>

      <div className="mt-3 space-y-1.5">
        <SidebarItem label="Overview" sublabel="Your dashboard" to="/dashboard" onClick={onItemClick} />
        <SidebarItem label="My Orders" sublabel="Order history" to="/orders" active onClick={onItemClick} />
        <SidebarItem label="Addresses" sublabel="Delivery addresses" to="/addresses" onClick={onItemClick} />
        <SidebarItem label="Payment Methods" sublabel="Cards & billing" to="/payment-methods" onClick={onItemClick} />
        <SidebarItem label="Account Settings" sublabel="Profile & security" to="/account-settings" onClick={onItemClick} />
        <SidebarItem label="Support" sublabel="Get help" to="/support" onClick={onItemClick} />
      </div>

      <div className="mt-8 border-t border-white/10 pt-5">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left hover:bg-white/5"
        >
          <span className="grid h-7 w-7 place-items-center rounded-md bg-white/10 text-[10px] text-white/85">
            ↩
          </span>
          <span className="text-[12px] font-semibold text-white/85">Sign Out</span>
        </button>
      </div>
    </>
  );
}

function FilterPill({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-full px-4 py-2 text-[11px] font-semibold transition",
        active
          ? "bg-[#0e5e56] text-white"
          : "border border-[#d9d1c7] bg-white text-muted hover:bg-gray-50 hover:text-ink",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function formatDate(dateString) {
  const d = new Date(dateString);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function OrderRow({ order }) {
  return (
    <div className="rounded-2xl border border-[#ece7df] bg-white px-4 py-4 shadow-soft2">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#f3efe8] text-[11px]">
            📦
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[12px] font-extrabold text-ink">
                Order #{order.order_number}
              </span>
              <span className="rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-green-700">
                {order.status}
              </span>
            </div>

            <div className="mt-1 text-[11px] text-muted">
              {formatDate(order.created_at)} • {order.item_count} items • £{order.total_amount}
            </div>
          </div>
        </div>

        <button
          type="button"
          className="shrink-0 rounded-full p-2 text-muted hover:bg-gray-50 hover:text-ink"
        >
          ˅
        </button>
      </div>
    </div>
  );
}

export default function OrdersShell() {
  const { logout } = useAuth();
  const [overview, setOverview] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  async function loadOverview() {
    try {
      const res = await fetch(`${API_BASE}/dashboard/overview.php`, {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setOverview(data);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function loadOrders(status = "all") {
    setLoading(true);
    try {
      const res = await fetch(
        `${API_BASE}/dashboard/orders.php?status=${encodeURIComponent(status)}`,
        { credentials: "include" }
      );
      const data = await res.json();

      if (res.ok && data.ok) {
        setOrders(data.orders || []);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error(err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOverview();
  }, []);

  useEffect(() => {
    loadOrders(activeFilter);
  }, [activeFilter]);

  const user = overview?.user;
  const completedCount = useMemo(() => orders.length, [orders]);

  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
      <div className="grid gap-0 lg:grid-cols-[280px_1fr]">
        {/* Mobile dropdown */}
        <div className="mb-4 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="flex w-full items-center justify-between rounded-2xl bg-[#024f4a] px-4 py-3 text-left text-white shadow-soft"
          >
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/45">
                Account Hub
              </div>
              <div className="mt-1 text-[13px] font-extrabold">
                {user?.name || "Evaalasting Arm"}
              </div>
            </div>
            <span className="text-lg">{mobileMenuOpen ? "−" : "+"}</span>
          </button>

          {mobileMenuOpen && (
            <div className="mt-3 rounded-3xl bg-[#024f4a] px-5 py-6 text-white shadow-soft">
              <SidebarContent
                user={user}
                logout={logout}
                onItemClick={() => setMobileMenuOpen(false)}
              />
            </div>
          )}
        </div>

        {/* Desktop sidebar */}
        <aside className="hidden rounded-l-3xl bg-[#024f4a] px-5 py-6 text-white lg:block">
          <SidebarContent user={user} logout={logout} />
        </aside>

        {/* Main */}
        <section className="rounded-3xl bg-[#f7f4ee] px-4 py-5 sm:px-6 sm:py-6 lg:rounded-l-none lg:rounded-r-3xl lg:px-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted">
                Account Hub
              </div>
              <div className="mt-1 text-[14px] font-semibold text-ink">
                My Orders
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-ink shadow-soft2">
                🔔
              </button>
              <button className="rounded-full bg-[#024f4a] px-3 py-1.5 text-[11px] font-semibold text-white">
                {user?.initials || "SA"}
              </button>
            </div>
          </div>

          <div className="mt-8">
            <h1 className="font-display text-[34px] leading-[1.05] text-ink">
              My Orders
            </h1>
            <p className="mt-2 text-[12px] text-muted">
              {completedCount} deliveries completed
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <FilterPill active={activeFilter === "all"} onClick={() => setActiveFilter("all")}>
              All Orders
            </FilterPill>
            <FilterPill active={activeFilter === "delivered"} onClick={() => setActiveFilter("delivered")}>
              Delivered
            </FilterPill>
            <FilterPill active={activeFilter === "processing"} onClick={() => setActiveFilter("processing")}>
              Processing
            </FilterPill>
            <FilterPill active={activeFilter === "scheduled"} onClick={() => setActiveFilter("scheduled")}>
              Scheduled
            </FilterPill>
          </div>

          <div className="mt-6 space-y-4">
            {loading ? (
              <div className="text-[12px] text-muted">Loading orders...</div>
            ) : orders.length === 0 ? (
              <div className="rounded-2xl border border-[#ece7df] bg-white px-4 py-6 text-[12px] text-muted">
                No orders found for this filter.
              </div>
            ) : (
              orders.map((order) => (
                <OrderRow key={order.id} order={order} />
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}