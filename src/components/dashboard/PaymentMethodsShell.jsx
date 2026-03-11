import { useEffect, useRef, useState } from "react";
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
        <span
          className={[
            "block text-[12px] font-semibold",
            active ? "text-white" : "text-white/85",
          ].join(" ")}
        >
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
            {user?.email || "Family Care Plan"}
          </div>
        </div>
      </div>

      <div className="mt-8 text-[10px] uppercase tracking-[0.18em] text-white/35">
        Menu
      </div>

      <div className="mt-3 space-y-1.5">
        <SidebarItem label="Overview" sublabel="Your dashboard" to="/dashboard" onClick={onItemClick} />
        <SidebarItem label="My Orders" sublabel="Order history" to="/orders" onClick={onItemClick} />
        <SidebarItem label="Addresses" sublabel="Delivery addresses" to="/addresses" onClick={onItemClick} />
        <SidebarItem label="Payment Methods" sublabel="Cards & billing" to="/payment-methods" active onClick={onItemClick} />
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

function CardPreview({ item, onSetDefault, onDelete }) {
  const isMastercard = String(item.brand).toUpperCase().includes("MASTER");
  const bg = isMastercard
    ? "bg-[linear-gradient(135deg,#1d2252_0%,#2a2f66_55%,#3b3f73_100%)]"
    : "bg-[linear-gradient(135deg,#0e5e56_0%,#174d46_55%,#23675f_100%)]";

  return (
    <div>
      <div className={`relative overflow-hidden rounded-3xl p-5 text-white shadow-soft ${bg}`}>
        <div className="absolute right-4 top-4 h-16 w-16 rounded-full bg-white/8" />
        <div className="flex items-center justify-between">
          <div className="h-4 w-6 rounded-sm bg-[#f0c433]" />
          <div className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/90">
            {item.brand}
          </div>
        </div>

        <div className="mt-10 text-[18px] tracking-[0.25em]">
          **** **** **** {item.last4}
        </div>

        <div className="mt-6 flex items-end justify-between gap-4">
          <div>
            <div className="text-[9px] uppercase tracking-[0.18em] text-white/60">
              Card Holder
            </div>
            <div className="mt-1 text-[12px] font-semibold text-white">
              {item.cardholder_name}
            </div>
          </div>

          <div className="text-right">
            <div className="text-[9px] uppercase tracking-[0.18em] text-white/60">
              Expires
            </div>
            <div className="mt-1 text-[16px] font-extrabold">
              {item.expiry_month}/{String(item.expiry_year).slice(-2)}
            </div>
          </div>
        </div>

        {item.is_default ? (
          <div className="absolute right-4 top-4 translate-y-6 rounded-full bg-brand-600 px-2 py-1 text-[9px] font-bold">
            ● Default
          </div>
        ) : null}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-4 text-[11px]">
        {item.is_default ? (
          <span className="font-semibold text-[#0e5e56]">✓ Default payment</span>
        ) : (
          <button
            type="button"
            onClick={() => onSetDefault(item.id)}
            className="font-semibold text-[#0e5e56] hover:underline"
          >
            Set as default
          </button>
        )}

        <button
          type="button"
          onClick={() => onDelete(item.id)}
          className="text-muted hover:text-ink"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

function FormField({ label, required = false, children }) {
  return (
    <div>
      <label className="mb-2 block text-[11px] font-semibold text-muted">
        {label} {required ? "*" : ""}
      </label>
      {children}
    </div>
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

export default function PaymentMethodsShell() {
  const { logout } = useAuth();
  const [overview, setOverview] = useState(null);
  const [methods, setMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const addCardFormRef = useRef(null);
  

  const [form, setForm] = useState({
    card_number: "",
    cardholder_name: "",
    expiry_month: "",
    expiry_year: "",
    cvv: "",
  });

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

  async function loadMethods() {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/dashboard/payment-methods.php`, {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setMethods(data.payment_methods || []);
      } else {
        setMethods([]);
      }
    } catch (err) {
      console.error(err);
      setMethods([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOverview();
    loadMethods();
  }, []);

  useEffect(() => {
    if (overview?.user?.name && !form.cardholder_name) {
      setForm((prev) => ({
        ...prev,
        cardholder_name: overview.user.name,
      }));
    }
  }, [overview]); // real DB-backed user name

  function updateField(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleCreate(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setMsg("");

    try {
      const res = await fetch(`${API_BASE}/dashboard/payment-method-create.php`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.message || "Failed to add card.");
      }

      setMsg(data.message || "Card added successfully.");
      setForm({
        card_number: "",
        cardholder_name: overview?.user?.name || "",
        expiry_month: "",
        expiry_year: "",
        cvv: "",
      });
      loadMethods();
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  async function setDefault(id) {
    try {
      const res = await fetch(`${API_BASE}/dashboard/payment-method-set-default.php`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ payment_method_id: id }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.message || "Failed to update default card.");
      }
      loadMethods();
    } catch (err) {
      alert(err.message || "Failed to update default card.");
    }
  }

  async function deleteMethod(id) {
    try {
      const res = await fetch(`${API_BASE}/dashboard/payment-method-delete.php`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ payment_method_id: id }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.message || "Failed to remove card.");
      }
      loadMethods();
    } catch (err) {
      alert(err.message || "Failed to remove card.");
    }
  }

  const user = overview?.user;

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

        <aside className="hidden rounded-l-3xl bg-[#024f4a] px-5 py-6 text-white lg:block">
          <SidebarContent user={user} logout={logout} />
        </aside>

        <section className="rounded-3xl bg-[#f7f4ee] px-4 py-5 sm:px-6 sm:py-6 lg:rounded-l-none lg:rounded-r-3xl lg:px-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted">
                Account Hub
              </div>
              <div className="mt-1 text-[14px] font-semibold text-ink">
                Payment Methods
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

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="font-display text-[34px] leading-[1.05] text-ink">
                Payment Methods
              </h1>
              <p className="mt-2 text-[12px] text-muted">
                Manage your saved cards
              </p>
            </div>

            <button
  type="button"
  onClick={() => {
    addCardFormRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }}
  className="rounded-full bg-[#0e5e56] px-5 py-2.5 text-[12px] font-semibold text-white hover:bg-[#0b4c46]"
>
  + Add card
</button>
          </div>

          <div className="mt-6">
            {loading ? (
              <div className="text-[12px] text-muted">Loading cards...</div>
            ) : methods.length === 0 ? (
              <div className="rounded-2xl border border-[#ece7df] bg-white px-4 py-6 text-[12px] text-muted">
                No saved cards yet.
              </div>
            ) : (
              <div className="grid gap-5 lg:grid-cols-2">
                {methods.map((item) => (
                  <CardPreview
                    key={item.id}
                    item={item}
                    onSetDefault={setDefault}
                    onDelete={deleteMethod}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 text-[11px] text-muted">
            🔒 Your card details are encrypted and stored securely. We never store your full card number.
          </div>

          <div
  ref={addCardFormRef}
  className="mt-6 rounded-3xl border border-[#ece7df] bg-white p-5 shadow-soft2"
>
            <div className="text-[16px] font-semibold text-ink">Add new card</div>

            <form className="mt-5 grid gap-4" onSubmit={handleCreate}>
              <FormField label="Card number" required>
                <Input
                  name="card_number"
                  placeholder="1234 5678 9012 3456"
                  value={form.card_number}
                  onChange={updateField}
                  required
                />
              </FormField>

              <FormField label="Cardholder name" required>
                <Input
                  name="cardholder_name"
                  placeholder="Name on card"
                  value={form.cardholder_name}
                  onChange={updateField}
                  required
                />
              </FormField>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Expiry date" required>
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      name="expiry_month"
                      placeholder="MM"
                      value={form.expiry_month}
                      onChange={updateField}
                      required
                    />
                    <Input
                      name="expiry_year"
                      placeholder="YY / YYYY"
                      value={form.expiry_year}
                      onChange={updateField}
                      required
                    />
                  </div>
                </FormField>

                <FormField label="CVV" required>
                  <Input
                    name="cvv"
                    placeholder="•••"
                    value={form.cvv}
                    onChange={updateField}
                    required
                  />
                </FormField>
              </div>

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

              <div className="flex flex-wrap gap-3 pt-1">
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-full bg-[#0e5e56] px-5 py-2.5 text-[12px] font-semibold text-white hover:bg-[#0b4c46] disabled:opacity-70"
                >
                  {submitting ? "Saving..." : "✓ Save card"}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setForm({
                      card_number: "",
                      cardholder_name: overview?.user?.name || "",
                      expiry_month: "",
                      expiry_year: "",
                      cvv: "",
                    })
                  }
                  className="rounded-full border border-[#d9d1c7] bg-[#faf7f2] px-5 py-2.5 text-[12px] font-semibold text-muted hover:bg-[#f4efe7]"
                >
                  × Cancel
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}