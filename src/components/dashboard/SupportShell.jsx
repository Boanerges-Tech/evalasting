import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

const API_BASE = "https://evaalasting.othniel-phantasy.com.ng/api";

function SidebarItem({ label, sublabel, active = false, to = "#", onClick }) {
  const base = "flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition";

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
        <span className={["block text-[12px] font-semibold", active ? "text-white" : "text-white/85"].join(" ")}>
          {label}
        </span>
        {sublabel ? (
          <span className="mt-0.5 block text-[10px] text-white/45">{sublabel}</span>
        ) : null}
      </span>
    </>
  );

  if (to && to !== "#") {
    return (
      <Link
        to={to}
        onClick={onClick}
        className={[base, active ? "bg-white/10" : "hover:bg-white/5"].join(" ")}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={[base, active ? "bg-white/10" : "hover:bg-white/5"].join(" ")}
    >
      {content}
    </button>
  );
}

function SidebarContent({ user, logout, onItemClick }) {
  return (
    <>
      <div className="text-[10px] uppercase tracking-[0.18em] text-white/45">Account Hub</div>

      <div className="mt-4 text-[24px] font-semibold text-white">Evaalasting Arm</div>

      <div className="mt-5 flex items-center gap-3 rounded-2xl bg-white/5 p-3">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-brand-600 text-[11px] font-extrabold text-white">
          {user?.initials || "SA"}
        </div>
        <div>
          <div className="text-[12px] font-semibold text-white">
            {user?.name || "Samuel Adebayo"}
          </div>
          <div className="text-[10px] text-white/45">
            {user?.email || "Family Care Plan"}
          </div>
        </div>
      </div>

      <div className="mt-8 text-[10px] uppercase tracking-[0.18em] text-white/35">Menu</div>

      <div className="mt-3 space-y-1.5">
        <SidebarItem label="My Orders" sublabel="Order history" to="/orders" onClick={onItemClick} />
        <SidebarItem label="Addresses" sublabel="Delivery addresses" to="/addresses" onClick={onItemClick} />
        <SidebarItem label="Payment Methods" sublabel="Cards & billing" to="/payment-methods" onClick={onItemClick} />
        <SidebarItem label="Account Settings" sublabel="Profile & security" to="/account-settings" onClick={onItemClick} />
        <SidebarItem label="Support" sublabel="Get help" to="/support" active onClick={onItemClick} />
      </div>

      <div className="mt-8 border-t border-white/10 pt-5">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left hover:bg-white/5"
        >
          <span className="grid h-7 w-7 place-items-center rounded-md bg-white/10 text-[10px] text-white/85">↩</span>
          <span className="text-[12px] font-semibold text-white/85">Sign Out</span>
        </button>
      </div>
    </>
  );
}

function Input(props) {
  return (
    <input
      {...props}
      className="h-11 w-full rounded-xl border border-[#ece7df] bg-[#faf7f2] px-4 text-[12px] text-ink outline-none placeholder:text-muted focus:border-brand-600/40"
    />
  );
}

function Select(props) {
  return (
    <select
      {...props}
      className="h-11 w-full rounded-xl border border-[#ece7df] bg-[#faf7f2] px-4 text-[12px] text-ink outline-none focus:border-brand-600/40"
    >
      {props.children}
    </select>
  );
}

function Textarea(props) {
  return (
    <textarea
      {...props}
      className="w-full rounded-xl border border-[#ece7df] bg-[#faf7f2] px-4 py-3 text-[12px] text-ink outline-none placeholder:text-muted focus:border-brand-600/40"
    />
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

function TicketRow({ ticket }) {
  const statusClass =
    ticket.status === "Resolved"
      ? "bg-green-50 text-green-700"
      : ticket.status === "In progress"
      ? "bg-amber-50 text-amber-700"
      : "bg-blue-50 text-blue-700";

  return (
    <div className="rounded-2xl border border-[#ece7df] bg-white px-4 py-4 shadow-soft2">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[13px] font-extrabold text-ink">{ticket.subject}</span>
            <span className={["rounded-full px-2 py-0.5 text-[10px] font-semibold", statusClass].join(" ")}>
              {ticket.status}
            </span>
          </div>

          <div className="mt-1 text-[11px] text-muted">
            {ticket.category} • {formatDate(ticket.created_at)}
          </div>

          <p className="mt-3 text-[12px] leading-relaxed text-muted">
            {ticket.message}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SupportShell() {
  const { logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [overviewUser, setOverviewUser] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    subject: "",
    category: "Order Issue",
    message: "",
  });

  async function loadOverview() {
    try {
      const res = await fetch(`${API_BASE}/dashboard/overview.php`, {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setOverviewUser(data.user);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function loadTickets() {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/dashboard/support.php`, {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setTickets(data.tickets || []);
      } else {
        setTickets([]);
      }
    } catch (err) {
      console.error(err);
      setTickets([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOverview();
    loadTickets();
  }, []);

  function updateField(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setMsg("");
    setError("");

    try {
      const res = await fetch(`${API_BASE}/dashboard/support-create.php`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.message || "Failed to submit ticket.");
      }

      setMsg(data.message || "Support ticket submitted.");
      setForm({
        subject: "",
        category: "Order Issue",
        message: "",
      });
      loadTickets();
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  const initials = overviewUser?.initials || "SA";
  const fullName = overviewUser?.name || "Samuel Adebayo";

  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
      <div className="grid gap-0 lg:grid-cols-[280px_1fr]">
        <div className="mb-4 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="flex w-full items-center justify-between rounded-2xl bg-[#024f4a] px-4 py-3 text-left text-white shadow-soft"
          >
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/45">Account Hub</div>
              <div className="mt-1 text-[13px] font-extrabold">{fullName}</div>
            </div>
            <span className="text-lg">{mobileMenuOpen ? "−" : "+"}</span>
          </button>

          {mobileMenuOpen && (
            <div className="mt-3 rounded-3xl bg-[#024f4a] px-5 py-6 text-white shadow-soft">
              <SidebarContent
                user={overviewUser}
                logout={logout}
                onItemClick={() => setMobileMenuOpen(false)}
              />
            </div>
          )}
        </div>

        <aside className="hidden rounded-l-3xl bg-[#024f4a] px-5 py-6 text-white lg:block">
          <SidebarContent user={overviewUser} logout={logout} />
        </aside>

        <section className="rounded-3xl bg-[#f7f4ee] px-4 py-5 sm:px-6 sm:py-6 lg:rounded-l-none lg:rounded-r-3xl lg:px-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted">Account Hub</div>
              <div className="mt-1 text-[14px] font-semibold text-ink">Support</div>
            </div>

            <div className="flex items-center gap-3">
              <button className="rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-ink shadow-soft2">🔔</button>
              <button className="rounded-full bg-[#024f4a] px-3 py-1.5 text-[11px] font-semibold text-white">
                {initials}
              </button>
            </div>
          </div>

          <div className="mt-8">
            <h1 className="font-display text-[34px] leading-[1.05] text-ink">Support</h1>
            <p className="mt-2 text-[12px] text-muted">
              Need help? Reach out and we’ll get back to you.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-[#ece7df] bg-white p-4 shadow-soft2">
              <div className="text-[12px] font-extrabold text-ink">Email us</div>
              <div className="mt-2 text-[12px] text-muted">testing@gmail.com</div>
            </div>

            <div className="rounded-2xl border border-[#ece7df] bg-white p-4 shadow-soft2">
              <div className="text-[12px] font-extrabold text-ink">Call support</div>
              <div className="mt-2 text-[12px] text-muted">+123 456 789</div>
            </div>

            <div className="rounded-2xl border border-[#ece7df] bg-white p-4 shadow-soft2">
              <div className="text-[12px] font-extrabold text-ink">Support hours</div>
              <div className="mt-2 text-[12px] text-muted">Mon - Sat • 8AM - 8PM</div>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-[#ece7df] bg-white p-5 shadow-soft2">
            <div className="text-[16px] font-semibold text-ink">Open a support ticket</div>

            <form className="mt-5 grid gap-4" onSubmit={handleSubmit}>
              <Input
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={updateField}
                required
              />

              <Select
                name="category"
                value={form.category}
                onChange={updateField}
              >
                <option>Order Issue</option>
                <option>Payment Issue</option>
                <option>Reservation Help</option>
                <option>Account Problem</option>
                <option>General Inquiry</option>
              </Select>

              <Textarea
                name="message"
                rows="6"
                placeholder="Describe your issue..."
                value={form.message}
                onChange={updateField}
                required
              />

              {error ? (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[12px] text-red-700">
                  {error}
                </div>
              ) : null}

              {msg ? (
                <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-[12px] text-green-700">
                  {msg}
                </div>
              ) : null}

              <div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-full bg-[#0e5e56] px-5 py-2.5 text-[12px] font-semibold text-white hover:bg-[#0b4c46] disabled:opacity-70"
                >
                  {submitting ? "Submitting..." : "Submit ticket"}
                </button>
              </div>
            </form>
          </div>

          <div className="mt-6">
            <div className="text-[14px] font-semibold text-ink">Recent requests</div>

            <div className="mt-4 space-y-4">
              {loading ? (
                <div className="text-[12px] text-muted">Loading support requests...</div>
              ) : tickets.length === 0 ? (
                <div className="rounded-2xl border border-[#ece7df] bg-white px-4 py-6 text-[12px] text-muted">
                  No support tickets yet.
                </div>
              ) : (
                tickets.map((ticket) => <TicketRow key={ticket.id} ticket={ticket} />)
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}