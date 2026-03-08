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

export default function AuthSignUp() {
  return (
    <AuthShell
      label="CREATE ACCOUNT"
      title="Join Evaalasting Arm"
      subtitle="Create your account to manage reservations, orders, and exclusive dining updates."
    >
      <form className="grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="First Name">
            <Input type="text" placeholder="First name" />
          </Field>

          <Field label="Last Name">
            <Input type="text" placeholder="Last name" />
          </Field>
        </div>

        <Field label="Email Address">
          <Input type="email" placeholder="Enter your email" />
        </Field>

        <Field label="Phone Number">
          <Input type="tel" placeholder="Enter your phone number" />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Password">
            <Input type="password" placeholder="Create password" />
          </Field>

          <Field label="Confirm Password">
            <Input type="password" placeholder="Confirm password" />
          </Field>
        </div>

        <label className="flex items-start gap-2 text-[12px] text-muted">
          <input type="checkbox" className="mt-0.5 h-3.5 w-3.5 accent-[#f15a24]" />
          <span>
            I agree to the{" "}
            <a href="#" className="font-semibold text-brand-700 hover:underline">
              Terms & Conditions
            </a>
          </span>
        </label>

        <button
          type="submit"
          className="mt-2 inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-[12px] font-extrabold text-white shadow-soft hover:bg-brand-700 transition"
        >
          Create Account
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