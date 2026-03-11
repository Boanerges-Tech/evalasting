import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "./Container";
import { useAuth } from "../../context/useAuth";

/**
 * Behavior:
 * - Routes: "/" (Home), "/about", "/menu"
 * - Section links (Gallery/Review/FAQ):
 *   - If on home: smooth scroll to section
 *   - If not on home: navigate to "/#section" then scroll
 * - Mobile menu closes on user click
 */

const desktopLinks = [
  { type: "route", to: "/", label: "Home" },
  { type: "route", to: "/menu", label: "Menu" },
  { type: "route", to: "/about", label: "About" },
  { type: "section", hash: "#gallery", label: "Gallery" },
  { type: "section", hash: "#reviews", label: "Review" },
  { type: "section", hash: "#faq", label: "FAQ" },
];

const mobileLinks = [
  { type: "route", to: "/", label: "Home" },
  { type: "route", to: "/menu", label: "Menu" },
  { type: "route", to: "/about", label: "About" },
  { type: "section", hash: "#gallery", label: "Gallery" },
  { type: "section", hash: "#reviews", label: "Review" },
  { type: "route", to: "/signin", label: "Signin" },
];

function scrollToHash(hash) {
  if (!hash) return;
  const el = document.querySelector(hash);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isHome = pathname === "/";

  const goToSection = (hash) => {
    setOpen(false);

    if (isHome) {
      scrollToHash(hash);
      return;
    }

    // go to home with hash, then scroll (after render)
    navigate(`/${hash}`);
    setTimeout(() => scrollToHash(hash), 80);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-line">
      <Container className="h-16 flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => setOpen(false)}
        >
          <div className="h-10 w-10 rounded-xl bg-ink grid place-items-center">
            <span className="text-white font-black text-sm">EA</span>
          </div>
          <div className="font-extrabold tracking-tight text-ink">
            Evaalasting Arm
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-ink/70">
          {desktopLinks.map((l) => {
            if (l.type === "route") {
              return (
                <Link
                  key={l.label}
                  to={l.to}
                  className="hover:text-ink transition"
                >
                  {l.label}
                </Link>
              );
            }

            return (
              <button
                key={l.label}
                type="button"
                onClick={() => goToSection(l.hash)}
                className="hover:text-ink transition"
              >
                {l.label}
              </button>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {user ? (
  <>
    <Link
      to="/dashboard"
      className="hidden sm:inline-flex rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink/80 hover:bg-gray-50"
    >
      Dashboard
    </Link>

    <button
      onClick={logout}
      className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white shadow-soft hover:bg-brand-700 transition"
    >
      Logout
    </button>
  </>
) : (
  <Link
    to="/signin"
    className="hidden sm:inline-flex rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink/80 hover:bg-gray-50"
  >
    Sign in
  </Link>
)}

          <Link
            to="/reservations"
            className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white shadow-soft hover:bg-brand-700 transition"
          >
            Reservations
          </Link>

          {/* Mobile menu */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden h-10 w-10 rounded-xl border border-line grid place-items-center hover:bg-gray-50"
            aria-label="Open menu"
          >
            <span className="text-xl leading-none">{open ? "×" : "≡"}</span>
          </button>
        </div>
      </Container>

      {/* Mobile dropdown */}
      {open && (
        <div className="lg:hidden border-t border-line bg-white">
          <Container className="py-4 grid gap-2">
            {mobileLinks.map((l) => {
              if (l.type === "route") {
                return (
                  <Link
                    key={l.label}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="rounded-full border border-line px-5 py-2 text-sm font-semibold text-ink/80 hover:bg-gray-50 transition"
                  >
                    {l.label}
                  </Link>
                );
              }

              return (
                <button
                  key={l.label}
                  type="button"
                  onClick={() => goToSection(l.hash)}
                  className="text-left rounded-full bg-brand-600 px-6 py-2 text-sm font-semibold text-white shadow-soft hover:bg-brand-700 transition"
                >
                  {l.label}
                </button>
              );
            })}
          </Container>
        </div>
      )}
    </header>
  );
}