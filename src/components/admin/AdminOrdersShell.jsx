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

function StatCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-[#eadfd2] bg-white p-4 shadow-soft2">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[12px] font-semibold text-ink">{title}</div>
          <div className="mt-4 text-[34px] font-extrabold text-[#0b4f49]">
            {value}
          </div>
          <div className="mt-1 text-[11px] text-muted">Last 7 days</div>
        </div>

        <button className="text-[#8b857d]">⋮</button>
      </div>
    </div>
  );
}

function FilterTab({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-lg px-4 py-2 text-[11px] font-medium transition",
        active
          ? "bg-[#d8eacb] text-[#0b4f49]"
          : "text-[#65605b] hover:bg-[#f3ece4]",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function statusClass(status) {
  const s = status.toLowerCase();
  if (s === "delivered" || s === "completed") return "text-[#2f9f45]";
  if (s === "pending") return "text-[#d08d19]";
  if (s === "cancelled") return "text-[#d44343]";
  if (s === "shipped" || s === "processing" || s === "paid") return "text-[#444]";
  return "text-[#666]";
}

function formatDate(dateString) {
  const d = new Date(dateString);
  return d.toLocaleDateString("en-GB");
}

export default function AdminOrdersShell() {
  const { logout } = useAuth();
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
  async function loadOrders() {
    try {
      const qs = new URLSearchParams({
        status,
        search,
        page: String(page),
      });

      const res = await fetch(`${API_BASE}/admin/orders.php?${qs.toString()}`, {
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

  loadOrders();
}, [status, search, page]);

  

  const stats = data?.stats || {};
  const orders = data?.orders || [];
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
            <SidebarLink label="Order Management" to="/admin/orders" active />
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
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setPage(1);
                    setSearch(searchInput);
                  }}
                  className="flex h-11 min-w-[220px] flex-1 items-center rounded-full bg-[#d8f0cf] px-4 md:min-w-[320px]"
                >
                  <input
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search data, users, or reports"
                    className="w-full bg-transparent text-[12px] outline-none placeholder:text-[#6e7b6f]"
                  />
                  <button type="submit" className="text-[#4b6d53]">
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

          {/* Stats */}
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard title="Total Orders" value={stats.total_orders || 0} />
            <StatCard title="New Orders" value={stats.new_orders || 0} />
            <StatCard title="Completed Orders" value={stats.completed_orders || 0} />
            <StatCard title="Canceled Orders" value={stats.canceled_orders || 0} />
          </div>

          {/* Table area */}
          <div className="mt-4 rounded-2xl bg-white p-4 shadow-soft2">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex flex-wrap gap-2">
                <FilterTab active={status === "all"} onClick={() => { setStatus("all"); setPage(1); }}>
                  All order
                </FilterTab>
                <FilterTab active={status === "completed" || status === "delivered"} onClick={() => { setStatus("delivered"); setPage(1); }}>
                  Completed
                </FilterTab>
                <FilterTab active={status === "pending"} onClick={() => { setStatus("pending"); setPage(1); }}>
                  Pending
                </FilterTab>
                <FilterTab active={status === "cancelled"} onClick={() => { setStatus("cancelled"); setPage(1); }}>
                  Canceled
                </FilterTab>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-10 items-center rounded-xl border border-[#ede5db] bg-[#faf7f2] px-3">
                  <input
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search order report"
                    className="w-[180px] bg-transparent text-[12px] outline-none placeholder:text-[#8f8880]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPage(1);
                      setSearch(searchInput);
                    }}
                    className="text-[#78726c]"
                  >
                    ⌕
                  </button>
                </div>

                <button className="rounded-xl border border-[#ede5db] bg-[#faf7f2] px-3 py-2 text-[12px]">
                  ⌄
                </button>
                <button className="rounded-xl border border-[#ede5db] bg-[#faf7f2] px-3 py-2 text-[12px]">
                  ↓
                </button>
                <button className="rounded-xl border border-[#ede5db] bg-[#faf7f2] px-3 py-2 text-[12px]">
                  ⋯
                </button>
              </div>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[920px] text-left">
                <thead>
                  <tr className="bg-[#d8eacb] text-[11px] text-[#395246]">
                    <th className="rounded-l-xl px-4 py-4 font-semibold">No.</th>
                    <th className="px-4 py-4 font-semibold">Order Id</th>
                    <th className="px-4 py-4 font-semibold">Product</th>
                    <th className="px-4 py-4 font-semibold">Date</th>
                    <th className="px-4 py-4 font-semibold">Price</th>
                    <th className="px-4 py-4 font-semibold">Email</th>
                    <th className="rounded-r-xl px-4 py-4 font-semibold">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order, idx) => (
                    <tr key={order.id} className="border-b border-[#f0ebe4] text-[12px]">
                      <td className="px-4 py-4 text-ink">{idx + 1 + ((pagination.page - 1) * 10)}</td>
                      <td className="px-4 py-4 text-ink">{order.order_number}</td>
                      <td className="px-4 py-4 font-medium text-ink">{order.product_name}</td>
                      <td className="px-4 py-4 text-ink">{formatDate(order.date)}</td>
                      <td className="px-4 py-4 text-ink">${order.price}</td>
                      <td className="px-4 py-4 text-ink">{order.email || "—"}</td>
                      <td className={`px-4 py-4 font-semibold ${statusClass(order.status)}`}>
                        {order.status}
                      </td>
                    </tr>
                  ))}

                  {orders.length === 0 && (
                    <tr>
                      <td colSpan="7" className="px-4 py-10 text-center text-[12px] text-muted">
                        No orders found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
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
                          ? "bg-[#d8c99b] text-ink"
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