import { useEffect, useState } from "react";
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
          <div className="text-[10px] text-white/45">Family Care Plan</div>
        </div>
      </div>

      <div className="mt-8 text-[10px] uppercase tracking-[0.18em] text-white/35">
        Menu
      </div>

      <div className="mt-3 space-y-1.5">
        <SidebarItem label="Overview" sublabel="Your dashboard" to="/dashboard" onClick={onItemClick} />
        <SidebarItem label="My Orders" sublabel="Order history" to="/orders" onClick={onItemClick} />
        <SidebarItem label="Addresses" sublabel="Delivery addresses" to="/addresses" active onClick={onItemClick} />
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

function AddressCard({ address, onSetDefault, onDelete }) {
  return (
    <div className="rounded-2xl border border-[#ece7df] bg-white px-4 py-4 shadow-soft2">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#0e5e56] text-[11px] text-white">
            ⦿
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[13px] font-extrabold text-ink">{address.label}</span>
              {address.is_default ? (
                <span className="rounded-full bg-[#0e5e56] px-2 py-0.5 text-[10px] font-semibold text-white">
                  Default
                </span>
              ) : null}
            </div>

            <div className="mt-2 text-[11px] leading-relaxed text-muted">
              <div>{address.address_line1}</div>
              {address.address_line2 ? <div>{address.address_line2}</div> : null}
              <div>
                {address.city}
                {address.state ? `, ${address.state}` : ""} {address.postal_code}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!address.is_default ? (
            <button
              type="button"
              onClick={() => onSetDefault(address.id)}
              className="rounded-full bg-[#f3efe8] px-2.5 py-2 text-[10px] text-ink hover:bg-[#ece6dd]"
              title="Set default"
            >
              ✎
            </button>
          ) : (
            <button
              type="button"
              className="rounded-full bg-[#f3efe8] px-2.5 py-2 text-[10px] text-ink"
              title="Edit"
            >
              ✎
            </button>
          )}

          {!address.is_default ? (
            <button
              type="button"
              onClick={() => onDelete(address.id)}
              className="rounded-full bg-[#f3efe8] px-2.5 py-2 text-[10px] text-ink hover:bg-[#ece6dd]"
              title="Delete"
            >
              🗑
            </button>
          ) : null}
        </div>
      </div>

      {!address.is_default ? (
        <button
          type="button"
          onClick={() => onSetDefault(address.id)}
          className="mt-4 text-[11px] font-semibold text-[#0e5e56] hover:underline"
        >
          Set as default delivery address
        </button>
      ) : null}
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

export default function AddressesShell() {
  const { logout } = useAuth();
  const [overview, setOverview] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    label: "",
    address_line1: "",
    address_line2: "",
    city: "",
    postal_code: "",
    state: "",
    country: "Nigeria",
  });

  async function loadOverview() {
    try {
      const res = await fetch(`${API_BASE}/dashboard/overview.php`, {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok && data.ok) setOverview(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function loadAddresses() {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/dashboard/addresses.php`, {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setAddresses(data.addresses || []);
      } else {
        setAddresses([]);
      }
    } catch (err) {
      console.error(err);
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOverview();
    loadAddresses();
  }, []);

  function updateField(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleCreate(e) {
    e.preventDefault();
    setSubmitting(true);
    setMsg("");
    setError("");

    try {
      const res = await fetch(`${API_BASE}/dashboard/address-create.php`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.message || "Failed to save address.");
      }

      setMsg(data.message || "Address saved.");
      setForm({
        label: "",
        address_line1: "",
        address_line2: "",
        city: "",
        postal_code: "",
        state: "",
        country: "Nigeria",
      });
      loadAddresses();
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  async function setDefault(addressId) {
    try {
      const res = await fetch(`${API_BASE}/dashboard/address-set-default.php`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address_id: addressId }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.message || "Failed to update default address.");
      }

      loadAddresses();
    } catch (err) {
      alert(err.message || "Failed to update default address.");
    }
  }

  async function deleteAddress(addressId) {
    try {
      const res = await fetch(`${API_BASE}/dashboard/address-delete.php`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address_id: addressId }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.message || "Failed to delete address.");
      }

      loadAddresses();
    } catch (err) {
      alert(err.message || "Failed to delete address.");
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
                Addresses
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
                Addresses
              </h1>
              <p className="mt-2 text-[12px] text-muted">
                Manage your delivery locations
              </p>
            </div>

            <button className="rounded-full bg-[#0e5e56] px-5 py-2.5 text-[12px] font-semibold text-white hover:bg-[#0b4c46]">
              + Add address
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {loading ? (
              <div className="text-[12px] text-muted">Loading addresses...</div>
            ) : addresses.length === 0 ? (
              <div className="rounded-2xl border border-[#ece7df] bg-white px-4 py-6 text-[12px] text-muted">
                No saved addresses yet.
              </div>
            ) : (
              addresses.map((address) => (
                <AddressCard
                  key={address.id}
                  address={address}
                  onSetDefault={setDefault}
                  onDelete={deleteAddress}
                />
              ))
            )}
          </div>

          <div className="mt-6 rounded-3xl border border-[#ece7df] bg-white p-5 shadow-soft2">
            <div className="text-[16px] font-semibold text-ink">Add new address</div>

            <form className="mt-5 grid gap-4" onSubmit={handleCreate}>
              <FormField label="Label (e.g. Home, Mum's Place)">
                <Input
                  name="label"
                  placeholder="Address label"
                  value={form.label}
                  onChange={updateField}
                  required
                />
              </FormField>

              <FormField label="Address line 1" required>
                <Input
                  name="address_line1"
                  placeholder="Street address"
                  value={form.address_line1}
                  onChange={updateField}
                  required
                />
              </FormField>

              <FormField label="Address line 2">
                <Input
                  name="address_line2"
                  placeholder="Apartment, suite, etc. (optional)"
                  value={form.address_line2}
                  onChange={updateField}
                />
              </FormField>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="City" required>
                  <Input
                    name="city"
                    placeholder="City"
                    value={form.city}
                    onChange={updateField}
                    required
                  />
                </FormField>

                <FormField label="Postcode" required>
                  <Input
                    name="postal_code"
                    placeholder="Postcode"
                    value={form.postal_code}
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
                  {submitting ? "Saving..." : "✓ Save address"}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setForm({
                      label: "",
                      address_line1: "",
                      address_line2: "",
                      city: "",
                      postal_code: "",
                      state: "",
                      country: "Nigeria",
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