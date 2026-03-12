import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

const API_BASE = "https://evaalasting.othniel-phantasy.com.ng/api";

function SidebarLink({ label, to = "#", active = false }) {
  return (
    <Link
      to={to}
      className={[
        "flex items-center gap-3 rounded-lg px-3 py-2 text-[12px] font-medium transition",
        active
          ? "bg-[#7a114e] text-white"
          : "text-[#5f5b57] hover:bg-[#f3ece4]",
      ].join(" ")}
    >
      <span className="grid h-5 w-5 place-items-center rounded-md bg-black/5 text-[10px]">
        ◫
      </span>
      <span>{label}</span>
    </Link>
  );
}

function StatCard({ title, value, sub, accent = "text-[#0b4f49]" }) {
  return (
    <div className="rounded-2xl border border-[#eadfd2] bg-white p-4 shadow-soft2">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[12px] font-semibold text-ink">{title}</div>
          <div className={`mt-4 text-[34px] font-extrabold ${accent}`}>{value}</div>
          <div className="mt-1 text-[11px] text-muted">{sub}</div>
        </div>

        <button className="text-[#8b857d]">⋮</button>
      </div>

      <div className="mt-5 flex justify-end">
        <button className="rounded-full border border-[#6fd35e] px-4 py-1.5 text-[11px] font-semibold text-[#32a852]">
          Details
        </button>
      </div>
    </div>
  );
}

function TinyStat({ label, value }) {
  return (
    <div>
      <div className="text-[30px] font-extrabold text-ink">{value}</div>
      <div className="mt-1 text-[11px] text-muted">{label}</div>
    </div>
  );
}

export default function AdminDashboardShell() {
  const { logout } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/admin/dashboard.php`, {
          credentials: "include",
        });
        const json = await res.json();
        if (res.ok && json.ok) {
          setData(json);
        }
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, []);

  const admin = data?.admin;
  const stats = data?.stats;
  const transactions = data?.recent_transactions || [];
  const topProducts = data?.top_products || [];
  const categories = data?.categories || [];

  return (
    <div className="mx-auto max-w-[1320px] px-3 sm:px-5">
      <div className="grid gap-4 lg:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <aside className="rounded-[24px] bg-white p-4 shadow-soft2">
          <div className="flex items-center gap-3 px-2 py-3">
            <div className="text-[30px] font-extrabold text-[#7a114e]">🍴</div>
            <div className="font-display text-[34px] leading-none text-[#7a114e]">
              Evaalasting Arm
            </div>
          </div>

          <div className="mt-4 space-y-1">
            <SidebarLink label="Dashboard" to="/admin" active />
            <SidebarLink label="Order Management" to="/admin/orders" />
            <SidebarLink label="Customers" to="/admin/customers" />
            <SidebarLink label="Custom Catering" to="/admin/catering" />
            <SidebarLink label="Sales Report" to="/admin/reports" />
            <SidebarLink label="Invoice" to="/admin/invoices" />
            <SidebarLink label="Add Products" to="/admin/add-product" />
            <SidebarLink label="Products" to="/admin/products" />
            <SidebarLink label="Settings" to="/admin/settings" />
          </div>
        </aside>

        {/* Main */}
        <section className="rounded-[24px] bg-[#f6e9df] p-4 shadow-soft2">
          {/* Top bar */}
          <div className="rounded-2xl bg-white px-4 py-3 shadow-soft2">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="text-[18px] font-semibold text-ink">
                Order Management
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-11 min-w-[220px] flex-1 items-center rounded-full bg-[#d8f0cf] px-4 md:min-w-[320px]">
                  <input
                    placeholder="Search data, users, or reports"
                    className="w-full bg-transparent text-[12px] outline-none placeholder:text-[#6e7b6f]"
                  />
                  <span className="text-[#4b6d53]">⌕</span>
                </div>

                <button className="rounded-full bg-white px-3 py-2 shadow-soft2">🔔</button>
                <button className="rounded-full bg-white px-3 py-2 shadow-soft2">⚙</button>
                <button className="grid h-10 w-10 place-items-center rounded-full bg-[#0b4f49] text-[11px] font-bold text-white">
                  {admin?.initials || "EA"}
                </button>
              </div>
            </div>
          </div>

          {/* Top stats */}
          <div className="mt-4 grid gap-4 xl:grid-cols-3">
            <StatCard
              title="Total Income"
              value={`$${stats?.total_income || "0.00"}`}
              sub="Last 7 days"
              accent="text-[#0b4f49]"
            />
            <StatCard
              title="Total Sales"
              value={`${stats?.total_sales || 0}`}
              sub="Orders"
              accent="text-[#0b4f49]"
            />
            <StatCard
              title="Total Website Visits"
              value={`${stats?.website_visits || 0}`}
              sub="Visits"
              accent="text-[#0b4f49]"
            />
          </div>

          {/* Middle row */}
          <div className="mt-4 grid gap-4 xl:grid-cols-[1.3fr_.8fr]">
            <div className="rounded-2xl bg-white p-4 shadow-soft2">
              <div className="flex items-center justify-between gap-4">
                <div className="text-[16px] font-semibold text-ink">
                  Report for this week
                </div>
                <div className="flex items-center gap-2">
                  <button className="rounded-full bg-[#e6f0df] px-3 py-1.5 text-[11px] font-semibold text-[#618454]">
                    This week
                  </button>
                  <button className="rounded-full bg-[#f4efe8] px-3 py-1.5 text-[11px] font-semibold text-muted">
                    Last week
                  </button>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-5">
                <TinyStat label="Customers" value={`${stats?.customers || 0}`} />
                <TinyStat label="Total Products" value={`${stats?.products || 0}`} />
                <TinyStat label="Site Visits" value={`${stats?.site_visits || 0}`} />
                <TinyStat label="Event Caterings" value={`${stats?.event_caterings || 0}`} />
                <TinyStat label="Revenue" value={`${stats?.revenue || 0}`} />
              </div>

              <div className="mt-8 rounded-2xl border border-[#ece5db] bg-[#faf7f2] p-6">
                <div className="h-[220px] w-full rounded-xl bg-[linear-gradient(180deg,#dff0dd_0%,#f8fbf5_100%)]" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl bg-white p-4 shadow-soft2">
                <div className="flex items-center justify-between">
                  <div className="text-[16px] font-semibold text-ink">
                    Add New Category
                  </div>
                  <button className="rounded-full border border-[#7bd26f] px-3 py-1.5 text-[11px] font-semibold text-[#3ca44b]">
                    + Add new category
                  </button>
                </div>

                <div className="mt-4 space-y-3">
                  {categories.map((cat, idx) => (
                    <div
                      key={`${cat.name}-${idx}`}
                      className="flex items-center justify-between rounded-xl border border-[#ede5db] bg-[#faf7f2] px-4 py-3"
                    >
                      <div className="text-[13px] font-medium text-ink">{cat.name}</div>
                      <span className="text-[#92b04a]">›</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-white p-4 shadow-soft2">
                <div className="flex items-center justify-between">
                  <div className="text-[16px] font-semibold text-ink">
                    Best Selling Products
                  </div>
                  <button className="rounded-full border border-[#7bd26f] px-3 py-1.5 text-[11px] font-semibold text-[#3ca44b]">
                    + Add new product
                  </button>
                </div>

                <div className="mt-4 space-y-3">
                  {topProducts.map((product, idx) => (
                    <div
                      key={`${product.name}-${idx}`}
                      className="flex items-center justify-between rounded-xl border border-[#ede5db] bg-[#faf7f2] px-4 py-3"
                    >
                      <div>
                        <div className="text-[13px] font-semibold text-ink">
                          {product.name}
                        </div>
                        <div className="mt-1 text-[11px] text-[#3ca44b]">
                          ${product.price}
                        </div>
                      </div>

                      <div className="text-[11px] font-semibold text-muted">
                        ★ {product.rating}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="mt-4 grid gap-4 xl:grid-cols-[1.3fr_.8fr]">
            <div className="rounded-2xl bg-white p-4 shadow-soft2">
              <div className="flex items-center justify-between">
                <div className="text-[16px] font-semibold text-ink">
                  Recent Transactions
                </div>
                <button className="rounded-full bg-[#49a04d] px-4 py-2 text-[11px] font-semibold text-white">
                  Filter
                </button>
              </div>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[560px] text-left">
                  <thead>
                    <tr className="rounded-xl bg-[#c9efd1] text-[11px] uppercase text-[#42624e]">
                      <th className="rounded-l-xl px-4 py-3 font-semibold">Product</th>
                      <th className="px-4 py-3 font-semibold">Units</th>
                      <th className="px-4 py-3 font-semibold">Email</th>
                      <th className="rounded-r-xl px-4 py-3 font-semibold">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx, idx) => (
                      <tr key={`${tx.order_number}-${idx}`} className="border-b border-[#f0ebe4] text-[12px]">
                        <td className="px-4 py-4 font-medium text-ink">
                          {tx.customer_name || tx.order_number}
                        </td>
                        <td className="px-4 py-4 text-muted">{tx.order_number}</td>
                        <td className="px-4 py-4 text-[#3ca44b]">{tx.email || "—"}</td>
                        <td className="px-4 py-4 font-semibold text-ink">${tx.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex justify-end">
                <button className="rounded-full border border-[#6fd35e] px-4 py-1.5 text-[11px] font-semibold text-[#32a852]">
                  Details
                </button>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-4 shadow-soft2">
              <div className="text-[22px] font-extrabold text-[#3ca44b]">
                Event Catering Bookings
              </div>
              <div className="mt-3 text-[14px] font-semibold text-ink">
                Month 2000
              </div>

              <div className="mt-6 grid grid-cols-7 gap-2 text-center text-[11px] text-muted">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                  <div key={d}>{d}</div>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-7 gap-2 text-center text-[12px]">
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                  <div
                    key={day}
                    className={[
                      "grid h-9 place-items-center rounded-lg",
                      day === 24
                        ? "bg-[#8ac66b] text-white"
                        : "bg-[#faf7f2] text-ink",
                    ].join(" ")}
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-4 text-[10px] text-muted">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#8ac66b]" />
                  <span>Day Booked</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#dadada]" />
                  <span>Day Available</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom admin quick row */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={logout}
              className="rounded-full bg-[#7a114e] px-5 py-2.5 text-[12px] font-semibold text-white hover:bg-[#650d41]"
            >
              Logout
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}