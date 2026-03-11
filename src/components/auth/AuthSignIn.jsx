import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

const API_BASE = "https://evaalasting.othniel-phantasy.com.ng/api";

function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={[
        "h-12 w-full rounded-2xl border border-[#ddd8d0] bg-white px-4 text-[13px] text-ink outline-none placeholder:text-[#b3aba0] focus:border-brand-600/40",
        className,
      ].join(" ")}
    />
  );
}

function BrandMark() {
  return (
    <div className="grid h-6 w-6 place-items-center rounded-full bg-brand-600 text-white shadow-soft">
      <svg
        viewBox="0 0 24 24"
        className="h-3.5 w-3.5"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 20c-.2 0-.4-.1-.5-.2C7.1 16 4 12.8 4 9.3 4 6.4 6.2 4 9.1 4c1.3 0 2.5.5 3.4 1.4.9-.9 2.1-1.4 3.4-1.4C18.8 4 21 6.4 21 9.3c0 3.5-3.1 6.7-7.5 10.5-.1.1-.3.2-.5.2Z" />
      </svg>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.4c-.2 1.3-1.5 3.9-5.4 3.9-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 3.4 14.6 2.5 12 2.5A9.5 9.5 0 0 0 2.5 12 9.5 9.5 0 0 0 12 21.5c5.5 0 9.1-3.9 9.1-9.3 0-.6-.1-1.1-.2-1.6H12Z"
      />
      <path
        fill="#34A853"
        d="M2.5 12c0 1.5.4 2.9 1.2 4.1l3.2-2.5A5.7 5.7 0 0 1 6.2 12c0-.6.1-1.2.3-1.7L3.3 7.8A9.4 9.4 0 0 0 2.5 12Z"
      />
      <path
        fill="#FBBC05"
        d="M12 21.5c2.6 0 4.8-.9 6.4-2.4l-3.1-2.4c-.8.6-1.8 1-3.3 1-2.5 0-4.7-1.7-5.4-4l-3.3 2.5A9.5 9.5 0 0 0 12 21.5Z"
      />
      <path
        fill="#4285F4"
        d="M18.4 19.1c1.9-1.7 3.1-4.1 3.1-7.1 0-.6-.1-1.1-.2-1.6H12v3.9h5.4c-.2 1.1-.8 2.1-1.9 2.9l3 2.3Z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M16.7 12.8c0-2.2 1.8-3.3 1.8-3.3-1-1.4-2.5-1.6-3.1-1.6-1.3-.1-2.5.8-3.1.8-.6 0-1.6-.8-2.6-.8-1.3 0-2.6.8-3.3 2-.8 1.3-2.1 3.8-.9 6.8.6 1.4 1.3 3 2.3 3 .9 0 1.3-.6 2.5-.6s1.5.6 2.6.6c1.1 0 1.8-1.4 2.3-2.8.6-1.5.9-3 .9-3.1-.1 0-1.8-.7-1.8-3Zm-2.1-6.2c.4-.5.7-1.3.6-2.1-.7 0-1.6.5-2 1-.4.5-.8 1.3-.7 2 .8.1 1.6-.4 2.1-.9Z" />
    </svg>
  );
}

export default function AuthSignIn() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function updateField(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/auth/signin.php`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          remember: form.remember,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.message || "Sign in failed.");
      }

      setSuccess(data.message || "Signed in successfully.");
      setUser(data.user);

      setTimeout(() => {
        navigate("/dashboard");
      }, 700);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen bg-[#f7f4ee] text-ink">
      <div className="mx-auto flex min-h-screen max-w-[520px] flex-col border-x border-[#e8e1d8] bg-[#f7f4ee]">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-[#e8e1d8] px-4 py-4">
          <div className="flex items-center gap-2">
            <BrandMark />
            <span className="text-[14px] font-semibold text-ink">
              Evaalasting Arm
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-[3px] w-4 rounded-full bg-brand-600" />
            <span className="h-[2px] w-4 rounded-full bg-[#d2cbc1]" />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 px-4 pb-8 pt-20 sm:px-6 sm:pt-24">
          <div className="text-[10px] font-extrabold tracking-[0.22em] text-brand-700">
            WELCOME BACK
          </div>

          <h1 className="mt-3 font-display text-[42px] leading-[1.02] tracking-tight text-ink sm:text-[50px]">
            Sign in to your account
          </h1>

          <p className="mt-3 text-[14px] text-muted">
            Good to see you again, Samuel.
          </p>

          <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-[12px] font-semibold text-ink">
                Email address
              </label>
              <Input
                type="email"
                name="email"
                placeholder="samuel@example.com"
                value={form.email}
                onChange={updateField}
                required
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label className="text-[12px] font-semibold text-ink">
                  Password
                </label>

                <button
                  type="button"
                  className="text-[12px] font-semibold text-brand-700 hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={updateField}
                  className="pr-12"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9f978b]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M3 3l18 18" />
                      <path d="M10.6 10.7a2 2 0 0 0 2.7 2.7" />
                      <path d="M9.9 5.2A10.7 10.7 0 0 1 12 5c5.5 0 9.3 5 9.8 5.7a.6.6 0 0 1 0 .6 17.6 17.6 0 0 1-4.2 4.4" />
                      <path d="M6.7 6.7A17.6 17.6 0 0 0 2.2 11a.6.6 0 0 0 0 .6C3 12.8 6.7 17 12 17c1 0 2-.1 2.9-.4" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 text-[12px] text-muted">
              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={updateField}
                className="h-4 w-4 rounded border-[#d7d0c7] accent-[#f15a24]"
              />
              <span>Keep me signed in</span>
            </label>

            {error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-[12px] text-red-700">
                {error}
              </div>
            ) : null}

            {success ? (
              <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-[12px] text-green-700">
                {success}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="mt-1 inline-flex h-14 items-center justify-center rounded-full bg-brand-600 px-6 text-[14px] font-extrabold text-white shadow-soft transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Signing in..." : "Sign in  →"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#e3ddd3]" />
            <span className="text-[11px] text-[#a1978a]">or continue with</span>
            <div className="h-px flex-1 bg-[#e3ddd3]" />
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-[#ddd8d0] bg-white text-[13px] font-semibold text-ink transition hover:bg-[#faf8f4]"
            >
              <GoogleIcon />
              <span>Google</span>
            </button>

            <button
              type="button"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-[#ddd8d0] bg-white text-[13px] font-semibold text-ink transition hover:bg-[#faf8f4]"
            >
              <AppleIcon />
              <span>Apple</span>
            </button>
          </div>

          {/* Signup link */}
          <div className="mt-8 text-center text-[13px] text-muted">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="font-extrabold text-[#103b39] hover:underline"
            >
              Create account
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#e8e1d8] px-4 py-4 text-center text-[10px] text-[#b0a798] sm:px-6">
          © 2026 Evaalasting Arm. All rights reserved. · Privacy · Terms
        </div>
      </div>
    </section>
  );
}