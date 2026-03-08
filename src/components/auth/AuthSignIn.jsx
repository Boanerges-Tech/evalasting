import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthShell from "./AuthShell";

const API_BASE = "https://evaalasting.othniel-phantasy.com.ng/api";

function Field({ label, children }) {
  return (
    <div>
      <label className="mb-2 block text-[12px] font-extrabold text-ink">
        {label}
      </label>
      {children}
    </div>
  );
}

function Input(props) {
  return (
    <input
      {...props}
      className="h-11 w-full rounded-xl border border-line bg-white px-4 text-[13px] text-ink outline-none placeholder:text-muted focus:border-brand-600/40"
    />
  );
}

export default function AuthSignIn() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function updateField(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.message || "Sign in failed.");
      }

      setSuccess(data.message || "Signed in successfully.");

      setTimeout(() => {
        navigate("/");
      }, 900);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      label="WELCOME BACK"
      title="Sign in to your account"
      subtitle="Access your account, reservations, orders, and dining history."
    >
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <Field label="Email Address">
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={updateField}
            required
          />
        </Field>

        <Field label="Password">
          <Input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={updateField}
            required
          />
        </Field>

        <div className="flex items-center justify-between gap-4 text-[12px]">
          <label className="flex items-center gap-2 text-muted">
            <input type="checkbox" className="h-3.5 w-3.5 accent-[#f15a24]" />
            <span>Remember me</span>
          </label>

          <a href="#" className="font-semibold text-brand-700 hover:underline">
            Forgot password?
          </a>
        </div>

        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[12px] text-red-700">
            {error}
          </div>
        ) : null}

        {success ? (
          <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-[12px] text-green-700">
            {success}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-[12px] font-extrabold text-white shadow-soft hover:bg-brand-700 transition disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <div className="text-center text-[12px] text-muted">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="font-semibold text-brand-700 hover:underline">
            Create one
          </Link>
        </div>
      </form>
    </AuthShell>
  );
}