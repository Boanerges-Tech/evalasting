import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

const API_BASE = "https://evaalasting.othniel-phantasy.com.ng/api";

function SidebarItem({
  label,
  sublabel,
  active = false,
  to = "#",
  onClick,
}) {
  const baseClass =
    "flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition";

  const content = (
    <>
      <span
        className={[
          "grid h-7 w-7 shrink-0 place-items-center rounded-md text-[10px]",
          active ? "bg-brand-600 text-white" : "bg-white/10 text-white/85",
        ].join(" ")}
      >
        •
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
          baseClass,
          active ? "bg-white/10" : "hover:bg-white/5",
        ].join(" ")}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        baseClass,
        active ? "bg-white/10" : "hover:bg-white/5",
      ].join(" ")}
    >
      {content}
    </button>
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

function ActionButton({ label, primary = false, to = "#" }) {
  return (
    <Link
      to={to}
      className={[
        "flex w-full items-center justify-between rounded-xl px-4 py-3 text-[12px] font-semibold transition",
        primary
          ? "bg-brand-600 text-white hover:bg-brand-700"
          : "border border-line bg-white text-ink hover:bg-gray-50",
      ].join(" ")}
    >
      <span>{label}</span>
      <span>›</span>
    </Link>
  );
}

function ProductCard({ item }) {
  return (
    <Link
      to={`/product/${item.slug}`}
      className="overflow-hidden rounded-2xl border border-line bg-white shadow-soft2 transition hover:shadow-soft"
    >
      <img
        src={item.image}
        alt={item.name}
        className="h-[130px] w-full object-cover"
        loading="lazy"
      />

      <div className="p-4">
        <div className="text-[10px] font-semibold text-muted">
          {item.category}
        </div>
        <div className="mt-1 text-[13px] font-extrabold text-ink">
          {item.name}
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px]">
          <span className="text-muted">${item.price}</span>
          <span className="font-semibold text-brand-700">★ {item.rating}</span>
        </div>
      </div>
    </Link>
  );
}

function SidebarContent({ user, logout, onItemClick }) {
  return (
    <>
      <div className="text-[10px] uppercase tracking-[0.18em] text-white/55">
        Account Hub
      </div>

      <div className="mt-4 rounded-2xl bg-white/10 p-4">
        <div className="text-[14px] font-extrabold">
          {user?.name || "Evaalasting User"}
        </div>
        <div className="mt-1 text-[11px] text-white/70">
          {user?.email || "Signed in"}
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <SidebarItem
          label="Overview"
          sublabel="Your dashboard"
          active
          to="/dashboard"
          onClick={onItemClick}
        />
        <SidebarItem
          label="My Orders"
          sublabel="Order history"
          to="/orders"
          onClick={onItemClick}
        />
        <SidebarItem
          label="Addresses"
          sublabel="Delivery addresses"
          to="/addresses"
          onClick={onItemClick}
        />
        <SidebarItem
          label="Payment Methods"
          sublabel="Cards & billing"
          to="/payment-methods"
          onClick={onItemClick}
        />
        <SidebarItem
          label="Account Settings"
          sublabel="Profile & security"
          to="/account-settings"
          onClick={onItemClick}
        />
        <SidebarItem
          label="Support"
          sublabel="Get help"
          to="/support"
          onClick={onItemClick}
        />
      </div>

      <div className="mt-8 pt-6">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-[12px] font-semibold text-white/75 transition hover:bg-white/5 hover:text-white"
        >
          <span className="grid h-6 w-6 place-items-center rounded-md bg-white/10 text-[10px]">
            ↩
          </span>
          <span>Sign Out</span>
        </button>
      </div>
    </>
  );
}

export default function DashboardShell() {
  const { logout } = useAuth();
  const [overview, setOverview] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  async function loadDashboard() {
    try {
      const [overviewRes, recRes] = await Promise.all([
        fetch(`${API_BASE}/dashboard/overview.php`, {
          credentials: "include",
        }),
        fetch(`${API_BASE}/dashboard/recommendations.php`, {
          credentials: "include",
        }),
      ]);

      const overviewData = await overviewRes.json();
      const recData = await recRes.json();

      if (overviewRes.ok && overviewData.ok) {
        setOverview(overviewData);
      }

      if (recRes.ok && recData.ok) {
        setItems(recData.items || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  const user = overview?.user;
  const stats = overview?.stats;

  return (
    <div className="mx-auto max-w-[1150px] px-4 sm:px-6">
      <div className="grid gap-0 lg:grid-cols-[260px_1fr]">
        {/* Mobile dropdown */}
        <div className="mb-4 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="flex w-full items-center justify-between rounded-2xl bg-[#024f4a] px-4 py-3 text-left text-white shadow-soft"
          >
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/55">
                Account Hub
              </div>
              <div className="mt-1 text-[13px] font-extrabold">
                {user?.name || "Evaalasting User"}
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
        <section className="rounded-3xl bg-[#f7f2ea] px-5 py-6 sm:px-8 lg:rounded-l-none lg:rounded-r-3xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-[12px] font-semibold text-muted">
                Overview
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-ink shadow-soft2">
                ☾
              </button>
              <button className="rounded-full bg-[#024f4a] px-3 py-1.5 text-[11px] font-semibold text-white">
                {user?.initials || "EA"}
              </button>
            </div>
          </div>

          <div className="mt-5 rounded-3xl bg-[#0e5e56] p-5 text-white">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-600 text-[12px] font-extrabold">
                {user?.initials?.slice(0, 1) || "E"}
              </div>
              <div>
                <div className="text-[11px] text-white/70">Hello,</div>
                <div className="text-[18px] font-extrabold">
                  {user?.name || "Samuel"}
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-full bg-[#8d6e2c]/60 px-4 py-2 text-[11px] text-white/90">
              It’s that cozy meal time. Place one?
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <MetricCard
              value={stats?.reservations ?? 0}
              label="Reservations"
              accent="text-brand-700"
            />
            <MetricCard
              value={stats?.orders ?? 0}
              label="My Orders"
              accent="text-[#4c8b63]"
            />
            <MetricCard
              value={stats?.addresses ?? 0}
              label="Addresses"
              accent="text-[#5673d6]"
            />
          </div>

          <div className="mt-6">
            <div className="text-[13px] font-extrabold text-ink">
              Quick Actions
            </div>

            <div className="mt-3 grid gap-3">
              <ActionButton label="Order Meals" primary to="/menu" />
              <ActionButton label="Manage Subscription" to="/account-settings" />
              <ActionButton label="View Orders" to="/orders" />
            </div>
          </div>

          <div className="mt-7">
            <div className="flex items-center justify-between">
              <div className="text-[13px] font-extrabold text-ink">
                Recommended This Week
              </div>
              <Link
                to="/menu"
                className="text-[11px] font-semibold text-brand-700"
              >
                See all
              </Link>
            </div>

            {loading ? (
              <div className="mt-4 text-[12px] text-muted">
                Loading recommendations...
              </div>
            ) : (
              <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {items.map((item) => (
                  <ProductCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}