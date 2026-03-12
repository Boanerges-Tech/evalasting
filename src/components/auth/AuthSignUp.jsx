import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthShell from "./AuthShell";
import { useAuth } from "../../context/useAuth";

const API_BASE = "https://evaalasting.othniel-phantasy.com.ng/api";

function Field({ label, children }) {
  return (
    <div>
      <label className="mb-2 block text-[12px] font-semibold text-ink">
        {label}
      </label>
      {children}
    </div>
  );
}

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

function StepPill({ number, label, active = false, done = false }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={[
          "grid h-6 w-6 place-items-center rounded-full text-[11px] font-bold",
          done || active
            ? "bg-[#0b4f49] text-white"
            : "bg-[#ebe6de] text-[#9e968b]",
        ].join(" ")}
      >
        {done ? "✓" : number}
      </span>
      <span
        className={[
          "text-[11px] font-semibold",
          active || done ? "text-ink" : "text-[#b0a798]",
        ].join(" ")}
      >
        {label}
      </span>
    </div>
  );
}

function PasswordEye({ shown, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9f978b]"
      aria-label={shown ? "Hide password" : "Show password"}
    >
      {shown ? (
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M3 3l18 18" />
          <path d="M10.6 10.7a2 2 0 0 0 2.7 2.7" />
          <path d="M9.9 5.2A10.7 10.7 0 0 1 12 5c5.5 0 9.3 5 9.8 5.7a.6.6 0 0 1 0 .6 17.6 17.6 0 0 1-4.2 4.4" />
          <path d="M6.7 6.7A17.6 17.6 0 0 0 2.2 11a.6.6 0 0 0 0 .6C3 12.8 6.7 17 12 17c1 0 2-.1 2.9-.4" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )}
    </button>
  );
}

function Rule({ ok, children }) {
  return (
    <div className="flex items-center gap-1.5">
      <span
        className={[
          "grid h-3.5 w-3.5 place-items-center rounded-full text-[9px]",
          ok ? "bg-[#2f7d4f] text-white" : "bg-[#ebe6de] text-[#b0a798]",
        ].join(" ")}
      >
        {ok ? "✓" : ""}
      </span>
      <span className={["text-[10px]", ok ? "text-[#2f7d4f]" : "text-[#b0a798]"].join(" ")}>
        {children}
      </span>
    </div>
  );
}

function StrengthBar({ score }) {
  const widths = ["25%", "50%", "75%", "100%"];
  const labels = ["Weak", "Fair", "Good", "Strong"];
  const colors = ["#dd6b55", "#d2a03f", "#3f8f61", "#2f7d4f"];

  const safeScore = Math.max(0, Math.min(score, 4));
  const width = safeScore === 0 ? "0%" : widths[safeScore - 1];
  const label = safeScore === 0 ? "Weak" : labels[safeScore - 1];
  const color = safeScore === 0 ? "#dd6b55" : colors[safeScore - 1];

  return (
    <div className="mt-2">
      <div className="h-1.5 w-full rounded-full bg-[#ebe6de]">
        <div
          className="h-1.5 rounded-full transition-all"
          style={{ width, backgroundColor: color }}
        />
      </div>
      <div className="mt-1 flex justify-end text-[10px] font-semibold" style={{ color }}>
        {label}
      </div>
    </div>
  );
}

export default function AuthSignUp() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
    agree: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const passwordChecks = useMemo(() => {
    const password = form.password || "";
    return {
      minLength: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
    };
  }, [form.password]);

  const passwordScore = useMemo(() => {
    let score = 0;
    if (passwordChecks.minLength) score += 1;
    if (passwordChecks.uppercase) score += 1;
    if (passwordChecks.number) score += 1;
    if (form.password.length >= 12) score += 1;
    return score;
  }, [passwordChecks, form.password]);

  const passwordsMatch =
    form.confirm_password.length > 0 && form.password === form.confirm_password;

  function validateStepOne() {
    if (!form.first_name || !form.last_name || !form.email) {
      setError("Please fill in your first name, last name, and email address.");
      return false;
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    if (!emailOk) {
      setError("Please enter a valid email address.");
      return false;
    }

    return true;
  }

  function goNext() {
    setError("");
    setSuccess("");

    if (!validateStepOne()) return;
    setStep(2);
  }

  function goBack() {
    setError("");
    setSuccess("");
    setStep(1);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (step === 1) {
      goNext();
      return;
    }

    if (!form.password || !form.confirm_password) {
      setError("Please create and confirm your password.");
      return;
    }

    if (!passwordChecks.minLength) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (!passwordChecks.uppercase || !passwordChecks.number) {
      setError("Password must include an uppercase letter and a number.");
      return;
    }

    if (form.password !== form.confirm_password) {
      setError("Passwords don't match.");
      return;
    }

    if (!form.agree) {
      setError("You must agree to the Terms of Service and Privacy Policy.");
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

      if (data.user) {
        setUser(data.user);
      }

      setTimeout(() => {
        if (data.user?.is_admin) {
  navigate("/admin");
} else {
  navigate("/dashboard");
}
      }, 800);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const stepLabel = "CREATE YOUR ACCOUNT";
  const stepTitle =
    step === 1 ? "Tell us about yourself" : "Set your password & plan";
  const stepSubtitle =
    step === 1
      ? ""
      : "";

  return (
    <AuthShell label={stepLabel} title={stepTitle} subtitle={stepSubtitle}>
      <div className="mt-1 flex items-center gap-3">
        <StepPill number="1" label="Your details" active={step === 1} done={step === 2} />
        <div className="h-px w-8 bg-[#d9d1c7]" />
        <StepPill number="2" label="Password & plan" active={step === 2} />
      </div>

      <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
        {step === 1 ? (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="First name">
                <Input
                  type="text"
                  name="first_name"
                  placeholder="Samuel"
                  value={form.first_name}
                  onChange={updateField}
                  required
                />
              </Field>

              <Field label="Last name">
                <Input
                  type="text"
                  name="last_name"
                  placeholder="Adebayo"
                  value={form.last_name}
                  onChange={updateField}
                  required
                />
              </Field>
            </div>

            <Field label="Email address">
              <Input
                type="email"
                name="email"
                placeholder="samuel@example.com"
                value={form.email}
                onChange={updateField}
                required
              />
            </Field>

            <Field label="Phone number (optional)">
              <Input
                type="tel"
                name="phone"
                placeholder="+44 7911 000000"
                value={form.phone}
                onChange={updateField}
              />
            </Field>
          </>
        ) : (
          <>
            <div>
              <label className="mb-2 block text-[12px] font-semibold text-ink">
                Create password
              </label>

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Min. 6 characters"
                  value={form.password}
                  onChange={updateField}
                  className={
                    form.password && passwordScore <= 1
                      ? "border-[#e4a4a0]"
                      : ""
                  }
                  required
                />
                <PasswordEye
                  shown={showPassword}
                  onClick={() => setShowPassword((v) => !v)}
                />
              </div>

              <StrengthBar score={passwordScore} />

              <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                <Rule ok={passwordChecks.minLength}>8+ characters</Rule>
                <Rule ok={passwordChecks.uppercase}>Uppercase letter</Rule>
                <Rule ok={passwordChecks.number}>Number</Rule>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-[12px] font-semibold text-ink">
                Confirm password
              </label>

              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirm_password"
                  placeholder="Repeat your password"
                  value={form.confirm_password}
                  onChange={updateField}
                  className={
                    form.confirm_password && !passwordsMatch
                      ? "border-[#ef9b95]"
                      : ""
                  }
                  required
                />
                <PasswordEye
                  shown={showConfirmPassword}
                  onClick={() => setShowConfirmPassword((v) => !v)}
                />
              </div>

              {form.confirm_password && !passwordsMatch ? (
                <div className="mt-2 text-[10px] font-semibold text-[#dd6b55]">
                  Passwords don't match
                </div>
              ) : null}
            </div>

            <label className="flex items-start gap-2 text-[12px] text-muted">
              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={updateField}
                className="mt-0.5 h-4 w-4 rounded border-[#d7d0c7] accent-[#0b4f49]"
              />
              <span>
                I agree to the{" "}
                <a href="#" className="font-semibold text-[#103b39] underline underline-offset-2">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="font-semibold text-[#103b39] underline underline-offset-2">
                  Privacy Policy
                </a>
              </span>
            </label>
          </>
        )}

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

        {step === 1 ? (
          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex h-14 items-center justify-center rounded-full bg-[#0b4f49] px-6 text-[14px] font-extrabold text-white shadow-soft transition hover:bg-[#083f3a] disabled:cursor-not-allowed disabled:opacity-70"
          >
            Continue  →
          </button>
        ) : (
          <div className="mt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={goBack}
              className="inline-flex h-12 items-center justify-center rounded-full border border-[#ddd8d0] bg-white px-5 text-[13px] font-semibold text-ink transition hover:bg-[#faf8f4]"
            >
              ← Back
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-14 flex-1 items-center justify-center rounded-full bg-brand-600 px-6 text-[14px] font-extrabold text-white shadow-soft transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Creating account..." : "Create account  →"}
            </button>
          </div>
        )}

        <div className="pt-2 text-center text-[13px] text-muted">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="font-extrabold text-[#103b39] hover:underline"
          >
            Sign in
          </Link>
        </div>
      </form>
    </AuthShell>
  );
}