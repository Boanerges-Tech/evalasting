import { Link } from "react-router-dom";
import AuthShell from "./AuthShell";

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
  return (
    <AuthShell
      label="WELCOME BACK"
      title="Sign in to your account"
      subtitle="Access your account, reservations, orders, and dining history."
    >
      <form className="grid gap-4">
        <Field label="Email Address">
          <Input type="email" placeholder="Enter your email" />
        </Field>

        <Field label="Password">
          <Input type="password" placeholder="Enter your password" />
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

        <button
          type="submit"
          className="mt-2 inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-[12px] font-extrabold text-white shadow-soft hover:bg-brand-700 transition"
        >
          Sign In
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