import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
      <div className="text-[12px] font-semibold text-ink">{title}</div>
      <div className="mt-3 text-[32px] font-extrabold text-[#0b4f49]">
        {value}
      </div>
    </div>
  );
}

export default function AdminSalesReportShell() {
  const [data, setData] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const res = await fetch(`${API_BASE}/admin/sales-report.php`, {
          credentials: "include",
        });

        const json = await res.json();

        if (mounted && json.ok) {
          setData(json);
        }
      } catch (err) {
        console.error(err);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  if (!data)
    return <div className="text-white p-10">Loading report...</div>;

  const stats = data.stats || {};

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
            <SidebarLink label="Custom Catering" to="/admin/catering" />
            <SidebarLink label="Sales Report" to="/admin/reports" active />
            <SidebarLink label="Invoice" to="/admin/invoices" />
            <SidebarLink label="Add Products" to="/admin/add-product" />
            <SidebarLink label="Products" to="/admin/products" />
            <SidebarLink label="Settings" to="/admin/settings" />
          </div>
        </aside>

        {/* Main */}
        <section className="rounded-[24px] bg-[#f6e9df] p-4 shadow-soft2">

          {/* Top bar */}
          <div className="rounded-2xl bg-white px-4 py-3 shadow-soft2 flex justify-between items-center">
            <div className="text-[18px] font-semibold text-ink">
              Sales Report
            </div>

            <input
              type="date"
              className="rounded-xl border border-[#ede5db] bg-[#faf7f2] px-3 py-2 text-[12px]"
            />
          </div>

          {/* Stats */}
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total Revenue"
              value={`$${stats.total_revenue ?? 0}`}
            />

            <StatCard
              title="Total Orders"
              value={stats.total_orders ?? 0}
            />

            <StatCard
              title="Average Order"
              value={`$${Number(stats.avg_order ?? 0).toFixed(2)}`}
            />

            <StatCard
              title="Cancelled Orders"
              value={stats.cancelled ?? 0}
            />
          </div>

          {/* Chart */}
          <div className="mt-4 rounded-2xl bg-white p-4 shadow-soft2">
            <div className="text-[16px] font-semibold text-ink mb-4">
              Last 7 Days Revenue
            </div>

            <div className="h-64 flex items-end gap-4">
              {data.chart.map((c, i) => (
                <div key={i} className="flex flex-col items-center">

                  <div
                    className="bg-[#7a114e] w-10 rounded-t"
                    style={{
                      height: `${Math.min(c.revenue / 10, 200)}px`,
                    }}
                  />

                  <div className="text-[11px] mt-2 text-muted">
                    {c.day}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Orders Table */}
          <div className="mt-4 rounded-2xl bg-white p-4 shadow-soft2">
            <div className="text-[16px] font-semibold text-ink mb-4">
              Recent Orders
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left">

                <thead>
                  <tr className="bg-[#d8eacb] text-[11px] text-[#395246]">
                    <th className="px-4 py-3 font-semibold">Order ID</th>
                    <th className="px-4 py-3 font-semibold">Customer</th>
                    <th className="px-4 py-3 font-semibold">Email</th>
                    <th className="px-4 py-3 font-semibold">Amount</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">Date</th>
                  </tr>
                </thead>

                <tbody>
                  {data.orders.map((o) => (
                    <tr
                      key={o.id}
                      className="border-b border-[#f0ebe4] text-[12px]"
                    >
                      <td className="px-4 py-3">{o.order_number}</td>
                      <td className="px-4 py-3">
                        {o.first_name} {o.last_name}
                      </td>
                      <td className="px-4 py-3">{o.email}</td>
                      <td className="px-4 py-3">${o.total_amount}</td>
                      <td className="px-4 py-3">{o.status}</td>
                      <td className="px-4 py-3">{o.created_at}</td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>

        </section>
      </div>
    </div>
  );
}