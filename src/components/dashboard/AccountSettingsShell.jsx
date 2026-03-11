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
      <Link to={to} onClick={onClick} className={[base, active ? "bg-white/10" : "hover:bg-white/5"].join(" ")}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={[base, active ? "bg-white/10" : "hover:bg-white/5"].join(" ")}>
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
          <div className="text-[12px] font-semibold text-white">{user?.name || "Samuel Adebayo"}</div>
          <div className="text-[10px] text-white/45">{user?.email || "Family Care Plan"}</div>
        </div>
      </div>

      <div className="mt-8 text-[10px] uppercase tracking-[0.18em] text-white/35">Menu</div>

      <div className="mt-3 space-y-1.5">
        <SidebarItem label="My Orders" sublabel="Order history" to="/orders" onClick={onItemClick} />
        <SidebarItem label="Addresses" sublabel="Delivery addresses" to="/addresses" onClick={onItemClick} />
        <SidebarItem label="Payment Methods" sublabel="Cards & billing" to="/payment-methods" onClick={onItemClick} />
        <SidebarItem label="Account Settings" sublabel="Profile & security" to="/account-settings" active onClick={onItemClick} />
        <SidebarItem label="Support" sublabel="Get help" to="/support" onClick={onItemClick} />
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

function PasswordInput(props) {
  return (
    <div className="relative">
      <input
        {...props}
        className="h-11 w-full rounded-xl border border-[#ece7df] bg-[#faf7f2] px-4 pr-10 text-[12px] text-ink outline-none placeholder:text-muted focus:border-brand-600/40"
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted">◉</span>
    </div>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={[
        "relative h-6 w-10 rounded-full transition",
        checked ? "bg-[#0e5e56]" : "bg-[#d9d4cc]",
      ].join(" ")}
    >
      <span
        className={[
          "absolute top-1 h-4 w-4 rounded-full bg-white transition",
          checked ? "left-5" : "left-1",
        ].join(" ")}
      />
    </button>
  );
}

export default function AccountSettingsShell() {
  const { logout, refreshUser } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [overviewUser, setOverviewUser] = useState(null);

  const [profileForm, setProfileForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [notifications, setNotifications] = useState({
    email_updates: true,
    sms_updates: false,
    delivery_alerts: true,
    promotions_offers: false,
  });

  const [profileMsg, setProfileMsg] = useState("");
  const [profileErr, setProfileErr] = useState("");

  const [passwordMsg, setPasswordMsg] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const [notifMsg, setNotifMsg] = useState("");
  const [notifErr, setNotifErr] = useState("");

  async function loadSettings() {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/dashboard/account-settings.php`, {
        credentials: "include",
      });
      const data = await res.json();

      if (res.ok && data.ok) {
        setOverviewUser(data.user);
        setProfileForm({
          first_name: data.user.first_name || "",
          last_name: data.user.last_name || "",
          email: data.user.email || "",
          phone: data.user.phone || "",
        });
        setNotifications(data.notifications);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSettings();
  }, []);

  function updateProfileField(e) {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  }

  function updatePasswordField(e) {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  }

  async function submitProfile(e) {
    e.preventDefault();
    setProfileMsg("");
    setProfileErr("");

    try {
      const res = await fetch(`${API_BASE}/dashboard/account-update-profile.php`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileForm),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.message || "Failed to update profile.");
      }

      setProfileMsg(data.message || "Profile updated.");
      await loadSettings();
      await refreshUser();
    } catch (err) {
      setProfileErr(err.message || "Something went wrong.");
    }
  }

  async function submitPassword(e) {
    e.preventDefault();
    setPasswordMsg("");
    setPasswordErr("");

    try {
      const res = await fetch(`${API_BASE}/dashboard/account-change-password.php`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(passwordForm),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.message || "Failed to update password.");
      }

      setPasswordMsg(data.message || "Password updated.");
      setPasswordForm({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });
    } catch (err) {
      setPasswordErr(err.message || "Something went wrong.");
    }
  }

  async function saveNotifications(next) {
    setNotifications(next);
    setNotifMsg("");
    setNotifErr("");

    try {
      const res = await fetch(`${API_BASE}/dashboard/account-update-notifications.php`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.message || "Failed to update notifications.");
      }

      setNotifMsg(data.message || "Notifications updated.");
    } catch (err) {
      setNotifErr(err.message || "Something went wrong.");
    }
  }

  function toggleNotif(key) {
    const next = { ...notifications, [key]: !notifications[key] };
    saveNotifications(next);
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
              <div className="mt-1 text-[14px] font-semibold text-ink">Account Settings</div>
            </div>

            <div className="flex items-center gap-3">
              <button className="rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-ink shadow-soft2">🔔</button>
              <button className="rounded-full bg-[#024f4a] px-3 py-1.5 text-[11px] font-semibold text-white">
                {initials}
              </button>
            </div>
          </div>

          <div className="mt-8">
            <h1 className="font-display text-[34px] leading-[1.05] text-ink">Account Settings</h1>
            <p className="mt-2 text-[12px] text-muted">Manage your personal details and preferences</p>
          </div>

          {loading ? (
            <div className="mt-6 text-[12px] text-muted">Loading settings...</div>
          ) : (
            <>
              {/* Personal info */}
              <div className="mt-6 rounded-3xl border border-[#ece7df] bg-white p-5 shadow-soft2">
                <div className="text-[14px] font-semibold text-ink">Personal Information</div>

                <div className="mt-5 flex flex-wrap items-center gap-4">
                  <div className="grid h-14 w-14 place-items-center rounded-full bg-[#0e5e56] text-[16px] font-extrabold text-white">
                    {initials}
                  </div>
                  <div>
                    <div className="text-[12px] font-semibold text-ink">Profile photo</div>
                    <div className="mt-1 text-[10px] text-muted">JPG, PNG, max 5MB</div>
                    <button className="mt-2 rounded-full border border-[#d9d1c7] bg-[#faf7f2] px-4 py-2 text-[11px] font-semibold text-muted">
                      Upload photo
                    </button>
                  </div>
                </div>

                <form className="mt-5 grid gap-4" onSubmit={submitProfile}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input name="first_name" placeholder="First name" value={profileForm.first_name} onChange={updateProfileField} />
                    <Input name="last_name" placeholder="Last name" value={profileForm.last_name} onChange={updateProfileField} />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input name="email" placeholder="Email address" value={profileForm.email} onChange={updateProfileField} />
                    <Input name="phone" placeholder="Phone number" value={profileForm.phone} onChange={updateProfileField} />
                  </div>

                  {profileErr ? (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[12px] text-red-700">
                      {profileErr}
                    </div>
                  ) : null}

                  {profileMsg ? (
                    <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-[12px] text-green-700">
                      {profileMsg}
                    </div>
                  ) : null}

                  <div>
                    <button
                      type="submit"
                      className="rounded-full bg-[#0e5e56] px-5 py-2.5 text-[12px] font-semibold text-white hover:bg-[#0b4c46]"
                    >
                      Save changes
                    </button>
                  </div>
                </form>
              </div>

              {/* Password */}
              <div className="mt-5 rounded-3xl border border-[#ece7df] bg-white p-5 shadow-soft2">
                <div className="text-[14px] font-semibold text-ink">Change Password</div>

                <form className="mt-5 grid gap-4" onSubmit={submitPassword}>
                  <PasswordInput
                    type="password"
                    name="current_password"
                    placeholder="Current password"
                    value={passwordForm.current_password}
                    onChange={updatePasswordField}
                  />
                  <PasswordInput
                    type="password"
                    name="new_password"
                    placeholder="New password"
                    value={passwordForm.new_password}
                    onChange={updatePasswordField}
                  />
                  <PasswordInput
                    type="password"
                    name="confirm_password"
                    placeholder="Confirm new password"
                    value={passwordForm.confirm_password}
                    onChange={updatePasswordField}
                  />

                  {passwordErr ? (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[12px] text-red-700">
                      {passwordErr}
                    </div>
                  ) : null}

                  {passwordMsg ? (
                    <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-[12px] text-green-700">
                      {passwordMsg}
                    </div>
                  ) : null}

                  <div>
                    <button
                      type="submit"
                      className="rounded-full bg-[#0e5e56] px-5 py-2.5 text-[12px] font-semibold text-white hover:bg-[#0b4c46]"
                    >
                      Update password
                    </button>
                  </div>
                </form>
              </div>

              {/* Notifications */}
              <div className="mt-5 rounded-3xl border border-[#ece7df] bg-white p-5 shadow-soft2">
                <div className="text-[14px] font-semibold text-ink">Notifications</div>

                <div className="mt-5 space-y-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-[12px] font-semibold text-ink">Email updates</div>
                      <div className="mt-1 text-[10px] text-muted">Order confirmations and account updates</div>
                    </div>
                    <Toggle checked={notifications.email_updates} onChange={() => toggleNotif("email_updates")} />
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-[12px] font-semibold text-ink">SMS updates</div>
                      <div className="mt-1 text-[10px] text-muted">Text messages for deliveries</div>
                    </div>
                    <Toggle checked={notifications.sms_updates} onChange={() => toggleNotif("sms_updates")} />
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-[12px] font-semibold text-ink">Delivery alerts</div>
                      <div className="mt-1 text-[10px] text-muted">Real-time order tracking notifications</div>
                    </div>
                    <Toggle checked={notifications.delivery_alerts} onChange={() => toggleNotif("delivery_alerts")} />
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-[12px] font-semibold text-ink">Promotions & offers</div>
                      <div className="mt-1 text-[10px] text-muted">Special deals and new meal announcements</div>
                    </div>
                    <Toggle checked={notifications.promotions_offers} onChange={() => toggleNotif("promotions_offers")} />
                  </div>
                </div>

                {notifErr ? (
                  <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[12px] text-red-700">
                    {notifErr}
                  </div>
                ) : null}

                {notifMsg ? (
                  <div className="mt-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-[12px] text-green-700">
                    {notifMsg}
                  </div>
                ) : null}
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}