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

export default function AuthSignUp() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
    agree: false,
  });

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

    if (!form.agree) {
      setError("You must agree to the Terms & Conditions.");
      return;
    }

    if (form.password !== form.confirm_password) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/auth/signup.php`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
          phone: form.phone,
          password: form.password,
          confirm_password: form.confirm_password,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.message || "Account creation failed.");
      }

      setSuccess(data.message || "Account created successfully.");

      
      setTimeout(() => {
        
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      label="CREATE ACCOUNT"
      title="Join Evaalasting Arm"
      subtitle="Create your account to manage reservations, orders, and exclusive dining updates."
    >
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="First Name">
            <Input
              type="text"
              name="first_name"
              placeholder="First name"
              value={form.first_name}
              onChange={updateField}
              required
            />
          </Field>

          <Field label="Last Name">
            <Input
              type="text"
              name="last_name"
              placeholder="Last name"
              value={form.last_name}
              onChange={updateField}
              required
            />
          </Field>
        </div>

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

        <Field label="Phone Number">
          <Input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            value={form.phone}
            onChange={updateField}
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Password">
            <Input
              type="password"
              name="password"
              placeholder="Create password"
              value={form.password}
              onChange={updateField}
              required
            />
          </Field>

          <Field label="Confirm Password">
            <Input
              type="password"
              name="confirm_password"
              placeholder="Confirm password"
              value={form.confirm_password}
              onChange={updateField}
              required
            />
          </Field>
        </div>

        <label className="flex items-start gap-2 text-[12px] text-muted">
          <input
            type="checkbox"
            name="agree"
            checked={form.agree}
            onChange={updateField}
            className="mt-0.5 h-3.5 w-3.5 accent-[#f15a24]"
          />
          <span>
            I agree to the{" "}
            <a href="#" className="font-semibold text-brand-700 hover:underline">
              Terms & Conditions
            </a>
          </span>
        </label>

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
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <div className="text-center text-[12px] text-muted">
          Already have an account?{" "}
          <Link to="/signin" className="font-semibold text-brand-700 hover:underline">
            Sign in
          </Link>
        </div>
      </form>
    </AuthShell>
  );
}