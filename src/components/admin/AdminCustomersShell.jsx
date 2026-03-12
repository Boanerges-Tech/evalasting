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

function StatCard({ title, value, sub }) {
  return (
    <div className="rounded-2xl border border-[#eadfd2] bg-white p-4 shadow-soft2">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[12px] font-semibold text-ink">{title}</div>
          <div className="mt-4 text-[34px] font-extrabold text-[#0b4f49]">
            {value}
          </div>
          <div className="mt-1 text-[11px] text-muted">{sub}</div>
        </div>
        <button className="text-[#8b857d]">⋮</button>
      </div>
    </div>
  );
}

function TinyMetric({ label, value }) {
  return (
    <div>
      <div className="text-[28px] font-extrabold text-ink">{value}</div>
      <div className="mt-1 text-[11px] text-muted">{label}</div>
    </div>
  );
}

function formatDate(dateString) {
  if (!dateString) return "—";
  const d = new Date(dateString);
  return d.toLocaleDateString("en-GB");
}

function CustomerRow({ customer, index }) {
  return (
    <tr className="border-b border-[#f0ebe4] text-[12px]">
      <td className="px-4 py-4 text-ink">{index + 1}</td>
      <td className="px-4 py-4 text-ink">{customer.customer_id}</td>
      <td className="px-4 py-4 font-medium text-ink">{customer.name}</td>
      <td className="px-4 py-4 text-ink">{customer.phone || "—"}</td>
      <td className="px-4 py-4 text-ink">{customer.total_orders}</td>
      <td className="px-4 py-4 text-ink">${customer.total_spent}</td>
      <td className="px-4 py-4 text-[#2f9f45]">{formatDate(customer.last_order_date)}</td>
      <td className="px-4 py-4 text-[#6b655f]">
        <div className="flex items-center gap-2">
          <button className="rounded p-1 hover:bg-[#f3ece4]">👁</button>
          <button className="rounded p-1 hover:bg-[#f3ece4]">🗑</button>
        </div>
      </td>
    </tr>
  );
}

export default function AdminCustomersShell() {
  const { logout } = useAuth();
  const [data, setData] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
  async function loadCustomers() {
    try {
      const qs = new URLSearchParams({
        search,
        page: String(page),
      });

      const res = await fetch(`${API_BASE}/admin/customers.php?${qs.toString()}`, {
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
 loadCustomers();
}, [search, page]);

  const stats = data?.stats || {};
  const customers = data?.customers || [];
  const featured = data?.featured_customer;
  const pagination = data?.pagination || { page: 1, total_pages: 1 };

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
            <SidebarLink label="Dashboard" to="/admin" />
            <SidebarLink label="Order Management" to="/admin/orders" />
            <SidebarLink label="Customers" to="/admin/customers" active />
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
              <div className="text-[18px] font-semibold text-ink">Customer</div>

              <div className="flex items-center gap-3">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setPage(1);
                    setSearch(searchInput);
                  }}
                  className="flex h-11 min-w-[220px] flex-1 items-center rounded-full bg-[#f7f7f4] px-4 md:min-w-[320px]"
                >
                  <input
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search data, users, or reports"
                    className="w-full bg-transparent text-[12px] outline-none placeholder:text-[#8b867f]"
                  />
                  <button type="submit" className="text-[#4b4b4b]">
                    ⌕
                  </button>
                </form>

                <button className="rounded-full bg-white px-3 py-2 shadow-soft2">🔔</button>
                <button className="rounded-full bg-white px-3 py-2 shadow-soft2">⚙</button>
                <button className="grid h-10 w-10 place-items-center rounded-full bg-[#0b4f49] text-[11px] font-bold text-white">
                  EA
                </button>
              </div>
            </div>
          </div>

          {/* Top cards */}
          <div className="mt-4 grid gap-4 xl:grid-cols-[.8fr_1.4fr]">
            <div className="grid gap-4">
              <StatCard
                title="Total Customers"
                value={stats.total_customers || 0}
                sub="Last 7 days"
              />
              <StatCard
                title="New Customers"
                value={stats.new_customers || 0}
                sub="Last 7 days"
              />
              <StatCard
                title="Visitor"
                value={stats.visitor_count || 0}
                sub="Last 7 days"
              />
            </div>

            <div className="rounded-2xl border border-[#eadfd2] bg-white p-4 shadow-soft2">
              <div className="flex items-center justify-between gap-4">
                <div className="text-[16px] font-semibold text-ink">
                  Customer Overview
                </div>
                <div className="flex items-center gap-2">
                  <button className="rounded-full bg-[#d8eacb] px-3 py-1.5 text-[11px] font-semibold text-[#618454]">
                    This week
                  </button>
                  <button className="rounded-full bg-[#f4efe8] px-3 py-1.5 text-[11px] font-semibold text-muted">
                    Last week
                  </button>
                  <button className="text-[#8b857d]">⋮</button>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-4">
                <TinyMetric label="Active Customers" value={stats.active_customers || 0} />
                <TinyMetric label="Recent Customers" value={stats.recent_customers || 0} />
                <TinyMetric label="Shop Visitor" value={stats.shop_visitors || 0} />
                <TinyMetric label="Conversion Rate" value={`${stats.conversion_rate || 0}%`} />
              </div>

              <div className="mt-8 rounded-2xl border border-[#ece5db] bg-[#faf7f2] p-6">
                <div className="h-[220px] w-full rounded-xl bg-[linear-gradient(180deg,#dff0dd_0%,#f8fbf5_100%)]" />
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="mt-4 grid gap-4 xl:grid-cols-[1.4fr_.8fr]">
            <div className="rounded-2xl bg-white p-4 shadow-soft2">
              <div className="text-[16px] font-semibold text-ink">
                Customer Details
              </div>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[860px] text-left">
                  <thead>
                    <tr className="bg-[#d8eacb] text-[11px] text-[#395246]">
                      <th className="rounded-l-xl px-4 py-4 font-semibold">Customer Id</th>
                      <th className="px-4 py-4 font-semibold">Name</th>
                      <th className="px-4 py-4 font-semibold">Phone</th>
                      <th className="px-4 py-4 font-semibold">Total Orders</th>
                      <th className="px-4 py-4 font-semibold">Total Spend</th>
                      <th className="px-4 py-4 font-semibold">Date of last order</th>
                      <th className="rounded-r-xl px-4 py-4 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer, idx) => (
                      <CustomerRow
                        key={customer.id}
                        customer={customer}
                        index={idx}
                      />
                    ))}

                    {customers.length === 0 && (
                      <tr>
                        <td colSpan="7" className="px-4 py-10 text-center text-[12px] text-muted">
                          No customers found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  disabled={pagination.page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="rounded-xl border border-[#ede5db] bg-[#faf7f2] px-4 py-2 text-[12px] font-medium text-ink disabled:opacity-50"
                >
                  ← Previous
                </button>

                <div className="flex items-center justify-center gap-2">
                  {Array.from({ length: pagination.total_pages }, (_, i) => i + 1)
                    .slice(0, 6)
                    .map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPage(p)}
                        className={[
                          "grid h-8 w-8 place-items-center rounded-md text-[12px] font-medium",
                          p === pagination.page
                            ? "bg-[#b9dfab] text-ink"
                            : "border border-[#ede5db] bg-[#faf7f2] text-ink",
                        ].join(" ")}
                      >
                        {p}
                      </button>
                    ))}
                </div>

                <button
                  type="button"
                  disabled={pagination.page >= pagination.total_pages}
                  onClick={() => setPage((p) => Math.min(pagination.total_pages, p + 1))}
                  className="rounded-xl border border-[#ede5db] bg-[#faf7f2] px-4 py-2 text-[12px] font-medium text-ink disabled:opacity-50"
                >
                  Next →
                </button>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-4 shadow-soft2">
              {featured ? (
                <>
                  <div className="flex items-center gap-3">
                    <div className="grid h-14 w-14 place-items-center overflow-hidden rounded-full bg-[#d8eacb] text-[16px] font-bold text-[#0b4f49]">
                      {featured.profile_photo ? (
                        <img
                          src={`https://evaalasting.othniel-phantasy.com.ng${featured.profile_photo}`}
                          alt={featured.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        featured.name
                          .split(" ")
                          .map((x) => x[0])
                          .join("")
                          .slice(0, 2)
                      )}
                    </div>

                    <div>
                      <div className="text-[18px] font-semibold text-ink">
                        {featured.name}
                      </div>
                      <div className="mt-1 text-[12px] text-muted">
                        {featured.email}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 rounded-xl border border-[#ede5db] bg-[#faf7f2] p-4">
                    <div className="text-[12px] font-semibold text-ink">Customer Info</div>
                    <div className="text-[12px] text-muted">📞 {featured.phone || "—"}</div>
                    <div className="text-[12px] text-muted">📍 Customer location not set</div>
                  </div>

                  <div className="mt-4 rounded-xl border border-[#ede5db] bg-[#faf7f2] p-4">
                    <div className="text-[12px] font-semibold text-ink">Overview</div>

                    <div className="mt-4 grid grid-cols-3 gap-3">
                      <div className="rounded-xl bg-white p-3 text-center">
                        <div className="text-[20px] font-extrabold text-[#0b4f49]">
                          {featured.total_orders}
                        </div>
                        <div className="mt-1 text-[10px] text-muted">Total Orders</div>
                      </div>

                      <div className="rounded-xl bg-white p-3 text-center">
                        <div className="text-[20px] font-extrabold text-[#0b4f49]">
                          {stats.total_customers || 0}
                        </div>
                        <div className="mt-1 text-[10px] text-muted">Customers</div>
                      </div>

                      <div className="rounded-xl bg-white p-3 text-center">
                        <div className="text-[20px] font-extrabold text-[#d44343]">
                          10
                        </div>
                        <div className="mt-1 text-[10px] text-muted">Engaged</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <button className="rounded-xl bg-[#f5a64b] px-4 py-3 text-[11px] font-semibold text-white">
                      Call now
                    </button>
                    <button className="rounded-xl bg-[#9acb74] px-4 py-3 text-[11px] font-semibold text-white">
                      Make offer
                    </button>
                    <button className="rounded-xl bg-[#f08e8e] px-4 py-3 text-[11px] font-semibold text-white">
                      Suspend
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-[12px] text-muted">No customer selected.</div>
              )}
            </div>
          </div>

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