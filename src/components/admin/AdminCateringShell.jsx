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
          <div className="mt-1 text-[11px] text-muted">Current snapshot</div>
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
  if (s === "confirmed") return "text-[#2f9f45]";
  if (s === "pending") return "text-[#d08d19]";
  if (s === "completed") return "text-[#2a7c98]";
  if (s === "cancelled") return "text-[#d44343]";
  return "text-[#666]";
}

function statusBadgeClass(status) {
  const s = status.toLowerCase();
  if (s === "confirmed") return "bg-green-50 text-green-700";
  if (s === "pending") return "bg-amber-50 text-amber-700";
  if (s === "completed") return "bg-sky-50 text-sky-700";
  if (s === "cancelled") return "bg-red-50 text-red-700";
  return "bg-gray-50 text-gray-700";
}

function formatDate(dateString) {
  if (!dateString) return "—";
  const d = new Date(dateString);
  return d.toLocaleDateString("en-GB");
}

export default function AdminCateringShell() {
  const { logout } = useAuth();
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [updatingId, setUpdatingId] = useState(null);

  async function loadRequests() {
    try {
      const qs = new URLSearchParams({
        status,
        search,
        page: String(page),
      });

      const res = await fetch(`${API_BASE}/admin/catering.php?${qs.toString()}`, {
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

  useEffect(() => {
    loadRequests();
  }, [status, search, page]);

  async function updateStatus(requestId, nextStatus) {
    try {
      setUpdatingId(requestId);

      const res = await fetch(`${API_BASE}/admin/catering-update-status.php`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          request_id: requestId,
          status: nextStatus,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.message || "Failed to update request status.");
      }

      await loadRequests();
    } catch (err) {
      alert(err.message || "Something went wrong.");
    } finally {
      setUpdatingId(null);
    }
  }

  const stats = data?.stats || {};
  const requests = data?.requests || [];
  const featured = data?.featured_request;
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
            <SidebarLink label="Customers" to="/admin/customers" />
            <SidebarLink label="Custom Catering" to="/admin/catering" active />
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
                Custom Catering
              </div>

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
                    placeholder="Search name, email, or requests"
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

          {/* Stats */}
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard title="Total Requests" value={stats.total_requests || 0} />
            <StatCard title="Pending Requests" value={stats.pending_requests || 0} />
            <StatCard title="Confirmed Requests" value={stats.confirmed_requests || 0} />
            <StatCard title="Completed Requests" value={stats.completed_requests || 0} />
          </div>

          {/* Table and details */}
          <div className="mt-4 grid gap-4 xl:grid-cols-[1.35fr_.75fr]">
            <div className="rounded-2xl bg-white p-4 shadow-soft2">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex flex-wrap gap-2">
                  <FilterTab active={status === "all"} onClick={() => { setStatus("all"); setPage(1); }}>
                    All Requests
                  </FilterTab>
                  <FilterTab active={status === "pending"} onClick={() => { setStatus("pending"); setPage(1); }}>
                    Pending
                  </FilterTab>
                  <FilterTab active={status === "confirmed"} onClick={() => { setStatus("confirmed"); setPage(1); }}>
                    Confirmed
                  </FilterTab>
                  <FilterTab active={status === "completed"} onClick={() => { setStatus("completed"); setPage(1); }}>
                    Completed
                  </FilterTab>
                  <FilterTab active={status === "cancelled"} onClick={() => { setStatus("cancelled"); setPage(1); }}>
                    Cancelled
                  </FilterTab>
                </div>

                <div className="text-[12px] text-muted">
                  Catering Requests
                </div>
              </div>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[920px] text-left">
                  <thead>
                    <tr className="bg-[#d8eacb] text-[11px] text-[#395246]">
                      <th className="rounded-l-xl px-4 py-4 font-semibold">Name</th>
                      <th className="px-4 py-4 font-semibold">Email</th>
                      <th className="px-4 py-4 font-semibold">Phone</th>
                      <th className="px-4 py-4 font-semibold">Guests</th>
                      <th className="px-4 py-4 font-semibold">Date</th>
                      <th className="px-4 py-4 font-semibold">Time</th>
                      <th className="px-4 py-4 font-semibold">Status</th>
                      <th className="rounded-r-xl px-4 py-4 font-semibold">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {requests.map((req) => (
                      <tr key={req.id} className="border-b border-[#f0ebe4] text-[12px]">
                        <td className="px-4 py-4 font-medium text-ink">{req.full_name}</td>
                        <td className="px-4 py-4 text-ink">{req.email}</td>
                        <td className="px-4 py-4 text-ink">{req.phone || "—"}</td>
                        <td className="px-4 py-4 text-ink">{req.guests}</td>
                        <td className="px-4 py-4 text-ink">{req.reservation_date}</td>
                        <td className="px-4 py-4 text-ink">{req.reservation_time}</td>
                        <td className={`px-4 py-4 font-semibold ${statusClass(req.status)}`}>
                          {req.status}
                        </td>
                        <td className="px-4 py-4">
                          <select
                            value={req.status.toLowerCase()}
                            disabled={updatingId === req.id}
                            onChange={(e) => updateStatus(req.id, e.target.value)}
                            className="rounded-lg border border-[#eadfd2] bg-[#faf7f2] px-3 py-2 text-[11px] outline-none"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}

                    {requests.length === 0 && (
                      <tr>
                        <td colSpan="8" className="px-4 py-10 text-center text-[12px] text-muted">
                          No catering requests found.
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
                  <div className="text-[16px] font-semibold text-ink">
                    Featured Request
                  </div>

                  <div className="mt-4 rounded-2xl border border-[#ede5db] bg-[#faf7f2] p-4">
                    <div className="text-[18px] font-semibold text-ink">
                      {featured.full_name}
                    </div>
                    <div className="mt-1 text-[12px] text-muted">
                      {featured.email}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className={["rounded-full px-2.5 py-1 text-[10px] font-semibold", statusBadgeClass(featured.status)].join(" ")}>
                        {featured.status}
                      </span>
                      <span className="rounded-full bg-[#eef3e8] px-2.5 py-1 text-[10px] font-semibold text-[#56734f]">
                        {featured.guests} Guests
                      </span>
                    </div>

                    <div className="mt-5 space-y-3 text-[12px] text-muted">
                      <div>📞 {featured.phone || "—"}</div>
                      <div>📅 {featured.reservation_date}</div>
                      <div>⏰ {featured.reservation_time}</div>
                      <div>📝 Submitted {formatDate(featured.created_at)}</div>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-[#ede5db] bg-[#faf7f2] p-4">
                    <div className="text-[13px] font-semibold text-ink">
                      Special Request
                    </div>
                    <p className="mt-3 text-[12px] leading-relaxed text-muted">
                      {featured.special_request || "No special request provided."}
                    </p>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => updateStatus(featured.id, "confirmed")}
                      className="rounded-xl bg-[#9acb74] px-4 py-3 text-[11px] font-semibold text-white"
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      onClick={() => updateStatus(featured.id, "cancelled")}
                      className="rounded-xl bg-[#f08e8e] px-4 py-3 text-[11px] font-semibold text-white"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-[12px] text-muted">No catering request selected.</div>
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